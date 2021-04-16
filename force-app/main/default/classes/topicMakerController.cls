public without sharing class topicMakerController {
    @AuraEnabled
    public static List<Class__c> getTeacherClasses(){
        System.debug(LoggingLevel.INFO, 'TeachClass');
        String usrId = UserInfo.getUserId();     
        Teacher__c teaher = [SELECT Id, School__c FROM Teacher__c WHERE User__c = :usrId];
        String teacherId = teaher.Id;
        List<TeachersSubject__c> teaherSubject = [SELECT Id, Subject__c FROM TeachersSubject__c WHERE Teacher__c = :teacherId];
        Set<Id> subjectsId = new Set<Id>();
        for (TeachersSubject__c variable : teaherSubject) {
            subjectsId.add(variable.Subject__c);
        }
        List<ClassSubject__c> classSubject = [SELECT Id, Class__c FROM ClassSubject__c WHERE Subject__c IN :subjectsId];
        Set<Id> classesId = new Set<Id>();
        for (ClassSubject__c variable : classSubject) {
            classesId.add(variable.Class__c);
        }
        return [SELECT
            Id,
            Grade__c,
            School__c,
            Suffix__c,
            Name
        FROM
            Class__c
        WHERE
            Id IN :classesId
        ORDER BY Grade__c];
    }

    @AuraEnabled
    public static List<Subject__c> getClassSubjects(String classId){
        List<ClassSubject__c> classSub = [SELECT Id, Subject__c FROM ClassSubject__c WHERE Class__c = :classId];
        Set<Id> subId = new Set<Id>();
        for (ClassSubject__c variable : classSub) {
            subId.add(variable.Subject__c);
        }
        List<Subject__c> sub = [SELECT Id, Name FROM Subject__c WHERE Id IN :subId];
        return sub;
    }

    @AuraEnabled
    public static List<Topic__c> getSubjectTopics(String subjectId){
        List<Topic__c> topics = [SELECT Id, Subject__c, Title__c FROM Topic__c WHERE Subject__c = :subjectId];
        return topics;
    }

    @AuraEnabled
    public static String addTopic(String subjectId, String title){
        Topic__c topic = new Topic__c();
        topic.Title__c = title;
        topic.Subject__c = subjectId;
        insert topic;
        return topic.Id;
    }

    @AuraEnabled
    public static void deleteTopic(String topicId){
        List<ContentDocumentLink> links = [SELECT Id, ContentDocumentId FROM ContentDocumentLink WHERE LinkedEntityId = :topicId];
        if(links != null && !links.isEmpty()){
            System.debug('links != null');
            Set<Id> documentIds = new Set<Id>();
            for (ContentDocumentLink variable : links) {
                documentIds.add(variable.ContentDocumentId);
            }
            delete [SELECT Id FROM ContentDocument WHERE Id IN :documentIds];
            delete [SELECT Id FROM ContentDocumentLink WHERE ContentDocumentId IN :documentIds];
        }
        delete [SELECT Id FROM Topic__c WHERE Id = :topicId];
    }

    @AuraEnabled
    public static List<ContentDocument> getDocumentByTopic(String topicId){
        List<ContentDocumentLink> links = [SELECT Id, ContentDocumentId FROM ContentDocumentLink WHERE LinkedEntityId = :topicId];
        Set<Id> ids = new Set<Id>();
        System.debug(LoggingLevel.INFO, 'getDocs');
        for (ContentDocumentLink variable : links) {
            ids.add(variable.ContentDocumentId);
        }
        List<ContentDocument> documents = [SELECT Id, Title, FileType FROM ContentDocument WHERE Id IN : ids ORDER BY CreatedDate];
        return documents;
    }

    @AuraEnabled
    public static void deleteFile(String documentId){
        delete [SELECT Id FROM ContentDocument WHERE Id = :documentId];
        delete [SELECT Id FROM ContentDocumentLink WHERE ContentDocumentId = :documentId];
    }

    
    @AuraEnabled
    public static String getFileUrl(String documentId){
        ContentDistribution ds = [SELECT Id, DistributionPublicUrl FROM ContentDistribution WHERE ContentDocumentId = :documentId];
        return ds.DistributionPublicUrl;
    }
}
