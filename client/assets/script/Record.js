const config = require('./Config');
const common = require('./protocol/Common');
const utility = require('./public/Utility');
const constant = require('./protocol/Constant');
const MSG_VIEW_RECORD_DBCL = require('./protocol/MSG_VIEW_RECORD_DBCL')['MSG_VIEW_RECORD_DBCL'];

function OpenWaitAction(isOpen) {
    cc.find('Bg/Wait', this.node).active = isOpen;
}

function UpdateKing3Record(node, record) {
    let nodeReason = node.getChildByName('Reason');
    let nodeDetail = node.getChildByName('Detail');
    let nodeTime = node.getChildByName('Time');

    let labelReason = nodeReason.getComponent(cc.Label);
    let labelDetail = nodeDetail.getComponent(cc.Label);
    let labelTime = nodeTime.getComponent(cc.Label);

    let notes = record.note.split('-');
    let objList = ['', '魏', '蜀', '吴'];
    let strReason = '三国鼎立-第' + notes[0] + '轮';
    labelReason.string = strReason + '选择' + objList[Number(notes[1])] + '出战';

    let strDetail = '出战:' + utility.SplitStr(record.costCoin) + '军饷    ';
    labelDetail.string = strDetail + '获得:' + utility.SplitStr(record.gainCoin) + '军饷';

    labelTime.string = record.time;
}

function UpdatePower7Record(node, record) {
    let nodeReason = node.getChildByName('Reason');
    let nodeDetail = node.getChildByName('Detail');
    let nodeTime = node.getChildByName('Time');

    let labelReason = nodeReason.getComponent(cc.Label);
    let labelDetail = nodeDetail.getComponent(cc.Label);
    let labelTime = nodeTime.getComponent(cc.Label);

    let notes = record.note.split('-');
    let objList = ['齐', '楚', '燕', '韩', '赵', '魏', '秦'];
    let strReason = '七雄争霸-第' + notes[0] + '轮';
    labelReason.string = strReason + '掌管' + objList[Number(notes[1])] + '国兵权';

    let strDetail = '出兵:' + utility.SplitStr(record.costCoin) + '军饷    ';
    labelDetail.string = strDetail + '获得:' + utility.SplitStr(record.gainCoin) + '军饷';

    labelTime.string = record.time;
}

function UpdateImpawnRecord(node, record) {
    let nodeReason = node.getChildByName('Reason');
    let nodeDetail = node.getChildByName('Detail');
    let nodeTime = node.getChildByName('Time');

    let labelReason = nodeReason.getComponent(cc.Label);
    let labelDetail = nodeDetail.getComponent(cc.Label);
    let labelTime = nodeTime.getComponent(cc.Label);

    let notes = record.note.split('-');
    let objList = ['汉军', '楚军'];
    let strReason = '楚汉相争-第' + notes[0] + '轮';
    labelReason.string = strReason + '支持' + objList[Number(notes[1])];

    let strDetail = '投入:';
    if (record.costCoin > 0) {
        strDetail = strDetail + utility.SplitStr(record.costCoin) + '军饷';
    }
    if (record.costCoin > 0 && record.costSubcoin > 0) strDetail += '+';
    if (record.costSubcoin > 0) {
        strDetail = strDetail + utility.SplitStr(record.costSubcoin) + '军粮';
    }

    strDetail += '    获得:';
    if ((record.gainCoin === 0 && record.gainSubcoin === 0) || record.gainCoin > 0) {
        strDetail = strDetail + utility.SplitStr(record.gainCoin) + '军饷';
    }
    if (record.gainCoin > 0 && record.gainSubcoin > 0) strDetail += '+';
    if (record.gainSubcoin > 0) {
        strDetail = strDetail + utility.SplitStr(record.gainSubcoin) + '军粮';
    }

    labelDetail.string = strDetail;

    labelTime.string = record.time;
}

