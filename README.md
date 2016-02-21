# StringToBSON.js
A simple String To BSON Parsing library in javascript

### Restrictions
This parser only creates the following js objects for now :
`ObjectID, ISODate, NumberLong, Date`

### Installation

```
npm install stringtobsonjs --save
```

### Usage

Parsing a string to a javascript object with mongo objects :

```javascript
var parser = require('stringtobsonjs');

var string = "{_id: ObjectID('56bdf41a6a0da0d00254cc2a'), born_on: ISODate(2012-02-12), ms_in_life: NumberLong('31242314123421342'), expire: new Date(2012-02-01)}";

parser.parse(string);
```
This piece of code will return a parsed js object.

Parsing an object with mongoDB properties to a string :
```javascript
var mongojs = require('mongojs');
var mongodb = require('mongodb');
var parser = require('stringtobsonjs');

var obj = {
    _id : new mongojs.ObjectID('56bdf4d36a0da0d00254cc2b'),
    date : new Date('2012-02-1'),
    long : mongojs.Long.fromString('1231231231231230985345'),
    text : 'some text',
    array : ['an', 3432, 'array'],
    obj : { key1 : 'value1'}
}
console.log(parser.toString(obj, true));
```

The output will be the following string:
```
'{
_id: ObjectID("56bdf4d36a0da0d00254cc2b"),
date: ISOString("Wed Feb 01 2012 00:00:00 GMT-0500 (EST)"),
long: NumberLong("-4700621707308972927"),
text: "some text",
array: ["an",3432,"array"],
obj: {key1: "value1"}
}'
```

>**Note :** the `toString()` function takes a boolean as the second parameter to specify whether the output should be formatted or not. (Newline formatting with `\n`).

### License
[MIT License](https://github.com/samrm111/StringToBSON.js/blob/master/LICENSE)
