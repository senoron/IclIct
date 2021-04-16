import {
    LightningElement,
    track,
    wire
} from 'lwc';

import getClass from '@salesforce/apex/MyAssignmentsController.getClass';
import getSubjects from '@salesforce/apex/MyAssignmentsController.getSubjects';
import getFileUrl from '@salesforce/apex/MyAssignmentsController.getFileUrl';

export default class MyAssignmentsWrapper extends LightningElement {

    @track subjects;
    @track data;
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
        try {
            this.data = data;
            this.subjects = JSON.parse(JSON.stringify(data.data));
        } catch (e) {
            console.log(e)
        }
    }

    get subjectsList() {
        try {

            let result = [];
            const keys = Object.keys(this.subjects);
            for (let i = 0; i < keys.length; i++) {

                const key = keys[i];

                this.subjects[key].forEach(topic => {
                    if (!topic.Homeworks__r) return;
                    topic.Homeworks__r.forEach(homework => {

                        if (homework.IsControlWork__c) {
                            homework.tests = this.data.tests[homework.Id];
                        } else {
                            homework.files = this.data.files[homework.Id];
                        }

                    });
                });

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

    handleNavigateToTest(event) {
        const testId = event.currentTarget.value;

        open('/s/test?pageId=' + testId, '_blank');
    }

    async openFile(event) {
        const contentDocumentId = event.currentTarget.value;
        const url = await getFileUrl({
            documentId: contentDocumentId
        });
        open(url, '_blank');
    }
}