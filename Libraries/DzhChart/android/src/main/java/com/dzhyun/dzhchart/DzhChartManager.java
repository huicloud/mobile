package com.dzhyun.dzhchart;

import android.support.annotation.Nullable;
import com.facebook.react.uimanager.ReactProp;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;

public class DzhChartManager extends SimpleViewManager<DzhChart> {
    public static final String REACT_CLASS = "RCTDzhChart";

    private ThemedReactContext themedReactContext;
    private DzhChart dzhChart;
    
    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected DzhChart createViewInstance(ThemedReactContext themedReactContext) {
        this.themedReactContext = themedReactContext;
        this.dzhChart = new DzhChart(themedReactContext);

        return dzhChart;
    }

    @ReactProp(name = "chartData")
    public void setChartData(DzhChart chart, @Nullable String data) {
        dzhChart.drawDzhChart(data);
    }
}
