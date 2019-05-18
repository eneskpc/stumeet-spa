import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event-service/event.service';
import flatpickr from "flatpickr";
import { Turkish } from "flatpickr/dist/l10n/tr";

@Component({
  selector: 'app-events.ks-column.ks-page',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  constructor(private eventService: EventService) { }

  public eventList: Array<any> = [];
  public marker: any = null;
  public model: any = {
    eventName: '',
    eventDescription: '',
    eventDate: '',
    openAddress: '',
    latitude: '',
    longitude: ''
  };

  ngOnInit() {
    flatpickr("#event-date", {
      "locale": Turkish,
      "enableTime": true,
      "time_24hr": true,
      "dateFormat": "Z",
      "altInput": true,
      "altFormat": "d M Y H:i"
    });
    this.eventService.getAllEvents().subscribe((response: Array<any>) => {
      this.eventList = response;
    });
  }

  public mapRightClickEvent(event) {
    if (event)
      this.marker = {
        lat: event.coords.lat,
        lng: event.coords.lng
      };
  }

  public saveEvent() {
    if (this.marker) {
      this.model.latitude = this.marker.lat.toString();
      this.model.longitude = this.marker.lng.toString();
    }
  }

}
