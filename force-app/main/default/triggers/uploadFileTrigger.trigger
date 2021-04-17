trigger uploadFileTrigger on ContentVersion (after insert) {
	ContentTriggerHandler.createPublicLinkForFile(trigger.new);
}