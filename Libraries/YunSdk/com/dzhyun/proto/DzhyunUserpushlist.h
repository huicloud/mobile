// Generated by the protocol buffer compiler.  DO NOT EDIT!
// source: dzhyun.userpushlist.proto

#import "J2ObjC_header.h"
#import "com/google/protobuf/GeneratedMessage.h"
#import "com/google/protobuf/MessageOrBuilder.h"
#import "com/google/protobuf/ProtocolMessageEnum.h"
#import "java/lang/Enum.h"

@class ComDzhyunProtoDzhyunUserpushlist_UserPushItem;
@class ComDzhyunProtoDzhyunUserpushlist_UserPushItemUpd_Builder;
@class ComDzhyunProtoDzhyunUserpushlist_UserPushItem_Builder;
@class ComDzhyunProtoDzhyunUserpushlist_UserPushList_Builder;
@class ComGoogleProtobufDescriptors_Descriptor;
@class ComGoogleProtobufExtensionRegistry;
@protocol JavaLangIterable;
@protocol JavaUtilList;

@interface ComDzhyunProtoDzhyunUserpushlist : NSObject

+ (void)registerAllExtensionsWithComGoogleProtobufExtensionRegistry:(ComGoogleProtobufExtensionRegistry *)extensionRegistry;

@end

FOUNDATION_EXPORT void ComDzhyunProtoDzhyunUserpushlist_registerAllExtensionsWithComGoogleProtobufExtensionRegistry_(ComGoogleProtobufExtensionRegistry *extensionRegistry);

J2OBJC_EMPTY_STATIC_INIT(ComDzhyunProtoDzhyunUserpushlist)

J2OBJC_TYPE_LITERAL_HEADER(ComDzhyunProtoDzhyunUserpushlist)

@protocol ComDzhyunProtoDzhyunUserpushlist_UserPushListOrBuilder < ComGoogleProtobufMessageOrBuilder >

- (int)getPushListCount;
- (id<JavaUtilList>)getPushListList;
- (ComDzhyunProtoDzhyunUserpushlist_UserPushItem *)getPushListWithInt:(int)index;

@end

J2OBJC_EMPTY_STATIC_INIT(ComDzhyunProtoDzhyunUserpushlist_UserPushListOrBuilder)

J2OBJC_TYPE_LITERAL_HEADER(ComDzhyunProtoDzhyunUserpushlist_UserPushListOrBuilder)

@interface ComDzhyunProtoDzhyunUserpushlist_UserPushList : ComGoogleProtobufGeneratedMessage<ComDzhyunProtoDzhyunUserpushlist_UserPushListOrBuilder>

+ (ComDzhyunProtoDzhyunUserpushlist_UserPushList *)getDefaultInstance;
- (ComDzhyunProtoDzhyunUserpushlist_UserPushList *)getDefaultInstanceForType;
+ (ComDzhyunProtoDzhyunUserpushlist_UserPushList_Builder *)newBuilder OBJC_METHOD_FAMILY_NONE;
- (ComDzhyunProtoDzhyunUserpushlist_UserPushList_Builder *)newBuilderForType OBJC_METHOD_FAMILY_NONE;
- (ComDzhyunProtoDzhyunUserpushlist_UserPushList_Builder *)toBuilder;
+ (ComDzhyunProtoDzhyunUserpushlist_UserPushList_Builder *)newBuilderWithComDzhyunProtoDzhyunUserpushlist_UserPushList:(ComDzhyunProtoDzhyunUserpushlist_UserPushList *)message OBJC_METHOD_FAMILY_NONE;
+ (ComGoogleProtobufDescriptors_Descriptor *)getDescriptor;
+ (ComDzhyunProtoDzhyunUserpushlist_UserPushList *)parseFromWithByteArray:(IOSByteArray *)bytes;
+ (ComDzhyunProtoDzhyunUserpushlist_UserPushList *)parseFromWithByteArray:(IOSByteArray *)bytes withComGoogleProtobufExtensionRegistryLite:(ComGoogleProtobufExtensionRegistryLite *)registry;
+ (ComDzhyunProtoDzhyunUserpushlist_UserPushList *)parseFromNSData:(NSData *)data;
+ (ComDzhyunProtoDzhyunUserpushlist_UserPushList *)parseFromNSData:(NSData *)data registry:(ComGoogleProtobufExtensionRegistryLite *)registry;
+ (ComDzhyunProtoDzhyunUserpushlist_UserPushList *)parseFromWithJavaIoInputStream:(JavaIoInputStream *)input;
+ (ComDzhyunProtoDzhyunUserpushlist_UserPushList *)parseFromWithJavaIoInputStream:(JavaIoInputStream *)bytes withComGoogleProtobufExtensionRegistryLite:(ComGoogleProtobufExtensionRegistryLite *)registry;
+ (ComDzhyunProtoDzhyunUserpushlist_UserPushList *)parseDelimitedFromWithJavaIoInputStream:(JavaIoInputStream *)input;
+ (ComDzhyunProtoDzhyunUserpushlist_UserPushList *)parseDelimitedFromWithJavaIoInputStream:(JavaIoInputStream *)bytes withComGoogleProtobufExtensionRegistryLite:(ComGoogleProtobufExtensionRegistryLite *)registry;

