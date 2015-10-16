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
        GameConfig.bRunFPS = true; //是否显示FPS
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
    /*
    *创建文字
    */
    function createTextField(x, y, size, anchorX, anchorY, align) {
        if (anchorX === void 0) { anchorX = 0.5; }
        if (anchorY === void 0) { anchorY = 0.5; }
        if (align === void 0) { align = "center"; }
        var textfiled = new egret.TextField();
        textfiled.x = x;
        textfiled.y = y;
        textfiled.anchorX = anchorX;
        textfiled.anchorY = anchorY;
        textfiled.size = size;
        textfiled.textAlign = align;
        return textfiled;
    }
    GameUtil.createTextField = createTextField;
    /**
     * 创建矩形框
     */
    function createRect(x, y, width, height, alpha, color) {
        if (alpha === void 0) { alpha = 1; }
        if (color === void 0) { color = 0x000000; }
        var shp = new egret.Shape();
        shp.x = x;
        shp.y = y;
        shp.graphics.beginFill(color, alpha);
        shp.graphics.drawRect(0, 0, width, height);
        shp.graphics.endFill();
        return shp;
    }
    GameUtil.createRect = createRect;
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
    /**
     * 数字上飘动画
     */
    function numberUpDisp(thisObj, x, y, size, number, color) {
        var textfiled = new egret.TextField();
        textfiled.x = x;
        textfiled.y = y;
        textfiled.anchorX = 0.5;
        textfiled.anchorY = 0.5;
        textfiled.size = size;
        textfiled.textAlign = "center";
        textfiled.textColor = color;
        textfiled.text = number;
        thisObj.addChild(textfiled);
        egret.Tween.get(textfiled).to({ y: y - 40 }, 700);
        egret.Tween.get(textfiled).to({ alpha: 0 }, 700).call(function () {
            thisObj.removeChild(textfiled);
        }, thisObj);
    }
    GameUtil.numberUpDisp = numberUpDisp;
    /**
     * 本地文件存储
     */
    function saveLocalData(key, data) {
        egret.localStorage.setItem(key, data);
    }
    GameUtil.saveLocalData = saveLocalData;
    function readLocalData(key) {
        egret.localStorage.getItem(key);
    }
    GameUtil.readLocalData = readLocalData;
    function clearLocalData(key) {
        if (key != null) {
            egret.localStorage.removeItem(key);
        }
        else {
            egret.localStorage.clear();
        }
    }
    GameUtil.clearLocalData = clearLocalData;
})(GameUtil || (GameUtil = {}));
