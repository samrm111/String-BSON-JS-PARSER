var mongojs = require('mongojs');
var safeEval = require('safe-eval');

var StringToBSON = function () {

    /**
     * Parse a string to a javascript object with BSON types
     * @param  {[type]} string [description]
     * @return {[type]}        [description]
     */
    this.parse = function(string, context) {
        return safeEval(string);
    };

    /**
     * Context that is passed to the safeEval function containing BSON types
     * @type {Object}
     */
    var context = {
        ObjectID : function(id) {
            return mongojs.ObjectID.isValid(id) ? new mongojs.ObjectID(value) : throw 'Invalid ObjectID : ' + id;
        },
        ISODate : function(ISOString) {
            return new Date(ISOString);
        },
        NumberLong : function(number) {
            return mongojs.Long.fromString(number);
        },
        Date : function(dateString) {
            return new Date(dateString);
        }
    };
}

module.exports = new StringToBSON();
