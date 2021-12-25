/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = protobuf;

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.MSG_ADD_EXCH_CODE_LBCL = (function() {

    /**
     * Properties of a MSG_ADD_EXCH_CODE_LBCL.
     * @exports IMSG_ADD_EXCH_CODE_LBCL
     * @interface IMSG_ADD_EXCH_CODE_LBCL
     * @property {number} msgID MSG_ADD_EXCH_CODE_LBCL msgID
     * @property {number|null} [pid] MSG_ADD_EXCH_CODE_LBCL pid
     * @property {string|null} [newTicket] MSG_ADD_EXCH_CODE_LBCL newTicket
     * @property {MSG_ADD_EXCH_CODE_LBCL.Result|null} [result] MSG_ADD_EXCH_CODE_LBCL result
     */

    /**
     * Constructs a new MSG_ADD_EXCH_CODE_LBCL.
     * @exports MSG_ADD_EXCH_CODE_LBCL
     * @classdesc Represents a MSG_ADD_EXCH_CODE_LBCL.
     * @implements IMSG_ADD_EXCH_CODE_LBCL
     * @constructor
     * @param {IMSG_ADD_EXCH_CODE_LBCL=} [properties] Properties to set
     */
    function MSG_ADD_EXCH_CODE_LBCL(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MSG_ADD_EXCH_CODE_LBCL msgID.
     * @member {number} msgID
     * @memberof MSG_ADD_EXCH_CODE_LBCL
     * @instance
     */
    MSG_ADD_EXCH_CODE_LBCL.prototype.msgID = 0;

    /**
     * MSG_ADD_EXCH_CODE_LBCL pid.
     * @member {number} pid
     * @memberof MSG_ADD_EXCH_CODE_LBCL
     * @instance
     */
    MSG_ADD_EXCH_CODE_LBCL.prototype.pid = 0;

    /**
     * MSG_ADD_EXCH_CODE_LBCL newTicket.
     * @member {string} newTicket
     * @memberof MSG_ADD_EXCH_CODE_LBCL
     * @instance
     */
    MSG_ADD_EXCH_CODE_LBCL.prototype.newTicket = "";

    /**
     * MSG_ADD_EXCH_CODE_LBCL result.
     * @member {MSG_ADD_EXCH_CODE_LBCL.Result} result
     * @memberof MSG_ADD_EXCH_CODE_LBCL
     * @instance
     */
    MSG_ADD_EXCH_CODE_LBCL.prototype.result = 0;

    /**
     * Creates a new MSG_ADD_EXCH_CODE_LBCL instance using the specified properties.
     * @function create
     * @memberof MSG_ADD_EXCH_CODE_LBCL
     * @static
     * @param {IMSG_ADD_EXCH_CODE_LBCL=} [properties] Properties to set
     * @returns {MSG_ADD_EXCH_CODE_LBCL} MSG_ADD_EXCH_CODE_LBCL instance
     */
    MSG_ADD_EXCH_CODE_LBCL.create = function create(properties) {
        return new MSG_ADD_EXCH_CODE_LBCL(properties);
    };

    /**
     * Encodes the specified MSG_ADD_EXCH_CODE_LBCL message. Does not implicitly {@link MSG_ADD_EXCH_CODE_LBCL.verify|verify} messages.
     * @function encode
     * @memberof MSG_ADD_EXCH_CODE_LBCL
     * @static
     * @param {IMSG_ADD_EXCH_CODE_LBCL} message MSG_ADD_EXCH_CODE_LBCL message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MSG_ADD_EXCH_CODE_LBCL.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.msgID);
        if (message.pid != null && message.hasOwnProperty("pid"))
            writer.uint32(/* id 2, wireType 1 =*/17).double(message.pid);
        if (message.newTicket != null && message.hasOwnProperty("newTicket"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.newTicket);
        if (message.result != null && message.hasOwnProperty("result"))
            writer.uint32(/* id 4, wireType 0 =*/32).int32(message.result);
        return writer;
    };

    /**
     * Encodes the specified MSG_ADD_EXCH_CODE_LBCL message, length delimited. Does not implicitly {@link MSG_ADD_EXCH_CODE_LBCL.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MSG_ADD_EXCH_CODE_LBCL
     * @static
     * @param {IMSG_ADD_EXCH_CODE_LBCL} message MSG_ADD_EXCH_CODE_LBCL message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MSG_ADD_EXCH_CODE_LBCL.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MSG_ADD_EXCH_CODE_LBCL message from the specified reader or buffer.
     * @function decode
     * @memberof MSG_ADD_EXCH_CODE_LBCL
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MSG_ADD_EXCH_CODE_LBCL} MSG_ADD_EXCH_CODE_LBCL
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MSG_ADD_EXCH_CODE_LBCL.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MSG_ADD_EXCH_CODE_LBCL();
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
                message.newTicket = reader.string();
                break;
            case 4:
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
     * Decodes a MSG_ADD_EXCH_CODE_LBCL message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MSG_ADD_EXCH_CODE_LBCL
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MSG_ADD_EXCH_CODE_LBCL} MSG_ADD_EXCH_CODE_LBCL
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MSG_ADD_EXCH_CODE_LBCL.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MSG_ADD_EXCH_CODE_LBCL message.
     * @function verify
     * @memberof MSG_ADD_EXCH_CODE_LBCL
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MSG_ADD_EXCH_CODE_LBCL.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.msgID))
            return "msgID: integer expected";
        if (message.pid != null && message.hasOwnProperty("pid"))
            if (typeof message.pid !== "number")
                return "pid: number expected";
        if (message.newTicket != null && message.hasOwnProperty("newTicket"))
            if (!$util.isString(message.newTicket))
                return "newTicket: string expected";
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
                break;
            }
        return null;
    };

    /**
     * Creates a MSG_ADD_EXCH_CODE_LBCL message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MSG_ADD_EXCH_CODE_LBCL
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MSG_ADD_EXCH_CODE_LBCL} MSG_ADD_EXCH_CODE_LBCL
     */
    MSG_ADD_EXCH_CODE_LBCL.fromObject = function fromObject(object) {
        if (object instanceof $root.MSG_ADD_EXCH_CODE_LBCL)
            return object;
        var message = new $root.MSG_ADD_EXCH_CODE_LBCL();
        if (object.msgID != null)
            message.msgID = object.msgID >>> 0;
        if (object.pid != null)
            message.pid = Number(object.pid);
        if (object.newTicket != null)
            message.newTicket = String(object.newTicket);
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
        case "TICKET_EXIST":
        case 5:
            message.result = 5;
            break;
        }
        return message;
    };

    /**
     * Creates a plain object from a MSG_ADD_EXCH_CODE_LBCL message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MSG_ADD_EXCH_CODE_LBCL
     * @static
     * @param {MSG_ADD_EXCH_CODE_LBCL} message MSG_ADD_EXCH_CODE_LBCL
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MSG_ADD_EXCH_CODE_LBCL.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.msgID = 0;
            object.pid = 0;
            object.newTicket = "";
            object.result = options.enums === String ? "SUCCESS" : 0;
        }
        if (message.msgID != null && message.hasOwnProperty("msgID"))
            object.msgID = message.msgID;
        if (message.pid != null && message.hasOwnProperty("pid"))
            object.pid = options.json && !isFinite(message.pid) ? String(message.pid) : message.pid;
        if (message.newTicket != null && message.hasOwnProperty("newTicket"))
            object.newTicket = message.newTicket;
        if (message.result != null && message.hasOwnProperty("result"))
            object.result = options.enums === String ? $root.MSG_ADD_EXCH_CODE_LBCL.Result[message.result] : message.result;
        return object;
    };

    /**
     * Converts this MSG_ADD_EXCH_CODE_LBCL to JSON.
     * @function toJSON
     * @memberof MSG_ADD_EXCH_CODE_LBCL
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MSG_ADD_EXCH_CODE_LBCL.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Result enum.
     * @name MSG_ADD_EXCH_CODE_LBCL.Result
     * @enum {string}
     * @property {number} SUCCESS=0 SUCCESS value
     * @property {number} NO_CLIENT_INFO=1 NO_CLIENT_INFO value
     * @property {number} OFFLINE=2 OFFLINE value
     * @property {number} PARAM_INVALID=3 PARAM_INVALID value
     * @property {number} REDIS_ERROR=4 REDIS_ERROR value
     * @property {number} TICKET_EXIST=5 TICKET_EXIST value
     */
    MSG_ADD_EXCH_CODE_LBCL.Result = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "SUCCESS"] = 0;
        values[valuesById[1] = "NO_CLIENT_INFO"] = 1;
        values[valuesById[2] = "OFFLINE"] = 2;
        values[valuesById[3] = "PARAM_INVALID"] = 3;
        values[valuesById[4] = "REDIS_ERROR"] = 4;
        values[valuesById[5] = "TICKET_EXIST"] = 5;
        return values;
    })();

    return MSG_ADD_EXCH_CODE_LBCL;
})();

module.exports = $root;
