package com.dzhyun.sdk;

import com.dzhyun.proto.Dzhpbtable;
import com.dzhyun.proto.Dzhua.UAResponse;
import com.dzhyun.proto.AutoMsg.MSG;
import com.google.protobuf.Descriptors.FieldDescriptor;
import com.google.protobuf.InvalidProtocolBufferException;
import com.google.protobuf.Message;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

public final class Pb2Json {

    private static String ERROR_JSON = "{}";


    public static String toJson(byte[] pb) {


        try {
            UAResponse ua = UAResponse.parseFrom(pb);

            if (ua.getErr() != 0) {
                return ERROR_JSON;
            }

            JSONObject obj = new JSONObject();

            obj.put("Qid", ua.getQid());

            MSG msg = MSG.parseFrom(ua.getData().toByteArray());

            if (msg.getId() != MSG.TBL_FIELD_NUMBER) {
                obj.put("Data", parseMsg(msg));
            }else {
                obj.put("Data", parseTable(msg.getTbl().getData(0).getTValues(0)));
            }


            return obj.toString();

        } catch (InvalidProtocolBufferException e) {
            e.printStackTrace();
            return ERROR_JSON;

        } catch (JSONException e) {
            e.printStackTrace();
            return ERROR_JSON;
        }
    }

    private static JSONArray parseMsg(MSG msg) {

        Set<Map.Entry<FieldDescriptor,Object >> fields = msg.getAllFields().entrySet();
        for (Map.Entry<FieldDescriptor, Object> field : fields) {
            FieldDescriptor fd = field.getKey();
            Object val = field.getValue();

            if (fd.getNumber() == msg.getId()) {
                JSONArray array = new JSONArray();
                List<Message> msgs = (List<Message>)msg.getField(fd);
                try {
                    for (int i = 0; i < msgs.size(); i++) {
                        array.put(i, parsePbMessage(msgs.get(i)));
                    }
                }catch (JSONException e) {
                    e.printStackTrace();
                    return new JSONArray();
                }
                return array;


            }
        }
        return new JSONArray();
    }




    private static JSONObject parsePbMessage(Message msg) {

        Set<Map.Entry<FieldDescriptor,Object >> fields = msg.getAllFields().entrySet();

        JSONObject result = new JSONObject();

        for (Map.Entry<FieldDescriptor, Object> field : fields) {
            FieldDescriptor fd = field.getKey();
            Object val = field.getValue();
            FieldDescriptor.JavaType type = fd.getJavaType();

            try {
                if (fd.isRepeated()) {
                    JSONArray array = new JSONArray();
                    for(int i = 0; i < msg.getRepeatedFieldCount(fd); i++) {
                        Object fval = msg.getRepeatedField(fd, i);
                        if (fval instanceof Message)
                            array.put(i, parsePbMessage((Message) fval));
                        else
                            array.put(i, val);

                    }
                    result.put(fd.getName(), array);
                } else if (fd.getJavaType() == FieldDescriptor.JavaType.MESSAGE) {
                    result.put(fd.getName(), parsePbMessage((Message) val));
                }else if (fd.getJavaType() == FieldDescriptor.JavaType.LONG) {
                    result.put(fd.getName(), YFloat.parse(((Number) val).longValue()));
                }else
                    result.put(fd.getName(), val);
            }catch (JSONException e) {
                e.printStackTrace();
                continue;
            }
        }

        return result;
    }

    private static JSONArray parseTable(Dzhpbtable.Table table) {

        JSONArray result = new JSONArray();

        int firstType  = table.getInfo(0).getType();
        int rows;

        switch (firstType){
            case Dzhpbtable.InfoType.Type_Table_VALUE:
                rows = table.getData(0).getTValuesCount();
                break;
            case Dzhpbtable.InfoType.Type_SInt_VALUE:
                rows = table.getData(0).getXValuesCount();
                break;
            case Dzhpbtable.InfoType.Type_Int_VALUE:
                rows = table.getData(0).getIValuesCount();
                break;
            case Dzhpbtable.InfoType.Type_String_VALUE:
                rows = table.getData(0).getSValuesCount();
                break;
            default:
                rows = 0;
        }

        double[] sValues = new double[table.getInfoCount()];
        double[] rValues = new double[table.getInfoCount()];

        try{
            for(int i = 0; i < rows; i++) {

                JSONObject obj = new JSONObject();

                for (int j = 0; j < table.getInfoCount(); j++) {
                    String name = table.getInfo(j).getName();
                    switch (table.getInfo(j).getType()) {
                        case Dzhpbtable.InfoType.Type_Table_VALUE:
                            obj.put(name, parseTable(table.getData(j).getTValues(i)));
                            break;
                        case Dzhpbtable.InfoType.Type_SInt_VALUE:
                            if (i == 0) {
                                YFloat yf = YFloat.parseFromLong(table.getData(j).getXValues(i));
                                rValues[j] = yf.ratio;

                                // 避免double类型计算后精度丢失，sValues存储扩展精度后的数据
                                sValues[j] = (double) Math.round(yf.val * yf.ratio);
                            }else {
                                int ratio = table.getInfo(j).hasRatio() ? table.getInfo(j).getRatio() : 1;
                                sValues[j] += table.getData(j).getXValues(i) * ratio;
                            }
                            obj.put(name, sValues[j]/rValues[j]);
                            break;
                        case Dzhpbtable.InfoType.Type_Int_VALUE:
                            obj.put(name, YFloat.parse(table.getData(j).getIValues(i)));
                            break;
                        case Dzhpbtable.InfoType.Type_String_VALUE:
                            obj.put(name, table.getData(j).getSValues(i));
                            break;
                    }
                }
                result.put(i, obj);
            }
            return result;
        }catch (JSONException e) {
            e.printStackTrace();
            return new JSONArray();
        }
    }

}
