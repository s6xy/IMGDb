import Palette, { Color, Character } from "./i/Palette"

const alphnum: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

export default class Generator {
    generate(palette?: Palette) {
        var usedColors: Color[] = [];
        // We dont want white, screw that.
        usedColors.push("FFFFFFFF");

        palette ??= defaultPalette;
        palette.CHARACTERS ??= [];

        usedColors.push(palette.SPACE);
        usedColors.push(palette.HEADER);
        usedColors.push(palette.OVERFLOW);
        usedColors.push(palette.COLUMNS);

        // Ok, the user has defined some characters. That's fine.
        if (palette.CHARACTERS.length != 0) {
            palette.CHARACTERS.forEach((pair) => {
                if (usedColors.indexOf(pair.color) != -1) throw new Error(`Colour used twice: ${pair.color}`);
                usedColors.push(pair.color);
                alphnum.splice(alphnum.indexOf(pair.char), 1);
            })
        }

        for (let i = 0; i <= alphnum.length; i++) {
            var hex: Color = generateColor();
            // Oh no, its been used. Lets re-generate until we get a unique colour.
            while (usedColors.indexOf(hex) != -1) {
                hex = generateColor();
            }

            let pair: Character = {
                char: alphnum[i],
                color: hex
            }

            palette.CHARACTERS.push(pair);
        }
        return palette;
    }
}

function generateColor(): Color {
    return `${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}FF`
}

var defaultPalette: Palette = {
    HEADER: "F0E68CFF",
    COLUMNS: "454545FF",
    OVERFLOW: "FF1846FF",
    SPACE: "464646FF"
}