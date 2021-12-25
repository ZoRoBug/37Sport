// --------------------------------------------------------
// 消息&事件处理器
// --------------------------------------------------------
//
// --------------------------------------------------------
"use strict";
const dblog = require('../../protocol/DBLog');
const protocol = require('../../protocol/protocol');
const MSG_LOGIN_CLDB = require('../../protocol/MSG_LOGIN_CLDB')['MSG_LOGIN_CLDB'];
const MSG_LOGIN_DBCL = require('../../protocol/MSG_LOGIN_DBCL')['MSG_LOGIN_DBCL'];
const MSG_ALTER_NAME_CLDB = require('../../protocol/MSG_ALTER_NAME_CLDB')['MSG_ALTER_NAME_CLDB'];
const MSG_ALTER_NAME_DBCL = require('../../protocol/MSG_ALTER_NAME_DBCL')['MSG_ALTER_NAME_DBCL'];
const MSG_VIEW_RECORD_CLDB = require('../../protocol/MSG_VIEW_RECORD_CLDB')['MSG_VIEW_RECORD_CLDB'];
const MSG_VIEW_RECORD_DBCL = require('../../protocol/MSG_VIEW_RECORD_DBCL')['MSG_VIEW_RECORD_DBCL'];
const MSG_PLAYER_REGISTER_CLDB = require('../../protocol/MSG_PLAYER_REGISTER_CLDB')['MSG_PLAYER_REGISTER_CLDB'];
const MSG_PLAYER_REGISTER_DBCL = require('../../protocol/MSG_PLAYER_REGISTER_DBCL')['MSG_PLAYER_REGISTER_DBCL'];

const SYNC_DATA_CYCLE_TIME = 10; // 同步数据循环时间ms
const SEND_RECORD_MAX_ITEM = 200; // 一次发送最大记录条数