function UpdateUpdateRecord(node, record) {
    let nodeReason = node.getChildByName('Reason');
    let nodeDetail = node.getChildByName('Detail');
    let nodeTime = node.getChildByName('Time');

    let labelReason = nodeReason.getComponent(cc.Label);
    let labelDetail = nodeDetail.getComponent(cc.Label);
    let labelTime = nodeTime.getComponent(cc.Label);

    let strReason = '';
    if (record.reason === common.Reason.STATIC_AD) {
        strReason = '查看静态广告';
    } else if (record.reason === common.Reason.ANIMATE_AD) {
        strReason = '查看动态广告';
    } else if (record.reason === common.Reason.VIEW_RECORD) {
        strReason = '查看游戏记录';
    } else if (record.reason === common.Reason.SHOP_RECHARGE) {
        strReason = '充值军饷';
    } else if (record.reason === common.Reason.KING3_UNLOCK) {
        strReason = '三国鼎立房间解锁';
    } else if (record.reason === common.Reason.POWER7_UNLOCK) {
        strReason = '七雄争霸房间解锁';
    } else if (record.reason === common.Reason.KING3_REFUND) {
        let notes = record.note.split('-');
        strReason = '三国鼎立第' + notes[0] + '轮失效预扣退还';
    } else if (record.reason === common.Reason.POWER7_REFUND) {
        let notes = record.note.split('-');
        strReason = '七雄争霸第' + notes[0] + '轮第' + notes[1] + '场失效预扣退还';
    } else if (record.reason === common.Reason.IMPAWN_REFUND) {
        let objList = ['汉军', '楚军'];
        let notes = record.note.split('-');
        let objName = objList[Number(notes[1])];
        strReason = '楚汉相争第' + notes[0] + '轮投' + objName + '失效预扣退还';
    } else if (record.reason === common.Reason.ALTER_NICKNAME) {
        strReason = '修改昵称';
    } else if (record.reason === common.Reason.MAIL_SEND_GIFT) {
        let notes = record.note.split('-');
        if (record.gainCoin > 0) {
            strReason = '从‘' + notes[0] + '’收到红包';
        } else {
            strReason = '向‘' + notes[0] + '’发送红包';
        }
    } else if (record.reason === common.Reason.TICKET_EXCHANGE) {
        strReason = '兑换军饷';
    } else if (record.reason === common.Reason.SIGNIN_AWARD) {
        strReason = '限时领奖';
    } else if (record.reason === common.Reason.SYSTEM_AWARD) {
        strReason = '系统奖励';
    }
    labelReason.string = strReason;

    let strDetail = '';
    if (record.gainCoin !== 0 || record.reason === common.Reason.ALTER_NICKNAME) {
        if (record.gainCoin > 0) strDetail += '+';
        strDetail = strDetail + utility.SplitStr(record.gainCoin) + '军饷';
    }
    if (record.gainCoin !== 0 && record.gainSubcoin !== 0) strDetail += '    ';
    if (record.gainSubcoin !== 0) {
        if (record.gainSubcoin > 0) strDetail += '+';
        strDetail = strDetail + utility.SplitStr(record.gainSubcoin) + '军粮';
    }
    labelDetail.string = strDetail;

    labelTime.string = record.time;
}

function UpdateList() {
    let nodeContent = cc.find('Bg/List/view/content', this.node);
    let listLength = nodeContent.childrenCount;
    let minLength = Math.min(listLength + 20, this.recordList.length);
    for (let i = listLength; i < minLength; ++i) {
        let nodeRecordItem = cc.instantiate(this.recordItemPrefab);
        let bgSprite = (i % 2 === 0) ? this.recordBg2Sprite : this.recordBg1Sprite;
        nodeRecordItem.getComponent(cc.Sprite).spriteFrame = bgSprite;
        nodeContent.addChild(nodeRecordItem);
        let record = this.recordList[i];
        if (record.reason >= 0) {
            UpdateUpdateRecord.call(this, nodeRecordItem, record);
        } else {
            let reason = -record.reason;
            if (reason === common.Location.KING3) {
                UpdateKing3Record.call(this, nodeRecordItem, record);
            } else if (reason === common.Location.POWER7) {
                UpdatePower7Record.call(this, nodeRecordItem, record);
            } else if (reason === common.Location.IMPAWN) {
                UpdateImpawnRecord.call(this, nodeRecordItem, record);
            }
        }
    }
}

function ClearList() {
    let nodeList = cc.find('Bg/List', this.node);
    nodeList.getComponent(cc.ScrollView).scrollToTop(0.1);

    let nodeContent = cc.find('Bg/List/view/content', this.node);
    nodeContent.removeAllChildren();
}

