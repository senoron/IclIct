import {
    LightningElement,
    track
} from 'lwc';
import {
    loadScript,
    loadStyle
} from 'lightning/platformResourceLoader';
import fullCalendar from '@salesforce/resourceUrl/fullCalendar';
import getCalendarEntries from '@salesforce/apex/MyEventsController.getCalendarEntries';

export default class myEvents extends LightningElement {

    fullCalendarJsInitialised = false;
    calendar;

    events;

    // {
    //     title: 'test',
    //     start: '2021-04-13T12:30:00',
    //     end: '2021-05-13T12:30:00',
    //     allDay: false
    // }

    get eventList() {
        try {
            let result = [];

            events.forEach(event => {
                result.push({
                    title: event.Message__c,
                    start: event.StartDate__c,
                    end: event.EndDate__c,
                    allDay: false
                });
            });

            return result;
        } catch (e) {

        }
    }

    async connectedCallback() {
        const events = await getCalendarEntries();
        try {
            let result = [];

            events.forEach(event => {
                result.push({
                    title: event.Message__c,
                    start: event.EndDate__c,
                    // end: event.EndDate__c,
                    allDay: true
                });
            });

            this.events = result;
        } catch (e) {

        }
    }

    renderedCallback() {

        if (this.fullCalendarJsInitialised) {
            return;
        }

        this.fullCalendarJsInitialised = true;

        Promise.all([
            loadScript(this, fullCalendar + "/packages/core/main.js"),
            loadScript(this, fullCalendar + "/packages/core/locales/uk.js"),
            loadStyle(this, fullCalendar + "/packages/core/main.css")
        ]).then(() => {
            Promise.all([
                    loadScript(this, fullCalendar + "/packages/daygrid/main.js"),
                    loadStyle(this, fullCalendar + "/packages/daygrid/main.css"),
                    loadScript(this, fullCalendar + "/packages/list/main.js"),
                    loadStyle(this, fullCalendar + "/packages/list/main.css"),
                    loadScript(this, fullCalendar + "/packages/timegrid/main.js"),
                    loadStyle(this, fullCalendar + "/packages/timegrid/main.css"),
                    loadScript(this, fullCalendar + "/packages/interaction/main.js"),
                    loadScript(this, fullCalendar + "/packages/moment/main.js"),
                    loadScript(this, fullCalendar + "/packages/moment-timezone/main.js"),

                ])
                .then(() => {
                    const ele = this.template.querySelector('div.calendar');

                    this.calendar = new FullCalendar.Calendar(ele, {
                        locale : 'uk',
                        plugins: ["dayGrid", "timeGrid", "list", "interaction", "moment", "resourceTimeGridPlugin"],
                        views: {
                            listDay: {
                                buttonText: "list day"
                            },
                            listWeek: {
                                buttonText: "list week"
                            },
                            listMonth: {
                                buttonText: "list month"
                            },
                            timeGridWeek: {
                                buttonText: "week time"
                            },
                            timeGridDay: {
                                buttonText: "day time"
                            },
                            dayGridMonth: {
                                buttonText: "month"
                            },
                            dayGridWeek: {
                                buttonText: "week"
                            },
                            dayGridDay: {
                                buttonText: "day"
                            }
                        },

                        eventClick: info => {
                            const selectedEvent = new CustomEvent('fceventclick', {
                                detail: info
                            });
                            console.log("eventClick", info);
                            this.dispatchEvent(selectedEvent);
                        },
                        eventMouseEnter: info => {
                            console.log("mouse enter", info)
                        },
                        dateClick: info => {
                            console.log("date click", info)
                        },
                        // header: false,
                        header: {
                            left: "title",
                            center: "today prev,next",
                            right: "listDay,listWeek,listMonth,timeGridWeek,timeGridDay,dayGridMonth,dayGridWeek,dayGridDay"
                        },
                        // eventSources: [{
                        //     events: this.eventSourceHandler,
                        //     id: "custom"
                        // }],
                        events: this.events
                    });
                    this.calendar.render();
                })
                .catch(error => {
                    // eslint-disable-next-line no-console
                    console.error({
                        message: 'Error occured on FullCalendarJS',
                        error
                    });
                });
        });
    }
}