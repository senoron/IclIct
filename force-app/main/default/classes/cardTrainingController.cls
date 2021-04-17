public without sharing class cardTrainingController {
    @AuraEnabled
    public static List<CardSet__c> getAllSets(){
        String usrId = UserInfo.getUserId();
        Student__c student = [SELECT Id, Class__c FROM Student__c WHERE User__c = :usrId];
        String studentId = student.Id;

        List<CardSet__c> sets = [SELECT Id, Name FROM CardSet__c WHERE Student__c = :studentId];
        return sets;
    }

    @AuraEnabled
    public static List<Card__c> getSetCards(String setId){
        return [SELECT Id, Answer__c, Question__c FROM Card__c WHERE CardSet__c = :setId];
    }
}
