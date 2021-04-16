import {
    LightningElement,
    wire
} from 'lwc';

import LOGO_VAR1 from '@salesforce/resourceUrl/logo_var1';
import LOGO_VAR2 from '@salesforce/resourceUrl/logo_var2';

import isTeacher from '@salesforce/apex/HeaderController.isTeacher';

export default class CommunityHeader extends LightningElement {

    isTeacher = false;

    @wire(isTeacher)
    wiredTeacher({
        data,
        result
    }) {
        if (data) {
            this.isTeacher = data;
        }
    }

    get logo() {
        try {
            this.isTeacher ? LOGO_VAR1 : LOGO_VAR2;
        } catch (e) {}
    }

    logout() {
        open('/secur/logout.jsp', '_self');
    }

}