/**
 * 基础面板类
 * Created by pior on 15/9/28.
 */
var GameUtil;
(function (GameUtil) {
    var BassPanel = (function (_super) {
        __extends(BassPanel, _super);
        function BassPanel() {
            _super.call(this);
            this.mStageW = egret.MainContext.instance.stage.stageWidth;
            this.mStageH = egret.MainContext.instance.stage.stageHeight;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        var __egretProto__ = BassPanel.prototype;
        __egretProto__.onAddToStage = function (event) {
            this.init();
        };
        __egretProto__.init = function () {
        };
        return BassPanel;
    })(egret.DisplayObjectContainer);
    GameUtil.BassPanel = BassPanel;
    BassPanel.prototype.__class__ = "GameUtil.BassPanel";
    /*
     *场景类
     */
    var GameScene = (function () {
        function GameScene() {
        }
        var __egretProto__ = GameScene.prototype;
        GameScene.init = function (stage) {
            this.MainStage = stage;
        };
        GameScene.runscene = function (scene) {
            if (this.curScene != null) {
                this.MainStage.removeChild(this.curScene);
            }
            this.curScene = scene;
            this.MainStage.addChild(this.curScene);
        };
        GameScene.curScene = null;
        GameScene.MainStage = null;
        return GameScene;
    })();
    GameUtil.GameScene = GameScene;
    GameScene.prototype.__class__ = "GameUtil.GameScene";
})(GameUtil || (GameUtil = {}));
