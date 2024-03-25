import { BRUSH_TYPES, DEFAULT_FONTS, TEXT_DECORATION_TOOLS } from "@/app/contants"
import { useStore } from 'zustand'
import DrawToolsStore from "@/app/stores/DrawToolsStore"
import * as Popover from "@radix-ui/react-popover"
import * as Select from "@radix-ui/react-select"
import * as Toolbar from "@radix-ui/react-toolbar"
import * as Tooltip from "@radix-ui/react-tooltip"
import { CompactPicker, ColorResult } from "react-color"
import { FaHighlighter } from "react-icons/fa"
import { BsPaintBucket } from "react-icons/bs";
import NumberInput from "../../NumberInput"
import * as Toggle from "@radix-ui/react-toggle"
import ToolStore from "@/app/stores/ToolStore"


const DrawTools = () => {
    const { brushType, setBrushType } = useStore(DrawToolsStore)
    
    return (
        <Toolbar.ToggleGroup type="single" aria-label="Draw tools" defaultValue={brushType} onValueChange={setBrushType}>
            {
                Object.entries(BRUSH_TYPES).map(([brushName, brush], index) => {
                    return (
                        <Toolbar.ToggleItem
                            className="flex-shrink-0 flex-grow-0 basis-auto text-mauve11 p-[5px] rounded inline-flex text-[13px] leading-none items-center justify-centerml-0.5 outline-none hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 first:ml-0 data-[state=on]:bg-gray-600 data-[state=on]:text-primary-100"
                            value={brushName}
                            aria-label={brush.aria}
                            key={index}
                        >  
                            <brush.icon size={20}/>
                        </Toolbar.ToggleItem>
                    )
                })
            }
        </Toolbar.ToggleGroup>
    )
}

export default DrawTools;