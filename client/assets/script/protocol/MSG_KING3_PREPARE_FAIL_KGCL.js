/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = protobuf;

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.MSG_KING3_PREPARE_FAIL_KGCL = (function() {

    /**
     * Properties of a MSG_KING3_PREPARE_FAIL_KGCL.
     * @exports IMSG_KING3_PREPARE_FAIL_KGCL
     * @interface IMSG_KING3_PREPARE_FAIL_KGCL
     * @property {number} msgID MSG_KING3_PREPARE_FAIL_KGCL msgID
     * @property {number|null} [rid] MSG_KING3_PREPARE_FAIL_KGCL rid
     * @property {number|null} [pid] MSG_KING3_PREPARE_FAIL_KGCL pid
     * @property {MSG_KING3_PREPARE_FAIL_KGCL.Reason|null} [reason] MSG_KING3_PREPARE_FAIL_KGCL reason
     */

    /**
     * Constructs a new MSG_KING3_PREPARE_FAIL_KGCL.
     * @exports MSG_KING3_PREPARE_FAIL_KGCL
     * @classdesc Represents a MSG_KING3_PREPARE_FAIL_KGCL.
     * @implements IMSG_KING3_PREPARE_FAIL_KGCL
     * @constructor
     * @param {IMSG_KING3_PREPARE_FAIL_KGCL=} [properties] Properties to set
     */
    function MSG_KING3_PREPARE_FAIL_KGCL(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MSG_KING3_PREPARE_FAIL_KGCL msgID.
     * @member {number} msgID
     * @memberof MSG_KING3_PREPARE_FAIL_KGCL
     * @instance
     */
    MSG_KING3_PREPARE_FAIL_KGCL.prototype.msgID = 0;

    /**
     * MSG_KING3_PREPARE_FAIL_KGCL rid.
     * @member {number} rid
     * @memberof MSG_KING3_PREPARE_FAIL_KGCL
     * @instance
     */
    MSG_KING3_PREPARE_FAIL_KGCL.prototype.rid = 0;

    /**
     * MSG_KING3_PREPARE_FAIL_KGCL pid.
     * @member {number} pid
     * @memberof MSG_KING3_PREPARE_FAIL_KGCL
     * @instance
     */
    MSG_KING3_PREPARE_FAIL_KGCL.prototype.pid = 0;

    /**
     * MSG_KING3_PREPARE_FAIL_KGCL reason.
     * @member {MSG_KING3_PREPARE_FAIL_KGCL.Reason} reason
     * @memberof MSG_KING3_PREPARE_FAIL_KGCL
     * @instance
     */
    MSG_KING3_PREPARE_FAIL_KGCL.prototype.reason = 1;

    /**
     * Creates a new MSG_KING3_PREPARE_FAIL_KGCL instance using the specified properties.
     * @function create
     * @memberof MSG_KING3_PREPARE_FAIL_KGCL
     * @static
     * @param {IMSG_KING3_PREPARE_FAIL_KGCL=} [properties] Properties to set
     * @returns {MSG_KING3_PREPARE_FAIL_KGCL} MSG_KING3_PREPARE_FAIL_KGCL instance
     */
    MSG_KING3_PREPARE_FAIL_KGCL.create = function create(properties) {
        return new MSG_KING3_PREPARE_FAIL_KGCL(properties);
    };

    /**
     * Encodes the specified MSG_KING3_PREPARE_FAIL_KGCL message. Does not implicitly {@link MSG_KING3_PREPARE_FAIL_KGCL.verify|verify} messages.
     * @function encode
     * @memberof MSG_KING3_PREPARE_FAIL_KGCL
     * @static
     * @param {IMSG_KING3_PREPARE_FAIL_KGCL} message MSG_KING3_PREPARE_FAIL_KGCL message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MSG_KING3_PREPARE_FAIL_KGCL.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.msgID);
        if (message.rid != null && message.hasOwnProperty("rid"))
            writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.rid);
        if (message.pid != null && message.hasOwnProperty("pid"))
            writer.uint32(/* id 3, wireType 1 =*/25).double(message.pid);
        if (message.reason != null && message.hasOwnProperty("reason"))
            writer.uint32(/* id 4, wireType 0 =*/32).int32(message.reason);
        return writer;
    };

    /**
     * Encodes the specified MSG_KING3_PREPARE_FAIL_KGCL message, length delimited. Does not implicitly {@link MSG_KING3_PREPARE_FAIL_KGCL.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MSG_KING3_PREPARE_FAIL_KGCL
     * @static
     * @param {IMSG_KING3_PREPARE_FAIL_KGCL} message MSG_KING3_PREPARE_FAIL_KGCL message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MSG_KING3_PREPARE_FAIL_KGCL.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MSG_KING3_PREPARE_FAIL_KGCL message from the specified reader or buffer.
     * @function decode
     * @memberof MSG_KING3_PREPARE_FAIL_KGCL
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MSG_KING3_PREPARE_FAIL_KGCL} MSG_KING3_PREPARE_FAIL_KGCL
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MSG_KING3_PREPARE_FAIL_KGCL.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MSG_KING3_PREPARE_FAIL_KGCL();
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
                message.reason = reader.int32();
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
     * Decodes a MSG_KING3_PREPARE_FAIL_KGCL message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MSG_KING3_PREPARE_FAIL_KGCL
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MSG_KING3_PREPARE_FAIL_KGCL} MSG_KING3_PREPARE_FAIL_KGCL
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MSG_KING3_PREPARE_FAIL_KGCL.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MSG_KING3_PREPARE_FAIL_KGCL message.
     * @function verify
     * @memberof MSG_KING3_PREPARE_FAIL_KGCL
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MSG_KING3_PREPARE_FAIL_KGCL.verify = function verify(message) {
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
        if (message.reason != null && message.hasOwnProperty("reason"))
            switch (message.reason) {
            default:
                return "reason: enum value expected";
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
     * Creates a MSG_KING3_PREPARE_FAIL_KGCL message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MSG_KING3_PREPARE_FAIL_KGCL
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MSG_KING3_PREPARE_FAIL_KGCL} MSG_KING3_PREPARE_FAIL_KGCL
     */
    MSG_KING3_PREPARE_FAIL_KGCL.fromObject = function fromObject(object) {
        if (object instanceof $root.MSG_KING3_PREPARE_FAIL_KGCL)
            return object;
        var message = new $root.MSG_KING3_PREPARE_FAIL_KGCL();
        if (object.msgID != null)
            message.msgID = object.msgID >>> 0;
        if (object.rid != null)
            message.rid = object.rid >>> 0;
        if (object.pid != null)
            message.pid = Number(object.pid);
        switch (object.reason) {
        case "OFFLINE":
        case 1:
            message.reason = 1;
            break;
        case "NO_CLIENT_INFO":
        case 2:
            message.reason = 2;
            break;
        case "OTHER_PREPARE":
        case 3:
            message.reason = 3;
            break;
        case "REDIS_ERROR":
        case 4:
            message.reason = 4;
            break;
        case "REDIS_NO_PI":
        case 5:
            message.reason = 5;
            break;
        case "NO_THIS_ROOM":
        case 6:
            message.reason = 6;
            break;
        case "NO_PREPARE_STATE":
        case 7:
            message.reason = 7;
            break;
        case "LACK_COIN":
        case 8:
            message.reason = 8;
            break;
        case "OVER_MAX_LOSS":
        case 9:
            message.reason = 9;
            break;
        case "SERVER_NO_READY":
        case 10:
            message.reason = 10;
            break;
        }
        return message;
    };

    /**
     * Creates a plain object from a MSG_KING3_PREPARE_FAIL_KGCL message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MSG_KING3_PREPARE_FAIL_KGCL
     * @static
     * @param {MSG_KING3_PREPARE_FAIL_KGCL} message MSG_KING3_PREPARE_FAIL_KGCL
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MSG_KING3_PREPARE_FAIL_KGCL.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.msgID = 0;
            object.rid = 0;
            object.pid = 0;
            object.reason = options.enums === String ? "OFFLINE" : 1;
        }
        if (message.msgID != null && message.hasOwnProperty("msgID"))
            object.msgID = message.msgID;
        if (message.rid != null && message.hasOwnProperty("rid"))
            object.rid = message.rid;
        if (message.pid != null && message.hasOwnProperty("pid"))
            object.pid = options.json && !isFinite(message.pid) ? String(message.pid) : message.pid;
        if (message.reason != null && message.hasOwnProperty("reason"))
            object.reason = options.enums === String ? $root.MSG_KING3_PREPARE_FAIL_KGCL.Reason[message.reason] : message.reason;
        return object;
    };

    /**
     * Converts this MSG_KING3_PREPARE_FAIL_KGCL to JSON.
     * @function toJSON
     * @memberof MSG_KING3_PREPARE_FAIL_KGCL
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MSG_KING3_PREPARE_FAIL_KGCL.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Reason enum.
     * @name MSG_KING3_PREPARE_FAIL_KGCL.Reason
     * @enum {string}
     * @property {number} OFFLINE=1 OFFLINE value
     * @property {number} NO_CLIENT_INFO=2 NO_CLIENT_INFO value
     * @property {number} OTHER_PREPARE=3 OTHER_PREPARE value
     * @property {number} REDIS_ERROR=4 REDIS_ERROR value
     * @property {number} REDIS_NO_PI=5 REDIS_NO_PI value
     * @property {number} NO_THIS_ROOM=6 NO_THIS_ROOM value
     * @property {number} NO_PREPARE_STATE=7 NO_PREPARE_STATE value
     * @property {number} LACK_COIN=8 LACK_COIN value
     * @property {number} OVER_MAX_LOSS=9 OVER_MAX_LOSS value
     * @property {number} SERVER_NO_READY=10 SERVER_NO_READY value
     */
    MSG_KING3_PREPARE_FAIL_KGCL.Reason = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[1] = "OFFLINE"] = 1;
        values[valuesById[2] = "NO_CLIENT_INFO"] = 2;
        values[valuesById[3] = "OTHER_PREPARE"] = 3;
        values[valuesById[4] = "REDIS_ERROR"] = 4;
        values[valuesById[5] = "REDIS_NO_PI"] = 5;
        values[valuesById[6] = "NO_THIS_ROOM"] = 6;
        values[valuesById[7] = "NO_PREPARE_STATE"] = 7;
        values[valuesById[8] = "LACK_COIN"] = 8;
        values[valuesById[9] = "OVER_MAX_LOSS"] = 9;
        values[valuesById[10] = "SERVER_NO_READY"] = 10;
        return values;
    })();

    return MSG_KING3_PREPARE_FAIL_KGCL;
})();

module.exports = $root;
