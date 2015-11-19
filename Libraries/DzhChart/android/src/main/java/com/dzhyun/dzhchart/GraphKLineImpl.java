package com.dzhyun.dzhchart;

import android.graphics.Canvas;
import android.graphics.Paint;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by Administrator on 2015/11/14.
 */
public class GraphKLineImpl extends Graph {
    public GraphKLineImpl(Canvas canvas, LineGroup lines, float left, float top, float width, float height){
        super(canvas, lines, left, top, width, height);
    }

    @Override
    public void calCoord(){
        LineRange range = getLineGroup().range();
        setRange(range);

        Axis axis = new Axis(range.getMinVal(), range.getMaxVal(), getHeight(), 4);
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
        paint.setColor(Config.gridFontColor);
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

            float textWidth = paint.measureText(text);
            float pxl = getLeft() + Config.leftRulerWidth * (1 - Config.axisSpaceRation) - textWidth;
            pxl = pxl > 0 ? pxl : 0;
            getCanvas().drawText(text, pxl, sy - correct, paint);
        }
    }

    public void drawkLine(){
        TableData kdatas = getLineGroup().data(0);

        Paint paintDate = new Paint();
        paintDate.setTextSize(Config.fontSize);
        paintDate.setAntiAlias(true);
        paintDate.setColor(Config.gridFontColor);
        SimpleDateFormat format = new SimpleDateFormat("yyy-MM-dd");
        Paint.FontMetrics fontMetrics = paintDate.getFontMetrics();
        float padding = fontMetrics.top/2;
        //draw date
        int dateIndex[] = {0, getCoord().getRw() / 2, getCoord().getRw() - 1};
        for(int i = 0; i < dateIndex.length; i++){
            String text = format.format((Date)kdatas.getValue(dateIndex[i], 0));
            float textWidth = paintDate.measureText(text);

            if(i == 0){
                getCanvas().drawText(text, getLeft(), getHeight() - Config.bottomRulerHeight/2 - padding, paintDate);
            }else if(i == dateIndex.length -1){
                getCanvas().drawText(text, getWidth() - textWidth, getHeight() - Config.bottomRulerHeight/2  - padding, paintDate);
            }else{
                getCanvas().drawText(text, (getWidth() - textWidth)/2, getHeight() - Config.bottomRulerHeight/2  - padding, paintDate);
            }
        }

        Paint paint = new Paint();
        paint.setStyle(Paint.Style.FILL_AND_STROKE);
        Paint paintLine = new Paint();
        paintLine.setStyle(Paint.Style.STROKE);
        paintLine.setStrokeWidth(Config.kLineWidth);

        double spaceRatio = Config.spaceRatio;
        int count = getCoord().getRw() + getCoord().getRx();
        for (int i = getCoord().getRx(); i < count; i++) {
            double open = (double) kdatas.getValue(i, 1);
            double high = (double) kdatas.getValue(i, 2);
            double low = (double) kdatas.getValue(i, 3);
            double close = (double) kdatas.getValue(i, 4);

            float openS = getCoord().SY((float) open);
            float highS = getCoord().SY((float) high);
            float lowS = getCoord().SY((float) low);
            float closeS = getCoord().SY((float) close);

            float left = getCoord().SX(i - getCoord().getRx());
            float right = getCoord().SX(i - getCoord().getRx() + 1);
            float centerS = (float)Math.floor(getCoord().SX(i - getCoord().getRx() + 0.5f)) - 0.5f;
            float width = right - left;
            float space = (float) (width * spaceRatio);
            float halfWidthS = (float) Math.floor(width * (1 - spaceRatio) / 2);
            float leftS = centerS - halfWidthS;
            float rightS = centerS + halfWidthS;

            if (open > close) {
                paint.setColor(Config.dropColor);
                paintLine.setColor(Config.dropColor);
                getCanvas().drawLine(centerS, highS, centerS, openS, paintLine);
                getCanvas().drawRect(leftS, openS, rightS, closeS, paint);
                getCanvas().drawLine(centerS, closeS, centerS, lowS, paintLine);
            } else {
                paint.setColor(Config.riseColor);
                paintLine.setColor(Config.riseColor);
                getCanvas().drawLine(centerS, highS, centerS, closeS, paintLine);
                getCanvas().drawRect(leftS, closeS, rightS, openS, paint);
                getCanvas().drawLine(centerS, openS, centerS, lowS, paintLine);
            }
        }
    }

    public void draw(){
        setShowAxisDate(true);
        calCoord();
        drawGrid();
        drawkLine();
        drawAxisText();
    }
}
