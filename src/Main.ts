import GameConfig from "./GameConfig";
import HpSingleMdr from "./hp/HpSingleMdr";
import { LayerMgr } from "./base/LayerMgr";
import { CompMgr } from "./base/comps/CompMgr";
import { SceneMap } from "./base/map/SceneMap";
import Event = Laya.Event;

class Main {
  constructor() {
    //根据IDE设置初始化引擎
    if (window["Laya3D"]) Laya3D.init(GameConfig.width, GameConfig.height);
    else Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
    Laya["Physics"] && Laya["Physics"].enable();
    Laya["DebugPanel"] && Laya["DebugPanel"].enable();
    Laya.stage.scaleMode = GameConfig.scaleMode;
    Laya.stage.screenMode = GameConfig.screenMode;
    Laya.stage.alignV = GameConfig.alignV;
    Laya.stage.alignH = GameConfig.alignH;
    //兼容微信不支持加载scene后缀场景
    Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;

    //打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
    if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true") Laya.enableDebugPanel();
    if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"]) Laya["PhysicsDebugDraw"].enable();
    if (GameConfig.stat) Laya.Stat.show();
    Laya.alertGlobalError(true);

    //激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
    Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
  }

  onVersionLoaded(): void {
    //激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
    Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
  }

  onConfigLoaded(): void {
    //加载IDE指定的场景
    // 这种方式加载scene的，如果不设置runtime，scene对应的代码文件不会执行到。
    // GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);

    LayerMgr.init();
    LayerMgr.onResize();
    Laya.stage.on(Event.RESIZE, this, this.onResize);

    // 分离模式处理，把scene对应的代码文件加到舞台上即可，代码中自动绑定对应的scene了
    // const mdr = new HpSingle();
    // Laya.stage.addChild(mdr);

    LayerMgr.showView(HpSingleMdr);

    Laya.loader.load(
      `map/1001/info.json`,
      null,
      null,
      Laya.Loader.JSON,
      4
    );
    CompMgr.start();
    const map = new SceneMap();
    LayerMgr.mapMain.addChild(map);
  }

  private onResize(): void {
    LayerMgr.onResize();
  }
}

//激活启动类
new Main();
