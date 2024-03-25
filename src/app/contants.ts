
// import { Circle, CircleBrush, Line, PencilBrush, Rect, SprayBrush, Triangle } from "fabric";
import { BsTriangle } from "react-icons/bs"
import { FaBold, FaEraser, FaItalic, FaMouse, FaMousePointer, FaPaintBrush, FaPencilAlt, FaRegCircle, FaSprayCan, FaStrikethrough, FaUnderline } from "react-icons/fa"
import { FaRegSquareFull } from "react-icons/fa6";
import { MdCrop } from "react-icons/md";
import { TbLine } from "react-icons/tb"
import { RxText } from "react-icons/rx";
import { PiCircleDashedLight } from "react-icons/pi";
import { fabric } from "fabric";

export const DEFAULT_COLORS = {
    "RED": "#FF0000",
    "BLUE": "#0000FF",
    "GREEN": "#00FF00",
    "YELLOW": "#FFFF00",
    "ORANGE": "#FFA500",
    "BLACK": "#000000",
    "WHITE": "#FFFFFF",
    "PURPLE": "#800080",
    "BROWN": "#964B00",
    "GREY": "#808080",
    "TRANSPARENT": "#00000000"
}

export const DEFAULT_FONTS = [
    "Times New Roman",
    "Arial",
    "Comic Sans",
    "Calibri",
    "Segoe UI"
]

export const TOOLS = [
    {
        "value": "select",
        "text": "Select",
        "icon": FaMousePointer,
        "aria": "Select tools"
    },
    {
        "value": "text",
        "text": "Text",
        "icon": RxText,
        "aria": "Text tools"
    },
    {
        "value": "draw",
        "text": "Draw",
        "icon": FaPaintBrush,
        "aria": "Draw tools"
    },
    {
        "value": "shape",
        "text": "Shape",
        "icon": FaRegCircle,
        "aria": "Shape tools"
    }
]



export const TEXT_DECORATION_TOOLS = [
    {
        "value": "bold",
        "aria": "Bold",
        "icon": FaBold
    },
    {
        "value": "italic",
        "aria": "Italic",
        "icon": FaItalic
    },
    {
        "value": "strikethrough",
        "aria": "StrikeThrough",
        "icon": FaStrikethrough
    },
    {
        "value": "underline",
        "aria": "Underline",
        "icon": FaUnderline
    }
]

export const BRUSH_TYPES = {
    "Pencil": {
        "aria": "Pencil Brush",
        "icon": FaPencilAlt,
        "brush": fabric.PencilBrush
    },
    "Eraser":  {
        "aria": "Eraser Brush",
        "icon": FaEraser,
        "brush": fabric.PencilBrush 
        // need to figure out a fix for the lack of eraser support
        // 1 option is to somehow configure the custom build for fabric with eraser
        // the other option is to use something like clip path
    }
}

export const SHAPES = {
    "Line": {
        "icon": TbLine,
        "shape": fabric.Line,
        "aria": "Line"
    },
    "Triangle": {
        "icon": BsTriangle,
        "shape": fabric.Triangle,
        "aria": "Triangle"
    },
    "Rectangle": {
        "icon": FaRegSquareFull,
        "shape": fabric.Rect,
        "aria": "Rectangle"
    },
    "Circle": {
        "icon": FaRegCircle,
        "shape": fabric.Circle,
        "aria": "Circle"
    }
}

export const SELECTS = {
    "Select": {
        "icon": FaMousePointer,
        "aria": "Select"
    },
    "Crop": {
        "icon": MdCrop,
        "aria": "Crop"
    },
    "Freeform Select": {
        "icon": PiCircleDashedLight,
        "aria": "Freeform Select"
    }
}