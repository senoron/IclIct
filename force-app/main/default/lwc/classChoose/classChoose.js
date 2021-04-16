import { LightningElement, track } from 'lwc';
import getAvialibleClasses from '@salesforce/apex/classChooseController.getAvialibleClasses';
export default class ClassChoose extends LightningElement {
    classes = [];
    currentClass = '';
    currentSubject = '';
    classOptions = [];
    @track isSubjectDisabled = true;

    subjects = [];
    subjectOptions = [];

    @track teacherSubjects = [];

    async connectedCallback(){
        this.classes = await getAvialibleClasses();
        //console.log(this.classes);
        for (let i = 0; i < this.classes.length; i++) {
            this.classOptions.push({label: this.classes[i].Grade__c + (isNaN(this.classes[i].Suffix__c) ? '' : this.classes[i].Suffix__c), value: this.classes[i].Id});
        }
        this.template.querySelector(".classesCombo").options = this.classOptions;
    }

}