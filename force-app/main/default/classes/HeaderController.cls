public without sharing class HeaderController {
    
    @AuraEnabled(Cacheable=true)
    public static Boolean isTeacher(){
        try {
            return [SELECT IsTeacher__c FROM User WHERE Id =: UserInfo.getUserId() LIMIT 1].IsTeacher__c;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static void changeLanguage(){
       User u = [SELECT Name, Id, LocaleSidKey	 FROM User WHERE Id =: UserInfo.getUserId()];
        u.LocaleSidKey = u.LocaleSidKey == 'en_US' ? 'uK' : 'en_US';
        update u;
    }

}
