//
//  RKLineView.m
//  huitu
//
//  Created by dzh on 15/11/3.
//  Copyright (c) 2015年 dzh. All rights reserved.
//

#import "RKLineView.h"

@interface RKLineView()
{
    UIView *fenshibox; // fenshi线图控件
    UIView *fenshiVolBox; // fenshi线图控件
    BOOL   bisKl;
    //KLine UILabel
    UILabel *klineVolLabFull;
    UILabel *klineVolLabHalf;
    
    UILabel *klineVolTime1;
    UILabel *klineVolTime2;
    UILabel *klineVolTime3;
    
    UILabel *klinePrince1;
    UILabel *klinePrince2;
    UILabel *klinePrince3;
    UILabel *klinePrince4;
    UILabel *klinePrince5;
    //Fenshi UILabel
    UILabel *fenshiPrince1;
    UILabel *fenshiPrince2;
    UILabel *fenshiPrince3;
    UILabel *fenshiPrince4;
    UILabel *fenshiPrince5;
    
    UILabel *fenshizhangfu1;
    UILabel *fenshizhangfu2;
    UILabel *fenshizhangfu3;
    UILabel *fenshizhangfu4;
    UILabel *fenshizhangfu5;
    
    UILabel *fenshiLabelVol1;
    UILabel *fenshiLabelVol2;
    UILabel *fenshiLabelTime1;
    UILabel *fenshiLabelTime2;
    UILabel *fenshiLabelTime3;
    NSString *fenshiTime1;
    NSString *fenshiTime2;
    NSString *fenshiTime3;
}
@end

@implementation RKLineView

-(id)init{
    self = [super init];
    [self initSet];
    return self;
}

-(void)initSet
{
    //KLine
    self.klineVolMax = 0;
    self.klinepricemax = 0;
    self.klinepricemin = CGFLOAT_MAX;
    //fenshi
    self.fenshipricemax = 0;
    self.fenshipricemin = CGFLOAT_MAX;
    self.fenshizuoshou = 0;
    self.fenshiVolMax = 0;
    
    self.drawDataCount = 0;
    bisKl = false;
    
    self.backgroundColor = [UIColor clearColor];

    self.lineWidth = 1.0f;
    self.isK = NO;////
    self.isVol = NO;
    
    self.fenshijunxian = YES;
    self.fenshiVol = NO;
    self.fenshiCount = 0;
}
//设置数据源参数
- (void)setChartData:(NSString *)chartData {
    _chartData = chartData;
    [self setNeedsDisplay];
}

- (NSString *)chartData {
    return _chartData;
}

