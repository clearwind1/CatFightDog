/**
 * Created by pior on 15/9/30.
 */

module fighter
{
    export class FighterPanel extends GameUtil.BassPanel
    {
        public constructor()
        {
            super();
        }

        private mEnemysp: egret.Bitmap;         //敌人
        private mMansp: egret.Bitmap;           //男主角
        private mFemalesp: egret.Bitmap;        //女主角
        private mHeroBlood: GameUtil.ProgressBar;       //主角血量
        private mEnemyBlood: GameUtil.ProgressBar;      //敌人血量

        private mHeroCurBlood: number;             //主角当前血量
        private mEnemyCurBlood: number;           //敌人当前血量

        private mScoreText: egret.TextField;        //分数
        private mScore: number;                 //当前分数

        private mCurRoundText: egret.TextField;     //回合数
        private mCurRound:number;               //当前回合数

        public init():void
        {
            //战斗背景
            var bg: egret.Bitmap = GameUtil.createBitmapByName("fightBg_png");
            bg.x = this.mStageW/2;
            bg.y = bg.texture.textureHeight/2;
            this.addChild(bg);

            this.mHeroCurBlood = fighter.GameConfig.gHeroTotalBlood;
            this.mEnemyCurBlood = fighter.GameConfig.gEnemyTotalBlood;
            this.mScore = 0;
            this.mCurRound = 1;

            //分数框
            var scoreframe: egret.Bitmap = GameUtil.createBitmapByName("scoreFrame_png");
            scoreframe.x = 416;
            scoreframe.y = 35;
            this.addChild(scoreframe);

            //分数
            this.mScoreText = GameUtil.createTextField(416,35,20);
            this.addChild(this.mScoreText);
            this.mScoreText.text = this.mScore+"";

            //回合数
            this.mCurRoundText = GameUtil.createTextField(240,40,40);
            this.addChild(this.mCurRoundText);
            this.mCurRoundText.text = "Round " + this.mCurRound;

            //创建角色
            this.createRole();

            //退出按钮
            var exitbtn: GameUtil.Menu = new GameUtil.Menu(this,"btn_start_png","btn_start_png",this.exitGame);
            exitbtn.x = 45;
            exitbtn.y = 40;
            exitbtn.setScaleMode();
            this.addChild(exitbtn);

            //
            this.mHeroBlood = new GameUtil.ProgressBar("loadingbar_png",30,290,new egret.Rectangle(4,4,292,16));
            this.addChild(this.mHeroBlood);

            //
            this.mEnemyBlood = new GameUtil.ProgressBar("enemyblood_png",this.mEnemysp.x - this.mEnemysp.texture.textureWidth/2 + 10,
                this.mEnemysp.y - this.mEnemysp.texture.textureHeight/2 - 30,new egret.Rectangle(4,4,80.6,16));
            this.addChild(this.mEnemyBlood);
        }

        private createRole():void
        {
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
        }

        private exitGame():void
        {
            GameUtil.GameScene.runscene(new fighter.GameStartScene());
        }

        public getRoundCount():number
        {
            return this.mCurRound;
        }

        public updateScoreText(diamodnum:number):void
        {
            this.mScore += diamodnum*10;
            this.mScoreText.text = this.mScore+"";
        }

        public updateRoundCount():void
        {
            this.mCurRound++;
            this.mCurRoundText.text = "Round " + this.mCurRound;
        }

        public setheroblood(hurtnum:number):void
        {
            this.mHeroCurBlood -= hurtnum;
            if(this.mHeroCurBlood <= 0)
                this.mHeroCurBlood = 0;

            this.updateBlood();
        }
        public setenemyblood(hurtnum:number):void
        {
            this.mEnemyCurBlood -= hurtnum;
            if(this.mEnemyCurBlood <= 0)
                this.mEnemyCurBlood = 0;

            this.updateBlood();
        }

        private updateBlood():void
        {
            this.mHeroBlood.setPercent(this.mHeroCurBlood/fighter.GameConfig.gHeroTotalBlood);
            this.mEnemyBlood.setPercent(this.mEnemyCurBlood/fighter.GameConfig.gEnemyTotalBlood);
        }


        public static instance: fighter.FighterPanel;
        public static getInstance():fighter.FighterPanel
        {
            if(null == this.instance)
            {
                this.instance = new fighter.FighterPanel();
            }

            return this.instance;
        }

    }
}