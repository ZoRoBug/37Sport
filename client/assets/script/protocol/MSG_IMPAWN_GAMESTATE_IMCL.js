/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = protobuf;

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.MSG_IMPAWN_GAMESTATE_IMCL = (function() {

    /**
     * Properties of a MSG_IMPAWN_GAMESTATE_IMCL.
     * @exports IMSG_IMPAWN_GAMESTATE_IMCL
     * @interface IMSG_IMPAWN_GAMESTATE_IMCL
     * @property {number} msgID MSG_IMPAWN_GAMESTATE_IMCL msgID
     * @property {number|null} [pid] MSG_IMPAWN_GAMESTATE_IMCL pid
     * @property {number|null} [remainTime] MSG_IMPAWN_GAMESTATE_IMCL remainTime
     * @property {ImpawnState|null} [state] MSG_IMPAWN_GAMESTATE_IMCL state
     * @property {number|null} [round] MSG_IMPAWN_GAMESTATE_IMCL round
     */

    /**
     * Constructs a new MSG_IMPAWN_GAMESTATE_IMCL.
     * @exports MSG_IMPAWN_GAMESTATE_IMCL
     * @classdesc Represents a MSG_IMPAWN_GAMESTATE_IMCL.
     * @implements IMSG_IMPAWN_GAMESTATE_IMCL
     * @constructor
     * @param {IMSG_IMPAWN_GAMESTATE_IMCL=} [properties] Properties to set
     */
    function MSG_IMPAWN_GAMESTATE_IMCL(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MSG_IMPAWN_GAMESTATE_IMCL msgID.
     * @member {number} msgID
     * @memberof MSG_IMPAWN_GAMESTATE_IMCL
     * @instance
     */
    MSG_IMPAWN_GAMESTATE_IMCL.prototype.msgID = 0;

    /**
     * MSG_IMPAWN_GAMESTATE_IMCL pid.
     * @member {number} pid
     * @memberof MSG_IMPAWN_GAMESTATE_IMCL
     * @instance
     */
    MSG_IMPAWN_GAMESTATE_IMCL.prototype.pid = 0;

    /**
     * MSG_IMPAWN_GAMESTATE_IMCL remainTime.
     * @member {number} remainTime
     * @memberof MSG_IMPAWN_GAMESTATE_IMCL
     * @instance
     */
    MSG_IMPAWN_GAMESTATE_IMCL.prototype.remainTime = 0;

    /**
     * MSG_IMPAWN_GAMESTATE_IMCL state.
     * @member {ImpawnState} state
     * @memberof MSG_IMPAWN_GAMESTATE_IMCL
     * @instance
     */
    MSG_IMPAWN_GAMESTATE_IMCL.prototype.state = 1;

    /**
     * MSG_IMPAWN_GAMESTATE_IMCL round.
     * @member {number} round
     * @memberof MSG_IMPAWN_GAMESTATE_IMCL
     * @instance
     */
    MSG_IMPAWN_GAMESTATE_IMCL.prototype.round = 0;

    /**
     * Creates a new MSG_IMPAWN_GAMESTATE_IMCL instance using the specified properties.
     * @function create
     * @memberof MSG_IMPAWN_GAMESTATE_IMCL
     * @static
     * @param {IMSG_IMPAWN_GAMESTATE_IMCL=} [properties] Properties to set
     * @returns {MSG_IMPAWN_GAMESTATE_IMCL} MSG_IMPAWN_GAMESTATE_IMCL instance
     */
    MSG_IMPAWN_GAMESTATE_IMCL.create = function create(properties) {
        return new MSG_IMPAWN_GAMESTATE_IMCL(properties);
    };

    /**
     * Encodes the specified MSG_IMPAWN_GAMESTATE_IMCL message. Does not implicitly {@link MSG_IMPAWN_GAMESTATE_IMCL.verify|verify} messages.
     * @function encode
     * @memberof MSG_IMPAWN_GAMESTATE_IMCL
     * @static
     * @param {IMSG_IMPAWN_GAMESTATE_IMCL} message MSG_IMPAWN_GAMESTATE_IMCL message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MSG_IMPAWN_GAMESTATE_IMCL.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.msgID);
        if (message.pid != null && message.hasOwnProperty("pid"))
            writer.uint32(/* id 2, wireType 1 =*/17).double(message.pid);
        if (message.remainTime != null && message.hasOwnProperty("remainTime"))
            writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.remainTime);
        if (message.state != null && message.hasOwnProperty("state"))
            writer.uint32(/* id 4, wireType 0 =*/32).int32(message.state);
        if (message.round != null && message.hasOwnProperty("round"))
            writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.round);
        return writer;
    };

    /**
     * Encodes the specified MSG_IMPAWN_GAMESTATE_IMCL message, length delimited. Does not implicitly {@link MSG_IMPAWN_GAMESTATE_IMCL.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MSG_IMPAWN_GAMESTATE_IMCL
     * @static
     * @param {IMSG_IMPAWN_GAMESTATE_IMCL} message MSG_IMPAWN_GAMESTATE_IMCL message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MSG_IMPAWN_GAMESTATE_IMCL.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MSG_IMPAWN_GAMESTATE_IMCL message from the specified reader or buffer.
     * @function decode
     * @memberof MSG_IMPAWN_GAMESTATE_IMCL
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MSG_IMPAWN_GAMESTATE_IMCL} MSG_IMPAWN_GAMESTATE_IMCL
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MSG_IMPAWN_GAMESTATE_IMCL.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MSG_IMPAWN_GAMESTATE_IMCL();
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
                message.remainTime = reader.uint32();
                break;
            case 4:
                message.state = reader.int32();
                break;
            case 5:
                message.round = reader.uint32();
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
     * Decodes a MSG_IMPAWN_GAMESTATE_IMCL message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MSG_IMPAWN_GAMESTATE_IMCL
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MSG_IMPAWN_GAMESTATE_IMCL} MSG_IMPAWN_GAMESTATE_IMCL
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MSG_IMPAWN_GAMESTATE_IMCL.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MSG_IMPAWN_GAMESTATE_IMCL message.
     * @function verify
     * @memberof MSG_IMPAWN_GAMESTATE_IMCL
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MSG_IMPAWN_GAMESTATE_IMCL.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.msgID))
            return "msgID: integer expected";
        if (message.pid != null && message.hasOwnProperty("pid"))
            if (typeof message.pid !== "number")
                return "pid: number expected";
        if (message.remainTime != null && message.hasOwnProperty("remainTime"))
            if (!$util.isInteger(message.remainTime))
                return "remainTime: integer expected";
        if (message.state != null && message.hasOwnProperty("state"))
            switch (message.state) {
            default:
                return "state: enum value expected";
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                break;
            }
        if (message.round != null && message.hasOwnProperty("round"))
            if (!$util.isInteger(message.round))
                return "round: integer expected";
        return null;
    };

    /**
     * Creates a MSG_IMPAWN_GAMESTATE_IMCL message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MSG_IMPAWN_GAMESTATE_IMCL
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MSG_IMPAWN_GAMESTATE_IMCL} MSG_IMPAWN_GAMESTATE_IMCL
     */
    MSG_IMPAWN_GAMESTATE_IMCL.fromObject = function fromObject(object) {
        if (object instanceof $root.MSG_IMPAWN_GAMESTATE_IMCL)
            return object;
        var message = new $root.MSG_IMPAWN_GAMESTATE_IMCL();
        if (object.msgID != null)
            message.msgID = object.msgID >>> 0;
        if (object.pid != null)
            message.pid = Number(object.pid);
        if (object.remainTime != null)
            message.remainTime = object.remainTime >>> 0;
        switch (object.state) {
        case "WAIT_START":
        case 1:
            message.state = 1;
            break;
        case "STARTING":
        case 2:
            message.state = 2;
            break;
        case "WAIT_END":
        case 3:
            message.state = 3;
            break;
        case "SETTLEMENT":
        case 4:
            message.state = 4;
            break;
        case "PAUSE":
        case 5:
            message.state = 5;
            break;
        }
        if (object.round != null)
            message.round = object.round >>> 0;
        return message;
    };

    /**
     * Creates a plain object from a MSG_IMPAWN_GAMESTATE_IMCL message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MSG_IMPAWN_GAMESTATE_IMCL
     * @static
     * @param {MSG_IMPAWN_GAMESTATE_IMCL} message MSG_IMPAWN_GAMESTATE_IMCL
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MSG_IMPAWN_GAMESTATE_IMCL.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.msgID = 0;
            object.pid = 0;
            object.remainTime = 0;
            object.state = options.enums === String ? "WAIT_START" : 1;
            object.round = 0;
        }
        if (message.msgID != null && message.hasOwnProperty("msgID"))
            object.msgID = message.msgID;
        if (message.pid != null && message.hasOwnProperty("pid"))
            object.pid = options.json && !isFinite(message.pid) ? String(message.pid) : message.pid;
        if (message.remainTime != null && message.hasOwnProperty("remainTime"))
            object.remainTime = message.remainTime;
        if (message.state != null && message.hasOwnProperty("state"))
            object.state = options.enums === String ? $root.ImpawnState[message.state] : message.state;
        if (message.round != null && message.hasOwnProperty("round"))
            object.round = message.round;
        return object;
    };

    /**
     * Converts this MSG_IMPAWN_GAMESTATE_IMCL to JSON.
     * @function toJSON
     * @memberof MSG_IMPAWN_GAMESTATE_IMCL
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MSG_IMPAWN_GAMESTATE_IMCL.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return MSG_IMPAWN_GAMESTATE_IMCL;
})();

/**
 * PropID enum.
 * @exports PropID
 * @enum {string}
 * @property {number} COIN=1 COIN value
 * @property {number} SUBCOIN=1025 SUBCOIN value
 */
