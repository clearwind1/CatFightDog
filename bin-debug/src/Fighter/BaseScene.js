/**
 * Created by pior on 15/9/22.
 */
var fighter;
(function (fighter) {
    var BaseScene = (function (_super) {
        __extends(BaseScene, _super);
        function BaseScene() {
            _super.call(this);
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        var __egretProto__ = BaseScene.prototype;
        __egretProto__.onAddToStage = function (event) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.init();
        };
        __egretProto__.init = function () {
        };
        return BaseScene;
    })(egret.DisplayObjectContainer);
    fighter.BaseScene = BaseScene;
    BaseScene.prototype.__class__ = "fighter.BaseScene";
})(fighter || (fighter = {}));
