import * as _ from 'jimp';
import Palette, { Character } from '../i/Palette';
import Settings from '../i/Settings';

export default abstract class ImageDecoder {
    private key: Settings;
    content: Response | undefined = undefined;
    columns: string[] = [];

    constructor(key: Settings) {
        this.key = key;

        if (!key.path || key.palette) return;

        _.read(key.path, (err, img) => {
            if (err) throw new Error(err.message);

            var isHeaderMode = false;
            var currentHeader = undefined;

            var currentEditIndex = 0;

            for (var y = 1; y <= img.getHeight(); y++) {
                for (var x = 0; x <= img.getWidth(); x++) {
                    let color = img.getPixelColor(x, y).toString(16);
                    // @ts-ignore
                    let pair: Character = this.searchForColour(key.palette, color);

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
    }

    private searchForColour(palette: Palette, colour: string): Character {
        if (colour == palette.SPACE.toLowerCase()) return { char: "SPACE", color: palette.SPACE };
        if (colour == palette.OVERFLOW.toLowerCase()) return { char: "OVERFLOW", color: palette.OVERFLOW };
        if (colour == palette.HEADER.toLowerCase()) return { char: "HEADER", color: palette.HEADER };
        if (colour == palette.COLUMNS.toLowerCase()) return { char: "COLUMNS", color: palette.COLUMNS };

        let foundValue = palette.CHARACTERS?.find((pair) => pair.color.toLowerCase() == colour)
        if (foundValue == undefined) {
            return { char: "WHITESPACE", color: "FFFFFFFF" };
        } else return foundValue;
    }
}