$root.PropID = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[1] = "COIN"] = 1;
    values[valuesById[1025] = "SUBCOIN"] = 1025;
    return values;
})();

/**
 * Reason enum.
 * @exports Reason
 * @enum {string}
 * @property {number} STATIC_AD=1 STATIC_AD value
 * @property {number} ANIMATE_AD=2 ANIMATE_AD value
 * @property {number} VIEW_RECORD=3 VIEW_RECORD value
 * @property {number} SHOP_RECHARGE=4 SHOP_RECHARGE value
 * @property {number} KING3_UNLOCK=5 KING3_UNLOCK value
 * @property {number} POWER7_UNLOCK=6 POWER7_UNLOCK value
 * @property {number} KING3_REFUND=7 KING3_REFUND value
 * @property {number} POWER7_REFUND=8 POWER7_REFUND value
 * @property {number} IMPAWN_REFUND=9 IMPAWN_REFUND value
 * @property {number} ALTER_NICKNAME=10 ALTER_NICKNAME value
 * @property {number} MAIL_SEND_GIFT=11 MAIL_SEND_GIFT value
 * @property {number} TICKET_EXCHANGE=12 TICKET_EXCHANGE value
 * @property {number} SIGNIN_AWARD=13 SIGNIN_AWARD value
 * @property {number} SYSTEM_AWARD=14 SYSTEM_AWARD value
 */
