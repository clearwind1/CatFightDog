/**
 * Created by pior on 15/9/30.
 */
var fighter;
(function (fighter) {
    var FighterPanel = (function (_super) {
        __extends(FighterPanel, _super);
        function FighterPanel() {
            _super.call(this);
        }
        var __egretProto__ = FighterPanel.prototype;
        __egretProto__.init = function () {
            //战斗背景
            var bg = GameUtil.createBitmapByName("fightBg_png");
            bg.x = this.mStageW / 2;
            bg.y = bg.texture.textureHeight / 2;
            this.addChild(bg);
            this.mHeroCurBlood = fighter.GameConfig.gHeroTotalBlood;
            this.mEnemyCurBlood = fighter.GameConfig.gEnemyTotalBlood;
            this.mScore = 0;
            this.mCurRound = 1;
            //分数框
            var scoreframe = GameUtil.createBitmapByName("scoreFrame_png");
            scoreframe.x = 416;
            scoreframe.y = 35;
            this.addChild(scoreframe);
            //分数
            this.mScoreText = new egret.TextField();
            this.addChild(this.mScoreText);
            this.mScoreText.x = 416;
            this.mScoreText.y = 35;
            this.mScoreText.anchorX = this.mScoreText.anchorY = 0.5;
            this.mScoreText.size = 20;
            this.mScoreText.text = this.mScore + "";
            this.mScoreText.textAlign = "center";
            //回合数
            this.mCurRoundText = new egret.TextField();
            this.addChild(this.mCurRoundText);
            this.mCurRoundText.x = 240;
            this.mCurRoundText.y = 40;
            this.mCurRoundText.anchorX = this.mCurRoundText.anchorY = 0.5;
            this.mCurRoundText.size = 40;
            this.mCurRoundText.text = "Round " + this.mCurRound;
            this.mCurRoundText.textAlign = "center";
            //创建角色
            this.createRole();
            //退出按钮
            var exitbtn = new GameUtil.Menu(this, "btn_start_png", "btn_start_png", this.exitGame);
            exitbtn.x = 45;
            exitbtn.y = 40;
            exitbtn.setScaleMode();
            this.addChild(exitbtn);
            //
            this.mHeroBlood = GameUtil.createBitmapByName("loadingbar_png");
            this.mHeroBlood.x = 30;
            this.mHeroBlood.y = 290;
            var rect = new egret.Rectangle(4, 4, 292, 16);
            this.mHeroBlood.scale9Grid = rect;
            this.addChild(this.mHeroBlood);
            this.mHeroBlood.anchorX = 0;
            //
            this.mEnemyBlood = GameUtil.createBitmapByName("enemyblood_png");
            this.mEnemyBlood.x = this.mEnemysp.x - this.mEnemysp.texture.textureWidth / 2 + 10;
            this.mEnemyBlood.y = this.mEnemysp.y - this.mEnemysp.texture.textureHeight / 2 - 30;
            var erect = new egret.Rectangle(4, 4, 80.6, 16);
            this.mEnemyBlood.scale9Grid = erect;
            this.addChild(this.mEnemyBlood);
            this.mEnemyBlood.anchorX = 0;
        };
        __egretProto__.createRole = function () {
            this.mEnemysp = GameUtil.createBitmapByName("hero-01_png");
            this.mEnemysp.x = 111;
            this.mEnemysp.y = 194;
            this.addChild(this.mEnemysp);
            this.mMansp = GameUtil.createBitmapByName("hero-02_png");
            this.mMansp.x = 364;
            this.mMansp.y = 205;
            this.addChild(this.mMansp);
            this.mFemalesp = GameUtil.createBitmapByName("hero-03_png");
            this.mFemalesp.x = 311;
            this.mFemalesp.y = 129;
            this.addChild(this.mFemalesp);
        };
        __egretProto__.exitGame = function () {
            GameUtil.GameScene.runscene(new fighter.GameStartScene());
        };
        __egretProto__.getRoundCount = function () {
            return this.mCurRound;
        };
        __egretProto__.updateScoreText = function (diamodnum) {
            this.mScore += diamodnum * 10;
            this.mScoreText.text = this.mScore + "";
        };
        __egretProto__.updateRoundCount = function () {
            this.mCurRound++;
            this.mCurRoundText.text = "Round " + this.mCurRound;
        };
        __egretProto__.setheroblood = function (hurtnum) {
            this.mHeroCurBlood -= hurtnum;
            if (this.mHeroCurBlood <= 0)
                this.mHeroCurBlood = 0;
            this.updateBlood();
        };
        __egretProto__.setenemyblood = function (hurtnum) {
            this.mEnemyCurBlood -= hurtnum;
            if (this.mEnemyCurBlood <= 0)
                this.mEnemyCurBlood = 0;
            this.updateBlood();
        };
        __egretProto__.updateBlood = function () {
            this.mHeroBlood.width = this.mHeroBlood.texture.textureWidth * (this.mHeroCurBlood / fighter.GameConfig.gHeroTotalBlood);
            this.mEnemyBlood.width = this.mEnemyBlood.texture.textureWidth * (this.mEnemyCurBlood / fighter.GameConfig.gEnemyTotalBlood);
        };
        FighterPanel.getInstance = function () {
            if (null == this.instance) {
                this.instance = new fighter.FighterPanel();
            }
            return this.instance;
        };
        return FighterPanel;
    })(GameUtil.BassPanel);
    fighter.FighterPanel = FighterPanel;
    FighterPanel.prototype.__class__ = "fighter.FighterPanel";
})(fighter || (fighter = {}));
