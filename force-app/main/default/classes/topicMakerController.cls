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


}