#pragma mark 在框框里画分时线
-(void)drawLine{
    NSArray *fenshiArray;
    self.drawDataCount = (int)[self.drawdata count];//获取画线数据的个数
    if([self.chartType  isEqual: @"min"]){
        fenshiArray = [self getFemShiZuoBiaoData];// 换算成实际分时坐标
        bisKl = false;
        self.isK = NO;
        //分时时间
        for(int cjlNum = 0;cjlNum<3;++cjlNum){
            float timeX = 0;
            float timeY = self.frame.size.height*2/3;
            float timeWid = self.frame.size.width*1/10;
            float timeHgt = 8;
            NSString *timeshijian = @"";
            if(cjlNum == 0){
                timeX = 0;
                timeshijian = fenshiTime1;
            }else if(cjlNum == 1){
                timeX = self.frame.size.width/2-10;
                timeshijian = fenshiTime2;
            }else if(cjlNum == 2){
                timeX = self.frame.size.width*9/10+10;
                timeshijian = fenshiTime3;
            }
            if(cjlNum == 0){
                if(nil == fenshiLabelTime1){
                    fenshiLabelTime1 = [[UILabel alloc]initWithFrame:CGRectMake(timeX,timeY,timeWid,timeHgt)];
                    fenshiLabelTime1.font = [UIFont systemFontOfSize:8];
                    [fenshiLabelTime1 setTextColor:[UIColor grayColor]];
                    [self addSubview:fenshiLabelTime1];
                }
                fenshiLabelTime1.text = [NSString stringWithFormat:@"%@",timeshijian];
            }
            if(cjlNum == 1){
                if(nil == fenshiLabelTime2){
                    fenshiLabelTime2 = [[UILabel alloc]initWithFrame:CGRectMake(timeX,timeY,timeWid,timeHgt)];
                    fenshiLabelTime2.font = [UIFont systemFontOfSize:8];
                    [fenshiLabelTime2 setTextColor:[UIColor grayColor]];
                    [self addSubview:fenshiLabelTime2];
                }
                fenshiLabelTime2.text = [NSString stringWithFormat:@"%@",timeshijian];
            }
            if(cjlNum == 2){
                if(nil == fenshiLabelTime3){
                    fenshiLabelTime3 = [[UILabel alloc]initWithFrame:CGRectMake(timeX,timeY,timeWid,timeHgt)];
                    fenshiLabelTime3.font = [UIFont systemFontOfSize:8];
                    [fenshiLabelTime3 setTextColor:[UIColor grayColor]];
                    [self addSubview:fenshiLabelTime3];
                }
                fenshiLabelTime3.text = [NSString stringWithFormat:@"%@",timeshijian];
            }
            
        }
        //画成交量的标签
        for(int cjlNum = 0;cjlNum<2;++cjlNum){
            float timeX = 0;
            float timeY = self.frame.size.height*2/3+self.frame.size.height/20;
            float timeWid = self.frame.size.width*1/10;
            float timeHgt = 8;
            int vol = 0;
            if(cjlNum == 0){
                timeY = self.frame.size.height*2/3+self.frame.size.height/20;
                vol = self.fenshiVolMax/1000;
            }else{
                timeY = self.frame.size.height*2/3+self.frame.size.height/20+self.frame.size.height/6;
                vol = self.fenshiVolMax/2000;
            }
            if(cjlNum == 0){
                if(fenshiLabelVol1 == nil){
                    fenshiLabelVol1 = [[UILabel alloc]initWithFrame:CGRectMake(timeX,timeY,timeWid,timeHgt)];
                    fenshiLabelVol1.font = [UIFont systemFontOfSize:8];
                    [fenshiLabelVol1 setTextColor:[UIColor grayColor]];
                    [self addSubview:fenshiLabelVol1];
                }
                if(self.fenshipricemin == CGFLOAT_MAX){
                    
                }else{
                    fenshiLabelVol1.text = [NSString stringWithFormat:@"%dK",vol];
                }
            }
            if(cjlNum == 1){
                if(fenshiLabelVol2 == nil){
                    fenshiLabelVol2 = [[UILabel alloc]initWithFrame:CGRectMake(timeX,timeY,timeWid,timeHgt)];
                    fenshiLabelVol2.font = [UIFont systemFontOfSize:8];
                    [fenshiLabelVol2 setTextColor:[UIColor grayColor]];
                    [self addSubview:fenshiLabelVol2];
                }
                if(self.fenshipricemin == CGFLOAT_MAX){
                    
                }else{
                    fenshiLabelVol2.text = [NSString stringWithFormat:@"%dK",vol];
                }
            }
            
        }
        //画K线价格的标签
        [self fenshiLabel];
        
    }else if([self.chartType  isEqual: @"kline"]){
        fenshiArray = [self getKLineZuoBiaoData];// 换算成实际分时坐标
        bisKl = true;
        self.isK = YES;
        self.lineWidth = (self.kLineWidth*3)/5;
        //画成交量的标签
        unsigned int volfull = 0;
        NSString *strUnit = @"";
        if(self.klineVolMax>1000*1000){
            volfull = (unsigned int)self.klineVolMax/(1000*1000);
            strUnit = @"M";
        }else{
            volfull = (unsigned int)self.klineVolMax/(1000);
            strUnit = @"K";
        }
        if(klineVolLabFull == nil){
            klineVolLabFull = [[UILabel alloc]initWithFrame:CGRectMake(0,self.frame.size.height*2/3+self.frame.size.height/20,
                                                                       self.frame.size.width*1/10,8)];
            klineVolLabFull.text = [NSString stringWithFormat:@"%u%@",volfull,strUnit];
            klineVolLabFull.font = [UIFont systemFontOfSize:8];
            [klineVolLabFull setTextColor:[UIColor grayColor]];
            [self addSubview:klineVolLabFull];
        }
        klineVolLabFull.text = [NSString stringWithFormat:@"%u%@",volfull,strUnit];//更新Label数值
        if(klineVolLabHalf == nil){
            klineVolLabHalf = [[UILabel alloc]initWithFrame:CGRectMake(0,self.frame.size.height*2/3+self.frame.size.height/20+self.frame.size.height/6,
                                                                       self.frame.size.width*1/10,8)];
            klineVolLabHalf.text = [NSString stringWithFormat:@"%u%@",volfull/2,strUnit];
            klineVolLabHalf.font = [UIFont systemFontOfSize:8];
            [klineVolLabHalf setTextColor:[UIColor grayColor]];
            [self addSubview:klineVolLabHalf];
        }
        klineVolLabHalf.text = [NSString stringWithFormat:@"%u%@",volfull/2,strUnit];//更新Label数值
        
        //画K线价格的标签
        float timeX = 0;
        float timeY = 0;
        float timeWid = self.frame.size.width*1/10;
        float timeHgt = 8;
        float prince = 0;
        if(klinePrince1 == nil){
            NSLog(@"klinePrince1 == nil");
            timeY = 0;
            prince = self.klinepricemax;
            klinePrince1 = [[UILabel alloc]initWithFrame:CGRectMake(timeX,timeY,timeWid,timeHgt)];
            klinePrince1.text = [NSString stringWithFormat:@"%.2f",prince];
            klinePrince1.font = [UIFont systemFontOfSize:8];
            [klinePrince1 setTextColor:[UIColor grayColor]];
            [self addSubview:klinePrince1];
        }
        prince = self.klinepricemax;
        klinePrince1.text = [NSString stringWithFormat:@"%.2f",prince];
        if(klinePrince2 == nil){
            timeY = ((self.frame.size.height*2/3)/4)*1;
            prince = self.klinepricemax - 1*(self.klinepricemax-self.klinepricemin)/4;
            klinePrince2 = [[UILabel alloc]initWithFrame:CGRectMake(timeX,timeY,timeWid,timeHgt)];
            klinePrince2.text = [NSString stringWithFormat:@"%.2f",prince];
            klinePrince2.font = [UIFont systemFontOfSize:8];
            [klinePrince2 setTextColor:[UIColor grayColor]];
            [self addSubview:klinePrince2];
        }
        prince = self.klinepricemax - 1*(self.klinepricemax-self.klinepricemin)/4;
        klinePrince2.text = [NSString stringWithFormat:@"%.2f",prince];
        if(klinePrince3 == nil){
            timeY = ((self.frame.size.height*2/3)/4)*2;
            prince = self.klinepricemax - 2*(self.klinepricemax-self.klinepricemin)/4;
            klinePrince3 = [[UILabel alloc]initWithFrame:CGRectMake(timeX,timeY,timeWid,timeHgt)];
            klinePrince3.text = [NSString stringWithFormat:@"%.2f",prince];
            klinePrince3.font = [UIFont systemFontOfSize:8];
            [klinePrince3 setTextColor:[UIColor grayColor]];
            [self addSubview:klinePrince3];
        }
        if(klinePrince4 == nil){
            timeY = ((self.frame.size.height*2/3)/4)*3;
            prince = self.klinepricemax - 3*(self.klinepricemax-self.klinepricemin)/4;
            klinePrince4 = [[UILabel alloc]initWithFrame:CGRectMake(timeX,timeY,timeWid,timeHgt)];
            klinePrince4.text = [NSString stringWithFormat:@"%.2f",prince];
            klinePrince4.font = [UIFont systemFontOfSize:8];
            [klinePrince4 setTextColor:[UIColor grayColor]];
            [self addSubview:klinePrince4];
        }
        prince = self.klinepricemax - 3*(self.klinepricemax-self.klinepricemin)/4;
        klinePrince4.text = [NSString stringWithFormat:@"%.2f",prince];
        if(klinePrince5 == nil){
            timeY = self.frame.size.height*2/3-8;
            prince = self.klinepricemin;
            klinePrince5 = [[UILabel alloc]initWithFrame:CGRectMake(timeX,timeY,timeWid,timeHgt)];
            klinePrince5.text = [NSString stringWithFormat:@"%.2f",prince];
            klinePrince5.font = [UIFont systemFontOfSize:8];
            [klinePrince5 setTextColor:[UIColor grayColor]];
            [self addSubview:klinePrince5];
        }
        prince = self.klinepricemin;
        klinePrince5.text = [NSString stringWithFormat:@"%.2f",prince];
    }
    self.points = fenshiArray;
}

