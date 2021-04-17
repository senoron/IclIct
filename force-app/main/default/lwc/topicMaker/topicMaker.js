import { LightningElement, track, api } from 'lwc';
import getTeacherClasses from '@salesforce/apex/topicMakerController.getTeacherClasses';
import getClassSubjects from '@salesforce/apex/topicMakerController.getClassSubjects';
import addTopic from '@salesforce/apex/topicMakerController.addTopic';
import getSubjectTopics from '@salesforce/apex/topicMakerController.getSubjectTopics';
import deleteTopic from '@salesforce/apex/topicMakerController.deleteTopic';
import getDocumentByTopic from '@salesforce/apex/topicMakerController.getDocumentByTopic';
import deleteTopicFile from '@salesforce/apex/topicMakerController.deleteFile';
import getFileUrl from '@salesforce/apex/topicMakerController.getFileUrl';
export default class TopicMaker extends LightningElement {
    
    @api uploadTopic = '';
    @api chooseSubject = '';
    @api chooseClass = '';
    @api selectClass;
    @api selectSubject;
    @api addButtonName;
    
    classes = [];
    classOptions = [];
    classValue = '';

    @api label = '';

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
        this.subjects = [];
        this.subjectOptions = [];
        this.topics = [];
        this.subjects = await getClassSubjects({classId: this.classValue});
        for (let i = 0; i < this.subjects.length; i++) {
            this.subjectOptions.push({label: this.subjects[i].Name, value: this.subjects[i].Id});
        }
        this.template.querySelector(".subjectsCombo").options = this.subjectOptions;
        this.template.querySelector(".subjectsCombo").value = '';
        this.isSubjectDisabled = false;
    }

    async updateTopics(){
        this.topics = await getSubjectTopics({subjectId: this.subjectValue});
        for (let i = 0; i < this.topics.length; i++) {
            this.topics[i].files = await getDocumentByTopic({topicId: this.topics[i].Id});
            //console.log(this.topics[i].files);
        }
        //console.log(this.topics);
    }
    
    async addNewTopic(event){
        if(this.topicLabel !== ''){
            await addTopic({subjectId: this.subjectValue, title: this.topicTitle})
        }
        this.template.querySelector(".topicInput").value = '';
        this.topicTitle = '';
        this.updateTopics();
    }

    changeTopicTitle(event){
        this.topicTitle = event.detail.value;
    }

    subjectsChange(event){
        this.subjectValue = event.detail.value;
        this.updateTopics();
    }

    handleUploadFinished(event){
        console.log('File uploaded');
        this.updateTopics();
    }

    async navigateToFiles(event){
        console.log(event.currentTarget.value);
        let url = await getFileUrl({documentId: event.currentTarget.value});
        open(url, "_blank");
    }

    async deleteFile(event){
        console.log(event.currentTarget.value);
        await deleteTopicFile({documentId: event.currentTarget.value});
        console.log("File deleted");
        this.updateTopics();
    }

    get acceptedFormats() {
        return ['.pdf', '.png', '.DOCX'];
    }

    async deleteTopic(event){
        await deleteTopic({topicId: event.currentTarget.value});
        this.topics = await getSubjectTopics({subjectId: this.subjectValue});
        this.updateTopics();
    }
}