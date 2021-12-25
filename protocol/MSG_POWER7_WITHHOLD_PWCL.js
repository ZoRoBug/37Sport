/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.MSG_POWER7_WITHHOLD_PWCL = (function() {

    /**
     * Properties of a MSG_POWER7_WITHHOLD_PWCL.
     * @exports IMSG_POWER7_WITHHOLD_PWCL
     * @interface IMSG_POWER7_WITHHOLD_PWCL
     * @property {number} msgID MSG_POWER7_WITHHOLD_PWCL msgID
     * @property {number|null} [rid] MSG_POWER7_WITHHOLD_PWCL rid
     * @property {number|null} [round] MSG_POWER7_WITHHOLD_PWCL round
     * @property {number|null} [pid] MSG_POWER7_WITHHOLD_PWCL pid
     * @property {number|null} [coin] MSG_POWER7_WITHHOLD_PWCL coin
     */

    /**
     * Constructs a new MSG_POWER7_WITHHOLD_PWCL.
     * @exports MSG_POWER7_WITHHOLD_PWCL
     * @classdesc Represents a MSG_POWER7_WITHHOLD_PWCL.
     * @implements IMSG_POWER7_WITHHOLD_PWCL
     * @constructor
     * @param {IMSG_POWER7_WITHHOLD_PWCL=} [properties] Properties to set
     */
    function MSG_POWER7_WITHHOLD_PWCL(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MSG_POWER7_WITHHOLD_PWCL msgID.
     * @member {number} msgID
     * @memberof MSG_POWER7_WITHHOLD_PWCL
     * @instance
     */
    MSG_POWER7_WITHHOLD_PWCL.prototype.msgID = 0;

    /**
     * MSG_POWER7_WITHHOLD_PWCL rid.
     * @member {number} rid
     * @memberof MSG_POWER7_WITHHOLD_PWCL
     * @instance
     */
    MSG_POWER7_WITHHOLD_PWCL.prototype.rid = 0;

    /**
     * MSG_POWER7_WITHHOLD_PWCL round.
     * @member {number} round
     * @memberof MSG_POWER7_WITHHOLD_PWCL
     * @instance
     */
    MSG_POWER7_WITHHOLD_PWCL.prototype.round = 0;

    /**
     * MSG_POWER7_WITHHOLD_PWCL pid.
     * @member {number} pid
     * @memberof MSG_POWER7_WITHHOLD_PWCL
     * @instance
     */
    MSG_POWER7_WITHHOLD_PWCL.prototype.pid = 0;

    /**
     * MSG_POWER7_WITHHOLD_PWCL coin.
     * @member {number} coin
     * @memberof MSG_POWER7_WITHHOLD_PWCL
     * @instance
     */
    MSG_POWER7_WITHHOLD_PWCL.prototype.coin = 0;

    /**
     * Creates a new MSG_POWER7_WITHHOLD_PWCL instance using the specified properties.
     * @function create
     * @memberof MSG_POWER7_WITHHOLD_PWCL
     * @static
     * @param {IMSG_POWER7_WITHHOLD_PWCL=} [properties] Properties to set
     * @returns {MSG_POWER7_WITHHOLD_PWCL} MSG_POWER7_WITHHOLD_PWCL instance
     */
    MSG_POWER7_WITHHOLD_PWCL.create = function create(properties) {
        return new MSG_POWER7_WITHHOLD_PWCL(properties);
    };

    /**
     * Encodes the specified MSG_POWER7_WITHHOLD_PWCL message. Does not implicitly {@link MSG_POWER7_WITHHOLD_PWCL.verify|verify} messages.
     * @function encode
     * @memberof MSG_POWER7_WITHHOLD_PWCL
     * @static
     * @param {IMSG_POWER7_WITHHOLD_PWCL} message MSG_POWER7_WITHHOLD_PWCL message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MSG_POWER7_WITHHOLD_PWCL.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.msgID);
        if (message.rid != null && message.hasOwnProperty("rid"))
            writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.rid);
        if (message.round != null && message.hasOwnProperty("round"))
            writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.round);
        if (message.pid != null && message.hasOwnProperty("pid"))
            writer.uint32(/* id 4, wireType 1 =*/33).double(message.pid);
        if (message.coin != null && message.hasOwnProperty("coin"))
            writer.uint32(/* id 5, wireType 1 =*/41).double(message.coin);
        return writer;
    };

    /**
     * Encodes the specified MSG_POWER7_WITHHOLD_PWCL message, length delimited. Does not implicitly {@link MSG_POWER7_WITHHOLD_PWCL.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MSG_POWER7_WITHHOLD_PWCL
     * @static
     * @param {IMSG_POWER7_WITHHOLD_PWCL} message MSG_POWER7_WITHHOLD_PWCL message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MSG_POWER7_WITHHOLD_PWCL.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MSG_POWER7_WITHHOLD_PWCL message from the specified reader or buffer.
     * @function decode
     * @memberof MSG_POWER7_WITHHOLD_PWCL
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MSG_POWER7_WITHHOLD_PWCL} MSG_POWER7_WITHHOLD_PWCL
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MSG_POWER7_WITHHOLD_PWCL.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MSG_POWER7_WITHHOLD_PWCL();
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
                message.round = reader.uint32();
                break;
            case 4:
                message.pid = reader.double();
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
     * Decodes a MSG_POWER7_WITHHOLD_PWCL message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MSG_POWER7_WITHHOLD_PWCL
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MSG_POWER7_WITHHOLD_PWCL} MSG_POWER7_WITHHOLD_PWCL
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MSG_POWER7_WITHHOLD_PWCL.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MSG_POWER7_WITHHOLD_PWCL message.
     * @function verify
     * @memberof MSG_POWER7_WITHHOLD_PWCL
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MSG_POWER7_WITHHOLD_PWCL.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.msgID))
            return "msgID: integer expected";
        if (message.rid != null && message.hasOwnProperty("rid"))
            if (!$util.isInteger(message.rid))
                return "rid: integer expected";
        if (message.round != null && message.hasOwnProperty("round"))
            if (!$util.isInteger(message.round))
                return "round: integer expected";
        if (message.pid != null && message.hasOwnProperty("pid"))
            if (typeof message.pid !== "number")
                return "pid: number expected";
        if (message.coin != null && message.hasOwnProperty("coin"))
            if (typeof message.coin !== "number")
                return "coin: number expected";
        return null;
    };

    /**
     * Creates a MSG_POWER7_WITHHOLD_PWCL message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MSG_POWER7_WITHHOLD_PWCL
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MSG_POWER7_WITHHOLD_PWCL} MSG_POWER7_WITHHOLD_PWCL
     */
    MSG_POWER7_WITHHOLD_PWCL.fromObject = function fromObject(object) {
        if (object instanceof $root.MSG_POWER7_WITHHOLD_PWCL)
            return object;
        var message = new $root.MSG_POWER7_WITHHOLD_PWCL();
        if (object.msgID != null)
            message.msgID = object.msgID >>> 0;
        if (object.rid != null)
            message.rid = object.rid >>> 0;
        if (object.round != null)
            message.round = object.round >>> 0;
        if (object.pid != null)
            message.pid = Number(object.pid);
        if (object.coin != null)
            message.coin = Number(object.coin);
        return message;
    };

    /**
     * Creates a plain object from a MSG_POWER7_WITHHOLD_PWCL message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MSG_POWER7_WITHHOLD_PWCL
     * @static
     * @param {MSG_POWER7_WITHHOLD_PWCL} message MSG_POWER7_WITHHOLD_PWCL
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MSG_POWER7_WITHHOLD_PWCL.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.msgID = 0;
            object.rid = 0;
            object.round = 0;
            object.pid = 0;
            object.coin = 0;
        }
        if (message.msgID != null && message.hasOwnProperty("msgID"))
            object.msgID = message.msgID;
        if (message.rid != null && message.hasOwnProperty("rid"))
            object.rid = message.rid;
        if (message.round != null && message.hasOwnProperty("round"))
            object.round = message.round;
        if (message.pid != null && message.hasOwnProperty("pid"))
            object.pid = options.json && !isFinite(message.pid) ? String(message.pid) : message.pid;
        if (message.coin != null && message.hasOwnProperty("coin"))
            object.coin = options.json && !isFinite(message.coin) ? String(message.coin) : message.coin;
        return object;
    };

    /**
     * Converts this MSG_POWER7_WITHHOLD_PWCL to JSON.
     * @function toJSON
     * @memberof MSG_POWER7_WITHHOLD_PWCL
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MSG_POWER7_WITHHOLD_PWCL.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return MSG_POWER7_WITHHOLD_PWCL;
})();

module.exports = $root;
