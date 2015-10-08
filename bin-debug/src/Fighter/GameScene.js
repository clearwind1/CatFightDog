/**
 * Created by pior on 15/9/22.
 * 游戏场景
 */
var fighter;
(function (fighter) {
    var GameScene = (function (_super) {
        __extends(GameScene, _super);
        function GameScene() {
            _super.call(this);
        }
        var __egretProto__ = GameScene.prototype;
        __egretProto__.init = function () {
            var bg = GameUtil.createBitmapByName("endBG_png");
            bg.x = this.mStageW / 2;
            bg.y = this.mStageH / 2;
            this.addChild(bg);
            this.diamodeFightscene = new fighter.DiamodFightScene();
            this.addChild(this.diamodeFightscene);
            this.fightPanel = fighter.FighterPanel.getInstance();
            this.addChild(this.fightPanel);
            var parm = {
                "q": "Json"
            };
            GameUtil.Http.getinstance(egret.URLRequestMethod.GET).send(parm, "", this.testHttpOk, this);
        };
        __egretProto__.testHttpOk = function (data) {
            console.log("data=======", data);
        };
        return GameScene;
    })(GameUtil.BassPanel);
    fighter.GameScene = GameScene;
    GameScene.prototype.__class__ = "fighter.GameScene";
})(fighter || (fighter = {}));
