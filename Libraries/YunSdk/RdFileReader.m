#import "RdFileReader.h"

#import "RCTBridge.h"

#import "com/dzhyun/sdk/ZLibUtils.h"

#include "IOSPrimitiveArray.h"

@implementation RdFileReader

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(readFromUrl:(NSString *)url successCallback:(RCTResponseSenderBlock)successCallback)
{
  NSMutableURLRequest *request = [[NSMutableURLRequest alloc] init];
  [request setHTTPMethod:@"GET"];
  [request setURL:[NSURL URLWithString:url]];

  NSError *error = [[NSError alloc] init];
  NSHTTPURLResponse *responseCode = nil;

  NSData *oResponseData = [NSURLConnection sendSynchronousRequest:request returningResponse:&responseCode error:&error];

  if([responseCode statusCode] != 200){
    NSLog(@"Error getting %@, HTTP status code %li", url, (long)[responseCode statusCode]);
  }

  IOSByteArray *bytes = [IOSByteArray newArrayWithBytes:oResponseData.bytes count:oResponseData.length];
  NSString *result = ComDzhyunSdkZLibUtils_decompressToGBKStringWithByteArray_(bytes);
  successCallback(@[result]);
}

@end