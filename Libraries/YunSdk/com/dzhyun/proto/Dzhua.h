// Generated by the protocol buffer compiler.  DO NOT EDIT!
// source: dzhua.proto

#import "J2ObjC_header.h"
#import "com/google/protobuf/GeneratedMessage.h"
#import "com/google/protobuf/MessageOrBuilder.h"
#import "com/google/protobuf/ProtocolMessageEnum.h"
#import "java/lang/Enum.h"

@class ComDzhyunProtoDzhua_ChildResponse;
@class ComDzhyunProtoDzhua_ChildResponse_Builder;
@class ComDzhyunProtoDzhua_GroupResponse_Builder;
@class ComDzhyunProtoDzhua_UAResponse_Builder;
@class ComGoogleProtobufByteString;
@class ComGoogleProtobufDescriptors_Descriptor;
@class ComGoogleProtobufExtensionRegistry;
@protocol JavaLangIterable;
@protocol JavaUtilList;

@interface ComDzhyunProtoDzhua : NSObject

+ (void)registerAllExtensionsWithComGoogleProtobufExtensionRegistry:(ComGoogleProtobufExtensionRegistry *)extensionRegistry;

@end

FOUNDATION_EXPORT void ComDzhyunProtoDzhua_registerAllExtensionsWithComGoogleProtobufExtensionRegistry_(ComGoogleProtobufExtensionRegistry *extensionRegistry);

J2OBJC_EMPTY_STATIC_INIT(ComDzhyunProtoDzhua)

J2OBJC_TYPE_LITERAL_HEADER(ComDzhyunProtoDzhua)

@protocol ComDzhyunProtoDzhua_UAResponseOrBuilder < ComGoogleProtobufMessageOrBuilder >

- (BOOL)hasQid;
- (NSString *)getQid;

- (BOOL)hasErr;
- (int)getErr;

- (BOOL)hasCounter;
- (int)getCounter;

- (BOOL)hasData;
- (ComGoogleProtobufByteString *)getData;

@end

J2OBJC_EMPTY_STATIC_INIT(ComDzhyunProtoDzhua_UAResponseOrBuilder)

J2OBJC_TYPE_LITERAL_HEADER(ComDzhyunProtoDzhua_UAResponseOrBuilder)

@interface ComDzhyunProtoDzhua_UAResponse : ComGoogleProtobufGeneratedMessage<ComDzhyunProtoDzhua_UAResponseOrBuilder>

+ (ComDzhyunProtoDzhua_UAResponse *)getDefaultInstance;
- (ComDzhyunProtoDzhua_UAResponse *)getDefaultInstanceForType;
+ (ComDzhyunProtoDzhua_UAResponse_Builder *)newBuilder OBJC_METHOD_FAMILY_NONE;
- (ComDzhyunProtoDzhua_UAResponse_Builder *)newBuilderForType OBJC_METHOD_FAMILY_NONE;
- (ComDzhyunProtoDzhua_UAResponse_Builder *)toBuilder;
+ (ComDzhyunProtoDzhua_UAResponse_Builder *)newBuilderWithComDzhyunProtoDzhua_UAResponse:(ComDzhyunProtoDzhua_UAResponse *)message OBJC_METHOD_FAMILY_NONE;
+ (ComGoogleProtobufDescriptors_Descriptor *)getDescriptor;
+ (ComDzhyunProtoDzhua_UAResponse *)parseFromWithByteArray:(IOSByteArray *)bytes;
+ (ComDzhyunProtoDzhua_UAResponse *)parseFromWithByteArray:(IOSByteArray *)bytes withComGoogleProtobufExtensionRegistryLite:(ComGoogleProtobufExtensionRegistryLite *)registry;
+ (ComDzhyunProtoDzhua_UAResponse *)parseFromNSData:(NSData *)data;
+ (ComDzhyunProtoDzhua_UAResponse *)parseFromNSData:(NSData *)data registry:(ComGoogleProtobufExtensionRegistryLite *)registry;
+ (ComDzhyunProtoDzhua_UAResponse *)parseFromWithJavaIoInputStream:(JavaIoInputStream *)input;
+ (ComDzhyunProtoDzhua_UAResponse *)parseFromWithJavaIoInputStream:(JavaIoInputStream *)bytes withComGoogleProtobufExtensionRegistryLite:(ComGoogleProtobufExtensionRegistryLite *)registry;
+ (ComDzhyunProtoDzhua_UAResponse *)parseDelimitedFromWithJavaIoInputStream:(JavaIoInputStream *)input;
+ (ComDzhyunProtoDzhua_UAResponse *)parseDelimitedFromWithJavaIoInputStream:(JavaIoInputStream *)bytes withComGoogleProtobufExtensionRegistryLite:(ComGoogleProtobufExtensionRegistryLite *)registry;

