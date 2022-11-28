import * as _ from "jimp";

import Settings from "./i/Settings";

export function read(key: Settings): [{}, {}] {
    if (!key.palette || !key.path) throw new Error("Palette or path undefined")

    _.read(key.path, (err, img) => {
        if (err) throw new Error(err.message);

        for (var y = 1; y <= img.getHeight(); y++) {
            for (var x = 1; x <= img.getWidth(); x++) {
                let colour = img.getPixelColor(x, y).toString(16) + "FF";
                let result = key.palette?.CHARACTERS?.findIndex((item) => item.color == colour)
                console.log(result); // fix
                // let char = (result != -1) ? key.palette?.CHARACTERS[result] ? '0';
            }
        }
    })

    return [{}, {}]

} 