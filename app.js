var mongojs = require('mongojs');
var mongodb = require('mongodb');
var safeEval = require('safe-eval');

var StringToBSON = function() {

    /**
     * Parse a string to a javascript object with BSON types
     * @param  {String} string The string to parse
     * @return {Object}        The result of the parsing
     */
    this.parse = function(string) {
        return safeEval(string, context);
    };

    /**
     * Convert an object containing BSON values to a formatted string
     * @param  {Object} obj       The object to parse
     * @param  {Boolean} formatted If set to true, new line at each objects
     * @return {String}           The result of the parsing
     */
    this.toString = function(obj, formatted) {
        formatted = typeof formatted == 'undefined' ? false : formatted;
        var newline = formatted ? '\n' : '';
        //create an array that will later be joined into a string.
        var string = [];

        //is object
        if (obj == undefined) {
            return String(obj);
        } else if (typeof(obj) == "object" && (obj.join == undefined)) {
            for (prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    string.push(newline + prop + ': ' + this.typeToString(obj[prop]));
                }
            };
            return "{" + string.join(",") + newline + "}";

            //is array
        } else if (typeof(obj) == "object" && !(obj.join == undefined)) {
            for (prop in obj) {
                string.push(newline + this.typeToString(obj[prop]));
            }
            return "[" + string.join(",") + "]";

            //is function
        } else if (typeof(obj) == "function") {
            string.push(newline + obj.toString())

            //all other values can be done with JSON.stringify
        } else {
            string.push(JSON.stringify(obj))
        }

        return string.join(",");
    };

    this.typeToString = function(obj) {
        if (obj instanceof mongodb.ObjectID) {
            return 'ObjectID("' + obj.toString() + "\")";
        } else if (obj instanceof Date) {
            return 'ISODate("' + obj.toString() + "\")";
        } else if (obj instanceof mongojs.Long) {
            return 'NumberLong("' + obj.toString() + "\")";
        } else {
            return this.toString(obj);
        }
    }

    /**
     * Context that is passed to the safeEval function containing BSON types
     * @type {Object}
     */
    var context = {
        ObjectID: function(id) {
            try {
                return new mongojs.ObjectID(id);
            } catch (err) {
                throw 'Invalid ObjectID: ' + id;
            }
        },
        ISODate: function(ISOString) {
            return new Date(ISOString);
        },
        NumberLong: function(number) {
            return mongojs.Long.fromString(number);
        },
        Date: function(dateString) {
            return new Date(dateString);
        }
    };
}
module.exports = new StringToBSON();
