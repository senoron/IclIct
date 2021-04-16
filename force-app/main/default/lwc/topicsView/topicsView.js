import { LightningElement, track } from 'lwc';
import getUserClasses from '@salesforce/apex/topicViewController.getUserClasses';
import getSubjectTopics from '@salesforce/apex/topicViewController.getSubjectTopics';
import getDocumentByTopic from '@salesforce/apex/topicViewController.getDocumentByTopic';
import getFileUrl from '@salesforce/apex/topicViewController.getFileUrl';

export default class TopicsView extends LightningElement {
    @track subjects = [];

    async connectedCallback(){
        this.subjects = await getUserClasses();
        for (let i = 0; i < this.subjects.length; i++) {
            this.subjects[i].topics = await getSubjectTopics({subjectId: this.subjects[i].Id});
            for (let j = 0; j < this.subjects[i].topics.length; j++) {
                this.subjects[i].topics[j].files = await getDocumentByTopic({topicId: this.subjects[i].topics[j].Id});
            }
        }
    }

    async navigateToFiles(event){
        let url = await getFileUrl({documentId: event.currentTarget.value});
        open(url, "_blank");
    }

}