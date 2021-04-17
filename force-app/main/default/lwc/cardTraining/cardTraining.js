import { api, LightningElement, track } from 'lwc';
import getAllSets from '@salesforce/apex/cardTrainingController.getAllSets';
import getSetCards from '@salesforce/apex/cardTrainingController.getSetCards';

export default class CardTraining extends LightningElement {
    sets = [];
    setsOptions = [];
    
    @api chooseTrain;

    @track cardEnabled = false;
    @track cardVisible = false;
    @track task;

    currentCards = [];


    trainValue = '';

    cardSet;

    async connectedCallback(){
        this.sets = await getAllSets();
        for (let i = 0; i < this.sets.length; i++) {
            this.setsOptions.push({label: this.sets[i].Name, value: this.sets[i].Id});
        }
        this.template.querySelector(".setsCombo").options = this.setsOptions;
    }

    async trainChange(event){
        this.trainValue = event.detail.value;
        this.currentCards = await getSetCards({setId: this.trainValue});
        this.task = this.currentCards[Math.floor(Math.random() * this.currentCards.length)];
        console.log(this.task);
        this.cardEnabled = true;
        this.cardVisible = false;
    }

    handleShow(event){
        this.cardVisible = true;
    }

    handleNext(event){
        this.task = this.currentCards[Math.floor(Math.random() * this.currentCards.length)];
        this.cardVisible = false;
    }

}