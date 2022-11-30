export default interface Column {
    Name: string,
    Type: Type,


}

export enum Type {
    STRING = "String",
    BOOL = "Bool",
    INT = "Int"
}