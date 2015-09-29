/**
 * Created by pior on 15/9/22.
 */

module fighter
{
    export class GameStartScene extends GameUtil.BassPanel
    {
        public constructor()
        {
            super();
        }

        public init():void
        {
            var bg: egret.Bitmap = GameUtil.createBitmapByName("endBG_png");
            bg.x = this.mStageW/2;
            bg.y = this.mStageH/2;
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
            var startbtn: GameUtil.Menu = new GameUtil.Menu(this,"beginBtn_png","beginBtn_press_png",this.startGame);
            startbtn.x = this.mStageW/2;
            startbtn.y = this.mStageH/2;
            this.addChild(startbtn);

        }

        //private startGame(data:any,data2:any):void    //测试传参
        private startGame():void
        {
            GameUtil.GameScene.runscene(new fighter.GameScene());

           // console.log("data====",data,"     data2",data2);
        }
    }
}