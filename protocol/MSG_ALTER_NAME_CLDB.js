/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.MSG_ALTER_NAME_CLDB = (function() {

    /**
     * Properties of a MSG_ALTER_NAME_CLDB.
     * @exports IMSG_ALTER_NAME_CLDB
     * @interface IMSG_ALTER_NAME_CLDB
     * @property {number} msgID MSG_ALTER_NAME_CLDB msgID
     * @property {number|null} [pid] MSG_ALTER_NAME_CLDB pid
     * @property {string|null} [newName] MSG_ALTER_NAME_CLDB newName
     * @property {number|null} [cost] MSG_ALTER_NAME_CLDB cost
     * @property {number|null} [coin] MSG_ALTER_NAME_CLDB coin
     */

    /**
     * Constructs a new MSG_ALTER_NAME_CLDB.
     * @exports MSG_ALTER_NAME_CLDB
     * @classdesc Represents a MSG_ALTER_NAME_CLDB.
     * @implements IMSG_ALTER_NAME_CLDB
     * @constructor
     * @param {IMSG_ALTER_NAME_CLDB=} [properties] Properties to set
     */
    function MSG_ALTER_NAME_CLDB(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MSG_ALTER_NAME_CLDB msgID.
     * @member {number} msgID
     * @memberof MSG_ALTER_NAME_CLDB
     * @instance
     */
    MSG_ALTER_NAME_CLDB.prototype.msgID = 0;

    /**
     * MSG_ALTER_NAME_CLDB pid.
     * @member {number} pid
     * @memberof MSG_ALTER_NAME_CLDB
     * @instance
     */
    MSG_ALTER_NAME_CLDB.prototype.pid = 0;

    /**
     * MSG_ALTER_NAME_CLDB newName.
     * @member {string} newName
     * @memberof MSG_ALTER_NAME_CLDB
     * @instance
     */
    MSG_ALTER_NAME_CLDB.prototype.newName = "";

    /**
     * MSG_ALTER_NAME_CLDB cost.
     * @member {number} cost
     * @memberof MSG_ALTER_NAME_CLDB
     * @instance
     */
    MSG_ALTER_NAME_CLDB.prototype.cost = 0;

    /**
     * MSG_ALTER_NAME_CLDB coin.
     * @member {number} coin
     * @memberof MSG_ALTER_NAME_CLDB
     * @instance
     */
    MSG_ALTER_NAME_CLDB.prototype.coin = 0;

    /**
     * Creates a new MSG_ALTER_NAME_CLDB instance using the specified properties.
     * @function create
     * @memberof MSG_ALTER_NAME_CLDB
     * @static
     * @param {IMSG_ALTER_NAME_CLDB=} [properties] Properties to set
     * @returns {MSG_ALTER_NAME_CLDB} MSG_ALTER_NAME_CLDB instance
     */
    MSG_ALTER_NAME_CLDB.create = function create(properties) {
        return new MSG_ALTER_NAME_CLDB(properties);
    };

    /**
     * Encodes the specified MSG_ALTER_NAME_CLDB message. Does not implicitly {@link MSG_ALTER_NAME_CLDB.verify|verify} messages.
     * @function encode
     * @memberof MSG_ALTER_NAME_CLDB
     * @static
     * @param {IMSG_ALTER_NAME_CLDB} message MSG_ALTER_NAME_CLDB message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MSG_ALTER_NAME_CLDB.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.msgID);
        if (message.pid != null && message.hasOwnProperty("pid"))
            writer.uint32(/* id 2, wireType 1 =*/17).double(message.pid);
        if (message.newName != null && message.hasOwnProperty("newName"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.newName);
        if (message.cost != null && message.hasOwnProperty("cost"))
            writer.uint32(/* id 4, wireType 1 =*/33).double(message.cost);
        if (message.coin != null && message.hasOwnProperty("coin"))
            writer.uint32(/* id 5, wireType 1 =*/41).double(message.coin);
        return writer;
    };

    /**
     * Encodes the specified MSG_ALTER_NAME_CLDB message, length delimited. Does not implicitly {@link MSG_ALTER_NAME_CLDB.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MSG_ALTER_NAME_CLDB
     * @static
     * @param {IMSG_ALTER_NAME_CLDB} message MSG_ALTER_NAME_CLDB message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MSG_ALTER_NAME_CLDB.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MSG_ALTER_NAME_CLDB message from the specified reader or buffer.
     * @function decode
     * @memberof MSG_ALTER_NAME_CLDB
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MSG_ALTER_NAME_CLDB} MSG_ALTER_NAME_CLDB
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MSG_ALTER_NAME_CLDB.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MSG_ALTER_NAME_CLDB();
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
                message.coin = reader.double();
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
     * Decodes a MSG_ALTER_NAME_CLDB message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MSG_ALTER_NAME_CLDB
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MSG_ALTER_NAME_CLDB} MSG_ALTER_NAME_CLDB
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MSG_ALTER_NAME_CLDB.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MSG_ALTER_NAME_CLDB message.
     * @function verify
     * @memberof MSG_ALTER_NAME_CLDB
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MSG_ALTER_NAME_CLDB.verify = function verify(message) {
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
        if (message.coin != null && message.hasOwnProperty("coin"))
            if (typeof message.coin !== "number")
                return "coin: number expected";
        return null;
    };

    /**
     * Creates a MSG_ALTER_NAME_CLDB message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MSG_ALTER_NAME_CLDB
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MSG_ALTER_NAME_CLDB} MSG_ALTER_NAME_CLDB
     */
    MSG_ALTER_NAME_CLDB.fromObject = function fromObject(object) {
        if (object instanceof $root.MSG_ALTER_NAME_CLDB)
            return object;
        var message = new $root.MSG_ALTER_NAME_CLDB();
        if (object.msgID != null)
            message.msgID = object.msgID >>> 0;
        if (object.pid != null)
            message.pid = Number(object.pid);
        if (object.newName != null)
            message.newName = String(object.newName);
        if (object.cost != null)
            message.cost = Number(object.cost);
        if (object.coin != null)
            message.coin = Number(object.coin);
        return message;
    };

    /**
     * Creates a plain object from a MSG_ALTER_NAME_CLDB message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MSG_ALTER_NAME_CLDB
     * @static
     * @param {MSG_ALTER_NAME_CLDB} message MSG_ALTER_NAME_CLDB
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MSG_ALTER_NAME_CLDB.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.msgID = 0;
            object.pid = 0;
            object.newName = "";
            object.cost = 0;
            object.coin = 0;
        }
        if (message.msgID != null && message.hasOwnProperty("msgID"))
            object.msgID = message.msgID;
        if (message.pid != null && message.hasOwnProperty("pid"))
            object.pid = options.json && !isFinite(message.pid) ? String(message.pid) : message.pid;
        if (message.newName != null && message.hasOwnProperty("newName"))
            object.newName = message.newName;
        if (message.cost != null && message.hasOwnProperty("cost"))
            object.cost = options.json && !isFinite(message.cost) ? String(message.cost) : message.cost;
        if (message.coin != null && message.hasOwnProperty("coin"))
            object.coin = options.json && !isFinite(message.coin) ? String(message.coin) : message.coin;
        return object;
    };

    /**
     * Converts this MSG_ALTER_NAME_CLDB to JSON.
     * @function toJSON
     * @memberof MSG_ALTER_NAME_CLDB
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MSG_ALTER_NAME_CLDB.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return MSG_ALTER_NAME_CLDB;
})();

module.exports = $root;
