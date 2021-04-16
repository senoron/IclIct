declare module "@salesforce/apex/topicViewController.getUserClasses" {
  export default function getUserClasses(): Promise<any>;
}
declare module "@salesforce/apex/topicViewController.getSubjectTopics" {
  export default function getSubjectTopics(param: {subjectId: any}): Promise<any>;
}
declare module "@salesforce/apex/topicViewController.getDocumentByTopic" {
  export default function getDocumentByTopic(param: {topicId: any}): Promise<any>;
}
declare module "@salesforce/apex/topicViewController.getFileUrl" {
  export default function getFileUrl(param: {documentId: any}): Promise<any>;
}
