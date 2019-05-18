import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../services/event-service/event.service';
import { AuthService } from '../services/auth-service/auth.service';

@Component({
  selector: 'app-event-detail.ks-column.ks-page',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router,
    private eventService: EventService) { }

  public currentEventId: number = 0;
  public currentEvent: any;
  public participantList: Array<any> = [];
  public filteredParticipantList: Array<any> = [];

  public mapLat: number;
  public mapLng: number;
  public mapZoom: number;

  public guestFilter = 'All';

  public allCount: number = 0;
  public acceptCount: number = 0;
  public rejectCount: number = 0;
  public maybeCount: number = 0;

  public replyCurrentUser: string = 'M';

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.currentEventId = parseInt(params.get("id"));
      if (this.currentEventId == 0) {
        this.router.navigateByUrl('/etkinlikler');
      } else {
        this.eventService.getEventById(this.currentEventId).subscribe(response => {
          this.currentEvent = response;
          this.mapLat = parseFloat(this.currentEvent.latitude);
          this.mapLng = parseFloat(this.currentEvent.longitude);
          this.mapZoom = 16;
        });

        this.eventService.getParticipantOfEventById(this.currentEventId).subscribe((response: Array<any>) => {
          this.participantList = response;
          this.filteredParticipantList = this.participantList;

          this.acceptCount = this.participantList.length;
          this.acceptCount = this.participantList.filter(p => p.invitationReply == 'A').length;
          this.rejectCount = this.participantList.filter(p => p.invitationReply == 'R').length;
          this.maybeCount = this.participantList.filter(p => p.invitationReply == 'M').length;
          this.replyCurrentUser = this.participantList.filter(p => p.user.id == this.auth.currentUser.id)[0].invitationReply;
        });
      }
    });
  }

  public changeInvitationReply(reply: string) {
    let replyRecordUser = this.participantList.filter(p => p.user.id == this.auth.currentUser.id)[0];
    replyRecordUser.invitationReply = reply;
    this.eventService.updateEventParticipant(this.currentEventId, replyRecordUser).subscribe(response => {
      this.replyCurrentUser = reply;
    });
  }

  public changeGuestFilter(replyType: string) {
    if (replyType == 'All') {
      this.guestFilter = 'All';
      this.filteredParticipantList = this.participantList;
    } else if (replyType == 'Accepts') {
      this.guestFilter = 'Accepts';
      this.filteredParticipantList = this.participantList.filter(p => p.invitationReply == 'A');
    } else if (replyType == 'Rejects') {
      this.guestFilter = 'Rejects';
      this.filteredParticipantList = this.participantList.filter(p => p.invitationReply == 'R');
    } else if (replyType == 'Maybes') {
      this.guestFilter = 'Maybes';
      this.filteredParticipantList = this.participantList.filter(p => p.invitationReply == 'M');
    }
  }

}