#define ComDzhyunProtoDzhua_UAResponse_QID_FIELD_NUMBER 1
#define ComDzhyunProtoDzhua_UAResponse_ERR_FIELD_NUMBER 2
#define ComDzhyunProtoDzhua_UAResponse_COUNTER_FIELD_NUMBER 3
#define ComDzhyunProtoDzhua_UAResponse_DATA_FIELD_NUMBER 4

@end

FOUNDATION_EXPORT ComDzhyunProtoDzhua_UAResponse *ComDzhyunProtoDzhua_UAResponse_getDefaultInstance();
FOUNDATION_EXPORT ComDzhyunProtoDzhua_UAResponse_Builder *ComDzhyunProtoDzhua_UAResponse_newBuilder();
FOUNDATION_EXPORT ComDzhyunProtoDzhua_UAResponse_Builder *ComDzhyunProtoDzhua_UAResponse_newBuilderWithComDzhyunProtoDzhua_UAResponse_(ComDzhyunProtoDzhua_UAResponse *message);
FOUNDATION_EXPORT ComGoogleProtobufDescriptors_Descriptor *ComDzhyunProtoDzhua_UAResponse_getDescriptor();
FOUNDATION_EXPORT ComDzhyunProtoDzhua_UAResponse *ComDzhyunProtoDzhua_UAResponse_parseFromWithByteArray_withComGoogleProtobufExtensionRegistryLite_(IOSByteArray *bytes, ComGoogleProtobufExtensionRegistryLite *registry);
CGP_ALWAYS_INLINE inline ComDzhyunProtoDzhua_UAResponse *ComDzhyunProtoDzhua_UAResponse_parseFromWithByteArray_(IOSByteArray *bytes) {
  return ComDzhyunProtoDzhua_UAResponse_parseFromWithByteArray_withComGoogleProtobufExtensionRegistryLite_(bytes, nil);
}
FOUNDATION_EXPORT ComDzhyunProtoDzhua_UAResponse *ComDzhyunProtoDzhua_UAResponse_parseFromWithJavaIoInputStream_withComGoogleProtobufExtensionRegistryLite_(JavaIoInputStream *input, ComGoogleProtobufExtensionRegistryLite *registry);
CGP_ALWAYS_INLINE inline ComDzhyunProtoDzhua_UAResponse *ComDzhyunProtoDzhua_UAResponse_parseFromWithJavaIoInputStream_(JavaIoInputStream *input) {
  return ComDzhyunProtoDzhua_UAResponse_parseFromWithJavaIoInputStream_withComGoogleProtobufExtensionRegistryLite_(input, nil);
}
FOUNDATION_EXPORT ComDzhyunProtoDzhua_UAResponse *ComDzhyunProtoDzhua_UAResponse_parseDelimitedFromWithJavaIoInputStream_withComGoogleProtobufExtensionRegistryLite_(JavaIoInputStream *input, ComGoogleProtobufExtensionRegistryLite *registry);
CGP_ALWAYS_INLINE inline ComDzhyunProtoDzhua_UAResponse *ComDzhyunProtoDzhua_UAResponse_parseDelimitedFromWithJavaIoInputStream_(JavaIoInputStream *input) {
  return ComDzhyunProtoDzhua_UAResponse_parseDelimitedFromWithJavaIoInputStream_withComGoogleProtobufExtensionRegistryLite_(input, nil);
}