const handler = {
    Init: function () {
        this.OpenPlayerDetailTimer();
        this.OpenLoginLogTimer();
        this.OpenImpawnLogTimer();
        this.OpenKing3LogTimer();
        this.OpenPower7LogTimer();
        this.OpenUpdateLogTimer();
        g_dbserver.on('MSG_LOGIN_CLDB', OnLoginMsg);
        g_dbserver.on('MSG_ALTER_NAME_CLDB', OnAlterNameMsg);
        g_dbserver.on('MSG_VIEW_RECORD_CLDB', OnViewRecordMsg);
        g_dbserver.on('MSG_PLAYER_REGISTER_CLDB', OnPlayerRegisterMsg);
    },

    Uninit: function () {
        this.isUninit = true;
        clearTimeout(this.timerPlayerDetail);
        clearTimeout(this.timerLoginLog);
        clearTimeout(this.timerImpawnLog);
        clearTimeout(this.timerKing3Log);
        clearTimeout(this.timerPower7Log);
        clearTimeout(this.timerUpdateLog);
    },

    SendLoginMsg: function (client, msg) {
        msg.msgID = protocol.GetMsgId('MSG_LOGIN_DBCL');
        client.Send(MSG_LOGIN_DBCL.encode(msg).finish());
    },

    SendAlterNameMsg: function (client, msg) {
        msg.msgID = protocol.GetMsgId('MSG_ALTER_NAME_DBCL');
        client.Send(MSG_ALTER_NAME_DBCL.encode(msg).finish());
    },

    SendViewRecordMsg: function (client, msg) {
        msg.msgID = protocol.GetMsgId('MSG_VIEW_RECORD_DBCL');
        client.Send(MSG_VIEW_RECORD_DBCL.encode(msg).finish());
    },

    SendPlayerRegisterMsg: function (client, msg) {
        msg.msgID = protocol.GetMsgId('MSG_PLAYER_REGISTER_DBCL');
        client.Send(MSG_PLAYER_REGISTER_DBCL.encode(msg).finish());
    },

    OpenPlayerDetailTimer: function () {
        if (this.isUninit) return;
        clearTimeout(this.timerPlayerDetail);
        this.timerPlayerDetail = setTimeout(async function () {
            let replys = await g_dbredis.Batch([['HKEYS', 'player_detail']]);
            if (replys === null) {
                handler.OpenPlayerDetailTimer();
                return;
            }
            let keys = replys[0];
            if (keys.length === 0) {
                handler.OpenPlayerDetailTimer();
                return;
            }
            let hkey = keys[Math.randomnum(0, keys.length - 1)];
            replys = await g_dbredis.Batch([['HGET', 'player_detail', Buffer.from(hkey)]]);
            if (replys === null) {
                handler.OpenPlayerDetailTimer();
                return;
            }
            if (replys[0] === null) {
                handler.OpenPlayerDetailTimer();
                return;
            }
            let strPropID = '', strPropCount = '';
            let detail = MSG_LOGIN_DBCL.decode(replys[0]);
            for (let i = 0, len = detail.propList.length; i < len; ++i) {
                strPropID = strPropID + detail.propList[i].id + ',';
                strPropCount = strPropCount + detail.propList[i].count + ',';
            }
            let sql = 'CALL 37sport.`sp_update_player`(%s, \'%s\', \'%s\', \'%s\', \'%s\');';
            sql = sql.replace('%s', detail.pi.pid);
            sql = sql.replace('%s', strPropID);
            sql = sql.replace('%s', strPropCount);
            sql = sql.replace('%s', detail.pi.loginTime);
            sql = sql.replace('%s', detail.pi.logoutTime);
            let rows = await g_database.Query(sql, true);
            if (rows === null) {
                handler.OpenPlayerDetailTimer();
                return;
            };
            if (rows[0][0].return !== '0') {
                g_log.Error('%s return %s', sql, rows[0][0].return);
                handler.OpenPlayerDetailTimer();
                return;
            }
            await g_dbredis.Batch([['HDEL', 'player_detail', hkey]]);
            handler.OpenPlayerDetailTimer();
        }, SYNC_DATA_CYCLE_TIME);
    },

    OpenLoginLogTimer: function () {
        if (this.isUninit) return;
        clearTimeout(this.timerLoginLog);
        this.timerLoginLog = setTimeout(async function () {
            let replys = await g_dbredis.Batch([['LINDEX', Buffer.from('login_log'), 0]]);
            if (replys === null) {
                handler.OpenLoginLogTimer();
                return;
            }
            if (replys[0] === null) {
                handler.OpenLoginLogTimer();
                return;
            }
            let logInfo = dblog.DBLoginLog.decode(replys[0]);
            let sql = 'CALL 37sport.`sp_log_login`(%s, \'%s\', \'%s\', \'%s\', \'%s\');';
            sql = sql.replace('%s', logInfo.pid);
            sql = sql.replace('%s', logInfo.ip);
            sql = sql.replace('%s', logInfo.guid);
            sql = sql.replace('%s', logInfo.loginTime);
            sql = sql.replace('%s', logInfo.logoutTime);
            let rows = await g_database.Query(sql, true);
            if (rows === null) {
                g_log.Error('%s query fail', sql);
            } else if (rows[0][0].return !== '0') {
                g_log.Error('%s return %s', sql, rows[0][0].return);
            }
            await g_dbredis.Batch([['LPOP', 'login_log']]);
            handler.OpenLoginLogTimer();
        }, SYNC_DATA_CYCLE_TIME);
    },

    OpenImpawnLogTimer: function () {
        if (this.isUninit) return;
        clearTimeout(this.timerImpawnLog);
        this.timerImpawnLog = setTimeout(async function () {
            let replys = await g_dbredis.Batch([['LINDEX', Buffer.from('impawn_log'), 0]]);
            if (replys === null) {
                handler.OpenImpawnLogTimer();
                return;
            }
            if (replys[0] === null) {
                handler.OpenImpawnLogTimer();
                return;
            }
            let logInfo = dblog.DBImpawnLog.decode(replys[0]);
            let sql = 'CALL 37sport.`sp_log_impawn`(%s, %s, %s, %s, %s, %s, %s, %s, %s, \'%s\');';
            sql = sql.replace('%s', logInfo.pid);
            sql = sql.replace('%s', logInfo.costCoin);
            sql = sql.replace('%s', logInfo.costSubcoin);
            sql = sql.replace('%s', logInfo.gainCoin);
            sql = sql.replace('%s', logInfo.gainSubcoin);
            sql = sql.replace('%s', logInfo.resultCoin);
            sql = sql.replace('%s', logInfo.resultSubcoin);
            sql = sql.replace('%s', logInfo.object);
            sql = sql.replace('%s', logInfo.round);
            sql = sql.replace('%s', logInfo.time);
            let rows = await g_database.Query(sql, true);
            if (rows === null) {
                g_log.Error('%s query fail', sql);
            } else if (rows[0][0].return !== '0') {
                g_log.Error('%s return %s', sql, rows[0][0].return);
            }
            await g_dbredis.Batch([['LPOP', 'impawn_log']]);
            handler.OpenImpawnLogTimer();
        }, SYNC_DATA_CYCLE_TIME);
    },

    OpenKing3LogTimer: function () {
        if (this.isUninit) return;
        clearTimeout(this.timerKing3Log);
        this.timerKing3Log = setTimeout(async function () {
            let replys = await g_dbredis.Batch([['LINDEX', Buffer.from('king3_log'), 0]]);
            if (replys === null) {
                handler.OpenKing3LogTimer();
                return;
            }
            if (replys[0] === null) {
                handler.OpenKing3LogTimer();
                return;
            }
            let logInfo = dblog.DB3KingLog.decode(replys[0]);
            let sql = 'CALL 37sport.`sp_log_3king`(%s, %s, %s, %s, %s, %s, \'%s\');';
            sql = sql.replace('%s', logInfo.pid);
            sql = sql.replace('%s', logInfo.costCoin);
            sql = sql.replace('%s', logInfo.gainCoin);
            sql = sql.replace('%s', logInfo.resultCoin);
            sql = sql.replace('%s', logInfo.action);
            sql = sql.replace('%s', logInfo.round);
            sql = sql.replace('%s', logInfo.time);
            let rows = await g_database.Query(sql, true);
            if (rows === null) {
                g_log.Error('%s query fail', sql);
            } else if (rows[0][0].return !== '0') {
                g_log.Error('%s return %s', sql, rows[0][0].return);
            }
            await g_dbredis.Batch([['LPOP', 'king3_log']]);
            handler.OpenKing3LogTimer();
        }, SYNC_DATA_CYCLE_TIME);
    },

    OpenPower7LogTimer: function () {
        if (this.isUninit) return;
        clearTimeout(this.timerPower7Log);
        this.timerPower7Log = setTimeout(async function () {
            let replys = await g_dbredis.Batch([['LINDEX', Buffer.from('power7_log'), 0]]);
            if (replys === null) {
                handler.OpenPower7LogTimer();
                return;
            }
            if (replys[0] === null) {
                handler.OpenPower7LogTimer();
                return;
            }
            let logInfo = dblog.DB7PowerLog.decode(replys[0]);
            let sql = 'CALL 37sport.`sp_log_7power`(%s, %s, %s, %s, %s, %s, \'%s\');';
            sql = sql.replace('%s', logInfo.pid);
            sql = sql.replace('%s', logInfo.costCoin);
            sql = sql.replace('%s', logInfo.gainCoin);
            sql = sql.replace('%s', logInfo.resultCoin);
            sql = sql.replace('%s', logInfo.role);
            sql = sql.replace('%s', logInfo.round);
            sql = sql.replace('%s', logInfo.time);
            let rows = await g_database.Query(sql, true);
            if (rows === null) {
                g_log.Error('%s query fail', sql);
            } else if (rows[0][0].return !== '0') {
                g_log.Error('%s return %s', sql, rows[0][0].return);
            }
            await g_dbredis.Batch([['LPOP', 'power7_log']]);
            handler.OpenPower7LogTimer();
        }, SYNC_DATA_CYCLE_TIME);
    },

    OpenUpdateLogTimer: function () {
        if (this.isUninit) return;
        clearTimeout(this.timerUpdateLog);
        this.timerUpdateLog = setTimeout(async function () {
            let replys = await g_dbredis.Batch([['LINDEX', Buffer.from('update_log'), 0]]);
            if (replys === null) {
                handler.OpenUpdateLogTimer();
                return;
            }
            if (replys[0] === null) {
                handler.OpenUpdateLogTimer();
                return;
            }
            let logInfo = dblog.DBUpdateLog.decode(replys[0]);
            let sql = 'CALL 37sport.`sp_log_update`(%s, %s, %s, %s, %s, \'%s\', \'%s\');';
            sql = sql.replace('%s', logInfo.pid);
            sql = sql.replace('%s', logInfo.propID);
            sql = sql.replace('%s', logInfo.update);
            sql = sql.replace('%s', logInfo.result);
            sql = sql.replace('%s', logInfo.reason);
            sql = sql.replace('%s', logInfo.time);
            sql = sql.replace('%s', logInfo.note);
            let rows = await g_database.Query(sql, true);
            if (rows === null) {
                g_log.Error('%s query fail', sql);
            } else if (rows[0][0].return !== '0') {
                g_log.Error('%s return %s', sql, rows[0][0].return);
            }
            await g_dbredis.Batch([['LPOP', 'update_log']]);
            handler.OpenUpdateLogTimer();
        }, SYNC_DATA_CYCLE_TIME);
    },
};

