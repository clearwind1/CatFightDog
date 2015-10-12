/**
 * Created by pior on 15/9/22.
 * 游戏场景
 */

module fighter {
    export class GameScene extends GameUtil.BassPanel {

        private fightPanel:fighter.FighterPanel;
        private diamodeFightscene:fighter.DiamodFightScene;

        public constructor() {
            super();
        }

        public init():void {

            var bg: egret.Bitmap = GameUtil.createBitmapByName("endBG_png");
            bg.x = this.mStageW/2;
            bg.y = this.mStageH/2;
            this.addChild(bg);

            this.diamodeFightscene = fighter.DiamodFightScene.getInstance();
            this.addChild(this.diamodeFightscene);

            this.fightPanel = fighter.FighterPanel.getInstance();
            this.addChild(this.fightPanel);


            var parm:any = {
                "q":"Json"
            };
            //GameUtil.Http.getinstance(egret.URLRequestMethod.GET).send(parm,"",this.testHttpOk,this);

        }

        private testHttpOk(data:any):void
        {
            console.log("data=======",data);
        }
    }
}