J2OBJC_STATIC_INIT(ComDzhyunProtoDzhua_UAResponse)

J2OBJC_TYPE_LITERAL_HEADER(ComDzhyunProtoDzhua_UAResponse)

FOUNDATION_EXPORT ComGoogleProtobufDescriptors_Descriptor *ComDzhyunProtoDzhua_UAResponse_descriptor_;

@interface ComDzhyunProtoDzhua_UAResponse_Builder : ComGoogleProtobufGeneratedMessage_Builder<ComDzhyunProtoDzhua_UAResponseOrBuilder>

- (ComDzhyunProtoDzhua_UAResponse *)getDefaultInstanceForType;
- (ComDzhyunProtoDzhua_UAResponse_Builder *)mergeFromWithComDzhyunProtoDzhua_UAResponse:(ComDzhyunProtoDzhua_UAResponse *)message;
- (ComDzhyunProtoDzhua_UAResponse_Builder *)mergeFromWithComGoogleProtobufMessage:(id<ComGoogleProtobufMessage>)message;
- (ComDzhyunProtoDzhua_UAResponse *)build;
- (ComDzhyunProtoDzhua_UAResponse *)buildPartial;
+ (ComGoogleProtobufDescriptors_Descriptor *)getDescriptor;

- (ComDzhyunProtoDzhua_UAResponse_Builder *)setQidWithNSString:
    (NSString *)value;
- (ComDzhyunProtoDzhua_UAResponse_Builder *)clearQid;

- (ComDzhyunProtoDzhua_UAResponse_Builder *)setErrWithInt:
    (int)value;
- (ComDzhyunProtoDzhua_UAResponse_Builder *)clearErr;

- (ComDzhyunProtoDzhua_UAResponse_Builder *)setCounterWithInt:
    (int)value;
- (ComDzhyunProtoDzhua_UAResponse_Builder *)clearCounter;

- (ComDzhyunProtoDzhua_UAResponse_Builder *)setDataWithComGoogleProtobufByteString:
    (ComGoogleProtobufByteString *)value;
- (ComDzhyunProtoDzhua_UAResponse_Builder *)clearData;

@end

FOUNDATION_EXPORT ComGoogleProtobufDescriptors_Descriptor *ComDzhyunProtoDzhua_UAResponse_Builder_getDescriptor();

J2OBJC_EMPTY_STATIC_INIT(ComDzhyunProtoDzhua_UAResponse_Builder)

J2OBJC_TYPE_LITERAL_HEADER(ComDzhyunProtoDzhua_UAResponse_Builder)

@protocol ComDzhyunProtoDzhua_ChildResponseOrBuilder < ComGoogleProtobufMessageOrBuilder >

- (BOOL)hasNo;
- (int)getNo;

- (BOOL)hasData;
- (ComGoogleProtobufByteString *)getData;

@end

J2OBJC_EMPTY_STATIC_INIT(ComDzhyunProtoDzhua_ChildResponseOrBuilder)

J2OBJC_TYPE_LITERAL_HEADER(ComDzhyunProtoDzhua_ChildResponseOrBuilder)

@interface ComDzhyunProtoDzhua_ChildResponse : ComGoogleProtobufGeneratedMessage<ComDzhyunProtoDzhua_ChildResponseOrBuilder>

