/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = protobuf;

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.MSG_VIEW_RECORD_DBCL = (function() {

    /**
     * Properties of a MSG_VIEW_RECORD_DBCL.
     * @exports IMSG_VIEW_RECORD_DBCL
     * @interface IMSG_VIEW_RECORD_DBCL
     * @property {number} msgID MSG_VIEW_RECORD_DBCL msgID
     * @property {number|null} [pid] MSG_VIEW_RECORD_DBCL pid
     * @property {number|null} [cost] MSG_VIEW_RECORD_DBCL cost
     * @property {boolean|null} [isNew] MSG_VIEW_RECORD_DBCL isNew
     * @property {MSG_VIEW_RECORD_DBCL.Result|null} [result] MSG_VIEW_RECORD_DBCL result
     * @property {Array.<MSG_VIEW_RECORD_DBCL.IRecord>|null} [recordList] MSG_VIEW_RECORD_DBCL recordList
     */

    /**
     * Constructs a new MSG_VIEW_RECORD_DBCL.
     * @exports MSG_VIEW_RECORD_DBCL
     * @classdesc Represents a MSG_VIEW_RECORD_DBCL.
     * @implements IMSG_VIEW_RECORD_DBCL
     * @constructor
     * @param {IMSG_VIEW_RECORD_DBCL=} [properties] Properties to set
     */
    function MSG_VIEW_RECORD_DBCL(properties) {
        this.recordList = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MSG_VIEW_RECORD_DBCL msgID.
     * @member {number} msgID
     * @memberof MSG_VIEW_RECORD_DBCL
     * @instance
     */
    MSG_VIEW_RECORD_DBCL.prototype.msgID = 0;

    /**
     * MSG_VIEW_RECORD_DBCL pid.
     * @member {number} pid
     * @memberof MSG_VIEW_RECORD_DBCL
     * @instance
     */
    MSG_VIEW_RECORD_DBCL.prototype.pid = 0;

    /**
     * MSG_VIEW_RECORD_DBCL cost.
     * @member {number} cost
     * @memberof MSG_VIEW_RECORD_DBCL
     * @instance
     */
    MSG_VIEW_RECORD_DBCL.prototype.cost = 0;

    /**
     * MSG_VIEW_RECORD_DBCL isNew.
     * @member {boolean} isNew
     * @memberof MSG_VIEW_RECORD_DBCL
     * @instance
     */
    MSG_VIEW_RECORD_DBCL.prototype.isNew = false;

    /**
     * MSG_VIEW_RECORD_DBCL result.
     * @member {MSG_VIEW_RECORD_DBCL.Result} result
     * @memberof MSG_VIEW_RECORD_DBCL
     * @instance
     */
    MSG_VIEW_RECORD_DBCL.prototype.result = 0;

    /**
     * MSG_VIEW_RECORD_DBCL recordList.
     * @member {Array.<MSG_VIEW_RECORD_DBCL.IRecord>} recordList
     * @memberof MSG_VIEW_RECORD_DBCL
     * @instance
     */
    MSG_VIEW_RECORD_DBCL.prototype.recordList = $util.emptyArray;

    /**
     * Creates a new MSG_VIEW_RECORD_DBCL instance using the specified properties.
     * @function create
     * @memberof MSG_VIEW_RECORD_DBCL
     * @static
     * @param {IMSG_VIEW_RECORD_DBCL=} [properties] Properties to set
     * @returns {MSG_VIEW_RECORD_DBCL} MSG_VIEW_RECORD_DBCL instance
     */
    MSG_VIEW_RECORD_DBCL.create = function create(properties) {
        return new MSG_VIEW_RECORD_DBCL(properties);
    };

    /**
     * Encodes the specified MSG_VIEW_RECORD_DBCL message. Does not implicitly {@link MSG_VIEW_RECORD_DBCL.verify|verify} messages.
     * @function encode
     * @memberof MSG_VIEW_RECORD_DBCL
     * @static
     * @param {IMSG_VIEW_RECORD_DBCL} message MSG_VIEW_RECORD_DBCL message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MSG_VIEW_RECORD_DBCL.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.msgID);
        if (message.pid != null && message.hasOwnProperty("pid"))
            writer.uint32(/* id 2, wireType 1 =*/17).double(message.pid);
        if (message.cost != null && message.hasOwnProperty("cost"))
            writer.uint32(/* id 3, wireType 1 =*/25).double(message.cost);
        if (message.isNew != null && message.hasOwnProperty("isNew"))
            writer.uint32(/* id 4, wireType 0 =*/32).bool(message.isNew);
        if (message.result != null && message.hasOwnProperty("result"))
            writer.uint32(/* id 5, wireType 0 =*/40).int32(message.result);
        if (message.recordList != null && message.recordList.length)
            for (var i = 0; i < message.recordList.length; ++i)
                $root.MSG_VIEW_RECORD_DBCL.Record.encode(message.recordList[i], writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified MSG_VIEW_RECORD_DBCL message, length delimited. Does not implicitly {@link MSG_VIEW_RECORD_DBCL.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MSG_VIEW_RECORD_DBCL
     * @static
     * @param {IMSG_VIEW_RECORD_DBCL} message MSG_VIEW_RECORD_DBCL message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MSG_VIEW_RECORD_DBCL.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MSG_VIEW_RECORD_DBCL message from the specified reader or buffer.
     * @function decode
     * @memberof MSG_VIEW_RECORD_DBCL
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MSG_VIEW_RECORD_DBCL} MSG_VIEW_RECORD_DBCL
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MSG_VIEW_RECORD_DBCL.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MSG_VIEW_RECORD_DBCL();
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
                message.isNew = reader.bool();
                break;
            case 5:
                message.result = reader.int32();
                break;
            case 6:
                if (!(message.recordList && message.recordList.length))
                    message.recordList = [];
                message.recordList.push($root.MSG_VIEW_RECORD_DBCL.Record.decode(reader, reader.uint32()));
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
     * Decodes a MSG_VIEW_RECORD_DBCL message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MSG_VIEW_RECORD_DBCL
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MSG_VIEW_RECORD_DBCL} MSG_VIEW_RECORD_DBCL
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MSG_VIEW_RECORD_DBCL.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MSG_VIEW_RECORD_DBCL message.
     * @function verify
     * @memberof MSG_VIEW_RECORD_DBCL
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MSG_VIEW_RECORD_DBCL.verify = function verify(message) {
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
        if (message.isNew != null && message.hasOwnProperty("isNew"))
            if (typeof message.isNew !== "boolean")
                return "isNew: boolean expected";
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
            case 6:
            case 7:
            case 8:
                break;
            }
        if (message.recordList != null && message.hasOwnProperty("recordList")) {
            if (!Array.isArray(message.recordList))
                return "recordList: array expected";
            for (var i = 0; i < message.recordList.length; ++i) {
                var error = $root.MSG_VIEW_RECORD_DBCL.Record.verify(message.recordList[i]);
                if (error)
                    return "recordList." + error;
            }
        }
        return null;
    };

    /**
     * Creates a MSG_VIEW_RECORD_DBCL message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MSG_VIEW_RECORD_DBCL
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MSG_VIEW_RECORD_DBCL} MSG_VIEW_RECORD_DBCL
     */
    MSG_VIEW_RECORD_DBCL.fromObject = function fromObject(object) {
        if (object instanceof $root.MSG_VIEW_RECORD_DBCL)
            return object;
        var message = new $root.MSG_VIEW_RECORD_DBCL();
        if (object.msgID != null)
            message.msgID = object.msgID >>> 0;
        if (object.pid != null)
            message.pid = Number(object.pid);
        if (object.cost != null)
            message.cost = Number(object.cost);
        if (object.isNew != null)
            message.isNew = Boolean(object.isNew);
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
        case "PARAM_ERROR":
        case 3:
            message.result = 3;
            break;
        case "REDIS_ERROR":
        case 4:
            message.result = 4;
            break;
        case "REDIS_FAIL":
        case 5:
            message.result = 5;
            break;
        case "NO_PLAYER_INFO":
        case 6:
            message.result = 6;
            break;
        case "LACK_COIN":
        case 7:
            message.result = 7;
            break;
        case "DB_QUERY_ERROR":
        case 8:
            message.result = 8;
            break;
        }
        if (object.recordList) {
            if (!Array.isArray(object.recordList))
                throw TypeError(".MSG_VIEW_RECORD_DBCL.recordList: array expected");
            message.recordList = [];
            for (var i = 0; i < object.recordList.length; ++i) {
                if (typeof object.recordList[i] !== "object")
                    throw TypeError(".MSG_VIEW_RECORD_DBCL.recordList: object expected");
                message.recordList[i] = $root.MSG_VIEW_RECORD_DBCL.Record.fromObject(object.recordList[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a MSG_VIEW_RECORD_DBCL message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MSG_VIEW_RECORD_DBCL
     * @static
     * @param {MSG_VIEW_RECORD_DBCL} message MSG_VIEW_RECORD_DBCL
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MSG_VIEW_RECORD_DBCL.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.recordList = [];
        if (options.defaults) {
            object.msgID = 0;
            object.pid = 0;
            object.cost = 0;
            object.isNew = false;
            object.result = options.enums === String ? "SUCCESS" : 0;
        }
        if (message.msgID != null && message.hasOwnProperty("msgID"))
            object.msgID = message.msgID;
        if (message.pid != null && message.hasOwnProperty("pid"))
            object.pid = options.json && !isFinite(message.pid) ? String(message.pid) : message.pid;
        if (message.cost != null && message.hasOwnProperty("cost"))
            object.cost = options.json && !isFinite(message.cost) ? String(message.cost) : message.cost;
        if (message.isNew != null && message.hasOwnProperty("isNew"))
            object.isNew = message.isNew;
        if (message.result != null && message.hasOwnProperty("result"))
            object.result = options.enums === String ? $root.MSG_VIEW_RECORD_DBCL.Result[message.result] : message.result;
        if (message.recordList && message.recordList.length) {
            object.recordList = [];
            for (var j = 0; j < message.recordList.length; ++j)
                object.recordList[j] = $root.MSG_VIEW_RECORD_DBCL.Record.toObject(message.recordList[j], options);
        }
        return object;
    };

    /**
     * Converts this MSG_VIEW_RECORD_DBCL to JSON.
     * @function toJSON
     * @memberof MSG_VIEW_RECORD_DBCL
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MSG_VIEW_RECORD_DBCL.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Result enum.
     * @name MSG_VIEW_RECORD_DBCL.Result
     * @enum {string}
     * @property {number} SUCCESS=0 SUCCESS value
     * @property {number} NO_CLIENT_INFO=1 NO_CLIENT_INFO value
     * @property {number} OFFLINE=2 OFFLINE value
     * @property {number} PARAM_ERROR=3 PARAM_ERROR value
     * @property {number} REDIS_ERROR=4 REDIS_ERROR value
     * @property {number} REDIS_FAIL=5 REDIS_FAIL value
     * @property {number} NO_PLAYER_INFO=6 NO_PLAYER_INFO value
     * @property {number} LACK_COIN=7 LACK_COIN value
     * @property {number} DB_QUERY_ERROR=8 DB_QUERY_ERROR value
     */
    MSG_VIEW_RECORD_DBCL.Result = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "SUCCESS"] = 0;
        values[valuesById[1] = "NO_CLIENT_INFO"] = 1;
        values[valuesById[2] = "OFFLINE"] = 2;
        values[valuesById[3] = "PARAM_ERROR"] = 3;
        values[valuesById[4] = "REDIS_ERROR"] = 4;
        values[valuesById[5] = "REDIS_FAIL"] = 5;
        values[valuesById[6] = "NO_PLAYER_INFO"] = 6;
        values[valuesById[7] = "LACK_COIN"] = 7;
        values[valuesById[8] = "DB_QUERY_ERROR"] = 8;
        return values;
    })();

    MSG_VIEW_RECORD_DBCL.Record = (function() {

        /**
         * Properties of a Record.
         * @memberof MSG_VIEW_RECORD_DBCL
         * @interface IRecord
         * @property {number|null} [reason] Record reason
         * @property {number|null} [costCoin] Record costCoin
         * @property {number|null} [costSubcoin] Record costSubcoin
         * @property {number|null} [gainCoin] Record gainCoin
         * @property {number|null} [gainSubcoin] Record gainSubcoin
         * @property {string|null} [note] Record note
         * @property {string|null} [time] Record time
         */

        /**
         * Constructs a new Record.
         * @memberof MSG_VIEW_RECORD_DBCL
         * @classdesc Represents a Record.
         * @implements IRecord
         * @constructor
         * @param {MSG_VIEW_RECORD_DBCL.IRecord=} [properties] Properties to set
         */
        function Record(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Record reason.
         * @member {number} reason
         * @memberof MSG_VIEW_RECORD_DBCL.Record
         * @instance
         */
        Record.prototype.reason = 0;

        /**
         * Record costCoin.
         * @member {number} costCoin
         * @memberof MSG_VIEW_RECORD_DBCL.Record
         * @instance
         */
        Record.prototype.costCoin = 0;

        /**
         * Record costSubcoin.
         * @member {number} costSubcoin
         * @memberof MSG_VIEW_RECORD_DBCL.Record
         * @instance
         */
        Record.prototype.costSubcoin = 0;

        /**
         * Record gainCoin.
         * @member {number} gainCoin
         * @memberof MSG_VIEW_RECORD_DBCL.Record
         * @instance
         */
        Record.prototype.gainCoin = 0;

        /**
         * Record gainSubcoin.
         * @member {number} gainSubcoin
         * @memberof MSG_VIEW_RECORD_DBCL.Record
         * @instance
         */
        Record.prototype.gainSubcoin = 0;

        /**
         * Record note.
         * @member {string} note
         * @memberof MSG_VIEW_RECORD_DBCL.Record
         * @instance
         */
        Record.prototype.note = "";

        /**
         * Record time.
         * @member {string} time
         * @memberof MSG_VIEW_RECORD_DBCL.Record
         * @instance
         */
        Record.prototype.time = "";

        /**
         * Creates a new Record instance using the specified properties.
         * @function create
         * @memberof MSG_VIEW_RECORD_DBCL.Record
         * @static
         * @param {MSG_VIEW_RECORD_DBCL.IRecord=} [properties] Properties to set
         * @returns {MSG_VIEW_RECORD_DBCL.Record} Record instance
         */
        Record.create = function create(properties) {
            return new Record(properties);
        };

        /**
         * Encodes the specified Record message. Does not implicitly {@link MSG_VIEW_RECORD_DBCL.Record.verify|verify} messages.
         * @function encode
         * @memberof MSG_VIEW_RECORD_DBCL.Record
         * @static
         * @param {MSG_VIEW_RECORD_DBCL.IRecord} message Record message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Record.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.reason != null && message.hasOwnProperty("reason"))
                writer.uint32(/* id 1, wireType 0 =*/8).sint32(message.reason);
            if (message.costCoin != null && message.hasOwnProperty("costCoin"))
                writer.uint32(/* id 2, wireType 1 =*/17).double(message.costCoin);
            if (message.costSubcoin != null && message.hasOwnProperty("costSubcoin"))
                writer.uint32(/* id 3, wireType 1 =*/25).double(message.costSubcoin);
            if (message.gainCoin != null && message.hasOwnProperty("gainCoin"))
                writer.uint32(/* id 4, wireType 1 =*/33).double(message.gainCoin);
            if (message.gainSubcoin != null && message.hasOwnProperty("gainSubcoin"))
                writer.uint32(/* id 5, wireType 1 =*/41).double(message.gainSubcoin);
            if (message.note != null && message.hasOwnProperty("note"))
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.note);
            if (message.time != null && message.hasOwnProperty("time"))
                writer.uint32(/* id 7, wireType 2 =*/58).string(message.time);
            return writer;
        };

        /**
         * Encodes the specified Record message, length delimited. Does not implicitly {@link MSG_VIEW_RECORD_DBCL.Record.verify|verify} messages.
         * @function encodeDelimited
         * @memberof MSG_VIEW_RECORD_DBCL.Record
         * @static
         * @param {MSG_VIEW_RECORD_DBCL.IRecord} message Record message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Record.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Record message from the specified reader or buffer.
         * @function decode
         * @memberof MSG_VIEW_RECORD_DBCL.Record
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {MSG_VIEW_RECORD_DBCL.Record} Record
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Record.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MSG_VIEW_RECORD_DBCL.Record();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.reason = reader.sint32();
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
                    message.note = reader.string();
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
         * Decodes a Record message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof MSG_VIEW_RECORD_DBCL.Record
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {MSG_VIEW_RECORD_DBCL.Record} Record
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Record.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Record message.
         * @function verify
         * @memberof MSG_VIEW_RECORD_DBCL.Record
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Record.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.reason != null && message.hasOwnProperty("reason"))
                if (!$util.isInteger(message.reason))
                    return "reason: integer expected";
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
            if (message.note != null && message.hasOwnProperty("note"))
                if (!$util.isString(message.note))
                    return "note: string expected";
            if (message.time != null && message.hasOwnProperty("time"))
                if (!$util.isString(message.time))
                    return "time: string expected";
            return null;
        };

        /**
         * Creates a Record message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof MSG_VIEW_RECORD_DBCL.Record
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {MSG_VIEW_RECORD_DBCL.Record} Record
         */
        Record.fromObject = function fromObject(object) {
            if (object instanceof $root.MSG_VIEW_RECORD_DBCL.Record)
                return object;
            var message = new $root.MSG_VIEW_RECORD_DBCL.Record();
            if (object.reason != null)
                message.reason = object.reason | 0;
            if (object.costCoin != null)
                message.costCoin = Number(object.costCoin);
            if (object.costSubcoin != null)
                message.costSubcoin = Number(object.costSubcoin);
            if (object.gainCoin != null)
                message.gainCoin = Number(object.gainCoin);
            if (object.gainSubcoin != null)
                message.gainSubcoin = Number(object.gainSubcoin);
            if (object.note != null)
                message.note = String(object.note);
            if (object.time != null)
                message.time = String(object.time);
            return message;
        };

        /**
         * Creates a plain object from a Record message. Also converts values to other types if specified.
         * @function toObject
         * @memberof MSG_VIEW_RECORD_DBCL.Record
         * @static
         * @param {MSG_VIEW_RECORD_DBCL.Record} message Record
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Record.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.reason = 0;
                object.costCoin = 0;
                object.costSubcoin = 0;
                object.gainCoin = 0;
                object.gainSubcoin = 0;
                object.note = "";
                object.time = "";
            }
            if (message.reason != null && message.hasOwnProperty("reason"))
                object.reason = message.reason;
            if (message.costCoin != null && message.hasOwnProperty("costCoin"))
                object.costCoin = options.json && !isFinite(message.costCoin) ? String(message.costCoin) : message.costCoin;
            if (message.costSubcoin != null && message.hasOwnProperty("costSubcoin"))
                object.costSubcoin = options.json && !isFinite(message.costSubcoin) ? String(message.costSubcoin) : message.costSubcoin;
            if (message.gainCoin != null && message.hasOwnProperty("gainCoin"))
                object.gainCoin = options.json && !isFinite(message.gainCoin) ? String(message.gainCoin) : message.gainCoin;
            if (message.gainSubcoin != null && message.hasOwnProperty("gainSubcoin"))
                object.gainSubcoin = options.json && !isFinite(message.gainSubcoin) ? String(message.gainSubcoin) : message.gainSubcoin;
            if (message.note != null && message.hasOwnProperty("note"))
                object.note = message.note;
            if (message.time != null && message.hasOwnProperty("time"))
                object.time = message.time;
            return object;
        };

        /**
         * Converts this Record to JSON.
         * @function toJSON
         * @memberof MSG_VIEW_RECORD_DBCL.Record
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Record.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Record;
    })();

    return MSG_VIEW_RECORD_DBCL;
})();

module.exports = $root;
