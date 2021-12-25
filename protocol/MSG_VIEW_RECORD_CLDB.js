/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.MSG_VIEW_RECORD_CLDB = (function() {

    /**
     * Properties of a MSG_VIEW_RECORD_CLDB.
     * @exports IMSG_VIEW_RECORD_CLDB
     * @interface IMSG_VIEW_RECORD_CLDB
     * @property {number} msgID MSG_VIEW_RECORD_CLDB msgID
     * @property {number|null} [pid] MSG_VIEW_RECORD_CLDB pid
     * @property {number|null} [cost] MSG_VIEW_RECORD_CLDB cost
     * @property {string|null} [beginTime] MSG_VIEW_RECORD_CLDB beginTime
     * @property {string|null} [endTime] MSG_VIEW_RECORD_CLDB endTime
     */

    /**
     * Constructs a new MSG_VIEW_RECORD_CLDB.
     * @exports MSG_VIEW_RECORD_CLDB
     * @classdesc Represents a MSG_VIEW_RECORD_CLDB.
     * @implements IMSG_VIEW_RECORD_CLDB
     * @constructor
     * @param {IMSG_VIEW_RECORD_CLDB=} [properties] Properties to set
     */
    function MSG_VIEW_RECORD_CLDB(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MSG_VIEW_RECORD_CLDB msgID.
     * @member {number} msgID
     * @memberof MSG_VIEW_RECORD_CLDB
     * @instance
     */
    MSG_VIEW_RECORD_CLDB.prototype.msgID = 0;

    /**
     * MSG_VIEW_RECORD_CLDB pid.
     * @member {number} pid
     * @memberof MSG_VIEW_RECORD_CLDB
     * @instance
     */
    MSG_VIEW_RECORD_CLDB.prototype.pid = 0;

    /**
     * MSG_VIEW_RECORD_CLDB cost.
     * @member {number} cost
     * @memberof MSG_VIEW_RECORD_CLDB
     * @instance
     */
    MSG_VIEW_RECORD_CLDB.prototype.cost = 0;

    /**
     * MSG_VIEW_RECORD_CLDB beginTime.
     * @member {string} beginTime
     * @memberof MSG_VIEW_RECORD_CLDB
     * @instance
     */
    MSG_VIEW_RECORD_CLDB.prototype.beginTime = "";

    /**
     * MSG_VIEW_RECORD_CLDB endTime.
     * @member {string} endTime
     * @memberof MSG_VIEW_RECORD_CLDB
     * @instance
     */
    MSG_VIEW_RECORD_CLDB.prototype.endTime = "";

    /**
     * Creates a new MSG_VIEW_RECORD_CLDB instance using the specified properties.
     * @function create
     * @memberof MSG_VIEW_RECORD_CLDB
     * @static
     * @param {IMSG_VIEW_RECORD_CLDB=} [properties] Properties to set
     * @returns {MSG_VIEW_RECORD_CLDB} MSG_VIEW_RECORD_CLDB instance
     */
    MSG_VIEW_RECORD_CLDB.create = function create(properties) {
        return new MSG_VIEW_RECORD_CLDB(properties);
    };

    /**
     * Encodes the specified MSG_VIEW_RECORD_CLDB message. Does not implicitly {@link MSG_VIEW_RECORD_CLDB.verify|verify} messages.
     * @function encode
     * @memberof MSG_VIEW_RECORD_CLDB
     * @static
     * @param {IMSG_VIEW_RECORD_CLDB} message MSG_VIEW_RECORD_CLDB message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MSG_VIEW_RECORD_CLDB.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.msgID);
        if (message.pid != null && message.hasOwnProperty("pid"))
            writer.uint32(/* id 2, wireType 1 =*/17).double(message.pid);
        if (message.cost != null && message.hasOwnProperty("cost"))
            writer.uint32(/* id 3, wireType 1 =*/25).double(message.cost);
        if (message.beginTime != null && message.hasOwnProperty("beginTime"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.beginTime);
        if (message.endTime != null && message.hasOwnProperty("endTime"))
            writer.uint32(/* id 5, wireType 2 =*/42).string(message.endTime);
        return writer;
    };

    /**
     * Encodes the specified MSG_VIEW_RECORD_CLDB message, length delimited. Does not implicitly {@link MSG_VIEW_RECORD_CLDB.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MSG_VIEW_RECORD_CLDB
     * @static
     * @param {IMSG_VIEW_RECORD_CLDB} message MSG_VIEW_RECORD_CLDB message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MSG_VIEW_RECORD_CLDB.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MSG_VIEW_RECORD_CLDB message from the specified reader or buffer.
     * @function decode
     * @memberof MSG_VIEW_RECORD_CLDB
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MSG_VIEW_RECORD_CLDB} MSG_VIEW_RECORD_CLDB
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MSG_VIEW_RECORD_CLDB.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MSG_VIEW_RECORD_CLDB();
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
                message.cost = reader.double();
                break;
            case 4:
                message.beginTime = reader.string();
                break;
            case 5:
                message.endTime = reader.string();
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
     * Decodes a MSG_VIEW_RECORD_CLDB message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MSG_VIEW_RECORD_CLDB
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MSG_VIEW_RECORD_CLDB} MSG_VIEW_RECORD_CLDB
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MSG_VIEW_RECORD_CLDB.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MSG_VIEW_RECORD_CLDB message.
     * @function verify
     * @memberof MSG_VIEW_RECORD_CLDB
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MSG_VIEW_RECORD_CLDB.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.msgID))
            return "msgID: integer expected";
        if (message.pid != null && message.hasOwnProperty("pid"))
            if (typeof message.pid !== "number")
                return "pid: number expected";
        if (message.cost != null && message.hasOwnProperty("cost"))
            if (typeof message.cost !== "number")
                return "cost: number expected";
        if (message.beginTime != null && message.hasOwnProperty("beginTime"))
            if (!$util.isString(message.beginTime))
                return "beginTime: string expected";
        if (message.endTime != null && message.hasOwnProperty("endTime"))
            if (!$util.isString(message.endTime))
                return "endTime: string expected";
        return null;
    };

    /**
     * Creates a MSG_VIEW_RECORD_CLDB message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MSG_VIEW_RECORD_CLDB
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MSG_VIEW_RECORD_CLDB} MSG_VIEW_RECORD_CLDB
     */
    MSG_VIEW_RECORD_CLDB.fromObject = function fromObject(object) {
        if (object instanceof $root.MSG_VIEW_RECORD_CLDB)
            return object;
        var message = new $root.MSG_VIEW_RECORD_CLDB();
        if (object.msgID != null)
            message.msgID = object.msgID >>> 0;
        if (object.pid != null)
            message.pid = Number(object.pid);
        if (object.cost != null)
            message.cost = Number(object.cost);
        if (object.beginTime != null)
            message.beginTime = String(object.beginTime);
        if (object.endTime != null)
            message.endTime = String(object.endTime);
        return message;
    };

    /**
     * Creates a plain object from a MSG_VIEW_RECORD_CLDB message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MSG_VIEW_RECORD_CLDB
     * @static
     * @param {MSG_VIEW_RECORD_CLDB} message MSG_VIEW_RECORD_CLDB
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MSG_VIEW_RECORD_CLDB.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.msgID = 0;
            object.pid = 0;
            object.cost = 0;
            object.beginTime = "";
            object.endTime = "";
        }
        if (message.msgID != null && message.hasOwnProperty("msgID"))
            object.msgID = message.msgID;
        if (message.pid != null && message.hasOwnProperty("pid"))
            object.pid = options.json && !isFinite(message.pid) ? String(message.pid) : message.pid;
        if (message.cost != null && message.hasOwnProperty("cost"))
            object.cost = options.json && !isFinite(message.cost) ? String(message.cost) : message.cost;
        if (message.beginTime != null && message.hasOwnProperty("beginTime"))
            object.beginTime = message.beginTime;
        if (message.endTime != null && message.hasOwnProperty("endTime"))
            object.endTime = message.endTime;
        return object;
    };

    /**
     * Converts this MSG_VIEW_RECORD_CLDB to JSON.
     * @function toJSON
     * @memberof MSG_VIEW_RECORD_CLDB
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MSG_VIEW_RECORD_CLDB.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return MSG_VIEW_RECORD_CLDB;
})();

module.exports = $root;
