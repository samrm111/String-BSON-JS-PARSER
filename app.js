var mongojs = require('mongojs');
var safeEval = require('safe-eval');

module.exports = function () {



    /**
     * Parse a string to a javascript object with BSON types
     * @param  {[type]} string [description]
     * @return {[type]}        [description]
     */
    this.parse = function(string) {
        return safeEval(string, context);
    };

    /**
     * Context that is passed to the safeEval function containing BSON types
     * @type {Object}
     */
    var context = {
        ObjectID : function(id) {
            try {
                return new mongojs.ObjectID(id);
            } catch(err) {
                throw 'Invalid ObjectID: ' + id;
            }
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
