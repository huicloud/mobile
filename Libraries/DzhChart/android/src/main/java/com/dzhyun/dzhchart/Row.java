package com.dzhyun.dzhchart;

import java.util.ArrayList;

/**
 * Created by Administrator on 2015/11/5.
 */
public class Row {
    private ArrayList<Cell> row;

    public Row(Object...objects){
        this.row = new ArrayList<>();
        for(Object object:objects){
            row.add(new Cell(object));
        }
    }

    public Row(Cell...cells){
        this.row = new ArrayList<>();
        for (Cell cell:cells) {
            row.add(cell);
        }
    }

    public Cell getCell(int index){
        return  row.get(index);
    }

    public void setRow(int index, Cell cell){
        row.set(index, cell);
    }

    public int size(){
        return row.size();
    }
}
