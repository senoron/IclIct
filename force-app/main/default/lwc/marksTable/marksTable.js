import {
    LightningElement,
    track
} from 'lwc';
import getUserSubjects from '@salesforce/apex/markTableController.getUserSubjects';
import getSubjectMarks from '@salesforce/apex/markTableController.getSubjectMarks';

export default class MarksTable extends LightningElement {
    @track data = [];
    subjects = [];
    @track columns = [];

    async connectedCallback() {
        this.columns = [];
        this.subjects = await getUserSubjects();
        //console.log(this.subjects);
        for (let i = 0; i < this.subjects.length; i++) {
            this.columns.push({
                label: this.subjects[i].Name,
                fieldName: this.subjects[i].Name
            });
            this.subjects[i].marks = [...await getSubjectMarks({
                subjectId: this.subjects[i].Id
            })];

            if (!this.subjects[i].marks) {
                this.subjects[i].marks = [];
            }
        }

        this.columns = [...this.columns];
        console.log(this.subjects);

        let max = 0;

        for (let i = 0; i < this.subjects.length; i++) {
            if (max < this.subjects[i].marks.length) {
                max = this.subjects[i].marks.length;
            }
        }

        for (let i = 0; i < this.subjects.length; i++) {
            this.subjects[i].marks.length = max;
        }

        for (let i = 0; i < max; i++) {
            let obj = {};
            for (let j = 0; j < this.subjects.length; j++) {
                try {
                    obj[this.subjects[j].Name] = this.subjects[j].marks[i].Mark__c;
                } catch (e) {}
            }
            this.data.push(obj);
        }


        this.data = [...this.data];
        console.log(this.columns);
        console.log(JSON.parse(JSON.stringify(this.data)));
    }


}