/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.MSG_KING3_LOGIN_CLKG = (function() {

    /**
     * Properties of a MSG_KING3_LOGIN_CLKG.
     * @exports IMSG_KING3_LOGIN_CLKG
     * @interface IMSG_KING3_LOGIN_CLKG
     * @property {number} msgID MSG_KING3_LOGIN_CLKG msgID
     * @property {number|null} [rid] MSG_KING3_LOGIN_CLKG rid
     * @property {number|null} [pid] MSG_KING3_LOGIN_CLKG pid
     * @property {number|null} [cost] MSG_KING3_LOGIN_CLKG cost
     * @property {number|null} [betCoin] MSG_KING3_LOGIN_CLKG betCoin
     * @property {string|null} [desc] MSG_KING3_LOGIN_CLKG desc
     * @property {string|null} [password] MSG_KING3_LOGIN_CLKG password
     */

    /**
     * Constructs a new MSG_KING3_LOGIN_CLKG.
     * @exports MSG_KING3_LOGIN_CLKG
     * @classdesc Represents a MSG_KING3_LOGIN_CLKG.
     * @implements IMSG_KING3_LOGIN_CLKG
     * @constructor
     * @param {IMSG_KING3_LOGIN_CLKG=} [properties] Properties to set
     */
    function MSG_KING3_LOGIN_CLKG(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MSG_KING3_LOGIN_CLKG msgID.
     * @member {number} msgID
     * @memberof MSG_KING3_LOGIN_CLKG
     * @instance
     */
    MSG_KING3_LOGIN_CLKG.prototype.msgID = 0;

    /**
     * MSG_KING3_LOGIN_CLKG rid.
     * @member {number} rid
     * @memberof MSG_KING3_LOGIN_CLKG
     * @instance
     */
    MSG_KING3_LOGIN_CLKG.prototype.rid = 0;

    /**
     * MSG_KING3_LOGIN_CLKG pid.
     * @member {number} pid
     * @memberof MSG_KING3_LOGIN_CLKG
     * @instance
     */
    MSG_KING3_LOGIN_CLKG.prototype.pid = 0;

    /**
     * MSG_KING3_LOGIN_CLKG cost.
     * @member {number} cost
     * @memberof MSG_KING3_LOGIN_CLKG
     * @instance
     */
    MSG_KING3_LOGIN_CLKG.prototype.cost = 0;

    /**
     * MSG_KING3_LOGIN_CLKG betCoin.
     * @member {number} betCoin
     * @memberof MSG_KING3_LOGIN_CLKG
     * @instance
     */
    MSG_KING3_LOGIN_CLKG.prototype.betCoin = 0;

    /**
     * MSG_KING3_LOGIN_CLKG desc.
     * @member {string} desc
     * @memberof MSG_KING3_LOGIN_CLKG
     * @instance
     */
    MSG_KING3_LOGIN_CLKG.prototype.desc = "";

    /**
     * MSG_KING3_LOGIN_CLKG password.
     * @member {string} password
     * @memberof MSG_KING3_LOGIN_CLKG
     * @instance
     */
    MSG_KING3_LOGIN_CLKG.prototype.password = "";

    /**
     * Creates a new MSG_KING3_LOGIN_CLKG instance using the specified properties.
     * @function create
     * @memberof MSG_KING3_LOGIN_CLKG
     * @static
     * @param {IMSG_KING3_LOGIN_CLKG=} [properties] Properties to set
     * @returns {MSG_KING3_LOGIN_CLKG} MSG_KING3_LOGIN_CLKG instance
     */
    MSG_KING3_LOGIN_CLKG.create = function create(properties) {
        return new MSG_KING3_LOGIN_CLKG(properties);
    };

    /**
     * Encodes the specified MSG_KING3_LOGIN_CLKG message. Does not implicitly {@link MSG_KING3_LOGIN_CLKG.verify|verify} messages.
     * @function encode
     * @memberof MSG_KING3_LOGIN_CLKG
     * @static
     * @param {IMSG_KING3_LOGIN_CLKG} message MSG_KING3_LOGIN_CLKG message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MSG_KING3_LOGIN_CLKG.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.msgID);
        if (message.rid != null && message.hasOwnProperty("rid"))
            writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.rid);
        if (message.pid != null && message.hasOwnProperty("pid"))
            writer.uint32(/* id 3, wireType 1 =*/25).double(message.pid);
        if (message.cost != null && message.hasOwnProperty("cost"))
            writer.uint32(/* id 4, wireType 1 =*/33).double(message.cost);
        if (message.betCoin != null && message.hasOwnProperty("betCoin"))
            writer.uint32(/* id 5, wireType 1 =*/41).double(message.betCoin);
        if (message.desc != null && message.hasOwnProperty("desc"))
            writer.uint32(/* id 6, wireType 2 =*/50).string(message.desc);
        if (message.password != null && message.hasOwnProperty("password"))
            writer.uint32(/* id 7, wireType 2 =*/58).string(message.password);
        return writer;
    };

    /**
     * Encodes the specified MSG_KING3_LOGIN_CLKG message, length delimited. Does not implicitly {@link MSG_KING3_LOGIN_CLKG.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MSG_KING3_LOGIN_CLKG
     * @static
     * @param {IMSG_KING3_LOGIN_CLKG} message MSG_KING3_LOGIN_CLKG message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MSG_KING3_LOGIN_CLKG.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MSG_KING3_LOGIN_CLKG message from the specified reader or buffer.
     * @function decode
     * @memberof MSG_KING3_LOGIN_CLKG
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MSG_KING3_LOGIN_CLKG} MSG_KING3_LOGIN_CLKG
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MSG_KING3_LOGIN_CLKG.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MSG_KING3_LOGIN_CLKG();
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
                message.betCoin = reader.double();
                break;
            case 6:
                message.desc = reader.string();
                break;
            case 7:
                message.password = reader.string();
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
     * Decodes a MSG_KING3_LOGIN_CLKG message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MSG_KING3_LOGIN_CLKG
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MSG_KING3_LOGIN_CLKG} MSG_KING3_LOGIN_CLKG
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MSG_KING3_LOGIN_CLKG.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MSG_KING3_LOGIN_CLKG message.
     * @function verify
     * @memberof MSG_KING3_LOGIN_CLKG
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MSG_KING3_LOGIN_CLKG.verify = function verify(message) {
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
        if (message.betCoin != null && message.hasOwnProperty("betCoin"))
            if (typeof message.betCoin !== "number")
                return "betCoin: number expected";
        if (message.desc != null && message.hasOwnProperty("desc"))
            if (!$util.isString(message.desc))
                return "desc: string expected";
        if (message.password != null && message.hasOwnProperty("password"))
            if (!$util.isString(message.password))
                return "password: string expected";
        return null;
    };

    /**
     * Creates a MSG_KING3_LOGIN_CLKG message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MSG_KING3_LOGIN_CLKG
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MSG_KING3_LOGIN_CLKG} MSG_KING3_LOGIN_CLKG
     */
    MSG_KING3_LOGIN_CLKG.fromObject = function fromObject(object) {
        if (object instanceof $root.MSG_KING3_LOGIN_CLKG)
            return object;
        var message = new $root.MSG_KING3_LOGIN_CLKG();
        if (object.msgID != null)
            message.msgID = object.msgID >>> 0;
        if (object.rid != null)
            message.rid = object.rid >>> 0;
        if (object.pid != null)
            message.pid = Number(object.pid);
        if (object.cost != null)
            message.cost = Number(object.cost);
        if (object.betCoin != null)
            message.betCoin = Number(object.betCoin);
        if (object.desc != null)
            message.desc = String(object.desc);
        if (object.password != null)
            message.password = String(object.password);
        return message;
    };

    /**
     * Creates a plain object from a MSG_KING3_LOGIN_CLKG message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MSG_KING3_LOGIN_CLKG
     * @static
     * @param {MSG_KING3_LOGIN_CLKG} message MSG_KING3_LOGIN_CLKG
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MSG_KING3_LOGIN_CLKG.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.msgID = 0;
            object.rid = 0;
            object.pid = 0;
            object.cost = 0;
            object.betCoin = 0;
            object.desc = "";
            object.password = "";
        }
        if (message.msgID != null && message.hasOwnProperty("msgID"))
            object.msgID = message.msgID;
        if (message.rid != null && message.hasOwnProperty("rid"))
            object.rid = message.rid;
        if (message.pid != null && message.hasOwnProperty("pid"))
            object.pid = options.json && !isFinite(message.pid) ? String(message.pid) : message.pid;
        if (message.cost != null && message.hasOwnProperty("cost"))
            object.cost = options.json && !isFinite(message.cost) ? String(message.cost) : message.cost;
        if (message.betCoin != null && message.hasOwnProperty("betCoin"))
            object.betCoin = options.json && !isFinite(message.betCoin) ? String(message.betCoin) : message.betCoin;
        if (message.desc != null && message.hasOwnProperty("desc"))
            object.desc = message.desc;
        if (message.password != null && message.hasOwnProperty("password"))
            object.password = message.password;
        return object;
    };

    /**
     * Converts this MSG_KING3_LOGIN_CLKG to JSON.
     * @function toJSON
     * @memberof MSG_KING3_LOGIN_CLKG
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MSG_KING3_LOGIN_CLKG.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return MSG_KING3_LOGIN_CLKG;
})();

module.exports = $root;