-(void)fenshiLabel{
    for(int princeNum = 0;princeNum<5;++princeNum){
        //画K线价格的标签
        float timeX = 0,timeY = 0,timeHgt = 8,prince = 0;
        float timeWid = self.frame.size.width*1/10+10,zahngfuX = self.frame.size.width*9/10-10;
        if(self.fenshipricemin == CGFLOAT_MAX){ //考虑清盘时的情况{
            timeY = ((self.frame.size.height*2/3)/4)*princeNum;
            prince = self.fenshizuoshou*(1.1-princeNum*0.05);
        }else{
            if(self.fenshipricemax + self.fenshipricemin >= self.fenshizuoshou*2){
                timeY = ((self.frame.size.height*2/3)/4)*princeNum;
                prince = self.fenshipricemax - princeNum*(self.fenshipricemax-self.fenshizuoshou)/2;
            }else{
                float maxP = self.fenshizuoshou+self.fenshizuoshou-self.fenshipricemin;
                timeY = ((self.frame.size.height*2/3)/4)*princeNum;
                prince = maxP - princeNum*(self.fenshizuoshou-self.fenshipricemin)/2;
            }
        }
        if(princeNum == 4){
            timeY = timeY - 8;
        }
        if(0 == princeNum){
            if(fenshiPrince1 == nil){
                fenshiPrince1 = [[UILabel alloc]initWithFrame:CGRectMake(timeX,timeY,timeWid,timeHgt)];
                if(princeNum <2){
                    [fenshiPrince1 setTextColor:[UIColor colorWithRed:(CGFloat)self.shangzhangR/255.0f green:(CGFloat)self.shangzhangG/255.0f blue:(CGFloat)self.shangzhangB/255.0f alpha:self.alpha]];
                }else if(princeNum > 2){
                    [fenshiPrince1 setTextColor:[UIColor colorWithRed:(CGFloat)self.xiedieR/255.0f green:(CGFloat)self.xiedieG/255.0f blue:(CGFloat)self.xiedieB/255.0f alpha:self.alpha]];
                }else{
                    [fenshiPrince1 setTextColor:[UIColor grayColor]];
                }
                fenshiPrince1.font = [UIFont systemFontOfSize:8];
                [self addSubview:fenshiPrince1];
            }
            fenshiPrince1.text = [NSString stringWithFormat:@"%.2f",prince];
        
            if(fenshizhangfu1 == nil){
                fenshizhangfu1 = [[UILabel alloc]initWithFrame:CGRectMake(zahngfuX,timeY,timeWid,timeHgt)];
                fenshizhangfu1.textAlignment = NSTextAlignmentRight;
                if(princeNum <2){
                    [fenshizhangfu1 setTextColor:[UIColor colorWithRed:(CGFloat)self.shangzhangR/255.0f green:(CGFloat)self.shangzhangG/255.0f blue:(CGFloat)self.shangzhangB/255.0f alpha:self.alpha]];
                }else if(princeNum > 2){
                    [fenshizhangfu1 setTextColor:[UIColor colorWithRed:(CGFloat)self.xiedieR/255.0f green:(CGFloat)self.xiedieG/255.0f blue:(CGFloat)self.xiedieB/255.0f alpha:self.alpha]];
                }else{
                    [fenshizhangfu1 setTextColor:[UIColor grayColor]];
                }
                fenshizhangfu1.font = [UIFont systemFontOfSize:8];
                [self addSubview:fenshizhangfu1];
            }
            if(0 == self.fenshizuoshou){
                fenshizhangfu1.text = [NSString stringWithFormat:@"%.2f%%",10.00];
            }else{
                if (prince-self.fenshizuoshou < 0) {
                    fenshizhangfu1.text = [NSString stringWithFormat:@"-%.2f%%",((self.fenshizuoshou-prince)/self.fenshizuoshou)*100];
                }else{
                    fenshizhangfu1.text = [NSString stringWithFormat:@"%.2f%%",((prince-self.fenshizuoshou)/self.fenshizuoshou)*100];
                }
            }
        }
        if(1 == princeNum){
            if(fenshiPrince2 == nil){
                fenshiPrince2 = [[UILabel alloc]initWithFrame:CGRectMake(timeX,timeY,timeWid,timeHgt)];
                if(princeNum <2){
                    [fenshiPrince2 setTextColor:[UIColor colorWithRed:(CGFloat)self.shangzhangR/255.0f green:(CGFloat)self.shangzhangG/255.0f blue:(CGFloat)self.shangzhangB/255.0f alpha:self.alpha]];
                }else if(princeNum > 2){
                    [fenshiPrince2 setTextColor:[UIColor colorWithRed:(CGFloat)self.xiedieR/255.0f green:(CGFloat)self.xiedieG/255.0f blue:(CGFloat)self.xiedieB/255.0f alpha:self.alpha]];
                }else{
                    [fenshiPrince2 setTextColor:[UIColor grayColor]];
                }
                fenshiPrince2.font = [UIFont systemFontOfSize:8];
                [self addSubview:fenshiPrince2];
            }
            fenshiPrince2.text = [NSString stringWithFormat:@"%.2f",prince];
            
            if(fenshizhangfu2 == nil){
                fenshizhangfu2 = [[UILabel alloc]initWithFrame:CGRectMake(zahngfuX,timeY,timeWid,timeHgt)];
                fenshizhangfu2.textAlignment = NSTextAlignmentRight;
                if(princeNum <2){
                    [fenshizhangfu2 setTextColor:[UIColor colorWithRed:(CGFloat)self.shangzhangR/255.0f green:(CGFloat)self.shangzhangG/255.0f blue:(CGFloat)self.shangzhangB/255.0f alpha:self.alpha]];
                }else if(princeNum > 2){
                    [fenshizhangfu2 setTextColor:[UIColor colorWithRed:(CGFloat)self.xiedieR/255.0f green:(CGFloat)self.xiedieG/255.0f blue:(CGFloat)self.xiedieB/255.0f alpha:self.alpha]];
                }else{
                    [fenshizhangfu2 setTextColor:[UIColor grayColor]];
                }
                fenshizhangfu2.font = [UIFont systemFontOfSize:8];
                [self addSubview:fenshizhangfu2];
            }
            if(0 == self.fenshizuoshou){
                fenshizhangfu2.text = [NSString stringWithFormat:@"%.2f%%",5.00];
            }else{
                if (prince-self.fenshizuoshou < 0) {
                    fenshizhangfu2.text = [NSString stringWithFormat:@"-%.2f%%",((self.fenshizuoshou-prince)/self.fenshizuoshou)*100];
                }else{
                    fenshizhangfu2.text = [NSString stringWithFormat:@"%.2f%%",((prince-self.fenshizuoshou)/self.fenshizuoshou)*100];
                }
            }
        }
        if(2 == princeNum){
            if(fenshiPrince3 == nil){
                fenshiPrince3 = [[UILabel alloc]initWithFrame:CGRectMake(timeX,timeY,timeWid,timeHgt)];
                if(princeNum <2){
                    [fenshiPrince3 setTextColor:[UIColor colorWithRed:(CGFloat)self.shangzhangR/255.0f green:(CGFloat)self.shangzhangG/255.0f blue:(CGFloat)self.shangzhangB/255.0f alpha:self.alpha]];
                }else if(princeNum > 2){
                    [fenshiPrince3 setTextColor:[UIColor colorWithRed:(CGFloat)self.xiedieR/255.0f green:(CGFloat)self.xiedieG/255.0f blue:(CGFloat)self.xiedieB/255.0f alpha:self.alpha]];
                }else{
                    [fenshiPrince3 setTextColor:[UIColor grayColor]];
                }
                fenshiPrince3.font = [UIFont systemFontOfSize:8];
                [self addSubview:fenshiPrince3];
            }
            fenshiPrince3.text = [NSString stringWithFormat:@"%.2f",prince];
            
            if(fenshizhangfu3 == nil){
                fenshizhangfu3 = [[UILabel alloc]initWithFrame:CGRectMake(zahngfuX,timeY,timeWid,timeHgt)];
                fenshizhangfu3.textAlignment = NSTextAlignmentRight;
                if(princeNum <2){
                    [fenshizhangfu3 setTextColor:[UIColor colorWithRed:(CGFloat)self.shangzhangR/255.0f green:(CGFloat)self.shangzhangG/255.0f blue:(CGFloat)self.shangzhangB/255.0f alpha:self.alpha]];
                }else if(princeNum > 2){
                    [fenshizhangfu3 setTextColor:[UIColor colorWithRed:(CGFloat)self.xiedieR/255.0f green:(CGFloat)self.xiedieG/255.0f blue:(CGFloat)self.xiedieB/255.0f alpha:self.alpha]];
                }else{
                    [fenshizhangfu3 setTextColor:[UIColor grayColor]];
                }
                fenshizhangfu3.font = [UIFont systemFontOfSize:8];
                [self addSubview:fenshizhangfu3];
            }
            if(0 == self.fenshizuoshou){
                fenshizhangfu3.text = [NSString stringWithFormat:@"%.2f%%",0.00];
            }else{
                if (prince-self.fenshizuoshou < 0) {
                    fenshizhangfu3.text = [NSString stringWithFormat:@"-%.2f%%",((self.fenshizuoshou-prince)/self.fenshizuoshou)*100];
                }else{
                    fenshizhangfu3.text = [NSString stringWithFormat:@"%.2f%%",((prince-self.fenshizuoshou)/self.fenshizuoshou)*100];
                }
            }
        }
        if(3 == princeNum){
            if(fenshiPrince4 == nil){
                fenshiPrince4 = [[UILabel alloc]initWithFrame:CGRectMake(timeX,timeY,timeWid,timeHgt)];
                if(princeNum <2){
                    [fenshiPrince4 setTextColor:[UIColor colorWithRed:(CGFloat)self.shangzhangR/255.0f green:(CGFloat)self.shangzhangG/255.0f blue:(CGFloat)self.shangzhangB/255.0f alpha:self.alpha]];
                }else if(princeNum > 2){
                    [fenshiPrince4 setTextColor:[UIColor colorWithRed:(CGFloat)self.xiedieR/255.0f green:(CGFloat)self.xiedieG/255.0f blue:(CGFloat)self.xiedieB/255.0f alpha:self.alpha]];
                }else{
                    [fenshiPrince4 setTextColor:[UIColor grayColor]];
                }
                fenshiPrince4.font = [UIFont systemFontOfSize:8];
                [self addSubview:fenshiPrince4];
            }
            fenshiPrince4.text = [NSString stringWithFormat:@"%.2f",prince];
            
            if(fenshizhangfu4 == nil){
                fenshizhangfu4 = [[UILabel alloc]initWithFrame:CGRectMake(zahngfuX,timeY,timeWid,timeHgt)];
                fenshizhangfu4.textAlignment = NSTextAlignmentRight;
                if(princeNum <2){
                    [fenshizhangfu4 setTextColor:[UIColor colorWithRed:(CGFloat)self.shangzhangR/255.0f green:(CGFloat)self.shangzhangG/255.0f blue:(CGFloat)self.shangzhangB/255.0f alpha:self.alpha]];
                }else if(princeNum > 2){
                    [fenshizhangfu4 setTextColor:[UIColor colorWithRed:(CGFloat)self.xiedieR/255.0f green:(CGFloat)self.xiedieG/255.0f blue:(CGFloat)self.xiedieB/255.0f alpha:self.alpha]];
                }else{
                    [fenshizhangfu4 setTextColor:[UIColor grayColor]];
                }
                fenshizhangfu4.font = [UIFont systemFontOfSize:8];
                [self addSubview:fenshizhangfu4];
            }
            if(0 == self.fenshizuoshou){
                fenshizhangfu4.text = [NSString stringWithFormat:@"-%.2f%%",5.00];
            }else{
                if (prince-self.fenshizuoshou < 0) {
                    fenshizhangfu4.text = [NSString stringWithFormat:@"-%.2f%%",((self.fenshizuoshou-prince)/self.fenshizuoshou)*100];
                }else{
                    fenshizhangfu4.text = [NSString stringWithFormat:@"%.2f%%",((prince-self.fenshizuoshou)/self.fenshizuoshou)*100];
                }
            }
        }
        if(4 == princeNum){
            if(fenshiPrince5 == nil){
                fenshiPrince5 = [[UILabel alloc]initWithFrame:CGRectMake(timeX,timeY,timeWid,timeHgt)];
                if(princeNum <2){
                    [fenshiPrince5 setTextColor:[UIColor colorWithRed:(CGFloat)self.shangzhangR/255.0f green:(CGFloat)self.shangzhangG/255.0f blue:(CGFloat)self.shangzhangB/255.0f alpha:self.alpha]];
                }else if(princeNum > 2){
                    [fenshiPrince5 setTextColor:[UIColor colorWithRed:(CGFloat)self.xiedieR/255.0f green:(CGFloat)self.xiedieG/255.0f blue:(CGFloat)self.xiedieB/255.0f alpha:self.alpha]];
                }else{
                    [fenshiPrince5 setTextColor:[UIColor grayColor]];
                }
                fenshiPrince5.font = [UIFont systemFontOfSize:8];
                [self addSubview:fenshiPrince5];
            }
            fenshiPrince5.text = [NSString stringWithFormat:@"%.2f",prince];
            
            if(fenshizhangfu5 == nil){
                fenshizhangfu5 = [[UILabel alloc]initWithFrame:CGRectMake(zahngfuX,timeY,timeWid,timeHgt)];
                fenshizhangfu5.textAlignment = NSTextAlignmentRight;
                if(princeNum <2){
                    [fenshizhangfu5 setTextColor:[UIColor colorWithRed:(CGFloat)self.shangzhangR/255.0f green:(CGFloat)self.shangzhangG/255.0f blue:(CGFloat)self.shangzhangB/255.0f alpha:self.alpha]];
                }else if(princeNum > 2){
                    [fenshizhangfu5 setTextColor:[UIColor colorWithRed:(CGFloat)self.xiedieR/255.0f green:(CGFloat)self.xiedieG/255.0f blue:(CGFloat)self.xiedieB/255.0f alpha:self.alpha]];
                }else{
                    [fenshizhangfu5 setTextColor:[UIColor grayColor]];
                }
                fenshizhangfu5.font = [UIFont systemFontOfSize:8];
                [self addSubview:fenshizhangfu5];
            }
            if(0 == self.fenshizuoshou){
                fenshizhangfu5.text = [NSString stringWithFormat:@"-%.2f%%",10.00];
            }else{
                if (prince-self.fenshizuoshou < 0) {
                    fenshizhangfu5.text = [NSString stringWithFormat:@"-%.2f%%",((self.fenshizuoshou-prince)/self.fenshizuoshou)*100];
                }else{
                    fenshizhangfu5.text = [NSString stringWithFormat:@"%.2f%%",((prince-self.fenshizuoshou)/self.fenshizuoshou)*100];
                }
            }
        }
        
    
    
    }
    
}

