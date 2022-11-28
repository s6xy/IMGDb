export default interface Palette {
    HEADER: Color
    COLUMNS: Color
    OVERFLOW: Color
    SPACE: Color

    CHARACTERS?: Character[]
}

export interface Character {
    char: string
    color: Color
}

export type Color = `${string}FF`;