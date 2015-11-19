package com.dzhyun.sdk;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewManager;
import com.facebook.react.views.image.ReactImageView;

import java.util.ArrayList;
import java.util.List;
/**
 * Created by lijia on 15/11/2.
 */
public class DzhPackage implements ReactPackage {

    @Override
    public List<NativeModule> createNativeModules( ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new DzhChannel(reactContext));
        modules.add(new RdFileReader(reactContext));
        return modules;
    }


    @Override
    public List<ViewManager> createViewManagers( ReactApplicationContext reactContext) {
        List<ViewManager> views = new ArrayList<>();

        return views;
    }

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules(){
        List<Class<? extends JavaScriptModule>> modules = new ArrayList<>();

        return modules;

    }
}
