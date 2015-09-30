/**
 * Created by pior on 15/9/30.
 */
var fighter;
(function (fighter) {
    var GameConfig = (function () {
        function GameConfig() {
        }
        var __egretProto__ = GameConfig.prototype;
        GameConfig.gHeroTotalBlood = 100; //主角总血量
        GameConfig.gEnemyTotalBlood = 100; //敌人总血量
        return GameConfig;
    })();
    fighter.GameConfig = GameConfig;
    GameConfig.prototype.__class__ = "fighter.GameConfig";
})(fighter || (fighter = {}));
