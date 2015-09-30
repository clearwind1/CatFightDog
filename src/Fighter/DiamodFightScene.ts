/**
 * Created by pior on 15/9/30.
 */
module fighter
{
    export class DiamodFightScene extends GameUtil.BassPanel
    {
        private offX: number = 12;
        private offY: number = 330;
        private MaxRow:number = 7;              //宝石列数
        private MaxCol:number = 7;              //宝石行数
        private MaxDiamod:number = this.MaxCol * this.MaxRow;   //宝石总数
        private diamod:fighter.DiamodSprite[] = [];             //宝石数组
        private selectdiamod:fighter.DiamodSprite[] = [];       //选取的宝石数组
        private chosediamod:fighter.DiamodSprite;               //当前选中的宝石

        private bPause:boolean = false;

        public constructor() {
            super();
        }

        public init():void {
            //初始化
            for (var i:number = 0; i < this.MaxRow; i++) {
                for (var j:number = 0; j < this.MaxCol; j++) {
                    var num:number = 1 + (Math.ceil(Math.random() * 100)) % 6;
                    var tdiamod:fighter.DiamodSprite = new fighter.DiamodSprite(i * this.MaxCol + j, num);

                    tdiamod.x = this.offX + tdiamod.width * i;
                    tdiamod.y = this.offY + tdiamod.height * j;

                    this.addChild(tdiamod);
                    this.diamod.push(tdiamod);
                }
            }

            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchbegin, this);
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchmove, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchend, this);
            this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchcancel, this);

        }

        private enternframe():void
        {
            this.downDiamod();  //宝石下落

            egret.setTimeout(this.setGameState,this,400);
        }

        public setGameState():void
        {
            this.bPause = false;
            this.touchEnabled = true;
        }

        private onTouchbegin(event:egret.TouchEvent):void {
            var px:number = event.localX;
            var py:number = event.localY;

            for (var i:number = 0; i < this.MaxDiamod; i++) {
                var tdiamod:fighter.DiamodSprite = this.diamod[i];

                var p:egret.Point = tdiamod.globalToLocal(px, py);

                if (tdiamod.getBounds().containsPoint(p)) {
                    //console.log("touchid============",tdiamod.ID);
                    this.chosediamod = tdiamod;
                    this.selectdiamod.push(tdiamod);
                    tdiamod.scaleX = tdiamod.scaleY = 1.2;
                    break;
                }
            }
        }

        private onTouchmove(event:egret.TouchEvent):void {
            var px:number = event.localX;
            var py:number = event.localY;

            for (var i:number = 0; i < this.MaxDiamod; i++) {
                var tdiamod:fighter.DiamodSprite = this.diamod[i];

                var p:egret.Point = tdiamod.globalToLocal(px, py);

                //判断当前宝石是否可以选取
                if (this.selectdiamod.indexOf(tdiamod) == -1 && tdiamod.getBounds().containsPoint(p) && tdiamod.attId == this.chosediamod.attId && this.chosediamod.checkscop(this.MaxRow, this.MaxCol, tdiamod.ID)) {
                    this.chosediamod = tdiamod;
                    this.selectdiamod.push(tdiamod);
                    tdiamod.scaleX = tdiamod.scaleY = 1.2;
                    break;
                }

                //判断当前宝石是否可以取消
                if (this.selectdiamod.length >= 2) {

                    var len:number = this.selectdiamod.length;
                    if (tdiamod.getBounds().containsPoint(p) && tdiamod.ID == this.selectdiamod[len - 2].ID) {
                        // console.log("tdiamodid=======",tdiamod.ID);
                        this.selectdiamod[len - 1].scaleX = this.selectdiamod[len - 1].scaleY = 1;
                        this.selectdiamod.pop();
                        this.chosediamod = this.selectdiamod[len - 2];
                        break;
                    }
                }
            }
        }

        private onTouchend(event:egret.TouchEvent):void {

            //判断是否成为超级宝石
            var tsuperdiamod: fighter.DiamodSprite = null;
            if(this.selectdiamod.length >= 8)
            {
                if(!this.selectdiamod[this.selectdiamod.length-1].bspuer)
                    tsuperdiamod = this.selectdiamod.pop();
            }

            //判断是否消除宝石
            if (this.selectdiamod.length >= 3) {

                this.bPause = true;
                this.touchEnabled = false;

                this.checkSuperDiamod();

                this.bombDiamod();  //播放效果

                //清理数据
                for (var i:number = 0; i < this.selectdiamod.length; i++) {
                    var tdiamod:fighter.DiamodSprite = this.selectdiamod[i];
                    this.removeChild(tdiamod);
                }

                if(tsuperdiamod != null)
                {
                    tsuperdiamod.setSuper();
                    tsuperdiamod.scaleX = tsuperdiamod.scaleY = 1.0;
                }

                this.fightPanelHandler();

                //console.log("==========================");
            }
            else
            {
                for (var i:number = 0; i < this.selectdiamod.length; i++) {
                    var tdiamod:fighter.DiamodSprite = this.selectdiamod[i];
                    tdiamod.scaleX = tdiamod.scaleY = 1;
                }
            }

            this.selectdiamod.splice(0);
        }

        private onTouchcancel(event:egret.TouchEvent):void {
            for (var i:number = 0; i < this.selectdiamod.length; i++) {
                var tdiamod:fighter.DiamodSprite = this.selectdiamod[i];
                tdiamod.scaleX = tdiamod.scaleY = 1;
            }
            this.selectdiamod.splice(0);
        }

        //检查超级宝石
        private checkSuperDiamod():void
        {
            for(var i:number = 0;i < this.selectdiamod.length;i++)
            {
                var tdiamod: fighter.DiamodSprite = this.selectdiamod[i];
                if(tdiamod.bspuer)
                {
                    var tx: number = Math.floor(tdiamod.ID/this.MaxCol);
                    var ty: number = tdiamod.ID%this.MaxCol;
                    for(var j:number = 0;j < this.MaxRow;j++)
                    {
                        var stdiamod: fighter.DiamodSprite = this.diamod[j*this.MaxCol+ty];
                        if(this.selectdiamod.indexOf(stdiamod) == -1)
                        {
                            this.selectdiamod.push(stdiamod);
                        }
                    }
                    for(var j:number = 0;j < this.MaxCol;j++)
                    {
                        var stdiamod: fighter.DiamodSprite = this.diamod[tx*this.MaxCol+j];
                        if(this.selectdiamod.indexOf(stdiamod) == -1)
                        {
                            this.selectdiamod.push(stdiamod);
                        }
                    }
                }
            }
        }

        //播放宝石消除效果
        private bombDiamod():void {
            for (var i:number = 0; i < this.selectdiamod.length; i++) {
                var tdiamod:fighter.DiamodSprite = this.selectdiamod[i];
                this.diamod.splice(this.diamod.indexOf(tdiamod),1,null);
                tdiamod.visible = false;

                var ami: GameUtil.Animation = new GameUtil.Animation("bombeffect_json.bomb",7,1);
                ami.setLoop(1);
                ami.x = tdiamod.x;
                ami.y = tdiamod.y;
                ami.scaleX = ami.scaleY = 0.3;
                ami.play();
                this.addChild(ami);

                if(i == this.selectdiamod.length-1)
                {
                    ami.setendcall(this.enternframe,this);
                }
            }
        }

        //往下掉落
        private downDiamod():void {
            for (var i:number = 0; i < this.MaxRow; i++) {
                for (var j:number = this.MaxCol - 1; j >= 0; j--) {
                    if (this.diamod[i * this.MaxCol + j] == null) {

                        var isemp:boolean = true;       //判断是否需要新建宝石

                        for (var k:number = j - 1; k >= 0; k--) {
                            if (this.diamod[i * this.MaxCol + k] != null) {
                                var kdiamod:fighter.DiamodSprite = this.diamod[i*this.MaxCol+k];

                                var posx:number = this.offX+kdiamod.width*i;
                                var posy:number = this.offY+kdiamod.height*j;

                                var tw = egret.Tween.get(kdiamod);
                                tw.to({x:posx,y:posy},400);

                                this.diamod.splice(i * this.MaxCol + j, 1, kdiamod);
                                kdiamod.ID = i*this.MaxCol+j;

                                this.diamod.splice(i * this.MaxCol + k,1,null);

                                isemp = false;

                                break;
                            }
                        }

                        if (isemp) {

                            var num:number = 1 + (Math.ceil(Math.random() * 100)) % 4;
                            var tdiamod:fighter.DiamodSprite = new fighter.DiamodSprite(i * this.MaxCol + j, num);

                            var posx:number = this.offX+tdiamod.width*i;
                            var posy:number = this.offY+tdiamod.height*j;

                            tdiamod.x = posx;
                            tdiamod.y = 0;

                            var tw = egret.Tween.get(tdiamod);
                            tw.to({x:posx,y:posy},400);

                            this.addChild(tdiamod);
                            this.diamod.splice(i * this.MaxCol + j, 1, tdiamod);

                        }

                    }
                }
            }
        }

        //处理战斗层
        private fightPanelHandler():void
        {
            fighter.FighterPanel.getInstance().updateScoreText(this.selectdiamod.length);
            fighter.FighterPanel.getInstance().setenemyblood(this.selectdiamod.length);

            var roundc:number = fighter.FighterPanel.getInstance().getRoundCount();
            if(roundc%3 == 0)   //每三回合攻击一次
            {
                fighter.FighterPanel.getInstance().setheroblood(10);
            }

            fighter.FighterPanel.getInstance().updateRoundCount();

        }
    }
}