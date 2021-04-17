import { LightningElement, api } from 'lwc';

export default class AssignmentsBuilder extends LightningElement {
    @api testBuilder;
    @api homeworkBuilder;

    @api uploadFileLabel;
    @api chooseClassLabel;
    @api chooseSubjectLabel;
    @api chooseTopicLabel;
    @api startLabel;
    @api endLabel;

    @api addNewLabel;
    @api submitLabel;
    @api testTitleLabel;
    @api taskLabel;

}