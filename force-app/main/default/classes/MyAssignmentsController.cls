public without sharing class MyAssignmentsController {
    
    @AuraEnabled(Cacheable=true)
    public static Class__c getClass(){
        try {
            
            String userId = UserInfo.getUserId();

            Student__c student = [SELECT Id, Name, Class__c FROM Student__c WHERE User__c =: userId LIMIT 1];
            Class__c stdClass = [SELECT Id, Name FROM Class__C WHERE Id =: student.Class__c];

            return stdClass;

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(Cacheable=true)
    public static  Map<String, Object> getSubjects(String classId){
            List<ClassSubject__c> classSubjects = [SELECT Id, Name, Subject__c FROM ClassSubject__c WHERE Class__c =: classId];

            Set<Id> subjectsId = new Set<Id>();
            for (ClassSubject__c classSubject : classSubjects) {
                subjectsId.add(classSubject.Subject__c);
            }

            List<Subject__c> subjects = [SELECT Id, Name, (SELECT Id, Name FROM Topics__r) FROM Subject__c WHERE Id IN: subjectsId];

            Set<Id> topicsId = new Set<Id>();

            for(Subject__c sub : subjects){
                for (Topic__c top : sub.Topics__r) {
                    topicsId.add(top.Id);
                }
            }

            List<Topic__c> topics = [SELECT Id, Name, Subject__r.Name, Title__c, (SELECT Id, Name, IsControlWork__c, Topic__c FROM Homeworks__r) FROM Topic__c WHERE Id IN: topicsId];
            
            Set<Id> homeworksId = new Set<Id>();

            for (Topic__c top : topics) {
                for (Homework__c homework : top.Homeworks__r) {
                    homeworksId.add(homework.Id);
                }
            }

            List<Test__c> tests = [SELECT Id, Name, Homework__c FROM Test__c WHERE Homework__c IN: homeworksId];
            Map<String, List<Test__c>> testsByHomeworkId = new Map<String, List<Test__c>>();

            for (Test__c test : tests) {

                if (!testsByHomeworkId.containsKey(test.Homework__c)) {
                    testsByHomeworkId.put(test.Homework__c, new List<Test__c>());
                }

                testsByHomeworkId.get(test.Homework__c).add(test);
            }
            
            Map<String, Object> finalResultMap = new Map<String, Object>();
            Map<String, List<Topic__c>> resultMap = new Map<String, List<Topic__c>>();


            for (Topic__c top : topics) {

                if (!resultMap.containsKey(top.Subject__r.Name)) {
                    resultMap.put(top.Subject__r.Name, new List<Topic__c>());
                }
                
                resultMap.get(top.Subject__r.Name).add(top);
            }

            finalResultMap.put('data', resultMap);
            finalResultMap.put('tests', testsByHomeworkId);

            return finalResultMap;
       
    }
}
