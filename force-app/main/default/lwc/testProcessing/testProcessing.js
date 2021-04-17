import { LightningElement, track, api } from 'lwc';
import getTest from '@salesforce/apex/testProcessingController.getTest';
import createStudentsHomework from '@salesforce/apex/testProcessingController.createStudentsHomework';
export default class TestProcessing extends LightningElement {
    
    testId =  '';
    option = [];
    @track tasks = [];
    currentTest;


    async shuffle(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }

    async connectedCallback(){
        this.testId = URLSearchParams(location.search).get("testId");
        this.currentTest = await getTest({testId: this.testId});
        this.tasks = this.currentTest.Tasks__r;
        await this.shuffle(this.tasks);
        let tempArray = [];
        //let tempRadio;
        for(let i = 0; i < this.tasks.length; i++)
        {
            tempArray = [];
            tempArray.push({label: this.tasks[i].Var1__c, value: this.tasks[i].Var1__c});
            tempArray.push({label: this.tasks[i].Var2__c, value: this.tasks[i].Var2__c});
            tempArray.push({label: this.tasks[i].Var3__c, value: this.tasks[i].Var3__c});
            this.shuffle(tempArray);
            this.template.querySelector('[data-id="' + this.tasks[i].Id + '"]').options = tempArray;
        }   
    }

    async finishTest(event){
        let mark = 0;
        let maxMark = this.tasks.length;

        for (let i = 0; i < this.tasks.length; i++) {
            if(this.template.querySelector('[data-id="' + this.tasks[i].Id + '"]').value == this.tasks[i].Var1__c) mark++;
        }

        let finalMark = mark / maxMark * 12;
        await createStudentsHomework({title: this.currentTest.Name, mark: finalMark, testId: this.currentTest.Id});
        console.log("Closed");
        open("/s/", "_self");
    }
}