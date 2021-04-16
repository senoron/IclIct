import { LightningElement } from 'lwc';

import getClass from '@salesforce/apex/MyAssignmentsController.getClass';
import getSubjects from '@salesforce/apex/MyAssignmentsController.getSubjects';

export default class MyAssignmentsWrapper extends LightningElement {

    subjects;

    async connectedCallback() {
        const classRecord = await getClass();
        this.subjects = await getSubjects({classId : classRecord.Id});
    }


}