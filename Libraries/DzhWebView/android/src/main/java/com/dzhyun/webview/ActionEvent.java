package com.dzhyun.webview;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.Event;
import com.facebook.react.uimanager.events.RCTEventEmitter;

class ActionEvent  extends Event<ActionEvent> {

    public static final String EVENT_NAME = "DzhWebViewActionEvent";

    protected String mUrl = "";

    protected ActionEvent(int viewTag, long timestampMs, String url) {
        super(viewTag, timestampMs);
        mUrl = url;
    }


    @Override
    public String getEventName() {
        return EVENT_NAME;
    }

    @Override
    public void dispatch(RCTEventEmitter rctEventEmitter) {
        rctEventEmitter.receiveEvent(getViewTag(), getEventName(), serializeEventData());
    }

    private WritableMap serializeEventData() {
        String [] array = mUrl.split("[?&=]");
        WritableMap params = Arguments.createMap();
        WritableMap event = Arguments.createMap();
        if (array.length > 1) {
            String action = array[0];
            for(int i = 1; i < array.length; i+=2) {
                params.putString(array[i], array[i+1]);
            }

            event.putString("action", action);
            event.putMap("params", params);
        }
        return event;
    }
}