$root.Reason = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[1] = "STATIC_AD"] = 1;
    values[valuesById[2] = "ANIMATE_AD"] = 2;
    values[valuesById[3] = "VIEW_RECORD"] = 3;
    values[valuesById[4] = "SHOP_RECHARGE"] = 4;
    values[valuesById[5] = "KING3_UNLOCK"] = 5;
    values[valuesById[6] = "POWER7_UNLOCK"] = 6;
    values[valuesById[7] = "KING3_REFUND"] = 7;
    values[valuesById[8] = "POWER7_REFUND"] = 8;
    values[valuesById[9] = "IMPAWN_REFUND"] = 9;
    values[valuesById[10] = "ALTER_NICKNAME"] = 10;
    values[valuesById[11] = "MAIL_SEND_GIFT"] = 11;
    values[valuesById[12] = "TICKET_EXCHANGE"] = 12;
    values[valuesById[13] = "SIGNIN_AWARD"] = 13;
    values[valuesById[14] = "SYSTEM_AWARD"] = 14;
    return values;
})();

/**
 * Platform enum.
 * @exports Platform
 * @enum {string}
 * @property {number} MIN=0 MIN value
 * @property {number} OFFICIAL=1 OFFICIAL value
 * @property {number} WX_MINIGAME=2 WX_MINIGAME value
 * @property {number} MAX=3 MAX value
 */
