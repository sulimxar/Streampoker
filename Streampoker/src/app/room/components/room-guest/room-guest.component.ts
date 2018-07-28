import { Component, OnInit, Input, Inject, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AppUser, Room, RoomServiceInjectionToken, RoomService, Guest, History } from '@shared.module';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import { Subscription } from 'rxjs/Subscription';
//import * as $ from 'jquery';
declare var $: JQueryStatic;

@Component({
  selector: 'app-room-guest',
  templateUrl: './room-guest.component.html',
  styleUrls: ['./room-guest.component.scss']
})
export class RoomGuestComponent implements OnInit, OnDestroy, AfterViewInit  {

  @Input() appUser: AppUser;
  @Input() room: Room;

  @ViewChild('carouselControl') carouselControl: ElementRef;

  private pingSubscription: Subscription;
  selectedCarouselIndex = 0;
  //private pingSubscription2: Subscription;

  //now: number;

  cards: string[] = ['?', '0', '1', '2', '3', '5', '8', '13', '20', '40'];

  constructor(
    @Inject(RoomServiceInjectionToken)
    private roomService: RoomService) { }

  ngOnInit() {
    const timer = Observable.timer(10, 2000);
    this.pingSubscription = timer.subscribe(t => this.pingGuest());

    // const timer2 = Observable.timer(10, 100);
    // this.pingSubscription2 = timer2.subscribe(t => this.now = Date.now());
  }

  ngAfterViewInit(): void {
    $(this.carouselControl.nativeElement).on('slid.bs.carousel', (e) => {
        this.selectedCarouselIndex = (e as any).to;
        console.log(this);
        console.log(this.selectedCarouselIndex);
      });
  }

  ngOnDestroy(): void {
    this.pingSubscription.unsubscribe();
    //this.pingSubscription2.unsubscribe();
  }

  get isSummarized(): boolean {
    return this.snapshot !== undefined && this.snapshot !== null;
  }

  get guests(): Guest[] {
    return this.snapshot ? this.snapshot.marks.map(m => new Guest(m.uid, m.name, m.value, undefined)) :
      this.room ? this.room.guests : [];
  }

  get thisGuest(): Guest {
    const thisGuests = this.guests ? this.guests.filter(g => g.uid === this.appUser.uid) : null;
    return thisGuests && thisGuests.length > 0 ? thisGuests[0] : null;
  }

  onVoteClicked() {
    console.log(this.cards);
    console.log(this.selectedCarouselIndex);
    console.log(this.cards[this.selectedCarouselIndex]);

    this.roomService.voteGuest(this.room, this.thisGuest, this.cards[this.selectedCarouselIndex]);
  }

  private get snapshot(): History {
    if (this.room && this.room.snapshot) {
      return this.room.snapshot;
    }
    return null;
  }

  private pingGuest() {
    this.roomService.pingGuest(this.appUser, this.room);
  }
}