async function OnLoginMsg(client, data) {
    let msg = MSG_LOGIN_CLDB.decode(data);
    let replys = await g_dbredis.Batch([['HGET', 'player_detail', Buffer.from(msg.account)]]);
    if (replys === null) {
        handler.SendLoginMsg(client, {
            result: MSG_LOGIN_DBCL.Result.REDIS_GET_ERROR,
            loginID: msg.loginID
        });
        return;
    }
    if (replys[0] !== null) {
        let msgOut = MSG_LOGIN_DBCL.decode(replys[0]);
        msgOut.pi.head = msg.head;
        msgOut.loginID = msg.loginID;
        msgOut.wxSessionKey = msg.wxSessionKey;
        msgOut.result = MSG_LOGIN_DBCL.Result.SUCCESS;
        handler.SendLoginMsg(client, msgOut);
        return;
    }
    let sql = 'CALL 37sport.`sp_login`(\'%s\', \'%s\', %s);';
    sql = sql.replace('%s', msg.account);
    sql = sql.replace('%s', msg.password);
    sql = sql.replace('%s', msg.platform);
    let rows = await g_database.Query(sql, true);
    if (rows === null) {
        handler.SendLoginMsg(client, {
            result: MSG_LOGIN_DBCL.Result.MARIADB_QUERY_ERROR,
            loginID: msg.loginID
        });
        return;
    };
    let pi = null, propList = new Array();
    let result = Number(rows[0][0].return);
    if (result === MSG_LOGIN_DBCL.Result.SUCCESS) {
        pi = {
            pid: Number(rows[1][0].pid),
            account: rows[1][0].account,
            regTime: rows[1][0].reg_time,
            nickname: rows[1][0].nickname,
            password: rows[1][0].password,
            identity: Number(rows[1][0].identity),
            platform: Number(rows[1][0].platform),
            loginTime: rows[1][0].login_time,
            logoutTime: rows[1][0].logout_time,
            head: msg.head,
        };
        for (let i = 0; i < rows[2].info.numRows; ++i) {
            propList.push({
                id: Number(rows[2][i].prop_id),
                count: Number(rows[2][i].prop_count)
            });
        }
    }
    handler.SendLoginMsg(client, {
        result: result,
        loginID: msg.loginID,
        wxSessionKey: msg.wxSessionKey,
        pi: pi, propList: propList
    });
}

