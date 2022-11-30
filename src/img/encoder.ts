import Settings from "../i/Settings";

export default abstract class ImageEncoder {
    private key: Settings;

    constructor(key: Settings) {
        this.key = key;
    }
}