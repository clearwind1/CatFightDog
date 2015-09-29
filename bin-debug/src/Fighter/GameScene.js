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
            this.offX = 12;
            this.offY = 330;
            this.MaxRow = 7; //宝石列数
            this.MaxCol = 7; //宝石行数
            this.MaxDiamod = this.MaxCol * this.MaxRow; //宝石总数
            this.diamod = []; //宝石数组
            this.selectdiamod = []; //选取的宝石数组
            this.bPause = false;
        }
        var __egretProto__ = GameScene.prototype;
        __egretProto__.init = function () {
            var bg = GameUtil.createBitmapByName("endBG_png");
            bg.x = this.mStageW / 2;
            bg.y = this.mStageH / 2;
            this.addChild(bg);
            for (var i = 0; i < this.MaxRow; i++) {
                for (var j = 0; j < this.MaxCol; j++) {
                    var num = 1 + (Math.ceil(Math.random() * 100)) % 6;
                    var tdiamod = new fighter.DiamodSprite(i * this.MaxCol + j, num);
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
            var parm = {
                "test": "successok"
            };
            //GameUtil.Http.getinstance(egret.URLRequestMethod.GET).send(parm,"get",this.testHttpOk,this);
        };
        __egretProto__.testHttpOk = function (data) {
            console.log("data=======", data);
        };
        __egretProto__.enternframe = function () {
            this.downDiamod(); //宝石下落
            egret.setTimeout(this.setGameState, this, 400);
        };
        __egretProto__.setGameState = function () {
            this.bPause = false;
            this.touchEnabled = true;
        };
        __egretProto__.onTouchbegin = function (event) {
            var px = event.localX;
            var py = event.localY;
            for (var i = 0; i < this.MaxDiamod; i++) {
                var tdiamod = this.diamod[i];
                var p = tdiamod.globalToLocal(px, py);
                if (tdiamod.getBounds().containsPoint(p)) {
                    //console.log("touchid============",tdiamod.ID);
                    this.chosediamod = tdiamod;
                    this.selectdiamod.push(tdiamod);
                    tdiamod.scaleX = tdiamod.scaleY = 1.2;
                    break;
                }
            }
        };
        __egretProto__.onTouchmove = function (event) {
            var px = event.localX;
            var py = event.localY;
            for (var i = 0; i < this.MaxDiamod; i++) {
                var tdiamod = this.diamod[i];
                var p = tdiamod.globalToLocal(px, py);
                //判断当前宝石是否可以选取
                if (this.selectdiamod.indexOf(tdiamod) == -1 && tdiamod.getBounds().containsPoint(p) && tdiamod.attId == this.chosediamod.attId && this.chosediamod.checkscop(this.MaxRow, this.MaxCol, tdiamod.ID)) {
                    this.chosediamod = tdiamod;
                    this.selectdiamod.push(tdiamod);
                    tdiamod.scaleX = tdiamod.scaleY = 1.2;
                    break;
                }
                //判断当前宝石是否可以取消
                if (this.selectdiamod.length >= 2) {
                    var len = this.selectdiamod.length;
                    if (tdiamod.getBounds().containsPoint(p) && tdiamod.ID == this.selectdiamod[len - 2].ID) {
                        // console.log("tdiamodid=======",tdiamod.ID);
                        this.selectdiamod[len - 1].scaleX = this.selectdiamod[len - 1].scaleY = 1;
                        this.selectdiamod.pop();
                        this.chosediamod = this.selectdiamod[len - 2];
                        break;
                    }
                }
            }
        };
        __egretProto__.onTouchend = function (event) {
            //判断是否成为超级宝石
            var tsuperdiamod = null;
            if (this.selectdiamod.length >= 5) {
                tsuperdiamod = this.selectdiamod.pop();
            }
            //判断是否消除宝石
            if (this.selectdiamod.length >= 3) {
                this.bPause = true;
                this.touchEnabled = false;
                this.checkSuperDiamod();
                this.bombDiamod(); //播放效果
                for (var i = 0; i < this.selectdiamod.length; i++) {
                    var tdiamod = this.selectdiamod[i];
                    this.removeChild(tdiamod);
                }
                if (tsuperdiamod != null) {
                    tsuperdiamod.setSuper();
                    tsuperdiamod.scaleX = tsuperdiamod.scaleY = 1.0;
                }
            }
            else {
                for (var i = 0; i < this.selectdiamod.length; i++) {
                    var tdiamod = this.selectdiamod[i];
                    tdiamod.scaleX = tdiamod.scaleY = 1;
                }
            }
            this.selectdiamod.splice(0);
        };
        __egretProto__.onTouchcancel = function (event) {
            for (var i = 0; i < this.selectdiamod.length; i++) {
                var tdiamod = this.selectdiamod[i];
                tdiamod.scaleX = tdiamod.scaleY = 1;
            }
            this.selectdiamod.splice(0);
        };
        //检查超级宝石
        __egretProto__.checkSuperDiamod = function () {
            for (var i = 0; i < this.selectdiamod.length; i++) {
                var tdiamod = this.selectdiamod[i];
                if (tdiamod.bspuer) {
                    var tx = Math.floor(tdiamod.ID / this.MaxCol);
                    var ty = tdiamod.ID % this.MaxCol;
                    for (var j = 0; j < this.MaxRow; j++) {
                        var stdiamod = this.diamod[j * this.MaxCol + ty];
                        if (this.selectdiamod.indexOf(stdiamod) == -1) {
                            this.selectdiamod.push(stdiamod);
                        }
                    }
                    for (var j = 0; j < this.MaxCol; j++) {
                        var stdiamod = this.diamod[tx * this.MaxCol + j];
                        if (this.selectdiamod.indexOf(stdiamod) == -1) {
                            this.selectdiamod.push(stdiamod);
                        }
                    }
                }
            }
        };
        //播放宝石消除效果
        __egretProto__.bombDiamod = function () {
            for (var i = 0; i < this.selectdiamod.length; i++) {
                var tdiamod = this.selectdiamod[i];
                this.diamod.splice(this.diamod.indexOf(tdiamod), 1, null);
                tdiamod.visible = false;
                var ami = new GameUtil.Animation("bombeffect_json.bomb", 7, 1);
                ami.setLoop(1);
                ami.x = tdiamod.x;
                ami.y = tdiamod.y;
                ami.scaleX = ami.scaleY = 0.3;
                ami.play();
                this.addChild(ami);
                if (i == this.selectdiamod.length - 1) {
                    ami.setendcall(this.enternframe, this);
                }
            }
        };
        //往下掉落
        __egretProto__.downDiamod = function () {
            for (var i = 0; i < this.MaxRow; i++) {
                for (var j = this.MaxCol - 1; j >= 0; j--) {
                    if (this.diamod[i * this.MaxCol + j] == null) {
                        var isemp = true; //判断是否需要新建宝石
                        for (var k = j - 1; k >= 0; k--) {
                            if (this.diamod[i * this.MaxCol + k] != null) {
                                var kdiamod = this.diamod[i * this.MaxCol + k];
                                var posx = this.offX + kdiamod.width * i;
                                var posy = this.offY + kdiamod.height * j;
                                var tw = egret.Tween.get(kdiamod);
                                tw.to({ x: posx, y: posy }, 400);
                                this.diamod.splice(i * this.MaxCol + j, 1, kdiamod);
                                kdiamod.ID = i * this.MaxCol + j;
                                this.diamod.splice(i * this.MaxCol + k, 1, null);
                                isemp = false;
                                break;
                            }
                        }
                        if (isemp) {
                            var num = 1 + (Math.ceil(Math.random() * 100)) % 4;
                            var tdiamod = new fighter.DiamodSprite(i * this.MaxCol + j, num);
                            var posx = this.offX + tdiamod.width * i;
                            var posy = this.offY + tdiamod.height * j;
                            tdiamod.x = posx;
                            tdiamod.y = 0;
                            var tw = egret.Tween.get(tdiamod);
                            tw.to({ x: posx, y: posy }, 400);
                            this.addChild(tdiamod);
                            this.diamod.splice(i * this.MaxCol + j, 1, tdiamod);
                        }
                    }
                }
            }
        };
        return GameScene;
    })(GameUtil.BassPanel);
    fighter.GameScene = GameScene;
    GameScene.prototype.__class__ = "fighter.GameScene";
})(fighter || (fighter = {}));
