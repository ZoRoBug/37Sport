/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.MSG_EXCHANGE_LBCL = (function() {

    /**
     * Properties of a MSG_EXCHANGE_LBCL.
     * @exports IMSG_EXCHANGE_LBCL
     * @interface IMSG_EXCHANGE_LBCL
     * @property {number} msgID MSG_EXCHANGE_LBCL msgID
     * @property {number|null} [pid] MSG_EXCHANGE_LBCL pid
     * @property {string|null} [ticket] MSG_EXCHANGE_LBCL ticket
     * @property {number|null} [coin] MSG_EXCHANGE_LBCL coin
     * @property {number|null} [failTimes] MSG_EXCHANGE_LBCL failTimes
     * @property {MSG_EXCHANGE_LBCL.Result|null} [result] MSG_EXCHANGE_LBCL result
     */

    /**
     * Constructs a new MSG_EXCHANGE_LBCL.
     * @exports MSG_EXCHANGE_LBCL
     * @classdesc Represents a MSG_EXCHANGE_LBCL.
     * @implements IMSG_EXCHANGE_LBCL
     * @constructor
     * @param {IMSG_EXCHANGE_LBCL=} [properties] Properties to set
     */
    function MSG_EXCHANGE_LBCL(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MSG_EXCHANGE_LBCL msgID.
     * @member {number} msgID
     * @memberof MSG_EXCHANGE_LBCL
     * @instance
     */
    MSG_EXCHANGE_LBCL.prototype.msgID = 0;

    /**
     * MSG_EXCHANGE_LBCL pid.
     * @member {number} pid
     * @memberof MSG_EXCHANGE_LBCL
     * @instance
     */
    MSG_EXCHANGE_LBCL.prototype.pid = 0;

    /**
     * MSG_EXCHANGE_LBCL ticket.
     * @member {string} ticket
     * @memberof MSG_EXCHANGE_LBCL
     * @instance
     */
    MSG_EXCHANGE_LBCL.prototype.ticket = "";

    /**
     * MSG_EXCHANGE_LBCL coin.
     * @member {number} coin
     * @memberof MSG_EXCHANGE_LBCL
     * @instance
     */
    MSG_EXCHANGE_LBCL.prototype.coin = 0;

    /**
     * MSG_EXCHANGE_LBCL failTimes.
     * @member {number} failTimes
     * @memberof MSG_EXCHANGE_LBCL
     * @instance
     */
    MSG_EXCHANGE_LBCL.prototype.failTimes = 0;

    /**
     * MSG_EXCHANGE_LBCL result.
     * @member {MSG_EXCHANGE_LBCL.Result} result
     * @memberof MSG_EXCHANGE_LBCL
     * @instance
     */
    MSG_EXCHANGE_LBCL.prototype.result = 0;

    /**
     * Creates a new MSG_EXCHANGE_LBCL instance using the specified properties.
     * @function create
     * @memberof MSG_EXCHANGE_LBCL
     * @static
     * @param {IMSG_EXCHANGE_LBCL=} [properties] Properties to set
     * @returns {MSG_EXCHANGE_LBCL} MSG_EXCHANGE_LBCL instance
     */
    MSG_EXCHANGE_LBCL.create = function create(properties) {
        return new MSG_EXCHANGE_LBCL(properties);
    };

    /**
     * Encodes the specified MSG_EXCHANGE_LBCL message. Does not implicitly {@link MSG_EXCHANGE_LBCL.verify|verify} messages.
     * @function encode
     * @memberof MSG_EXCHANGE_LBCL
     * @static
     * @param {IMSG_EXCHANGE_LBCL} message MSG_EXCHANGE_LBCL message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MSG_EXCHANGE_LBCL.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.msgID);
        if (message.pid != null && message.hasOwnProperty("pid"))
            writer.uint32(/* id 2, wireType 1 =*/17).double(message.pid);
        if (message.ticket != null && message.hasOwnProperty("ticket"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.ticket);
        if (message.coin != null && message.hasOwnProperty("coin"))
            writer.uint32(/* id 4, wireType 1 =*/33).double(message.coin);
        if (message.failTimes != null && message.hasOwnProperty("failTimes"))
            writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.failTimes);
        if (message.result != null && message.hasOwnProperty("result"))
            writer.uint32(/* id 6, wireType 0 =*/48).int32(message.result);
        return writer;
    };

    /**
     * Encodes the specified MSG_EXCHANGE_LBCL message, length delimited. Does not implicitly {@link MSG_EXCHANGE_LBCL.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MSG_EXCHANGE_LBCL
     * @static
     * @param {IMSG_EXCHANGE_LBCL} message MSG_EXCHANGE_LBCL message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MSG_EXCHANGE_LBCL.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MSG_EXCHANGE_LBCL message from the specified reader or buffer.
     * @function decode
     * @memberof MSG_EXCHANGE_LBCL
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MSG_EXCHANGE_LBCL} MSG_EXCHANGE_LBCL
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MSG_EXCHANGE_LBCL.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MSG_EXCHANGE_LBCL();
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
                message.ticket = reader.string();
                break;
            case 4:
                message.coin = reader.double();
                break;
            case 5:
                message.failTimes = reader.uint32();
                break;
            case 6:
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
     * Decodes a MSG_EXCHANGE_LBCL message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MSG_EXCHANGE_LBCL
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MSG_EXCHANGE_LBCL} MSG_EXCHANGE_LBCL
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MSG_EXCHANGE_LBCL.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MSG_EXCHANGE_LBCL message.
     * @function verify
     * @memberof MSG_EXCHANGE_LBCL
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MSG_EXCHANGE_LBCL.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.msgID))
            return "msgID: integer expected";
        if (message.pid != null && message.hasOwnProperty("pid"))
            if (typeof message.pid !== "number")
                return "pid: number expected";
        if (message.ticket != null && message.hasOwnProperty("ticket"))
            if (!$util.isString(message.ticket))
                return "ticket: string expected";
        if (message.coin != null && message.hasOwnProperty("coin"))
            if (typeof message.coin !== "number")
                return "coin: number expected";
        if (message.failTimes != null && message.hasOwnProperty("failTimes"))
            if (!$util.isInteger(message.failTimes))
                return "failTimes: integer expected";
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
                break;
            }
        return null;
    };

    /**
     * Creates a MSG_EXCHANGE_LBCL message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MSG_EXCHANGE_LBCL
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MSG_EXCHANGE_LBCL} MSG_EXCHANGE_LBCL
     */
    MSG_EXCHANGE_LBCL.fromObject = function fromObject(object) {
        if (object instanceof $root.MSG_EXCHANGE_LBCL)
            return object;
        var message = new $root.MSG_EXCHANGE_LBCL();
        if (object.msgID != null)
            message.msgID = object.msgID >>> 0;
        if (object.pid != null)
            message.pid = Number(object.pid);
        if (object.ticket != null)
            message.ticket = String(object.ticket);
        if (object.coin != null)
            message.coin = Number(object.coin);
        if (object.failTimes != null)
            message.failTimes = object.failTimes >>> 0;
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
        case "PARAM_INVALID":
        case 3:
            message.result = 3;
            break;
        case "REDIS_ERROR":
        case 4:
            message.result = 4;
            break;
        case "PLAYER_OFFLINE":
        case 5:
            message.result = 5;
            break;
        case "TICKET_NO_EXIST":
        case 6:
            message.result = 6;
            break;
        case "MAX_FAIL_TIMES":
        case 7:
            message.result = 7;
            break;
        }
        return message;
    };

    /**
     * Creates a plain object from a MSG_EXCHANGE_LBCL message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MSG_EXCHANGE_LBCL
     * @static
     * @param {MSG_EXCHANGE_LBCL} message MSG_EXCHANGE_LBCL
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MSG_EXCHANGE_LBCL.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.msgID = 0;
            object.pid = 0;
            object.ticket = "";
            object.coin = 0;
            object.failTimes = 0;
            object.result = options.enums === String ? "SUCCESS" : 0;
        }
        if (message.msgID != null && message.hasOwnProperty("msgID"))
            object.msgID = message.msgID;
        if (message.pid != null && message.hasOwnProperty("pid"))
            object.pid = options.json && !isFinite(message.pid) ? String(message.pid) : message.pid;
        if (message.ticket != null && message.hasOwnProperty("ticket"))
            object.ticket = message.ticket;
        if (message.coin != null && message.hasOwnProperty("coin"))
            object.coin = options.json && !isFinite(message.coin) ? String(message.coin) : message.coin;
        if (message.failTimes != null && message.hasOwnProperty("failTimes"))
            object.failTimes = message.failTimes;
        if (message.result != null && message.hasOwnProperty("result"))
            object.result = options.enums === String ? $root.MSG_EXCHANGE_LBCL.Result[message.result] : message.result;
        return object;
    };

    /**
     * Converts this MSG_EXCHANGE_LBCL to JSON.
     * @function toJSON
     * @memberof MSG_EXCHANGE_LBCL
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MSG_EXCHANGE_LBCL.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Result enum.
     * @name MSG_EXCHANGE_LBCL.Result
     * @enum {string}
     * @property {number} SUCCESS=0 SUCCESS value
     * @property {number} NO_CLIENT_INFO=1 NO_CLIENT_INFO value
     * @property {number} OFFLINE=2 OFFLINE value
     * @property {number} PARAM_INVALID=3 PARAM_INVALID value
     * @property {number} REDIS_ERROR=4 REDIS_ERROR value
     * @property {number} PLAYER_OFFLINE=5 PLAYER_OFFLINE value
     * @property {number} TICKET_NO_EXIST=6 TICKET_NO_EXIST value
     * @property {number} MAX_FAIL_TIMES=7 MAX_FAIL_TIMES value
     */
    MSG_EXCHANGE_LBCL.Result = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "SUCCESS"] = 0;
        values[valuesById[1] = "NO_CLIENT_INFO"] = 1;
        values[valuesById[2] = "OFFLINE"] = 2;
        values[valuesById[3] = "PARAM_INVALID"] = 3;
        values[valuesById[4] = "REDIS_ERROR"] = 4;
        values[valuesById[5] = "PLAYER_OFFLINE"] = 5;
        values[valuesById[6] = "TICKET_NO_EXIST"] = 6;
        values[valuesById[7] = "MAX_FAIL_TIMES"] = 7;
        return values;
    })();

    return MSG_EXCHANGE_LBCL;
})();

module.exports = $root;
