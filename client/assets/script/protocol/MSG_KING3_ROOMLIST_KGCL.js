/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = protobuf;

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.MSG_KING3_ROOMLIST_KGCL = (function() {

    /**
     * Properties of a MSG_KING3_ROOMLIST_KGCL.
     * @exports IMSG_KING3_ROOMLIST_KGCL
     * @interface IMSG_KING3_ROOMLIST_KGCL
     * @property {number} msgID MSG_KING3_ROOMLIST_KGCL msgID
     * @property {number|null} [pid] MSG_KING3_ROOMLIST_KGCL pid
     * @property {Array.<MSG_KING3_ROOMLIST_KGCL.IRoom>|null} [roomList] MSG_KING3_ROOMLIST_KGCL roomList
     */

    /**
     * Constructs a new MSG_KING3_ROOMLIST_KGCL.
     * @exports MSG_KING3_ROOMLIST_KGCL
     * @classdesc Represents a MSG_KING3_ROOMLIST_KGCL.
     * @implements IMSG_KING3_ROOMLIST_KGCL
     * @constructor
     * @param {IMSG_KING3_ROOMLIST_KGCL=} [properties] Properties to set
     */
    function MSG_KING3_ROOMLIST_KGCL(properties) {
        this.roomList = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MSG_KING3_ROOMLIST_KGCL msgID.
     * @member {number} msgID
     * @memberof MSG_KING3_ROOMLIST_KGCL
     * @instance
     */
    MSG_KING3_ROOMLIST_KGCL.prototype.msgID = 0;

    /**
     * MSG_KING3_ROOMLIST_KGCL pid.
     * @member {number} pid
     * @memberof MSG_KING3_ROOMLIST_KGCL
     * @instance
     */
    MSG_KING3_ROOMLIST_KGCL.prototype.pid = 0;

    /**
     * MSG_KING3_ROOMLIST_KGCL roomList.
     * @member {Array.<MSG_KING3_ROOMLIST_KGCL.IRoom>} roomList
     * @memberof MSG_KING3_ROOMLIST_KGCL
     * @instance
     */
    MSG_KING3_ROOMLIST_KGCL.prototype.roomList = $util.emptyArray;

    /**
     * Creates a new MSG_KING3_ROOMLIST_KGCL instance using the specified properties.
     * @function create
     * @memberof MSG_KING3_ROOMLIST_KGCL
     * @static
     * @param {IMSG_KING3_ROOMLIST_KGCL=} [properties] Properties to set
     * @returns {MSG_KING3_ROOMLIST_KGCL} MSG_KING3_ROOMLIST_KGCL instance
     */
    MSG_KING3_ROOMLIST_KGCL.create = function create(properties) {
        return new MSG_KING3_ROOMLIST_KGCL(properties);
    };

    /**
     * Encodes the specified MSG_KING3_ROOMLIST_KGCL message. Does not implicitly {@link MSG_KING3_ROOMLIST_KGCL.verify|verify} messages.
     * @function encode
     * @memberof MSG_KING3_ROOMLIST_KGCL
     * @static
     * @param {IMSG_KING3_ROOMLIST_KGCL} message MSG_KING3_ROOMLIST_KGCL message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MSG_KING3_ROOMLIST_KGCL.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.msgID);
        if (message.pid != null && message.hasOwnProperty("pid"))
            writer.uint32(/* id 2, wireType 1 =*/17).double(message.pid);
        if (message.roomList != null && message.roomList.length)
            for (var i = 0; i < message.roomList.length; ++i)
                $root.MSG_KING3_ROOMLIST_KGCL.Room.encode(message.roomList[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified MSG_KING3_ROOMLIST_KGCL message, length delimited. Does not implicitly {@link MSG_KING3_ROOMLIST_KGCL.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MSG_KING3_ROOMLIST_KGCL
     * @static
     * @param {IMSG_KING3_ROOMLIST_KGCL} message MSG_KING3_ROOMLIST_KGCL message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MSG_KING3_ROOMLIST_KGCL.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MSG_KING3_ROOMLIST_KGCL message from the specified reader or buffer.
     * @function decode
     * @memberof MSG_KING3_ROOMLIST_KGCL
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MSG_KING3_ROOMLIST_KGCL} MSG_KING3_ROOMLIST_KGCL
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MSG_KING3_ROOMLIST_KGCL.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MSG_KING3_ROOMLIST_KGCL();
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
                if (!(message.roomList && message.roomList.length))
                    message.roomList = [];
                message.roomList.push($root.MSG_KING3_ROOMLIST_KGCL.Room.decode(reader, reader.uint32()));
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
     * Decodes a MSG_KING3_ROOMLIST_KGCL message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MSG_KING3_ROOMLIST_KGCL
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MSG_KING3_ROOMLIST_KGCL} MSG_KING3_ROOMLIST_KGCL
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MSG_KING3_ROOMLIST_KGCL.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MSG_KING3_ROOMLIST_KGCL message.
     * @function verify
     * @memberof MSG_KING3_ROOMLIST_KGCL
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MSG_KING3_ROOMLIST_KGCL.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.msgID))
            return "msgID: integer expected";
        if (message.pid != null && message.hasOwnProperty("pid"))
            if (typeof message.pid !== "number")
                return "pid: number expected";
        if (message.roomList != null && message.hasOwnProperty("roomList")) {
            if (!Array.isArray(message.roomList))
                return "roomList: array expected";
            for (var i = 0; i < message.roomList.length; ++i) {
                var error = $root.MSG_KING3_ROOMLIST_KGCL.Room.verify(message.roomList[i]);
                if (error)
                    return "roomList." + error;
            }
        }
        return null;
    };

    /**
     * Creates a MSG_KING3_ROOMLIST_KGCL message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MSG_KING3_ROOMLIST_KGCL
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MSG_KING3_ROOMLIST_KGCL} MSG_KING3_ROOMLIST_KGCL
     */
    MSG_KING3_ROOMLIST_KGCL.fromObject = function fromObject(object) {
        if (object instanceof $root.MSG_KING3_ROOMLIST_KGCL)
            return object;
        var message = new $root.MSG_KING3_ROOMLIST_KGCL();
        if (object.msgID != null)
            message.msgID = object.msgID >>> 0;
        if (object.pid != null)
            message.pid = Number(object.pid);
        if (object.roomList) {
            if (!Array.isArray(object.roomList))
                throw TypeError(".MSG_KING3_ROOMLIST_KGCL.roomList: array expected");
            message.roomList = [];
            for (var i = 0; i < object.roomList.length; ++i) {
                if (typeof object.roomList[i] !== "object")
                    throw TypeError(".MSG_KING3_ROOMLIST_KGCL.roomList: object expected");
                message.roomList[i] = $root.MSG_KING3_ROOMLIST_KGCL.Room.fromObject(object.roomList[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a MSG_KING3_ROOMLIST_KGCL message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MSG_KING3_ROOMLIST_KGCL
     * @static
     * @param {MSG_KING3_ROOMLIST_KGCL} message MSG_KING3_ROOMLIST_KGCL
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MSG_KING3_ROOMLIST_KGCL.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.roomList = [];
        if (options.defaults) {
            object.msgID = 0;
            object.pid = 0;
        }
        if (message.msgID != null && message.hasOwnProperty("msgID"))
            object.msgID = message.msgID;
        if (message.pid != null && message.hasOwnProperty("pid"))
            object.pid = options.json && !isFinite(message.pid) ? String(message.pid) : message.pid;
        if (message.roomList && message.roomList.length) {
            object.roomList = [];
            for (var j = 0; j < message.roomList.length; ++j)
                object.roomList[j] = $root.MSG_KING3_ROOMLIST_KGCL.Room.toObject(message.roomList[j], options);
        }
        return object;
    };

    /**
     * Converts this MSG_KING3_ROOMLIST_KGCL to JSON.
     * @function toJSON
     * @memberof MSG_KING3_ROOMLIST_KGCL
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MSG_KING3_ROOMLIST_KGCL.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    MSG_KING3_ROOMLIST_KGCL.Room = (function() {

        /**
         * Properties of a Room.
         * @memberof MSG_KING3_ROOMLIST_KGCL
         * @interface IRoom
         * @property {number|null} [rid] Room rid
         * @property {number|null} [pid] Room pid
         * @property {string|null} [head] Room head
         * @property {string|null} [nickname] Room nickname
         * @property {string|null} [desc] Room desc
         * @property {boolean|null} [isPassword] Room isPassword
         */

        /**
         * Constructs a new Room.
         * @memberof MSG_KING3_ROOMLIST_KGCL
         * @classdesc Represents a Room.
         * @implements IRoom
         * @constructor
         * @param {MSG_KING3_ROOMLIST_KGCL.IRoom=} [properties] Properties to set
         */
        function Room(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Room rid.
         * @member {number} rid
         * @memberof MSG_KING3_ROOMLIST_KGCL.Room
         * @instance
         */
        Room.prototype.rid = 0;

        /**
         * Room pid.
         * @member {number} pid
         * @memberof MSG_KING3_ROOMLIST_KGCL.Room
         * @instance
         */
        Room.prototype.pid = 0;

        /**
         * Room head.
         * @member {string} head
         * @memberof MSG_KING3_ROOMLIST_KGCL.Room
         * @instance
         */
        Room.prototype.head = "";

        /**
         * Room nickname.
         * @member {string} nickname
         * @memberof MSG_KING3_ROOMLIST_KGCL.Room
         * @instance
         */
        Room.prototype.nickname = "";

        /**
         * Room desc.
         * @member {string} desc
         * @memberof MSG_KING3_ROOMLIST_KGCL.Room
         * @instance
         */
        Room.prototype.desc = "";

        /**
         * Room isPassword.
         * @member {boolean} isPassword
         * @memberof MSG_KING3_ROOMLIST_KGCL.Room
         * @instance
         */
        Room.prototype.isPassword = false;

        /**
         * Creates a new Room instance using the specified properties.
         * @function create
         * @memberof MSG_KING3_ROOMLIST_KGCL.Room
         * @static
         * @param {MSG_KING3_ROOMLIST_KGCL.IRoom=} [properties] Properties to set
         * @returns {MSG_KING3_ROOMLIST_KGCL.Room} Room instance
         */
        Room.create = function create(properties) {
            return new Room(properties);
        };

        /**
         * Encodes the specified Room message. Does not implicitly {@link MSG_KING3_ROOMLIST_KGCL.Room.verify|verify} messages.
         * @function encode
         * @memberof MSG_KING3_ROOMLIST_KGCL.Room
         * @static
         * @param {MSG_KING3_ROOMLIST_KGCL.IRoom} message Room message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Room.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.rid != null && message.hasOwnProperty("rid"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.rid);
            if (message.pid != null && message.hasOwnProperty("pid"))
                writer.uint32(/* id 2, wireType 1 =*/17).double(message.pid);
            if (message.head != null && message.hasOwnProperty("head"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.head);
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.nickname);
            if (message.desc != null && message.hasOwnProperty("desc"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.desc);
            if (message.isPassword != null && message.hasOwnProperty("isPassword"))
                writer.uint32(/* id 6, wireType 0 =*/48).bool(message.isPassword);
            return writer;
        };

        /**
         * Encodes the specified Room message, length delimited. Does not implicitly {@link MSG_KING3_ROOMLIST_KGCL.Room.verify|verify} messages.
         * @function encodeDelimited
         * @memberof MSG_KING3_ROOMLIST_KGCL.Room
         * @static
         * @param {MSG_KING3_ROOMLIST_KGCL.IRoom} message Room message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Room.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Room message from the specified reader or buffer.
         * @function decode
         * @memberof MSG_KING3_ROOMLIST_KGCL.Room
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {MSG_KING3_ROOMLIST_KGCL.Room} Room
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Room.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MSG_KING3_ROOMLIST_KGCL.Room();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.rid = reader.uint32();
                    break;
                case 2:
                    message.pid = reader.double();
                    break;
                case 3:
                    message.head = reader.string();
                    break;
                case 4:
                    message.nickname = reader.string();
                    break;
                case 5:
                    message.desc = reader.string();
                    break;
                case 6:
                    message.isPassword = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Room message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof MSG_KING3_ROOMLIST_KGCL.Room
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {MSG_KING3_ROOMLIST_KGCL.Room} Room
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Room.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Room message.
         * @function verify
         * @memberof MSG_KING3_ROOMLIST_KGCL.Room
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Room.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.rid != null && message.hasOwnProperty("rid"))
                if (!$util.isInteger(message.rid))
                    return "rid: integer expected";
            if (message.pid != null && message.hasOwnProperty("pid"))
                if (typeof message.pid !== "number")
                    return "pid: number expected";
            if (message.head != null && message.hasOwnProperty("head"))
                if (!$util.isString(message.head))
                    return "head: string expected";
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                if (!$util.isString(message.nickname))
                    return "nickname: string expected";
            if (message.desc != null && message.hasOwnProperty("desc"))
                if (!$util.isString(message.desc))
                    return "desc: string expected";
            if (message.isPassword != null && message.hasOwnProperty("isPassword"))
                if (typeof message.isPassword !== "boolean")
                    return "isPassword: boolean expected";
            return null;
        };

        /**
         * Creates a Room message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof MSG_KING3_ROOMLIST_KGCL.Room
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {MSG_KING3_ROOMLIST_KGCL.Room} Room
         */
        Room.fromObject = function fromObject(object) {
            if (object instanceof $root.MSG_KING3_ROOMLIST_KGCL.Room)
                return object;
            var message = new $root.MSG_KING3_ROOMLIST_KGCL.Room();
            if (object.rid != null)
                message.rid = object.rid >>> 0;
            if (object.pid != null)
                message.pid = Number(object.pid);
            if (object.head != null)
                message.head = String(object.head);
            if (object.nickname != null)
                message.nickname = String(object.nickname);
            if (object.desc != null)
                message.desc = String(object.desc);
            if (object.isPassword != null)
                message.isPassword = Boolean(object.isPassword);
            return message;
        };

        /**
         * Creates a plain object from a Room message. Also converts values to other types if specified.
         * @function toObject
         * @memberof MSG_KING3_ROOMLIST_KGCL.Room
         * @static
         * @param {MSG_KING3_ROOMLIST_KGCL.Room} message Room
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Room.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.rid = 0;
                object.pid = 0;
                object.head = "";
                object.nickname = "";
                object.desc = "";
                object.isPassword = false;
            }
            if (message.rid != null && message.hasOwnProperty("rid"))
                object.rid = message.rid;
            if (message.pid != null && message.hasOwnProperty("pid"))
                object.pid = options.json && !isFinite(message.pid) ? String(message.pid) : message.pid;
            if (message.head != null && message.hasOwnProperty("head"))
                object.head = message.head;
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                object.nickname = message.nickname;
            if (message.desc != null && message.hasOwnProperty("desc"))
                object.desc = message.desc;
            if (message.isPassword != null && message.hasOwnProperty("isPassword"))
                object.isPassword = message.isPassword;
            return object;
        };

        /**
         * Converts this Room to JSON.
         * @function toJSON
         * @memberof MSG_KING3_ROOMLIST_KGCL.Room
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Room.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Room;
    })();

    return MSG_KING3_ROOMLIST_KGCL;
})();

module.exports = $root;
