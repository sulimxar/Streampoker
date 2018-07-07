import { Component, OnInit, Input, Inject } from '@angular/core';
import { AppUser, Room, Guest, History, Mark, RoomServiceInjectionToken } from '@shared.module';
import { RoomService } from 'app/shared/interfaces/room.service';

@Component({
  selector: 'app-room-dashboard',
  templateUrl: './room-dashboard.component.html',
  styleUrls: ['./room-dashboard.component.scss']
})
export class RoomDashboardComponent implements OnInit {

  private cachedSnapshot: History = undefined;

  @Input() appUser: AppUser;
  @Input() room: Room;

  constructor(
    @Inject(RoomServiceInjectionToken)
    private roomService: RoomService
  ) { }

  ngOnInit() {
  }

  get isSummarized(): boolean {
    return this.snapshot !== undefined && this.snapshot !== null;
  }

  get guests(): Guest[] {
    return this.snapshot ? this.snapshot.marks.map(m => new Guest(m.uid, m.name, m.value, undefined)) :
      this.room ? this.room.guests : [];
  }

  get vote(): string {
    return this.snapshot ? this.snapshot.summary : '-';
  }

  private set snapshot(value: History) {
    this.cachedSnapshot = value;
  }

  private get snapshot(): History {
    if (this.cachedSnapshot === undefined) {
      if (this.room && this.room.snapshot) {
        return this.room.snapshot;
      }
    }

    return this.cachedSnapshot;
  }

  onSummarizeClicked() {
    const guests = this.room.guests;
    const votedGuests = this.guests.filter(g => g.mark !== '?');
    let vote = '?';

    if (votedGuests.length > 0) {
      vote = (votedGuests.reduce((sum, b) => sum + parseInt(b.mark, null), 0) / votedGuests.length).toString();
    }

    this.snapshot = new History(vote, Date.now(), this.guests.map(g => new Mark(g.uid, g.name, g.mark)));

    this.roomService.setSnapshot(this.room.uid, this.snapshot);
  }

  onNewVotingClicked() {
    this.roomService.addHistory(this.room.uid, this.snapshot);
    this.snapshot = null;

    this.roomService.setSnapshot(this.room.uid, null);
    this.room.guests.forEach(g => this.roomService.resetGuest(this.room, g));
  }
}
