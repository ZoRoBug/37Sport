/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = protobuf;

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.MSG_SEND_MAIL_CLLB = (function() {

    /**
     * Properties of a MSG_SEND_MAIL_CLLB.
     * @exports IMSG_SEND_MAIL_CLLB
     * @interface IMSG_SEND_MAIL_CLLB
     * @property {number} msgID MSG_SEND_MAIL_CLLB msgID
     * @property {number|null} [sendPID] MSG_SEND_MAIL_CLLB sendPID
     * @property {number|null} [recvPID] MSG_SEND_MAIL_CLLB recvPID
     * @property {string|null} [sendName] MSG_SEND_MAIL_CLLB sendName
     * @property {string|null} [recvName] MSG_SEND_MAIL_CLLB recvName
     * @property {number|null} [giftCoin] MSG_SEND_MAIL_CLLB giftCoin
     * @property {string|null} [content] MSG_SEND_MAIL_CLLB content
     */

    /**
     * Constructs a new MSG_SEND_MAIL_CLLB.
     * @exports MSG_SEND_MAIL_CLLB
     * @classdesc Represents a MSG_SEND_MAIL_CLLB.
     * @implements IMSG_SEND_MAIL_CLLB
     * @constructor
     * @param {IMSG_SEND_MAIL_CLLB=} [properties] Properties to set
     */
    function MSG_SEND_MAIL_CLLB(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MSG_SEND_MAIL_CLLB msgID.
     * @member {number} msgID
     * @memberof MSG_SEND_MAIL_CLLB
     * @instance
     */
    MSG_SEND_MAIL_CLLB.prototype.msgID = 0;

    /**
     * MSG_SEND_MAIL_CLLB sendPID.
     * @member {number} sendPID
     * @memberof MSG_SEND_MAIL_CLLB
     * @instance
     */
    MSG_SEND_MAIL_CLLB.prototype.sendPID = 0;

    /**
     * MSG_SEND_MAIL_CLLB recvPID.
     * @member {number} recvPID
     * @memberof MSG_SEND_MAIL_CLLB
     * @instance
     */
    MSG_SEND_MAIL_CLLB.prototype.recvPID = 0;

    /**
     * MSG_SEND_MAIL_CLLB sendName.
     * @member {string} sendName
     * @memberof MSG_SEND_MAIL_CLLB
     * @instance
     */
    MSG_SEND_MAIL_CLLB.prototype.sendName = "";

    /**
     * MSG_SEND_MAIL_CLLB recvName.
     * @member {string} recvName
     * @memberof MSG_SEND_MAIL_CLLB
     * @instance
     */
    MSG_SEND_MAIL_CLLB.prototype.recvName = "";

    /**
     * MSG_SEND_MAIL_CLLB giftCoin.
     * @member {number} giftCoin
     * @memberof MSG_SEND_MAIL_CLLB
     * @instance
     */
    MSG_SEND_MAIL_CLLB.prototype.giftCoin = 0;

    /**
     * MSG_SEND_MAIL_CLLB content.
     * @member {string} content
     * @memberof MSG_SEND_MAIL_CLLB
     * @instance
     */
    MSG_SEND_MAIL_CLLB.prototype.content = "";

    /**
     * Creates a new MSG_SEND_MAIL_CLLB instance using the specified properties.
     * @function create
     * @memberof MSG_SEND_MAIL_CLLB
     * @static
     * @param {IMSG_SEND_MAIL_CLLB=} [properties] Properties to set
     * @returns {MSG_SEND_MAIL_CLLB} MSG_SEND_MAIL_CLLB instance
     */
    MSG_SEND_MAIL_CLLB.create = function create(properties) {
        return new MSG_SEND_MAIL_CLLB(properties);
    };

    /**
     * Encodes the specified MSG_SEND_MAIL_CLLB message. Does not implicitly {@link MSG_SEND_MAIL_CLLB.verify|verify} messages.
     * @function encode
     * @memberof MSG_SEND_MAIL_CLLB
     * @static
     * @param {IMSG_SEND_MAIL_CLLB} message MSG_SEND_MAIL_CLLB message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MSG_SEND_MAIL_CLLB.encode = function encode(message, writer) {
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
        return writer;
    };

    /**
     * Encodes the specified MSG_SEND_MAIL_CLLB message, length delimited. Does not implicitly {@link MSG_SEND_MAIL_CLLB.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MSG_SEND_MAIL_CLLB
     * @static
     * @param {IMSG_SEND_MAIL_CLLB} message MSG_SEND_MAIL_CLLB message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MSG_SEND_MAIL_CLLB.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MSG_SEND_MAIL_CLLB message from the specified reader or buffer.
     * @function decode
     * @memberof MSG_SEND_MAIL_CLLB
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MSG_SEND_MAIL_CLLB} MSG_SEND_MAIL_CLLB
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MSG_SEND_MAIL_CLLB.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MSG_SEND_MAIL_CLLB();
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
     * Decodes a MSG_SEND_MAIL_CLLB message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MSG_SEND_MAIL_CLLB
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MSG_SEND_MAIL_CLLB} MSG_SEND_MAIL_CLLB
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MSG_SEND_MAIL_CLLB.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MSG_SEND_MAIL_CLLB message.
     * @function verify
     * @memberof MSG_SEND_MAIL_CLLB
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MSG_SEND_MAIL_CLLB.verify = function verify(message) {
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
        return null;
    };

    /**
     * Creates a MSG_SEND_MAIL_CLLB message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MSG_SEND_MAIL_CLLB
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MSG_SEND_MAIL_CLLB} MSG_SEND_MAIL_CLLB
     */
    MSG_SEND_MAIL_CLLB.fromObject = function fromObject(object) {
        if (object instanceof $root.MSG_SEND_MAIL_CLLB)
            return object;
        var message = new $root.MSG_SEND_MAIL_CLLB();
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
        return message;
    };

    /**
     * Creates a plain object from a MSG_SEND_MAIL_CLLB message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MSG_SEND_MAIL_CLLB
     * @static
     * @param {MSG_SEND_MAIL_CLLB} message MSG_SEND_MAIL_CLLB
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MSG_SEND_MAIL_CLLB.toObject = function toObject(message, options) {
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
        return object;
    };

    /**
     * Converts this MSG_SEND_MAIL_CLLB to JSON.
     * @function toJSON
     * @memberof MSG_SEND_MAIL_CLLB
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MSG_SEND_MAIL_CLLB.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return MSG_SEND_MAIL_CLLB;
})();

module.exports = $root;
