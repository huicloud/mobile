package com.dzhyun.dzhchart;

import android.content.res.Resources;

/**
 * Created by Administrator on 2015/11/9.
 */
public class Config {
    public static String chartKLine;
    public static String chartMin;
    public static int bgColor;
    public static int borderColor;
    public static int gridLineColor;
    public static int gridFontColor;
    public static int dropColor;
    public static int riseColor;
    public static int minLineColor;
    public static int avgLineColor;
    public static int zuoShouColor;
    public static int minFillColor;
    public static float borderLineWidth;
    public static float gridLineWidth;
    public static float leftRulerWidth;
    public static float rightRulerWidth;
    public static float bottomRulerHeight;
    public static float kLineWidth;
    public static float minLineWidth;
    public static float avgLineWidth;
    public static float fontSize;
    public static float countRatio;
    public static float spaceRatio;
    public static float axisSpaceRation;

    public static void init(Resources res){
        chartKLine = res.getString(R.string.dzhChartKLine);
        chartMin = res.getString(R.string.dzhChartMin);
        bgColor = res.getColor(R.color.dzhChartBgColor);
        borderColor = res.getColor(R.color.dzhChartBorderColor);
        gridLineColor = res.getColor(R.color.dzhChartGridLineColor);
        gridFontColor = res.getColor(R.color.dzhChartGridFontColor);
        dropColor = res.getColor(R.color.dzhChartDropColor);
        riseColor = res.getColor(R.color.dzhChartRiseColor);
        minLineColor = res.getColor(R.color.dzhChartMinLineColor);
        avgLineColor = res.getColor(R.color.dzhChartAvgLineColor);
        zuoShouColor = res.getColor(R.color.dzhChartZuoShouColor);
        minFillColor = res.getColor(R.color.dzhChartMinFillColor);
        borderLineWidth = res.getDimension(R.dimen.dzhChartBorderLineWidth);
        gridLineWidth = res.getDimension(R.dimen.dzhChartGridLineWidth);
        leftRulerWidth = res.getDimension(R.dimen.dzhChartLeftRulerWidth);
        rightRulerWidth = res.getDimension(R.dimen.dzhChartRightRulerWidth);
        bottomRulerHeight = res.getDimension(R.dimen.dzhChartBottomRulerHeight);;
        kLineWidth = res.getDimension(R.dimen.dzhChartKLineWidth);
        minLineWidth = res.getDimension(R.dimen.dzhChartMinLineWidth);
        avgLineWidth = res.getDimension(R.dimen.dzhChartAvgLineWidth);
        fontSize = res.getDimension(R.dimen.dzhChartFontSize);
        countRatio = 1f;
        spaceRatio = 0.3f;
        axisSpaceRation = 0.2f;
    }
}