-(NSArray*)getKLineZuoBiaoData{
    NSMutableArray *tempArray = [[NSMutableArray alloc] init];
    
    self.kLineWidth = self.frame.size.width/[self.drawdata count];
    CGFloat PointStartX = self.kLineWidth/2; // 起始点坐标
    int showTimeLableNum = self.drawDataCount/2;//K线中显示时间的个数
    for (int datanum = 0;datanum<self.drawDataCount;++datanum) {
        CGFloat heightvalue = [[self.drawdata[datanum] objectAtIndex:3] floatValue];// 得到最高价
        CGFloat lowvalue = [[self.drawdata[datanum] objectAtIndex:4] floatValue];// 得到最低价
        CGFloat openvalue = [[self.drawdata[datanum] objectAtIndex:1] floatValue];// 得到开盘价
        CGFloat closevalue = [[self.drawdata[datanum] objectAtIndex:2] floatValue];// 得到收盘价
        CGFloat yHeight = self.klinepricemax - self.klinepricemin ; // y的价格高度
        CGFloat yViewHeight = self.frame.size.height*2/3 ;// y的实际像素高度
        
        //价格换算成实际的坐标
        CGFloat heightPointY = yViewHeight * (1-(heightvalue - self.klinepricemin) / yHeight);
        CGPoint heightPoint =  CGPointMake(PointStartX, heightPointY); // 最高价换算为实际坐标值
        CGFloat lowPointY = yViewHeight * (1-(lowvalue - self.klinepricemin) / yHeight);
        CGPoint lowPoint =  CGPointMake(PointStartX, lowPointY); // 最低价换算为实际坐标值
        CGFloat openPointY = yViewHeight * (1-(openvalue - self.klinepricemin) / yHeight);
        CGPoint openPoint =  CGPointMake(PointStartX, openPointY); // 开盘价换算为实际坐标值
        CGFloat closePointY = yViewHeight * (1-(closevalue - self.klinepricemin) / yHeight);
        CGPoint closePoint =  CGPointMake(PointStartX, closePointY); // 收盘价换算为实际坐标值
        
        //成交量转换
        CGFloat yBottomViewHeight = self.frame.size.height/3- self.frame.size.height/20;
        CGFloat yBaseViewHeight = self.frame.size.height*2/3 + self.frame.size.height/20;
        
        CGFloat chengjiaoliangValue = [[self.drawdata[datanum] objectAtIndex:5] floatValue];// 得到成交量
        CGFloat chengjiaoliangValuePointYD = yBottomViewHeight * (1-(chengjiaoliangValue)/self.klineVolMax)+ yBaseViewHeight;
        CGPoint chengjiaoliangValuePointD =  CGPointMake(PointStartX, chengjiaoliangValuePointYD);
        
        CGPoint chengjiaoliangValuePointH =  CGPointMake(PointStartX, self.frame.size.height);
        // 实际坐标组装为数组
        NSArray *currentArray = [[NSArray alloc] initWithObjects:
                                 NSStringFromCGPoint(heightPoint),
                                 NSStringFromCGPoint(lowPoint),
                                 NSStringFromCGPoint(openPoint),
                                 NSStringFromCGPoint(closePoint),
                                 [self.drawdata[datanum] objectAtIndex:0], // 保存日期时间
                                 NSStringFromCGPoint(chengjiaoliangValuePointD),
                                 NSStringFromCGPoint(chengjiaoliangValuePointH), // 保存成交量
                                 nil];
        [tempArray addObject:currentArray]; // 把坐标添加进新数组
        currentArray = Nil;
        
        float timeY = self.frame.size.height*2/3;
        float timeWid = 80;
        float timeHgt = 8;
        if(datanum == 0){
            if(klineVolTime1 == nil){
                klineVolTime1 = [[UILabel alloc]initWithFrame:CGRectMake(0,timeY,timeWid,timeHgt)];
                klineVolTime1.text = [NSString stringWithFormat:@"%@",[self.drawdata[datanum] objectAtIndex:0]];
                klineVolTime1.font = [UIFont systemFontOfSize:8];
                [klineVolTime1 setTextColor:[UIColor grayColor]];
                [self addSubview:klineVolTime1];
            }
            klineVolTime1.text = [NSString stringWithFormat:@"%@",[self.drawdata[datanum] objectAtIndex:0]];
        }
        if(datanum == showTimeLableNum){
            if(klineVolTime2 == nil){
                klineVolTime2 = [[UILabel alloc]initWithFrame:CGRectMake(PointStartX - 20,timeY,timeWid,timeHgt)];
                klineVolTime2.text = [NSString stringWithFormat:@"%@",[self.drawdata[datanum] objectAtIndex:0]];
                klineVolTime2.font = [UIFont systemFontOfSize:8];
                [klineVolTime2 setTextColor:[UIColor grayColor]];
                [self addSubview:klineVolTime2];
            }
            klineVolTime2.text = [NSString stringWithFormat:@"%@",[self.drawdata[datanum] objectAtIndex:0]];
        }
        if(datanum == self.drawDataCount-1){
            if(klineVolTime3 == nil){
                klineVolTime3 = [[UILabel alloc]initWithFrame:CGRectMake(self.frame.size.width*9/10-10,timeY,timeWid,timeHgt)];
                klineVolTime3.text = [NSString stringWithFormat:@"%@",[self.drawdata[datanum] objectAtIndex:0]];
                klineVolTime3.font = [UIFont systemFontOfSize:8];
                [klineVolTime3 setTextColor:[UIColor grayColor]];
                [self addSubview:klineVolTime3];
            }
            klineVolTime3.text = [NSString stringWithFormat:@"%@",[self.drawdata[datanum] objectAtIndex:0]];
        }
        PointStartX += self.kLineWidth; // 生成下一个点的x轴
    }
    return tempArray;
}



