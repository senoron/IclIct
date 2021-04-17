public without sharing class MyEventsController {
   @AuraEnabled
   public static List<Object> getCalendarEntries(){
    Student__c std = [SELECT Id, Class__c FROM Student__c WHERE User__c =: UserInfo.getUserId()];
    return [SELECT Id, Name, StartDate__c, EndDate__c, Message__c FROM CalendarEntry__c WHERE Class__c =: std.Class__c];
   }
}
