public without sharing class ToEvaluateController {
    
    @AuraEnabled
    public static List<Object> getStudentsHomeworks(
        String classId,
        String topicId,
        String subjectId
    ){
        List<Homework__c> homeworks = [SELECT Id, Name FROM Homework__c WHERE Topic__c =: topicId];
        Set<Id> hIds = new Set<Id>();

        for (Homework__c homework : homeworks) {
            hIds.add(homework.Id);
        }

        List<StudentsHomework__c> stdHomeworks = [SELECT Id, Name,
                                                 (SELECT ContentDocumentId FROM ContentDocumentLinks)
                                                  FROM StudentsHomework__c 
                                                  WHERE Homework__c IN: hIds AND Student__r.Class__c =: classId AND Mark__c = null];

        return stdHomeworks;
    }

    @AuraEnabled
    public static void updateHomework(String recordId, Integer mark){
        StudentsHomework__c stdHomework = new StudentsHomework__c(
            Id = recordId, Mark__c = mark
        );

        update stdHomework;
    }

}
