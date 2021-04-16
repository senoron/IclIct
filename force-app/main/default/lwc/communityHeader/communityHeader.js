import {
    LightningElement
} from 'lwc';

export default class CommunityHeader extends LightningElement {

    logout() {
        open('/secur/logout.jsp', '_self');
    }

}