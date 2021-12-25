/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = protobuf;

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.MSG_SEND_MAIL_LBCL = (function() {

    /**
     * Properties of a MSG_SEND_MAIL_LBCL.
     * @exports IMSG_SEND_MAIL_LBCL
     * @interface IMSG_SEND_MAIL_LBCL
     * @property {number} msgID MSG_SEND_MAIL_LBCL msgID
     * @property {number|null} [sendPID] MSG_SEND_MAIL_LBCL sendPID
     * @property {number|null} [recvPID] MSG_SEND_MAIL_LBCL recvPID
     * @property {string|null} [sendName] MSG_SEND_MAIL_LBCL sendName
     * @property {string|null} [recvName] MSG_SEND_MAIL_LBCL recvName
     * @property {number|null} [giftCoin] MSG_SEND_MAIL_LBCL giftCoin
     * @property {string|null} [content] MSG_SEND_MAIL_LBCL content
     * @property {MSG_SEND_MAIL_LBCL.Result|null} [result] MSG_SEND_MAIL_LBCL result
     */

    /**
     * Constructs a new MSG_SEND_MAIL_LBCL.
     * @exports MSG_SEND_MAIL_LBCL
     * @classdesc Represents a MSG_SEND_MAIL_LBCL.
     * @implements IMSG_SEND_MAIL_LBCL
     * @constructor
     * @param {IMSG_SEND_MAIL_LBCL=} [properties] Properties to set
     */
    function MSG_SEND_MAIL_LBCL(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MSG_SEND_MAIL_LBCL msgID.
     * @member {number} msgID
     * @memberof MSG_SEND_MAIL_LBCL
     * @instance
     */
    MSG_SEND_MAIL_LBCL.prototype.msgID = 0;

    /**
     * MSG_SEND_MAIL_LBCL sendPID.
     * @member {number} sendPID
     * @memberof MSG_SEND_MAIL_LBCL
     * @instance
     */
    MSG_SEND_MAIL_LBCL.prototype.sendPID = 0;

    /**
     * MSG_SEND_MAIL_LBCL recvPID.
     * @member {number} recvPID
     * @memberof MSG_SEND_MAIL_LBCL
     * @instance
     */
    MSG_SEND_MAIL_LBCL.prototype.recvPID = 0;

    /**
     * MSG_SEND_MAIL_LBCL sendName.
     * @member {string} sendName
     * @memberof MSG_SEND_MAIL_LBCL
     * @instance
     */
    MSG_SEND_MAIL_LBCL.prototype.sendName = "";

    /**
     * MSG_SEND_MAIL_LBCL recvName.
     * @member {string} recvName
     * @memberof MSG_SEND_MAIL_LBCL
     * @instance
     */
    MSG_SEND_MAIL_LBCL.prototype.recvName = "";

    /**
     * MSG_SEND_MAIL_LBCL giftCoin.
     * @member {number} giftCoin
     * @memberof MSG_SEND_MAIL_LBCL
     * @instance
     */
    MSG_SEND_MAIL_LBCL.prototype.giftCoin = 0;

    /**
     * MSG_SEND_MAIL_LBCL content.
     * @member {string} content
     * @memberof MSG_SEND_MAIL_LBCL
     * @instance
     */
    MSG_SEND_MAIL_LBCL.prototype.content = "";

    /**
     * MSG_SEND_MAIL_LBCL result.
     * @member {MSG_SEND_MAIL_LBCL.Result} result
     * @memberof MSG_SEND_MAIL_LBCL
     * @instance
     */
    MSG_SEND_MAIL_LBCL.prototype.result = 0;

    /**
     * Creates a new MSG_SEND_MAIL_LBCL instance using the specified properties.
     * @function create
     * @memberof MSG_SEND_MAIL_LBCL
     * @static
     * @param {IMSG_SEND_MAIL_LBCL=} [properties] Properties to set
     * @returns {MSG_SEND_MAIL_LBCL} MSG_SEND_MAIL_LBCL instance
     */
    MSG_SEND_MAIL_LBCL.create = function create(properties) {
        return new MSG_SEND_MAIL_LBCL(properties);
    };

    /**
     * Encodes the specified MSG_SEND_MAIL_LBCL message. Does not implicitly {@link MSG_SEND_MAIL_LBCL.verify|verify} messages.
     * @function encode
     * @memberof MSG_SEND_MAIL_LBCL
     * @static
     * @param {IMSG_SEND_MAIL_LBCL} message MSG_SEND_MAIL_LBCL message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MSG_SEND_MAIL_LBCL.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.msgID);
        if (message.sendPID != null && message.hasOwnProperty("sendPID"))
            writer.uint32(/* id 2, wireType 1 =*/17).double(message.sendPID);
        if (message.recvPID != null && message.hasOwnProperty("recvPID"))
            writer.uint32(/* id 3, wireType 1 =*/25).double(message.recvPID);
        if (message.sendName != null && message.hasOwnProperty("sendName"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.sendName);
        if (message.recvName != null && message.hasOwnProperty("recvName"))
            writer.uint32(/* id 5, wireType 2 =*/42).string(message.recvName);
        if (message.giftCoin != null && message.hasOwnProperty("giftCoin"))
            writer.uint32(/* id 6, wireType 1 =*/49).double(message.giftCoin);
        if (message.content != null && message.hasOwnProperty("content"))
            writer.uint32(/* id 7, wireType 2 =*/58).string(message.content);
        if (message.result != null && message.hasOwnProperty("result"))
            writer.uint32(/* id 8, wireType 0 =*/64).int32(message.result);
        return writer;
    };

    /**
     * Encodes the specified MSG_SEND_MAIL_LBCL message, length delimited. Does not implicitly {@link MSG_SEND_MAIL_LBCL.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MSG_SEND_MAIL_LBCL
     * @static
     * @param {IMSG_SEND_MAIL_LBCL} message MSG_SEND_MAIL_LBCL message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MSG_SEND_MAIL_LBCL.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MSG_SEND_MAIL_LBCL message from the specified reader or buffer.
     * @function decode
     * @memberof MSG_SEND_MAIL_LBCL
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MSG_SEND_MAIL_LBCL} MSG_SEND_MAIL_LBCL
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MSG_SEND_MAIL_LBCL.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MSG_SEND_MAIL_LBCL();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.msgID = reader.uint32();
                break;
            case 2:
                message.sendPID = reader.double();
                break;
            case 3:
                message.recvPID = reader.double();
                break;
            case 4:
                message.sendName = reader.string();
                break;
            case 5:
                message.recvName = reader.string();
                break;
            case 6:
                message.giftCoin = reader.double();
                break;
            case 7:
                message.content = reader.string();
                break;
            case 8:
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
     * Decodes a MSG_SEND_MAIL_LBCL message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MSG_SEND_MAIL_LBCL
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MSG_SEND_MAIL_LBCL} MSG_SEND_MAIL_LBCL
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MSG_SEND_MAIL_LBCL.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MSG_SEND_MAIL_LBCL message.
     * @function verify
     * @memberof MSG_SEND_MAIL_LBCL
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MSG_SEND_MAIL_LBCL.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.msgID))
            return "msgID: integer expected";
        if (message.sendPID != null && message.hasOwnProperty("sendPID"))
            if (typeof message.sendPID !== "number")
                return "sendPID: number expected";
        if (message.recvPID != null && message.hasOwnProperty("recvPID"))
            if (typeof message.recvPID !== "number")
                return "recvPID: number expected";
        if (message.sendName != null && message.hasOwnProperty("sendName"))
            if (!$util.isString(message.sendName))
                return "sendName: string expected";
        if (message.recvName != null && message.hasOwnProperty("recvName"))
            if (!$util.isString(message.recvName))
                return "recvName: string expected";
        if (message.giftCoin != null && message.hasOwnProperty("giftCoin"))
            if (typeof message.giftCoin !== "number")
                return "giftCoin: number expected";
        if (message.content != null && message.hasOwnProperty("content"))
            if (!$util.isString(message.content))
                return "content: string expected";
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
                break;
            }
        return null;
    };

    /**
     * Creates a MSG_SEND_MAIL_LBCL message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MSG_SEND_MAIL_LBCL
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MSG_SEND_MAIL_LBCL} MSG_SEND_MAIL_LBCL
     */
    MSG_SEND_MAIL_LBCL.fromObject = function fromObject(object) {
        if (object instanceof $root.MSG_SEND_MAIL_LBCL)
            return object;
        var message = new $root.MSG_SEND_MAIL_LBCL();
        if (object.msgID != null)
            message.msgID = object.msgID >>> 0;
        if (object.sendPID != null)
            message.sendPID = Number(object.sendPID);
        if (object.recvPID != null)
            message.recvPID = Number(object.recvPID);
        if (object.sendName != null)
            message.sendName = String(object.sendName);
        if (object.recvName != null)
            message.recvName = String(object.recvName);
        if (object.giftCoin != null)
            message.giftCoin = Number(object.giftCoin);
        if (object.content != null)
            message.content = String(object.content);
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
        case "SENDER_LACK_COIN":
        case 5:
            message.result = 5;
            break;
        case "SENDER_LACK_NAME":
        case 6:
            message.result = 6;
            break;
        case "RECVER_OFFLINE":
        case 7:
            message.result = 7;
            break;
        case "CONTENT_INVALID":
        case 8:
            message.result = 8;
            break;
        }
        return message;
    };

    /**
     * Creates a plain object from a MSG_SEND_MAIL_LBCL message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MSG_SEND_MAIL_LBCL
     * @static
     * @param {MSG_SEND_MAIL_LBCL} message MSG_SEND_MAIL_LBCL
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MSG_SEND_MAIL_LBCL.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.msgID = 0;
            object.sendPID = 0;
            object.recvPID = 0;
            object.sendName = "";
            object.recvName = "";
            object.giftCoin = 0;
            object.content = "";
            object.result = options.enums === String ? "SUCCESS" : 0;
        }
        if (message.msgID != null && message.hasOwnProperty("msgID"))
            object.msgID = message.msgID;
        if (message.sendPID != null && message.hasOwnProperty("sendPID"))
            object.sendPID = options.json && !isFinite(message.sendPID) ? String(message.sendPID) : message.sendPID;
        if (message.recvPID != null && message.hasOwnProperty("recvPID"))
            object.recvPID = options.json && !isFinite(message.recvPID) ? String(message.recvPID) : message.recvPID;
        if (message.sendName != null && message.hasOwnProperty("sendName"))
            object.sendName = message.sendName;
        if (message.recvName != null && message.hasOwnProperty("recvName"))
            object.recvName = message.recvName;
        if (message.giftCoin != null && message.hasOwnProperty("giftCoin"))
            object.giftCoin = options.json && !isFinite(message.giftCoin) ? String(message.giftCoin) : message.giftCoin;
        if (message.content != null && message.hasOwnProperty("content"))
            object.content = message.content;
        if (message.result != null && message.hasOwnProperty("result"))
            object.result = options.enums === String ? $root.MSG_SEND_MAIL_LBCL.Result[message.result] : message.result;
        return object;
    };

    /**
     * Converts this MSG_SEND_MAIL_LBCL to JSON.
     * @function toJSON
     * @memberof MSG_SEND_MAIL_LBCL
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MSG_SEND_MAIL_LBCL.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Result enum.
     * @name MSG_SEND_MAIL_LBCL.Result
     * @enum {string}
     * @property {number} SUCCESS=0 SUCCESS value
     * @property {number} NO_CLIENT_INFO=1 NO_CLIENT_INFO value
     * @property {number} OFFLINE=2 OFFLINE value
     * @property {number} PARAM_INVALID=3 PARAM_INVALID value
     * @property {number} REDIS_ERROR=4 REDIS_ERROR value
     * @property {number} SENDER_LACK_COIN=5 SENDER_LACK_COIN value
     * @property {number} SENDER_LACK_NAME=6 SENDER_LACK_NAME value
     * @property {number} RECVER_OFFLINE=7 RECVER_OFFLINE value
     * @property {number} CONTENT_INVALID=8 CONTENT_INVALID value
     */
    MSG_SEND_MAIL_LBCL.Result = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "SUCCESS"] = 0;
        values[valuesById[1] = "NO_CLIENT_INFO"] = 1;
        values[valuesById[2] = "OFFLINE"] = 2;
        values[valuesById[3] = "PARAM_INVALID"] = 3;
        values[valuesById[4] = "REDIS_ERROR"] = 4;
        values[valuesById[5] = "SENDER_LACK_COIN"] = 5;
        values[valuesById[6] = "SENDER_LACK_NAME"] = 6;
        values[valuesById[7] = "RECVER_OFFLINE"] = 7;
        values[valuesById[8] = "CONTENT_INVALID"] = 8;
        return values;
    })();

    return MSG_SEND_MAIL_LBCL;
})();

module.exports = $root;
