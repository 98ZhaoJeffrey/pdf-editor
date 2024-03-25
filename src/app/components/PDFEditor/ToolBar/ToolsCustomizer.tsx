import { DEFAULT_FONTS } from "@/app/contants"
import * as Popover from "@radix-ui/react-popover"
import * as Select from "@radix-ui/react-select"
import * as Tooltip from "@radix-ui/react-tooltip"
import { CompactPicker, ColorResult } from "react-color"
import { FaAngleDown, FaCheck, FaHighlighter } from "react-icons/fa"
import { TbLetterCase } from "react-icons/tb"
import NumberInput from "../../NumberInput"
import TextToolsStore from "@/app/stores/TextToolsStore";
import { useStore } from "zustand"
import ToolStore from "@/app/stores/ToolStore"

const ToolsCustomizer = () => {

    const { size, setSize, color, setColor, highlight, setHighlight, fontFamily, setFontFamily } = useStore(ToolStore)
    
    return (
    <div className="flex flex-row gap-x-2">
        <Select.Root defaultValue={fontFamily} onValueChange={setFontFamily}>
            <Select.Trigger
                className="inline-flex items-center justify-center rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px] bg-white shadow-[0_2px_10px] shadow-black/10 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-violet9 outline-none"
            >
                <Select.Value defaultValue="Select a font"/>
                <Select.Icon>
                    <FaAngleDown/>
                </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
                <Select.Content 
                    className="overflow-hidden bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
                    position="popper"
                >
                    <Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default"/>
                    <Select.Viewport>
                        <Select.Group>
                            <Select.Label className="px-[25px] text-xs leading-[25px] text-mauve11">
                                Select a font family
                            </Select.Label>
                            {
                                DEFAULT_FONTS.map((font, index) => {
                                    return (
                                        <Select.Item 
                                            value={font} 
                                            key={index}
                                            className='text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1'
                                        >
                                            <Select.ItemText>
                                                {font}
                                            </Select.ItemText>
                                            <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
                                                <FaCheck />
                                            </Select.ItemIndicator>
                                        </Select.Item>
                                    )
                                })
                            }
                        </Select.Group>
                    </Select.Viewport>
                    <Select.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default"/>
                    <Select.Arrow />
                </Select.Content>
            </Select.Portal>
        </Select.Root>

        <Tooltip.Provider>
            <Tooltip.Root delayDuration={0.5}>
                <Tooltip.Trigger asChild>
                    <div>
                        <NumberInput
                            max={100}
                            min={1}
                            step={1}
                            value={size}
                            setValue={setSize}  
                        />
                    </div>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                <Tooltip.Content
                    className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-violet11 select-none rounded-[4px] bg-white px-[15px] py-[10px] text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]"
                    sideOffset={5}
                >
                    Font Size
                    <Tooltip.Arrow className="fill-white" />
                </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>
        </Tooltip.Provider>
                        
        <Popover.Root>
            <Popover.Trigger asChild>
                <button
                    className="rounded-full w-[35px] h-[35px] inline-flex items-center justify-center bg-white border-black border-2"
                    aria-label="Change Colors"
                >
                    <TbLetterCase color={color} className="font-bold"/>
                </button>
            </Popover.Trigger>
            <Popover.Portal>
            <Popover.Content
                className="rounded"
            >
                <CompactPicker
                    color={color}
                    onChangeComplete={(color: ColorResult) => setColor(color.hex)}
                />
                <Popover.Arrow className="fill-white" />
            </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
        <Popover.Root>
            <Popover.Trigger asChild>
                <button
                    className="rounded-full w-[35px] h-[35px] inline-flex items-center justify-center bg-white border-black border-2"
                    aria-label="Change Highlight Colors"
                >
                    <FaHighlighter color={highlight}/>
                </button>
            </Popover.Trigger>
            <Popover.Portal>
            <Popover.Content
                className="rounded"
            >
                <CompactPicker
                    color={highlight}
                    onChangeComplete={(color: ColorResult) => setHighlight(color.hex)}
                />
                <Popover.Arrow className="fill-white" />
            </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    </div>
    )
}


export default ToolsCustomizer;