#pragma mark 把股市数据换算成分时价格和成交量坐标
-(NSArray*)getFemShiZuoBiaoData{
    NSMutableArray *fenshishuju = [[NSMutableArray alloc] init];
    
    NSMutableArray *fenshijiage = [[NSMutableArray alloc] init];
    NSMutableArray *fenshiCJL = [[NSMutableArray alloc] init];
    NSMutableArray *fenshiJunJia = [[NSMutableArray alloc] init];
    
    CGFloat PointStartX = 0.0f; // 起始点坐标
    CGFloat huatuheight = 0.0f;
    CGFloat currentPointY = 0.0f;
    if(self.fenshipricemax + self.fenshipricemin >= 2*self.fenshizuoshou){
        huatuheight = ((self.fenshipricemax - self.fenshipricemin)*self.frame.size.height*2/3)/((self.fenshipricemax - self.fenshizuoshou)*2);
    }else{
        huatuheight = ((self.fenshipricemax - self.fenshipricemin)*self.frame.size.height*2/3)/((self.fenshizuoshou - self.fenshipricemin)*2);
    }
    CGFloat lastPrince = 0.0f;
    for (int i = 0;i < [self.drawdata count];++i) {
        if([self.drawdata[i] count]>1){
            // 成交价转换成实际坐标
            CGFloat chengjiaojia = [[self.drawdata[i] objectAtIndex:1] floatValue];// 得到成交价
            if(self.fenshipricemax + self.fenshipricemin >= 2*self.fenshizuoshou){
                currentPointY = huatuheight - ((chengjiaojia - self.fenshipricemin) / (self.fenshipricemax - self.fenshipricemin) * huatuheight);
            }else{
                currentPointY = self.frame.size.height*2/3 - ((chengjiaojia - self.fenshipricemin) / ((self.fenshizuoshou - self.fenshipricemin)*2))*self.frame.size.height*2/3;
            }
            CGPoint chengjiaojiaPoint =  CGPointMake(PointStartX, currentPointY); // 换算到当前的坐标值
            [fenshijiage addObject:NSStringFromCGPoint(chengjiaojiaPoint)]; // 把坐标添加进新数组
            CGFloat chengjiaojunjia = [[self.drawdata[i] objectAtIndex:4] floatValue];// 得到均价价格
            // 换算成实际的坐标
            if(self.fenshipricemax + self.fenshipricemin >= 2*self.fenshizuoshou){
                currentPointY = huatuheight - ((chengjiaojunjia - self.fenshipricemin) / (self.fenshipricemax - self.fenshipricemin) * huatuheight);
            }else{
                currentPointY = self.frame.size.height*2/3 - ((chengjiaojunjia - self.fenshipricemin) / ((self.fenshizuoshou - self.fenshipricemin)*2))*self.frame.size.height*2/3;
            }
            CGPoint chengjiaojunjiaPoint =  CGPointMake(PointStartX, currentPointY); // 换算到当前的坐标值
            [fenshiJunJia addObject:NSStringFromCGPoint(chengjiaojunjiaPoint)]; // 把坐标添加进新数组
            
            //成交量转换成实际坐标
            CGFloat fenshiVolYHeight = self.frame.size.height/3-self.frame.size.height/20;
            CGFloat fenshiVolBaseHeight = self.frame.size.height*2/3+self.frame.size.height/20;
            
            CGFloat chengjiaoliangValue = [[self.drawdata[i] objectAtIndex:2] floatValue];// 获取分时成交量
            
            CGFloat chengjiaoliangValuePointYD = fenshiVolYHeight * (1-(chengjiaoliangValue)/self.fenshiVolMax) + fenshiVolBaseHeight;
            CGPoint chengjiaoliangValuePointD =  CGPointMake(PointStartX, chengjiaoliangValuePointYD);
            CGPoint chengjiaoliangValuePointH =  CGPointMake(PointStartX, self.frame.size.height);
            // 实际坐标组装为数组
            NSString *volLineRed = @"true";
            if(chengjiaojia >= lastPrince){
                volLineRed = @"true";
            }else{
                volLineRed = @"false";
            }
            lastPrince = chengjiaojia;
            NSArray *currentArray = [[NSArray alloc] initWithObjects:
                                     NSStringFromCGPoint(chengjiaoliangValuePointD),
                                     NSStringFromCGPoint(chengjiaoliangValuePointH), // 保存成交量
                                     volLineRed,
                                     nil];
            [fenshiCJL addObject:currentArray]; // 把坐标添加进新数组
            PointStartX += self.frame.size.width/(self.fenshiCount - 1); // 生成下一个点的x轴
        }
        if(i == 0){
            fenshiTime1 = [self.drawdata[i] objectAtIndex:0];
        }
        if(i == self.fenshiCount/2){
            fenshiTime2 = [self.drawdata[i] objectAtIndex:0];
        }
        if(i == self.fenshiCount-1){
            fenshiTime3 = [self.drawdata[i] objectAtIndex:0];
        }
    }
    [fenshishuju addObject:fenshijiage]; // 下标0代表，价格数组；
    [fenshishuju addObject:fenshiJunJia]; // 下标1代表，均价数组；
    [fenshishuju addObject:fenshiCJL]; // 下标2代表，成交量数组；
    return fenshishuju;
}

