import * as _ from "../src/index";

let handle = _.Connect("bf5107g26564");

handle.createColumn({ Name: "Username", Type: "s" });
console.log(handle.getColumns());