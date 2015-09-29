/**
 * 菜单，按钮类
 * Created by pior on 15/9/28.
 */
var GameUtil;
(function (GameUtil) {
    /*
     *创建按钮
     */
    var Menu = (function (_super) {
        __extends(Menu, _super);
        function Menu(context, normal, select, backFun, param) {
            if (backFun === void 0) { backFun = null; }
            if (param === void 0) { param = null; }
            _super.call(this);
            this.menuNormalTexture = null;
            this.menuSelectTexture = null;
            this.thisObj = context;
            this.param = param;
            this.init(normal, select, backFun);
        }
        var __egretProto__ = Menu.prototype;
        __egretProto__.init = function (normal, select, backFun) {
            if (backFun === void 0) { backFun = null; }
            this.anchorX = this.anchorY = 0.5;
            this.menuNormalTexture = RES.getRes(normal);
            this.menuSelectTexture = RES.getRes(select);
            this.backFun = backFun;
            this.btnImg = new egret.Bitmap();
            this.btnImg.texture = this.menuNormalTexture;
            this.addChild(this.btnImg);
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.TouchBegin, this);
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.TouchMove, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.TouchEnd, this);
            this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.TouchCancel, this);
        };
        __egretProto__.TouchBegin = function (event) {
            //console.log("touchbegin");
            this.btnImg.texture = this.menuSelectTexture;
        };
        __egretProto__.TouchMove = function (event) {
            //console.log("touchmove");
        };
        __egretProto__.TouchEnd = function (event) {
            //console.log("touchend");
            this.btnImg.texture = this.menuNormalTexture;
            this.backFun.apply(this.thisObj, this.param);
        };
        __egretProto__.TouchCancel = function (event) {
            //console.log("touchcancel");
            this.btnImg.texture = this.menuNormalTexture;
        };
        return Menu;
    })(egret.DisplayObjectContainer);
    GameUtil.Menu = Menu;
    Menu.prototype.__class__ = "GameUtil.Menu";
})(GameUtil || (GameUtil = {}));