#define ComDzhyunProtoDzhyunUserpushlist_UserPushList_PUSHLIST_FIELD_NUMBER 1

@end

FOUNDATION_EXPORT ComDzhyunProtoDzhyunUserpushlist_UserPushList *ComDzhyunProtoDzhyunUserpushlist_UserPushList_getDefaultInstance();
FOUNDATION_EXPORT ComDzhyunProtoDzhyunUserpushlist_UserPushList_Builder *ComDzhyunProtoDzhyunUserpushlist_UserPushList_newBuilder();
FOUNDATION_EXPORT ComDzhyunProtoDzhyunUserpushlist_UserPushList_Builder *ComDzhyunProtoDzhyunUserpushlist_UserPushList_newBuilderWithComDzhyunProtoDzhyunUserpushlist_UserPushList_(ComDzhyunProtoDzhyunUserpushlist_UserPushList *message);
FOUNDATION_EXPORT ComGoogleProtobufDescriptors_Descriptor *ComDzhyunProtoDzhyunUserpushlist_UserPushList_getDescriptor();
FOUNDATION_EXPORT ComDzhyunProtoDzhyunUserpushlist_UserPushList *ComDzhyunProtoDzhyunUserpushlist_UserPushList_parseFromWithByteArray_withComGoogleProtobufExtensionRegistryLite_(IOSByteArray *bytes, ComGoogleProtobufExtensionRegistryLite *registry);
CGP_ALWAYS_INLINE inline ComDzhyunProtoDzhyunUserpushlist_UserPushList *ComDzhyunProtoDzhyunUserpushlist_UserPushList_parseFromWithByteArray_(IOSByteArray *bytes) {
  return ComDzhyunProtoDzhyunUserpushlist_UserPushList_parseFromWithByteArray_withComGoogleProtobufExtensionRegistryLite_(bytes, nil);
}
FOUNDATION_EXPORT ComDzhyunProtoDzhyunUserpushlist_UserPushList *ComDzhyunProtoDzhyunUserpushlist_UserPushList_parseFromWithJavaIoInputStream_withComGoogleProtobufExtensionRegistryLite_(JavaIoInputStream *input, ComGoogleProtobufExtensionRegistryLite *registry);
CGP_ALWAYS_INLINE inline ComDzhyunProtoDzhyunUserpushlist_UserPushList *ComDzhyunProtoDzhyunUserpushlist_UserPushList_parseFromWithJavaIoInputStream_(JavaIoInputStream *input) {
  return ComDzhyunProtoDzhyunUserpushlist_UserPushList_parseFromWithJavaIoInputStream_withComGoogleProtobufExtensionRegistryLite_(input, nil);
}
FOUNDATION_EXPORT ComDzhyunProtoDzhyunUserpushlist_UserPushList *ComDzhyunProtoDzhyunUserpushlist_UserPushList_parseDelimitedFromWithJavaIoInputStream_withComGoogleProtobufExtensionRegistryLite_(JavaIoInputStream *input, ComGoogleProtobufExtensionRegistryLite *registry);
CGP_ALWAYS_INLINE inline ComDzhyunProtoDzhyunUserpushlist_UserPushList *ComDzhyunProtoDzhyunUserpushlist_UserPushList_parseDelimitedFromWithJavaIoInputStream_(JavaIoInputStream *input) {
  return ComDzhyunProtoDzhyunUserpushlist_UserPushList_parseDelimitedFromWithJavaIoInputStream_withComGoogleProtobufExtensionRegistryLite_(input, nil);
}

