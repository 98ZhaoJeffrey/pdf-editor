import { SHAPES } from "@/app/contants"
import { useStore } from 'zustand'
import ShapeToolsStore from "@/app/stores/ShapeToolsStore"
import * as Toolbar from "@radix-ui/react-toolbar"

const ShapesTools = () => {

    const { shape, setShape } = useStore(ShapeToolsStore)
     
    return (
        <Toolbar.ToggleGroup type="single" aria-label="Text formatting" defaultValue={shape} onValueChange={setShape}>
            {
                Object.entries(SHAPES).map(([shapeName, shape], index) => {
                    return (
                        <Toolbar.ToggleItem
                            className="flex-shrink-0 flex-grow-0 basis-auto text-mauve11 p-[5px] rounded inline-flex text-[13px] leading-none items-center justify-centerml-0.5 outline-none hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 first:ml-0 data-[state=on]:bg-gray-600 data-[state=on]:text-primary-100"
                            value={shapeName}
                            aria-label={shape.aria}
                            key={index}
                        >  
                            <shape.icon size={20}/>
                        </Toolbar.ToggleItem>
                    )
                })
            }
        </Toolbar.ToggleGroup>    
    )
}

export default ShapesTools;