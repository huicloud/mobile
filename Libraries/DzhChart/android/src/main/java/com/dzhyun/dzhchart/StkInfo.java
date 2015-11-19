package com.dzhyun.dzhchart;

/**
 * Created by Administrator on 2015/11/11.
 */
public class StkInfo {
    private String name;
    private String obj;
    private float zuoShou;

    public StkInfo(String name, String obj, float zuoShou){
        this.name = name;
        this.obj = obj;
        this.zuoShou = zuoShou;
    }

    public StkInfo(String name, String obj){
        this.name = name;
        this.obj = obj;
    }

    public StkInfo(){}

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getObj() {
        return obj;
    }

    public void setObj(String obj) {
        this.obj = obj;
    }

    public float getZuoShou() {
        return zuoShou;
    }

    public void setZuoShou(float zuoShou) {
        this.zuoShou = zuoShou;
    }
}