function GetCost() {
    let nodeBeginTime = cc.find('Bg/BeginTime/Label', this.node);
    let strBeginTime = nodeBeginTime.getComponent(cc.Label).string;
    let nodeEndTime = cc.find('Bg/EndTime/Label', this.node);
    let strEndTime = nodeEndTime.getComponent(cc.Label).string;

    let beginTimestamp = constant.StrTimeToTimestamp(strBeginTime);
    let endTimestamp = constant.StrTimeToTimestamp(strEndTime);

    let diffTimestamp = endTimestamp - beginTimestamp;
    let diffDays = Math.ceil(diffTimestamp / constant.ONE_DAY_MSEL);
    return constant.VIEW_RECORD_COST[diffDays + 1];
}

function UpdateTime(days) {
    if (!days) return;
    days = days - 1;

    let endTimestamp = (new Date()).getTime();
    let beginTimestamp = endTimestamp - days * constant.ONE_DAY_MSEL;

    let endDate = new Date(endTimestamp);
    let beginDate = new Date(beginTimestamp);
    let strEndDate = utility.FormatDate('YYYY-mm-dd', endDate);
    let strBeginDate = utility.FormatDate('YYYY-mm-dd', beginDate);

    let nodeBeginTime = cc.find('Bg/BeginTime/Label', this.node);
    nodeBeginTime.getComponent(cc.Label).string = strBeginDate;
    let nodeEndTime = cc.find('Bg/EndTime/Label', this.node);
    nodeEndTime.getComponent(cc.Label).string = strEndDate;
}

function UpdateCost() {
    let tips = '数据错误，请关闭界面重进';
    let cost = GetCost.call(this);
    if (cost === 0) {
        tips = '免费搜索今日游戏记录';
    } else if (cost > 0) {
        tips = '搜索此时间范围游戏记录需花费' + utility.SplitStr(cost) + '军饷';
    }
    let nodeCostTips = cc.find('Bg/CostTips', this.node);
    nodeCostTips.getComponent(cc.Label).string = tips;
}

function OnDayBtn(days) {
    UpdateTime.call(this, days);
    UpdateCost.call(this);
}

function OnSearchBtn() {
    let cost = GetCost.call(this);
    if (cost === null) {
        g_msgbox.Show(null, '查询数据非法，请稍后重试', g_msgbox.MB_OK);
        return;
    }
    if (g_player.GetProp(common.PropID.COIN) < cost) {
        g_msgbox.ShopMsgBox('您军饷不足，无法进行搜索');
        return;
    }

    let nodeBeginTime = cc.find('Bg/BeginTime/Label', this.node);
    let strBeginTime = nodeBeginTime.getComponent(cc.Label).string;
    let nodeEndTime = cc.find('Bg/EndTime/Label', this.node);
    let strEndTime = nodeEndTime.getComponent(cc.Label).string;

    let strNowTime = utility.FormatDate('YYYY-mm-dd');
    if (strEndTime !== strNowTime) {
        g_msgbox.Show(null, '今天日期已改变，请重试', g_msgbox.MB_OK);
        OnDayBtn.call(this, 1);
        return;
    }

    let itemName = config.itemName.record + g_player.GetPID();
    let nodeSearchBtn = cc.find('Bg/SearchBtn', this.node);
    let msg = { cost: cost, beginTime: strBeginTime, endTime: strEndTime };

    function DoSearch() {
        if (cost > 0) g_player.SetProp(common.PropID.COIN, -cost);
        nodeSearchBtn.getComponent(cc.Button).interactable = false;
        g_handler.SendViewRecordMsg(g_connclient, msg);
        OpenWaitAction.call(this, true);
        ClearList.call(this);
    }

    if (cost === 0 || cc.sys.localStorage.getItem(itemName)) {
        DoSearch.call(this);
    } else {
        let options = { height: 260 };
        options[g_msgbox.BT_NO] = '拒绝';
        options[g_msgbox.BT_YES] = '同意';
        let tips = config.recordCostTips;
        tips = tips.replace('%s', utility.SplitStr(cost));
        g_msgbox.Show(null, tips, g_msgbox.MB_YESNO, function (result) {
            if (result === g_msgbox.BT_NO) return;
            cc.sys.localStorage.setItem(itemName, true);
            DoSearch.call(this);
        }.bind(this), options);
    }
}

