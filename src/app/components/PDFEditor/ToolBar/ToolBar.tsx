import * as Toolbar from "@radix-ui/react-toolbar";
import { TOOLS } from '@/app/contants';
import { useStore } from 'zustand';
import ToolsCustomizer from "./ToolsCustomizer";
import DrawTools from "../Tools/DrawTools";
import ShapesTools from "../Tools/ShapesTools";
import TextTools from "../Tools/TextTools";
import SelectionTools from "../Tools/SelectionTools";
import FileTools from "../Tools/FileTools";
import ToolStore from "@/app/stores/ToolStore"
import { TTool } from "@/app/types/tools";

interface DisplayedToolsProps {
    selectedTool: TTool;
}

const DisplayedTools: React.FC<DisplayedToolsProps> = ({ selectedTool }) => {
    console.log(selectedTool)
    switch(selectedTool){
        case "select": return <SelectionTools/>;           
        case "draw": return <DrawTools/>;
        case "shape": return <ShapesTools/>;
        case "text": return <TextTools/>;
        default: return null;
    }

}


const ToolBar = () => {

    const { tool, setTool } = useStore(ToolStore);

    return (
        <Toolbar.Root className="flex flex-row items-center p-[10px] w-full min-w-max rounded-md bg-white shadow-[0_2px_10px] shadow-blackA4">

            <FileTools/>

            <Toolbar.Separator className="w-[5px] h-100 bg-mauve6 mx-[10px]" />
            
            <Toolbar.ToggleGroup type="single" aria-label="Select tool" defaultValue={tool} onValueChange={(value) => setTool(value as TTool)} className="flex flex-row gap-x-1">
                {
                    Object.entries(TOOLS).map(([name, tool], index) => {
                        return (
                            <Toolbar.ToggleItem
                                className="flex-shrink-0 flex-grow-0 basis-auto text-mauve11 p-[5px] rounded inline-flex text-[13px] leading-none items-center justify-centerml-0.5 outline-none hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 first:ml-0 data-[state=on]:bg-gray-600 data-[state=on]:text-primary-100"
                                value={tool.value}
                                aria-label={tool.aria}
                                key={index}
                            >  
                                <tool.icon size={20}/>
                            </Toolbar.ToggleItem>
                        )
                    })
                }
            </Toolbar.ToggleGroup>  

            <Toolbar.Separator className="w-[5px] h-100 bg-mauve6 mx-[10px]" />
            
            <ToolsCustomizer/>

            <Toolbar.Separator className="w-[5px] h-100 bg-mauve6 mx-[10px]" />

            <DisplayedTools selectedTool={tool}/>
            
        </Toolbar.Root>
    )

}

export default ToolBar;