J2OBJC_STATIC_INIT(ComDzhyunProtoDzhyunUserpushlist_UserPushList)

J2OBJC_TYPE_LITERAL_HEADER(ComDzhyunProtoDzhyunUserpushlist_UserPushList)

FOUNDATION_EXPORT ComGoogleProtobufDescriptors_Descriptor *ComDzhyunProtoDzhyunUserpushlist_UserPushList_descriptor_;

@interface ComDzhyunProtoDzhyunUserpushlist_UserPushList_Builder : ComGoogleProtobufGeneratedMessage_Builder<ComDzhyunProtoDzhyunUserpushlist_UserPushListOrBuilder>

- (ComDzhyunProtoDzhyunUserpushlist_UserPushList *)getDefaultInstanceForType;
- (ComDzhyunProtoDzhyunUserpushlist_UserPushList_Builder *)mergeFromWithComDzhyunProtoDzhyunUserpushlist_UserPushList:(ComDzhyunProtoDzhyunUserpushlist_UserPushList *)message;
- (ComDzhyunProtoDzhyunUserpushlist_UserPushList_Builder *)mergeFromWithComGoogleProtobufMessage:(id<ComGoogleProtobufMessage>)message;
- (ComDzhyunProtoDzhyunUserpushlist_UserPushList *)build;
- (ComDzhyunProtoDzhyunUserpushlist_UserPushList *)buildPartial;
+ (ComGoogleProtobufDescriptors_Descriptor *)getDescriptor;
- (ComDzhyunProtoDzhyunUserpushlist_UserPushList_Builder*)setPushListWithInt:(int)index
    withComDzhyunProtoDzhyunUserpushlist_UserPushItem:(ComDzhyunProtoDzhyunUserpushlist_UserPushItem *)value;
- (ComDzhyunProtoDzhyunUserpushlist_UserPushList_Builder*)addPushListWithComDzhyunProtoDzhyunUserpushlist_UserPushItem:
    (ComDzhyunProtoDzhyunUserpushlist_UserPushItem *)value;
- (ComDzhyunProtoDzhyunUserpushlist_UserPushList_Builder*)addAllPushListWithJavaLangIterable:
    (id<JavaLangIterable>)values;
- (ComDzhyunProtoDzhyunUserpushlist_UserPushList_Builder*)clearPushList;
- (ComDzhyunProtoDzhyunUserpushlist_UserPushList_Builder*)
    addPushListWithComDzhyunProtoDzhyunUserpushlist_UserPushItem_Builder:
    (ComDzhyunProtoDzhyunUserpushlist_UserPushItem_Builder *)value;

@end

FOUNDATION_EXPORT ComGoogleProtobufDescriptors_Descriptor *ComDzhyunProtoDzhyunUserpushlist_UserPushList_Builder_getDescriptor();

J2OBJC_EMPTY_STATIC_INIT(ComDzhyunProtoDzhyunUserpushlist_UserPushList_Builder)

J2OBJC_TYPE_LITERAL_HEADER(ComDzhyunProtoDzhyunUserpushlist_UserPushList_Builder)

@protocol ComDzhyunProtoDzhyunUserpushlist_UserPushItemOrBuilder < ComGoogleProtobufMessageOrBuilder >

- (BOOL)hasTag;
- (NSString *)getTag;

