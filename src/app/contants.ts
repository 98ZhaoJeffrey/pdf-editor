import { FaBold, FaItalic, FaStrikethrough, FaUnderline } from "react-icons/fa"

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
    "GREY": "#808080"
}

export const DEFAULT_FONTS = [
    "Times New Roman",
    "Arial",
    "Comic Sans",
    "Calibri",
    "Segoe UI"
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