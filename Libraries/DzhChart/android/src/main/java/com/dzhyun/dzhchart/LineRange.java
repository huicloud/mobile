package com.dzhyun.dzhchart;

/**
 * Created by Administrator on 2015/11/5.
 */
public class LineRange {
    private double maxVal;
    private double minVal;
    private double range;

    public LineRange(double maxVal, double minVal, double range) {
        this.maxVal = maxVal;
        this.range = range;
        this.minVal = minVal;
    }

    public double getMaxVal() {
        return maxVal;
    }

    public void setMaxVal(double maxVal) {
        this.maxVal = maxVal;
    }

    public double getMinVal() {
        return minVal;
    }

    public void setMinVal(double minVal) {
        this.minVal = minVal;
    }

    public double getRange() {
        return range;
    }

    public void setRange(double range) {
        this.range = range;
    }
}
