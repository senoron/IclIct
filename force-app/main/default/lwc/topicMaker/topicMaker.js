import { LightningElement, track } from 'lwc';
import getTeacherClasses from '@salesforce/apex/topicMakerController.getTeacherClasses';




export default class TopicMaker extends LightningElement {
    classes = [];
    classOptions = [];
    classValue = '';

    subjects = [];
    subjectOptions = [];
    subjectValue = '';

    topicTitle = '';

    isSubjectDisabled = true;

    @track topics = [];

    async connectedCallback(){
        this.classes = await getTeacherClasses();
        //console.log(this.classes);
        for (let i = 0; i < this.classes.length; i++) {
            this.classOptions.push({label: this.classes[i].Grade__c + (isNaN(this.classes[i].Suffix__c) ? '' : this.classes[i].Suffix__c), value: this.classes[i].Id});
        }
        this.template.querySelector(".classesCombo").options = this.classOptions;
    }

    async classChange(event){
        this.classValue = event.detail.value;
    }
}