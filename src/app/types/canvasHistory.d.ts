
type TAction = 'add' | 'delete' | 'modify'

export interface ICanvasHistory {
    action: TAction
    data: {
        object: fabric.Object[];
        tranformations?: fabric.Transform; // only when modified
    } // return type from .toJson() method
}