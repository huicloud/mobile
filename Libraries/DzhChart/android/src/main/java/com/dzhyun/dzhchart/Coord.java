package com.dzhyun.dzhchart;

/**
 * Created by Administrator on 2015/11/6.
 */
public class Coord {
    private float sh;
    private float sy;
    private float sw;
    private float sx;
    private float rh;   //price
    private float ry;   //price
    private int rw;     //number
    private int rx;     //number
    private Axis axis;

    public Coord(Rect realRect, Rect screenRect, Axis axis){
        this.sh = (int)screenRect.getHeight();
        this.sy = (int)screenRect.getY();
        this.rh = realRect.getHeight();
        this.ry = realRect.getY();

        this.sw = (int)screenRect.getWidth();
        this.sx = (int)screenRect.getX();
        this.rw = (int)realRect.getWidth();
        this.rx = (int)realRect.getX();

        this.axis = axis;
    }

    //Convert real coord to screen coord
    //ry is price type float
    public float SY(float ry){
        return this.sh -(this.sh / this.rh)*(ry - this.ry) + this.sy;
        //return this.sh - (ry - this.ry) * (this.sh / this.ry) + this.sy;
    }

    //Convert screen coord to real coord
    public  float RY(float sy){
        return this.rh - ((sy -this.sy) * this.rh)/this.sh + this.ry;
    }

    public float SX(float rx){
        return this.sw * (rx - this.rx) / this.rw + this.sx;
    }

    public int RX(float sx){
        float diff = sx - this.sx;
        float val = diff / this.sw;
        return this.rw * (int)val + this.rx;
    }

    public Axis getAxis(){
        return this.axis;
    }

    public float getSh() {
        return sh;
    }

    public float getSy() {
        return sy;
    }

    public float getSw() {
        return sw;
    }

    public float getSx() {
        return sx;
    }

    public float getRh() {
        return rh;
    }

    public float getRy() {
        return ry;
    }

    public int getRw() {
        return rw;
    }

    public int getRx() {
        return rx;
    }
}