//获取实时数据
-(void)getshishidata{
    NSError *error;
    NSData *data =[self.chartData dataUsingEncoding:NSUTF8StringEncoding];
    NSDictionary *drawLineDataDic = [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingMutableLeaves error:&error];
    //获取图表类型
    self.chartType = [drawLineDataDic objectForKey:@"chartType"];
    if([self.chartType  isEqual: @"min"]){
        [self getFSData:drawLineDataDic];
    }else if([self.chartType  isEqual: @"kline"]){
        [self getKLData:drawLineDataDic];
    }
    NSDictionary *color = [drawLineDataDic objectForKey:@"color"];
    NSString *shangzhangColour = [color objectForKey:@"ShangZhangYanSe"];
    [self getColorData:shangzhangColour bshangzhang:true];
    NSString *xiedieColour = [color objectForKey:@"XiaDieYanSe"];
    [self getColorData:xiedieColour bshangzhang:false];
}

-(void)getFSData:(NSDictionary *)drawLineDataDic{
    //获取昨收
    NSDictionary *zuoshou = [drawLineDataDic objectForKey:@"stkInfo"];
    self.fenshizuoshou = [[zuoshou objectForKey:@"ZuoShou"] floatValue];
    //获取实际数据
    NSDictionary *weatherInfo = [drawLineDataDic objectForKey:@"chartData"];
    self.fenshiCount = (int)[weatherInfo count];
    
    NSEnumerator *enumerator = [weatherInfo objectEnumerator];
    
    NSMutableArray *temshuju = [[NSMutableArray alloc] init];
    for(NSObject *obj in enumerator){
        
        NSMutableArray *temfield = [[NSMutableArray alloc] init];
        int nnu = [[(NSDictionary *)obj objectForKey:@"ShiJian"] intValue];
        NSDate *d = [NSDate dateWithTimeIntervalSince1970:nnu];
        NSDateFormatter *formatter1 = [[NSDateFormatter alloc]init];
        [formatter1 setDateFormat:@"HH:mm"];
        NSString *showtimeNew = [formatter1 stringFromDate:d];
    
        [temfield addObject:showtimeNew];
        if((NSNull *)[(NSDictionary *)obj objectForKey:@"ChengJiaoJia"] != [NSNull null]){
            //jiege
            [temfield addObject:[(NSDictionary *)obj objectForKey:@"ChengJiaoJia"]];
            
            if([[(NSDictionary *)obj objectForKey:@"ChengJiaoJia"] floatValue] > self.fenshipricemax){
                self.fenshipricemax = [[(NSDictionary *)obj objectForKey:@"ChengJiaoJia"] floatValue];
            }
            if([[(NSDictionary *)obj objectForKey:@"ChengJiaoJia"] floatValue] < self.fenshipricemin){
                self.fenshipricemin = [[(NSDictionary *)obj objectForKey:@"ChengJiaoJia"] floatValue];
            }
            //chengjiaoliang
            [temfield addObject:[(NSDictionary *)obj objectForKey:@"ChengJiaoLiang"]];
            if([[(NSDictionary *)obj objectForKey:@"ChengJiaoLiang"] floatValue]>self.fenshiVolMax )
            {
                self.fenshiVolMax = [[(NSDictionary *)obj objectForKey:@"ChengJiaoLiang"] floatValue];
            }
            
            //chengjiaoe
            [temfield addObject:[(NSDictionary *)obj objectForKey:@"ChengJiaoE"]];
            //junjia
            [temfield addObject:[(NSDictionary *)obj objectForKey:@"JunJia"]];
        }
        [temshuju addObject:temfield];
    }
    self.drawdata =temshuju;
}