- (BOOL)hasName;
- (NSString *)getName;

- (BOOL)hasValue;
- (NSString *)getValue;

@end

J2OBJC_EMPTY_STATIC_INIT(ComDzhyunProtoDzhyunUserpushlist_UserPushItemOrBuilder)

J2OBJC_TYPE_LITERAL_HEADER(ComDzhyunProtoDzhyunUserpushlist_UserPushItemOrBuilder)

@interface ComDzhyunProtoDzhyunUserpushlist_UserPushItem : ComGoogleProtobufGeneratedMessage<ComDzhyunProtoDzhyunUserpushlist_UserPushItemOrBuilder>

+ (ComDzhyunProtoDzhyunUserpushlist_UserPushItem *)getDefaultInstance;
- (ComDzhyunProtoDzhyunUserpushlist_UserPushItem *)getDefaultInstanceForType;
+ (ComDzhyunProtoDzhyunUserpushlist_UserPushItem_Builder *)newBuilder OBJC_METHOD_FAMILY_NONE;
- (ComDzhyunProtoDzhyunUserpushlist_UserPushItem_Builder *)newBuilderForType OBJC_METHOD_FAMILY_NONE;
- (ComDzhyunProtoDzhyunUserpushlist_UserPushItem_Builder *)toBuilder;
+ (ComDzhyunProtoDzhyunUserpushlist_UserPushItem_Builder *)newBuilderWithComDzhyunProtoDzhyunUserpushlist_UserPushItem:(ComDzhyunProtoDzhyunUserpushlist_UserPushItem *)message OBJC_METHOD_FAMILY_NONE;
+ (ComGoogleProtobufDescriptors_Descriptor *)getDescriptor;
+ (ComDzhyunProtoDzhyunUserpushlist_UserPushItem *)parseFromWithByteArray:(IOSByteArray *)bytes;
+ (ComDzhyunProtoDzhyunUserpushlist_UserPushItem *)parseFromWithByteArray:(IOSByteArray *)bytes withComGoogleProtobufExtensionRegistryLite:(ComGoogleProtobufExtensionRegistryLite *)registry;
+ (ComDzhyunProtoDzhyunUserpushlist_UserPushItem *)parseFromNSData:(NSData *)data;
+ (ComDzhyunProtoDzhyunUserpushlist_UserPushItem *)parseFromNSData:(NSData *)data registry:(ComGoogleProtobufExtensionRegistryLite *)registry;
+ (ComDzhyunProtoDzhyunUserpushlist_UserPushItem *)parseFromWithJavaIoInputStream:(JavaIoInputStream *)input;
+ (ComDzhyunProtoDzhyunUserpushlist_UserPushItem *)parseFromWithJavaIoInputStream:(JavaIoInputStream *)bytes withComGoogleProtobufExtensionRegistryLite:(ComGoogleProtobufExtensionRegistryLite *)registry;
+ (ComDzhyunProtoDzhyunUserpushlist_UserPushItem *)parseDelimitedFromWithJavaIoInputStream:(JavaIoInputStream *)input;
+ (ComDzhyunProtoDzhyunUserpushlist_UserPushItem *)parseDelimitedFromWithJavaIoInputStream:(JavaIoInputStream *)bytes withComGoogleProtobufExtensionRegistryLite:(ComGoogleProtobufExtensionRegistryLite *)registry;

#define ComDzhyunProtoDzhyunUserpushlist_UserPushItem_TAG_FIELD_NUMBER 1
#define ComDzhyunProtoDzhyunUserpushlist_UserPushItem_NAME_FIELD_NUMBER 2
#define ComDzhyunProtoDzhyunUserpushlist_UserPushItem_VALUE_FIELD_NUMBER 3

@end

