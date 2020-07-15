import { Component, OnInit } from "@angular/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import { FullCalendarComponent } from "@fullcalendar/angular";
import { EventInput } from "@fullcalendar/core";
import timeGrigPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // for dateClick

@Component({
  selector: "app-agenda",
  templateUrl: "./agenda.component.html",
  styleUrls: ["./agenda.component.css"],
})
export class AgendaComponent implements OnInit {
  constructor() {}

  calendarVisible = true;
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarWeekends = true;
  calendarEvents: EventInput[] = [{ title: "Event Now", start: new Date() }];

  ngOnInit() {}

  toggleVisible() {
    this.calendarVisible = !this.calendarVisible;
  }

  toggleWeekends() {
    this.calendarWeekends = !this.calendarWeekends;
  }

  handleDateClick(arg) {
    if (confirm("Would you like to add an event to " + arg.dateStr + " ?")) {
      this.calendarEvents = this.calendarEvents.concat({
        // add new event data. must create new array
        title: "New Event",
        start: arg.date,
        allDay: arg.allDay,
      });
    }
  }
}
