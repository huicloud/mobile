package com.dzhyun.sdk;

/**
 * Created by lijia on 15/11/1.
 */
public class YFloat {
    private static double[] ratios = {1e2, 1e1, 1.0, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1.0};

    public boolean success;
    public double val;
    public double ratio;



    public static YFloat parseFromLong(long val) {
        YFloat yf = new YFloat();

        if (val < 0) {
            yf.success = false;
            yf.val = Double.NaN;
            return yf;
        }

        long B = (val >> 16) & 0xFF;
        int L = (int) (B & 0x0F);
        long H = (B >> 4) & 0x0F;

        double Bx = (double) (((val >> 24) << 16) + (val & 0xFFFF));

        yf.ratio = ratios[L];

        if (H == 1) {
            yf.val = -(Bx / ratios[L]);
        } else {
            yf.val = (Bx / ratios[L]);
        }
        return yf;
    }

    public static double parse(long val) {
        YFloat yf = parseFromLong(val);
        return yf.val;
    }
}
