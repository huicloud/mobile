package com.yunapp;

import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

/**
 * 模拟AppStateIOS模块，实现addEventListener和removeEventListener方法，监听应用状态change事件
 * java端需要监听activity的生命周期变化触发js模块的对应事件
 * Created by jiagang on 15/12/7.
 */
public class AppStateModule extends ReactContextBaseJavaModule {


    public AppStateModule(final ReactApplicationContext reactContext) {
        super(reactContext);

        LifecycleEventListener listener = new LifecycleEventListener() {
            @Override
            public void onHostResume() {
                emitJavascriptEvent("hostResume");
            }

            @Override
            public void onHostPause() {
                emitJavascriptEvent("hostPause");
            }

            @Override
            public void onHostDestroy() {
                emitJavascriptEvent("hostDestroy");
            }
        };

        reactContext.addLifecycleEventListener(listener);
    }

    private void emitJavascriptEvent(String eventType) {
        this.getReactApplicationContext()
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventType, null);
    }

    @Override
    public String getName() {
        return "AppStateModule";
    }
}
