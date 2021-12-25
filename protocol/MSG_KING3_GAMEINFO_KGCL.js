/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.MSG_KING3_GAMEINFO_KGCL = (function() {

    /**
     * Properties of a MSG_KING3_GAMEINFO_KGCL.
     * @exports IMSG_KING3_GAMEINFO_KGCL
     * @interface IMSG_KING3_GAMEINFO_KGCL
     * @property {number} msgID MSG_KING3_GAMEINFO_KGCL msgID
     * @property {number|null} [rid] MSG_KING3_GAMEINFO_KGCL rid
     * @property {number|null} [betCoin] MSG_KING3_GAMEINFO_KGCL betCoin
     * @property {Array.<number>|null} [pidList] MSG_KING3_GAMEINFO_KGCL pidList
     * @property {number|null} [pid1] MSG_KING3_GAMEINFO_KGCL pid1
     * @property {number|null} [pid2] MSG_KING3_GAMEINFO_KGCL pid2
     * @property {string|null} [p1Head] MSG_KING3_GAMEINFO_KGCL p1Head
     * @property {string|null} [p2Head] MSG_KING3_GAMEINFO_KGCL p2Head
     * @property {string|null} [p1Nickname] MSG_KING3_GAMEINFO_KGCL p1Nickname
     * @property {string|null} [p2Nickname] MSG_KING3_GAMEINFO_KGCL p2Nickname
     */

    /**
     * Constructs a new MSG_KING3_GAMEINFO_KGCL.
     * @exports MSG_KING3_GAMEINFO_KGCL
     * @classdesc Represents a MSG_KING3_GAMEINFO_KGCL.
     * @implements IMSG_KING3_GAMEINFO_KGCL
     * @constructor
     * @param {IMSG_KING3_GAMEINFO_KGCL=} [properties] Properties to set
     */
    function MSG_KING3_GAMEINFO_KGCL(properties) {
        this.pidList = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MSG_KING3_GAMEINFO_KGCL msgID.
     * @member {number} msgID
     * @memberof MSG_KING3_GAMEINFO_KGCL
     * @instance
     */
    MSG_KING3_GAMEINFO_KGCL.prototype.msgID = 0;

    /**
     * MSG_KING3_GAMEINFO_KGCL rid.
     * @member {number} rid
     * @memberof MSG_KING3_GAMEINFO_KGCL
     * @instance
     */
    MSG_KING3_GAMEINFO_KGCL.prototype.rid = 0;

    /**
     * MSG_KING3_GAMEINFO_KGCL betCoin.
     * @member {number} betCoin
     * @memberof MSG_KING3_GAMEINFO_KGCL
     * @instance
     */
    MSG_KING3_GAMEINFO_KGCL.prototype.betCoin = 0;

    /**
     * MSG_KING3_GAMEINFO_KGCL pidList.
     * @member {Array.<number>} pidList
     * @memberof MSG_KING3_GAMEINFO_KGCL
     * @instance
     */
    MSG_KING3_GAMEINFO_KGCL.prototype.pidList = $util.emptyArray;

    /**
     * MSG_KING3_GAMEINFO_KGCL pid1.
     * @member {number} pid1
     * @memberof MSG_KING3_GAMEINFO_KGCL
     * @instance
     */
    MSG_KING3_GAMEINFO_KGCL.prototype.pid1 = 0;

    /**
     * MSG_KING3_GAMEINFO_KGCL pid2.
     * @member {number} pid2
     * @memberof MSG_KING3_GAMEINFO_KGCL
     * @instance
     */
    MSG_KING3_GAMEINFO_KGCL.prototype.pid2 = 0;

    /**
     * MSG_KING3_GAMEINFO_KGCL p1Head.
     * @member {string} p1Head
     * @memberof MSG_KING3_GAMEINFO_KGCL
     * @instance
     */
    MSG_KING3_GAMEINFO_KGCL.prototype.p1Head = "";

    /**
     * MSG_KING3_GAMEINFO_KGCL p2Head.
     * @member {string} p2Head
     * @memberof MSG_KING3_GAMEINFO_KGCL
     * @instance
     */
    MSG_KING3_GAMEINFO_KGCL.prototype.p2Head = "";

    /**
     * MSG_KING3_GAMEINFO_KGCL p1Nickname.
     * @member {string} p1Nickname
     * @memberof MSG_KING3_GAMEINFO_KGCL
     * @instance
     */
    MSG_KING3_GAMEINFO_KGCL.prototype.p1Nickname = "";

    /**
     * MSG_KING3_GAMEINFO_KGCL p2Nickname.
     * @member {string} p2Nickname
     * @memberof MSG_KING3_GAMEINFO_KGCL
     * @instance
     */
    MSG_KING3_GAMEINFO_KGCL.prototype.p2Nickname = "";

    /**
     * Creates a new MSG_KING3_GAMEINFO_KGCL instance using the specified properties.
     * @function create
     * @memberof MSG_KING3_GAMEINFO_KGCL
     * @static
     * @param {IMSG_KING3_GAMEINFO_KGCL=} [properties] Properties to set
     * @returns {MSG_KING3_GAMEINFO_KGCL} MSG_KING3_GAMEINFO_KGCL instance
     */
    MSG_KING3_GAMEINFO_KGCL.create = function create(properties) {
        return new MSG_KING3_GAMEINFO_KGCL(properties);
    };

    /**
     * Encodes the specified MSG_KING3_GAMEINFO_KGCL message. Does not implicitly {@link MSG_KING3_GAMEINFO_KGCL.verify|verify} messages.
     * @function encode
     * @memberof MSG_KING3_GAMEINFO_KGCL
     * @static
     * @param {IMSG_KING3_GAMEINFO_KGCL} message MSG_KING3_GAMEINFO_KGCL message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MSG_KING3_GAMEINFO_KGCL.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.msgID);
        if (message.rid != null && message.hasOwnProperty("rid"))
            writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.rid);
        if (message.betCoin != null && message.hasOwnProperty("betCoin"))
            writer.uint32(/* id 3, wireType 1 =*/25).double(message.betCoin);
        if (message.pidList != null && message.pidList.length)
            for (var i = 0; i < message.pidList.length; ++i)
                writer.uint32(/* id 4, wireType 1 =*/33).double(message.pidList[i]);
        if (message.pid1 != null && message.hasOwnProperty("pid1"))
            writer.uint32(/* id 5, wireType 1 =*/41).double(message.pid1);
        if (message.pid2 != null && message.hasOwnProperty("pid2"))
            writer.uint32(/* id 6, wireType 1 =*/49).double(message.pid2);
        if (message.p1Head != null && message.hasOwnProperty("p1Head"))
            writer.uint32(/* id 7, wireType 2 =*/58).string(message.p1Head);
        if (message.p2Head != null && message.hasOwnProperty("p2Head"))
            writer.uint32(/* id 8, wireType 2 =*/66).string(message.p2Head);
        if (message.p1Nickname != null && message.hasOwnProperty("p1Nickname"))
            writer.uint32(/* id 9, wireType 2 =*/74).string(message.p1Nickname);
        if (message.p2Nickname != null && message.hasOwnProperty("p2Nickname"))
            writer.uint32(/* id 10, wireType 2 =*/82).string(message.p2Nickname);
        return writer;
    };

    /**
     * Encodes the specified MSG_KING3_GAMEINFO_KGCL message, length delimited. Does not implicitly {@link MSG_KING3_GAMEINFO_KGCL.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MSG_KING3_GAMEINFO_KGCL
     * @static
     * @param {IMSG_KING3_GAMEINFO_KGCL} message MSG_KING3_GAMEINFO_KGCL message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MSG_KING3_GAMEINFO_KGCL.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MSG_KING3_GAMEINFO_KGCL message from the specified reader or buffer.
     * @function decode
     * @memberof MSG_KING3_GAMEINFO_KGCL
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MSG_KING3_GAMEINFO_KGCL} MSG_KING3_GAMEINFO_KGCL
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MSG_KING3_GAMEINFO_KGCL.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MSG_KING3_GAMEINFO_KGCL();
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
                message.betCoin = reader.double();
                break;
            case 4:
                if (!(message.pidList && message.pidList.length))
                    message.pidList = [];
                if ((tag & 7) === 2) {
                    var end2 = reader.uint32() + reader.pos;
                    while (reader.pos < end2)
                        message.pidList.push(reader.double());
                } else
                    message.pidList.push(reader.double());
                break;
            case 5:
                message.pid1 = reader.double();
                break;
            case 6:
                message.pid2 = reader.double();
                break;
            case 7:
                message.p1Head = reader.string();
                break;
            case 8:
                message.p2Head = reader.string();
                break;
            case 9:
                message.p1Nickname = reader.string();
                break;
            case 10:
                message.p2Nickname = reader.string();
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
     * Decodes a MSG_KING3_GAMEINFO_KGCL message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MSG_KING3_GAMEINFO_KGCL
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MSG_KING3_GAMEINFO_KGCL} MSG_KING3_GAMEINFO_KGCL
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MSG_KING3_GAMEINFO_KGCL.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MSG_KING3_GAMEINFO_KGCL message.
     * @function verify
     * @memberof MSG_KING3_GAMEINFO_KGCL
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MSG_KING3_GAMEINFO_KGCL.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.msgID))
            return "msgID: integer expected";
        if (message.rid != null && message.hasOwnProperty("rid"))
            if (!$util.isInteger(message.rid))
                return "rid: integer expected";
        if (message.betCoin != null && message.hasOwnProperty("betCoin"))
            if (typeof message.betCoin !== "number")
                return "betCoin: number expected";
        if (message.pidList != null && message.hasOwnProperty("pidList")) {
            if (!Array.isArray(message.pidList))
                return "pidList: array expected";
            for (var i = 0; i < message.pidList.length; ++i)
                if (typeof message.pidList[i] !== "number")
                    return "pidList: number[] expected";
        }
        if (message.pid1 != null && message.hasOwnProperty("pid1"))
            if (typeof message.pid1 !== "number")
                return "pid1: number expected";
        if (message.pid2 != null && message.hasOwnProperty("pid2"))
            if (typeof message.pid2 !== "number")
                return "pid2: number expected";
        if (message.p1Head != null && message.hasOwnProperty("p1Head"))
            if (!$util.isString(message.p1Head))
                return "p1Head: string expected";
        if (message.p2Head != null && message.hasOwnProperty("p2Head"))
            if (!$util.isString(message.p2Head))
                return "p2Head: string expected";
        if (message.p1Nickname != null && message.hasOwnProperty("p1Nickname"))
            if (!$util.isString(message.p1Nickname))
                return "p1Nickname: string expected";
        if (message.p2Nickname != null && message.hasOwnProperty("p2Nickname"))
            if (!$util.isString(message.p2Nickname))
                return "p2Nickname: string expected";
        return null;
    };

    /**
     * Creates a MSG_KING3_GAMEINFO_KGCL message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MSG_KING3_GAMEINFO_KGCL
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MSG_KING3_GAMEINFO_KGCL} MSG_KING3_GAMEINFO_KGCL
     */
    MSG_KING3_GAMEINFO_KGCL.fromObject = function fromObject(object) {
        if (object instanceof $root.MSG_KING3_GAMEINFO_KGCL)
            return object;
        var message = new $root.MSG_KING3_GAMEINFO_KGCL();
        if (object.msgID != null)
            message.msgID = object.msgID >>> 0;
        if (object.rid != null)
            message.rid = object.rid >>> 0;
        if (object.betCoin != null)
            message.betCoin = Number(object.betCoin);
        if (object.pidList) {
            if (!Array.isArray(object.pidList))
                throw TypeError(".MSG_KING3_GAMEINFO_KGCL.pidList: array expected");
            message.pidList = [];
            for (var i = 0; i < object.pidList.length; ++i)
                message.pidList[i] = Number(object.pidList[i]);
        }
        if (object.pid1 != null)
            message.pid1 = Number(object.pid1);
        if (object.pid2 != null)
            message.pid2 = Number(object.pid2);
        if (object.p1Head != null)
            message.p1Head = String(object.p1Head);
        if (object.p2Head != null)
            message.p2Head = String(object.p2Head);
        if (object.p1Nickname != null)
            message.p1Nickname = String(object.p1Nickname);
        if (object.p2Nickname != null)
            message.p2Nickname = String(object.p2Nickname);
        return message;
    };

    /**
     * Creates a plain object from a MSG_KING3_GAMEINFO_KGCL message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MSG_KING3_GAMEINFO_KGCL
     * @static
     * @param {MSG_KING3_GAMEINFO_KGCL} message MSG_KING3_GAMEINFO_KGCL
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MSG_KING3_GAMEINFO_KGCL.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.pidList = [];
        if (options.defaults) {
            object.msgID = 0;
            object.rid = 0;
            object.betCoin = 0;
            object.pid1 = 0;
            object.pid2 = 0;
            object.p1Head = "";
            object.p2Head = "";
            object.p1Nickname = "";
            object.p2Nickname = "";
        }
        if (message.msgID != null && message.hasOwnProperty("msgID"))
            object.msgID = message.msgID;
        if (message.rid != null && message.hasOwnProperty("rid"))
            object.rid = message.rid;
        if (message.betCoin != null && message.hasOwnProperty("betCoin"))
            object.betCoin = options.json && !isFinite(message.betCoin) ? String(message.betCoin) : message.betCoin;
        if (message.pidList && message.pidList.length) {
            object.pidList = [];
            for (var j = 0; j < message.pidList.length; ++j)
                object.pidList[j] = options.json && !isFinite(message.pidList[j]) ? String(message.pidList[j]) : message.pidList[j];
        }
        if (message.pid1 != null && message.hasOwnProperty("pid1"))
            object.pid1 = options.json && !isFinite(message.pid1) ? String(message.pid1) : message.pid1;
        if (message.pid2 != null && message.hasOwnProperty("pid2"))
            object.pid2 = options.json && !isFinite(message.pid2) ? String(message.pid2) : message.pid2;
        if (message.p1Head != null && message.hasOwnProperty("p1Head"))
            object.p1Head = message.p1Head;
        if (message.p2Head != null && message.hasOwnProperty("p2Head"))
            object.p2Head = message.p2Head;
        if (message.p1Nickname != null && message.hasOwnProperty("p1Nickname"))
            object.p1Nickname = message.p1Nickname;
        if (message.p2Nickname != null && message.hasOwnProperty("p2Nickname"))
            object.p2Nickname = message.p2Nickname;
        return object;
    };

    /**
     * Converts this MSG_KING3_GAMEINFO_KGCL to JSON.
     * @function toJSON
     * @memberof MSG_KING3_GAMEINFO_KGCL
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MSG_KING3_GAMEINFO_KGCL.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return MSG_KING3_GAMEINFO_KGCL;
})();

module.exports = $root;
