package com.dzhyun.webview;


import android.os.Build;
import android.webkit.CookieManager;
import android.webkit.CookieSyncManager;
import android.webkit.WebChromeClient;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.common.annotations.VisibleForTesting;
import com.facebook.react.uimanager.ReactProp;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;

public class DzhWebViewManager extends ViewGroupManager<DzhWebView> {

    public static int CMD_EXECUTE = 1;
    public static int CMD_RELOAD = 2;
    public static int CMD_GOBACK = 3;
    public static int CMD_GOFORWARD = 4;


    @VisibleForTesting
    public static final String REACT_CLASS = "DzhWebView";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    public DzhWebView createViewInstance(ThemedReactContext context) {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.LOLLIPOP) {
            CookieSyncManager.createInstance(context);
        }

        CookieManager.getInstance().setAcceptCookie(true); // add default cookie support
        CookieManager.getInstance().setAcceptFileSchemeCookies(true); // add default cookie support

        DzhWebView view = new DzhWebView(context);
        return view;
    }

    @ReactProp(name = "disableCookies", defaultBoolean = false)
    public void setDisableCookies(DzhWebView view, boolean disableCookies) {
        if(disableCookies) {
            CookieManager.getInstance().setAcceptCookie(false);
            CookieManager.getInstance().setAcceptFileSchemeCookies(false);
        } else {
            CookieManager.getInstance().setAcceptCookie(true);
            CookieManager.getInstance().setAcceptFileSchemeCookies(true);
        }
    }

    @ReactProp(name = "builtInZoomControls", defaultBoolean = false)
    public void setBuiltInZoomControls(DzhWebView view, boolean builtInZoomControls) {
        view.getSettings().setBuiltInZoomControls(builtInZoomControls);
    }

    @ReactProp(name = "geolocationEnabled", defaultBoolean = false)
    public void setGeolocationEnabled(DzhWebView view, boolean geolocationEnabled) {
        view.getSettings().setGeolocationEnabled(geolocationEnabled);

        if(geolocationEnabled) {
            view.setWebChromeClient(view.getGeoClient());
        }
        else {
            view.setWebChromeClient(new WebChromeClient());
        }
    }

    @ReactProp(name = "javaScriptEnabledAndroid", defaultBoolean = true)
    public void setJavaScriptEnabledAndroid(DzhWebView view, boolean javaScriptEnabled) {
        view.getSettings().setJavaScriptEnabled(javaScriptEnabled);
    }

    @ReactProp(name = "url")
    public void setUrl(DzhWebView view, @Nullable String url) {
        view.loadUrl(url);
    }

    @ReactProp(name = "htmlCharset")
    public void setHtmlCharset(DzhWebView view, @Nullable String htmlCharset) {
        if(htmlCharset != null) view.setCharset(htmlCharset);
    }

    @ReactProp(name = "html")
    public void setHtml(DzhWebView view, @Nullable String html) {
        view.loadData(html, "text/html; charset=" + view.getCharset(), view.getCharset());
    }

    @ReactProp(name = "injectedJavaScript")
    public void setInjectedJavaScript(DzhWebView view, @Nullable String injectedJavaScript) {
        view.setInjectedJavaScript(injectedJavaScript);
    }



    @Override
    public Map getExportedCustomDirectEventTypeConstants() {
        return  MapBuilder.of(
                NavigationStateChangeEvent.EVENT_NAME, MapBuilder.of("registrationName", "onNavigationStateChange"),
                ActionEvent.EVENT_NAME, MapBuilder.of("registrationName", "onWebViewEvent")
        );
    }

    @Override
    public Map getExportedViewConstants() {
        final Map<String, Object> constants = new HashMap<>();

        constants.put("DzhNavigationScheme", "dzh");
        constants.put("CMD_EXECUTE", CMD_EXECUTE);
        constants.put("CMD_RELOAD", CMD_RELOAD);
        constants.put("CMD_GOBACK", CMD_GOBACK);
        constants.put("CMD_GOFORWARD", CMD_GOFORWARD);

        return constants;
    }

    @Override
    public @Nullable Map<String, Integer> getCommandsMap() {
        final Map<String, Integer> commands = new HashMap<>();

        commands.put("execute", CMD_EXECUTE);
        commands.put("reload", CMD_GOFORWARD);
        commands.put("goBack", CMD_GOBACK);
        commands.put("goForward", CMD_RELOAD);

        return commands;
    }

    @Override
    public void receiveCommand(DzhWebView root, int commandId, @Nullable ReadableArray args) {
        if (commandId == CMD_EXECUTE) {
           if (args != null && args.size() > 0) {
               if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
                   root.evaluateJavascript(args.getString(0), null);
               }else{
                   root.loadUrl("javascript:(function() { " + args.getString(0) + "})()");
               }
           }
        }else if (commandId == CMD_RELOAD) {
            root.reload();
        }else if (commandId == CMD_GOBACK) {
            if (root.canGoBack())
                root.goBack();
        }else if (commandId == CMD_GOFORWARD){
            if (root.canGoForward()){
                root.goForward();
            }
        }
    }
}

