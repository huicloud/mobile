package com.dzhyun.dzhchart;

import android.graphics.Canvas;
import android.graphics.Paint;

/**
 * Created by Administrator on 2015/11/14.
 */
public class GrapQtyImpl extends Graph {
    public GrapQtyImpl(Canvas canvas, LineGroup lineGroup, float left, float top, float width, float height){
        super(canvas, lineGroup, left, top, width, height);
    }

    public void drawQty(){
        TableData datas = getLineGroup().data(0);
        Paint paint = new Paint();
        paint.setStyle(Paint.Style.FILL_AND_STROKE);
        paint.setColor(Config.minLineColor);

        double spaceRatio = Config.spaceRatio;
        int count = getCoord().getRw() + getCoord().getRx();
        for (int i = getCoord().getRx(); i < count; i++) {
            Object qtyObj = datas.getValue(i, 0);
            if(qtyObj == null){
                continue;
            }
            double qty = (double)qtyObj;
            float qtyS = getCoord().SY((float)qty);

            float left = getCoord().SX(i - getCoord().getRx());
            float right = getCoord().SX(i - getCoord().getRx() + 1);
            float centerS = (float)Math.floor(getCoord().SX(i - getCoord().getRx() + 0.5f)) - 0.5f;
            float width = right - left;
            float halfWidthS = (float) Math.floor(width * (1 - spaceRatio) / 2);
            float leftS = centerS - halfWidthS;
            float rightS = centerS + halfWidthS;

            if((boolean)datas.getValue(i, 1)){
                paint.setColor(Config.riseColor);
            }else{
                paint.setColor(Config.dropColor);
            }

            if(Math.abs(halfWidthS - 0) < 0.0000001){
                getCanvas().drawLine(centerS, qtyS, centerS, getCoord().getSh() + getCoord().getSy(), paint);
            }else{
                getCanvas().drawRect(leftS, qtyS, rightS, getCoord().getSh() + getCoord().getSy(), paint);
            }
        }
    }

    public void draw(){
        calCoord();
        drawGrid();
        drawQty();
        drawAxisText();
    }
}
