import {
    LightningElement,
    wire
} from 'lwc';

import LOGO_VAR1 from '@salesforce/resourceUrl/logo_var1';
import LOGO_VAR2 from '@salesforce/resourceUrl/logo_var2';

import isTeacher from '@salesforce/apex/HeaderController.isTeacher';
import changeLang from '@salesforce/apex/HeaderController.changeLanguage';

export default class CommunityHeader extends LightningElement {

    @wire(isTeacher)
    wiredTeacher({
        data,
        error
    }) {
        if (data) {
            this.logo = LOGO_VAR2;
        }
    }

    // get logo() {
    //     try {
    //         this.isTeacher ? LOGO_VAR1 : LOGO_VAR2;
    //     } catch (e) {}
    // }

    logo = LOGO_VAR1;

    logout() {
        open('/secur/logout.jsp', '_self');
    }

    async changeLanguage() {
        await changeLang();
        open(location.href, '_self');
    }

}