import { LightningElement, track } from 'lwc';
import getTeacherClasses from '@salesforce/apex/testMakerController.getTeacherClasses';
import getClassSubjects from '@salesforce/apex/classChooseController.getClassSubjects';
import getSubjectTopics from '@salesforce/apex/testMakerController.getSubjectTopics';
import createHomework from '@salesforce/apex/testMakerController.createHomework'
import createTest from '@salesforce/apex/testMakerController.createTest'
export default class TestMaker extends LightningElement {
    @track tasks = [1];
    i = 2;

    testTitle = '';

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

    async connectedCallback(){
        this.classes = await getTeacherClasses();
        //console.log(this.classes);
        for (let i = 0; i < this.classes.length; i++) {
            this.classOption.push({label: this.classes[i].Grade__c + (isNaN(this.classes[i].Suffix__c) ? '' : this.classes[i].Suffix__c), value: this.classes[i].Id});
        }
        this.template.querySelector(".classesCombo").options = this.classOption;
    }

    addEdit(event){
        this.tasks.push(this.i);
        this.i++;
    }

    async classChange(event){
        this.classValue = event.detail.value;
        
        this.topics = [];
        this.topicsOption = [];
        this.subjectOptions = [];
        
        this.subjects = await getClassSubjects({classId: this.classValue});
        console.log(this.subjects);
        for (let i = 0; i < this.subjects.length; i++) {
            this.subjectOptions.push({label: this.subjects[i].Name, value: this.subjects[i].Id});
        }
        
        this.template.querySelector(".topicsCombo").options = this.topicsOption;
        this.template.querySelector(".subjectsCombo").options = this.subjectOptions;

        this.subjectDisabled = false;
        this.topicDisabled = true;
    }

    async subjectChange(event){
        this.subjectValue = event.detail.value;
        
        this.topicsOption = [];
        this.topics = await getSubjectTopics({subjectId: this.subjectValue});
        console.log(this.topics);
        for (let i = 0; i < this.topics.length; i++) {
            this.topicsOption.push({label: this.topics[i].Title__c, value: this.topics[i].Id});
        }

        this.template.querySelector(".topicsCombo").options = this.topicsOption;

        this.topicDisabled = false;
    }

    topicChange(event){
        this.topicValue = event.detail.value;
    }

    updateTitle(event){
        this.testTitle = event.detail.value;
    }

    updateDate(event){
        this.startDateValue = this.template.querySelector(".startDate").value;
        this.endDateValue = this.template.querySelector(".endDate").value;
        console.log(this.startDateValue);
        console.log(this.endDateValue);
    }
    
    async submitAllTasks(event){
        if(this.testTitle && this.endDateValue && this.startDateValue)
        {
            let allTasks = this.template.querySelectorAll("lightning-record-edit-form");
            let homeworkId = await createHomework({
                testTitle: this.testTitle,
                topicId: this.topicValue,
                startDate: this.startDateValue,
                endDate: this.endDateValue,
                classId: this.classValue
            });
            let testId = await createTest({title: this.testTitle, homeworkId: homeworkId});
            for(let i = 0; i < allTasks.length; i++)
            { 
                try {
                    let test = allTasks[i].querySelectorAll('lightning-input-field');
                    test[test.length - 1].value = testId;
                    allTasks[i].submit();
                    // console.log(test[test.length - 1].value);
                } catch (error) {
                    console.log(error)
                }
            }
        }
        setTimeout(() => {
            this.tasks.length = 0;
            this.template.querySelector("lightning-input").value = "";
            this.template.querySelector(".classesCombo").value = "";
            this.template.querySelector(".topicsCombo").value = "";
            this.template.querySelector(".topicsCombo").options = [];
            this.template.querySelector(".subjectsCombo").options = [];
            this.template.querySelector(".subjectsCombo").value = '';
            this.topicDisabled = true;
            this.template.querySelector(".startDate").value = "";
            this.template.querySelector(".endDate").value = "";
            this.startDateValue = undefined;
            this.endDateValue = undefined;
            this.i = 2;
            setTimeout(() => this.tasks.push(1), 250);
        }, 500)
    }
}