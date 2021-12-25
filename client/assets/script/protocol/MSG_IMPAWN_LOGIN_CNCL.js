/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = protobuf;

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.MSG_IMPAWN_LOGIN_CNCL = (function() {

    /**
     * Properties of a MSG_IMPAWN_LOGIN_CNCL.
     * @exports IMSG_IMPAWN_LOGIN_CNCL
     * @interface IMSG_IMPAWN_LOGIN_CNCL
     * @property {number} msgID MSG_IMPAWN_LOGIN_CNCL msgID
     * @property {number|null} [pid] MSG_IMPAWN_LOGIN_CNCL pid
     * @property {MSG_IMPAWN_LOGIN_CNCL.Result|null} [result] MSG_IMPAWN_LOGIN_CNCL result
     */

    /**
     * Constructs a new MSG_IMPAWN_LOGIN_CNCL.
     * @exports MSG_IMPAWN_LOGIN_CNCL
     * @classdesc Represents a MSG_IMPAWN_LOGIN_CNCL.
     * @implements IMSG_IMPAWN_LOGIN_CNCL
     * @constructor
     * @param {IMSG_IMPAWN_LOGIN_CNCL=} [properties] Properties to set
     */
    function MSG_IMPAWN_LOGIN_CNCL(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MSG_IMPAWN_LOGIN_CNCL msgID.
     * @member {number} msgID
     * @memberof MSG_IMPAWN_LOGIN_CNCL
     * @instance
     */
    MSG_IMPAWN_LOGIN_CNCL.prototype.msgID = 0;

    /**
     * MSG_IMPAWN_LOGIN_CNCL pid.
     * @member {number} pid
     * @memberof MSG_IMPAWN_LOGIN_CNCL
     * @instance
     */
    MSG_IMPAWN_LOGIN_CNCL.prototype.pid = 0;

    /**
     * MSG_IMPAWN_LOGIN_CNCL result.
     * @member {MSG_IMPAWN_LOGIN_CNCL.Result} result
     * @memberof MSG_IMPAWN_LOGIN_CNCL
     * @instance
     */
    MSG_IMPAWN_LOGIN_CNCL.prototype.result = 0;

    /**
     * Creates a new MSG_IMPAWN_LOGIN_CNCL instance using the specified properties.
     * @function create
     * @memberof MSG_IMPAWN_LOGIN_CNCL
     * @static
     * @param {IMSG_IMPAWN_LOGIN_CNCL=} [properties] Properties to set
     * @returns {MSG_IMPAWN_LOGIN_CNCL} MSG_IMPAWN_LOGIN_CNCL instance
     */
    MSG_IMPAWN_LOGIN_CNCL.create = function create(properties) {
        return new MSG_IMPAWN_LOGIN_CNCL(properties);
    };

    /**
     * Encodes the specified MSG_IMPAWN_LOGIN_CNCL message. Does not implicitly {@link MSG_IMPAWN_LOGIN_CNCL.verify|verify} messages.
     * @function encode
     * @memberof MSG_IMPAWN_LOGIN_CNCL
     * @static
     * @param {IMSG_IMPAWN_LOGIN_CNCL} message MSG_IMPAWN_LOGIN_CNCL message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MSG_IMPAWN_LOGIN_CNCL.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.msgID);
        if (message.pid != null && message.hasOwnProperty("pid"))
            writer.uint32(/* id 2, wireType 1 =*/17).double(message.pid);
        if (message.result != null && message.hasOwnProperty("result"))
            writer.uint32(/* id 3, wireType 0 =*/24).int32(message.result);
        return writer;
    };

    /**
     * Encodes the specified MSG_IMPAWN_LOGIN_CNCL message, length delimited. Does not implicitly {@link MSG_IMPAWN_LOGIN_CNCL.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MSG_IMPAWN_LOGIN_CNCL
     * @static
     * @param {IMSG_IMPAWN_LOGIN_CNCL} message MSG_IMPAWN_LOGIN_CNCL message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MSG_IMPAWN_LOGIN_CNCL.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MSG_IMPAWN_LOGIN_CNCL message from the specified reader or buffer.
     * @function decode
     * @memberof MSG_IMPAWN_LOGIN_CNCL
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MSG_IMPAWN_LOGIN_CNCL} MSG_IMPAWN_LOGIN_CNCL
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MSG_IMPAWN_LOGIN_CNCL.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MSG_IMPAWN_LOGIN_CNCL();
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
     * Decodes a MSG_IMPAWN_LOGIN_CNCL message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MSG_IMPAWN_LOGIN_CNCL
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MSG_IMPAWN_LOGIN_CNCL} MSG_IMPAWN_LOGIN_CNCL
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MSG_IMPAWN_LOGIN_CNCL.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MSG_IMPAWN_LOGIN_CNCL message.
     * @function verify
     * @memberof MSG_IMPAWN_LOGIN_CNCL
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MSG_IMPAWN_LOGIN_CNCL.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.msgID))
            return "msgID: integer expected";
        if (message.pid != null && message.hasOwnProperty("pid"))
            if (typeof message.pid !== "number")
                return "pid: number expected";
        if (message.result != null && message.hasOwnProperty("result"))
            switch (message.result) {
            default:
                return "result: enum value expected";
            case 0:
            case 1:
            case 2:
                break;
            }
        return null;
    };

    /**
     * Creates a MSG_IMPAWN_LOGIN_CNCL message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MSG_IMPAWN_LOGIN_CNCL
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MSG_IMPAWN_LOGIN_CNCL} MSG_IMPAWN_LOGIN_CNCL
     */
    MSG_IMPAWN_LOGIN_CNCL.fromObject = function fromObject(object) {
        if (object instanceof $root.MSG_IMPAWN_LOGIN_CNCL)
            return object;
        var message = new $root.MSG_IMPAWN_LOGIN_CNCL();
        if (object.msgID != null)
            message.msgID = object.msgID >>> 0;
        if (object.pid != null)
            message.pid = Number(object.pid);
        switch (object.result) {
        case "SUCCESS":
        case 0:
            message.result = 0;
            break;
        case "OFFLINE":
        case 1:
            message.result = 1;
            break;
        case "NO_CLIENT_INFO":
        case 2:
            message.result = 2;
            break;
        }
        return message;
    };

    /**
     * Creates a plain object from a MSG_IMPAWN_LOGIN_CNCL message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MSG_IMPAWN_LOGIN_CNCL
     * @static
     * @param {MSG_IMPAWN_LOGIN_CNCL} message MSG_IMPAWN_LOGIN_CNCL
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MSG_IMPAWN_LOGIN_CNCL.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.msgID = 0;
            object.pid = 0;
            object.result = options.enums === String ? "SUCCESS" : 0;
        }
        if (message.msgID != null && message.hasOwnProperty("msgID"))
            object.msgID = message.msgID;
        if (message.pid != null && message.hasOwnProperty("pid"))
            object.pid = options.json && !isFinite(message.pid) ? String(message.pid) : message.pid;
        if (message.result != null && message.hasOwnProperty("result"))
            object.result = options.enums === String ? $root.MSG_IMPAWN_LOGIN_CNCL.Result[message.result] : message.result;
        return object;
    };

    /**
     * Converts this MSG_IMPAWN_LOGIN_CNCL to JSON.
     * @function toJSON
     * @memberof MSG_IMPAWN_LOGIN_CNCL
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MSG_IMPAWN_LOGIN_CNCL.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Result enum.
     * @name MSG_IMPAWN_LOGIN_CNCL.Result
     * @enum {string}
     * @property {number} SUCCESS=0 SUCCESS value
     * @property {number} OFFLINE=1 OFFLINE value
     * @property {number} NO_CLIENT_INFO=2 NO_CLIENT_INFO value
     */
    MSG_IMPAWN_LOGIN_CNCL.Result = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "SUCCESS"] = 0;
        values[valuesById[1] = "OFFLINE"] = 1;
        values[valuesById[2] = "NO_CLIENT_INFO"] = 2;
        return values;
    })();

    return MSG_IMPAWN_LOGIN_CNCL;
})();

module.exports = $root;
