import {
    LightningElement,
    track,
    wire
} from 'lwc';

import getClass from '@salesforce/apex/MyAssignmentsController.getClass';
import getSubjects from '@salesforce/apex/MyAssignmentsController.getSubjects';

export default class MyAssignmentsWrapper extends LightningElement {

    @track subjects;
    @track classRecordId;

    // @wire(getClass, {}) wiredClass({
    //     data,
    //     error
    // }) {
    //     this.classRecordId = data.Id;
    // }

    @wire(getSubjects, {
        classId: '$classRecordId'
    }) wiredSubjects({
        data,
        error
    }) {
        this.subjects = data;
    }

    get subjectsList() {
        try {

            let result = [];

            const keys = Object.keys(this.subjects);

            for (let i = 0; i < keys.length; i++) {

                const key = keys[i];

                result.push({
                    key,
                    topics: this.subjects[key]
                });

            }

            return result;

        } catch (e) {
            console.log(e);
        }
    }

    connectedCallback() {
        getClass().then((result) => {
            this.classRecordId = result.Id;
        });
    }
}