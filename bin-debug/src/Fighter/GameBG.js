/**
 * Created by pior on 15/9/16.
 */
var fighter;
(function (fighter) {
    var GameBG = (function (_super) {
        __extends(GameBG, _super);
        function GameBG() {
            _super.call(this);
            this.bgArr = [];
            this.bgSpeed = 2;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        var __egretProto__ = GameBG.prototype;
        __egretProto__.onAddToStage = function (event) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.stageH = this.stage.stageHeight;
            this.stageW = this.stage.stageWidth;
            this.textureHeight = RES.getRes("bgImage").textureHeight;
            this.textureWidth = RES.getRes("bgImage").textureWidth;
            this.bgCount = Math.ceil(this.stageW / this.textureWidth) + 1;
            for (var i = this.bgCount - 1; i >= 0; i--) {
                var bg = GameUtil.createBitmapByName("bgImage");
                bg.x = this.textureWidth * i;
                this.addChild(bg);
                this.bgArr.push(bg);
            }
        };
        __egretProto__.start = function () {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.runGameBackground, this);
            this.addEventListener(egret.Event.ENTER_FRAME, this.runGameBackground, this);
        };
        __egretProto__.pause = function () {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.runGameBackground, this);
        };
        __egretProto__.runGameBackground = function (event) {
            for (var i = 0; i < this.bgCount; i++) {
                var bg = this.bgArr[i];
                bg.x -= this.bgSpeed;
                if (bg.x < -this.stageW) {
                    this.bgArr.pop();
                    bg.x = this.bgArr[0].x + this.textureWidth;
                    this.bgArr.unshift(bg);
                }
            }
        };
        return GameBG;
    })(egret.DisplayObjectContainer);
    fighter.GameBG = GameBG;
    GameBG.prototype.__class__ = "fighter.GameBG";
})(fighter || (fighter = {}));
