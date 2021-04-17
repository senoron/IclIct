import {
    LightningElement,
    track
} from 'lwc';

import getTeacherClasses from '@salesforce/apex/testMakerController.getTeacherClasses';
import getClassSubjects from '@salesforce/apex/classChooseController.getClassSubjects';
import getSubjectTopics from '@salesforce/apex/testMakerController.getSubjectTopics';
import getStdHomeworks from '@salesforce/apex/ToEvaluateController.getStudentsHomeworks';
import getFileUrl from '@salesforce/apex/homeworkProcessingController.getFileUrl';
import updateHomework from '@salesforce/apex/ToEvaluateController.updateHomework';




export default class ToEvaluate extends LightningElement {
    @track stdHomeworks;

    classValue = '';
    classOption = [];
    classes = [];

    @track topicDisabled = true;
    @track subjectDisabled = true;

    topicValue = '';
    topics = [];
    topicsOption = [];

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
    }

    async topicChange(event) {
        this.topicValue = event.detail.value;
        this.stdHomeworks = await getStdHomeworks({
            classId: this.classValue,
            topicId: this.topicValue,
            subjectId: this.subjectValue
        });
    }

    async openFile(event) {

        const id = event.currentTarget.value;

        const url = await getFileUrl({
            documentId: id
        });
        open(url, '_blank');
    }

    async handleMark(event) {

        const id = event.currentTarget.value;
        const mark = parseInt(this.template.querySelector('[data-id="' + id + '"]').value);

        updateHomework({
            recordId: id,
            mark: mark
        });

        this.stdHomeworks = await getStdHomeworks({
            classId: this.classValue,
            topicId: this.topicValue,
            subjectId: this.subjectValue
        });
    }
}