public without sharing class classChooseController {
    @AuraEnabled
    public static List<Class__c> getAvialibleClasses(){
        String usrId = UserInfo.getUserId();     
        Teacher__c teaher = [SELECT Id, School__c FROM Teacher__c WHERE User__c = :usrId];
        String schoolId = teaher.School__c;
        List<Class__c> classes = [SELECT Id, Grade__c, Suffix__c, School__c FROM Class__c WHERE School__c = :schoolId ORDER BY Grade__c];
        return classes;
    }
}
