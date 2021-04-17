public without sharing class HomeworkMakerController {
    @AuraEnabled
    public static void createLink(String recordId, String documentId){
        
        ContentDocumentLink link = new ContentDocumentLink();

        link.ContentDocumentId = documentId;
        link.LinkedEntityId = recordId;

        insert link;

    }

    @AuraEnabled
    public static String createHomework(String testTitle, String topicId, Datetime startDate, Datetime endDate, String classId){
        Homework__c work = new Homework__c();
        work.Type__c = 'Homework';
        work.Title__c = testTitle;
        work.Topic__c = topicId;
        work.IsControlWork__c = false;
        work.StartDate__c = startDate;
        work.EndDate__c = endDate;
        insert work;
        testMakerController.createCalendarEntry(startDate, endDate, testTitle, classId, testTitle);
        return work.Id;
    }
}