//////get Kline data
-(void)getKLData:(NSDictionary *)drawLineDataDic{
    //获取实际数据
    NSDictionary *weatherInfo = [drawLineDataDic objectForKey:@"chartData"];
    
    NSEnumerator *enumerator = [weatherInfo objectEnumerator];
    
    NSMutableArray *temshuju = [[NSMutableArray alloc] init];
    for(NSObject *obj in enumerator){
        
        NSMutableArray *temfield = [[NSMutableArray alloc] init];
        if((NSNull *)[(NSDictionary *)obj objectForKey:@"ChengJiaoJia"] != [NSNull null]){
            //time
            int nnu = [[(NSDictionary *)obj objectForKey:@"ShiJian"] intValue];
            NSDate *d = [NSDate dateWithTimeIntervalSince1970:nnu];
            NSDateFormatter *formatter1 = [[NSDateFormatter alloc]init];
            [formatter1 setDateFormat:@"YYYY-MM-dd"];
            NSString *showtimeNew = [formatter1 stringFromDate:d];
            [temfield addObject:showtimeNew]; //0 shijian
            //jiege
            [temfield addObject:[(NSDictionary *)obj objectForKey:@"KaiPanJia"]];//1 kaipanjia
            [temfield addObject:[(NSDictionary *)obj objectForKey:@"ShouPanJia"]];//2 shoupanjia
            
            [temfield addObject:[(NSDictionary *)obj objectForKey:@"ZuiGaoJia"]];//3 zuigaojia
            [temfield addObject:[(NSDictionary *)obj objectForKey:@"ZuiDiJia"]];//4 zuidijia
            
            if([[(NSDictionary *)obj objectForKey:@"ZuiGaoJia"] floatValue] > self.klinepricemax){
                self.klinepricemax = [[(NSDictionary *)obj objectForKey:@"ZuiGaoJia"] floatValue];
            }
            if([[(NSDictionary *)obj objectForKey:@"ZuiDiJia"] floatValue] < self.klinepricemin){
                self.klinepricemin = [[(NSDictionary *)obj objectForKey:@"ZuiDiJia"] floatValue];
            }
            //chengjiaoliang
            [temfield addObject:[(NSDictionary *)obj objectForKey:@"ChengJiaoLiang"]]; //5 chengjiaoliang
            if([[(NSDictionary *)obj objectForKey:@"ChengJiaoLiang"] floatValue]>self.klineVolMax )
            {
                self.klineVolMax = [[(NSDictionary *)obj objectForKey:@"ChengJiaoLiang"] floatValue];
            }
            
            [temshuju addObject:temfield];
        }
    }
    self.drawdata =temshuju;
}



//系统自定义的方法，在View加载时，和执行setNeedsDisplay方法时会调用;
-(void)drawRect:(CGRect)rect
{
    [self getshishidata];//获取实时数据
    [self drawLine];
    
    CGContextRef context = UIGraphicsGetCurrentContext();// 获取绘图上下文
    if (self.isK) {
        // 画k线
        for (NSArray *item in self.points) {
            CGPoint heightPoint,lowPoint,openPoint,closePoint,chengjiaoliangDPoint,chengjiaoliangHPoint;
            heightPoint = CGPointFromString([item objectAtIndex:0]);
            lowPoint = CGPointFromString([item objectAtIndex:1]);
            openPoint = CGPointFromString([item objectAtIndex:2]);
            closePoint = CGPointFromString([item objectAtIndex:3]);
            
            chengjiaoliangDPoint = CGPointFromString([item objectAtIndex:5]);
            chengjiaoliangHPoint = CGPointFromString([item objectAtIndex:6]);
            
            [self drawKWithContext:context height:heightPoint Low:lowPoint open:openPoint close:closePoint cjlD:chengjiaoliangDPoint cjlH:chengjiaoliangHPoint width:self.lineWidth];
        }
    }else{
        NSArray *pricearray = self.points[0];
        self.fenshijunxian = NO;
        self.fenshiVol = NO;
        [self drawLineWithContext:context dravArray:pricearray];
        
        NSArray *junpricearray = self.points[1];
        self.fenshijunxian = YES;
        self.fenshiVol = NO;
        [self drawLineWithContext:context dravArray:junpricearray];
        
        NSArray *Volearray = self.points[2];
        self.fenshijunxian = NO;
        self.fenshiVol = YES;
        [self drawLineWithContext:context dravArray:Volearray];
    }
    //画线
    self.xianpoints = [self drawxian];
//    NSLog(@"self.xianpoints = %lu",(unsigned long)[self.xianpoints count]);
    for (NSArray *item in self.xianpoints) {
//        NSLog(@"item = %lu",(unsigned long)[item count]);
        CGPoint startPoint,endPoint;
        startPoint = CGPointFromString([item objectAtIndex:0]);
        endPoint = CGPointFromString([item objectAtIndex:1]);
        
        [self drawXianContext:context StartPoint:startPoint EndPoint:endPoint];
    }
    
    //KLine
    self.klineVolMax = 0;
    self.klinepricemax = 0;
    self.klinepricemin = CGFLOAT_MAX;
    //fenshi
    self.fenshipricemax = 0;
    self.fenshipricemin = CGFLOAT_MAX;
    self.fenshizuoshou = 0;
    self.fenshiVolMax = 0;
}

#pragma mark 画阴影线
//#pragma mark 画一根K线
-(void)drawXianContext:(CGContextRef)context StartPoint:(CGPoint)startPoint EndPoint:(CGPoint)endPoint{
    CGContextSetShouldAntialias(context, NO);

    CGContextSetRGBStrokeColor(context, (CGFloat)20/255.0f, (CGFloat)20/255.0f, (CGFloat)20/255.0f,0.1);
    
    // 首先画一个垂直的线包含上影线和下影线
    CGContextSetLineWidth(context,0.3); // 上下阴影线的宽度
    
    const CGPoint points[] = {startPoint,endPoint};
    CGContextStrokeLineSegments(context, points, 2);  // 绘制线段（默认不绘制端点）
}

#pragma mark 画连接线
-(void)drawLineWithContext:(CGContextRef)context dravArray:(NSArray *)points{
    CGContextSetLineWidth(context,0.5);
    //NSLog(@"self.lineWidth:%f",self.lineWidth);
    CGContextSetShouldAntialias(context, YES);
    if(self.fenshijunxian){//#fcaf17
        CGContextSetRGBStrokeColor(context, (CGFloat)252/255.0f, (CGFloat)175/255.0f, (CGFloat)23/255.0f, self.alpha);
        CGContextSetLineWidth(context,1);
    }else{//#33a3dc
        CGContextSetRGBStrokeColor(context, (CGFloat)51/255.0f, (CGFloat)163/255.0f, (CGFloat)220/255.0f, self.alpha);
        CGContextSetLineWidth(context,2);
    }
    if (!self.fenshiVol) {
        // 定义多个个点 画多点连线
        for (id item in points) {
            CGPoint currentPoint = CGPointFromString(item);
            if ((int)currentPoint.y<=(int)self.frame.size.height && currentPoint.y>=0) {
                if ([points indexOfObject:item]==0) {
                    CGContextMoveToPoint(context, currentPoint.x, currentPoint.y);
                    continue;
                }
                CGContextAddLineToPoint(context, currentPoint.x, currentPoint.y);
                CGContextStrokePath(context); //开始画线
                if ([points indexOfObject:item]<points.count) {
                    CGContextMoveToPoint(context, currentPoint.x, currentPoint.y);
                }
            }
        }
    }else{
        for (NSArray *item in points) {
            CGPoint chengjiaoliangDPoint,chengjiaoliangHPoint;
            chengjiaoliangDPoint = CGPointFromString([item objectAtIndex:0]);
            chengjiaoliangHPoint = CGPointFromString([item objectAtIndex:1]);
            
            //画成交量
            NSString *rgbstr = [item objectAtIndex:2];
            if([rgbstr  isEqual: @"true"]){
                CGContextSetRGBStrokeColor(context, (CGFloat)self.shangzhangR/255.0f, (CGFloat)self.shangzhangG/255.0f, (CGFloat)self.shangzhangB/255.0f, self.alpha);
            }else if([rgbstr  isEqual: @"false"]){
                CGContextSetRGBStrokeColor(context, (CGFloat)self.xiedieR/255.0f, (CGFloat)self.xiedieG/255.0f, (CGFloat)self.xiedieB/255.0f, self.alpha);
            }
            
            CGContextSetLineWidth(context, 0.5); // 改变线的宽度
            const CGPoint cjlpoints[] = {chengjiaoliangDPoint,chengjiaoliangHPoint};
            CGContextStrokeLineSegments(context, cjlpoints, 2);  // 绘制线段（默认不绘制端点）
        }
        
    }
}

