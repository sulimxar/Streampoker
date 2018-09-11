import { Component, OnInit, Input, Inject, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AppUser, Room, RoomServiceInjectionToken, RoomService, Guest, History } from '@shared.module';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import { Subscription } from 'rxjs/Subscription';
import * as $ from 'jquery';

@Component({
  selector: 'app-room-guest',
  templateUrl: './room-guest.component.html',
  styleUrls: ['./room-guest.component.scss']
})
export class RoomGuestComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() room: Room;
  @Input('appUser')
  set appUser(value: AppUser) {
    this.cachedAppUser = value;

    if (this.isVoted && this.thisGuest.mark !== ' ') {
      this.initiallySelectedCarouselIndex = this.cards.indexOf(this.thisGuest.mark);
    } else {
      this.initiallySelectedCarouselIndex = 0;
    }

    this.selectedCarouselIndex = this.initiallySelectedCarouselIndex;
  }
  get appUser(): AppUser {
    return this.cachedAppUser;
  }

  @ViewChild('carouselControl') carouselControl: ElementRef;

  private cachedAppUser: AppUser;
  private pingSubscription: Subscription;
  private initiallySelectedCarouselIndex: number;

  selectedCarouselIndex = 0;

  //private pingSubscription2: Subscription;

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
    // This used to work... once... and then suddenly stopped. No  idea why but I give up :(
    $(this.carouselControl.nativeElement).on('slid.bs.carousel', (e) => {
      this.selectedCarouselIndex = (e as any).to;
      console.log('Magic!', this.selectedCarouselIndex);
    });
  }

  ngOnDestroy(): void {
    this.pingSubscription.unsubscribe();
    //this.pingSubscription2.unsubscribe();
  }

  get isSummarized(): boolean {
    return this.snapshot !== undefined && this.snapshot !== null;
  }

  get isVoted(): boolean {
    const thisGuest = this.thisGuest;
    return this.isSummarized || (thisGuest === null ? false : thisGuest.mark !== ' ');
  }

  get guests(): Guest[] {
    return this.snapshot ? this.snapshot.marks.map(m => new Guest(m.uid, m.name, m.value, undefined)) :
      this.room ? this.room.guests : [];
  }

  get thisGuest(): Guest {
    const thisGuests = this.guests ? this.guests.filter(g => g.uid === this.appUser.uid) : null;
    return thisGuests && thisGuests.length > 0 ? thisGuests[0] : null;
  }

  get summary(): string {
    return this.snapshot === null ? '?' : this.snapshot.summary;
  }

  onPrevClicked() {
    this.selectedCarouselIndex = this.getActiveCardIndex() - 1;
    if (this.selectedCarouselIndex < 0) {
      this.selectedCarouselIndex = this.cards.length - 1;
    }
  }

  onNextClicked() {
    this.selectedCarouselIndex = this.getActiveCardIndex() + 1;
    if (this.selectedCarouselIndex >= this.cards.length) {
      this.selectedCarouselIndex = 0;
    }
  }

  private getActiveCardIndex() {
    const prevActiveCardId = $('#' + this.carouselControl.nativeElement.id + ' .carousel-item.active')[0].id;
    const prevActiveCardIndex = prevActiveCardId.substr('item-'.length);

    return parseInt(prevActiveCardIndex, null);
  }

  onVoteClicked() {
    this.roomService.voteGuest(this.room, this.thisGuest, this.cards[this.selectedCarouselIndex]);
  }

  onCancelClicked() {
    this.roomService.voteGuest(this.room, this.thisGuest, ' ');
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
