import {
    LightningElement,
    track
} from 'lwc';
import {
    loadScript,
    loadStyle
} from 'lightning/platformResourceLoader';
import fullCalendar from '@salesforce/resourceUrl/fullCalendar';

export default class myEvents extends LightningElement {

    fullCalendarJsInitialised = false;
    calendar;

    renderedCallback() {

        if (this.fullCalendarJsInitialised) {
            return;
        }

        this.fullCalendarJsInitialised = true;

        Promise.all([
            loadScript(this, fullCalendar + "/fullCalendar/packages/core/main.js"),
            loadStyle(this, fullCalendar + "/fullCalendar/packages/core/main.css")
        ]).then(() => {
            Promise.all([
                    loadScript(this, fullCalendar + "/fullCalendar/packages/daygrid/main.js"),
                    loadStyle(this, fullCalendar + "/fullCalendar/packages/daygrid/main.css"),
                    loadScript(this, fullCalendar + "/fullCalendar/packages/list/main.js"),
                    loadStyle(this, fullCalendar + "/fullCalendar/packages/list/main.css"),
                    loadScript(this, fullCalendar + "/fullCalendar/packages/timegrid/main.js"),
                    loadStyle(this, fullCalendar + "/fullCalendar/packages/timegrid/main.css"),
                    loadScript(this, fullCalendar + "/fullCalendar/packages/interaction/main.js"),
                    loadScript(this, fullCalendar + "/fullCalendar/packages/moment/main.js"),
                    loadScript(this, fullCalendar + "/fullCalendar/packages/moment-timezone/main.js"),
                ])
                .then(() => {
                    const ele = this.template.querySelector('div.calendar');

                    this.calendar = new FullCalendar.Calendar(ele, {
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
                        events: [{
                            title: 'test',
                            start: '2021-04-13T12:30:00',
                            end: '2021-05-13T12:30:00',
                            allDay : false
                        }]
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

    // eventSourceHandler(info, successCallback, failureCallback) {
    //     successCallback(
    //         [{
    //             title: 'SVYATLOH',
    //             start: '13.04.2021',
    //             end: '14.04.2021',
    //             Id: 'custom'
    //         }]
    //     );
    // }


}