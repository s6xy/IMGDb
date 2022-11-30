import Palette from "./i/Palette";
import Settings from "./i/Settings";
import imageDecoder from "./img/decoder";

export default class Handle extends imageDecoder {
    currentEvent: Event = Event.NIL;

    constructor(key: Settings) {
        super(key);
    }

    getColumn(column: string) {
        this.currentEvent = Event.GET;
    }
}

enum Event {
    NIL,
    GET,
    LIKE
}