+ (ComDzhyunProtoDzhua_ChildResponse *)getDefaultInstance;
- (ComDzhyunProtoDzhua_ChildResponse *)getDefaultInstanceForType;
+ (ComDzhyunProtoDzhua_ChildResponse_Builder *)newBuilder OBJC_METHOD_FAMILY_NONE;
- (ComDzhyunProtoDzhua_ChildResponse_Builder *)newBuilderForType OBJC_METHOD_FAMILY_NONE;
- (ComDzhyunProtoDzhua_ChildResponse_Builder *)toBuilder;
+ (ComDzhyunProtoDzhua_ChildResponse_Builder *)newBuilderWithComDzhyunProtoDzhua_ChildResponse:(ComDzhyunProtoDzhua_ChildResponse *)message OBJC_METHOD_FAMILY_NONE;
+ (ComGoogleProtobufDescriptors_Descriptor *)getDescriptor;
+ (ComDzhyunProtoDzhua_ChildResponse *)parseFromWithByteArray:(IOSByteArray *)bytes;
+ (ComDzhyunProtoDzhua_ChildResponse *)parseFromWithByteArray:(IOSByteArray *)bytes withComGoogleProtobufExtensionRegistryLite:(ComGoogleProtobufExtensionRegistryLite *)registry;
+ (ComDzhyunProtoDzhua_ChildResponse *)parseFromNSData:(NSData *)data;
+ (ComDzhyunProtoDzhua_ChildResponse *)parseFromNSData:(NSData *)data registry:(ComGoogleProtobufExtensionRegistryLite *)registry;
+ (ComDzhyunProtoDzhua_ChildResponse *)parseFromWithJavaIoInputStream:(JavaIoInputStream *)input;
+ (ComDzhyunProtoDzhua_ChildResponse *)parseFromWithJavaIoInputStream:(JavaIoInputStream *)bytes withComGoogleProtobufExtensionRegistryLite:(ComGoogleProtobufExtensionRegistryLite *)registry;
+ (ComDzhyunProtoDzhua_ChildResponse *)parseDelimitedFromWithJavaIoInputStream:(JavaIoInputStream *)input;
+ (ComDzhyunProtoDzhua_ChildResponse *)parseDelimitedFromWithJavaIoInputStream:(JavaIoInputStream *)bytes withComGoogleProtobufExtensionRegistryLite:(ComGoogleProtobufExtensionRegistryLite *)registry;

#define ComDzhyunProtoDzhua_ChildResponse_NO_FIELD_NUMBER 1
#define ComDzhyunProtoDzhua_ChildResponse_DATA_FIELD_NUMBER 2

@end

FOUNDATION_EXPORT ComDzhyunProtoDzhua_ChildResponse *ComDzhyunProtoDzhua_ChildResponse_getDefaultInstance();
FOUNDATION_EXPORT ComDzhyunProtoDzhua_ChildResponse_Builder *ComDzhyunProtoDzhua_ChildResponse_newBuilder();
FOUNDATION_EXPORT ComDzhyunProtoDzhua_ChildResponse_Builder *ComDzhyunProtoDzhua_ChildResponse_newBuilderWithComDzhyunProtoDzhua_ChildResponse_(ComDzhyunProtoDzhua_ChildResponse *message);
FOUNDATION_EXPORT ComGoogleProtobufDescriptors_Descriptor *ComDzhyunProtoDzhua_ChildResponse_getDescriptor();
FOUNDATION_EXPORT ComDzhyunProtoDzhua_ChildResponse *ComDzhyunProtoDzhua_ChildResponse_parseFromWithByteArray_withComGoogleProtobufExtensionRegistryLite_(IOSByteArray *bytes, ComGoogleProtobufExtensionRegistryLite *registry);
CGP_ALWAYS_INLINE inline ComDzhyunProtoDzhua_ChildResponse *ComDzhyunProtoDzhua_ChildResponse_parseFromWithByteArray_(IOSByteArray *bytes) {
  return ComDzhyunProtoDzhua_ChildResponse_parseFromWithByteArray_withComGoogleProtobufExtensionRegistryLite_(bytes, nil);
}
FOUNDATION_EXPORT ComDzhyunProtoDzhua_ChildResponse *ComDzhyunProtoDzhua_ChildResponse_parseFromWithJavaIoInputStream_withComGoogleProtobufExtensionRegistryLite_(JavaIoInputStream *input, ComGoogleProtobufExtensionRegistryLite *registry);
CGP_ALWAYS_INLINE inline ComDzhyunProtoDzhua_ChildResponse *ComDzhyunProtoDzhua_ChildResponse_parseFromWithJavaIoInputStream_(JavaIoInputStream *input) {
  return ComDzhyunProtoDzhua_ChildResponse_parseFromWithJavaIoInputStream_withComGoogleProtobufExtensionRegistryLite_(input, nil);
}
FOUNDATION_EXPORT ComDzhyunProtoDzhua_ChildResponse *ComDzhyunProtoDzhua_ChildResponse_parseDelimitedFromWithJavaIoInputStream_withComGoogleProtobufExtensionRegistryLite_(JavaIoInputStream *input, ComGoogleProtobufExtensionRegistryLite *registry);
CGP_ALWAYS_INLINE inline ComDzhyunProtoDzhua_ChildResponse *ComDzhyunProtoDzhua_ChildResponse_parseDelimitedFromWithJavaIoInputStream_(JavaIoInputStream *input) {
  return ComDzhyunProtoDzhua_ChildResponse_parseDelimitedFromWithJavaIoInputStream_withComGoogleProtobufExtensionRegistryLite_(input, nil);
}

