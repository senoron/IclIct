public without sharing class markTableController {
    @AuraEnabled
    public static List<Subject__c> getUserSubjects(){
        String usrId = UserInfo.getUserId();
        Student__c student = [SELECT Id, Class__c FROM Student__c WHERE User__c = :usrId];
        String studentId = student.Id;
        String classId = student.Class__c;

        List<ClassSubject__c> classSub = [SELECT Id, Subject__c FROM ClassSubject__c WHERE Class__c = :classId];
        set<Id> subjectIds = new Set<id>();
        for (ClassSubject__c variable : classSub) {
            subjectIds.add(variable.Subject__c);
        }
        List<Subject__c> subjects = [SELECT Id, Name FROM Subject__c WHERE Id IN :subjectIds];
        return subjects;
    }

    @AuraEnabled
    public static List<StudentsHomework__c>  getSubjectMarks(String subjectId){
        List<Topic__c> topics = [SELECT Id, Subject__c FROM Topic__c WHERE Subject__c = :subjectId];
        Set<Id> topicIds = new Set<Id>();
        for (Topic__c variable : topics) {
            topicIds.add(variable.Id);
        }
        List<Homework__c> homewroks = [SELECT Id FROM Homework__c WHERE Topic__c IN :topicIds];
        Set<id> homeworkIds = new Set<Id>();
        for (Homework__c variable : homewroks) {
            homeworkIds.add(variable.Id);
        }
        List<StudentsHomework__c> studHome = [SELECT Id, Student__c, Mark__c FROM StudentsHomework__c WHERE Homework__c IN :homeworkIds];
        return studHome;
    }
}