/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = protobuf;

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.MSG_IMPAWN_GAMEINFO_IMCL = (function() {

    /**
     * Properties of a MSG_IMPAWN_GAMEINFO_IMCL.
     * @exports IMSG_IMPAWN_GAMEINFO_IMCL
     * @interface IMSG_IMPAWN_GAMEINFO_IMCL
     * @property {number} msgID MSG_IMPAWN_GAMEINFO_IMCL msgID
     * @property {number|null} [pid] MSG_IMPAWN_GAMEINFO_IMCL pid
     * @property {number|null} [chuImpawnTotal] MSG_IMPAWN_GAMEINFO_IMCL chuImpawnTotal
     * @property {number|null} [hanImpawnTotal] MSG_IMPAWN_GAMEINFO_IMCL hanImpawnTotal
     * @property {number|null} [chuAwardRate] MSG_IMPAWN_GAMEINFO_IMCL chuAwardRate
     * @property {number|null} [hanAwardRate] MSG_IMPAWN_GAMEINFO_IMCL hanAwardRate
     * @property {number|null} [playerChuImpawnTimes] MSG_IMPAWN_GAMEINFO_IMCL playerChuImpawnTimes
     * @property {number|null} [playerHanImpawnTimes] MSG_IMPAWN_GAMEINFO_IMCL playerHanImpawnTimes
     * @property {number|null} [playerChuImpawnTotal] MSG_IMPAWN_GAMEINFO_IMCL playerChuImpawnTotal
     * @property {number|null} [playerHanImpawnTotal] MSG_IMPAWN_GAMEINFO_IMCL playerHanImpawnTotal
     * @property {Array.<MSG_IMPAWN_GAMEINFO_IMCL.IImpawn>|null} [impawnList] MSG_IMPAWN_GAMEINFO_IMCL impawnList
     * @property {Array.<boolean>|null} [recordList] MSG_IMPAWN_GAMEINFO_IMCL recordList
     * @property {number|null} [chuWinRecord] MSG_IMPAWN_GAMEINFO_IMCL chuWinRecord
     * @property {number|null} [hanWinRecord] MSG_IMPAWN_GAMEINFO_IMCL hanWinRecord
     * @property {number|null} [restartHour] MSG_IMPAWN_GAMEINFO_IMCL restartHour
     * @property {number|null} [pauseHour] MSG_IMPAWN_GAMEINFO_IMCL pauseHour
     */

    /**
     * Constructs a new MSG_IMPAWN_GAMEINFO_IMCL.
     * @exports MSG_IMPAWN_GAMEINFO_IMCL
     * @classdesc Represents a MSG_IMPAWN_GAMEINFO_IMCL.
     * @implements IMSG_IMPAWN_GAMEINFO_IMCL
     * @constructor
     * @param {IMSG_IMPAWN_GAMEINFO_IMCL=} [properties] Properties to set
     */
    function MSG_IMPAWN_GAMEINFO_IMCL(properties) {
        this.impawnList = [];
        this.recordList = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MSG_IMPAWN_GAMEINFO_IMCL msgID.
     * @member {number} msgID
     * @memberof MSG_IMPAWN_GAMEINFO_IMCL
     * @instance
     */
    MSG_IMPAWN_GAMEINFO_IMCL.prototype.msgID = 0;

    /**
     * MSG_IMPAWN_GAMEINFO_IMCL pid.
     * @member {number} pid
     * @memberof MSG_IMPAWN_GAMEINFO_IMCL
     * @instance
     */
    MSG_IMPAWN_GAMEINFO_IMCL.prototype.pid = 0;

    /**
     * MSG_IMPAWN_GAMEINFO_IMCL chuImpawnTotal.
     * @member {number} chuImpawnTotal
     * @memberof MSG_IMPAWN_GAMEINFO_IMCL
     * @instance
     */
    MSG_IMPAWN_GAMEINFO_IMCL.prototype.chuImpawnTotal = 0;

    /**
     * MSG_IMPAWN_GAMEINFO_IMCL hanImpawnTotal.
     * @member {number} hanImpawnTotal
     * @memberof MSG_IMPAWN_GAMEINFO_IMCL
     * @instance
     */
    MSG_IMPAWN_GAMEINFO_IMCL.prototype.hanImpawnTotal = 0;

    /**
     * MSG_IMPAWN_GAMEINFO_IMCL chuAwardRate.
     * @member {number} chuAwardRate
     * @memberof MSG_IMPAWN_GAMEINFO_IMCL
     * @instance
     */
    MSG_IMPAWN_GAMEINFO_IMCL.prototype.chuAwardRate = 0;

    /**
     * MSG_IMPAWN_GAMEINFO_IMCL hanAwardRate.
     * @member {number} hanAwardRate
     * @memberof MSG_IMPAWN_GAMEINFO_IMCL
     * @instance
     */
    MSG_IMPAWN_GAMEINFO_IMCL.prototype.hanAwardRate = 0;

    /**
     * MSG_IMPAWN_GAMEINFO_IMCL playerChuImpawnTimes.
     * @member {number} playerChuImpawnTimes
     * @memberof MSG_IMPAWN_GAMEINFO_IMCL
     * @instance
     */
    MSG_IMPAWN_GAMEINFO_IMCL.prototype.playerChuImpawnTimes = 0;

    /**
     * MSG_IMPAWN_GAMEINFO_IMCL playerHanImpawnTimes.
     * @member {number} playerHanImpawnTimes
     * @memberof MSG_IMPAWN_GAMEINFO_IMCL
     * @instance
     */
    MSG_IMPAWN_GAMEINFO_IMCL.prototype.playerHanImpawnTimes = 0;

    /**
     * MSG_IMPAWN_GAMEINFO_IMCL playerChuImpawnTotal.
     * @member {number} playerChuImpawnTotal
     * @memberof MSG_IMPAWN_GAMEINFO_IMCL
     * @instance
     */
    MSG_IMPAWN_GAMEINFO_IMCL.prototype.playerChuImpawnTotal = 0;

    /**
     * MSG_IMPAWN_GAMEINFO_IMCL playerHanImpawnTotal.
     * @member {number} playerHanImpawnTotal
     * @memberof MSG_IMPAWN_GAMEINFO_IMCL
     * @instance
     */
    MSG_IMPAWN_GAMEINFO_IMCL.prototype.playerHanImpawnTotal = 0;

    /**
     * MSG_IMPAWN_GAMEINFO_IMCL impawnList.
     * @member {Array.<MSG_IMPAWN_GAMEINFO_IMCL.IImpawn>} impawnList
     * @memberof MSG_IMPAWN_GAMEINFO_IMCL
     * @instance
     */
    MSG_IMPAWN_GAMEINFO_IMCL.prototype.impawnList = $util.emptyArray;

    /**
     * MSG_IMPAWN_GAMEINFO_IMCL recordList.
     * @member {Array.<boolean>} recordList
     * @memberof MSG_IMPAWN_GAMEINFO_IMCL
     * @instance
     */
    MSG_IMPAWN_GAMEINFO_IMCL.prototype.recordList = $util.emptyArray;

    /**
     * MSG_IMPAWN_GAMEINFO_IMCL chuWinRecord.
     * @member {number} chuWinRecord
     * @memberof MSG_IMPAWN_GAMEINFO_IMCL
     * @instance
     */
    MSG_IMPAWN_GAMEINFO_IMCL.prototype.chuWinRecord = 0;

    /**
     * MSG_IMPAWN_GAMEINFO_IMCL hanWinRecord.
     * @member {number} hanWinRecord
     * @memberof MSG_IMPAWN_GAMEINFO_IMCL
     * @instance
     */
    MSG_IMPAWN_GAMEINFO_IMCL.prototype.hanWinRecord = 0;

    /**
     * MSG_IMPAWN_GAMEINFO_IMCL restartHour.
     * @member {number} restartHour
     * @memberof MSG_IMPAWN_GAMEINFO_IMCL
     * @instance
     */
    MSG_IMPAWN_GAMEINFO_IMCL.prototype.restartHour = 0;

    /**
     * MSG_IMPAWN_GAMEINFO_IMCL pauseHour.
     * @member {number} pauseHour
     * @memberof MSG_IMPAWN_GAMEINFO_IMCL
     * @instance
     */
    MSG_IMPAWN_GAMEINFO_IMCL.prototype.pauseHour = 0;

    /**
     * Creates a new MSG_IMPAWN_GAMEINFO_IMCL instance using the specified properties.
     * @function create
     * @memberof MSG_IMPAWN_GAMEINFO_IMCL
     * @static
     * @param {IMSG_IMPAWN_GAMEINFO_IMCL=} [properties] Properties to set
     * @returns {MSG_IMPAWN_GAMEINFO_IMCL} MSG_IMPAWN_GAMEINFO_IMCL instance
     */
    MSG_IMPAWN_GAMEINFO_IMCL.create = function create(properties) {
        return new MSG_IMPAWN_GAMEINFO_IMCL(properties);
    };

    /**
     * Encodes the specified MSG_IMPAWN_GAMEINFO_IMCL message. Does not implicitly {@link MSG_IMPAWN_GAMEINFO_IMCL.verify|verify} messages.
     * @function encode
     * @memberof MSG_IMPAWN_GAMEINFO_IMCL
     * @static
     * @param {IMSG_IMPAWN_GAMEINFO_IMCL} message MSG_IMPAWN_GAMEINFO_IMCL message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MSG_IMPAWN_GAMEINFO_IMCL.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.msgID);
        if (message.pid != null && message.hasOwnProperty("pid"))
            writer.uint32(/* id 2, wireType 1 =*/17).double(message.pid);
        if (message.chuImpawnTotal != null && message.hasOwnProperty("chuImpawnTotal"))
            writer.uint32(/* id 3, wireType 1 =*/25).double(message.chuImpawnTotal);
        if (message.hanImpawnTotal != null && message.hasOwnProperty("hanImpawnTotal"))
            writer.uint32(/* id 4, wireType 1 =*/33).double(message.hanImpawnTotal);
        if (message.chuAwardRate != null && message.hasOwnProperty("chuAwardRate"))
            writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.chuAwardRate);
        if (message.hanAwardRate != null && message.hasOwnProperty("hanAwardRate"))
            writer.uint32(/* id 6, wireType 0 =*/48).uint32(message.hanAwardRate);
        if (message.playerChuImpawnTimes != null && message.hasOwnProperty("playerChuImpawnTimes"))
            writer.uint32(/* id 7, wireType 0 =*/56).uint32(message.playerChuImpawnTimes);
        if (message.playerHanImpawnTimes != null && message.hasOwnProperty("playerHanImpawnTimes"))
            writer.uint32(/* id 8, wireType 0 =*/64).uint32(message.playerHanImpawnTimes);
        if (message.playerChuImpawnTotal != null && message.hasOwnProperty("playerChuImpawnTotal"))
            writer.uint32(/* id 9, wireType 1 =*/73).double(message.playerChuImpawnTotal);
        if (message.playerHanImpawnTotal != null && message.hasOwnProperty("playerHanImpawnTotal"))
            writer.uint32(/* id 10, wireType 1 =*/81).double(message.playerHanImpawnTotal);
        if (message.impawnList != null && message.impawnList.length)
            for (var i = 0; i < message.impawnList.length; ++i)
                $root.MSG_IMPAWN_GAMEINFO_IMCL.Impawn.encode(message.impawnList[i], writer.uint32(/* id 11, wireType 2 =*/90).fork()).ldelim();
        if (message.recordList != null && message.recordList.length)
            for (var i = 0; i < message.recordList.length; ++i)
                writer.uint32(/* id 12, wireType 0 =*/96).bool(message.recordList[i]);
        if (message.chuWinRecord != null && message.hasOwnProperty("chuWinRecord"))
            writer.uint32(/* id 13, wireType 0 =*/104).uint32(message.chuWinRecord);
        if (message.hanWinRecord != null && message.hasOwnProperty("hanWinRecord"))
            writer.uint32(/* id 14, wireType 0 =*/112).uint32(message.hanWinRecord);
        if (message.restartHour != null && message.hasOwnProperty("restartHour"))
            writer.uint32(/* id 15, wireType 0 =*/120).uint32(message.restartHour);
        if (message.pauseHour != null && message.hasOwnProperty("pauseHour"))
            writer.uint32(/* id 16, wireType 0 =*/128).uint32(message.pauseHour);
        return writer;
    };

    /**
     * Encodes the specified MSG_IMPAWN_GAMEINFO_IMCL message, length delimited. Does not implicitly {@link MSG_IMPAWN_GAMEINFO_IMCL.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MSG_IMPAWN_GAMEINFO_IMCL
     * @static
     * @param {IMSG_IMPAWN_GAMEINFO_IMCL} message MSG_IMPAWN_GAMEINFO_IMCL message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MSG_IMPAWN_GAMEINFO_IMCL.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MSG_IMPAWN_GAMEINFO_IMCL message from the specified reader or buffer.
     * @function decode
     * @memberof MSG_IMPAWN_GAMEINFO_IMCL
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MSG_IMPAWN_GAMEINFO_IMCL} MSG_IMPAWN_GAMEINFO_IMCL
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MSG_IMPAWN_GAMEINFO_IMCL.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MSG_IMPAWN_GAMEINFO_IMCL();
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
                message.chuImpawnTotal = reader.double();
                break;
            case 4:
                message.hanImpawnTotal = reader.double();
                break;
            case 5:
                message.chuAwardRate = reader.uint32();
                break;
            case 6:
                message.hanAwardRate = reader.uint32();
                break;
            case 7:
                message.playerChuImpawnTimes = reader.uint32();
                break;
            case 8:
                message.playerHanImpawnTimes = reader.uint32();
                break;
            case 9:
                message.playerChuImpawnTotal = reader.double();
                break;
            case 10:
                message.playerHanImpawnTotal = reader.double();
                break;
            case 11:
                if (!(message.impawnList && message.impawnList.length))
                    message.impawnList = [];
                message.impawnList.push($root.MSG_IMPAWN_GAMEINFO_IMCL.Impawn.decode(reader, reader.uint32()));
                break;
            case 12:
                if (!(message.recordList && message.recordList.length))
                    message.recordList = [];
                if ((tag & 7) === 2) {
                    var end2 = reader.uint32() + reader.pos;
                    while (reader.pos < end2)
                        message.recordList.push(reader.bool());
                } else
                    message.recordList.push(reader.bool());
                break;
            case 13:
                message.chuWinRecord = reader.uint32();
                break;
            case 14:
                message.hanWinRecord = reader.uint32();
                break;
            case 15:
                message.restartHour = reader.uint32();
                break;
            case 16:
                message.pauseHour = reader.uint32();
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
     * Decodes a MSG_IMPAWN_GAMEINFO_IMCL message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MSG_IMPAWN_GAMEINFO_IMCL
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MSG_IMPAWN_GAMEINFO_IMCL} MSG_IMPAWN_GAMEINFO_IMCL
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MSG_IMPAWN_GAMEINFO_IMCL.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MSG_IMPAWN_GAMEINFO_IMCL message.
     * @function verify
     * @memberof MSG_IMPAWN_GAMEINFO_IMCL
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MSG_IMPAWN_GAMEINFO_IMCL.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.msgID))
            return "msgID: integer expected";
        if (message.pid != null && message.hasOwnProperty("pid"))
            if (typeof message.pid !== "number")
                return "pid: number expected";
        if (message.chuImpawnTotal != null && message.hasOwnProperty("chuImpawnTotal"))
            if (typeof message.chuImpawnTotal !== "number")
                return "chuImpawnTotal: number expected";
        if (message.hanImpawnTotal != null && message.hasOwnProperty("hanImpawnTotal"))
            if (typeof message.hanImpawnTotal !== "number")
                return "hanImpawnTotal: number expected";
        if (message.chuAwardRate != null && message.hasOwnProperty("chuAwardRate"))
            if (!$util.isInteger(message.chuAwardRate))
                return "chuAwardRate: integer expected";
        if (message.hanAwardRate != null && message.hasOwnProperty("hanAwardRate"))
            if (!$util.isInteger(message.hanAwardRate))
                return "hanAwardRate: integer expected";
        if (message.playerChuImpawnTimes != null && message.hasOwnProperty("playerChuImpawnTimes"))
            if (!$util.isInteger(message.playerChuImpawnTimes))
                return "playerChuImpawnTimes: integer expected";
        if (message.playerHanImpawnTimes != null && message.hasOwnProperty("playerHanImpawnTimes"))
            if (!$util.isInteger(message.playerHanImpawnTimes))
                return "playerHanImpawnTimes: integer expected";
        if (message.playerChuImpawnTotal != null && message.hasOwnProperty("playerChuImpawnTotal"))
            if (typeof message.playerChuImpawnTotal !== "number")
                return "playerChuImpawnTotal: number expected";
        if (message.playerHanImpawnTotal != null && message.hasOwnProperty("playerHanImpawnTotal"))
            if (typeof message.playerHanImpawnTotal !== "number")
                return "playerHanImpawnTotal: number expected";
        if (message.impawnList != null && message.hasOwnProperty("impawnList")) {
            if (!Array.isArray(message.impawnList))
                return "impawnList: array expected";
            for (var i = 0; i < message.impawnList.length; ++i) {
                var error = $root.MSG_IMPAWN_GAMEINFO_IMCL.Impawn.verify(message.impawnList[i]);
                if (error)
                    return "impawnList." + error;
            }
        }
        if (message.recordList != null && message.hasOwnProperty("recordList")) {
            if (!Array.isArray(message.recordList))
                return "recordList: array expected";
            for (var i = 0; i < message.recordList.length; ++i)
                if (typeof message.recordList[i] !== "boolean")
                    return "recordList: boolean[] expected";
        }
        if (message.chuWinRecord != null && message.hasOwnProperty("chuWinRecord"))
            if (!$util.isInteger(message.chuWinRecord))
                return "chuWinRecord: integer expected";
        if (message.hanWinRecord != null && message.hasOwnProperty("hanWinRecord"))
            if (!$util.isInteger(message.hanWinRecord))
                return "hanWinRecord: integer expected";
        if (message.restartHour != null && message.hasOwnProperty("restartHour"))
            if (!$util.isInteger(message.restartHour))
                return "restartHour: integer expected";
        if (message.pauseHour != null && message.hasOwnProperty("pauseHour"))
            if (!$util.isInteger(message.pauseHour))
                return "pauseHour: integer expected";
        return null;
    };

    /**
     * Creates a MSG_IMPAWN_GAMEINFO_IMCL message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MSG_IMPAWN_GAMEINFO_IMCL
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MSG_IMPAWN_GAMEINFO_IMCL} MSG_IMPAWN_GAMEINFO_IMCL
     */
    MSG_IMPAWN_GAMEINFO_IMCL.fromObject = function fromObject(object) {
        if (object instanceof $root.MSG_IMPAWN_GAMEINFO_IMCL)
            return object;
        var message = new $root.MSG_IMPAWN_GAMEINFO_IMCL();
        if (object.msgID != null)
            message.msgID = object.msgID >>> 0;
        if (object.pid != null)
            message.pid = Number(object.pid);
        if (object.chuImpawnTotal != null)
            message.chuImpawnTotal = Number(object.chuImpawnTotal);
        if (object.hanImpawnTotal != null)
            message.hanImpawnTotal = Number(object.hanImpawnTotal);
        if (object.chuAwardRate != null)
            message.chuAwardRate = object.chuAwardRate >>> 0;
        if (object.hanAwardRate != null)
            message.hanAwardRate = object.hanAwardRate >>> 0;
        if (object.playerChuImpawnTimes != null)
            message.playerChuImpawnTimes = object.playerChuImpawnTimes >>> 0;
        if (object.playerHanImpawnTimes != null)
            message.playerHanImpawnTimes = object.playerHanImpawnTimes >>> 0;
        if (object.playerChuImpawnTotal != null)
            message.playerChuImpawnTotal = Number(object.playerChuImpawnTotal);
        if (object.playerHanImpawnTotal != null)
            message.playerHanImpawnTotal = Number(object.playerHanImpawnTotal);
        if (object.impawnList) {
            if (!Array.isArray(object.impawnList))
                throw TypeError(".MSG_IMPAWN_GAMEINFO_IMCL.impawnList: array expected");
            message.impawnList = [];
            for (var i = 0; i < object.impawnList.length; ++i) {
                if (typeof object.impawnList[i] !== "object")
                    throw TypeError(".MSG_IMPAWN_GAMEINFO_IMCL.impawnList: object expected");
                message.impawnList[i] = $root.MSG_IMPAWN_GAMEINFO_IMCL.Impawn.fromObject(object.impawnList[i]);
            }
        }
        if (object.recordList) {
            if (!Array.isArray(object.recordList))
                throw TypeError(".MSG_IMPAWN_GAMEINFO_IMCL.recordList: array expected");
            message.recordList = [];
            for (var i = 0; i < object.recordList.length; ++i)
                message.recordList[i] = Boolean(object.recordList[i]);
        }
        if (object.chuWinRecord != null)
            message.chuWinRecord = object.chuWinRecord >>> 0;
        if (object.hanWinRecord != null)
            message.hanWinRecord = object.hanWinRecord >>> 0;
        if (object.restartHour != null)
            message.restartHour = object.restartHour >>> 0;
        if (object.pauseHour != null)
            message.pauseHour = object.pauseHour >>> 0;
        return message;
    };

    /**
     * Creates a plain object from a MSG_IMPAWN_GAMEINFO_IMCL message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MSG_IMPAWN_GAMEINFO_IMCL
     * @static
     * @param {MSG_IMPAWN_GAMEINFO_IMCL} message MSG_IMPAWN_GAMEINFO_IMCL
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MSG_IMPAWN_GAMEINFO_IMCL.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults) {
            object.impawnList = [];
            object.recordList = [];
        }
        if (options.defaults) {
            object.msgID = 0;
            object.pid = 0;
            object.chuImpawnTotal = 0;
            object.hanImpawnTotal = 0;
            object.chuAwardRate = 0;
            object.hanAwardRate = 0;
            object.playerChuImpawnTimes = 0;
            object.playerHanImpawnTimes = 0;
            object.playerChuImpawnTotal = 0;
            object.playerHanImpawnTotal = 0;
            object.chuWinRecord = 0;
            object.hanWinRecord = 0;
            object.restartHour = 0;
            object.pauseHour = 0;
        }
        if (message.msgID != null && message.hasOwnProperty("msgID"))
            object.msgID = message.msgID;
        if (message.pid != null && message.hasOwnProperty("pid"))
            object.pid = options.json && !isFinite(message.pid) ? String(message.pid) : message.pid;
        if (message.chuImpawnTotal != null && message.hasOwnProperty("chuImpawnTotal"))
            object.chuImpawnTotal = options.json && !isFinite(message.chuImpawnTotal) ? String(message.chuImpawnTotal) : message.chuImpawnTotal;
        if (message.hanImpawnTotal != null && message.hasOwnProperty("hanImpawnTotal"))
            object.hanImpawnTotal = options.json && !isFinite(message.hanImpawnTotal) ? String(message.hanImpawnTotal) : message.hanImpawnTotal;
        if (message.chuAwardRate != null && message.hasOwnProperty("chuAwardRate"))
            object.chuAwardRate = message.chuAwardRate;
        if (message.hanAwardRate != null && message.hasOwnProperty("hanAwardRate"))
            object.hanAwardRate = message.hanAwardRate;
        if (message.playerChuImpawnTimes != null && message.hasOwnProperty("playerChuImpawnTimes"))
            object.playerChuImpawnTimes = message.playerChuImpawnTimes;
        if (message.playerHanImpawnTimes != null && message.hasOwnProperty("playerHanImpawnTimes"))
            object.playerHanImpawnTimes = message.playerHanImpawnTimes;
        if (message.playerChuImpawnTotal != null && message.hasOwnProperty("playerChuImpawnTotal"))
            object.playerChuImpawnTotal = options.json && !isFinite(message.playerChuImpawnTotal) ? String(message.playerChuImpawnTotal) : message.playerChuImpawnTotal;
        if (message.playerHanImpawnTotal != null && message.hasOwnProperty("playerHanImpawnTotal"))
            object.playerHanImpawnTotal = options.json && !isFinite(message.playerHanImpawnTotal) ? String(message.playerHanImpawnTotal) : message.playerHanImpawnTotal;
        if (message.impawnList && message.impawnList.length) {
            object.impawnList = [];
            for (var j = 0; j < message.impawnList.length; ++j)
                object.impawnList[j] = $root.MSG_IMPAWN_GAMEINFO_IMCL.Impawn.toObject(message.impawnList[j], options);
        }
        if (message.recordList && message.recordList.length) {
            object.recordList = [];
            for (var j = 0; j < message.recordList.length; ++j)
                object.recordList[j] = message.recordList[j];
        }
        if (message.chuWinRecord != null && message.hasOwnProperty("chuWinRecord"))
            object.chuWinRecord = message.chuWinRecord;
        if (message.hanWinRecord != null && message.hasOwnProperty("hanWinRecord"))
            object.hanWinRecord = message.hanWinRecord;
        if (message.restartHour != null && message.hasOwnProperty("restartHour"))
            object.restartHour = message.restartHour;
        if (message.pauseHour != null && message.hasOwnProperty("pauseHour"))
            object.pauseHour = message.pauseHour;
        return object;
    };

    /**
     * Converts this MSG_IMPAWN_GAMEINFO_IMCL to JSON.
     * @function toJSON
     * @memberof MSG_IMPAWN_GAMEINFO_IMCL
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MSG_IMPAWN_GAMEINFO_IMCL.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    MSG_IMPAWN_GAMEINFO_IMCL.Impawn = (function() {

        /**
         * Properties of an Impawn.
         * @memberof MSG_IMPAWN_GAMEINFO_IMCL
         * @interface IImpawn
         * @property {boolean|null} [isChu] Impawn isChu
         * @property {number|null} [betSum] Impawn betSum
         * @property {string|null} [nickname] Impawn nickname
         */

        /**
         * Constructs a new Impawn.
         * @memberof MSG_IMPAWN_GAMEINFO_IMCL
         * @classdesc Represents an Impawn.
         * @implements IImpawn
         * @constructor
         * @param {MSG_IMPAWN_GAMEINFO_IMCL.IImpawn=} [properties] Properties to set
         */
        function Impawn(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Impawn isChu.
         * @member {boolean} isChu
         * @memberof MSG_IMPAWN_GAMEINFO_IMCL.Impawn
         * @instance
         */
        Impawn.prototype.isChu = false;

        /**
         * Impawn betSum.
         * @member {number} betSum
         * @memberof MSG_IMPAWN_GAMEINFO_IMCL.Impawn
         * @instance
         */
        Impawn.prototype.betSum = 0;

        /**
         * Impawn nickname.
         * @member {string} nickname
         * @memberof MSG_IMPAWN_GAMEINFO_IMCL.Impawn
         * @instance
         */
        Impawn.prototype.nickname = "";

        /**
         * Creates a new Impawn instance using the specified properties.
         * @function create
         * @memberof MSG_IMPAWN_GAMEINFO_IMCL.Impawn
         * @static
         * @param {MSG_IMPAWN_GAMEINFO_IMCL.IImpawn=} [properties] Properties to set
         * @returns {MSG_IMPAWN_GAMEINFO_IMCL.Impawn} Impawn instance
         */
        Impawn.create = function create(properties) {
            return new Impawn(properties);
        };

        /**
         * Encodes the specified Impawn message. Does not implicitly {@link MSG_IMPAWN_GAMEINFO_IMCL.Impawn.verify|verify} messages.
         * @function encode
         * @memberof MSG_IMPAWN_GAMEINFO_IMCL.Impawn
         * @static
         * @param {MSG_IMPAWN_GAMEINFO_IMCL.IImpawn} message Impawn message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Impawn.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.isChu != null && message.hasOwnProperty("isChu"))
                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.isChu);
            if (message.betSum != null && message.hasOwnProperty("betSum"))
                writer.uint32(/* id 2, wireType 1 =*/17).double(message.betSum);
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.nickname);
            return writer;
        };

        /**
         * Encodes the specified Impawn message, length delimited. Does not implicitly {@link MSG_IMPAWN_GAMEINFO_IMCL.Impawn.verify|verify} messages.
         * @function encodeDelimited
         * @memberof MSG_IMPAWN_GAMEINFO_IMCL.Impawn
         * @static
         * @param {MSG_IMPAWN_GAMEINFO_IMCL.IImpawn} message Impawn message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Impawn.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Impawn message from the specified reader or buffer.
         * @function decode
         * @memberof MSG_IMPAWN_GAMEINFO_IMCL.Impawn
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {MSG_IMPAWN_GAMEINFO_IMCL.Impawn} Impawn
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Impawn.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MSG_IMPAWN_GAMEINFO_IMCL.Impawn();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.isChu = reader.bool();
                    break;
                case 2:
                    message.betSum = reader.double();
                    break;
                case 3:
                    message.nickname = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an Impawn message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof MSG_IMPAWN_GAMEINFO_IMCL.Impawn
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {MSG_IMPAWN_GAMEINFO_IMCL.Impawn} Impawn
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Impawn.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Impawn message.
         * @function verify
         * @memberof MSG_IMPAWN_GAMEINFO_IMCL.Impawn
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Impawn.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.isChu != null && message.hasOwnProperty("isChu"))
                if (typeof message.isChu !== "boolean")
                    return "isChu: boolean expected";
            if (message.betSum != null && message.hasOwnProperty("betSum"))
                if (typeof message.betSum !== "number")
                    return "betSum: number expected";
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                if (!$util.isString(message.nickname))
                    return "nickname: string expected";
            return null;
        };

        /**
         * Creates an Impawn message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof MSG_IMPAWN_GAMEINFO_IMCL.Impawn
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {MSG_IMPAWN_GAMEINFO_IMCL.Impawn} Impawn
         */
        Impawn.fromObject = function fromObject(object) {
            if (object instanceof $root.MSG_IMPAWN_GAMEINFO_IMCL.Impawn)
                return object;
            var message = new $root.MSG_IMPAWN_GAMEINFO_IMCL.Impawn();
            if (object.isChu != null)
                message.isChu = Boolean(object.isChu);
            if (object.betSum != null)
                message.betSum = Number(object.betSum);
            if (object.nickname != null)
                message.nickname = String(object.nickname);
            return message;
        };

        /**
         * Creates a plain object from an Impawn message. Also converts values to other types if specified.
         * @function toObject
         * @memberof MSG_IMPAWN_GAMEINFO_IMCL.Impawn
         * @static
         * @param {MSG_IMPAWN_GAMEINFO_IMCL.Impawn} message Impawn
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Impawn.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.isChu = false;
                object.betSum = 0;
                object.nickname = "";
            }
            if (message.isChu != null && message.hasOwnProperty("isChu"))
                object.isChu = message.isChu;
            if (message.betSum != null && message.hasOwnProperty("betSum"))
                object.betSum = options.json && !isFinite(message.betSum) ? String(message.betSum) : message.betSum;
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                object.nickname = message.nickname;
            return object;
        };

        /**
         * Converts this Impawn to JSON.
         * @function toJSON
         * @memberof MSG_IMPAWN_GAMEINFO_IMCL.Impawn
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Impawn.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Impawn;
    })();

    return MSG_IMPAWN_GAMEINFO_IMCL;
})();

module.exports = $root;
