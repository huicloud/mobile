package com.dzhyun.dzhchart;

import android.content.Context;
import android.content.res.TypedArray;
import android.graphics.Canvas;
import android.graphics.Color;
import android.util.AttributeSet;
import android.view.View;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import java.util.Date;

public class DzhChart extends View {
    private LineGroup lineGroup[];
    private StkInfo stkInfo;
    private String chartType;

    public DzhChart(Context context) {
        super(context);
        init(null, 0);
    }

    public DzhChart(Context context, AttributeSet attrs) {
        super(context, attrs);
        init(attrs, 0);
    }

    public DzhChart(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
        init(attrs, defStyle);
    }

    private void init(AttributeSet attrs, int defStyle) {
        // Load attributes
        final TypedArray a = getContext().obtainStyledAttributes(attrs, R.styleable.DzhChart, defStyle, 0);
        a.recycle();

        lineGroup = new LineGroup[2];
        stkInfo = new StkInfo();
        Config.init(this.getResources());
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);

        int paddingLeft = getPaddingLeft();
        int paddingTop = getPaddingTop();
        int paddingRight = getPaddingRight();
        int paddingBottom = getPaddingBottom();
        int contentWidth = getWidth() - paddingLeft - paddingRight;
        int contentHeight = getHeight() - paddingTop - paddingBottom;

        int tLeft = paddingLeft;
        int tTop = paddingTop;
        int tWidth = contentWidth;
        int tHeight = contentHeight * 2/3;

        Graph graph;
        if(Config.chartKLine.equals(chartType)){
            graph = new GraphKLineImpl(canvas, lineGroup[0], tLeft, tTop, tWidth, tHeight);
            graph.draw();
        }else if(Config.chartMin.equals(chartType)){
            graph = new GraphMinImpl(canvas, lineGroup[0], stkInfo.getZuoShou(), tLeft, tTop, tWidth, tHeight);
            graph.draw();
        }else{
            System.out.printf("Cannot deal with chart type:%s.", chartType);
            return;
        }

        int qLeft = paddingLeft;
        int qTop = tTop + tHeight;
        int qWidth = tWidth;
        int qHeight = contentHeight * 1/3;
        graph = new GrapQtyImpl(canvas, lineGroup[1], qLeft, qTop, qWidth, qHeight);
        graph.draw();
    }

    public void drawDzhChart(String json){
        try {
            JSONObject data = new JSONObject(json);
            String type = data.getString("chartType");
            JSONObject stkobj = data.getJSONObject("stkInfo");
            String name = stkobj.getString("MingCheng");
            String obj = stkobj.getString("Obj");
            chartType = type;
            stkInfo.setName(name);
            stkInfo.setObj(obj);

            JSONObject color = data.getJSONObject("color");
            String riseColor = color.getString("ShangZhangYanSe");
            String dropColor = color.getString("XiaDieYanSe");
            String bgColor = color.getString("BeiJingYanSe");
            Config.riseColor = Color.parseColor(riseColor);
            Config.dropColor = Color.parseColor(dropColor);
            Config.bgColor = Color.parseColor(bgColor);

            TableData datas;
            TableData qtyDatas;
            String schame;
            JSONArray datasarr = data.getJSONArray("chartData");
            if(Config.chartKLine.equals(type)){
                schame = "KaiPanJia;ZuiGaoJia;ZuiDiJia;ShouPanJia";
                datas = new TableData(schame);
                schame = "ChengJiaoLiang;ZhangDie";
                qtyDatas = new TableData(schame);
                for(int i = 0; i < datasarr.length(); i++){
                    JSONObject o = datasarr.getJSONObject(i);
                    long time = o.getLong("ShiJian");
                    Date date = new Date(time*1000);

                    double open = o.getDouble("KaiPanJia");
                    double high = o.getDouble("ZuiGaoJia");
                    double low = o.getDouble("ZuiDiJia");
                    double close = o.getDouble("ShouPanJia");
                    double qty = o.getInt("ChengJiaoLiang");
                    datas.addRow(new Row(date, open, high, low, close));

                    boolean zhangDie = close > open ? true: false;
                    qtyDatas.addRow(new Row(qty, zhangDie));
                }
                schame = "type;data;name;obj";
                TableData datasg = new TableData(schame);
                datasg.addRow(new Row(type, datas, name, obj));
                lineGroup[0] = new LineGroup(datasg);

                TableData qtyDatasg = new TableData(schame);
                qtyDatasg.addRow(new Row(type, qtyDatas, name, obj));
                lineGroup[1] = new LineGroup(qtyDatasg);

                invalidate();//通知重绘界面
            }else if(Config.chartMin.equals(type)){
                double zuoShou = stkobj.getDouble("ZuoShou");
                this.stkInfo.setZuoShou((float)zuoShou);
                schame = "ChengJiaoJia;JunJia";
                datas = new TableData(schame);
                schame = "ChengJiaoLiang;ZhangDie";
                qtyDatas = new TableData(schame);
                double lastPrice = zuoShou;
                for(int i = 0; i < datasarr.length(); i++){
                    JSONObject o = datasarr.getJSONObject(i);
                    long time = o.getLong("ShiJian");
                    Date date = new Date(time*1000);

                    double price = o.optDouble("ChengJiaoJia");
                    double avgPrice = o.optDouble("JunJia");
                    if(Double.isNaN(price) || Double.isNaN(avgPrice)){
                        datas.addRow(new Row(date, null, null));
                        qtyDatas.addRow(new Row(null, false));
                    }else{
                        double qty = o.optDouble("ChengJiaoLiang");
                        datas.addRow(new Row(date, price, avgPrice));
                        boolean zhangDie = price > lastPrice ? true: false;
                        qtyDatas.addRow(new Row(qty, zhangDie));
                        lastPrice = price;
                    }
                }
                schame = "type;data;name;obj";
                TableData datasg = new TableData(schame);
                datasg.addRow(new Row(type, datas, name, obj));
                lineGroup[0] = new LineGroup(datasg);

                TableData qtyDatasg = new TableData(schame);
                qtyDatasg.addRow(new Row(type, qtyDatas, name, obj));
                lineGroup[1] = new LineGroup(qtyDatasg);

                invalidate();//通知重绘界面
            }else{
                System.out.printf("ChartType error.Can't deal with:%s.", type);
            }
        }catch (JSONException ex) {
            System.out.printf("Json parse fialed:%s.", ex.getMessage());
            ex.printStackTrace();
        }catch (Exception ex){
            System.out.printf("Exception:%s", ex.getMessage());
            ex.printStackTrace();
        }
    }
}