J2OBJC_STATIC_INIT(ComDzhyunProtoDzhua_ChildResponse)

J2OBJC_TYPE_LITERAL_HEADER(ComDzhyunProtoDzhua_ChildResponse)

FOUNDATION_EXPORT ComGoogleProtobufDescriptors_Descriptor *ComDzhyunProtoDzhua_ChildResponse_descriptor_;

@interface ComDzhyunProtoDzhua_ChildResponse_Builder : ComGoogleProtobufGeneratedMessage_Builder<ComDzhyunProtoDzhua_ChildResponseOrBuilder>

- (ComDzhyunProtoDzhua_ChildResponse *)getDefaultInstanceForType;
- (ComDzhyunProtoDzhua_ChildResponse_Builder *)mergeFromWithComDzhyunProtoDzhua_ChildResponse:(ComDzhyunProtoDzhua_ChildResponse *)message;
- (ComDzhyunProtoDzhua_ChildResponse_Builder *)mergeFromWithComGoogleProtobufMessage:(id<ComGoogleProtobufMessage>)message;
- (ComDzhyunProtoDzhua_ChildResponse *)build;
- (ComDzhyunProtoDzhua_ChildResponse *)buildPartial;
+ (ComGoogleProtobufDescriptors_Descriptor *)getDescriptor;

- (ComDzhyunProtoDzhua_ChildResponse_Builder *)setNoWithInt:
    (int)value;
- (ComDzhyunProtoDzhua_ChildResponse_Builder *)clearNo;

- (ComDzhyunProtoDzhua_ChildResponse_Builder *)setDataWithComGoogleProtobufByteString:
    (ComGoogleProtobufByteString *)value;
- (ComDzhyunProtoDzhua_ChildResponse_Builder *)clearData;

@end

FOUNDATION_EXPORT ComGoogleProtobufDescriptors_Descriptor *ComDzhyunProtoDzhua_ChildResponse_Builder_getDescriptor();

J2OBJC_EMPTY_STATIC_INIT(ComDzhyunProtoDzhua_ChildResponse_Builder)

J2OBJC_TYPE_LITERAL_HEADER(ComDzhyunProtoDzhua_ChildResponse_Builder)

@protocol ComDzhyunProtoDzhua_GroupResponseOrBuilder < ComGoogleProtobufMessageOrBuilder >

- (int)getChildResCount;
- (id<JavaUtilList>)getChildResList;
- (ComDzhyunProtoDzhua_ChildResponse *)getChildResWithInt:(int)index;

@end

J2OBJC_EMPTY_STATIC_INIT(ComDzhyunProtoDzhua_GroupResponseOrBuilder)

J2OBJC_TYPE_LITERAL_HEADER(ComDzhyunProtoDzhua_GroupResponseOrBuilder)

@interface ComDzhyunProtoDzhua_GroupResponse : ComGoogleProtobufGeneratedMessage<ComDzhyunProtoDzhua_GroupResponseOrBuilder>

