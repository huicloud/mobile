package com.dzhyun.dzhchart;

import java.util.ArrayList;
import java.util.Objects;

/**
 * Created by Administrator on 2015/11/5.
 */
public class TableData {
    private ArrayList<Column> head;
    private ArrayList<Row> datas;

    public TableData(String schema){
        this.datas = new ArrayList<>();
        this.head = new ArrayList<>();
        String cols[] = schema.split(";");
        for (String col:cols){
            head.add(new Column(col));
        }
    }

    public int getCols(){
        return head.size();
    }

    public int getRows(){
        return datas.size();
    }

    public Object getValue(int i, int j){
        return  datas.get(i).getCell(j).getValue();
    }

    public void setValue(int i, int j, Object val){
        datas.get(i).setRow(j, new Cell(val));
    }

    public Row getRow(int i){
        return datas.get(i);
    }

    public void setRow(int i, Row row){
        datas.set(i, row);
    }

    public void addRow(Row row){
        datas.add(row);
    }
}