FOUNDATION_EXPORT ComDzhyunProtoDzhyunUserpushlist_UserPushItem *ComDzhyunProtoDzhyunUserpushlist_UserPushItem_getDefaultInstance();
FOUNDATION_EXPORT ComDzhyunProtoDzhyunUserpushlist_UserPushItem_Builder *ComDzhyunProtoDzhyunUserpushlist_UserPushItem_newBuilder();
FOUNDATION_EXPORT ComDzhyunProtoDzhyunUserpushlist_UserPushItem_Builder *ComDzhyunProtoDzhyunUserpushlist_UserPushItem_newBuilderWithComDzhyunProtoDzhyunUserpushlist_UserPushItem_(ComDzhyunProtoDzhyunUserpushlist_UserPushItem *message);
FOUNDATION_EXPORT ComGoogleProtobufDescriptors_Descriptor *ComDzhyunProtoDzhyunUserpushlist_UserPushItem_getDescriptor();
FOUNDATION_EXPORT ComDzhyunProtoDzhyunUserpushlist_UserPushItem *ComDzhyunProtoDzhyunUserpushlist_UserPushItem_parseFromWithByteArray_withComGoogleProtobufExtensionRegistryLite_(IOSByteArray *bytes, ComGoogleProtobufExtensionRegistryLite *registry);
CGP_ALWAYS_INLINE inline ComDzhyunProtoDzhyunUserpushlist_UserPushItem *ComDzhyunProtoDzhyunUserpushlist_UserPushItem_parseFromWithByteArray_(IOSByteArray *bytes) {
  return ComDzhyunProtoDzhyunUserpushlist_UserPushItem_parseFromWithByteArray_withComGoogleProtobufExtensionRegistryLite_(bytes, nil);
}
FOUNDATION_EXPORT ComDzhyunProtoDzhyunUserpushlist_UserPushItem *ComDzhyunProtoDzhyunUserpushlist_UserPushItem_parseFromWithJavaIoInputStream_withComGoogleProtobufExtensionRegistryLite_(JavaIoInputStream *input, ComGoogleProtobufExtensionRegistryLite *registry);
CGP_ALWAYS_INLINE inline ComDzhyunProtoDzhyunUserpushlist_UserPushItem *ComDzhyunProtoDzhyunUserpushlist_UserPushItem_parseFromWithJavaIoInputStream_(JavaIoInputStream *input) {
  return ComDzhyunProtoDzhyunUserpushlist_UserPushItem_parseFromWithJavaIoInputStream_withComGoogleProtobufExtensionRegistryLite_(input, nil);
}
FOUNDATION_EXPORT ComDzhyunProtoDzhyunUserpushlist_UserPushItem *ComDzhyunProtoDzhyunUserpushlist_UserPushItem_parseDelimitedFromWithJavaIoInputStream_withComGoogleProtobufExtensionRegistryLite_(JavaIoInputStream *input, ComGoogleProtobufExtensionRegistryLite *registry);
CGP_ALWAYS_INLINE inline ComDzhyunProtoDzhyunUserpushlist_UserPushItem *ComDzhyunProtoDzhyunUserpushlist_UserPushItem_parseDelimitedFromWithJavaIoInputStream_(JavaIoInputStream *input) {
  return ComDzhyunProtoDzhyunUserpushlist_UserPushItem_parseDelimitedFromWithJavaIoInputStream_withComGoogleProtobufExtensionRegistryLite_(input, nil);
}

J2OBJC_STATIC_INIT(ComDzhyunProtoDzhyunUserpushlist_UserPushItem)

J2OBJC_TYPE_LITERAL_HEADER(ComDzhyunProtoDzhyunUserpushlist_UserPushItem)

FOUNDATION_EXPORT ComGoogleProtobufDescriptors_Descriptor *ComDzhyunProtoDzhyunUserpushlist_UserPushItem_descriptor_;

@interface ComDzhyunProtoDzhyunUserpushlist_UserPushItem_Builder : ComGoogleProtobufGeneratedMessage_Builder<ComDzhyunProtoDzhyunUserpushlist_UserPushItemOrBuilder>