+ (ComDzhyunProtoDzhua_GroupResponse *)getDefaultInstance;
- (ComDzhyunProtoDzhua_GroupResponse *)getDefaultInstanceForType;
+ (ComDzhyunProtoDzhua_GroupResponse_Builder *)newBuilder OBJC_METHOD_FAMILY_NONE;
- (ComDzhyunProtoDzhua_GroupResponse_Builder *)newBuilderForType OBJC_METHOD_FAMILY_NONE;
- (ComDzhyunProtoDzhua_GroupResponse_Builder *)toBuilder;
+ (ComDzhyunProtoDzhua_GroupResponse_Builder *)newBuilderWithComDzhyunProtoDzhua_GroupResponse:(ComDzhyunProtoDzhua_GroupResponse *)message OBJC_METHOD_FAMILY_NONE;
+ (ComGoogleProtobufDescriptors_Descriptor *)getDescriptor;
+ (ComDzhyunProtoDzhua_GroupResponse *)parseFromWithByteArray:(IOSByteArray *)bytes;
+ (ComDzhyunProtoDzhua_GroupResponse *)parseFromWithByteArray:(IOSByteArray *)bytes withComGoogleProtobufExtensionRegistryLite:(ComGoogleProtobufExtensionRegistryLite *)registry;
+ (ComDzhyunProtoDzhua_GroupResponse *)parseFromNSData:(NSData *)data;
+ (ComDzhyunProtoDzhua_GroupResponse *)parseFromNSData:(NSData *)data registry:(ComGoogleProtobufExtensionRegistryLite *)registry;
+ (ComDzhyunProtoDzhua_GroupResponse *)parseFromWithJavaIoInputStream:(JavaIoInputStream *)input;
+ (ComDzhyunProtoDzhua_GroupResponse *)parseFromWithJavaIoInputStream:(JavaIoInputStream *)bytes withComGoogleProtobufExtensionRegistryLite:(ComGoogleProtobufExtensionRegistryLite *)registry;
+ (ComDzhyunProtoDzhua_GroupResponse *)parseDelimitedFromWithJavaIoInputStream:(JavaIoInputStream *)input;
+ (ComDzhyunProtoDzhua_GroupResponse *)parseDelimitedFromWithJavaIoInputStream:(JavaIoInputStream *)bytes withComGoogleProtobufExtensionRegistryLite:(ComGoogleProtobufExtensionRegistryLite *)registry;

#define ComDzhyunProtoDzhua_GroupResponse_CHILDRES_FIELD_NUMBER 1

@end

FOUNDATION_EXPORT ComDzhyunProtoDzhua_GroupResponse *ComDzhyunProtoDzhua_GroupResponse_getDefaultInstance();
FOUNDATION_EXPORT ComDzhyunProtoDzhua_GroupResponse_Builder *ComDzhyunProtoDzhua_GroupResponse_newBuilder();
FOUNDATION_EXPORT ComDzhyunProtoDzhua_GroupResponse_Builder *ComDzhyunProtoDzhua_GroupResponse_newBuilderWithComDzhyunProtoDzhua_GroupResponse_(ComDzhyunProtoDzhua_GroupResponse *message);
FOUNDATION_EXPORT ComGoogleProtobufDescriptors_Descriptor *ComDzhyunProtoDzhua_GroupResponse_getDescriptor();
FOUNDATION_EXPORT ComDzhyunProtoDzhua_GroupResponse *ComDzhyunProtoDzhua_GroupResponse_parseFromWithByteArray_withComGoogleProtobufExtensionRegistryLite_(IOSByteArray *bytes, ComGoogleProtobufExtensionRegistryLite *registry);
CGP_ALWAYS_INLINE inline ComDzhyunProtoDzhua_GroupResponse *ComDzhyunProtoDzhua_GroupResponse_parseFromWithByteArray_(IOSByteArray *bytes) {
  return ComDzhyunProtoDzhua_GroupResponse_parseFromWithByteArray_withComGoogleProtobufExtensionRegistryLite_(bytes, nil);
}
FOUNDATION_EXPORT ComDzhyunProtoDzhua_GroupResponse *ComDzhyunProtoDzhua_GroupResponse_parseFromWithJavaIoInputStream_withComGoogleProtobufExtensionRegistryLite_(JavaIoInputStream *input, ComGoogleProtobufExtensionRegistryLite *registry);
CGP_ALWAYS_INLINE inline ComDzhyunProtoDzhua_GroupResponse *ComDzhyunProtoDzhua_GroupResponse_parseFromWithJavaIoInputStream_(JavaIoInputStream *input) {
  return ComDzhyunProtoDzhua_GroupResponse_parseFromWithJavaIoInputStream_withComGoogleProtobufExtensionRegistryLite_(input, nil);
}
FOUNDATION_EXPORT ComDzhyunProtoDzhua_GroupResponse *ComDzhyunProtoDzhua_GroupResponse_parseDelimitedFromWithJavaIoInputStream_withComGoogleProtobufExtensionRegistryLite_(JavaIoInputStream *input, ComGoogleProtobufExtensionRegistryLite *registry);
CGP_ALWAYS_INLINE inline ComDzhyunProtoDzhua_GroupResponse *ComDzhyunProtoDzhua_GroupResponse_parseDelimitedFromWithJavaIoInputStream_(JavaIoInputStream *input) {
  return ComDzhyunProtoDzhua_GroupResponse_parseDelimitedFromWithJavaIoInputStream_withComGoogleProtobufExtensionRegistryLite_(input, nil);
}

