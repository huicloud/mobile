package com.dzhyun.sdk;


/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.net.ConnectivityManager;
import android.net.Network;
import android.net.NetworkInfo;
import android.os.Bundle;
import android.util.Log;

import java.io.IOException;

import com.dzhyun.sdk.Pb2Json;
import com.facebook.common.logging.FLog;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.common.ReactConstants;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import com.squareup.okhttp.Connection;
import com.squareup.okhttp.OkHttpClient;
import com.squareup.okhttp.Request;
import com.squareup.okhttp.Response;
import com.squareup.okhttp.internal.http.HttpEngine;
import com.squareup.okhttp.internal.http.RouteException;
import com.squareup.okhttp.ws.WebSocket;
import com.squareup.okhttp.ws.WebSocketCall;
import com.squareup.okhttp.ws.WebSocketListener;

import java.net.InetAddress;
import java.net.Socket;
import java.net.SocketException;
import java.net.UnknownHostException;
import java.sql.Time;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.TimeUnit;

import javax.net.SocketFactory;

import okio.Buffer;
import okio.BufferedSource;

public class DzhChannel extends ReactContextBaseJavaModule {

    //private Map<Integer, WebSocket> mWebSocketConnections = new HashMap<>();
    private ReactContext mReactContext;
    private WebSocket mClient;
    private Timer mAliveChecker;
    private long mLastPongTime;
    private BroadcastReceiver mNetworkStateChanged;


    private String TAG = "DzhChannel";
    
    public DzhChannel(ReactApplicationContext context) {
        super(context);
        mReactContext = context;

        mNetworkStateChanged = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                String action = intent.getAction();
                if (action.equals(ConnectivityManager.CONNECTIVITY_ACTION)) {

                    NetworkInfo ni = (NetworkInfo)intent.getExtras().get("networkInfo");

                    if (ni != null && ni.isConnected()) {
                        if (mClient != null) {
                            // notify channel should be closed, when a new network is connected

                            close(0, "network changed", 0);

                            Log.d(TAG, "networkchanged: " + "send closed event");
                        }else{
                            Log.d(TAG, "networkchanged: no client active");
                        }
                    }

                    /*
                    if (ni != null) {
                        Bundle bundle = intent.getExtras();
                        Log.d("NetworkChanged", "********************************");
                        if (bundle != null) {
                            Set<String> keys = bundle.keySet();
                            Iterator<String> it = keys.iterator();
                            Log.d("NetworkChagned","Dumping Intent start");
                            while (it.hasNext()) {
                                String key = it.next();
                                Log.d("NetworkChagned","[" + key + "=" + bundle.get(key)+"]");
                            }
                            Log.d("NetworkChagned","Dumping Intent end");
                        }
                        Log.d("NetworkChanged", ni.toString() + ni.getDetailedState() + intent.getExtras());
                    }
                    */
                }
            }
        };
        IntentFilter filter = new IntentFilter();
        filter.addAction(ConnectivityManager.CONNECTIVITY_ACTION);
        context.registerReceiver(mNetworkStateChanged, filter);
    }

    private void sendEvent(String eventName, WritableMap params) {
        mReactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }



    @Override
    public String getName() {
        return "DzhChannelModule";
    }

    @ReactMethod
    public void connect(final String url, final int id) {
        Log.d(TAG, "connect: " + url);

        final OkHttpClient client = new OkHttpClient();

        client.setConnectTimeout(10, TimeUnit.SECONDS);
        client.setWriteTimeout(10, TimeUnit.SECONDS);
        // Disable timeouts for read
        client.setReadTimeout(0, TimeUnit.MINUTES);


        Request request = new Request.Builder()
                .tag(id)
                .url(url)
                .build();


        WebSocketCall.create(client, request).enqueue(new WebSocketListener() {

            @Override
            public void onOpen(WebSocket webSocket, Response response) {
                mClient = webSocket;
                WritableMap params = Arguments.createMap();
                params.putInt("id", id);
                sendEvent("dzhChannelOpen", params);

                mAliveChecker = new Timer();
                mAliveChecker.schedule(new TimerTask() {
                    @Override
                    public void run() {
                        try {
                            long nowTime = System.currentTimeMillis();
                            if (nowTime - mLastPongTime > 301 * 1000){
                                // Pong shouln't be dealied 1000ms, in this case, socket maybe broken
                                close(0, "no pong received", 0);
                                Log.d(TAG, "AliveChecker " + String.format("%d %d close", nowTime, mLastPongTime));
                            }else {
                                Log.d(TAG, "AliveChecker " + String.format("%d %d sendPing", nowTime, mLastPongTime));
                                mClient.sendPing(null);
                            }
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                }, 1000, 300 * 1000);
                mLastPongTime = System.currentTimeMillis() + 1000;
            }

            @Override
            public void onClose(int code, String reason) {
                notifyChannelClosed(id, code, reason);
            }

            @Override
            public void onFailure(IOException e, Response response) {
                notifyChannelFailed(id, e.getMessage(), "");
            }

            @Override
            public void onPong(Buffer buffer) {
                mLastPongTime = System.currentTimeMillis();
            }

            @Override
            public void onMessage(BufferedSource bufferedSource, WebSocket.PayloadType payloadType) {
                String message;
                if (payloadType == WebSocket.PayloadType.BINARY) {
                    try {
                        message = Pb2Json.toJson(bufferedSource.readByteArray());
                        bufferedSource.close();
                    } catch (IOException e) {
                        Log.d(
                                TAG,
                                "decode pb failed " + id,
                                e);
                        return;
                    }

                } else {
                    try {
                        message = bufferedSource.readUtf8();
                    } catch (Exception e) {
                        notifyChannelFailed(id, e.getMessage(), "");
                        return;
                    }
                    try {
                        bufferedSource.close();
                    } catch (IOException e) {
                        Log.d( TAG,
                            "Could not close BufferedSource for WebSocket id " + id,
                            e);
                    }

                }

                WritableMap params = Arguments.createMap();
                params.putInt("id", id);
                params.putString("data", message);
                sendEvent("dzhChannelMessage", params);
            }
        });

        // Trigger shutdown of the dispatcher's executor so this process can exit cleanly
        client.getDispatcher().getExecutorService().shutdown();
    }

    @ReactMethod
    public void close(int code, String reason, int id) {

        WebSocket client = mClient;
        if (client == null) {
            notifyChannelClosed(0, 0, "no active channel");
        }
        try {
            client.close(code, reason);
        } catch (Exception e) {
            Log.d( TAG,
                    "Could not close WebSocket connection for id " + id,
                    e);
            notifyChannelClosed(0, 0, "closed with error");
        }
    }

    @ReactMethod
    public void send(String message, int id) {
        WebSocket client = mClient;
        if (client == null) {
            notifyChannelFailed(0, "no active channel", message);
            return;
        }
        try {
            client.sendMessage(
                    WebSocket.PayloadType.TEXT,
                    new Buffer().writeUtf8(message));
        } catch (Exception e) {
            notifyChannelFailed(0, "already closed", message);
            Log.d( TAG,
                    "Could not send " + id,
                    e);
        }
    }

    private void notifyChannelFailed(int id, String message, String url) {
        WritableMap params = Arguments.createMap();
        params.putInt("id", id);
        params.putString("message", message);
        params.putString("url", url);
        sendEvent("dzhChannelFailed", params);
    }

    private void notifyChannelClosed(int id, int code, String reason){
        WritableMap params = Arguments.createMap();
        params.putInt("id", id);
        params.putInt("code", code);
        params.putString("reason", reason);
        sendEvent("dzhChannelClosed", params);
    }

}
