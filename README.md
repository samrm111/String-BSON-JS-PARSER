# StringToBSON.js
A simple String To BSON Parsing library in javascript

### Restrictions
This parser only creates the following js objects for now :
`ObjectID, ISODate, NumberLong, Date`


### Usage
```javascript
var parser = require('StringToBSON.js');

var string = "{_id: ObjectID('56bdf41a6a0da0d00254cc2a'), born_on: ISODate(2012-02-12), ms_in_life: NumberLong('31242314123421342'), expire: new Date(2012-02-01)}";

parser.parse(string);
```
This piece of code will return a parsed js object.

### License
[MIT License](https://github.com/samrm111/StringToBSON.js/blob/master/LICENSE)
