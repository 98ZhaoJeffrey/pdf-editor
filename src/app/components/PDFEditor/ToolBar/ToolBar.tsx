import { RxLetterCaseCapitalize } from "react-icons/rx";
import * as Tabs from '@radix-ui/react-tabs';
import TextTools from "./TextTools";
import DrawTools from "./DrawTools";
import ShapesTools from "./ShapesTools";

const ToolBar = () => {
    return (
        <Tabs.Root className="flex flex-col w-1/2">
            <Tabs.List
                className="shrink-0 flex border-b border-mauve6"
                aria-label="select a tool"
            >
                <Tabs.Trigger 
                    className="bg-white px-5 h-12 flex-1 flex items-center justify-center text-4 leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md hover:text-violet11 data-[state=active]:bg-gray-200 data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black outline-none cursor-default"
                    value="text"
                >
                    Text
                </Tabs.Trigger>
                <Tabs.Trigger 
                    value="draw"
                    className="bg-white px-5 h-12 flex-1 flex items-center justify-center text-4 leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md hover:text-violet11 data-[state=active]:bg-gray-200 data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black outline-none cursor-default"
                >
                    Draw
                </Tabs.Trigger>
                <Tabs.Trigger 
                    value="shapes"
                    className="bg-white px-5 h-12 flex-1 flex items-center justify-center text-4 leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md hover:text-violet11 data-[state=active]:bg-gray-200 data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black outline-none cursor-default"
                >
                    Shapes
                </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content
                value="text"
            >
                <TextTools/>
            </Tabs.Content>
            <Tabs.Content
                value="draw"
            >
                <DrawTools/>
            </Tabs.Content>
            <Tabs.Content
                value="shapes"
            >
                <ShapesTools/>
            </Tabs.Content>
        </Tabs.Root>
    )

}

export default ToolBar;