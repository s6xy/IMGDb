import * as _ from "jimp";
import * as path from "path";
import * as fs from "fs";

import Generator from "./generator";
import Handle from "./handle";

import Palette from "./i/Palette";
import Settings from "./i/Settings";

const appData = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + "/.local/share")

/**
 * Generate a table and connector key
 * @param {string} name The table name
 * @param {Settings} settings Optional settings
 * @returns {string} The connector key
 */
export function Generate(name: string, settings?: Settings): string {
    var generator: Generator = new Generator();
    var palette: Palette = (settings && settings.palette) ? generator.generate(settings.palette) : generator.generate();
    var file: string = (settings && settings.path) ? path.join(settings.path, `${name}.png`) : path.join(process.cwd(), `/imgdb/${name}.png`);

    new _(1024, 1, 'white', (err, img) => {
        if (err) throw new Error(`Failed creating image - ${err}`)

        let color = parseInt(palette.HEADER, 16);
        img.setPixelColor(color, 0, 1);
        img.setPixelColor(color, 1, 1);

        return img.quality(100).write(file);
    });

    var key = Math.random().toString(20).substring(2, 14);

    try {
        var buff = Buffer.from(file + "@~@" + JSON.stringify(palette))
        var data = buff.toString("base64");
        var keyPath = path.join(appData, "imgdb/keys.json");

        var keys = JSON.parse(JSON.stringify(fs.readFileSync(keyPath))) ?? [];
        if (keys[key]) throw new Error("Key already found, did you mean to connect?");
        keys[key] = data;
        fs.writeFileSync(keyPath, JSON.stringify(keys), 'utf-8');
    } catch {
        throw new Error("Failed to create key in AppData, try running as elevated user");
    }

    return key;
}

export function Connect(key: string): Handle {
    var keyPath = path.join(appData, "imgdb/keys.json")

    if (!fs.existsSync(keyPath)) throw new Error("Key registry doesn't exist - Have you tried generating a key?")
    var keys = JSON.parse(Buffer.from(fs.readFileSync(keyPath)).toString());

    if (!keys[key]) throw new Error(`Key '${key}' does not exist - Have you tried generating a key?`)

    return new Handle(keys[key]);
}