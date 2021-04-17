import { LightningElement, track, api } from 'lwc';
import getUserSets from '@salesforce/apex/cardMakerController.getUserSets';
import createCardSet from '@salesforce/apex/cardMakerController.createCardSet';
import getSetCards from '@salesforce/apex/cardMakerController.getSetCards';
import deleteCard from '@salesforce/apex/cardMakerController.deleteCard';
import deleteCardSet from '@salesforce/apex/cardMakerController.deleteCardSet';
export default class CardMaker extends LightningElement {
    trainName = '';

    @track isAddEnabled = true;
    @api selectCardSet;
    @api enterTrainName;
    @api addNewCard;
    @api addNewSet;
    @api chooseAddingTrain;
    @api question;
    @api answer;

    setsValue = '';
    @track sets = [];
    setsOptions = [];

    async updateSets(event){
        this.sets = await getUserSets();
        this.setsOptions = [];
        for (let i = 0; i < this.sets.length; i++) {
            this.setsOptions.push({label: this.sets[i].Name, value: this.sets[i].Id});
            this.sets[i].cards = await getSetCards({setId: this.sets[i].Id});
        }
        this.template.querySelector(".setsCombo").options = this.setsOptions;       
    }

    async connectedCallback(){
        await this.updateSets();
        console.log(this.sets);
    }

    updateName(event){
        this.trainName = event.detail.value;
    }

    setsChange(event){
        this.setsValue = event.detail.value;
        this.isAddEnabled = false;
    }

    
    async addNewCard(event){
        let inputs = this.template.querySelectorAll("lightning-input-field");
        
        if(inputs[0].value != '' && inputs[1].value){
            let form = this.template.querySelector("lightning-record-edit-form");
            let cards = form.querySelectorAll("lightning-input-field");
            cards[cards.length - 1].value = this.setsValue;
            form.submit();
            cards[0].value = '';
            cards[1].value = '';
            if(this.template.querySelector(".setsCombo").value == ''){
                this.isAddEnabled = true;
            }
            await this.updateSets(); 
        }
    }

    async createCardSet(event){
        await createCardSet({setName: this.trainName});
        this.template.querySelector(".newCardInput").value = '';
        this.trainName = '';
        await this.updateSets();
    }

    async deleteSet(event){
        await deleteCardSet({setId: event.currentTarget.value});
        await this.updateSets();
    }

    async deleteCard(event){
        await deleteCard({cardId: event.currentTarget.value});
        await this.updateSets();
    }
}