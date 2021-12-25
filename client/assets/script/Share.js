cc.Class({
    extends: cc.Component,

    Show() {
        this.node.active = true;
    },

    start() {
        this.node.on(cc.Node.EventType.TOUCH_END, function () {
            this.node.active = false;
        }, this);
    },
});