//#pragma mark 画一根K线
-(void)drawKWithContext:(CGContextRef)context height:(CGPoint)heightPoint Low:(CGPoint)lowPoint open:(CGPoint)openPoint close:(CGPoint)closePoint cjlD:(CGPoint)cjlPointD cjlH:(CGPoint)cjlPointH width:(CGFloat)width{
    CGContextSetShouldAntialias(context, NO);
    // 首先判断是绿的还是红的，根据开盘价和收盘价的坐标来计算
    //注意这里的坐标轴是反的
    if (openPoint.y<closePoint.y) {// 设置默认红色
        CGContextSetRGBStrokeColor(context, (CGFloat)self.xiedieR/255.0f, (CGFloat)self.xiedieG/255.0f, (CGFloat)self.xiedieB/255.0f, self.alpha);
    }else{// 如果开盘价坐标在收盘价坐标上方 则为绿色 即空
        
        CGContextSetRGBStrokeColor(context, (CGFloat)self.shangzhangR/255.0f, (CGFloat)self.shangzhangG/255.0f, (CGFloat)self.shangzhangB/255.0f, self.alpha);
    }
    // 设置颜色
    
    // 首先画一个垂直的线包含上影线和下影线
    CGContextSetLineWidth(context, width/6); // 上下阴影线的宽度
    
    const CGPoint points[] = {heightPoint,lowPoint};
    CGContextStrokeLineSegments(context, points, 2);  // 绘制线段（默认不绘制端点）
    
    // 再画中间的实体
    CGContextSetLineWidth(context, width); // 改变线的宽度
    CGFloat halfWidth = 0;//width/2;
    // 纠正实体的中心点为当前坐标
    if(openPoint.y == closePoint.y){
        closePoint.y = openPoint.y+0.5;
    }
    openPoint = CGPointMake(openPoint.x-halfWidth, openPoint.y);
    closePoint = CGPointMake(closePoint.x-halfWidth, closePoint.y);
    const CGPoint point[] = {openPoint,closePoint};
    CGContextStrokeLineSegments(context, point, 2);  // 绘制线段（默认不绘制端点）
    
    //画成交量
    CGContextSetLineWidth(context, width); // 改变线的宽度
    const CGPoint cjlpoints[] = {cjlPointD,cjlPointH};
    CGContextStrokeLineSegments(context, cjlpoints, 2);  // 绘制线段（默认不绘制端点）
    
}
-(void)getColorData:(NSString *)color bshangzhang:(BOOL)Bzhang{
    NSString *cString = [[color stringByTrimmingCharactersInSet:[NSCharacterSet whitespaceAndNewlineCharacterSet]] uppercaseString];
    
    // String should be 6 or 8 characters
    if ([cString length] < 6) {
        return;
    }
    
    // strip 0X if it appears
    if ([cString hasPrefix:@"0X"])
        cString = [cString substringFromIndex:2];
    if ([cString hasPrefix:@"#"])
        cString = [cString substringFromIndex:1];
    if ([cString length] != 6)
        NSLog(@"color Length not 6");
    //        return [UIColor clearColor];
    
    // Separate into r, g, b substrings
    NSRange range;
    range.location = 0;
    range.length = 2;
    
    //r
    NSString *rString = [cString substringWithRange:range];
    
    //g
    range.location = 2;
    NSString *gString = [cString substringWithRange:range];
    
    //b
    range.location = 4;
    NSString *bString = [cString substringWithRange:range];
    
    // Scan values
    unsigned int r, g, b;
    [[NSScanner scannerWithString:rString] scanHexInt:&r];
    [[NSScanner scannerWithString:gString] scanHexInt:&g];
    [[NSScanner scannerWithString:bString] scanHexInt:&b];
    if(Bzhang){
        self.shangzhangR = r;
        self.shangzhangG = g;
        self.shangzhangB = b;
    }else{
        self.xiedieR = r;
        self.xiedieG = g;
        self.xiedieB = b;
    }
    //    NSLog(@"shangzhangR:%d,shangzhangG:%d,shangzhangB:%d",self.shangzhangR,self.shangzhangG,self.shangzhangB);
    //    NSLog(@"xiedieR:%d,xiedieG:%d,xiedieB:%d",self.xiedieR,self.xiedieG,self.xiedieB);
}

-(NSArray*)drawxian{
    NSMutableArray *shujuxian = [[NSMutableArray alloc] init];

    CGFloat PointStartX = 0.0f; // 起始点坐标
    CGFloat PointY = 0.0f;
    CGFloat PointEndX = self.frame.size.width; // 起始点坐标
    CGFloat PointEndY = 0.0f;
    for(int num = 0;num<5;num++){
        if(num == 0){
            PointY = 0;
        }else if(num == 4){
            PointY = self.frame.size.height*2/3;
        }else if(num == 2){
            PointY = (self.frame.size.height*2/3)/2;
        }else{
            PointY = ((self.frame.size.height*2/3)/4)*num;
        }
        CGPoint startxian =  CGPointMake(PointStartX, PointY);
        CGPoint endxian =  CGPointMake(PointEndX,PointY);
        NSArray *currentArray = [[NSArray alloc] initWithObjects:
                                 NSStringFromCGPoint(startxian),
                                 NSStringFromCGPoint(endxian), //
                                 nil];
        [shujuxian addObject:currentArray]; //
    }
    for(int num = 0;num<2;num++){
        if(num == 0){
            PointY = self.frame.size.height*2/3 + self.frame.size.height/20;
        }else{
            PointY = self.frame.size.height - (self.frame.size.height/3 - self.frame.size.height/20)/2;
        }
        CGPoint startxian =  CGPointMake(PointStartX, PointY);
        CGPoint endxian =  CGPointMake(PointEndX,PointY);
        NSArray *currentArray = [[NSArray alloc] initWithObjects:
                                 NSStringFromCGPoint(startxian),
                                 NSStringFromCGPoint(endxian), //
                                 nil];
        [shujuxian addObject:currentArray]; //
    }
    for(int num = 0;num<2;num++){
        PointStartX = self.frame.size.width/2;
        if(num == 0){
            PointY = 0;
            PointEndY = self.frame.size.height*2/3;
        }else{
            PointY = self.frame.size.height*2/3 + self.frame.size.height/20;
            PointEndY = self.frame.size.height;
        }
        CGPoint startxian =  CGPointMake(PointStartX, PointY);
        CGPoint endxian =  CGPointMake(PointStartX,PointEndY);
        NSArray *currentArray = [[NSArray alloc] initWithObjects:
                                 NSStringFromCGPoint(startxian),
                                 NSStringFromCGPoint(endxian), //
                                 nil];
        [shujuxian addObject:currentArray]; //
    }
    return shujuxian;
}

@end