import Column, { validColumnType } from "./i/Column";
import Palette, { Character } from "./i/Palette";
import Settings from "./i/Settings";
import ImageDecoder from "./img/decoder";
import ImageEncoder from "./img/encoder";
import Response from "./i/Response";

export default class Handle {
    protected key: Settings;
    protected encoder: ImageEncoder;
    protected decoder: ImageDecoder;
    protected content: Response = { DATA: [], HEADERS: { COLUMNS: [] } };
    protected columns: Column[] = [];
    protected currentEvent: Event = Event.NIL;
    protected validColumnTypes: validColumnType[] = [{ Name: "string", Typing: ["string", "str", "s"] }, { Name: "integer", Typing: ["integer", "int", "i"] }, { Name: "boolean", Typing: ["boolean", "bool", "b"] }];

    constructor(key: Settings) {
        this.key = key;

        this.encoder = new ImageEncoder(key);
        this.decoder = new ImageDecoder(key);
    }

    /**
     * Create a new column
     * @param Column Interface: Column
     * @returns Boolean: Success
     */
    createColumn(Column: Column) {
        if (!Column.Name || !Column.Type) return false;
        Column.Type = Column.Type.toLowerCase();
        if (Column.Name == "" || Column.Name == " " || Column.Name.length > 32) return false;
        let type = this.validColumnTypes.find((type) => type.Typing.includes(Column.Type));
        if (type == undefined) return false;
        this.currentEvent = Event.CREATE;
        this.columns.push({ Name: Column.Name, Type: type.Name });
    }

    /**
     * Retrieve a list of columns
     */
    getColumns() {
        return this.columns;
    }
}

enum Event {
    NIL,
    GET,
    LIKE,
    LIST,
    CREATE
}
