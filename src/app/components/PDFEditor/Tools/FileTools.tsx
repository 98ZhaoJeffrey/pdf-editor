import PdfCanvasStore from "@/app/stores/PdfCanvasStore";
import * as Toolbar from "@radix-ui/react-toolbar";
import { FaUndo } from "react-icons/fa";
import { FaRedo } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { useStore } from "zustand";

const FileTools = () => {
    const { pdfCanvas, setPdfCanvas } = useStore(PdfCanvasStore)

    const deleteItem = () => pdfCanvas?.delete();

    const undoAction = () => pdfCanvas?.undoAction();

    const redoAction = () => pdfCanvas?.redoAction();

    const canUndo = () => pdfCanvas?.canUndo();

    const canRedo = () => pdfCanvas?.canRedo();

    return (
        <div className="flex flex-row gap-x-1">
            <Toolbar.Button disabled={!canUndo()} onClick={undoAction}>
                <FaUndo size={20}/>
            </Toolbar.Button>
            <Toolbar.Button disabled={!canRedo()} onClick={redoAction}>
                <FaRedo size={20}/>
            </Toolbar.Button>
            <Toolbar.Button onClick={deleteItem}>
                <FaRegTrashAlt size={20}/> 
            </Toolbar.Button>
        </div>
    )
}

export default FileTools;