import * as Toolbar from "@radix-ui/react-toolbar";
import { FaUndo } from "react-icons/fa";
import { FaRedo } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";

const FileTools = () => {
    return (
        <div className="flex flex-row gap-x-1">
            <Toolbar.Button>
                <FaUndo size={20}/>
            </Toolbar.Button>
            <Toolbar.Button>
                <FaRedo size={20}/>
            </Toolbar.Button>
            <Toolbar.Button>
                <FaRegTrashAlt size={20}/> 
            </Toolbar.Button>
        </div>
    )
}

export default FileTools;