public without sharing class classChooseController {
    @AuraEnabled
    public static List<Class__c> getAvialibleClasses(){
        String usrId = UserInfo.getUserId();     
        Teacher__c teaher = [SELECT Id, School__c FROM Teacher__c WHERE User__c = :usrId];
        String schoolId = teaher.School__c;
        List<Class__c> classes = [SELECT Id, Grade__c, Suffix__c, School__c FROM Class__c WHERE School__c = :schoolId ORDER BY Grade__c];
        return classes;
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
    public static List<Subject__c> getTeacherClassSubjects(String classId){
        String usrId = UserInfo.getUserId();     
        Teacher__c teaher = [SELECT Id, School__c FROM Teacher__c WHERE User__c = :usrId];
        String teacherId = teaher.Id;
        List<TeachersSubject__c> teachSub = [SELECT Id, Subject__c FROM TeachersSubject__c];
        Set<Id> subjects = new Set<Id>();
        for (TeachersSubject__c variable : teachSub) {
            subjects.add(variable.Subject__c);
        }
        List<ClassSubject__c> classSub = [SELECT Id, Class__c, Subject__c FROM ClassSubject__c WHERE (Class__c = :classId AND Subject__c IN :subjects)];
        subjects.clear();
        for (ClassSubject__c variable : classSub) {
            subjects.add(variable.Subject__c);
        }
        List<Subject__c> resultSub = [SELECT Id, Name FROM Subject__c WHERE Id IN :subjects];
        return resultSub;
    }
}
