package com.dzhyun.webview;

import android.app.DownloadManager;
import android.content.Intent;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.os.SystemClock;
import android.webkit.DownloadListener;
import android.webkit.GeolocationPermissions;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.uimanager.UIManagerModule;
import com.facebook.react.uimanager.events.EventDispatcher;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;

class DzhWebView extends WebView {


    protected class GeoWebChromeClient extends WebChromeClient {
        @Override
        public void onGeolocationPermissionsShowPrompt(String origin, GeolocationPermissions.Callback callback) {
            callback.invoke(origin, true, false);
        }
    }

    protected class EventWebClient extends WebViewClient {

        private String injectedJavaScript = null;

        public void setInjectedJavaScript(String injectedJavaScript) {
            this.injectedJavaScript = injectedJavaScript;
        }

        public String getInjectedJavaScript() {
            return this.injectedJavaScript;
        }

        public void onPageFinished(WebView view, String url) {
            mEventDispatcher.dispatchEvent(
                    new NavigationStateChangeEvent(getId(), SystemClock.uptimeMillis(), false, url, view.canGoBack(), view.canGoForward()));

            if(getInjectedJavaScript() != null) {
                view.loadUrl("javascript:(function() { " + getInjectedJavaScript() + "})()");
            }
        }

        public void onPageStarted(WebView view, String url, Bitmap favicon) {
            mEventDispatcher.dispatchEvent(
                    new NavigationStateChangeEvent(getId(), SystemClock.uptimeMillis(), true, url, view.canGoBack(), view.canGoForward()));
        }

        public boolean shouldOverrideUrlLoading (WebView view, final String url){
            if (url.startsWith("dzh://")){
                mEventDispatcher.dispatchEvent(new ActionEvent(getId(), SystemClock.uptimeMillis(), url.substring(6)));
                return true;
            }
            return false;
        }
    }

    private final EventDispatcher mEventDispatcher;
    private final EventWebClient mWebViewClient;
    private String charset = "UTF-8";

    public DzhWebView(ReactContext reactContext) {
        super(reactContext);

        mEventDispatcher = reactContext.getNativeModule(UIManagerModule.class).getEventDispatcher();
        mWebViewClient = new EventWebClient();

        this.getSettings().setJavaScriptEnabled(true);
        this.getSettings().setBuiltInZoomControls(false);
        this.getSettings().setGeolocationEnabled(false);
        this.getSettings().setAllowFileAccess(true);
        this.getSettings().setAllowFileAccessFromFileURLs(true);
        this.getSettings().setAllowUniversalAccessFromFileURLs(true);
        this.getSettings().setLoadsImagesAutomatically(true);
        this.getSettings().setBlockNetworkImage(false);
        this.getSettings().setBlockNetworkLoads(false);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            this.getSettings().setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
        }

        this.setWebViewClient(mWebViewClient);
        this.setWebChromeClient(new WebChromeClient());

        this.setDownloadListener(new DownloadListener() {
            public void onDownloadStart(String url, String userAgent,
                                        String contentDisposition, String mimetype,
                                        long contentLength) {
                DownloadManager.Request request = new DownloadManager.Request(Uri.parse(url));
                request.allowScanningByMediaScanner();
                request.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED);
                request.setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS, "download");
                DownloadManager dm = (DownloadManager) getContext().getSystemService(getContext().DOWNLOAD_SERVICE);
                dm.enqueue(request);
            }
        });
    }

    public void setCharset(String charset) {
        this.charset = charset;
    }

    public String getCharset() {
        return this.charset;
    }

    public void setInjectedJavaScript(String injectedJavaScript) {
        mWebViewClient.setInjectedJavaScript(injectedJavaScript);
    }

    public String getInjectedJavaScript() {
        return mWebViewClient.getInjectedJavaScript();
    }

    public GeoWebChromeClient getGeoClient() {
        return new GeoWebChromeClient();
    }

}

