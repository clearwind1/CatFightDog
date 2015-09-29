/**
 * Created by pior on 15/9/22.
 * 宝石类
 */
var fighter;
(function (fighter) {
    var DiamodSprite = (function (_super) {
        __extends(DiamodSprite, _super);
        function DiamodSprite(id, attid) {
            _super.call(this);
            this.bspuer = false; //超级宝石
            this.attId = attid;
            this.ID = id;
            var dianame = "diamod" + this.attId + "_png";
            this.texture = RES.getRes(dianame);
            this.width = this.texture.textureWidth;
            this.height = this.texture.textureHeight;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
        }
        var __egretProto__ = DiamodSprite.prototype;
        __egretProto__.init = function (event) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
        };
        __egretProto__.setSuper = function () {
            this.bspuer = true;
            var dianame = "sdiamod" + this.attId + "_png";
            this.texture = RES.getRes(dianame);
        };
        //检查是否可以连线
        __egretProto__.checkscop = function (maxrow, maxcol, id) {
            //console.log("maxrow======",maxrow);
            //console.log("maxcol======",maxcol);
            if (this.ID + maxcol == id)
                return true;
            if (this.ID - maxcol == id)
                return true;
            if ((this.ID + 1) % maxcol != 0 && this.ID + 1 == id)
                return true;
            if (this.ID % maxcol != 0 && this.ID - 1 == id)
                return true;
            if (this.ID % maxcol != 0 && this.ID - maxcol - 1 == id)
                return true;
            if ((this.ID + 1) % maxcol != 0 && this.ID - maxcol + 1 == id)
                return true;
            if (this.ID % maxcol != 0 && this.ID + maxcol - 1 == id)
                return true;
            if ((this.ID + 1) % maxcol != 0 && this.ID + maxcol + 1 == id)
                return true;
            return false;
        };
        return DiamodSprite;
    })(egret.Bitmap);
    fighter.DiamodSprite = DiamodSprite;
    DiamodSprite.prototype.__class__ = "fighter.DiamodSprite";
})(fighter || (fighter = {}));
