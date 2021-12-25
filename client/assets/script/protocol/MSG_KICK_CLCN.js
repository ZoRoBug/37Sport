/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = protobuf;

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.MSG_KICK_CLCN = (function() {

    /**
     * Properties of a MSG_KICK_CLCN.
     * @exports IMSG_KICK_CLCN
     * @interface IMSG_KICK_CLCN
     * @property {number} msgID MSG_KICK_CLCN msgID
     * @property {number|null} [pid] MSG_KICK_CLCN pid
     * @property {number|null} [timeSec] MSG_KICK_CLCN timeSec
     * @property {string|null} [nickname] MSG_KICK_CLCN nickname
     */

    /**
     * Constructs a new MSG_KICK_CLCN.
     * @exports MSG_KICK_CLCN
     * @classdesc Represents a MSG_KICK_CLCN.
     * @implements IMSG_KICK_CLCN
     * @constructor
     * @param {IMSG_KICK_CLCN=} [properties] Properties to set
     */
    function MSG_KICK_CLCN(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MSG_KICK_CLCN msgID.
     * @member {number} msgID
     * @memberof MSG_KICK_CLCN
     * @instance
     */
    MSG_KICK_CLCN.prototype.msgID = 0;

    /**
     * MSG_KICK_CLCN pid.
     * @member {number} pid
     * @memberof MSG_KICK_CLCN
     * @instance
     */
    MSG_KICK_CLCN.prototype.pid = 0;

    /**
     * MSG_KICK_CLCN timeSec.
     * @member {number} timeSec
     * @memberof MSG_KICK_CLCN
     * @instance
     */
    MSG_KICK_CLCN.prototype.timeSec = 0;

    /**
     * MSG_KICK_CLCN nickname.
     * @member {string} nickname
     * @memberof MSG_KICK_CLCN
     * @instance
     */
    MSG_KICK_CLCN.prototype.nickname = "";

    /**
     * Creates a new MSG_KICK_CLCN instance using the specified properties.
     * @function create
     * @memberof MSG_KICK_CLCN
     * @static
     * @param {IMSG_KICK_CLCN=} [properties] Properties to set
     * @returns {MSG_KICK_CLCN} MSG_KICK_CLCN instance
     */
    MSG_KICK_CLCN.create = function create(properties) {
        return new MSG_KICK_CLCN(properties);
    };

    /**
     * Encodes the specified MSG_KICK_CLCN message. Does not implicitly {@link MSG_KICK_CLCN.verify|verify} messages.
     * @function encode
     * @memberof MSG_KICK_CLCN
     * @static
     * @param {IMSG_KICK_CLCN} message MSG_KICK_CLCN message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MSG_KICK_CLCN.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.msgID);
        if (message.pid != null && message.hasOwnProperty("pid"))
            writer.uint32(/* id 2, wireType 1 =*/17).double(message.pid);
        if (message.timeSec != null && message.hasOwnProperty("timeSec"))
            writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.timeSec);
        if (message.nickname != null && message.hasOwnProperty("nickname"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.nickname);
        return writer;
    };

    /**
     * Encodes the specified MSG_KICK_CLCN message, length delimited. Does not implicitly {@link MSG_KICK_CLCN.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MSG_KICK_CLCN
     * @static
     * @param {IMSG_KICK_CLCN} message MSG_KICK_CLCN message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MSG_KICK_CLCN.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MSG_KICK_CLCN message from the specified reader or buffer.
     * @function decode
     * @memberof MSG_KICK_CLCN
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MSG_KICK_CLCN} MSG_KICK_CLCN
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MSG_KICK_CLCN.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MSG_KICK_CLCN();
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
                message.timeSec = reader.uint32();
                break;
            case 4:
                message.nickname = reader.string();
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
     * Decodes a MSG_KICK_CLCN message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MSG_KICK_CLCN
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MSG_KICK_CLCN} MSG_KICK_CLCN
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MSG_KICK_CLCN.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MSG_KICK_CLCN message.
     * @function verify
     * @memberof MSG_KICK_CLCN
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MSG_KICK_CLCN.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.msgID))
            return "msgID: integer expected";
        if (message.pid != null && message.hasOwnProperty("pid"))
            if (typeof message.pid !== "number")
                return "pid: number expected";
        if (message.timeSec != null && message.hasOwnProperty("timeSec"))
            if (!$util.isInteger(message.timeSec))
                return "timeSec: integer expected";
        if (message.nickname != null && message.hasOwnProperty("nickname"))
            if (!$util.isString(message.nickname))
                return "nickname: string expected";
        return null;
    };

    /**
     * Creates a MSG_KICK_CLCN message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MSG_KICK_CLCN
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MSG_KICK_CLCN} MSG_KICK_CLCN
     */
    MSG_KICK_CLCN.fromObject = function fromObject(object) {
        if (object instanceof $root.MSG_KICK_CLCN)
            return object;
        var message = new $root.MSG_KICK_CLCN();
        if (object.msgID != null)
            message.msgID = object.msgID >>> 0;
        if (object.pid != null)
            message.pid = Number(object.pid);
        if (object.timeSec != null)
            message.timeSec = object.timeSec >>> 0;
        if (object.nickname != null)
            message.nickname = String(object.nickname);
        return message;
    };

    /**
     * Creates a plain object from a MSG_KICK_CLCN message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MSG_KICK_CLCN
     * @static
     * @param {MSG_KICK_CLCN} message MSG_KICK_CLCN
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MSG_KICK_CLCN.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.msgID = 0;
            object.pid = 0;
            object.timeSec = 0;
            object.nickname = "";
        }
        if (message.msgID != null && message.hasOwnProperty("msgID"))
            object.msgID = message.msgID;
        if (message.pid != null && message.hasOwnProperty("pid"))
            object.pid = options.json && !isFinite(message.pid) ? String(message.pid) : message.pid;
        if (message.timeSec != null && message.hasOwnProperty("timeSec"))
            object.timeSec = message.timeSec;
        if (message.nickname != null && message.hasOwnProperty("nickname"))
            object.nickname = message.nickname;
        return object;
    };

    /**
     * Converts this MSG_KICK_CLCN to JSON.
     * @function toJSON
     * @memberof MSG_KICK_CLCN
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MSG_KICK_CLCN.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return MSG_KICK_CLCN;
})();

module.exports = $root;