- (ComDzhyunProtoDzhyunUserpushlist_UserPushItem *)getDefaultInstanceForType;
- (ComDzhyunProtoDzhyunUserpushlist_UserPushItem_Builder *)mergeFromWithComDzhyunProtoDzhyunUserpushlist_UserPushItem:(ComDzhyunProtoDzhyunUserpushlist_UserPushItem *)message;
- (ComDzhyunProtoDzhyunUserpushlist_UserPushItem_Builder *)mergeFromWithComGoogleProtobufMessage:(id<ComGoogleProtobufMessage>)message;
- (ComDzhyunProtoDzhyunUserpushlist_UserPushItem *)build;
- (ComDzhyunProtoDzhyunUserpushlist_UserPushItem *)buildPartial;
+ (ComGoogleProtobufDescriptors_Descriptor *)getDescriptor;

- (ComDzhyunProtoDzhyunUserpushlist_UserPushItem_Builder *)setTagWithNSString:
    (NSString *)value;
- (ComDzhyunProtoDzhyunUserpushlist_UserPushItem_Builder *)clearTag;

- (ComDzhyunProtoDzhyunUserpushlist_UserPushItem_Builder *)setNameWithNSString:
    (NSString *)value;
- (ComDzhyunProtoDzhyunUserpushlist_UserPushItem_Builder *)clearName;

- (ComDzhyunProtoDzhyunUserpushlist_UserPushItem_Builder *)setValueWithNSString:
    (NSString *)value;
- (ComDzhyunProtoDzhyunUserpushlist_UserPushItem_Builder *)clearValue;

@end

FOUNDATION_EXPORT ComGoogleProtobufDescriptors_Descriptor *ComDzhyunProtoDzhyunUserpushlist_UserPushItem_Builder_getDescriptor();

J2OBJC_EMPTY_STATIC_INIT(ComDzhyunProtoDzhyunUserpushlist_UserPushItem_Builder)

J2OBJC_TYPE_LITERAL_HEADER(ComDzhyunProtoDzhyunUserpushlist_UserPushItem_Builder)

@protocol ComDzhyunProtoDzhyunUserpushlist_UserPushItemUpdOrBuilder < ComGoogleProtobufMessageOrBuilder >

- (BOOL)hasResultCode;
- (int)getResultCode;

- (BOOL)hasResultMsg;
- (NSString *)getResultMsg;

@end

J2OBJC_EMPTY_STATIC_INIT(ComDzhyunProtoDzhyunUserpushlist_UserPushItemUpdOrBuilder)

J2OBJC_TYPE_LITERAL_HEADER(ComDzhyunProtoDzhyunUserpushlist_UserPushItemUpdOrBuilder)

@interface ComDzhyunProtoDzhyunUserpushlist_UserPushItemUpd : ComGoogleProtobufGeneratedMessage<ComDzhyunProtoDzhyunUserpushlist_UserPushItemUpdOrBuilder>

