/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
import MainHp from "./script/MainHp"
import TestPanel from "./test/TestPanel"
import GameUI from "./script/GameUI"
import GameControl from "./script/GameControl"
import Bullet from "./script/Bullet"
import DropBox from "./script/DropBox"
/*
* 游戏初始化配置;
*/
export default class GameConfig{
    static width:number=640;
    static height:number=1136;
    static scaleMode:string="noscale";
    static screenMode:string="none";
    static alignV:string="middle";
    static alignH:string="center";
    static startScene:any="test/TestPanel.scene";
    static sceneRoot:string="";
    static debug:boolean=false;
    static stat:boolean=false;
    static physicsDebug:boolean=false;
    static exportSceneToJson:boolean=true;
    constructor(){}
    static init(){
        var reg: Function = Laya.ClassUtils.regClass;
        reg("script/MainHp.ts",MainHp);
        reg("test/TestPanel.ts",TestPanel);
        reg("script/GameUI.ts",GameUI);
        reg("script/GameControl.ts",GameControl);
        reg("script/Bullet.ts",Bullet);
        reg("script/DropBox.ts",DropBox);
    }
}
GameConfig.init();