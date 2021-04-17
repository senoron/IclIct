declare module "@salesforce/apex/cardTrainingController.getAllSets" {
  export default function getAllSets(): Promise<any>;
}
declare module "@salesforce/apex/cardTrainingController.getSetCards" {
  export default function getSetCards(param: {setId: any}): Promise<any>;
}
