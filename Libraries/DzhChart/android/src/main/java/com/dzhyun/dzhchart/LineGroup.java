package com.dzhyun.dzhchart;

/**
 * Created by Administrator on 2015/11/5.
 */
public class LineGroup {
    //private final static String schema = "type;name;obj;data";
    private TableData datas;

    public LineGroup(TableData datas){
        this.datas = datas;
    }

    public LineRange range(){
        double minval = Double.MAX_VALUE;
        double maxval = Double.MIN_VALUE;
        int rowNum = count();
        for (int row = 0; row < rowNum; row++) {
            TableData data = (TableData)datas.getRow(row).getCell(1).getValue();

            for (int i= 0; i< data.getRows(); i++){
                for(int j=0; j<data.getCols();j++){
                    Object o = data.getValue(i,j);
                    if (o instanceof Double){
                        double val = (double)o;
                        if (val > maxval){
                            maxval = val;
                        }
                        if(val < minval){
                            minval = val;
                        }
                    }
                }
            }
        }
        return new LineRange(maxval, minval, maxval-minval);
    }

    public int count(){
        return datas.getRows();
    }

    public String type(int i){
        return (String) datas.getValue(i, 0);
    }

    public TableData data(int i){
        return (TableData) datas.getValue(i, 1);
    }

    public String name(int i){
        return (String) datas.getValue(i ,2);
    }

    public String obj(int i){
        return (String) datas.getValue(i, 3);
    }


    public void addLine(String type, TableData data, String name, String obj){
        datas.addRow(new Row(type, data, name, obj));
    }
}
