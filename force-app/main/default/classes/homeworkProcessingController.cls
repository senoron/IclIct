public without sharing class homeworkProcessingController {
    @AuraEnabled
    public static String getFileUrl(String documentId){
        ContentDistribution ds = [SELECT Id, DistributionPublicUrl FROM ContentDistribution WHERE ContentDocumentId = :documentId LIMIT 1];
        return ds.DistributionPublicUrl;
    }

    @AuraEnabled
    public static void createStudentsHomework(String documentId, String assignmentDocumentId){
        
        List<ContentDocumentLink> links = [SELECT Id, LinkedEntityId, ContentDocument.Title FROM ContentDocumentLink WHERE ContentDocumentId =: assignmentDocumentId];

        ContentDocumentLink link;

        for (ContentDocumentLink searchLink : links) {
            if (String.valueOf(searchLink.LinkedEntityId).startsWith('a06')) {
                link = searchLink;
                break;
            }
        }

        Student__c std = [SELECT Id FROM Student__c WHERE User__c =: UserInfo.getUserId()];

        Homework__c homework = [SELECT Id, Name FROM Homework__c WHERE Id =: link.LinkedEntityId];

        StudentsHomework__c stdHomework = new StudentsHomework__c();
        stdHomework.Name = link.ContentDocument.Title;
        stdHomework.Homework__c = homework.Id;
        stdHomework.Student__c = std.Id;

        insert stdHomework;

        ContentDocumentLink newLink = new ContentDocumentLink();
        newLink.ContentDocumentId = documentId;
        newLink.LinkedEntityId = stdHomework.Id;

        insert newLink;
    }
}
