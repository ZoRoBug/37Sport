/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.MSG_POWER7_LOGIN_PWCL = (function() {

    /**
     * Properties of a MSG_POWER7_LOGIN_PWCL.
     * @exports IMSG_POWER7_LOGIN_PWCL
     * @interface IMSG_POWER7_LOGIN_PWCL
     * @property {number} msgID MSG_POWER7_LOGIN_PWCL msgID
     * @property {number|null} [rid] MSG_POWER7_LOGIN_PWCL rid
     * @property {number|null} [pid] MSG_POWER7_LOGIN_PWCL pid
     * @property {number|null} [cost] MSG_POWER7_LOGIN_PWCL cost
     * @property {MSG_POWER7_LOGIN_PWCL.Result|null} [result] MSG_POWER7_LOGIN_PWCL result
     */

    /**
     * Constructs a new MSG_POWER7_LOGIN_PWCL.
     * @exports MSG_POWER7_LOGIN_PWCL
     * @classdesc Represents a MSG_POWER7_LOGIN_PWCL.
     * @implements IMSG_POWER7_LOGIN_PWCL
     * @constructor
     * @param {IMSG_POWER7_LOGIN_PWCL=} [properties] Properties to set
     */
    function MSG_POWER7_LOGIN_PWCL(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MSG_POWER7_LOGIN_PWCL msgID.
     * @member {number} msgID
     * @memberof MSG_POWER7_LOGIN_PWCL
     * @instance
     */
    MSG_POWER7_LOGIN_PWCL.prototype.msgID = 0;

    /**
     * MSG_POWER7_LOGIN_PWCL rid.
     * @member {number} rid
     * @memberof MSG_POWER7_LOGIN_PWCL
     * @instance
     */
    MSG_POWER7_LOGIN_PWCL.prototype.rid = 0;

    /**
     * MSG_POWER7_LOGIN_PWCL pid.
     * @member {number} pid
     * @memberof MSG_POWER7_LOGIN_PWCL
     * @instance
     */
    MSG_POWER7_LOGIN_PWCL.prototype.pid = 0;

    /**
     * MSG_POWER7_LOGIN_PWCL cost.
     * @member {number} cost
     * @memberof MSG_POWER7_LOGIN_PWCL
     * @instance
     */
    MSG_POWER7_LOGIN_PWCL.prototype.cost = 0;

    /**
     * MSG_POWER7_LOGIN_PWCL result.
     * @member {MSG_POWER7_LOGIN_PWCL.Result} result
     * @memberof MSG_POWER7_LOGIN_PWCL
     * @instance
     */
    MSG_POWER7_LOGIN_PWCL.prototype.result = 0;

    /**
     * Creates a new MSG_POWER7_LOGIN_PWCL instance using the specified properties.
     * @function create
     * @memberof MSG_POWER7_LOGIN_PWCL
     * @static
     * @param {IMSG_POWER7_LOGIN_PWCL=} [properties] Properties to set
     * @returns {MSG_POWER7_LOGIN_PWCL} MSG_POWER7_LOGIN_PWCL instance
     */
    MSG_POWER7_LOGIN_PWCL.create = function create(properties) {
        return new MSG_POWER7_LOGIN_PWCL(properties);
    };

    /**
     * Encodes the specified MSG_POWER7_LOGIN_PWCL message. Does not implicitly {@link MSG_POWER7_LOGIN_PWCL.verify|verify} messages.
     * @function encode
     * @memberof MSG_POWER7_LOGIN_PWCL
     * @static
     * @param {IMSG_POWER7_LOGIN_PWCL} message MSG_POWER7_LOGIN_PWCL message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MSG_POWER7_LOGIN_PWCL.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.msgID);
        if (message.rid != null && message.hasOwnProperty("rid"))
            writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.rid);
        if (message.pid != null && message.hasOwnProperty("pid"))
            writer.uint32(/* id 3, wireType 1 =*/25).double(message.pid);
        if (message.cost != null && message.hasOwnProperty("cost"))
            writer.uint32(/* id 4, wireType 1 =*/33).double(message.cost);
        if (message.result != null && message.hasOwnProperty("result"))
            writer.uint32(/* id 5, wireType 0 =*/40).int32(message.result);
        return writer;
    };

    /**
     * Encodes the specified MSG_POWER7_LOGIN_PWCL message, length delimited. Does not implicitly {@link MSG_POWER7_LOGIN_PWCL.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MSG_POWER7_LOGIN_PWCL
     * @static
     * @param {IMSG_POWER7_LOGIN_PWCL} message MSG_POWER7_LOGIN_PWCL message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MSG_POWER7_LOGIN_PWCL.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MSG_POWER7_LOGIN_PWCL message from the specified reader or buffer.
     * @function decode
     * @memberof MSG_POWER7_LOGIN_PWCL
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MSG_POWER7_LOGIN_PWCL} MSG_POWER7_LOGIN_PWCL
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MSG_POWER7_LOGIN_PWCL.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MSG_POWER7_LOGIN_PWCL();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.msgID = reader.uint32();
                break;
            case 2:
                message.rid = reader.uint32();
                break;
            case 3:
                message.pid = reader.double();
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
     * Decodes a MSG_POWER7_LOGIN_PWCL message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MSG_POWER7_LOGIN_PWCL
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MSG_POWER7_LOGIN_PWCL} MSG_POWER7_LOGIN_PWCL
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MSG_POWER7_LOGIN_PWCL.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MSG_POWER7_LOGIN_PWCL message.
     * @function verify
     * @memberof MSG_POWER7_LOGIN_PWCL
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MSG_POWER7_LOGIN_PWCL.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.msgID))
            return "msgID: integer expected";
        if (message.rid != null && message.hasOwnProperty("rid"))
            if (!$util.isInteger(message.rid))
                return "rid: integer expected";
        if (message.pid != null && message.hasOwnProperty("pid"))
            if (typeof message.pid !== "number")
                return "pid: number expected";
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
            case 11:
                break;
            }
        return null;
    };

    /**
     * Creates a MSG_POWER7_LOGIN_PWCL message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MSG_POWER7_LOGIN_PWCL
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MSG_POWER7_LOGIN_PWCL} MSG_POWER7_LOGIN_PWCL
     */
    MSG_POWER7_LOGIN_PWCL.fromObject = function fromObject(object) {
        if (object instanceof $root.MSG_POWER7_LOGIN_PWCL)
            return object;
        var message = new $root.MSG_POWER7_LOGIN_PWCL();
        if (object.msgID != null)
            message.msgID = object.msgID >>> 0;
        if (object.rid != null)
            message.rid = object.rid >>> 0;
        if (object.pid != null)
            message.pid = Number(object.pid);
        if (object.cost != null)
            message.cost = Number(object.cost);
        switch (object.result) {
        case "SUCCESS":
        case 0:
            message.result = 0;
            break;
        case "OFFLINE":
        case 1:
            message.result = 1;
            break;
        case "NO_CLIENT_INFO":
        case 2:
            message.result = 2;
            break;
        case "OTHER_UNLOCK":
        case 3:
            message.result = 3;
            break;
        case "UNLOCK_COST_ERROR":
        case 4:
            message.result = 4;
            break;
        case "NOT_READY":
        case 5:
            message.result = 5;
            break;
        case "PARAM_ERROR":
        case 6:
            message.result = 6;
            break;
        case "ROOM_FULL":
        case 7:
            message.result = 7;
            break;
        case "REDIS_ERROR":
        case 8:
            message.result = 8;
            break;
        case "COIN_NOT_ENOUGH":
        case 9:
            message.result = 9;
            break;
        case "PASSWORD_ERROR":
        case 10:
            message.result = 10;
            break;
        case "FULL_PLAYER":
        case 11:
            message.result = 11;
            break;
        }
        return message;
    };

    /**
     * Creates a plain object from a MSG_POWER7_LOGIN_PWCL message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MSG_POWER7_LOGIN_PWCL
     * @static
     * @param {MSG_POWER7_LOGIN_PWCL} message MSG_POWER7_LOGIN_PWCL
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MSG_POWER7_LOGIN_PWCL.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.msgID = 0;
            object.rid = 0;
            object.pid = 0;
            object.cost = 0;
            object.result = options.enums === String ? "SUCCESS" : 0;
        }
        if (message.msgID != null && message.hasOwnProperty("msgID"))
            object.msgID = message.msgID;
        if (message.rid != null && message.hasOwnProperty("rid"))
            object.rid = message.rid;
        if (message.pid != null && message.hasOwnProperty("pid"))
            object.pid = options.json && !isFinite(message.pid) ? String(message.pid) : message.pid;
        if (message.cost != null && message.hasOwnProperty("cost"))
            object.cost = options.json && !isFinite(message.cost) ? String(message.cost) : message.cost;
        if (message.result != null && message.hasOwnProperty("result"))
            object.result = options.enums === String ? $root.MSG_POWER7_LOGIN_PWCL.Result[message.result] : message.result;
        return object;
    };

    /**
     * Converts this MSG_POWER7_LOGIN_PWCL to JSON.
     * @function toJSON
     * @memberof MSG_POWER7_LOGIN_PWCL
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MSG_POWER7_LOGIN_PWCL.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Result enum.
     * @name MSG_POWER7_LOGIN_PWCL.Result
     * @enum {string}
     * @property {number} SUCCESS=0 SUCCESS value
     * @property {number} OFFLINE=1 OFFLINE value
     * @property {number} NO_CLIENT_INFO=2 NO_CLIENT_INFO value
     * @property {number} OTHER_UNLOCK=3 OTHER_UNLOCK value
     * @property {number} UNLOCK_COST_ERROR=4 UNLOCK_COST_ERROR value
     * @property {number} NOT_READY=5 NOT_READY value
     * @property {number} PARAM_ERROR=6 PARAM_ERROR value
     * @property {number} ROOM_FULL=7 ROOM_FULL value
     * @property {number} REDIS_ERROR=8 REDIS_ERROR value
     * @property {number} COIN_NOT_ENOUGH=9 COIN_NOT_ENOUGH value
     * @property {number} PASSWORD_ERROR=10 PASSWORD_ERROR value
     * @property {number} FULL_PLAYER=11 FULL_PLAYER value
     */
    MSG_POWER7_LOGIN_PWCL.Result = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "SUCCESS"] = 0;
        values[valuesById[1] = "OFFLINE"] = 1;
        values[valuesById[2] = "NO_CLIENT_INFO"] = 2;
        values[valuesById[3] = "OTHER_UNLOCK"] = 3;
        values[valuesById[4] = "UNLOCK_COST_ERROR"] = 4;
        values[valuesById[5] = "NOT_READY"] = 5;
        values[valuesById[6] = "PARAM_ERROR"] = 6;
        values[valuesById[7] = "ROOM_FULL"] = 7;
        values[valuesById[8] = "REDIS_ERROR"] = 8;
        values[valuesById[9] = "COIN_NOT_ENOUGH"] = 9;
        values[valuesById[10] = "PASSWORD_ERROR"] = 10;
        values[valuesById[11] = "FULL_PLAYER"] = 11;
        return values;
    })();

    return MSG_POWER7_LOGIN_PWCL;
})();

module.exports = $root;
