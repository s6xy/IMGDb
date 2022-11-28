import Palette from "./i/Palette";
import Settings from "./i/Settings";
import { read } from "./imageHandler";

export default class Handle {
    private key: Settings;

    constructor(key: string) {
        let ascii = Buffer.from(key, 'base64').toString().split('@~@');

        this.key = {
            path: ascii[0],
            palette: JSON.parse(ascii[1])
        }

        read(this.key);
    }
}