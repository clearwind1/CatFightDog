/**
 * Created by yang on 15/9/20.
 */
var GameUtil;
(function (GameUtil) {
    function getIP() {
        var IP = "192.168.0.1";
        IP = "httpbin.org/";
        return IP;
    }
    GameUtil.getIP = getIP;
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
