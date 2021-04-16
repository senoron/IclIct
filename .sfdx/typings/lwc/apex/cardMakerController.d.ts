declare module "@salesforce/apex/cardMakerController.getUserSets" {
  export default function getUserSets(): Promise<any>;
}
declare module "@salesforce/apex/cardMakerController.createCardSet" {
  export default function createCardSet(param: {setName: any}): Promise<any>;
}
declare module "@salesforce/apex/cardMakerController.getSetCards" {
  export default function getSetCards(param: {setId: any}): Promise<any>;
}
declare module "@salesforce/apex/cardMakerController.deleteCard" {
  export default function deleteCard(param: {cardId: any}): Promise<any>;
}
declare module "@salesforce/apex/cardMakerController.deleteCardSet" {
  export default function deleteCardSet(param: {setId: any}): Promise<any>;
}