+ (ComDzhyunProtoDzhyunUserpushlist_UserPushItemUpd *)getDefaultInstance;
- (ComDzhyunProtoDzhyunUserpushlist_UserPushItemUpd *)getDefaultInstanceForType;
+ (ComDzhyunProtoDzhyunUserpushlist_UserPushItemUpd_Builder *)newBuilder OBJC_METHOD_FAMILY_NONE;
- (ComDzhyunProtoDzhyunUserpushlist_UserPushItemUpd_Builder *)newBuilderForType OBJC_METHOD_FAMILY_NONE;
- (ComDzhyunProtoDzhyunUserpushlist_UserPushItemUpd_Builder *)toBuilder;
+ (ComDzhyunProtoDzhyunUserpushlist_UserPushItemUpd_Builder *)newBuilderWithComDzhyunProtoDzhyunUserpushlist_UserPushItemUpd:(ComDzhyunProtoDzhyunUserpushlist_UserPushItemUpd *)message OBJC_METHOD_FAMILY_NONE;
+ (ComGoogleProtobufDescriptors_Descriptor *)getDescriptor;
+ (ComDzhyunProtoDzhyunUserpushlist_UserPushItemUpd *)parseFromWithByteArray:(IOSByteArray *)bytes;
+ (ComDzhyunProtoDzhyunUserpushlist_UserPushItemUpd *)parseFromWithByteArray:(IOSByteArray *)bytes withComGoogleProtobufExtensionRegistryLite:(ComGoogleProtobufExtensionRegistryLite *)registry;
+ (ComDzhyunProtoDzhyunUserpushlist_UserPushItemUpd *)parseFromNSData:(NSData *)data;
+ (ComDzhyunProtoDzhyunUserpushlist_UserPushItemUpd *)parseFromNSData:(NSData *)data registry:(ComGoogleProtobufExtensionRegistryLite *)registry;
+ (ComDzhyunProtoDzhyunUserpushlist_UserPushItemUpd *)parseFromWithJavaIoInputStream:(JavaIoInputStream *)input;
+ (ComDzhyunProtoDzhyunUserpushlist_UserPushItemUpd *)parseFromWithJavaIoInputStream:(JavaIoInputStream *)bytes withComGoogleProtobufExtensionRegistryLite:(ComGoogleProtobufExtensionRegistryLite *)registry;
+ (ComDzhyunProtoDzhyunUserpushlist_UserPushItemUpd *)parseDelimitedFromWithJavaIoInputStream:(JavaIoInputStream *)input;
+ (ComDzhyunProtoDzhyunUserpushlist_UserPushItemUpd *)parseDelimitedFromWithJavaIoInputStream:(JavaIoInputStream *)bytes withComGoogleProtobufExtensionRegistryLite:(ComGoogleProtobufExtensionRegistryLite *)registry;

#define ComDzhyunProtoDzhyunUserpushlist_UserPushItemUpd_RESULTCODE_FIELD_NUMBER 1
#define ComDzhyunProtoDzhyunUserpushlist_UserPushItemUpd_RESULTMSG_FIELD_NUMBER 2

@end

FOUNDATION_EXPORT ComDzhyunProtoDzhyunUserpushlist_UserPushItemUpd *ComDzhyunProtoDzhyunUserpushlist_UserPushItemUpd_getDefaultInstance();
FOUNDATION_EXPORT ComDzhyunProtoDzhyunUserpushlist_UserPushItemUpd_Builder *ComDzhyunProtoDzhyunUserpushlist_UserPushItemUpd_newBuilder();
FOUNDATION_EXPORT ComDzhyunProtoDzhyunUserpushlist_UserPushItemUpd_Builder *ComDzhyunProtoDzhyunUserpushlist_UserPushItemUpd_newBuilderWithComDzhyunProtoDzhyunUserpushlist_UserPushItemUpd_(ComDzhyunProtoDzhyunUserpushlist_UserPushItemUpd *message);
FOUNDATION_EXPORT ComGoogleProtobufDescriptors_Descriptor *ComDzhyunProtoDzhyunUserpushlist_UserPushItemUpd_getDescriptor();
FOUNDATION_EXPORT ComDzhyunProtoDzhyunUserpushlist_UserPushItemUpd *ComDzhyunProtoDzhyunUserpushlist_UserPushItemUpd_parseFromWithByteArray_withComGoogleProtobufExtensionRegistryLite_(IOSByteArray *bytes, ComGoogleProtobufExtensionRegistryLite *registry);
CGP_ALWAYS_INLINE inline ComDzhyunProtoDzhyunUserpushlist_UserPushItemUpd *ComDzhyunProtoDzhyunUserpushlist_UserPushItemUpd_parseFromWithByteArray_(IOSByteArray *bytes) {
  return ComDzhyunProtoDzhyunUserpushlist_UserPushItemUpd_parseFromWithByteArray_withComGoogleProtobufExtensionRegistryLite_(bytes, nil);
}
FOUNDATION_EXPORT ComDzhyunProtoDzhyunUserpushlist_UserPushItemUpd *ComDzhyunProtoDzhyunUserpushlist_UserPushItemUpd_parseFromWithJavaIoInputStream_withComGoogleProtobufExtensionRegistryLite_(JavaIoInputStream *input, ComGoogleProtobufExtensionRegistryLite *registry);
CGP_ALWAYS_INLINE inline ComDzhyunProtoDzhyunUserpushlist_UserPushItemUpd *ComDzhyunProtoDzhyunUserpushlist_UserPushItemUpd_parseFromWithJavaIoInputStream_(JavaIoInputStream *input) {
  return ComDzhyunProtoDzhyunUserpushlist_UserPushItemUpd_parseFromWithJavaIoInputStream_withComGoogleProtobufExtensionRegistryLite_(input, nil);
}
FOUNDATION_EXPORT ComDzhyunProtoDzhyunUserpushlist_UserPushItemUpd *ComDzhyunProtoDzhyunUserpushlist_UserPushItemUpd_parseDelimitedFromWithJavaIoInputStream_withComGoogleProtobufExtensionRegistryLite_(JavaIoInputStream *input, ComGoogleProtobufExtensionRegistryLite *registry);
CGP_ALWAYS_INLINE inline ComDzhyunProtoDzhyunUserpushlist_UserPushItemUpd *ComDzhyunProtoDzhyunUserpushlist_UserPushItemUpd_parseDelimitedFromWithJavaIoInputStream_(JavaIoInputStream *input) {
  return ComDzhyunProtoDzhyunUserpushlist_UserPushItemUpd_parseDelimitedFromWithJavaIoInputStream_withComGoogleProtobufExtensionRegistryLite_(input, nil);
}

