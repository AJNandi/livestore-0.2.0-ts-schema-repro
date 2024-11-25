export type NumberFormatCode = string

export type HexColor = `#${string}`

export enum TextColor {
  Slate1 = "#000000",
  Slate2 = "#000000",
  Slate3 = "#475569",
  Slate4 = "#FFFFFF",
  Green1 = "#166534",
  Green2 = "#000000",
  Green3 = "#166534",
  Green4 = "#FFFFFF",
  Yellow1 = "#FBBF24",
  Yellow2 = "#000000",
  Yellow3 = "#B45309",
  Yellow4 = "#FFFFFF",
  Red1 = "#BE123C",
  Red2 = "#000000",
  Red3 = "#BE123C",
  Red4 = "#FFFFFF",
  Blue1 = "#0369A1",
  Blue2 = "#000000",
  Blue3 = "#0369A1",
  Blue4 = "#FFFFFF",
}

export enum BackgroundColor {
  Slate1 = "#FFFFFF",
  Slate2 = "#E2E8F0",
  Slate3 = "#E2E8F0",
  Slate4 = "#475569",
  Green1 = "#FFFFFF",
  Green2 = "#B7E1CD",
  Green3 = "#B7E1CD",
  Green4 = "#166534",
  Yellow1 = "#FFFFFF",
  Yellow2 = "#FED7AA",
  Yellow3 = "#FED7AA",
  Yellow4 = "#EAB308",
  Red1 = "#FFFFFF",
  Red2 = "#FECACA",
  Red3 = "#FECACA",
  Red4 = "#BE123C",
  Blue1 = "#FFFFFF",
  Blue2 = "#BAE6FD",
  Blue3 = "#BAE6FD",
  Blue4 = "#0369A1",
}

/**
 * https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/cells
 */

export enum HorizontalAlign {
  Left = "left",
  Right = "right",
  Center = "center",
}

export enum VerticalAlign {
  Top = "top",
  Middle = "middle",
  Bottom = "bottom",
}

export enum BorderType {
  Bottom = "bottom",
  Top = "top",
  Left = "left",
  Right = "right",
  Outside = "outside",
  None = "none",
}

export enum NumberFormatCodes {
  General = "",
  Number = "#,##0.0",
  Dollars = "$#,##0.00_);$(#,##0.00)",
  Date = "m/d/yy",
  DateTime = "m/d/yy hh:mm",
  Time = "h:mm:ss AM/PM",
  Percent = "###0.0%_);(###0.0%)",
  Multiple = "#,##0.0x",
}

export interface BorderStyle {
  width: number
  color: string
}

export interface BorderRectStyle {
  top?: BorderStyle
  bottom?: BorderStyle
  left?: BorderStyle
  right?: BorderStyle
}

export interface FormatData {
  number_format?: string | undefined | null
  border_bottom_color: string | undefined | null
  border_bottom_width: number | undefined | null
  border_left_color: string | undefined | null
  border_left_width: number | undefined | null
  border_right_color: string | undefined | null
  border_right_width: number | undefined | null
  border_top_color: string | undefined | null
  border_top_width: number | undefined | null
  horizontal_alignment?: HorizontalAlign | undefined | null
  vertical_alignment?: VerticalAlign | undefined | null
  text_color?: TextColor | undefined | null
  font_family?: string | null
  font_size?: string | null
  bold?: boolean | undefined | null
  italic?: boolean | undefined | null
  strikethrough?: boolean | undefined | null
  underline?: boolean | undefined | null
  color?: BackgroundColor | undefined | null
}

export type FormatRectZeroIndexed = {
  format: FormatData
  min_x: number
  min_y: number
  max_x: number
  max_y: number
}

export const NullFormatData: FormatData = {
  number_format: null,
  border_bottom_color: null,
  border_bottom_width: null,
  border_left_color: null,
  border_left_width: null,
  border_right_color: null,
  border_right_width: null,
  border_top_color: null,
  border_top_width: null,
  horizontal_alignment: null,
  vertical_alignment: null,
  text_color: null,
  font_family: null,
  font_size: null,
  bold: null,
  italic: null,
  strikethrough: null,
  underline: null,
  color: null,
}

export const numberMenuItems = [
  {
    name: "General",
    format: NumberFormatCodes.General,
    hotkey: "1",
  },
  {
    name: "Number",
    subtext: "1,000.12",
    format: NumberFormatCodes.Number,
    hotkey: "2",
  },
  {
    name: "Time",
    subtext: "12:45:00 AM",
    format: NumberFormatCodes.Time,
    hotkey: "3",
  },
  {
    name: "Dollars",
    subtext: "$0,000",
    format: NumberFormatCodes.Dollars,
    hotkey: "4",
  },
  {
    name: "Percent",
    subtext: "100%",
    format: NumberFormatCodes.Percent,
    hotkey: "5",
  },
  {
    name: "Date",
    subtext: "12/31/21",
    format: NumberFormatCodes.Date,
    hotkey: "6",
  },
  {
    name: "Datetime",
    subtext: "12/31/21 12:45:00 AM",
    format: NumberFormatCodes.DateTime,
    hotkey: "7",
  },
  {
    name: "Multiples",
    subtext: "2.5x",
    format: NumberFormatCodes.Multiple,
    hotkey: "8",
  },
]
