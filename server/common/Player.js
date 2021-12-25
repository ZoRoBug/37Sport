// --------------------------------------------------------
// 玩家信息管理接口
// --------------------------------------------------------
// 
// --------------------------------------------------------
"use strict";
const common = require('../../protocol/Common');
const constant = require('../../protocol/Constant');
const protocol = require('../../protocol/Protocol');
const MSG_LOGIN_DBCL = require('../../protocol/MSG_LOGIN_DBCL')['MSG_LOGIN_DBCL'];

const ACCOUNT_TITLE = 'ACCT';
const PLAYERID_TITLE = 'PID';

const player = {
    // 获得玩家ID key值
    GetKey: function (pid) {
        return PLAYERID_TITLE + pid;
    },

    // 获得玩家昵称key值
    GetAcctKey: function (account) {
        return ACCOUNT_TITLE + account;
    },

    // 完善玩家操作命令
    FillCmd: function (pid, cmds) {
        let key = this.GetKey(pid);
        for (let i = 0, len = cmds.length; i < len; ++i) {
            cmds[i].splice(1, 0, key);
        }
        return cmds;
    },

    // 同步玩家数据到MariaDB数据库后删除RedisDB中此玩家数据
    Save: function (pid, times) {
        if (!times) times = 1;
        if (times > constant.REDIS_MAX_RETRY_TIMES) {
            g_log.Warn('玩家%s数据落地失败', pid);
            return;
        }
        g_gmredis.Watch(this.GetKey(pid), async function (err) {
            if (err) {
                g_gmredis.Unwatch();
                g_log.Error(err);
                return;
            }
            let cmds = player.FillCmd(pid, [['HGET', 'online']]);
            cmds.push(['KEYS', g_withhold.GetKey(pid, common.Location.KING3) + '*']);
            cmds.push(['KEYS', g_withhold.GetKey(pid, common.Location.POWER7) + '*']);
            cmds.push(['KEYS', g_withhold.GetKey(pid, common.Location.IMPAWN) + '*']);
            let replies = await g_gmredis.Batch(cmds);
            if (replies === null) {
                g_gmredis.Unwatch();
                return;
            }
            let online = (Number(replies[0]) === 1);
            let onKing3 = (replies[1].length > 0);
            let onPower7 = (replies[2].length > 0);
            let onImpawn = (replies[3].length > 0);
            if (online || onKing3 || onPower7 || onImpawn) {
                g_gmredis.Unwatch();
                return;
            }
            player.ToObject(pid, async function (obj) {
                if (obj === null) {
                    g_gmredis.Unwatch();
                    return;
                }
                let msgData = MSG_LOGIN_DBCL.encode({
                    msgID: protocol.GetMsgId('MSG_LOGIN_DBCL'),
                    propList: obj.propList, pi: obj.pi
                }).finish();
                let cmds = [['HSET', 'player_detail', obj.pi.account, msgData]];
                let replies = await g_dbredis.Batch(cmds);
                if (replies === null) {
                    g_gmredis.Unwatch();
                    return;
                }
                cmds = [
                    ['DEL', player.GetKey(pid)],
                    ['DEL', player.GetAcctKey(obj.pi.account)]
                ];
                let result = await g_gmredis.Multi(cmds);
                if (result === false) { player.Save(pid, ++times); }
            });
        });
    },

    // 玩家结构数据转换为Redis中数据
    ToHash: function (pi, propList, callback) {
        let pkey = this.GetKey(pi.pid);
        let akey = this.GetAcctKey(pi.account);
        g_gmredis.Watch([pkey, akey], function (err) {
            if (err) {
                g_gmredis.Unwatch();
                callback(MSG_LOGIN_DBCL.Result.UNKNOW8);
                g_log.Error(err);
                return;
            }

            let cmds = g_player.FillCmd(pi.pid, [['EXISTS']]);
            g_gmredis.Batch(cmds, function (err, replies) {
                if (err) {
                    g_gmredis.Unwatch();
                    callback(MSG_LOGIN_DBCL.Result.UNKNOW8);
                    g_log.Error(err);
                    return;
                }

                let playerIsExist = (replies[0] === 1);
                if (playerIsExist) {
                    g_gmredis.Unwatch();
                    callback(MSG_LOGIN_DBCL.Result.ALREADY_LOGIN);
                    return;
                }

                let cmds = new Array();
                cmds.push(['SET', akey, Number(pi.pid)]);
                for (let key in pi) {
                    if (typeof pi[key] === 'function') continue;
                    cmds.push(['HSET', pkey, key, String(pi[key])]);
                }

                let loginTime = (new Date()).format('yyyy-MM-dd hh:mm:ss');
                cmds.push(['HSET', pkey, 'loginTime', loginTime]);
                cmds.push(['HSET', pkey, 'online', 1]);

                for (let i = 0, len = propList.length; i < len; ++i) {
                    let propID = Number(propList[i].id);
                    let propCount = Number(propList[i].count);
                    cmds.push(['HSET', pkey, propID, propCount]);
                }

                g_gmredis.Multi(cmds, function (err, result) {
                    if (!err && result !== null) {
                        callback(MSG_LOGIN_DBCL.Result.SUCCESS);
                    } else {
                        callback(MSG_LOGIN_DBCL.Result.ADD_PLAYER_ERROR);
                    }
                    if (err) g_log.Error(err);
                });
            });
        });
    },

    // Redis中数据转换为玩家结构数据
    ToObject: function (pid, callback) {
        g_gmredis.Batch([['HGETALL', this.GetKey(pid)]], function (err, replies) {
            if (err || replies[0] === null) {
                if (typeof callback === 'function') callback(null);
                if (err) g_log.Error(err);
                return;
            }
            let pi = replies[0];
            let propList = new Array();
            for (let key in pi) {
                if (isNaN(key)) continue;
                propList.push({
                    id: Number(key),
                    count: Number(pi[key])
                });
                pi[key] = null;
            }
            let obj = { pi: pi, propList: propList };
            if (typeof callback === 'function') callback(obj);
        });
    },
};

module.exports = player;