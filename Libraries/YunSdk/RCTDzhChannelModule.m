/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "RCTDzhChannelModule.h"

#import "RCTBridge.h"
#import "RCTEventDispatcher.h"
#import "RCTSRDzhChannel.h"
#import "RCTSparseArray.h"
#import "RCTUtils.h"

@implementation RCTSRDzhChannel (React)

- (NSNumber *)reactTag
{
  return objc_getAssociatedObject(self, _cmd);
}

- (void)setReactTag:(NSNumber *)reactTag
{
  objc_setAssociatedObject(self, @selector(reactTag), reactTag, OBJC_ASSOCIATION_COPY_NONATOMIC);
}

@end

@interface RCTDzhChannelModule () <RCTSRDzhChannelDelegate>

@end

@implementation RCTDzhChannelModule
{
    RCTSparseArray *_sockets;
}

RCT_EXPORT_MODULE()

@synthesize bridge = _bridge;

- (instancetype)init
{
  if ((self = [super init])) {
    _sockets = [RCTSparseArray new];
  }
  return self;
}

- (void)dealloc
{
  for (RCTSRDzhChannel *socket in _sockets.allObjects) {
    socket.delegate = nil;
    [socket close];
  }
}

RCT_EXPORT_METHOD(connect:(NSURL *)URL socketID:(nonnull NSNumber *)socketID)
{
  RCTSRDzhChannel *webSocket = [[RCTSRDzhChannel alloc] initWithURL:URL];
  webSocket.delegate = self;
  webSocket.reactTag = socketID;
  _sockets[socketID] = webSocket;
  [webSocket open];
}

RCT_EXPORT_METHOD(send:(NSString *)message socketID:(nonnull NSNumber *)socketID)
{
  [_sockets[socketID] send:message];
}

RCT_EXPORT_METHOD(close:(nonnull NSNumber *)socketID)
{
  [_sockets[socketID] close];
  _sockets[socketID] = nil;
}

#pragma mark - RCTSRDzhChannelDelegate methods

- (void)webSocket:(RCTSRDzhChannel *)webSocket didReceiveMessage:(id)message
{
  [_bridge.eventDispatcher sendDeviceEventWithName:@"dzhChannelMessage" body:@{
    @"data": message,
    @"id": webSocket.reactTag
  }];
}

- (void)webSocketDidOpen:(RCTSRDzhChannel *)webSocket
{
  [_bridge.eventDispatcher sendDeviceEventWithName:@"dzhChannelOpen" body:@{
    @"id": webSocket.reactTag
  }];
}

- (void)webSocket:(RCTSRDzhChannel *)webSocket didFailWithError:(NSError *)error
{
  [_bridge.eventDispatcher sendDeviceEventWithName:@"dzhChannelFailed" body:@{
    @"message":error.localizedDescription,
    @"id": webSocket.reactTag
  }];
}

- (void)webSocket:(RCTSRDzhChannel *)webSocket didCloseWithCode:(NSInteger)code
           reason:(NSString *)reason wasClean:(BOOL)wasClean
{
  [_bridge.eventDispatcher sendDeviceEventWithName:@"dzhChannelClosed" body:@{
    @"code": @(code),
    @"reason": RCTNullIfNil(reason),
    @"clean": @(wasClean),
    @"id": webSocket.reactTag
  }];
}

@end