cc.Class({
    extends: cc.Component,

    properties: {
        recordItemPrefab: {
            default: null,
            type: cc.Prefab,
        },
        recordBg1Sprite: {
            default: null,
            type: cc.SpriteFrame,
        },
        recordBg2Sprite: {
            default: null,
            type: cc.SpriteFrame,
        },
    },

    Show() {
        this.node.active = true;
        OnDayBtn.call(this, 1);
    },

    start() {
        this.searchTimestamp = 0;
        this.recordList = new Array();

        let waitNode = cc.find('Bg/Wait', this.node);
        waitNode.runAction(cc.repeatForever(cc.rotateBy(1.5, 180)));
        OpenWaitAction.call(this, false);

        g_uiemitter.on('UI_VIEW_RECORD', function (msg) {
            OpenWaitAction.call(this, false);
            let nodeSearchBtn = cc.find('Bg/SearchBtn', this.node);
            nodeSearchBtn.getComponent(cc.Button).interactable = true;

            if (msg.result === MSG_VIEW_RECORD_DBCL.Result.SUCCESS) {
                if (msg.isNew) {
                    let isNone = (msg.recordList.length === 0);
                    cc.find('Bg/None', this.node).active = isNone;
                    cc.find('Bg/Tips', this.node).active = false;
                    this.recordList = msg.recordList;
                    ClearList.call(this);
                    UpdateList.call(this);
                } else {
                    this.recordList = this.recordList.concat(msg.recordList);
                }
                return;
            }

            let tips = '搜索失败，请稍后重试';
            if (msg.cost > 0) tips += '，花费军饷已退还';
            if (msg.result === MSG_VIEW_RECORD_DBCL.Result.NO_CLIENT_INFO) {
                tips = '您信息缺失，' + tips;
            } else if (msg.result === MSG_VIEW_RECORD_DBCL.Result.OFFLINE) {
                tips = '服务不在线，' + tips;
            } else if (msg.result === MSG_VIEW_RECORD_DBCL.Result.PARAM_ERROR) {
                tips = '消息参数错误，' + tips;
                OnDayBtn.call(this, 1);
            } else if (msg.result === MSG_VIEW_RECORD_DBCL.Result.REDIS_ERROR) {
                tips = '数据库操作错误，' + tips;
            } else if (msg.result === MSG_VIEW_RECORD_DBCL.Result.REDIS_FAIL) {
                tips = '数据库操作失败，' + tips;
            } else if (msg.result === MSG_VIEW_RECORD_DBCL.Result.NO_PLAYER_INFO) {
                tips = '您信息不在线，' + tips;
            } else if (msg.result === MSG_VIEW_RECORD_DBCL.Result.LACK_COIN) {
                tips = '军饷不足，' + tips;
            } else if (msg.result === MSG_VIEW_RECORD_DBCL.Result.DB_QUERY_ERROR) {
                tips = '数据库查询失败，' + tips;
            } else {
                tips = String(msg.result) + '未知错误，' + tips;
            }
            g_msgbox.Show(null, tips, g_msgbox.MB_OK);
        }.bind(this));

        cc.find('Bg/OperBtn/1DayBtn', this.node).on('click', function () {
            OnDayBtn.call(this, 1);
        }, this);
        cc.find('Bg/OperBtn/2DayBtn', this.node).on('click', function () {
            OnDayBtn.call(this, 2);
        }, this);
        cc.find('Bg/OperBtn/3DayBtn', this.node).on('click', function () {
            OnDayBtn.call(this, 3);
        }, this);
        cc.find('Bg/OperBtn/5DayBtn', this.node).on('click', function () {
            OnDayBtn.call(this, 5);
        }, this);

        cc.find('Bg/List', this.node).on('scroll-to-bottom', function () {
            UpdateList.call(this);
        }, this);

        cc.find('Bg/SearchBtn', this.node).on('click', function () {
            let nowTimestamp = (new Date()).getTime();
            if (nowTimestamp < this.searchTimestamp) return;
            this.searchTimestamp = nowTimestamp + 3000;
            OnSearchBtn.call(this);
        }, this);

        this.node.on(cc.Node.EventType.TOUCH_END, function () {
            this.node.active = false;
        }, this);
    },
});
