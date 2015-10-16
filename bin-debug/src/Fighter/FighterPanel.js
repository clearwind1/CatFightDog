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
            this.mScoreText = GameUtil.createTextField(416, 35, 20);
            this.addChild(this.mScoreText);
            this.mScoreText.text = this.mScore + "";
            //回合数
            this.mCurRoundText = GameUtil.createTextField(240, 40, 40);
            this.addChild(this.mCurRoundText);
            this.mCurRoundText.text = "Round " + this.mCurRound;
            //创建角色
            this.createRole();
            //退出按钮
            var exitbtn = new GameUtil.Menu(this, "btn_start_png", "btn_start_png", this.exitGame);
            exitbtn.x = 45;
            exitbtn.y = 40;
            exitbtn.setScaleMode();
            this.addChild(exitbtn);
            //
            this.mHeroBlood = new GameUtil.ProgressBar("loadingbar_png", 30, 290, new egret.Rectangle(4, 4, 292, 16));
            this.addChild(this.mHeroBlood);
            //
            this.mEnemyBlood = new GameUtil.ProgressBar("enemyblood_png", this.mEnemysp.x - this.mEnemysp.texture.textureWidth / 2 + 10, this.mEnemysp.y - this.mEnemysp.texture.textureHeight / 2 - 30, new egret.Rectangle(4, 4, 80.6, 16));
            this.addChild(this.mEnemyBlood);
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
        //退出游戏
        __egretProto__.exitGame = function () {
            GameUtil.GameScene.runscene(new fighter.GameStartScene());
        };
        //获取回合数
        __egretProto__.getRoundCount = function () {
            return this.mCurRound;
        };
        //更新玩家分数
        __egretProto__.updateScoreText = function (diamodnum) {
            this.mScore += diamodnum * 10;
            this.mScoreText.text = this.mScore + "";
        };
        //更新回合数
        __egretProto__.updateRoundCount = function () {
            this.mCurRound++;
            this.mCurRoundText.text = "Round " + this.mCurRound;
        };
        //设置玩家血量
        __egretProto__.setheroblood = function (hurtnum) {
            this.mHeroCurBlood -= hurtnum;
            if (this.mHeroCurBlood <= 0)
                this.mHeroCurBlood = 0;
            this.updateBlood();
        };
        //设置敌人血量
        __egretProto__.setenemyblood = function (hurtnum) {
            this.mEnemyCurBlood -= hurtnum;
            if (this.mEnemyCurBlood <= 0)
                this.mEnemyCurBlood = 0;
            this.updateBlood();
        };
        //更新血量
        __egretProto__.updateBlood = function () {
            this.mHeroBlood.setPercent(this.mHeroCurBlood / fighter.GameConfig.gHeroTotalBlood);
            this.mEnemyBlood.setPercent(this.mEnemyCurBlood / fighter.GameConfig.gEnemyTotalBlood);
        };
        //战斗处理
        __egretProto__.fightHandler = function (sdLength) {
            this.fightcover = GameUtil.createRect(0, 300, 480, 500, 0.3);
            this.addChild(this.fightcover);
            //角色回合
            var parma = {
                "length": sdLength
            };
            var tw = egret.Tween.get(this.mMansp);
            tw.to({ x: 140, y: 194 }, 700).call(this.heroRuound, this, [parma]);
        };
        //玩家回合动作处理
        __egretProto__.heroRuound = function (parma) {
            //console.log("length=====",parma);
            var roundc = this.getRoundCount();
            if (roundc % 3 == 0) {
                var tw = egret.Tween.get(this.mMansp);
                tw.to({ x: 364, y: 205 }, 700).call(this.enemyRoundStart, this);
            }
            else {
                var tw = egret.Tween.get(this.mMansp);
                tw.to({ x: 364, y: 205 }, 700);
            }
            this.updateScoreText(parma['length']);
            this.setenemyblood(parma['length']);
            GameUtil.numberUpDisp(this, this.mEnemysp.x, this.mEnemysp.y - this.mEnemysp.texture.textureHeight / 2, 25, "-" + parma['length'], 0xFF0000);
            if (roundc % 3 != 0) {
                this.updateRoundCount();
                this.removeChild(this.fightcover);
                fighter.DiamodFightScene.getInstance().setGameState();
            }
        };
        //敌人动作处理
        __egretProto__.enemyRoundStart = function () {
            //敌人回合
            var tw = egret.Tween.get(this.mEnemysp);
            tw.to({ x: 334, y: 205 }, 700).call(this.enemyRound, this);
        };
        __egretProto__.enemyRound = function () {
            var tw = egret.Tween.get(this.mEnemysp);
            tw.to({ x: 111, y: 194 }, 700);
            var bloodcover = GameUtil.createRect(0, 0, 480, 800, 0.3, 0xff0000);
            this.addChild(bloodcover);
            var local = this;
            egret.setTimeout(function () {
                local.removeChild(bloodcover);
            }, this, 400);
            this.setheroblood(10);
            GameUtil.numberUpDisp(this, this.mMansp.x, this.mMansp.y - this.mMansp.texture.textureHeight / 2, 25, "-" + 10, 0xFF0000);
            this.updateRoundCount();
            this.removeChild(this.fightcover);
            fighter.DiamodFightScene.getInstance().setGameState();
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
