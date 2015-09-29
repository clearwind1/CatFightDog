/**
 * Created by pior on 15/9/16.
 */
var fighter;
(function (fighter) {
    function createBitmapByName(name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    fighter.createBitmapByName = createBitmapByName;
    var Animation = (function (_super) {
        __extends(Animation, _super);
        function Animation(textureName, totalNumber, frameRate) {
            _super.call(this);
            this.currentNumber = 1;
            this.countNumber = 0;
            this.bLoopCount = 0;
            this.endcallfun = null;
            this.thisObj = null;
            this.textureName = textureName;
            this.texture = RES.getRes(textureName + "1");
            this.aWidth = this.texture.textureWidth;
            this.aHeight = this.texture.textureHeight;
            this.totalNumber = totalNumber;
            this.frameRate = frameRate;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
        }
        var __egretProto__ = Animation.prototype;
        __egretProto__.init = function (event) {
        };
        __egretProto__.setLoop = function (bloopcount) {
            if (bloopcount == 0)
                bloopcount = 1;
            this.bLoopCount = bloopcount - 1;
        };
        __egretProto__.play = function () {
            this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterHandle, this);
        };
        __egretProto__.onEnterHandle = function (event) {
            if (this.countNumber >= this.frameRate) {
                this.countNumber = 0;
                this.nextFrame();
            }
            else {
                this.countNumber++;
            }
        };
        __egretProto__.stop = function () {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterHandle, this);
        };
        __egretProto__.nextFrame = function () {
            this.currentNumber++;
            if (this.currentNumber >= this.totalNumber) {
                this.currentNumber = 1;
                if (this.bLoopCount == 0) {
                    this.stop();
                    if (this.endcallfun != null)
                        this.endcallfun.apply(this.thisObj);
                    this.parent.removeChild(this);
                    return;
                }
                else if (this.bLoopCount > 0) {
                    this.bLoopCount--;
                }
            }
            this.texture = RES.getRes(this.textureName + this.currentNumber);
        };
        __egretProto__.setendcall = function (func, thisobj) {
            this.thisObj = thisobj;
            this.endcallfun = func;
        };
        return Animation;
    })(egret.Bitmap);
    fighter.Animation = Animation;
    Animation.prototype.__class__ = "fighter.Animation";
})(fighter || (fighter = {}));
