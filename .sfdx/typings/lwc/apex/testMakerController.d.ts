declare module "@salesforce/apex/testMakerController.getTeacherClasses" {
  export default function getTeacherClasses(): Promise<any>;
}
declare module "@salesforce/apex/testMakerController.getClassSubjects" {
  export default function getClassSubjects(param: {classId: any}): Promise<any>;
}
declare module "@salesforce/apex/testMakerController.getSubjectTopics" {
  export default function getSubjectTopics(param: {subjectId: any}): Promise<any>;
}
declare module "@salesforce/apex/testMakerController.createCalendarEntry" {
  export default function createCalendarEntry(param: {startDate: any, endDate: any, Name: any, classId: any, message: any}): Promise<any>;
}
declare module "@salesforce/apex/testMakerController.createHomework" {
  export default function createHomework(param: {testTitle: any, topicId: any, startDate: any, endDate: any, classId: any}): Promise<any>;
}
declare module "@salesforce/apex/testMakerController.createTest" {
  export default function createTest(param: {title: any, homeworkId: any}): Promise<any>;
}
