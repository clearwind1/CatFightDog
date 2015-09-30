/**
 * Created by yang on 15/9/20.
 */
var GameUtil;
(function (GameUtil) {
    //游戏配置
    var GameConfig = (function () {
        function GameConfig() {
        }
        var __egretProto__ = GameConfig.prototype;
        GameConfig.IP = "localhost:8080/"; //http连接地址
        GameConfig.bRunFPS = false; //是否显示FPS
        return GameConfig;
    })();
    GameUtil.GameConfig = GameConfig;
    GameConfig.prototype.__class__ = "GameUtil.GameConfig";
    /*
    *根据图片名据创建位图
    */
    function createBitmapByName(name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        result.anchorX = result.anchorY = 0.5;
        return result;
    }
    GameUtil.createBitmapByName = createBitmapByName;
    /**
     * 将Object转化成 =& post字符串;
     * @param postData
     * @returns {string}
     */
    function objectToString(postData) {
        var s = '';
        for (var key in postData) {
            var k_v = key + '=' + postData[key];
            s += k_v + '&';
        }
        s = s.substr(0, s.length - 1);
        return s;
    }
    GameUtil.objectToString = objectToString;
})(GameUtil || (GameUtil = {}));