$root.Platform = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "MIN"] = 0;
    values[valuesById[1] = "OFFICIAL"] = 1;
    values[valuesById[2] = "WX_MINIGAME"] = 2;
    values[valuesById[3] = "MAX"] = 3;
    return values;
})();

/**
 * Identity enum.
 * @exports Identity
 * @enum {string}
 * @property {number} GENERAL=1 GENERAL value
 * @property {number} NOR_GM=2 NOR_GM value
 * @property {number} ADV_GM=3 ADV_GM value
 * @property {number} ADMIN=4 ADMIN value
 */
$root.Identity = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[1] = "GENERAL"] = 1;
    values[valuesById[2] = "NOR_GM"] = 2;
    values[valuesById[3] = "ADV_GM"] = 3;
    values[valuesById[4] = "ADMIN"] = 4;
    return values;
})();

/**
 * Location enum.
 * @exports Location
 * @enum {string}
 * @property {number} LOBBY=1 LOBBY value
 * @property {number} KING3=2 KING3 value
 * @property {number} POWER7=3 POWER7 value
 * @property {number} IMPAWN=4 IMPAWN value
 */
$root.Location = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[1] = "LOBBY"] = 1;
    values[valuesById[2] = "KING3"] = 2;
    values[valuesById[3] = "POWER7"] = 3;
    values[valuesById[4] = "IMPAWN"] = 4;
    return values;
})();

/**
 * King3State enum.
 * @exports King3State
 * @enum {string}
 * @property {number} PREPARE=1 PREPARE value
 * @property {number} WAIT_START=2 WAIT_START value
 * @property {number} WITHHOLD=3 WITHHOLD value
 * @property {number} STARTING=4 STARTING value
 * @property {number} WAIT_END=5 WAIT_END value
 * @property {number} SETTLEMENT=6 SETTLEMENT value
 */
$root.King3State = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[1] = "PREPARE"] = 1;
    values[valuesById[2] = "WAIT_START"] = 2;
    values[valuesById[3] = "WITHHOLD"] = 3;
    values[valuesById[4] = "STARTING"] = 4;
    values[valuesById[5] = "WAIT_END"] = 5;
    values[valuesById[6] = "SETTLEMENT"] = 6;
    return values;
})();

/**
 * King3Object enum.
 * @exports King3Object
 * @enum {string}
 * @property {number} MIN=0 MIN value
 * @property {number} WEI=1 WEI value
 * @property {number} SHU=2 SHU value
 * @property {number} WU=3 WU value
 * @property {number} MAX=4 MAX value
 */
$root.King3Object = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "MIN"] = 0;
    values[valuesById[1] = "WEI"] = 1;
    values[valuesById[2] = "SHU"] = 2;
    values[valuesById[3] = "WU"] = 3;
    values[valuesById[4] = "MAX"] = 4;
    return values;
})();

