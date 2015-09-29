/**
 * Created by pior on 15/9/16.
 */
module fighter
{
    export class GameBG extends egret.DisplayObjectContainer
    {

        private stageW:number;
        private stageH:number;
        private bgArr:egret.Bitmap[] = [];
        private textureHeight:number;
        private textureWidth:number;
        private bgCount:number;

        private bgSpeed:number = 2;

        public constructor()
        {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        }

        private onAddToStage(event:egret.Event):void
        {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
            this.stageH = this.stage.stageHeight;
            this.stageW = this.stage.stageWidth;
            this.textureHeight = RES.getRes("bgImage").textureHeight;
            this.textureWidth = RES.getRes("bgImage").textureWidth;
            this.bgCount = Math.ceil(this.stageW/this.textureWidth)+1;
            //console.log("bgcount=====",this.stageH);
            for(var i:number = this.bgCount-1;i >= 0;i--)
            {
                var bg:egret.Bitmap = GameUtil.createBitmapByName("bgImage");
                bg.x = this.textureWidth*i;
                this.addChild(bg);
                this.bgArr.push(bg);
            }
        }

        public start():void
        {
            this.removeEventListener(egret.Event.ENTER_FRAME,this.runGameBackground,this);
            this.addEventListener(egret.Event.ENTER_FRAME,this.runGameBackground,this);
        }
        public pause():void
        {
            this.removeEventListener(egret.Event.ENTER_FRAME,this.runGameBackground,this);
        }

        private runGameBackground(event:egret.Event):void
        {
            for(var i:number = 0;i < this.bgCount;i++)
            {
                var bg:egret.Bitmap = this.bgArr[i];
                bg.x -= this.bgSpeed;
                if(bg.x < -this.stageW)
                {
                    this.bgArr.pop();
                    bg.x = this.bgArr[0].x + this.textureWidth;
                    this.bgArr.unshift(bg);
                }
            }
        }
    }
}