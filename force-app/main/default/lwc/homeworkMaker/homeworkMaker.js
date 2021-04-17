import {
    LightningElement,
    track
} from 'lwc';

import getTeacherClasses from '@salesforce/apex/testMakerController.getTeacherClasses';
import getClassSubjects from '@salesforce/apex/classChooseController.getClassSubjects';
import getSubjectTopics from '@salesforce/apex/testMakerController.getSubjectTopics';
import createHomework from '@salesforce/apex/HomeworkMakerController.createHomework';
import createLink from '@salesforce/apex/HomeworkMakerController.createLink';

export default class HomeworkMaker extends LightningElement {


    classValue = '';
    classOption = [];
    classes = [];

    @track topicDisabled = true;
    @track subjectDisabled = true;

    topicValue = '';
    topics = [];
    topicsOption = [];

    startDateValue = '';
    endDateValue = '';

    subjectValue = '';
    subjects = [];
    subjectOptions = [];

    async connectedCallback() {
        this.classes = await getTeacherClasses();
        //console.log(this.classes);
        for (let i = 0; i < this.classes.length; i++) {
            this.classOption.push({
                label: this.classes[i].Grade__c + (isNaN(this.classes[i].Suffix__c) ? '' : this.classes[i].Suffix__c),
                value: this.classes[i].Id
            });
        }
        this.template.querySelector(".classesCombo").options = this.classOption;
        this.handleChangeGeneral();
    }


    async classChange(event) {
        this.classValue = event.detail.value;

        this.topics = [];
        this.topicsOption = [];
        this.subjectOptions = [];

        this.subjects = await getClassSubjects({
            classId: this.classValue
        });
        console.log(this.subjects);
        for (let i = 0; i < this.subjects.length; i++) {
            this.subjectOptions.push({
                label: this.subjects[i].Name,
                value: this.subjects[i].Id
            });
        }

        this.template.querySelector(".topicsCombo").options = this.topicsOption;
        this.template.querySelector(".subjectsCombo").options = this.subjectOptions;

        this.subjectDisabled = false;
        this.topicDisabled = true;
        this.handleChangeGeneral();
    }

    async subjectChange(event) {
        this.subjectValue = event.detail.value;

        this.topicsOption = [];
        this.topics = await getSubjectTopics({
            subjectId: this.subjectValue
        });
        console.log(this.topics);
        for (let i = 0; i < this.topics.length; i++) {
            this.topicsOption.push({
                label: this.topics[i].Title__c,
                value: this.topics[i].Id
            });
        }

        this.template.querySelector(".topicsCombo").options = this.topicsOption;

        this.topicDisabled = false;
        this.handleChangeGeneral();
    }

    topicChange(event) {
        this.topicValue = event.detail.value;
        this.handleChangeGeneral();
    }

    updateDate(event) {
        this.startDateValue = this.template.querySelector(".startDate").value;
        this.endDateValue = this.template.querySelector(".endDate").value;
        console.log(this.startDateValue);
        console.log(this.endDateValue);
        this.handleChangeGeneral();
    }

    handleChangeGeneral() {
        if (
            this.classValue && this.topicValue && this.startDateValue && this.endDateValue && this.subjectValue
        ) {
            this.template.querySelector('[data-id="upload"]').disabled = false;
        }
    }

    async handleUpload(event) {

        const files = event.detail.files;

        for (let i = 0; i < files.length; i++) {

            const file = files[i];

            const homeworkId = await createHomework({
                testTitle: file.name,
                topicId: this.topicValue,
                startDate: this.startDateValue,
                endDate: this.endDateValue,
                classId: this.classValue
            });

            createLink({
                recordId : homeworkId,
                documentId : file.documentId
            });

        }

    }

}