function OnAlterNameMsg(client, data) {
    let msg = MSG_ALTER_NAME_CLDB.decode(data);
    let sql = 'CALL 37sport.`sp_alter_name`(%s, \'%s\', %s, %s);';
    sql = sql.replace('%s', msg.pid);
    sql = sql.replace('%s', msg.newName);
    sql = sql.replace('%s', msg.cost);
    sql = sql.replace('%s', msg.coin - msg.cost);
    g_database.Query(sql, true, function (err, rows) {
        if (err) {
            msg.result = MSG_ALTER_NAME_DBCL.Result.DB_QUERY_ERROR;
            handler.SendAlterNameMsg(client, msg);
            g_log.Error(err);
            return;
        };
        let ret = Number(rows[0][0].return);
        if (ret === 0) {
            msg.result = MSG_ALTER_NAME_DBCL.Result.SUCCESS;
        } else if (ret === 1) {
            msg.result = MSG_ALTER_NAME_DBCL.Result.SAME_NAME;
        } else {
            msg.result = MSG_ALTER_NAME_DBCL.Result.DB_QUERY_ERROR;
        }
        handler.SendAlterNameMsg(client, msg);
    });
}

function OnViewRecordMsg(client, data) {
    let msg = MSG_VIEW_RECORD_CLDB.decode(data);
    let sql = 'CALL 37sport.`sp_get_record`(%s, \'%s\', \'%s\');';
    sql = sql.replace('%s', msg.pid);
    sql = sql.replace('%s', msg.beginTime);
    sql = sql.replace('%s', msg.endTime);
    g_database.Query(sql, false, function (err, rows) {
        if (err) {
            msg.result = MSG_VIEW_RECORD_DBCL.Result.DB_QUERY_ERROR;
            handler.SendViewRecordMsg(client, msg);
            g_log.Error(err);
            return;
        };

        let recordList = new Array();
        for (let i = 0; i < rows[0].info.numRows; ++i) {
            recordList.push({
                reason: Number(rows[0][i].reason),
                costCoin: Number(rows[0][i].cost_coin),
                costSubcoin: Number(rows[0][i].cost_subcoin),
                gainCoin: Number(rows[0][i].gain_coin),
                gainSubcoin: Number(rows[0][i].gain_subcoin),
                note: rows[0][i].note,
                time: rows[0][i].time,
            });
        }

        let startPos = 0;
        do {
            msg.isNew = (startPos === 0);
            let endPos = startPos + SEND_RECORD_MAX_ITEM;
            msg.recordList = recordList.slice(startPos, endPos);
            msg.result = MSG_VIEW_RECORD_DBCL.Result.SUCCESS;
            handler.SendViewRecordMsg(client, msg);
            startPos += SEND_RECORD_MAX_ITEM;
        } while (startPos < recordList.length);
    });
}

function OnPlayerRegisterMsg(client, data) {
    let msg = MSG_PLAYER_REGISTER_CLDB.decode(data);
    let sql = 'CALL 37sport.`sp_register`(\'%s\', \'%s\');';
    sql = sql.replace('%s', msg.nickname);
    sql = sql.replace('%s', msg.password);
    g_database.Query(sql, true, function (err, rows) {
        if (err) {
            msg.result = MSG_PLAYER_REGISTER_DBCL.Result.MARIADB_QUERY_ERROR;
            handler.SendPlayerRegisterMsg(client, msg);
            g_log.Error(err);
            return;
        };
        msg.result = Number(rows[0][0].return);
        handler.SendPlayerRegisterMsg(client, msg);
    });
}

module.exports = handler;