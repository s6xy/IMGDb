import Column from "./i/Column";
import Palette, { Character } from "./i/Palette";
import Settings from "./i/Settings";
import ImageDecoder from "./img/decoder";
import ImageEncoder from "./img/encoder";
import Response from "./i/Response";

export default class Handle implements ImageEncoder, ImageDecoder {
    private currentEvent: Event = Event.NIL;
    private key: Settings;
    public content: Response = { DATA: [], HEADERS: { COLUMNS: [] } };
    public columns: string[] = [];


    constructor(key: Settings) {
        this.key = key;
    }

    getColumn(column: string) {
        this.currentEvent = Event.GET;
    }

    getColumns() {
        this.currentEvent = Event.LIST;
        return this.columns;
    }

    createColumn(Column: Column) {
        if (!Column.Name || !Column.Type) return false;


    }


    private abstract searchForColour(palette: Palette, colour: string);
}

enum Event {
    NIL,
    GET,
    LIKE,
    LIST
}