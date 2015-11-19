package com.dzhyun.dzhchart;

/**
 * Created by Administrator on 2015/11/6.
 */
public class Rect {
    private float x;
    private float y;
    private float width;
    private float height;

    public float getRight(){
        return x + width;
    }

    public  float getBottom(){
        return y + height;
    }

    public float getX() {
        return x;
    }

    public void setX(float x) {
        this.x = x;
    }

    public float getY() {
        return y;
    }

    public void setY(float y) {
        this.y = y;
    }

    public float getWidth() {
        return width;
    }

    public void setWidth(float width) {
        this.width = width;
    }

    public float getHeight() {
        return height;
    }

    public void setHeight(float height) {
        this.height = height;
    }

    public Rect(float x, float y, float width, float height) {

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}