J2OBJC_STATIC_INIT(ComDzhyunProtoDzhua_GroupResponse)

J2OBJC_TYPE_LITERAL_HEADER(ComDzhyunProtoDzhua_GroupResponse)

FOUNDATION_EXPORT ComGoogleProtobufDescriptors_Descriptor *ComDzhyunProtoDzhua_GroupResponse_descriptor_;

@interface ComDzhyunProtoDzhua_GroupResponse_Builder : ComGoogleProtobufGeneratedMessage_Builder<ComDzhyunProtoDzhua_GroupResponseOrBuilder>

- (ComDzhyunProtoDzhua_GroupResponse *)getDefaultInstanceForType;
- (ComDzhyunProtoDzhua_GroupResponse_Builder *)mergeFromWithComDzhyunProtoDzhua_GroupResponse:(ComDzhyunProtoDzhua_GroupResponse *)message;
- (ComDzhyunProtoDzhua_GroupResponse_Builder *)mergeFromWithComGoogleProtobufMessage:(id<ComGoogleProtobufMessage>)message;
- (ComDzhyunProtoDzhua_GroupResponse *)build;
- (ComDzhyunProtoDzhua_GroupResponse *)buildPartial;
+ (ComGoogleProtobufDescriptors_Descriptor *)getDescriptor;
- (ComDzhyunProtoDzhua_GroupResponse_Builder*)setChildResWithInt:(int)index
    withComDzhyunProtoDzhua_ChildResponse:(ComDzhyunProtoDzhua_ChildResponse *)value;
- (ComDzhyunProtoDzhua_GroupResponse_Builder*)addChildResWithComDzhyunProtoDzhua_ChildResponse:
    (ComDzhyunProtoDzhua_ChildResponse *)value;
- (ComDzhyunProtoDzhua_GroupResponse_Builder*)addAllChildResWithJavaLangIterable:
    (id<JavaLangIterable>)values;
- (ComDzhyunProtoDzhua_GroupResponse_Builder*)clearChildRes;
- (ComDzhyunProtoDzhua_GroupResponse_Builder*)
    addChildResWithComDzhyunProtoDzhua_ChildResponse_Builder:
    (ComDzhyunProtoDzhua_ChildResponse_Builder *)value;

@end

FOUNDATION_EXPORT ComGoogleProtobufDescriptors_Descriptor *ComDzhyunProtoDzhua_GroupResponse_Builder_getDescriptor();

J2OBJC_EMPTY_STATIC_INIT(ComDzhyunProtoDzhua_GroupResponse_Builder)

J2OBJC_TYPE_LITERAL_HEADER(ComDzhyunProtoDzhua_GroupResponse_Builder)
