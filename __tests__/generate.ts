import * as _ from '../src/index';
import * as path from "path";
import Settings from '../src/i/Settings';

var settings: Settings = {
    palette: {
        HEADER: 'AABBCCFF',
        COLUMNS: 'CCBBAAFF',
        SPACE: 'FFAAFFFF',
        OVERFLOW: 'A0A0A0FF',
        CHARACTERS: [
            {
                char: 'A',
                color: 'B0B0B0FF'
            }
        ]
    }
}

var key = _.Generate("users");
var keyWithSettings = _.Generate("posts", settings);

console.log(`Key is: ${key}`);
console.log(`Key with settings is: ${keyWithSettings}`);

