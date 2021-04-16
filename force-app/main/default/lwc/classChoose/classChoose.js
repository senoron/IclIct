import { LightningElement, track } from 'lwc';
import getAvialibleClasses from '@salesforce/apex/classChooseController.getAvialibleClasses';
import getClassSubjects from '@salesforce/apex/classChooseController.getClassSubjects';
import getTeacherClassSubjects from '@salesforce/apex/classChooseController.getTeacherClassSubjects';
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

    async classChange(event){
        this.currentClass = event.detail.value;
        this.isSubjectDisabled = false;
        this.subjects = [];
        this.subjectOptions = [];
        this.teacherSubjects = [];
        this.subjects = await getClassSubjects({classId: this.currentClass});
        //console.log(this.subjects);
        for (let i = 0; i < this.subjects.length; i++) {
            this.subjectOptions.push({label: this.subjects[i].Name, value: this.subjects[i].Id});
        }
        this.template.querySelector(".subjectsCombo").options = this.subjectOptions;
        this.teacherSubjects = await getTeacherClassSubjects({classId: this.currentClass});
        //console.log(this.teacherSubjects);
    }

    subjectsChange(event){
        this.currentSubject = event.detail.value;
    }


}