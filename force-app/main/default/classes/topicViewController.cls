public without sharing class topicViewController {
    @AuraEnabled
    public static List<Subject__c> getUserClasses(){
        String usrId = UserInfo.getUserId();
        Student__c student = [SELECT Id, Class__c FROM Student__c WHERE User__c = :usrId];
        String userClass = student.Class__c;
        List<ClassSubject__c> classSubjects = [SELECT id, Subject__c, Class__c FROM ClassSubject__c WHERE Class__c = :userClass];
        Set<Id> subjects = new Set<Id>();
        for (ClassSubject__c variable : classSubjects) {
            subjects.add(variable.Subject__c);
        }
        return [SELECT Id, Name FROM Subject__c WHERE Id IN :subjects];
    }

    @AuraEnabled
    public static List<Topic__c> getSubjectTopics(String subjectId){
        return [SELECT Id, Title__c FROM Topic__c WHERE Subject__c = :subjectId];
    }

    @AuraEnabled
    public static List<ContentDocument> getDocumentByTopic(String topicId){
        List<ContentDocumentLink> links = [SELECT Id, ContentDocumentId FROM ContentDocumentLink WHERE LinkedEntityId = :topicId];
        Set<Id> ids = new Set<Id>();
        for (ContentDocumentLink variable : links) {
            ids.add(variable.ContentDocumentId);
        }
        List<ContentDocument> documents = [SELECT Id, Title, FileType FROM ContentDocument WHERE Id IN : ids ORDER BY CreatedDate];
        return documents;
    }

    @AuraEnabled
    public static String getFileUrl(String documentId){
        ContentDistribution ds = [SELECT Id, DistributionPublicUrl FROM ContentDistribution WHERE ContentDocumentId = :documentId];
        return ds.DistributionPublicUrl;
    }
}
