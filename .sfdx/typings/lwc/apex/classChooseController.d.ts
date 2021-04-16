declare module "@salesforce/apex/classChooseController.getAvialibleClasses" {
  export default function getAvialibleClasses(): Promise<any>;
}
declare module "@salesforce/apex/classChooseController.getClassSubjects" {
  export default function getClassSubjects(param: {classId: any}): Promise<any>;
}
declare module "@salesforce/apex/classChooseController.getTeacherClassSubjects" {
  export default function getTeacherClassSubjects(param: {classId: any}): Promise<any>;
}
declare module "@salesforce/apex/classChooseController.addTeacherSubject" {
  export default function addTeacherSubject(param: {subId: any}): Promise<any>;
}
declare module "@salesforce/apex/classChooseController.deleteTeacherSubject" {
  export default function deleteTeacherSubject(param: {subId: any}): Promise<any>;
}
