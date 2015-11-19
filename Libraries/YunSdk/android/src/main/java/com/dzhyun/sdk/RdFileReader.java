package com.dzhyun.sdk;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReadableArray;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URL;

/**
 * Created by jiagang on 15/11/17.
 */
public class RdFileReader extends ReactContextBaseJavaModule {


    public RdFileReader(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "RdFileReader";
    }

    @ReactMethod
    public void readFromUrl(String url, Callback successCallback) throws IOException {
        URL _url = new URL(url);
        successCallback.invoke(new String(ZLibUtils.decompress(_url.openStream()), "gbk"));
    }

    @ReactMethod
    public void readFromBytes(ReadableArray array, Callback successCallback) throws UnsupportedEncodingException {

        byte[] bytes = new byte[array.size()];
        for (int i = 0; i < array.size(); i++) {
            bytes[i] = (byte) array.getInt(i);
        }
        successCallback.invoke(new String(ZLibUtils.decompress(bytes), "gbk"));
    }
}
