// import { FabricObject, Canvas, IText, PencilBrush, TPointerEvent, TPointerEventInfo, Text } from 'fabric';
import { fabric } from 'fabric'
import { TextToolsStoreInterface } from '../stores/TextToolsStore';
import { DrawToolsStoreInterface } from '../stores/DrawToolsStore';
import { ShapeToolsStoreInterface } from '../stores/ShapeToolsStore';
import { StoreApi } from 'zustand';
import { BRUSH_TYPES, SHAPES } from '../contants';
import { brushOptions } from '../types/brushes';
import { ToolStoreInterface } from '../stores/ToolStore';
import { TShape, TShapeOptions } from '../types/shape';
import { IObjectOptions } from 'fabric/fabric-impl';
import HistoryStack from './historyStack';
import { ICanvasHistory, TAction } from '../types/canvasHistory';
import { generateId } from './generateId';
import { captializeFirst } from './stringFuncs';


type TCanvasModes = "select" | "text" | "draw" | "shape"

class PdfCanvas {
    /**
     * @type Canvas
     * @private
     */
    _canvas: fabric.Canvas
    _textModes: StoreApi<TextToolsStoreInterface>
    _drawModes: StoreApi<DrawToolsStoreInterface>
    _shapeModes: StoreApi<ShapeToolsStoreInterface>
    _toolModes: StoreApi<ToolStoreInterface>
    _currentShapePoint: fabric.Point | undefined
    _currentShape: fabric.Line | fabric.Circle | fabric.Rect | fabric.Triangle | undefined
    _historyStack: HistoryStack<ICanvasHistory>
    _historyProcessing: boolean // when we undo/redo and add/remove item, prevents recursive calls

    constructor(canvasElement: HTMLCanvasElement, 
        textModes: StoreApi<TextToolsStoreInterface>, 
        drawModes: StoreApi<DrawToolsStoreInterface>, 
        shapeModes: StoreApi<ShapeToolsStoreInterface>,
        toolModes: StoreApi<ToolStoreInterface>, 
        options?: {}) 
        {
            this._canvas = new fabric.Canvas(canvasElement, options);
            this._textModes = textModes;
            this._drawModes = drawModes;
            this._shapeModes = shapeModes;
            this._toolModes = toolModes;
            this._historyStack = new HistoryStack();
            this._historyProcessing = false;
            this._addListeners();
        }

    /**
     * 
     * Adds all the listeners to the canvas
     */
    _addListeners() {
        this._canvas.on('mouse:down', (event: fabric.IEvent<MouseEvent>) => this._handleMouseDown(event));
        this._canvas.on('mouse:up', (event: fabric.IEvent<MouseEvent>) => this._handleMouseUp(event));
        this._canvas.on('mouse:move', (event: fabric.IEvent<MouseEvent>) => this._handleMouseMove(event));
        //this._canvas.on('text:editing:exited', (event: fabric.IEvent<MouseEvent>) => this._exitTextEdit());

        // for updating the history of the object
        this._canvas.on("object:added", (event: fabric.IEvent<MouseEvent>) => this._saveAction(event, "add"))
        this._canvas.on("object:removed", (event: fabric.IEvent<MouseEvent>) => this._saveAction(event, "delete"))
        this._canvas.on("object:modified", (event: fabric.IEvent<MouseEvent>) => this._saveAction(event, "modify"))
    }

    /**
     * 
     * @param event 
     * @param options 
     * Adds interactive text box to the canvas
     */
    _addText (event: fabric.IEvent<MouseEvent>, options: object) {
        const text = new fabric.IText('', {...options, id: generateId()});
        this._canvas.add(text);
        this._canvas.setActiveObject(text);
        text.enterEditing()
        text.on('selected', () => this._editText(text));
        text.on('deselected', () => {
            text.off('deselected', () => {});
            if(!text.text || text.text.trim().length === 0){
                this._canvas.remove(text)
            }
        })
    }

    _editText (text: fabric.IText) {
        // Set the text object as active for editing
        this._canvas.setActiveObject(text);
    }

    _exitTextEdit () {
        this._canvas.selection = true;
        this._toolModes.getState().setTool("select")
    }

    _enableDrawing () {
        const { color, size } = this._toolModes.getState();
        const { brushType } = this._drawModes.getState();
        this._canvas.freeDrawingBrush = new BRUSH_TYPES[brushType].brush(this._canvas);
        this._canvas.freeDrawingBrush.width = size;
        this._canvas.freeDrawingBrush.color = color;
    }

