package com.dzhyun.dzhchart;

import android.graphics.Canvas;
import android.graphics.DashPathEffect;
import android.graphics.Paint;
import android.graphics.Path;
import android.graphics.PathEffect;

/**
 * Created by Administrator on 2015/11/14.
 */
public abstract class Graph {
    private Canvas canvas;
    private Coord coord;
    private LineGroup lines;
    private Axis axis;
    private LineRange range;

    private float left;
    private float top;
    private float height;
    private float width;

    private int gridRowNum;
    private boolean showAxisDate;

    public Graph(Canvas canvas, LineGroup lines, float left, float top, float width, float height){
        this.canvas = canvas;
        this.lines = lines;
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
    }

    public abstract void draw();

    public void drawGrid(){
        Paint paint = new Paint();
        paint.setAntiAlias(true);
        paint.setStyle(Paint.Style.FILL);
        paint.setColor(Config.bgColor);
        Rect rect = new Rect(getLeft(), getTop(), getWidth(), getHeight());
        getCanvas().drawRect(rect.getX(), rect.getY(), rect.getRight(), rect.getBottom(), paint);

        paint.setStyle(Paint.Style.STROKE);
        paint.setColor(Config.borderColor);

        float leftRulerWidth = Config.leftRulerWidth;
        float rightRulerWidth =Config.rightRulerWidth;

        float x1 = rect.getX() + leftRulerWidth;
        float y1 = rect.getY();
        float x2 = rect.getRight() - rightRulerWidth;
        float y2 = rect.getBottom();
        getCanvas().drawRect(x1, y1, x2, y2, paint);

        Paint paintLine = new Paint();
        paintLine.setAntiAlias(true);
        paintLine.setStyle(Paint.Style.STROKE);
        paintLine.setColor(Config.gridLineColor);
        paintLine.setPathEffect(new DashPathEffect(new float[]{10, 5}, 1));
        Axis axises = getCoord().getAxis();
        float correct = 0;
        for (int i = 0; i < axises.length(); i++) {
            float ry = (float)axises.getAxis(i);
            float sy = getCoord().SY(ry);

            Path path = new Path();
            path.moveTo(getCoord().getSx(), sy);
            path.lineTo(getCoord().getSx() + (float) Math.floor(getCoord().getSw() / Config.countRatio), sy);
            getCanvas().drawPath(path, paintLine);
        }
    }

    public void drawAxisText(){
        Paint paint = new Paint();
        paint.setAntiAlias(true);
        paint.setStyle(Paint.Style.STROKE);
        paint.setColor(Config.gridFontColor);
        paint.setTextSize(Config.fontSize);
        Paint.FontMetrics fontMetrics = paint.getFontMetrics();

        Axis axises = getCoord().getAxis();
        float correct = 0;
        for (int i = 0; i < axises.length(); i++) {
            float ry = (float)axises.getAxis(i);
            float sy = getCoord().SY(ry);

            if (i == 0) {
                correct = fontMetrics.bottom;
            } else if (i == axises.length() - 1) {
                correct = fontMetrics.top;
            } else {
                correct = 0;
            }

            String text;
            if(ry > 1000000){
                text = String.format("%dM", (int)(ry / 1000000));
            }else if(ry > 1000){
                text = String.format("%dK", (int)(ry / 1000));
            }else{
                text = String.format("%#.2f", ry);
            }
            if (text.length() > 5) {
                text = text.replace(".00", "");
            }

            float textWidth = paint.measureText(text);
            float pxl = getLeft() + Config.leftRulerWidth * (1 - Config.axisSpaceRation) - textWidth;
            pxl = pxl > 0 ? pxl : 0;
            getCanvas().drawText(text, pxl, sy - correct, paint);
        }
    }

    public void calCoord(){
        LineRange range = getLineGroup().range();
        setRange(range);

        Axis axis = new Axis(range.getMinVal(), range.getMaxVal(), getHeight());
        setAxis(axis);

        float left = 0;
        float top = (float)axis.getMinValue();
        float width = getLineGroup().data(0).getRows();
        float height = (float)(axis.getMaxValue() - axis.getMinValue());
        Rect realRect = new Rect(left, top, width, height);

        left = Config.leftRulerWidth + getLeft();
        top = getTop();
        width = getWidth() - Config.leftRulerWidth - Config.rightRulerWidth;
        if(isShowAxisDate()){
            height = getHeight() - Config.bottomRulerHeight;
        }else{
            height = getHeight();
        }
        Rect screenRect = new Rect(left, top, width, height);

        Coord coord = new Coord(realRect, screenRect, axis);
        setCoord(coord);
    }

    public Canvas getCanvas() {
        return canvas;
    }

    public Coord getCoord() {
        return coord;
    }

    public LineGroup getLineGroup() {
        return lines;
    }

    public Axis getAxis() {
        return axis;
    }

    public LineRange getRange() {
        return range;
    }

    public float getLeft() {
        return left;
    }

    public float getTop() {
        return top;
    }

    public float getHeight() {
        return height;
    }

    public float getWidth() {
        return width;
    }

    public void setCoord(Coord coord) {
        this.coord = coord;
    }

    public void setAxis(Axis axis) {
        this.axis = axis;
    }

    public void setRange(LineRange range) {
        this.range = range;
    }

    public boolean isShowAxisDate() {
        return showAxisDate;
    }

    public void setShowAxisDate(boolean showAxisDate) {
        this.showAxisDate = showAxisDate;
    }

    public int getGridRowNum() {
        return gridRowNum;
    }

    public void setGridRowNum(int gridRowNum) {
        this.gridRowNum = gridRowNum;
    }
}