/**
 * Power7State enum.
 * @exports Power7State
 * @enum {string}
 * @property {number} PREPARE=1 PREPARE value
 * @property {number} WAIT_START=2 WAIT_START value
 * @property {number} WITHHOLD=3 WITHHOLD value
 * @property {number} STARTING=4 STARTING value
 * @property {number} WAIT_END=5 WAIT_END value
 * @property {number} SETTLEMENT=6 SETTLEMENT value
 */
$root.Power7State = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[1] = "PREPARE"] = 1;
    values[valuesById[2] = "WAIT_START"] = 2;
    values[valuesById[3] = "WITHHOLD"] = 3;
    values[valuesById[4] = "STARTING"] = 4;
    values[valuesById[5] = "WAIT_END"] = 5;
    values[valuesById[6] = "SETTLEMENT"] = 6;
    return values;
})();

/**
 * ImpawnState enum.
 * @exports ImpawnState
 * @enum {string}
 * @property {number} WAIT_START=1 WAIT_START value
 * @property {number} STARTING=2 STARTING value
 * @property {number} WAIT_END=3 WAIT_END value
 * @property {number} SETTLEMENT=4 SETTLEMENT value
 * @property {number} PAUSE=5 PAUSE value
 */
$root.ImpawnState = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[1] = "WAIT_START"] = 1;
    values[valuesById[2] = "STARTING"] = 2;
    values[valuesById[3] = "WAIT_END"] = 3;
    values[valuesById[4] = "SETTLEMENT"] = 4;
    values[valuesById[5] = "PAUSE"] = 5;
    return values;
})();

