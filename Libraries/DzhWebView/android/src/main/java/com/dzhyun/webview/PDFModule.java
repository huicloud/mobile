package com.dzhyun.webview;

import android.app.DownloadManager;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Environment;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by jiagang on 15/11/20.
 */
public class PDFModule extends ReactContextBaseJavaModule {

    public PDFModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "PDFModule";
    }

    @ReactMethod
    public void open(String pdfUrl) {

        Context context = this.getReactApplicationContext();
        Uri uri = Uri.parse(pdfUrl);

//        DownloadManager.Request request = new DownloadManager.Request(uri);
//        request.allowScanningByMediaScanner();
//        request.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE);
//        request.setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS, uri.getLastPathSegment());
//        DownloadManager dm = (DownloadManager) context.getSystemService(context.DOWNLOAD_SERVICE);
//        dm.enqueue(request);

        Intent intent = new Intent();
        intent.setAction(android.content.Intent.ACTION_VIEW);
        intent.setData(uri);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        context.startActivity(intent);
    }
}
