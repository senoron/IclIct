import { LightningElement, api } from 'lwc';

export default class TrainsTabs extends LightningElement {
    @api fistTab;
    @api secondTab;

    @api selectCardSet;
    @api enterTrainName;
    @api addNewCardName;
    @api addNewCard;
    @api addNewSet;
    @api chooseAddingTrain;
    @api question;
    @api answer;

    @api chooseTrain;
}