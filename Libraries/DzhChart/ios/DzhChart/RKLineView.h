//
//  RKLineView.h
//  testDraw
//
//  Created by dzh on 15/11/15.
//  Copyright (c) 2015年 dzh. All rights reserved.
//

#import <UIKit/UIKit.h>
@interface RKLineView : UIView
{
    NSString *_chartData; //数据源 名字不能改动
}

@property (nonatomic,assign) CGFloat kLineWidth; // k线的宽度 用来计算可存放K线实体的个数，也可以由此计算出起始日期和结束日期的时间段
@property (nonatomic,retain) NSMutableArray *drawdata;//画线数据
@property (nonatomic,assign) NSString *chartType;// 画线类型
@property (nonatomic,assign) int drawDataCount;// 画线数据的个数
//fenshi
@property (nonatomic,assign) CGFloat fenshipricemin;//分时最小价格
@property (nonatomic,assign) CGFloat fenshipricemax;//分时最大价格
@property (nonatomic,assign) CGFloat fenshizuoshou;//分时昨收
@property (nonatomic,assign) CGFloat fenshiVolMax;// 分时成交量
@property (nonatomic,assign) int fenshiCount;// 分时成交量
//Kline
@property (nonatomic,assign) CGFloat klinepricemin;//K线最小价格
@property (nonatomic,assign) CGFloat klinepricemax;//K线最大价格
@property (nonatomic,assign) CGFloat klineVolMax;// K线成交量
//colour
@property (nonatomic,assign) unsigned int shangzhangR;// 上涨颜色
@property (nonatomic,assign) unsigned int shangzhangG;// 上涨颜色
@property (nonatomic,assign) unsigned int shangzhangB;// 上涨颜色
@property (nonatomic,assign) unsigned int xiedieR;// 下跌颜色
@property (nonatomic,assign) unsigned int xiedieG;// 下跌颜色
@property (nonatomic,assign) unsigned int xiedieB;// 下跌颜色
//画线的变量
@property (nonatomic,retain) NSArray *points; // 多点连线数组
@property (nonatomic,assign) CGFloat lineWidth; // 线条宽度KLine
@property (nonatomic,assign) BOOL isK;// 是否是实体K线
@property (nonatomic,assign) BOOL isVol;// 是否是画成交量的实体
@property (nonatomic,assign) BOOL fenshijunxian;// 是否分时均线
@property (nonatomic,assign) BOOL fenshiVol;// 分时成交量
//画阴影线
@property (nonatomic,retain) NSArray *xianpoints; // 画线点的集合
- (void)setChartData:(NSString *)chartData;
- (NSString *)chartData;

//@property (nonatomic,retain) UILabel *fenshiPrince1;// 分时成交量

@end
