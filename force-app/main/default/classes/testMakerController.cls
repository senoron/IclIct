public without sharing class testMakerController {
    @AuraEnabled
    public static Class__c[] getTeacherClasses(){
        String usrId = UserInfo.getUserId();     
        Teacher__c teaher = [SELECT Id FROM Teacher__c WHERE User__c = :usrId];
        TeachersSubject__c[] teaherSubject = [SELECT Id, Subject__c FROM TeachersSubject__c WHERE Teacher__c = :teaher.Id];
        Set<Id> subjectsId = new Set<Id>();
        for (TeachersSubject__c variable : teaherSubject) {
            subjectsId.add(variable.Subject__c);
        }
        ClassSubject__c[] classSubject = [SELECT Id, Class__c FROM ClassSubject__c WHERE Subject__c IN :subjectsId];
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
    public static String createCalendarEntry(Datetime startDate, Datetime endDate, String Name, String classId, String message){
        String usrId = UserInfo.getUserId();     
        Teacher__c teaher = [SELECT Id FROM Teacher__c WHERE User__c = :usrId];
        CalendarEntry__c entry = new CalendarEntry__c();
        entry.StartDate__c = startDate;
        entry.EndDate__c = endDate;
        entry.Name = Name;
        entry.Message__c = Name;
        entry.Teacher__c = teaher.Id;
        entry.Class__c = classId;
        insert entry;
        return entry.Id;
    }

    @AuraEnabled
    public static String createHomework(String testTitle, String topicId, Datetime startDate, Datetime endDate, String classId){
        Homework__c work = new Homework__c();
        work.Type__c = 'Test';
        work.Title__c = testTitle;
        work.Topic__c = topicId;
        work.IsControlWork__c = true;
        work.StartDate__c = startDate;
        work.EndDate__c = endDate;
        insert work;
        createCalendarEntry(startDate, endDate, testTitle, classId, testTitle);
        return work.Id;
    }

    @AuraEnabled
    public static String createTest(String title, String homeworkId){
        Test__c test = new Test__c();
        test.Name = title;
        test.Homework__c = homeworkId;
        insert test;
        return test.Id;
    }
}