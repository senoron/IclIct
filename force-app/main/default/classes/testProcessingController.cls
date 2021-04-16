public without sharing class testProcessingController {
    @AuraEnabled
    public static Test__c getTest(String testId){
        Test__c test = [SELECT
        Id,
        Name,
        (
            SELECT
                Id,
                Var1__c,
                Var2__c,
                Var3__c,
                Question__c
            FROM
                Tasks__r
        )
        FROM
        Test__c WHERE Id = :testId LIMIT 1];
        return test;
    }

    @AuraEnabled
    public static void createStudentsHomework(String title, Integer mark, String testId){
        StudentsHomework__c stHome = new StudentsHomework__c();
        stHome.Mark__c = mark;
        stHome.Name = title;
        String usrId = UserInfo.getUserId();
        Student__c student = [SELECT Id, Class__c FROM Student__c WHERE User__c = :usrId];
        stHome.Student__c = student.Id;
        Test__c test = [SELECT Id, Homework__c FROM Test__c WHERE Id = :testId];
        stHome.Homework__c = test.Homework__c;
        insert stHome;
    }
}
