import * as _ from "jimp";

import Settings from "./i/Settings";
import Palette, { Character } from "./i/Palette";
import Response from "./i/Response";

/**
 * Private-ish function for reading data directly.
 * @param key The database key
 * @returns Array of objects, where object #1 is result, and object #2 is response
 */
export function read(key: Settings): Response {
    var response: Response = { HEADERS: { COLUMNS: [] }, DATA: [] }
    if (!key.palette || !key.path) return response;

    _.read(key.path, (err, img) => {
        if (err) throw new Error(err.message);

        var isHeaderMode = false;
        var currentHeader = undefined;

        var currentEditIndex = 0;

        for (var y = 1; y <= img.getHeight(); y++) {
            for (var x = 0; x <= img.getWidth(); x++) {
                let colour = img.getPixelColor(x, y).toString(16);
                // @ts-ignore
                let pair: Character = searchForColour(key.palette, colour.toLowerCase());

                switch (pair.char) {
                    case "SPACE":
                        currentEditIndex++;
                        break;
                    case "OVERFLOW":
                        // 
                        break;
                    case "HEADER":
                        isHeaderMode = true;
                        break;
                    case "COLUMNS":
                        if (!isHeaderMode) throw new Error(`0#NHMEH`);
                        currentHeader = "COLUMNS";
                        break;
                    default:
                        if (pair.char == ',') {
                            currentEditIndex++;
                        } else {
                            if (isHeaderMode) {
                                switch (currentHeader) {
                                    case "COLUMNS":
                                        response.HEADERS.COLUMNS[currentEditIndex] += pair.char
                                        break;
                                    default:
                                        throw new Error("1#IHR");
                                }
                            }
                        }
                        break;
                }
            }
        }
    })

    return response;
}

function searchForColour(palette: Palette, colour: string): Character {
    if (colour == palette.SPACE.toLowerCase()) return { char: "SPACE", color: palette.SPACE };
    if (colour == palette.OVERFLOW.toLowerCase()) return { char: "OVERFLOW", color: palette.OVERFLOW };
    if (colour == palette.HEADER.toLowerCase()) return { char: "HEADER", color: palette.HEADER };
    if (colour == palette.COLUMNS.toLowerCase()) return { char: "COLUMNS", color: palette.COLUMNS };

    let foundValue = palette.CHARACTERS?.find((pair) => pair.color.toLowerCase() == colour)
    if (foundValue == undefined) {
        return { char: "WHITESPACE", color: "FFFFFFFF" };
    } else return foundValue;
}