$root.Prop = (function() {

    /**
     * Properties of a Prop.
     * @exports IProp
     * @interface IProp
     * @property {PropID|null} [id] Prop id
     * @property {number|null} [count] Prop count
     */

    /**
     * Constructs a new Prop.
     * @exports Prop
     * @classdesc Represents a Prop.
     * @implements IProp
     * @constructor
     * @param {IProp=} [properties] Properties to set
     */
    function Prop(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Prop id.
     * @member {PropID} id
     * @memberof Prop
     * @instance
     */
    Prop.prototype.id = 1;

    /**
     * Prop count.
     * @member {number} count
     * @memberof Prop
     * @instance
     */
    Prop.prototype.count = 0;

    /**
     * Creates a new Prop instance using the specified properties.
     * @function create
     * @memberof Prop
     * @static
     * @param {IProp=} [properties] Properties to set
     * @returns {Prop} Prop instance
     */
    Prop.create = function create(properties) {
        return new Prop(properties);
    };

    /**
     * Encodes the specified Prop message. Does not implicitly {@link Prop.verify|verify} messages.
     * @function encode
     * @memberof Prop
     * @static
     * @param {IProp} message Prop message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Prop.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.id != null && message.hasOwnProperty("id"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
        if (message.count != null && message.hasOwnProperty("count"))
            writer.uint32(/* id 2, wireType 1 =*/17).double(message.count);
        return writer;
    };

    /**
     * Encodes the specified Prop message, length delimited. Does not implicitly {@link Prop.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Prop
     * @static
     * @param {IProp} message Prop message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Prop.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Prop message from the specified reader or buffer.
     * @function decode
     * @memberof Prop
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Prop} Prop
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Prop.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Prop();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.id = reader.int32();
                break;
            case 2:
                message.count = reader.double();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Prop message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Prop
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Prop} Prop
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Prop.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Prop message.
     * @function verify
     * @memberof Prop
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Prop.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.id != null && message.hasOwnProperty("id"))
            switch (message.id) {
            default:
                return "id: enum value expected";
            case 1:
            case 1025:
                break;
            }
        if (message.count != null && message.hasOwnProperty("count"))
            if (typeof message.count !== "number")
                return "count: number expected";
        return null;
    };

    /**
     * Creates a Prop message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Prop
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Prop} Prop
     */
    Prop.fromObject = function fromObject(object) {
        if (object instanceof $root.Prop)
            return object;
        var message = new $root.Prop();
        switch (object.id) {
        case "COIN":
        case 1:
            message.id = 1;
            break;
        case "SUBCOIN":
        case 1025:
            message.id = 1025;
            break;
        }
        if (object.count != null)
            message.count = Number(object.count);
        return message;
    };

    /**
     * Creates a plain object from a Prop message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Prop
     * @static
     * @param {Prop} message Prop
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Prop.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.id = options.enums === String ? "COIN" : 1;
            object.count = 0;
        }
        if (message.id != null && message.hasOwnProperty("id"))
            object.id = options.enums === String ? $root.PropID[message.id] : message.id;
        if (message.count != null && message.hasOwnProperty("count"))
            object.count = options.json && !isFinite(message.count) ? String(message.count) : message.count;
        return object;
    };

    /**
     * Converts this Prop to JSON.
     * @function toJSON
     * @memberof Prop
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Prop.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Prop;
})();

$root.PlayerInfo = (function() {

    /**
     * Properties of a PlayerInfo.
     * @exports IPlayerInfo
     * @interface IPlayerInfo
     * @property {number|null} [pid] PlayerInfo pid
     * @property {string|null} [account] PlayerInfo account
     * @property {string|null} [password] PlayerInfo password
     * @property {string|null} [head] PlayerInfo head
     * @property {string|null} [nickname] PlayerInfo nickname
     * @property {Identity|null} [identity] PlayerInfo identity
     * @property {Platform|null} [platform] PlayerInfo platform
     * @property {string|null} [regTime] PlayerInfo regTime
     * @property {string|null} [loginTime] PlayerInfo loginTime
     * @property {string|null} [logoutTime] PlayerInfo logoutTime
     */

    /**
     * Constructs a new PlayerInfo.
     * @exports PlayerInfo
     * @classdesc Represents a PlayerInfo.
     * @implements IPlayerInfo
     * @constructor
     * @param {IPlayerInfo=} [properties] Properties to set
     */
    function PlayerInfo(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * PlayerInfo pid.
     * @member {number} pid
     * @memberof PlayerInfo
     * @instance
     */
    PlayerInfo.prototype.pid = 0;

    /**
     * PlayerInfo account.
     * @member {string} account
     * @memberof PlayerInfo
     * @instance
     */
    PlayerInfo.prototype.account = "";

    /**
     * PlayerInfo password.
     * @member {string} password
     * @memberof PlayerInfo
     * @instance
     */
    PlayerInfo.prototype.password = "";

    /**
     * PlayerInfo head.
     * @member {string} head
     * @memberof PlayerInfo
     * @instance
     */
    PlayerInfo.prototype.head = "";

    /**
     * PlayerInfo nickname.
     * @member {string} nickname
     * @memberof PlayerInfo
     * @instance
     */
    PlayerInfo.prototype.nickname = "";

    /**
     * PlayerInfo identity.
     * @member {Identity} identity
     * @memberof PlayerInfo
     * @instance
     */
    PlayerInfo.prototype.identity = 1;

    /**
     * PlayerInfo platform.
     * @member {Platform} platform
     * @memberof PlayerInfo
     * @instance
     */
    PlayerInfo.prototype.platform = 0;

    /**
     * PlayerInfo regTime.
     * @member {string} regTime
     * @memberof PlayerInfo
     * @instance
     */
    PlayerInfo.prototype.regTime = "";

    /**
     * PlayerInfo loginTime.
     * @member {string} loginTime
     * @memberof PlayerInfo
     * @instance
     */
    PlayerInfo.prototype.loginTime = "";

    /**
     * PlayerInfo logoutTime.
     * @member {string} logoutTime
     * @memberof PlayerInfo
     * @instance
     */
    PlayerInfo.prototype.logoutTime = "";

    /**
     * Creates a new PlayerInfo instance using the specified properties.
     * @function create
     * @memberof PlayerInfo
     * @static
     * @param {IPlayerInfo=} [properties] Properties to set
     * @returns {PlayerInfo} PlayerInfo instance
     */
    PlayerInfo.create = function create(properties) {
        return new PlayerInfo(properties);
    };

    /**
     * Encodes the specified PlayerInfo message. Does not implicitly {@link PlayerInfo.verify|verify} messages.
     * @function encode
     * @memberof PlayerInfo
     * @static
     * @param {IPlayerInfo} message PlayerInfo message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PlayerInfo.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.pid != null && message.hasOwnProperty("pid"))
            writer.uint32(/* id 1, wireType 1 =*/9).double(message.pid);
        if (message.account != null && message.hasOwnProperty("account"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.account);
        if (message.password != null && message.hasOwnProperty("password"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.password);
        if (message.head != null && message.hasOwnProperty("head"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.head);
        if (message.nickname != null && message.hasOwnProperty("nickname"))
            writer.uint32(/* id 5, wireType 2 =*/42).string(message.nickname);
        if (message.identity != null && message.hasOwnProperty("identity"))
            writer.uint32(/* id 6, wireType 0 =*/48).int32(message.identity);
        if (message.platform != null && message.hasOwnProperty("platform"))
            writer.uint32(/* id 7, wireType 0 =*/56).int32(message.platform);
        if (message.regTime != null && message.hasOwnProperty("regTime"))
            writer.uint32(/* id 8, wireType 2 =*/66).string(message.regTime);
        if (message.loginTime != null && message.hasOwnProperty("loginTime"))
            writer.uint32(/* id 9, wireType 2 =*/74).string(message.loginTime);
        if (message.logoutTime != null && message.hasOwnProperty("logoutTime"))
            writer.uint32(/* id 10, wireType 2 =*/82).string(message.logoutTime);
        return writer;
    };

    /**
     * Encodes the specified PlayerInfo message, length delimited. Does not implicitly {@link PlayerInfo.verify|verify} messages.
     * @function encodeDelimited
     * @memberof PlayerInfo
     * @static
     * @param {IPlayerInfo} message PlayerInfo message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PlayerInfo.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a PlayerInfo message from the specified reader or buffer.
     * @function decode
     * @memberof PlayerInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {PlayerInfo} PlayerInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PlayerInfo.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.PlayerInfo();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.pid = reader.double();
                break;
            case 2:
                message.account = reader.string();
                break;
            case 3:
                message.password = reader.string();
                break;
            case 4:
                message.head = reader.string();
                break;
            case 5:
                message.nickname = reader.string();
                break;
            case 6:
                message.identity = reader.int32();
                break;
            case 7:
                message.platform = reader.int32();
                break;
            case 8:
                message.regTime = reader.string();
                break;
            case 9:
                message.loginTime = reader.string();
                break;
            case 10:
                message.logoutTime = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a PlayerInfo message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof PlayerInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {PlayerInfo} PlayerInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PlayerInfo.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a PlayerInfo message.
     * @function verify
     * @memberof PlayerInfo
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    PlayerInfo.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.pid != null && message.hasOwnProperty("pid"))
            if (typeof message.pid !== "number")
                return "pid: number expected";
        if (message.account != null && message.hasOwnProperty("account"))
            if (!$util.isString(message.account))
                return "account: string expected";
        if (message.password != null && message.hasOwnProperty("password"))
            if (!$util.isString(message.password))
                return "password: string expected";
        if (message.head != null && message.hasOwnProperty("head"))
            if (!$util.isString(message.head))
                return "head: string expected";
        if (message.nickname != null && message.hasOwnProperty("nickname"))
            if (!$util.isString(message.nickname))
                return "nickname: string expected";
        if (message.identity != null && message.hasOwnProperty("identity"))
            switch (message.identity) {
            default:
                return "identity: enum value expected";
            case 1:
            case 2:
            case 3:
            case 4:
                break;
            }
        if (message.platform != null && message.hasOwnProperty("platform"))
            switch (message.platform) {
            default:
                return "platform: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
                break;
            }
        if (message.regTime != null && message.hasOwnProperty("regTime"))
            if (!$util.isString(message.regTime))
                return "regTime: string expected";
        if (message.loginTime != null && message.hasOwnProperty("loginTime"))
            if (!$util.isString(message.loginTime))
                return "loginTime: string expected";
        if (message.logoutTime != null && message.hasOwnProperty("logoutTime"))
            if (!$util.isString(message.logoutTime))
                return "logoutTime: string expected";
        return null;
    };

    /**
     * Creates a PlayerInfo message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof PlayerInfo
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {PlayerInfo} PlayerInfo
     */
    PlayerInfo.fromObject = function fromObject(object) {
        if (object instanceof $root.PlayerInfo)
            return object;
        var message = new $root.PlayerInfo();
        if (object.pid != null)
            message.pid = Number(object.pid);
        if (object.account != null)
            message.account = String(object.account);
        if (object.password != null)
            message.password = String(object.password);
        if (object.head != null)
            message.head = String(object.head);
        if (object.nickname != null)
            message.nickname = String(object.nickname);
        switch (object.identity) {
        case "GENERAL":
        case 1:
            message.identity = 1;
            break;
        case "NOR_GM":
        case 2:
            message.identity = 2;
            break;
        case "ADV_GM":
        case 3:
            message.identity = 3;
            break;
        case "ADMIN":
        case 4:
            message.identity = 4;
            break;
        }
        switch (object.platform) {
        case "MIN":
        case 0:
            message.platform = 0;
            break;
        case "OFFICIAL":
        case 1:
            message.platform = 1;
            break;
        case "WX_MINIGAME":
        case 2:
            message.platform = 2;
            break;
        case "MAX":
        case 3:
            message.platform = 3;
            break;
        }
        if (object.regTime != null)
            message.regTime = String(object.regTime);
        if (object.loginTime != null)
            message.loginTime = String(object.loginTime);
        if (object.logoutTime != null)
            message.logoutTime = String(object.logoutTime);
        return message;
    };

    /**
     * Creates a plain object from a PlayerInfo message. Also converts values to other types if specified.
     * @function toObject
     * @memberof PlayerInfo
     * @static
     * @param {PlayerInfo} message PlayerInfo
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    PlayerInfo.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.pid = 0;
            object.account = "";
            object.password = "";
            object.head = "";
            object.nickname = "";
            object.identity = options.enums === String ? "GENERAL" : 1;
            object.platform = options.enums === String ? "MIN" : 0;
            object.regTime = "";
            object.loginTime = "";
            object.logoutTime = "";
        }
        if (message.pid != null && message.hasOwnProperty("pid"))
            object.pid = options.json && !isFinite(message.pid) ? String(message.pid) : message.pid;
        if (message.account != null && message.hasOwnProperty("account"))
            object.account = message.account;
        if (message.password != null && message.hasOwnProperty("password"))
            object.password = message.password;
        if (message.head != null && message.hasOwnProperty("head"))
            object.head = message.head;
        if (message.nickname != null && message.hasOwnProperty("nickname"))
            object.nickname = message.nickname;
        if (message.identity != null && message.hasOwnProperty("identity"))
            object.identity = options.enums === String ? $root.Identity[message.identity] : message.identity;
        if (message.platform != null && message.hasOwnProperty("platform"))
            object.platform = options.enums === String ? $root.Platform[message.platform] : message.platform;
        if (message.regTime != null && message.hasOwnProperty("regTime"))
            object.regTime = message.regTime;
        if (message.loginTime != null && message.hasOwnProperty("loginTime"))
            object.loginTime = message.loginTime;
        if (message.logoutTime != null && message.hasOwnProperty("logoutTime"))
            object.logoutTime = message.logoutTime;
        return object;
    };

    /**
     * Converts this PlayerInfo to JSON.
     * @function toJSON
     * @memberof PlayerInfo
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    PlayerInfo.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return PlayerInfo;
})();

module.exports = $root;
