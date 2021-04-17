import { LightningElement } from 'lwc';

import getFileUrl from '@salesforce/apex/homeworkProcessingController.getFileUrl';
import createStdHomework from '@salesforce/apex/homeworkProcessingController.createStudentsHomework';

export default class HomeworkProcessing extends LightningElement {


    async openFile() {

        const query = location.search;
        const params = URLSearchParams(query);
        const id = params.get('documentId');

        const url = await getFileUrl({documentId : id});
        open(url, '_blank');
    }

    async uploadFinished(event) {
        const files = event.detail.files;
        const file = files[0];

        const query = location.search;
        const params = URLSearchParams(query);
        const id = params.get('documentId');

        createStdHomework({documentId : file.documentId, assignmentDocumentId: id});
        open('/s/', '_self');
    }

}