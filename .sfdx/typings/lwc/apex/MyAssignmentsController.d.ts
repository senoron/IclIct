declare module "@salesforce/apex/MyAssignmentsController.getClass" {
  export default function getClass(): Promise<any>;
}
declare module "@salesforce/apex/MyAssignmentsController.getSubjects" {
  export default function getSubjects(param: {classId: any}): Promise<any>;
}
declare module "@salesforce/apex/MyAssignmentsController.getFileUrl" {
  export default function getFileUrl(param: {documentId: any}): Promise<any>;
}