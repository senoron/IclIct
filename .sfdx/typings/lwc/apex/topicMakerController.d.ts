declare module "@salesforce/apex/topicMakerController.getTeacherClasses" {
  export default function getTeacherClasses(): Promise<any>;
}
declare module "@salesforce/apex/topicMakerController.getClassSubjects" {
  export default function getClassSubjects(param: {classId: any}): Promise<any>;
}
declare module "@salesforce/apex/topicMakerController.getSubjectTopics" {
  export default function getSubjectTopics(param: {subjectId: any}): Promise<any>;
}
declare module "@salesforce/apex/topicMakerController.addTopic" {
  export default function addTopic(param: {subjectId: any, title: any}): Promise<any>;
}
declare module "@salesforce/apex/topicMakerController.deleteTopic" {
  export default function deleteTopic(param: {topicId: any}): Promise<any>;
}
declare module "@salesforce/apex/topicMakerController.getDocumentByTopic" {
  export default function getDocumentByTopic(param: {topicId: any}): Promise<any>;
}
declare module "@salesforce/apex/topicMakerController.deleteFile" {
  export default function deleteFile(param: {documentId: any}): Promise<any>;
}
declare module "@salesforce/apex/topicMakerController.getFileUrl" {
  export default function getFileUrl(param: {documentId: any}): Promise<any>;
}
