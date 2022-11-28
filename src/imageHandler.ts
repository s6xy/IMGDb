import * as _ from "jimp";

import Settings from "./i/Settings";

export function read(key: Settings): [{}, {}] {

    if (!key.palette || !key.path) throw new Error("Palette or path undefined")

    var columns, rawBackup, response: string[] = [];

    _.read(key.path, (err, img) => {
        if (err) throw new Error(err.message);

        for (var y = 1; y <= img.getHeight(); y++) {
            for (var x = 1; x <= img.getWidth(); x++) {
                console.log(`x${x}, y${y} is ${img.getPixelColor(x, y)}`);
                // var colour = `${img.getPixelColor(x, y)}FF`;
            }
        }
    })

    return [{}, {}]
} 