import { useState, useEffect } from "react";
import * as Select from '@radix-ui/react-select';
import * as Tooltip from '@radix-ui/react-tooltip';
import * as Toolbar from '@radix-ui/react-toolbar';
import * as Popover from '@radix-ui/react-popover';
import { ColorResult, CompactPicker } from 'react-color'
import { TbLetterCase } from "react-icons/tb";
import { FaCheck, FaHighlighter, FaAngleDown } from "react-icons/fa";
import NumberInput from "../../NumberInput";
import useTextToolsStore from "@/app/stores/TextToolsStore";
import { useStore } from 'zustand'
import { DEFAULT_COLORS, DEFAULT_FONTS, TEXT_DECORATION_TOOLS } from "@/app/contants";

const TextTools = () => {

    const { setTextDecorations } = useStore(useTextToolsStore)

    return (
        <Toolbar.ToggleGroup type="multiple" aria-label="Text formatting" onValueChange={setTextDecorations}>
            {
                TEXT_DECORATION_TOOLS.map((tool, index) => {
                    return (
                        <Toolbar.ToggleItem
                            className="flex-shrink-0 flex-grow-0 basis-auto text-mauve11 p-[5px] rounded inline-flex text-[13px] leading-none items-center justify-center bg-white ml-0.5 outline-none hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 first:ml-0 data-[state=on]:bg-gray-600 data-[state=on]:text-primary-100"
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
    )
}

export default TextTools;