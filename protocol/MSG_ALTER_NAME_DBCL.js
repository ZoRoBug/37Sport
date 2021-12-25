/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.MSG_ALTER_NAME_DBCL = (function() {

    /**
     * Properties of a MSG_ALTER_NAME_DBCL.
     * @exports IMSG_ALTER_NAME_DBCL
     * @interface IMSG_ALTER_NAME_DBCL
     * @property {number} msgID MSG_ALTER_NAME_DBCL msgID
     * @property {number|null} [pid] MSG_ALTER_NAME_DBCL pid
     * @property {string|null} [newName] MSG_ALTER_NAME_DBCL newName
     * @property {number|null} [cost] MSG_ALTER_NAME_DBCL cost
     * @property {MSG_ALTER_NAME_DBCL.Result|null} [result] MSG_ALTER_NAME_DBCL result
     */

    /**
     * Constructs a new MSG_ALTER_NAME_DBCL.
     * @exports MSG_ALTER_NAME_DBCL
     * @classdesc Represents a MSG_ALTER_NAME_DBCL.
     * @implements IMSG_ALTER_NAME_DBCL
     * @constructor
     * @param {IMSG_ALTER_NAME_DBCL=} [properties] Properties to set
     */
    function MSG_ALTER_NAME_DBCL(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MSG_ALTER_NAME_DBCL msgID.
     * @member {number} msgID
     * @memberof MSG_ALTER_NAME_DBCL
     * @instance
     */
    MSG_ALTER_NAME_DBCL.prototype.msgID = 0;

    /**
     * MSG_ALTER_NAME_DBCL pid.
     * @member {number} pid
     * @memberof MSG_ALTER_NAME_DBCL
     * @instance
     */
    MSG_ALTER_NAME_DBCL.prototype.pid = 0;

    /**
     * MSG_ALTER_NAME_DBCL newName.
     * @member {string} newName
     * @memberof MSG_ALTER_NAME_DBCL
     * @instance
     */
    MSG_ALTER_NAME_DBCL.prototype.newName = "";

    /**
     * MSG_ALTER_NAME_DBCL cost.
     * @member {number} cost
     * @memberof MSG_ALTER_NAME_DBCL
     * @instance
     */
    MSG_ALTER_NAME_DBCL.prototype.cost = 0;

    /**
     * MSG_ALTER_NAME_DBCL result.
     * @member {MSG_ALTER_NAME_DBCL.Result} result
     * @memberof MSG_ALTER_NAME_DBCL
     * @instance
     */
    MSG_ALTER_NAME_DBCL.prototype.result = 0;

    /**
     * Creates a new MSG_ALTER_NAME_DBCL instance using the specified properties.
     * @function create
     * @memberof MSG_ALTER_NAME_DBCL
     * @static
     * @param {IMSG_ALTER_NAME_DBCL=} [properties] Properties to set
     * @returns {MSG_ALTER_NAME_DBCL} MSG_ALTER_NAME_DBCL instance
     */
    MSG_ALTER_NAME_DBCL.create = function create(properties) {
        return new MSG_ALTER_NAME_DBCL(properties);
    };

    /**
     * Encodes the specified MSG_ALTER_NAME_DBCL message. Does not implicitly {@link MSG_ALTER_NAME_DBCL.verify|verify} messages.
     * @function encode
     * @memberof MSG_ALTER_NAME_DBCL
     * @static
     * @param {IMSG_ALTER_NAME_DBCL} message MSG_ALTER_NAME_DBCL message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MSG_ALTER_NAME_DBCL.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.msgID);
        if (message.pid != null && message.hasOwnProperty("pid"))
            writer.uint32(/* id 2, wireType 1 =*/17).double(message.pid);
        if (message.newName != null && message.hasOwnProperty("newName"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.newName);
        if (message.cost != null && message.hasOwnProperty("cost"))
            writer.uint32(/* id 4, wireType 1 =*/33).double(message.cost);
        if (message.result != null && message.hasOwnProperty("result"))
            writer.uint32(/* id 5, wireType 0 =*/40).int32(message.result);
        return writer;
    };

    /**
     * Encodes the specified MSG_ALTER_NAME_DBCL message, length delimited. Does not implicitly {@link MSG_ALTER_NAME_DBCL.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MSG_ALTER_NAME_DBCL
     * @static
     * @param {IMSG_ALTER_NAME_DBCL} message MSG_ALTER_NAME_DBCL message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MSG_ALTER_NAME_DBCL.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MSG_ALTER_NAME_DBCL message from the specified reader or buffer.
     * @function decode
     * @memberof MSG_ALTER_NAME_DBCL
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MSG_ALTER_NAME_DBCL} MSG_ALTER_NAME_DBCL
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MSG_ALTER_NAME_DBCL.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MSG_ALTER_NAME_DBCL();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.msgID = reader.uint32();
                break;
            case 2:
                message.pid = reader.double();
                break;
            case 3:
                message.newName = reader.string();
                break;
            case 4:
                message.cost = reader.double();
                break;
            case 5:
                message.result = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("msgID"))
            throw $util.ProtocolError("missing required 'msgID'", { instance: message });
        return message;
    };

    /**
     * Decodes a MSG_ALTER_NAME_DBCL message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MSG_ALTER_NAME_DBCL
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MSG_ALTER_NAME_DBCL} MSG_ALTER_NAME_DBCL
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MSG_ALTER_NAME_DBCL.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MSG_ALTER_NAME_DBCL message.
     * @function verify
     * @memberof MSG_ALTER_NAME_DBCL
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MSG_ALTER_NAME_DBCL.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.msgID))
            return "msgID: integer expected";
        if (message.pid != null && message.hasOwnProperty("pid"))
            if (typeof message.pid !== "number")
                return "pid: number expected";
        if (message.newName != null && message.hasOwnProperty("newName"))
            if (!$util.isString(message.newName))
                return "newName: string expected";
        if (message.cost != null && message.hasOwnProperty("cost"))
            if (typeof message.cost !== "number")
                return "cost: number expected";
        if (message.result != null && message.hasOwnProperty("result"))
            switch (message.result) {
            default:
                return "result: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
                break;
            }
        return null;
    };

    /**
     * Creates a MSG_ALTER_NAME_DBCL message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MSG_ALTER_NAME_DBCL
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MSG_ALTER_NAME_DBCL} MSG_ALTER_NAME_DBCL
     */
    MSG_ALTER_NAME_DBCL.fromObject = function fromObject(object) {
        if (object instanceof $root.MSG_ALTER_NAME_DBCL)
            return object;
        var message = new $root.MSG_ALTER_NAME_DBCL();
        if (object.msgID != null)
            message.msgID = object.msgID >>> 0;
        if (object.pid != null)
            message.pid = Number(object.pid);
        if (object.newName != null)
            message.newName = String(object.newName);
        if (object.cost != null)
            message.cost = Number(object.cost);
        switch (object.result) {
        case "SUCCESS":
        case 0:
            message.result = 0;
            break;
        case "NO_CLIENT_INFO":
        case 1:
            message.result = 1;
            break;
        case "OFFLINE":
        case 2:
            message.result = 2;
            break;
        case "NAME_INVALID":
        case 3:
            message.result = 3;
            break;
        case "COST_ERROR":
        case 4:
            message.result = 4;
            break;
        case "SAME_NAME":
        case 5:
            message.result = 5;
            break;
        case "DB_QUERY_ERROR":
        case 6:
            message.result = 6;
            break;
        case "REDIS_ERROR":
        case 7:
            message.result = 7;
            break;
        case "REDIS_FAIL":
        case 8:
            message.result = 8;
            break;
        case "LACK_COIN":
        case 9:
            message.result = 9;
            break;
        case "LACK_PI_INFO":
        case 10:
            message.result = 10;
            break;
        }
        return message;
    };

    /**
     * Creates a plain object from a MSG_ALTER_NAME_DBCL message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MSG_ALTER_NAME_DBCL
     * @static
     * @param {MSG_ALTER_NAME_DBCL} message MSG_ALTER_NAME_DBCL
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MSG_ALTER_NAME_DBCL.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.msgID = 0;
            object.pid = 0;
            object.newName = "";
            object.cost = 0;
            object.result = options.enums === String ? "SUCCESS" : 0;
        }
        if (message.msgID != null && message.hasOwnProperty("msgID"))
            object.msgID = message.msgID;
        if (message.pid != null && message.hasOwnProperty("pid"))
            object.pid = options.json && !isFinite(message.pid) ? String(message.pid) : message.pid;
        if (message.newName != null && message.hasOwnProperty("newName"))
            object.newName = message.newName;
        if (message.cost != null && message.hasOwnProperty("cost"))
            object.cost = options.json && !isFinite(message.cost) ? String(message.cost) : message.cost;
        if (message.result != null && message.hasOwnProperty("result"))
            object.result = options.enums === String ? $root.MSG_ALTER_NAME_DBCL.Result[message.result] : message.result;
        return object;
    };

    /**
     * Converts this MSG_ALTER_NAME_DBCL to JSON.
     * @function toJSON
     * @memberof MSG_ALTER_NAME_DBCL
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MSG_ALTER_NAME_DBCL.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Result enum.
     * @name MSG_ALTER_NAME_DBCL.Result
     * @enum {string}
     * @property {number} SUCCESS=0 SUCCESS value
     * @property {number} NO_CLIENT_INFO=1 NO_CLIENT_INFO value
     * @property {number} OFFLINE=2 OFFLINE value
     * @property {number} NAME_INVALID=3 NAME_INVALID value
     * @property {number} COST_ERROR=4 COST_ERROR value
     * @property {number} SAME_NAME=5 SAME_NAME value
     * @property {number} DB_QUERY_ERROR=6 DB_QUERY_ERROR value
     * @property {number} REDIS_ERROR=7 REDIS_ERROR value
     * @property {number} REDIS_FAIL=8 REDIS_FAIL value
     * @property {number} LACK_COIN=9 LACK_COIN value
     * @property {number} LACK_PI_INFO=10 LACK_PI_INFO value
     */
    MSG_ALTER_NAME_DBCL.Result = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "SUCCESS"] = 0;
        values[valuesById[1] = "NO_CLIENT_INFO"] = 1;
        values[valuesById[2] = "OFFLINE"] = 2;
        values[valuesById[3] = "NAME_INVALID"] = 3;
        values[valuesById[4] = "COST_ERROR"] = 4;
        values[valuesById[5] = "SAME_NAME"] = 5;
        values[valuesById[6] = "DB_QUERY_ERROR"] = 6;
        values[valuesById[7] = "REDIS_ERROR"] = 7;
        values[valuesById[8] = "REDIS_FAIL"] = 8;
        values[valuesById[9] = "LACK_COIN"] = 9;
        values[valuesById[10] = "LACK_PI_INFO"] = 10;
        return values;
    })();

    return MSG_ALTER_NAME_DBCL;
})();

module.exports = $root;