    _addShape(event: fabric.IEvent<MouseEvent>, shape: TShape, options: TShapeOptions) {
        const pointer = this._canvas.getPointer(event.e);   
        const fabricShape = new SHAPES[shape].shape(); 
        fabricShape.stroke = options.fill;
        fabricShape.fill = '';
        fabricShape.strokeWidth = options.size;
        fabricShape.selectable = options.selectable;
        fabricShape.hasControls = options.hasControls;
        fabricShape.left = options.left;
        fabricShape.top = options.top;
        fabricShape.id = generateId(); 

        if(fabricShape instanceof fabric.Circle){
            fabricShape.radius = 0;
        } else if (fabricShape instanceof fabric.Rect || fabricShape instanceof fabric.Triangle){
            fabricShape.width = 0;
            fabricShape.height = 0;
        } else if (fabricShape instanceof fabric.Line) {
            if(this._currentShapePoint){
                fabricShape.set({
                    x1: pointer.x,
                    y1: pointer.y,
                    x2: this._currentShapePoint.x,
                    y2: this._currentShapePoint.y
                })
            }
        }

        this._currentShape = fabricShape;
        this._canvas.add(this._currentShape);
    }

    _finializeShape() {
        if(this._currentShape){
            this._currentShape.setCoords();
            this._currentShape = undefined;
            this._canvas.requestRenderAll();
        }
        this._currentShapePoint = undefined;
    }

 
    // handleSelection(event: fabric.IEvent<MouseEvent>) {
    //     this._canvas.defaultCursor = 'default';
    //     this._canvas.hoverCursor = 'pointer';
    //     this._canvas.isDrawingMode = false;
    //     this._canvas.selection = true;
    //     // this._canvas.forEachObject((currentValue: fabric.BaseFabricObject) => {
    //     //     currentValue.set({selectable: true})
    //     // });
    // }

    _handleMouseMove (event: fabric.IEvent<MouseEvent>) {
        if(this._currentShape && this._currentShapePoint){
            const pointer = this._canvas.getPointer(event.e);
     
            if(this._currentShape instanceof fabric.Line) {
                this._currentShape.set({ x2: pointer.x, y2: pointer.y })
            } else if(this._currentShape instanceof fabric.Circle) {
                if(this._currentShapePoint.x> pointer.x){
                    this._currentShape.set({ left: Math.abs(pointer.x) }); 
                }
                if(this._currentShapePoint.y > pointer.y){
                    this._currentShape.set({ top: Math.abs(pointer.y) });
                }
                const dist = Math.max(Math.abs(this._currentShapePoint.y - pointer.y), Math.abs(this._currentShapePoint.x - pointer.x))/2;
                this._currentShape.set({radius: dist})
            } else if(this._currentShape instanceof fabric.Rect || this._currentShape instanceof fabric.Triangle) {
                if(this._currentShapePoint.x> pointer.x){
                    this._currentShape.set({ left: Math.abs(pointer.x) }); 
                }
                if(this._currentShapePoint.y > pointer.y){
                    this._currentShape.set({ top: Math.abs(pointer.y) });
                }
                this._currentShape.width = Math.abs(this._currentShapePoint.x - pointer.x);
                this._currentShape.height = Math.abs(this._currentShapePoint.y - pointer.y);
            }
        }
        this._canvas.requestRenderAll();
    }

    _handleMouseUp (event: fabric.IEvent<MouseEvent>) {
        const tool = this._toolModes.getState().tool;
        if(tool === 'shape'){
            this._finializeShape(); // for shape events
            this._toolModes.getState().setTool("select")
        }
        else if(tool === 'draw') {
        }

    }

