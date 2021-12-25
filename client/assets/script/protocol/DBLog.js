/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = protobuf;

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.DBLoginLog = (function() {

    /**
     * Properties of a DBLoginLog.
     * @exports IDBLoginLog
     * @interface IDBLoginLog
     * @property {number|null} [pid] DBLoginLog pid
     * @property {string|null} [ip] DBLoginLog ip
     * @property {string|null} [guid] DBLoginLog guid
     * @property {string|null} [loginTime] DBLoginLog loginTime
     * @property {string|null} [logoutTime] DBLoginLog logoutTime
     */

    /**
     * Constructs a new DBLoginLog.
     * @exports DBLoginLog
     * @classdesc Represents a DBLoginLog.
     * @implements IDBLoginLog
     * @constructor
     * @param {IDBLoginLog=} [properties] Properties to set
     */
    function DBLoginLog(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * DBLoginLog pid.
     * @member {number} pid
     * @memberof DBLoginLog
     * @instance
     */
    DBLoginLog.prototype.pid = 0;

    /**
     * DBLoginLog ip.
     * @member {string} ip
     * @memberof DBLoginLog
     * @instance
     */
    DBLoginLog.prototype.ip = "";

    /**
     * DBLoginLog guid.
     * @member {string} guid
     * @memberof DBLoginLog
     * @instance
     */
    DBLoginLog.prototype.guid = "";

    /**
     * DBLoginLog loginTime.
     * @member {string} loginTime
     * @memberof DBLoginLog
     * @instance
     */
    DBLoginLog.prototype.loginTime = "";

    /**
     * DBLoginLog logoutTime.
     * @member {string} logoutTime
     * @memberof DBLoginLog
     * @instance
     */
    DBLoginLog.prototype.logoutTime = "";

    /**
     * Creates a new DBLoginLog instance using the specified properties.
     * @function create
     * @memberof DBLoginLog
     * @static
     * @param {IDBLoginLog=} [properties] Properties to set
     * @returns {DBLoginLog} DBLoginLog instance
     */
    DBLoginLog.create = function create(properties) {
        return new DBLoginLog(properties);
    };

    /**
     * Encodes the specified DBLoginLog message. Does not implicitly {@link DBLoginLog.verify|verify} messages.
     * @function encode
     * @memberof DBLoginLog
     * @static
     * @param {IDBLoginLog} message DBLoginLog message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DBLoginLog.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.pid != null && message.hasOwnProperty("pid"))
            writer.uint32(/* id 1, wireType 1 =*/9).double(message.pid);
        if (message.ip != null && message.hasOwnProperty("ip"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.ip);
        if (message.guid != null && message.hasOwnProperty("guid"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.guid);
        if (message.loginTime != null && message.hasOwnProperty("loginTime"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.loginTime);
        if (message.logoutTime != null && message.hasOwnProperty("logoutTime"))
            writer.uint32(/* id 5, wireType 2 =*/42).string(message.logoutTime);
        return writer;
    };

    /**
     * Encodes the specified DBLoginLog message, length delimited. Does not implicitly {@link DBLoginLog.verify|verify} messages.
     * @function encodeDelimited
     * @memberof DBLoginLog
     * @static
     * @param {IDBLoginLog} message DBLoginLog message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DBLoginLog.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a DBLoginLog message from the specified reader or buffer.
     * @function decode
     * @memberof DBLoginLog
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {DBLoginLog} DBLoginLog
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DBLoginLog.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.DBLoginLog();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.pid = reader.double();
                break;
            case 2:
                message.ip = reader.string();
                break;
            case 3:
                message.guid = reader.string();
                break;
            case 4:
                message.loginTime = reader.string();
                break;
            case 5:
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
     * Decodes a DBLoginLog message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof DBLoginLog
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {DBLoginLog} DBLoginLog
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DBLoginLog.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a DBLoginLog message.
     * @function verify
     * @memberof DBLoginLog
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    DBLoginLog.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.pid != null && message.hasOwnProperty("pid"))
            if (typeof message.pid !== "number")
                return "pid: number expected";
        if (message.ip != null && message.hasOwnProperty("ip"))
            if (!$util.isString(message.ip))
                return "ip: string expected";
        if (message.guid != null && message.hasOwnProperty("guid"))
            if (!$util.isString(message.guid))
                return "guid: string expected";
        if (message.loginTime != null && message.hasOwnProperty("loginTime"))
            if (!$util.isString(message.loginTime))
                return "loginTime: string expected";
        if (message.logoutTime != null && message.hasOwnProperty("logoutTime"))
            if (!$util.isString(message.logoutTime))
                return "logoutTime: string expected";
        return null;
    };

    /**
     * Creates a DBLoginLog message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof DBLoginLog
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {DBLoginLog} DBLoginLog
     */
    DBLoginLog.fromObject = function fromObject(object) {
        if (object instanceof $root.DBLoginLog)
            return object;
        var message = new $root.DBLoginLog();
        if (object.pid != null)
            message.pid = Number(object.pid);
        if (object.ip != null)
            message.ip = String(object.ip);
        if (object.guid != null)
            message.guid = String(object.guid);
        if (object.loginTime != null)
            message.loginTime = String(object.loginTime);
        if (object.logoutTime != null)
            message.logoutTime = String(object.logoutTime);
        return message;
    };

    /**
     * Creates a plain object from a DBLoginLog message. Also converts values to other types if specified.
     * @function toObject
     * @memberof DBLoginLog
     * @static
     * @param {DBLoginLog} message DBLoginLog
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    DBLoginLog.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.pid = 0;
            object.ip = "";
            object.guid = "";
            object.loginTime = "";
            object.logoutTime = "";
        }
        if (message.pid != null && message.hasOwnProperty("pid"))
            object.pid = options.json && !isFinite(message.pid) ? String(message.pid) : message.pid;
        if (message.ip != null && message.hasOwnProperty("ip"))
            object.ip = message.ip;
        if (message.guid != null && message.hasOwnProperty("guid"))
            object.guid = message.guid;
        if (message.loginTime != null && message.hasOwnProperty("loginTime"))
            object.loginTime = message.loginTime;
        if (message.logoutTime != null && message.hasOwnProperty("logoutTime"))
            object.logoutTime = message.logoutTime;
        return object;
    };

    /**
     * Converts this DBLoginLog to JSON.
     * @function toJSON
     * @memberof DBLoginLog
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    DBLoginLog.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return DBLoginLog;
})();

$root.DBUpdateLog = (function() {

    /**
     * Properties of a DBUpdateLog.
     * @exports IDBUpdateLog
     * @interface IDBUpdateLog
     * @property {number|null} [pid] DBUpdateLog pid
     * @property {PropID|null} [propID] DBUpdateLog propID
     * @property {number|null} [update] DBUpdateLog update
     * @property {number|null} [result] DBUpdateLog result
     * @property {Reason|null} [reason] DBUpdateLog reason
     * @property {string|null} [time] DBUpdateLog time
     * @property {string|null} [note] DBUpdateLog note
     */

    /**
     * Constructs a new DBUpdateLog.
     * @exports DBUpdateLog
     * @classdesc Represents a DBUpdateLog.
     * @implements IDBUpdateLog
     * @constructor
     * @param {IDBUpdateLog=} [properties] Properties to set
     */
    function DBUpdateLog(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * DBUpdateLog pid.
     * @member {number} pid
     * @memberof DBUpdateLog
     * @instance
     */
    DBUpdateLog.prototype.pid = 0;

    /**
     * DBUpdateLog propID.
     * @member {PropID} propID
     * @memberof DBUpdateLog
     * @instance
     */
    DBUpdateLog.prototype.propID = 1;

    /**
     * DBUpdateLog update.
     * @member {number} update
     * @memberof DBUpdateLog
     * @instance
     */
    DBUpdateLog.prototype.update = 0;

    /**
     * DBUpdateLog result.
     * @member {number} result
     * @memberof DBUpdateLog
     * @instance
     */
    DBUpdateLog.prototype.result = 0;

    /**
     * DBUpdateLog reason.
     * @member {Reason} reason
     * @memberof DBUpdateLog
     * @instance
     */
    DBUpdateLog.prototype.reason = 1;

    /**
     * DBUpdateLog time.
     * @member {string} time
     * @memberof DBUpdateLog
     * @instance
     */
    DBUpdateLog.prototype.time = "";

    /**
     * DBUpdateLog note.
     * @member {string} note
     * @memberof DBUpdateLog
     * @instance
     */
    DBUpdateLog.prototype.note = "";

    /**
     * Creates a new DBUpdateLog instance using the specified properties.
     * @function create
     * @memberof DBUpdateLog
     * @static
     * @param {IDBUpdateLog=} [properties] Properties to set
     * @returns {DBUpdateLog} DBUpdateLog instance
     */
    DBUpdateLog.create = function create(properties) {
        return new DBUpdateLog(properties);
    };

    /**
     * Encodes the specified DBUpdateLog message. Does not implicitly {@link DBUpdateLog.verify|verify} messages.
     * @function encode
     * @memberof DBUpdateLog
     * @static
     * @param {IDBUpdateLog} message DBUpdateLog message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DBUpdateLog.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.pid != null && message.hasOwnProperty("pid"))
            writer.uint32(/* id 1, wireType 1 =*/9).double(message.pid);
        if (message.propID != null && message.hasOwnProperty("propID"))
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.propID);
        if (message.update != null && message.hasOwnProperty("update"))
            writer.uint32(/* id 3, wireType 1 =*/25).double(message.update);
        if (message.result != null && message.hasOwnProperty("result"))
            writer.uint32(/* id 4, wireType 1 =*/33).double(message.result);
        if (message.reason != null && message.hasOwnProperty("reason"))
            writer.uint32(/* id 5, wireType 0 =*/40).int32(message.reason);
        if (message.time != null && message.hasOwnProperty("time"))
            writer.uint32(/* id 6, wireType 2 =*/50).string(message.time);
        if (message.note != null && message.hasOwnProperty("note"))
            writer.uint32(/* id 7, wireType 2 =*/58).string(message.note);
        return writer;
    };

    /**
     * Encodes the specified DBUpdateLog message, length delimited. Does not implicitly {@link DBUpdateLog.verify|verify} messages.
     * @function encodeDelimited
     * @memberof DBUpdateLog
     * @static
     * @param {IDBUpdateLog} message DBUpdateLog message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DBUpdateLog.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a DBUpdateLog message from the specified reader or buffer.
     * @function decode
     * @memberof DBUpdateLog
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {DBUpdateLog} DBUpdateLog
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DBUpdateLog.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.DBUpdateLog();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.pid = reader.double();
                break;
            case 2:
                message.propID = reader.int32();
                break;
            case 3:
                message.update = reader.double();
                break;
            case 4:
                message.result = reader.double();
                break;
            case 5:
                message.reason = reader.int32();
                break;
            case 6:
                message.time = reader.string();
                break;
            case 7:
                message.note = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a DBUpdateLog message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof DBUpdateLog
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {DBUpdateLog} DBUpdateLog
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DBUpdateLog.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a DBUpdateLog message.
     * @function verify
     * @memberof DBUpdateLog
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    DBUpdateLog.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.pid != null && message.hasOwnProperty("pid"))
            if (typeof message.pid !== "number")
                return "pid: number expected";
        if (message.propID != null && message.hasOwnProperty("propID"))
            switch (message.propID) {
            default:
                return "propID: enum value expected";
            case 1:
            case 1025:
                break;
            }
        if (message.update != null && message.hasOwnProperty("update"))
            if (typeof message.update !== "number")
                return "update: number expected";
        if (message.result != null && message.hasOwnProperty("result"))
            if (typeof message.result !== "number")
                return "result: number expected";
        if (message.reason != null && message.hasOwnProperty("reason"))
            switch (message.reason) {
            default:
                return "reason: enum value expected";
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
            case 12:
            case 13:
            case 14:
                break;
            }
        if (message.time != null && message.hasOwnProperty("time"))
            if (!$util.isString(message.time))
                return "time: string expected";
        if (message.note != null && message.hasOwnProperty("note"))
            if (!$util.isString(message.note))
                return "note: string expected";
        return null;
    };

    /**
     * Creates a DBUpdateLog message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof DBUpdateLog
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {DBUpdateLog} DBUpdateLog
     */
    DBUpdateLog.fromObject = function fromObject(object) {
        if (object instanceof $root.DBUpdateLog)
            return object;
        var message = new $root.DBUpdateLog();
        if (object.pid != null)
            message.pid = Number(object.pid);
        switch (object.propID) {
        case "COIN":
        case 1:
            message.propID = 1;
            break;
        case "SUBCOIN":
        case 1025:
            message.propID = 1025;
            break;
        }
        if (object.update != null)
            message.update = Number(object.update);
        if (object.result != null)
            message.result = Number(object.result);
        switch (object.reason) {
        case "STATIC_AD":
        case 1:
            message.reason = 1;
            break;
        case "ANIMATE_AD":
        case 2:
            message.reason = 2;
            break;
        case "VIEW_RECORD":
        case 3:
            message.reason = 3;
            break;
        case "SHOP_RECHARGE":
        case 4:
            message.reason = 4;
            break;
        case "KING3_UNLOCK":
        case 5:
            message.reason = 5;
            break;
        case "POWER7_UNLOCK":
        case 6:
            message.reason = 6;
            break;
        case "KING3_REFUND":
        case 7:
            message.reason = 7;
            break;
        case "POWER7_REFUND":
        case 8:
            message.reason = 8;
            break;
        case "IMPAWN_REFUND":
        case 9:
            message.reason = 9;
            break;
        case "ALTER_NICKNAME":
        case 10:
            message.reason = 10;
            break;
        case "MAIL_SEND_GIFT":
        case 11:
            message.reason = 11;
            break;
        case "TICKET_EXCHANGE":
        case 12:
            message.reason = 12;
            break;
        case "SIGNIN_AWARD":
        case 13:
            message.reason = 13;
            break;
        case "SYSTEM_AWARD":
        case 14:
            message.reason = 14;
            break;
        }
        if (object.time != null)
            message.time = String(object.time);
        if (object.note != null)
            message.note = String(object.note);
        return message;
    };

    /**
     * Creates a plain object from a DBUpdateLog message. Also converts values to other types if specified.
     * @function toObject
     * @memberof DBUpdateLog
     * @static
     * @param {DBUpdateLog} message DBUpdateLog
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    DBUpdateLog.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.pid = 0;
            object.propID = options.enums === String ? "COIN" : 1;
            object.update = 0;
            object.result = 0;
            object.reason = options.enums === String ? "STATIC_AD" : 1;
            object.time = "";
            object.note = "";
        }
        if (message.pid != null && message.hasOwnProperty("pid"))
            object.pid = options.json && !isFinite(message.pid) ? String(message.pid) : message.pid;
        if (message.propID != null && message.hasOwnProperty("propID"))
            object.propID = options.enums === String ? $root.PropID[message.propID] : message.propID;
        if (message.update != null && message.hasOwnProperty("update"))
            object.update = options.json && !isFinite(message.update) ? String(message.update) : message.update;
        if (message.result != null && message.hasOwnProperty("result"))
            object.result = options.json && !isFinite(message.result) ? String(message.result) : message.result;
        if (message.reason != null && message.hasOwnProperty("reason"))
            object.reason = options.enums === String ? $root.Reason[message.reason] : message.reason;
        if (message.time != null && message.hasOwnProperty("time"))
            object.time = message.time;
        if (message.note != null && message.hasOwnProperty("note"))
            object.note = message.note;
        return object;
    };

    /**
     * Converts this DBUpdateLog to JSON.
     * @function toJSON
     * @memberof DBUpdateLog
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    DBUpdateLog.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return DBUpdateLog;
})();

$root.DB3KingLog = (function() {

    /**
     * Properties of a DB3KingLog.
     * @exports IDB3KingLog
     * @interface IDB3KingLog
     * @property {number|null} [pid] DB3KingLog pid
     * @property {number|null} [costCoin] DB3KingLog costCoin
     * @property {number|null} [gainCoin] DB3KingLog gainCoin
     * @property {number|null} [resultCoin] DB3KingLog resultCoin
     * @property {number|null} [action] DB3KingLog action
     * @property {number|null} [round] DB3KingLog round
     * @property {string|null} [time] DB3KingLog time
     */

    /**
     * Constructs a new DB3KingLog.
     * @exports DB3KingLog
     * @classdesc Represents a DB3KingLog.
     * @implements IDB3KingLog
     * @constructor
     * @param {IDB3KingLog=} [properties] Properties to set
     */
    function DB3KingLog(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * DB3KingLog pid.
     * @member {number} pid
     * @memberof DB3KingLog
     * @instance
     */
    DB3KingLog.prototype.pid = 0;

    /**
     * DB3KingLog costCoin.
     * @member {number} costCoin
     * @memberof DB3KingLog
     * @instance
     */
    DB3KingLog.prototype.costCoin = 0;

    /**
     * DB3KingLog gainCoin.
     * @member {number} gainCoin
     * @memberof DB3KingLog
     * @instance
     */
    DB3KingLog.prototype.gainCoin = 0;

    /**
     * DB3KingLog resultCoin.
     * @member {number} resultCoin
     * @memberof DB3KingLog
     * @instance
     */
    DB3KingLog.prototype.resultCoin = 0;

    /**
     * DB3KingLog action.
     * @member {number} action
     * @memberof DB3KingLog
     * @instance
     */
    DB3KingLog.prototype.action = 0;

    /**
     * DB3KingLog round.
     * @member {number} round
     * @memberof DB3KingLog
     * @instance
     */
    DB3KingLog.prototype.round = 0;

    /**
     * DB3KingLog time.
     * @member {string} time
     * @memberof DB3KingLog
     * @instance
     */
    DB3KingLog.prototype.time = "";

    /**
     * Creates a new DB3KingLog instance using the specified properties.
     * @function create
     * @memberof DB3KingLog
     * @static
     * @param {IDB3KingLog=} [properties] Properties to set
     * @returns {DB3KingLog} DB3KingLog instance
     */
    DB3KingLog.create = function create(properties) {
        return new DB3KingLog(properties);
    };

    /**
     * Encodes the specified DB3KingLog message. Does not implicitly {@link DB3KingLog.verify|verify} messages.
     * @function encode
     * @memberof DB3KingLog
     * @static
     * @param {IDB3KingLog} message DB3KingLog message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DB3KingLog.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.pid != null && message.hasOwnProperty("pid"))
            writer.uint32(/* id 1, wireType 1 =*/9).double(message.pid);
        if (message.costCoin != null && message.hasOwnProperty("costCoin"))
            writer.uint32(/* id 2, wireType 1 =*/17).double(message.costCoin);
        if (message.gainCoin != null && message.hasOwnProperty("gainCoin"))
            writer.uint32(/* id 3, wireType 1 =*/25).double(message.gainCoin);
        if (message.resultCoin != null && message.hasOwnProperty("resultCoin"))
            writer.uint32(/* id 4, wireType 1 =*/33).double(message.resultCoin);
        if (message.action != null && message.hasOwnProperty("action"))
            writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.action);
        if (message.round != null && message.hasOwnProperty("round"))
            writer.uint32(/* id 6, wireType 0 =*/48).uint32(message.round);
        if (message.time != null && message.hasOwnProperty("time"))
            writer.uint32(/* id 7, wireType 2 =*/58).string(message.time);
        return writer;
    };

    /**
     * Encodes the specified DB3KingLog message, length delimited. Does not implicitly {@link DB3KingLog.verify|verify} messages.
     * @function encodeDelimited
     * @memberof DB3KingLog
     * @static
     * @param {IDB3KingLog} message DB3KingLog message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DB3KingLog.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a DB3KingLog message from the specified reader or buffer.
     * @function decode
     * @memberof DB3KingLog
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {DB3KingLog} DB3KingLog
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DB3KingLog.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.DB3KingLog();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.pid = reader.double();
                break;
            case 2:
                message.costCoin = reader.double();
                break;
            case 3:
                message.gainCoin = reader.double();
                break;
            case 4:
                message.resultCoin = reader.double();
                break;
            case 5:
                message.action = reader.uint32();
                break;
            case 6:
                message.round = reader.uint32();
                break;
            case 7:
                message.time = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a DB3KingLog message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof DB3KingLog
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {DB3KingLog} DB3KingLog
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DB3KingLog.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a DB3KingLog message.
     * @function verify
     * @memberof DB3KingLog
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    DB3KingLog.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.pid != null && message.hasOwnProperty("pid"))
            if (typeof message.pid !== "number")
                return "pid: number expected";
        if (message.costCoin != null && message.hasOwnProperty("costCoin"))
            if (typeof message.costCoin !== "number")
                return "costCoin: number expected";
        if (message.gainCoin != null && message.hasOwnProperty("gainCoin"))
            if (typeof message.gainCoin !== "number")
                return "gainCoin: number expected";
        if (message.resultCoin != null && message.hasOwnProperty("resultCoin"))
            if (typeof message.resultCoin !== "number")
                return "resultCoin: number expected";
        if (message.action != null && message.hasOwnProperty("action"))
            if (!$util.isInteger(message.action))
                return "action: integer expected";
        if (message.round != null && message.hasOwnProperty("round"))
            if (!$util.isInteger(message.round))
                return "round: integer expected";
        if (message.time != null && message.hasOwnProperty("time"))
            if (!$util.isString(message.time))
                return "time: string expected";
        return null;
    };

    /**
     * Creates a DB3KingLog message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof DB3KingLog
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {DB3KingLog} DB3KingLog
     */
    DB3KingLog.fromObject = function fromObject(object) {
        if (object instanceof $root.DB3KingLog)
            return object;
        var message = new $root.DB3KingLog();
        if (object.pid != null)
            message.pid = Number(object.pid);
        if (object.costCoin != null)
            message.costCoin = Number(object.costCoin);
        if (object.gainCoin != null)
            message.gainCoin = Number(object.gainCoin);
        if (object.resultCoin != null)
            message.resultCoin = Number(object.resultCoin);
        if (object.action != null)
            message.action = object.action >>> 0;
        if (object.round != null)
            message.round = object.round >>> 0;
        if (object.time != null)
            message.time = String(object.time);
        return message;
    };

    /**
     * Creates a plain object from a DB3KingLog message. Also converts values to other types if specified.
     * @function toObject
     * @memberof DB3KingLog
     * @static
     * @param {DB3KingLog} message DB3KingLog
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    DB3KingLog.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.pid = 0;
            object.costCoin = 0;
            object.gainCoin = 0;
            object.resultCoin = 0;
            object.action = 0;
            object.round = 0;
            object.time = "";
        }
        if (message.pid != null && message.hasOwnProperty("pid"))
            object.pid = options.json && !isFinite(message.pid) ? String(message.pid) : message.pid;
        if (message.costCoin != null && message.hasOwnProperty("costCoin"))
            object.costCoin = options.json && !isFinite(message.costCoin) ? String(message.costCoin) : message.costCoin;
        if (message.gainCoin != null && message.hasOwnProperty("gainCoin"))
            object.gainCoin = options.json && !isFinite(message.gainCoin) ? String(message.gainCoin) : message.gainCoin;
        if (message.resultCoin != null && message.hasOwnProperty("resultCoin"))
            object.resultCoin = options.json && !isFinite(message.resultCoin) ? String(message.resultCoin) : message.resultCoin;
        if (message.action != null && message.hasOwnProperty("action"))
            object.action = message.action;
        if (message.round != null && message.hasOwnProperty("round"))
            object.round = message.round;
        if (message.time != null && message.hasOwnProperty("time"))
            object.time = message.time;
        return object;
    };

    /**
     * Converts this DB3KingLog to JSON.
     * @function toJSON
     * @memberof DB3KingLog
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    DB3KingLog.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return DB3KingLog;
})();

$root.DB7PowerLog = (function() {

    /**
     * Properties of a DB7PowerLog.
     * @exports IDB7PowerLog
     * @interface IDB7PowerLog
     * @property {number|null} [pid] DB7PowerLog pid
     * @property {number|null} [costCoin] DB7PowerLog costCoin
     * @property {number|null} [gainCoin] DB7PowerLog gainCoin
     * @property {number|null} [resultCoin] DB7PowerLog resultCoin
     * @property {number|null} [role] DB7PowerLog role
     * @property {number|null} [round] DB7PowerLog round
     * @property {string|null} [time] DB7PowerLog time
     */

    /**
     * Constructs a new DB7PowerLog.
     * @exports DB7PowerLog
     * @classdesc Represents a DB7PowerLog.
     * @implements IDB7PowerLog
     * @constructor
     * @param {IDB7PowerLog=} [properties] Properties to set
     */
    function DB7PowerLog(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * DB7PowerLog pid.
     * @member {number} pid
     * @memberof DB7PowerLog
     * @instance
     */
    DB7PowerLog.prototype.pid = 0;

    /**
     * DB7PowerLog costCoin.
     * @member {number} costCoin
     * @memberof DB7PowerLog
     * @instance
     */
    DB7PowerLog.prototype.costCoin = 0;

    /**
     * DB7PowerLog gainCoin.
     * @member {number} gainCoin
     * @memberof DB7PowerLog
     * @instance
     */
    DB7PowerLog.prototype.gainCoin = 0;

    /**
     * DB7PowerLog resultCoin.
     * @member {number} resultCoin
     * @memberof DB7PowerLog
     * @instance
     */
    DB7PowerLog.prototype.resultCoin = 0;

    /**
     * DB7PowerLog role.
     * @member {number} role
     * @memberof DB7PowerLog
     * @instance
     */
    DB7PowerLog.prototype.role = 0;

    /**
     * DB7PowerLog round.
     * @member {number} round
     * @memberof DB7PowerLog
     * @instance
     */
    DB7PowerLog.prototype.round = 0;

    /**
     * DB7PowerLog time.
     * @member {string} time
     * @memberof DB7PowerLog
     * @instance
     */
    DB7PowerLog.prototype.time = "";

    /**
     * Creates a new DB7PowerLog instance using the specified properties.
     * @function create
     * @memberof DB7PowerLog
     * @static
     * @param {IDB7PowerLog=} [properties] Properties to set
     * @returns {DB7PowerLog} DB7PowerLog instance
     */
    DB7PowerLog.create = function create(properties) {
        return new DB7PowerLog(properties);
    };

    /**
     * Encodes the specified DB7PowerLog message. Does not implicitly {@link DB7PowerLog.verify|verify} messages.
     * @function encode
     * @memberof DB7PowerLog
     * @static
     * @param {IDB7PowerLog} message DB7PowerLog message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DB7PowerLog.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.pid != null && message.hasOwnProperty("pid"))
            writer.uint32(/* id 1, wireType 1 =*/9).double(message.pid);
        if (message.costCoin != null && message.hasOwnProperty("costCoin"))
            writer.uint32(/* id 2, wireType 1 =*/17).double(message.costCoin);
        if (message.gainCoin != null && message.hasOwnProperty("gainCoin"))
            writer.uint32(/* id 3, wireType 1 =*/25).double(message.gainCoin);
        if (message.resultCoin != null && message.hasOwnProperty("resultCoin"))
            writer.uint32(/* id 4, wireType 1 =*/33).double(message.resultCoin);
        if (message.role != null && message.hasOwnProperty("role"))
            writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.role);
        if (message.round != null && message.hasOwnProperty("round"))
            writer.uint32(/* id 6, wireType 0 =*/48).uint32(message.round);
        if (message.time != null && message.hasOwnProperty("time"))
            writer.uint32(/* id 7, wireType 2 =*/58).string(message.time);
        return writer;
    };

    /**
     * Encodes the specified DB7PowerLog message, length delimited. Does not implicitly {@link DB7PowerLog.verify|verify} messages.
     * @function encodeDelimited
     * @memberof DB7PowerLog
     * @static
     * @param {IDB7PowerLog} message DB7PowerLog message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DB7PowerLog.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a DB7PowerLog message from the specified reader or buffer.
     * @function decode
     * @memberof DB7PowerLog
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {DB7PowerLog} DB7PowerLog
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DB7PowerLog.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.DB7PowerLog();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.pid = reader.double();
                break;
            case 2:
                message.costCoin = reader.double();
                break;
            case 3:
                message.gainCoin = reader.double();
                break;
            case 4:
                message.resultCoin = reader.double();
                break;
            case 5:
                message.role = reader.uint32();
                break;
            case 6:
                message.round = reader.uint32();
                break;
            case 7:
                message.time = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a DB7PowerLog message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof DB7PowerLog
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {DB7PowerLog} DB7PowerLog
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DB7PowerLog.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a DB7PowerLog message.
     * @function verify
     * @memberof DB7PowerLog
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    DB7PowerLog.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.pid != null && message.hasOwnProperty("pid"))
            if (typeof message.pid !== "number")
                return "pid: number expected";
        if (message.costCoin != null && message.hasOwnProperty("costCoin"))
            if (typeof message.costCoin !== "number")
                return "costCoin: number expected";
        if (message.gainCoin != null && message.hasOwnProperty("gainCoin"))
            if (typeof message.gainCoin !== "number")
                return "gainCoin: number expected";
        if (message.resultCoin != null && message.hasOwnProperty("resultCoin"))
            if (typeof message.resultCoin !== "number")
                return "resultCoin: number expected";
        if (message.role != null && message.hasOwnProperty("role"))
            if (!$util.isInteger(message.role))
                return "role: integer expected";
        if (message.round != null && message.hasOwnProperty("round"))
            if (!$util.isInteger(message.round))
                return "round: integer expected";
        if (message.time != null && message.hasOwnProperty("time"))
            if (!$util.isString(message.time))
                return "time: string expected";
        return null;
    };

    /**
     * Creates a DB7PowerLog message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof DB7PowerLog
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {DB7PowerLog} DB7PowerLog
     */
    DB7PowerLog.fromObject = function fromObject(object) {
        if (object instanceof $root.DB7PowerLog)
            return object;
        var message = new $root.DB7PowerLog();
        if (object.pid != null)
            message.pid = Number(object.pid);
        if (object.costCoin != null)
            message.costCoin = Number(object.costCoin);
        if (object.gainCoin != null)
            message.gainCoin = Number(object.gainCoin);
        if (object.resultCoin != null)
            message.resultCoin = Number(object.resultCoin);
        if (object.role != null)
            message.role = object.role >>> 0;
        if (object.round != null)
            message.round = object.round >>> 0;
        if (object.time != null)
            message.time = String(object.time);
        return message;
    };

    /**
     * Creates a plain object from a DB7PowerLog message. Also converts values to other types if specified.
     * @function toObject
     * @memberof DB7PowerLog
     * @static
     * @param {DB7PowerLog} message DB7PowerLog
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    DB7PowerLog.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.pid = 0;
            object.costCoin = 0;
            object.gainCoin = 0;
            object.resultCoin = 0;
            object.role = 0;
            object.round = 0;
            object.time = "";
        }
        if (message.pid != null && message.hasOwnProperty("pid"))
            object.pid = options.json && !isFinite(message.pid) ? String(message.pid) : message.pid;
        if (message.costCoin != null && message.hasOwnProperty("costCoin"))
            object.costCoin = options.json && !isFinite(message.costCoin) ? String(message.costCoin) : message.costCoin;
        if (message.gainCoin != null && message.hasOwnProperty("gainCoin"))
            object.gainCoin = options.json && !isFinite(message.gainCoin) ? String(message.gainCoin) : message.gainCoin;
        if (message.resultCoin != null && message.hasOwnProperty("resultCoin"))
            object.resultCoin = options.json && !isFinite(message.resultCoin) ? String(message.resultCoin) : message.resultCoin;
        if (message.role != null && message.hasOwnProperty("role"))
            object.role = message.role;
        if (message.round != null && message.hasOwnProperty("round"))
            object.round = message.round;
        if (message.time != null && message.hasOwnProperty("time"))
            object.time = message.time;
        return object;
    };

    /**
     * Converts this DB7PowerLog to JSON.
     * @function toJSON
     * @memberof DB7PowerLog
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    DB7PowerLog.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return DB7PowerLog;
})();

$root.DBImpawnLog = (function() {

    /**
     * Properties of a DBImpawnLog.
     * @exports IDBImpawnLog
     * @interface IDBImpawnLog
     * @property {number|null} [pid] DBImpawnLog pid
     * @property {number|null} [costCoin] DBImpawnLog costCoin
     * @property {number|null} [costSubcoin] DBImpawnLog costSubcoin
     * @property {number|null} [gainCoin] DBImpawnLog gainCoin
     * @property {number|null} [gainSubcoin] DBImpawnLog gainSubcoin
     * @property {number|null} [resultCoin] DBImpawnLog resultCoin
     * @property {number|null} [resultSubcoin] DBImpawnLog resultSubcoin
     * @property {number|null} [object] DBImpawnLog object
     * @property {number|null} [round] DBImpawnLog round
     * @property {string|null} [time] DBImpawnLog time
     */

    /**
     * Constructs a new DBImpawnLog.
     * @exports DBImpawnLog
     * @classdesc Represents a DBImpawnLog.
     * @implements IDBImpawnLog
     * @constructor
     * @param {IDBImpawnLog=} [properties] Properties to set
     */
    function DBImpawnLog(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * DBImpawnLog pid.
     * @member {number} pid
     * @memberof DBImpawnLog
     * @instance
     */
    DBImpawnLog.prototype.pid = 0;

    /**
     * DBImpawnLog costCoin.
     * @member {number} costCoin
     * @memberof DBImpawnLog
     * @instance
     */
    DBImpawnLog.prototype.costCoin = 0;

    /**
     * DBImpawnLog costSubcoin.
     * @member {number} costSubcoin
     * @memberof DBImpawnLog
     * @instance
     */
    DBImpawnLog.prototype.costSubcoin = 0;

    /**
     * DBImpawnLog gainCoin.
     * @member {number} gainCoin
     * @memberof DBImpawnLog
     * @instance
     */
    DBImpawnLog.prototype.gainCoin = 0;

    /**
     * DBImpawnLog gainSubcoin.
     * @member {number} gainSubcoin
     * @memberof DBImpawnLog
     * @instance
     */
    DBImpawnLog.prototype.gainSubcoin = 0;

    /**
     * DBImpawnLog resultCoin.
     * @member {number} resultCoin
     * @memberof DBImpawnLog
     * @instance
     */
    DBImpawnLog.prototype.resultCoin = 0;

    /**
     * DBImpawnLog resultSubcoin.
     * @member {number} resultSubcoin
     * @memberof DBImpawnLog
     * @instance
     */
    DBImpawnLog.prototype.resultSubcoin = 0;

    /**
     * DBImpawnLog object.
     * @member {number} object
     * @memberof DBImpawnLog
     * @instance
     */
    DBImpawnLog.prototype.object = 0;

    /**
     * DBImpawnLog round.
     * @member {number} round
     * @memberof DBImpawnLog
     * @instance
     */
    DBImpawnLog.prototype.round = 0;

    /**
     * DBImpawnLog time.
     * @member {string} time
     * @memberof DBImpawnLog
     * @instance
     */
    DBImpawnLog.prototype.time = "";

    /**
     * Creates a new DBImpawnLog instance using the specified properties.
     * @function create
     * @memberof DBImpawnLog
     * @static
     * @param {IDBImpawnLog=} [properties] Properties to set
     * @returns {DBImpawnLog} DBImpawnLog instance
     */
    DBImpawnLog.create = function create(properties) {
        return new DBImpawnLog(properties);
    };

    /**
     * Encodes the specified DBImpawnLog message. Does not implicitly {@link DBImpawnLog.verify|verify} messages.
     * @function encode
     * @memberof DBImpawnLog
     * @static
     * @param {IDBImpawnLog} message DBImpawnLog message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DBImpawnLog.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.pid != null && message.hasOwnProperty("pid"))
            writer.uint32(/* id 1, wireType 1 =*/9).double(message.pid);
        if (message.costCoin != null && message.hasOwnProperty("costCoin"))
            writer.uint32(/* id 2, wireType 1 =*/17).double(message.costCoin);
        if (message.costSubcoin != null && message.hasOwnProperty("costSubcoin"))
            writer.uint32(/* id 3, wireType 1 =*/25).double(message.costSubcoin);
        if (message.gainCoin != null && message.hasOwnProperty("gainCoin"))
            writer.uint32(/* id 4, wireType 1 =*/33).double(message.gainCoin);
        if (message.gainSubcoin != null && message.hasOwnProperty("gainSubcoin"))
            writer.uint32(/* id 5, wireType 1 =*/41).double(message.gainSubcoin);
        if (message.resultCoin != null && message.hasOwnProperty("resultCoin"))
            writer.uint32(/* id 6, wireType 1 =*/49).double(message.resultCoin);
        if (message.resultSubcoin != null && message.hasOwnProperty("resultSubcoin"))
            writer.uint32(/* id 7, wireType 1 =*/57).double(message.resultSubcoin);
        if (message.object != null && message.hasOwnProperty("object"))
            writer.uint32(/* id 8, wireType 0 =*/64).uint32(message.object);
        if (message.round != null && message.hasOwnProperty("round"))
            writer.uint32(/* id 9, wireType 0 =*/72).uint32(message.round);
        if (message.time != null && message.hasOwnProperty("time"))
            writer.uint32(/* id 10, wireType 2 =*/82).string(message.time);
        return writer;
    };

    /**
     * Encodes the specified DBImpawnLog message, length delimited. Does not implicitly {@link DBImpawnLog.verify|verify} messages.
     * @function encodeDelimited
     * @memberof DBImpawnLog
     * @static
     * @param {IDBImpawnLog} message DBImpawnLog message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DBImpawnLog.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a DBImpawnLog message from the specified reader or buffer.
     * @function decode
     * @memberof DBImpawnLog
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {DBImpawnLog} DBImpawnLog
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DBImpawnLog.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.DBImpawnLog();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.pid = reader.double();
                break;
            case 2:
                message.costCoin = reader.double();
                break;
            case 3:
                message.costSubcoin = reader.double();
                break;
            case 4:
                message.gainCoin = reader.double();
                break;
            case 5:
                message.gainSubcoin = reader.double();
                break;
            case 6:
                message.resultCoin = reader.double();
                break;
            case 7:
                message.resultSubcoin = reader.double();
                break;
            case 8:
                message.object = reader.uint32();
                break;
            case 9:
                message.round = reader.uint32();
                break;
            case 10:
                message.time = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a DBImpawnLog message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof DBImpawnLog
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {DBImpawnLog} DBImpawnLog
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DBImpawnLog.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a DBImpawnLog message.
     * @function verify
     * @memberof DBImpawnLog
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    DBImpawnLog.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.pid != null && message.hasOwnProperty("pid"))
            if (typeof message.pid !== "number")
                return "pid: number expected";
        if (message.costCoin != null && message.hasOwnProperty("costCoin"))
            if (typeof message.costCoin !== "number")
                return "costCoin: number expected";
        if (message.costSubcoin != null && message.hasOwnProperty("costSubcoin"))
            if (typeof message.costSubcoin !== "number")
                return "costSubcoin: number expected";
        if (message.gainCoin != null && message.hasOwnProperty("gainCoin"))
            if (typeof message.gainCoin !== "number")
                return "gainCoin: number expected";
        if (message.gainSubcoin != null && message.hasOwnProperty("gainSubcoin"))
            if (typeof message.gainSubcoin !== "number")
                return "gainSubcoin: number expected";
        if (message.resultCoin != null && message.hasOwnProperty("resultCoin"))
            if (typeof message.resultCoin !== "number")
                return "resultCoin: number expected";
        if (message.resultSubcoin != null && message.hasOwnProperty("resultSubcoin"))
            if (typeof message.resultSubcoin !== "number")
                return "resultSubcoin: number expected";
        if (message.object != null && message.hasOwnProperty("object"))
            if (!$util.isInteger(message.object))
                return "object: integer expected";
        if (message.round != null && message.hasOwnProperty("round"))
            if (!$util.isInteger(message.round))
                return "round: integer expected";
        if (message.time != null && message.hasOwnProperty("time"))
            if (!$util.isString(message.time))
                return "time: string expected";
        return null;
    };

    /**
     * Creates a DBImpawnLog message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof DBImpawnLog
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {DBImpawnLog} DBImpawnLog
     */
    DBImpawnLog.fromObject = function fromObject(object) {
        if (object instanceof $root.DBImpawnLog)
            return object;
        var message = new $root.DBImpawnLog();
        if (object.pid != null)
            message.pid = Number(object.pid);
        if (object.costCoin != null)
            message.costCoin = Number(object.costCoin);
        if (object.costSubcoin != null)
            message.costSubcoin = Number(object.costSubcoin);
        if (object.gainCoin != null)
            message.gainCoin = Number(object.gainCoin);
        if (object.gainSubcoin != null)
            message.gainSubcoin = Number(object.gainSubcoin);
        if (object.resultCoin != null)
            message.resultCoin = Number(object.resultCoin);
        if (object.resultSubcoin != null)
            message.resultSubcoin = Number(object.resultSubcoin);
        if (object.object != null)
            message.object = object.object >>> 0;
        if (object.round != null)
            message.round = object.round >>> 0;
        if (object.time != null)
            message.time = String(object.time);
        return message;
    };

    /**
     * Creates a plain object from a DBImpawnLog message. Also converts values to other types if specified.
     * @function toObject
     * @memberof DBImpawnLog
     * @static
     * @param {DBImpawnLog} message DBImpawnLog
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    DBImpawnLog.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.pid = 0;
            object.costCoin = 0;
            object.costSubcoin = 0;
            object.gainCoin = 0;
            object.gainSubcoin = 0;
            object.resultCoin = 0;
            object.resultSubcoin = 0;
            object.object = 0;
            object.round = 0;
            object.time = "";
        }
        if (message.pid != null && message.hasOwnProperty("pid"))
            object.pid = options.json && !isFinite(message.pid) ? String(message.pid) : message.pid;
        if (message.costCoin != null && message.hasOwnProperty("costCoin"))
            object.costCoin = options.json && !isFinite(message.costCoin) ? String(message.costCoin) : message.costCoin;
        if (message.costSubcoin != null && message.hasOwnProperty("costSubcoin"))
            object.costSubcoin = options.json && !isFinite(message.costSubcoin) ? String(message.costSubcoin) : message.costSubcoin;
        if (message.gainCoin != null && message.hasOwnProperty("gainCoin"))
            object.gainCoin = options.json && !isFinite(message.gainCoin) ? String(message.gainCoin) : message.gainCoin;
        if (message.gainSubcoin != null && message.hasOwnProperty("gainSubcoin"))
            object.gainSubcoin = options.json && !isFinite(message.gainSubcoin) ? String(message.gainSubcoin) : message.gainSubcoin;
        if (message.resultCoin != null && message.hasOwnProperty("resultCoin"))
            object.resultCoin = options.json && !isFinite(message.resultCoin) ? String(message.resultCoin) : message.resultCoin;
        if (message.resultSubcoin != null && message.hasOwnProperty("resultSubcoin"))
            object.resultSubcoin = options.json && !isFinite(message.resultSubcoin) ? String(message.resultSubcoin) : message.resultSubcoin;
        if (message.object != null && message.hasOwnProperty("object"))
            object.object = message.object;
        if (message.round != null && message.hasOwnProperty("round"))
            object.round = message.round;
        if (message.time != null && message.hasOwnProperty("time"))
            object.time = message.time;
        return object;
    };

    /**
     * Converts this DBImpawnLog to JSON.
     * @function toJSON
     * @memberof DBImpawnLog
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    DBImpawnLog.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return DBImpawnLog;
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
