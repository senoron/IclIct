trigger ContentDocumentLinkTrigger on ContentDocumentLink (before insert) {
    for(ContentDocumentLink l:Trigger.new) {
        l.Visibility='AllUsers';

        // Set<Id> documentIds = new Set<Id>();

        // for (ContentDocumentLink link : new List<ContentDocumentLink>{l}) {
        //     documentIds.add(link.ContentDocumentId);
        // }

        // List<ContentVersion> contVers = [SELECT Id, FileType FROM ContentVersion WHERE ContentDocumentId IN: documentIds];
        // ContentTriggerHandler.createPublicLinkForFile(contVers);
    }
}