    _handleMouseDown (event: fabric.IEvent<MouseEvent>) {
        const pointer = this._canvas.getPointer(event.e);
        const tool = this._toolModes.getState().tool;
        if(tool === 'text') {
            const { fontFamily, color, size, highlight  } = this._toolModes.getState();
            const { textDecorations } = this._textModes.getState();
            this._addText(event, {
                left: pointer.x, 
                top: pointer.y, 
                selectable: true,
                hasControls: true,
                fontSize: size,
                fill:color,
                fontFamily,
                textBackgroundColor: highlight,
                fontStyle: textDecorations.includes('italic') ? 'italic' : 'normal',
                fontWeight: textDecorations.includes('bold') ? 'bold' : 'normal',
                underline: textDecorations.includes('underline'),
                linethrough: textDecorations.includes('strikethrough'),
            });
        } else if(tool === 'draw') {
            this._canvas.isDrawingMode = true;
            //this._canvas.selection = false;
            this._enableDrawing();
        } else if(tool === 'shape') {
            this._canvas.selection = false;
            this._canvas.isDrawingMode = false;
            const { shape } = this._shapeModes.getState();
            const { color } = this._toolModes.getState();
            
            // set the first point (might not even need this tbh)
            if(this._currentShapePoint){
                this._currentShapePoint.setXY(pointer.x, pointer.y)
            } else{
                this._currentShapePoint = new fabric.Point(pointer.x, pointer.y)
            }
            this._addShape(event,
                shape, 
                {
                    left: pointer.x, 
                    top: pointer.y,
                    size: 5,
                    fill: color,
                    selectable: true,
                    hasControls: true,
                }
            );
        } 
        else if(tool === 'select') {
            this._canvas.selection = true;
            this._canvas.isDrawingMode = false;
            //this.handleSelection(event)
        }
    }

    _saveAction(event: fabric.IEvent<MouseEvent>, action: TAction) {
        if (this._historyProcessing)
            return;
        const targetObj = event.target
        if(targetObj){
            this._historyStack.updateState({
                "action": action,
                "data": {"object": [targetObj], "tranformations": event.transform},
            });
        }
    }

    delete(){
        const obj = this._canvas.getActiveObjects()
        obj.forEach(o => this._canvas.remove(o))
    }

    updateItem(obj: fabric.Object[], transform: fabric.Transform) {
        // There is a bug with updates not being correclty transmitted,
        // Fix this later
        const canvasObj = this._canvas.getObjects() 
        const original = transform.original
        obj.forEach(o => {
            const foundObj = canvasObj.find(obj => obj.id === o.id)
            if(foundObj){
                foundObj.set(original)
            }
        })
        this._canvas.requestRenderAll()
    }

    addItem(obj: fabric.Object[]) {
        obj.forEach(o => {
            let newFabricObj;

            if(o.type === "line"){
                const points = o as fabric.Line
                newFabricObj = new fabric.Line([points.x1 as number, points.y1 as number, points.x2 as number, points.y2 as number], o)
            }else if(o.type === "i-text") {
                newFabricObj = new fabric.IText((o as fabric.IText).text as string, o)
            }else if(o.type === "rect") {
                newFabricObj = new fabric.Rect(o)
            }else if(o.type === "ellipse") {
                newFabricObj = new fabric.Ellipse(o)
            }else if(o.type === "triangle") {
                newFabricObj = new fabric.Triangle(o)
            }

            if(newFabricObj) {
                this._canvas.add(newFabricObj)
            } 
        })
        this._canvas.requestRenderAll()
    }

    deleteItem(obj: fabric.Object[]) {
        const canvasObj = this._canvas.getObjects()
        obj.forEach(o => {
            const foundObj = canvasObj.find(obj => obj.id === o.id)
            foundObj && this._canvas.remove(foundObj)
        })       
    }

    undoAction() {
        this._historyProcessing = true;
        const undo = this._historyStack.undo()
        // for undo, we need to swap delete and add
        if(undo?.action === 'add') this.deleteItem(undo.data.object)
        if(undo?.action === 'modify') this.updateItem(undo.data.object, undo.data.tranformations as fabric.Transform) 
        if(undo?.action === 'delete') this.addItem(undo.data.object)
        this._historyProcessing = false;
    }

    redoAction() {
        this._historyProcessing = true;
        const redo = this._historyStack.redo()
        // for redo, add and delete stay the same
        if(redo?.action === 'add') this.addItem(redo.data.object)
        if(redo?.action === 'modify') this.updateItem(redo.data.object, redo.data.tranformations as fabric.Transform) 
        if(redo?.action === 'delete') this.deleteItem(redo.data.object)
        this._historyProcessing = false;
    }

    canRedo() {
        return this._historyStack.canRedo()
    }

    canUndo() {
        return this._historyStack.canUndo()
    }


    removeListeners() {
    }
}

export default PdfCanvas;