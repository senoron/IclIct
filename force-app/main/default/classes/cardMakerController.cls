public without sharing class cardMakerController {
    @AuraEnabled
    public static List<CardSet__c> getUserSets(){
        String usrId = UserInfo.getUserId();
        Student__c student = [SELECT Id FROM Student__c WHERE User__c = :usrId];
        String studentId = student.Id;
        List<CardSet__c> sets = [SELECT Id, Name FROM CardSet__c WHERE Student__c  = :studentId];
        return sets;
    }

    @AuraEnabled
    public static String createCardSet(String setName){
        String usrId = UserInfo.getUserId();
        Student__c student = [SELECT Id FROM Student__c WHERE User__c = :usrId];
        String studentId = student.Id;

        CardSet__c cardSet = new CardSet__c();
        cardSet.Name = setName;
        cardSet.Student__c = studentId;
        insert cardSet;
        return cardSet.Id;
    }

    @AuraEnabled
    public static List<Card__c> getSetCards(String setId){
        List<Card__c> cards = [SELECT Id, CardSet__c, Question__c, Answer__c FROM Card__c WHERE CardSet__c = :setId];
        return cards;
    }

    @AuraEnabled
    public static void  deleteCard(String cardId){
        delete [SELECT Id FROM Card__C WHERE Id = :cardId];
    }

    @AuraEnabled
    public static void deleteCardSet(String setId){
        List<Card__c> cards = [SELECT Id FROM Card__c WHERE CardSet__c = :setId];
        delete cards;
        delete [SELECT Id FROM CardSet__c WHERE Id = :setId];
    }
}
