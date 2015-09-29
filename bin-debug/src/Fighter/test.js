/**
 * Created by pior on 15/9/17.
 */
var Test = (function (_super) {
    __extends(Test, _super);
    function Test() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var __egretProto__ = Test.prototype;
    __egretProto__.onAddToStage = function (event) {
        this.Init();
    };
    __egretProto__.Init = function () {
        console.log("ffffff");
        var result = new egret.Bitmap();
        var texture = RES.getRes("bgImage");
        result.texture = texture;
        this.addChild(result);
        this.jlmc = new egret.Shape();
        this.jlmc.graphics.beginFill(0x000000, 1);
        this.jlmc.graphics.lineStyle(4, 0xffffff, 1);
        this.jlmc.graphics.drawRoundRect(0, 0, 300, 60, 20, 20);
        this.jlmc.graphics.endFill();
        this.addChild(this.jlmc);
        //var mcDataFactory = new egret.MovieClipDataFactory(null, texture);
        //
        //var mc= new egret.MovieClip(mcDataFactory.generateMovieClipData());
        //
        //mc.visible = false;
    };
    __egretProto__.show = function () {
        this.jlmc.visible = true;
    };
    __egretProto__.removejlmc = function () {
        this.jlmc.visible = false;
    };
    return Test;
})(egret.DisplayObjectContainer);
Test.prototype.__class__ = "Test";
