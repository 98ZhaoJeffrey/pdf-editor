export type TShape = "Line" | "Rectangle" | "Triangle" | "Circle" 


export type TShapeOptions = {
    left: number, 
    top: number,
    size: number,
    fill: string,
    selectable: boolean,
    hasControls: boolean,
}
