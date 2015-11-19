package com.dzhyun.dzhchart;

import java.security.InvalidParameterException;
import java.text.Format;
import java.util.ArrayList;
import java.util.Formatter;
import java.util.Map;

/**
 * Created by Administrator on 2015/11/6.
 */
public class Axis {
    private ArrayList<Double> axises;
    private double minValue;
    private double maxValue;
    private double stepValue;

    public Axis(double minValue, double maxValue, double lastPrice, double height, int row){
        if (minValue > maxValue){
            minValue = lastPrice*0.9;//跌停价
            maxValue = lastPrice*1.1;//涨停价
        }
        this.axises = new ArrayList<>();
        double split;
        double max = Math.max(Math.abs(maxValue - lastPrice), Math.abs(minValue - lastPrice));
        split = max / (row / 2);

        double addition = split / 2;
        int midRow = row / 2;
        this.maxValue = lastPrice + midRow*split + addition;
        this.minValue = lastPrice - midRow*split - addition;
        this.stepValue = split;
        this.axises.add(this.minValue);

        for(int i = 0; i <= row; i++){
            this.axises.add(lastPrice + (i - midRow) * split);
        }
        this.axises.add(this.maxValue);
    }

    public Axis(double minValue, double maxValue, double height, int row){
        if (minValue > maxValue){
            minValue = 0;
            maxValue = 0;
        }
        this.axises = new ArrayList<>();
        double diff = maxValue - minValue;
        double split = diff / row;
        double addition = split / 2;
        this.maxValue = maxValue + addition;
        this.minValue = minValue - addition;
        this.stepValue = split;
        this.axises.add(this.minValue);
        for(int i = 0; i <= row; i++){
            this.axises.add(minValue + i*split);
        }
        this.axises.add(this.maxValue);
    }

    public Axis(double minValue, double maxValue, double height){
        if (minValue > maxValue){
            minValue = 0;
            maxValue = 0;
        }
        double r = maxValue - minValue;
        double splitCount = height / 160;
        double n = splitCount;
        double u1 = r/n;
        double exp = Math.floor(Math.log10(u1));
        double u2 = u1 / Math.pow(10, exp);

        double[] fixedUnits = new double[]{2,2.5,5,7.5,10};
        double u3 = Double.MAX_VALUE;
        int u3i = 0;

        for(int i = 0; i < fixedUnits.length; i ++){
            double diff = Math.abs(u2-fixedUnits[i]);
            if (u3 > diff){
                u3 = diff;
                u3i = i;
            }
        }
        u3 = fixedUnits[u3i] * Math.pow(10, exp);

        this.axises = new ArrayList<>();
        double start = Math.floor(minValue / u3) *u3;
        double axis = start;
        this.axises.add(axis);
        while (axis < maxValue || Math.abs(axis - maxValue) < 0.0000001){
            axis += u3;
            this.axises.add(axis);
        }
        this.minValue = this.axises.get(0);
        this.maxValue = this.axises.get(this.axises.size() - 1);
        this.stepValue = u3;
    }

    public int length(){
        return this.axises.size();
    }

    public double getAxis(int i){
        if(i < 0 || i >= this.axises.size()){
            System.out.printf("Index:%d out of range.", i);
            return 0;
        }
        return this.axises.get(i);
    }

    public double getMinValue() {
        return minValue;
    }

    public double getMaxValue() {
        return maxValue;
    }

    public double getStepValue() {
        return stepValue;
    }

    public String toString(){
        StringBuffer res = new StringBuffer();
        for (double str : this.axises){
            res.append(String.format("%#.5f",str)).append(",");
        }
        res.deleteCharAt(res.length()-1);
        return res.toString();
    }
}


