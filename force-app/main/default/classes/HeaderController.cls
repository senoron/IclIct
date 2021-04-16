public without sharing class HeaderController {
    
    @AuraEnabled(Cacheable=true)
    public static Boolean isTeacher(){
        try {
            return [SELECT IsTeacher__c FROM User WHERE Id =: UserInfo.getUserId() LIMIT 1].IsTeacher__c;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

}
