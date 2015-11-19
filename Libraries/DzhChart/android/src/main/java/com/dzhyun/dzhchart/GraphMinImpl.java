package com.dzhyun.dzhchart;

import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.DashPathEffect;
import android.graphics.Paint;
import android.graphics.Path;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by Administrator on 2015/11/14.
 */
public class GraphMinImpl extends Graph {
    private float zuoShou;

    public GraphMinImpl(Canvas canvas, LineGroup lines, float zuoSHou, float left, float top, float width, float height){
        super(canvas, lines, left, top, width, height);
        this.zuoShou = zuoSHou;
    }

    public float getZuoShou() {
        return zuoShou;
    }

    public void setZuoShou(float zuoShou) {
        this.zuoShou = zuoShou;
    }

    public void draw(){
        setShowAxisDate(true);
        calCoord();
        drawGrid();
        drawMin();
        drawAxisText();
    }

    @Override
    public void calCoord(){
        LineRange range = getLineGroup().range();
        setRange(range);

        Axis axis = new Axis(range.getMinVal(), range.getMaxVal(), zuoShou, getHeight(), 4);
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

    @Override
    public void drawAxisText(){
        Paint paint = new Paint();
        paint.setAntiAlias(true);
        paint.setStyle(Paint.Style.STROKE);
        paint.setTextSize(Config.fontSize);
        Paint.FontMetrics fontMetrics = paint.getFontMetrics();

        Axis axises = getCoord().getAxis();
        float correct = 0;
        for (int i = 1; i < axises.length()-1; i++) {
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

            paint.setColor(Config.gridFontColor);
            float textWidth = paint.measureText(text);
            float pxl = getLeft() + Config.leftRulerWidth * (1 - Config.axisSpaceRation) - textWidth;
            pxl = pxl > 0 ? pxl : 0;
            getCanvas().drawText(text, pxl, sy - correct, paint);

            float zhangdie = ry-zuoShou;
            if(Math.abs(zhangdie - 0) < 0.0000001){
                continue;
            }

            if(zhangdie > 0){
                paint.setColor(Config.riseColor);
            }else{
                paint.setColor(Config.dropColor);
            }
            text = String.format("%#.2f%%", zhangdie/zuoShou * 100);
            textWidth = paint.measureText(text);
            getCanvas().drawText(text, getLeft()+getWidth()-textWidth, sy - correct, paint);
        }
    }

    public void drawMin(){
        TableData datas = getLineGroup().data(0);

        Paint paintDate = new Paint();
        paintDate.setTextSize(Config.fontSize);
        paintDate.setAntiAlias(true);
        paintDate.setColor(Config.gridFontColor);
        SimpleDateFormat format = new SimpleDateFormat("HH:mm");
        Paint.FontMetrics fontMetrics = paintDate.getFontMetrics();
        float padding = fontMetrics.top/2;
        //draw date
        int dateIndex[] = {0, getCoord().getRw() / 2, getCoord().getRw() - 1};
        for(int i = 0; i < dateIndex.length; i++){
            String text = format.format((Date)datas.getValue(dateIndex[i], 0));
            float textWidth = paintDate.measureText(text);
            float height = getHeight() - Config.bottomRulerHeight/2 - padding;

            if(i == 0){
                getCanvas().drawText(text, getLeft(), height, paintDate);
            }else if(i == dateIndex.length -1){
                getCanvas().drawText(text, getWidth() - textWidth, height, paintDate);
            }else{
                getCanvas().drawText(text, (getWidth() - textWidth)/2, height, paintDate);
            }
        }

        //draw zuo shou price line.
        Paint paintZs = new Paint();
        paintZs.setColor(Config.zuoShouColor);
        paintZs.setStyle(Paint.Style.STROKE);
        paintZs.setStrokeWidth(Config.gridLineWidth);
        paintZs.setPathEffect(new DashPathEffect(new float[]{10, 5}, 1));
        float zuoShouY = getCoord().SY(zuoShou);
        Path path = new Path();
        path.moveTo(getLeft(), zuoShouY);
        path.lineTo(getLeft() + getWidth(), zuoShouY);
        getCanvas().drawPath(path, paintZs);

        //dram min and avg price line
        Paint paint = new Paint();
        paint.setAntiAlias(true);
        paint.setStyle(Paint.Style.FILL_AND_STROKE);
        paint.setStrokeWidth(Config.minLineWidth);
        paint.setColor(Config.minLineColor);
        paint.setStrokeWidth(Config.minLineWidth);
        Paint paintAvg = new Paint();
        paintAvg.setAntiAlias(true);
        paintAvg.setStyle(Paint.Style.FILL_AND_STROKE);
        paintAvg.setStrokeWidth(Config.avgLineWidth);
        paintAvg.setColor(Config.avgLineColor);

        float lastX = getCoord().SX(getCoord().getRx() + 0.5f);
        Object priceObj = datas.getValue(0, 1);
        Object priceAvgObj = datas.getValue(0, 2);
        if (priceObj == null || priceAvgObj == null){
            return;
        }
        double price = (double)priceObj;
        float lastY = getCoord().SY((float) price);
        int count = getCoord().getRw() + getCoord().getRx();

        double priceAvg = (double)priceAvgObj;
        float lastYAvg = getCoord().SY((float) priceAvg);
        Path pathMin = new Path();
        pathMin.moveTo(getLeft(), getTop() + getHeight() - Config.bottomRulerHeight);
        for (int i = getCoord().getRx() + 1; i < count || i < datas.getRows(); i++) {
            Object chengJiaoObj = datas.getValue(i, 1);
            Object junJiaObj = datas.getValue(i, 2);
            if(chengJiaoObj == null || junJiaObj == null){
                continue;
            }

            double chengJiaoJia = (double)chengJiaoObj;
            double junJia = (double)junJiaObj;

            float currentY = getCoord().SY((float)chengJiaoJia);
            float currentYAvg = getCoord().SY((float)junJia);
            float currentX = getCoord().SX(i - getCoord().getRx() + 0.5f);

            getCanvas().drawLine(lastX, lastY, currentX, currentY, paint);
            pathMin.lineTo(currentX, currentY);

            getCanvas().drawLine(lastX, lastYAvg, currentX, currentYAvg, paintAvg);
            lastX = currentX;
            lastY = currentY;
            lastYAvg = currentYAvg;
        }
        pathMin.lineTo(lastX, getTop() + getHeight() - Config.bottomRulerHeight);
        pathMin.close();
        paint.setStyle(Paint.Style.FILL);
        paint.setColor(Config.minFillColor);
        getCanvas().drawPath(pathMin, paint);
    }
}
