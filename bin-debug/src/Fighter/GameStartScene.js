/**
 * Created by pior on 15/9/22.
 */
var fighter;
(function (fighter) {
    var GameStartScene = (function (_super) {
        __extends(GameStartScene, _super);
        function GameStartScene() {
            _super.call(this);
        }
        var __egretProto__ = GameStartScene.prototype;
        __egretProto__.init = function () {
            var bg = GameUtil.createBitmapByName("endBG_png");
            bg.x = this.mStageW / 2;
            bg.y = this.mStageH / 2;
            this.addChild(bg);
            //测试多个参数传值
            //var data:any = {
            //    "key":"kkkkk",
            //    "num":123
            //};
            //var data2:any = {
            //    "key":"rrrr",
            //    "num":455
            //};
            //var startbtn: GameUtil.Menu = new GameUtil.Menu(this,"beginBtn_png","beginBtn_press_png",this.startGame,[data,data2]);    //测试传参
            var startbtn = new GameUtil.Menu(this, "beginBtn_png", "beginBtn_press_png", this.startGame);
            startbtn.x = this.mStageW / 2;
            startbtn.y = this.mStageH / 2;
            this.addChild(startbtn);
        };
        //private startGame(data:any,data2:any):void    //测试传参
        __egretProto__.startGame = function () {
            GameUtil.GameScene.runscene(new fighter.GameScene());
            // console.log("data====",data,"     data2",data2);
        };
        return GameStartScene;
    })(GameUtil.BassPanel);
    fighter.GameStartScene = GameStartScene;
    GameStartScene.prototype.__class__ = "fighter.GameStartScene";
})(fighter || (fighter = {}));
