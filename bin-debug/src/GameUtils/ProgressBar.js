/**
 * 进度条类
 * Created by pior on 15/10/8.
 */
var GameUtil;
(function (GameUtil) {
    var ProgressBar = (function (_super) {
        __extends(ProgressBar, _super);
        function ProgressBar(imagename, x, y, rect, anchorX, anchorY) {
            if (anchorX === void 0) { anchorX = 0; }
            if (anchorY === void 0) { anchorY = 0.5; }
            _super.call(this);
            this.mPercent = 100;
            this.init(imagename, x, y, rect, anchorX, anchorY);
        }
        var __egretProto__ = ProgressBar.prototype;
        __egretProto__.init = function (imagename, x, y, rect, anchorX, anchorY) {
            this.progressbar = GameUtil.createBitmapByName(imagename);
            this.addChild(this.progressbar);
            this.progressbar.x = x;
            this.progressbar.y = y;
            this.progressbar.scale9Grid = rect;
            this.progressbar.anchorX = anchorX;
            this.progressbar.anchorY = anchorY;
        };
        __egretProto__.setbarX = function (x) {
            this.progressbar.x = x;
        };
        __egretProto__.setbarY = function (y) {
            this.progressbar.y = y;
        };
        __egretProto__.setPercent = function (percent) {
            if (percent < 0)
                return;
            this.mPercent = percent;
            this.updateWidth();
        };
        __egretProto__.getPercent = function () {
            return this.mPercent;
        };
        __egretProto__.updateWidth = function () {
            this.progressbar.width = this.progressbar.texture.textureWidth * this.mPercent;
        };
        return ProgressBar;
    })(egret.DisplayObjectContainer);
    GameUtil.ProgressBar = ProgressBar;
    ProgressBar.prototype.__class__ = "GameUtil.ProgressBar";
})(GameUtil || (GameUtil = {}));
