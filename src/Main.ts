//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    //private loadingView:LoadingUI;
    //
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    //
    private onAddToStage(event:egret.Event) {
        //设置加载进度界面
        //Config to load process interface
        //this.loadingView = new LoadingUI();
        //this.stage.addChild(this.loadingView);
        //
        ////初始化Resource资源加载库
        ////initiate Resource loading library
        //RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        //RES.loadConfig("resource/resource.json", "resource/");

        GameUtil.GameScene.init(this.stage);
        GameUtil.GameScene.runscene(new GameUtil.LoadingPanel(this.createGameScene,this));

    }
    //
    ///**
    // * 配置文件加载完成,开始预加载preload资源组。
    // * configuration file loading is completed, start to pre-load the preload resource group
    // */
    //private onConfigComplete(event:RES.ResourceEvent):void {
    //    RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
    //    RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
    //    RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
    //    RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
    //    RES.loadGroup("preload");
    //}
    //
    ///**
    // * preload资源组加载完成
    // * Preload resource group is loaded
    // */
    //private onResourceLoadComplete(event:RES.ResourceEvent):void {
    //    if (event.groupName == "preload") {
    //        this.stage.removeChild(this.loadingView);
    //        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
    //        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
    //        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
    //        egret.Profiler.getInstance().run();
    //        this.createGameScene();
    //    }
    //}
    //
    ///**
    // * 资源组加载出错
    // *  The resource group loading failed
    // */
    //private onResourceLoadError(event:RES.ResourceEvent):void {
    //    //TODO
    //    console.warn("Group:" + event.groupName + " has failed to load");
    //    //忽略加载失败的项目
    //    //Ignore the loading failed projects
    //    this.onResourceLoadComplete(event);
    //}
    //
    ///**
    // * preload资源组加载进度
    // * Loading process of preload resource group
    // */
    //private onResourceProgress(event:RES.ResourceEvent):void {
    //    if (event.groupName == "preload") {
    //        this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
    //        GameUtil.LoadingPanel.getInstance("loadingbar_png").setPro(event.itemsLoaded/event.itemsTotal);
    //    }
    //}



    private textfield:egret.TextField;
    private Xbitmap:egret.Bitmap;
    private Ybitmap:egret.Bitmap;
    private shp:egret.Sprite;
    private bOpenMenu:boolean = false;

    private te: egret.URLRequest;

    private shp2:egret.Sprite;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene():void {

        GameUtil.GameScene.runscene(new fighter.GameStartScene());


        return;

        /*
        *读取josn配置文件
         */
        var x: any = RES.getRes("test_json");
        console.log("x====",x['text']);

        /***************************************************/

        var pic:egret.Bitmap = new egret.Bitmap();
        pic.texture = RES.getRes("hero-03_png");
        pic.x = 0;
        pic.touchEnabled = true;
        pic.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchx,this);

        var pic2:egret.Bitmap = new egret.Bitmap();
        pic2.texture = RES.getRes("hero-02_png");
        pic2.x = 256;

        var cont: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
        cont.addChild(pic);
        cont.addChild(pic2);

        var sol: egret.ScrollView = new egret.ScrollView();
        sol.x = 100;
        sol.y = 100;
        sol.width = 256;
        sol.height = 256;
        sol.scrollSpeed = 0.4;
        sol.setContent(cont);
        this.addChild(sol);

        //console.log("pic========",pic.x, "     cont=======",cont.x, "    sol========",sol.x);

        return;


        var obj:Object[] = [{"imgurl":"xxxx_png","text":"just test","num":45},{"imgurl":"aaaa_png","text":"just testss","num":34}];

        console.log("object====",obj[1]['imgurl']);


        return;

        var data = RES.getRes("bombeffect_json");
        var texture = RES.getRes("bombeffect_png");

        var mcDF = new egret.MovieClipDataFactory(data,texture);
        var mc = new egret.MovieClip(mcDF.generateMovieClipData());

        mc.frameRate = 60;
        mc.gotoAndPlay(1,-1);
        mc.x = 200;
        mc.y = 200;
       // this.addChild(mc);



        /*
        var pic:egret.Bitmap = new egret.Bitmap();
        pic.texture = RES.getRes("hero-03_png");
        pic.x = 0;
        pic.touchEnabled = true;
        pic.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchx,this);

        var pic2:egret.Bitmap = new egret.Bitmap();
        pic2.texture = RES.getRes("hero-02_png");
        pic2.x = 256;

        var cont: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
        cont.addChild(pic);
        cont.addChild(pic2);

        var sol: egret.ScrollView = new egret.ScrollView();
        sol.x = 100;
        sol.y = 100;
        sol.width = 256;
        sol.height = 256;
        sol.scrollSpeed = 0.4;
        sol.setContent(cont);
        this.addChild(sol);

        return;
        */

        /*
        var testbg:Test = new Test();
        this.addChild(testbg);
        testbg.removejlmc();


        this.Xbitmap = this.createBitmapByName("btn_start_png");
        //this.addChild(this.Xbitmap);
        this.Xbitmap.x = 30;
        this.Xbitmap.y = 5;

        this.Xbitmap.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchx,this);

        var rect:egret.Rectangle = new egret.Rectangle(4,4,42,42);
        this.Xbitmap.scale9Grid =rect;

        //var tw = egret.Tween.get(textbitmap);
        //tw.to({width:200},400);

        this.Ybitmap = this.createBitmapByName("btn_start_png");
        this.Ybitmap.x = 5;
        this.Ybitmap.y = 30;
        //var rect:egret.Rectangle = new egret.Rectangle(4,4,42,42);
        //this.Ybitmap.scale9Grid =rect;

        //this.Ybitmap.scaleY = 0.2;

        //var tw = egret.Tween.get(textbitmap2);
        //tw.to({height:200},400);

        this.shp2 = new egret.Sprite();
        this.shp2.graphics.beginFill(0x000000,0.1);
        this.shp2.graphics.lineStyle(4,0xffffff,1);
        this.shp2.graphics.drawRoundRect(0,0,60,300,20,20);
        this.shp2.graphics.endFill();
        this.shp2.anchorX = this.shp2.anchorY = 1;
        this.shp2.x = this.stage.stageWidth/2 + 100;
        this.shp2.y = this.stage.stageHeight/2;

        this.shp2.cacheAsBitmap = true;
        this.shp2.height = 20;

        this.addChild(this.shp2);
        this.shp2.addChild(this.Ybitmap);

        this.shp = new egret.Sprite();
        this.shp.graphics.beginFill(0x000000,0.1);
        this.shp.graphics.lineStyle(4,0xffffff,1);
        this.shp.graphics.drawRoundRect(0,0,300,60,20,20);
        this.shp.graphics.endFill();
        this.shp.anchorX = this.shp.anchorY = 1;
        this.shp.x = this.stage.stageWidth/2 + 80;
        this.shp.y = this.stage.stageHeight/2;

        this.shp.cacheAsBitmap = true;
        this.shp.width = 20;

        this.addChild(this.shp);
        this.shp.addChild(this.Xbitmap);

        this.Xbitmap.touchEnabled = true;

        this.shp.touchChildren = false;

        var btn:egret.Bitmap = new egret.Bitmap();
        btn.texture = RES.getRes("hero-01_png");
        btn.anchorX = btn.anchorY = 1;
        btn.x = this.stage.stageWidth/2+100;
        btn.y = this.stage.stageHeight/2;
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchbtn,this);
        btn.touchEnabled = true;
        this.addChild(btn);

        return;
        */

        //根据name关键字，异步获取一个json配置文件，name属性请参考resources/resource.json配置文件的内容。
        // Get asynchronously a json configuration file according to name keyword. As for the property of name please refer to the configuration file of resources/resource.json.
        RES.getResAsync("description", this.startAnimation, this);
    }

    private testfun():void
    {
        console.log("testfun");
    }

    private touchx(event:egret.TouchEvent):void
    {
        console.log("touchXXXXXX");
        //this.touchbtn(null);
    }

    private touchbtn(event:egret.TouchEvent):void
    {
        console.log("touchTap");
        if(!this.bOpenMenu)
        {
            //var twx = egret.Tween.get(this.Xbitmap);
            //twx.to({width:200},400);
            //var twy = egret.Tween.get(this.Ybitmap);
            //twy.to({height:200},400);
            var twx = egret.Tween.get(this.shp);
            twx.to({width:300},400);

            var twx2 = egret.Tween.get(this.shp);
            twx2.to({alpha:0.2},400);

            var twy = egret.Tween.get(this.shp2);
            twy.to({height:300},400);

            this.shp.touchChildren = true;
        }
        else
        {
            //var twx = egret.Tween.get(this.Xbitmap);
            //twx.to({width:50},400);
            //var twy = egret.Tween.get(this.Ybitmap);
            //twy.to({height:50},400);

            var twx = egret.Tween.get(this.shp);
            twx.to({width:20},400);

            var twx2 = egret.Tween.get(this.shp);
            twx2.to({alpha:1},400);

            var twy = egret.Tween.get(this.shp2);
            twy.to({height:20},400);

            this.shp.touchChildren = false;
        }

        this.bOpenMenu = !this.bOpenMenu;
    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name:string):egret.Bitmap {
        var result:egret.Bitmap = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result:Array<any>):void {
        var self:any = this;

        var parser:egret.HtmlTextParser = new egret.HtmlTextParser();
        var textflowArr:Array<Array<egret.ITextElement>> = [];
        for (var i:number = 0; i < result.length; i++) {
            textflowArr.push(parser.parser(result[i]));
        }

        var textfield:egret.TextField = self.textfield;
        var count:number = -1;
        var change:Function = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var lineArr = textflowArr[count];

            self.changeDescription(textfield, lineArr);

            var tw = egret.Tween.get(textfield);
            tw.to({"alpha": 1}, 200);
            tw.wait(2000);
            tw.to({"alpha": 0}, 200);
            tw.call(change, self);
        };

        change();
    }

    /**
     * 切换描述内容
     * Switch to described content
     */
    private changeDescription(textfield:egret.TextField, textFlow:Array<egret.ITextElement>):void {
        textfield.textFlow = textFlow;
    }
}


