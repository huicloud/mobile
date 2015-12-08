

#import "RCTViewManager.h"


#import "RCTConvert.h"
#import "RCTBridge.h"
#import "RCTUtils.h"
#import "RKLineView.h"
#import "RCTBridgeModule.h"


@interface RCTDzhChartManager : RCTViewManager

@end

@implementation RCTDzhChartManager

RCT_EXPORT_MODULE()

-(UIView *)view
{
    return [[RKLineView alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(chartData,NSString);

@end