J2OBJC_STATIC_INIT(ComDzhyunProtoDzhyunUserpushlist_UserPushItemUpd)

J2OBJC_TYPE_LITERAL_HEADER(ComDzhyunProtoDzhyunUserpushlist_UserPushItemUpd)

FOUNDATION_EXPORT ComGoogleProtobufDescriptors_Descriptor *ComDzhyunProtoDzhyunUserpushlist_UserPushItemUpd_descriptor_;

@interface ComDzhyunProtoDzhyunUserpushlist_UserPushItemUpd_Builder : ComGoogleProtobufGeneratedMessage_Builder<ComDzhyunProtoDzhyunUserpushlist_UserPushItemUpdOrBuilder>

- (ComDzhyunProtoDzhyunUserpushlist_UserPushItemUpd *)getDefaultInstanceForType;
- (ComDzhyunProtoDzhyunUserpushlist_UserPushItemUpd_Builder *)mergeFromWithComDzhyunProtoDzhyunUserpushlist_UserPushItemUpd:(ComDzhyunProtoDzhyunUserpushlist_UserPushItemUpd *)message;
- (ComDzhyunProtoDzhyunUserpushlist_UserPushItemUpd_Builder *)mergeFromWithComGoogleProtobufMessage:(id<ComGoogleProtobufMessage>)message;
- (ComDzhyunProtoDzhyunUserpushlist_UserPushItemUpd *)build;
- (ComDzhyunProtoDzhyunUserpushlist_UserPushItemUpd *)buildPartial;
+ (ComGoogleProtobufDescriptors_Descriptor *)getDescriptor;

- (ComDzhyunProtoDzhyunUserpushlist_UserPushItemUpd_Builder *)setResultCodeWithInt:
    (int)value;
- (ComDzhyunProtoDzhyunUserpushlist_UserPushItemUpd_Builder *)clearResultCode;

- (ComDzhyunProtoDzhyunUserpushlist_UserPushItemUpd_Builder *)setResultMsgWithNSString:
    (NSString *)value;
- (ComDzhyunProtoDzhyunUserpushlist_UserPushItemUpd_Builder *)clearResultMsg;

@end

FOUNDATION_EXPORT ComGoogleProtobufDescriptors_Descriptor *ComDzhyunProtoDzhyunUserpushlist_UserPushItemUpd_Builder_getDescriptor();

J2OBJC_EMPTY_STATIC_INIT(ComDzhyunProtoDzhyunUserpushlist_UserPushItemUpd_Builder)

J2OBJC_TYPE_LITERAL_HEADER(ComDzhyunProtoDzhyunUserpushlist_UserPushItemUpd_Builder)
