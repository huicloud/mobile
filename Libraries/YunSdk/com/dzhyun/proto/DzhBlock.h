// Generated by the protocol buffer compiler.  DO NOT EDIT!
// source: dzh.block.proto

#import "J2ObjC_header.h"
#import "com/google/protobuf/GeneratedMessage.h"
#import "com/google/protobuf/MessageOrBuilder.h"
#import "com/google/protobuf/ProtocolMessageEnum.h"
#import "com/google/protobuf/ProtocolStringList.h"
#import "java/lang/Enum.h"

@class ComDzhyunProtoDzhBlock_BlockObjOutput_Builder;
@class ComDzhyunProtoDzhBlock_BlockPropOutput_Builder;
@class ComGoogleProtobufDescriptors_Descriptor;
@class ComGoogleProtobufExtensionRegistry;
@protocol ComGoogleProtobufProtocolStringList;
@protocol JavaLangIterable;

@interface ComDzhyunProtoDzhBlock : NSObject

+ (void)registerAllExtensionsWithComGoogleProtobufExtensionRegistry:(ComGoogleProtobufExtensionRegistry *)extensionRegistry;

@end

FOUNDATION_EXPORT void ComDzhyunProtoDzhBlock_registerAllExtensionsWithComGoogleProtobufExtensionRegistry_(ComGoogleProtobufExtensionRegistry *extensionRegistry);

J2OBJC_EMPTY_STATIC_INIT(ComDzhyunProtoDzhBlock)

J2OBJC_TYPE_LITERAL_HEADER(ComDzhyunProtoDzhBlock)

@protocol ComDzhyunProtoDzhBlock_BlockObjOutputOrBuilder < ComGoogleProtobufMessageOrBuilder >

- (int)getObjCount;
- (id<ComGoogleProtobufProtocolStringList>)getObjList;
- (NSString *)getObjWithInt:(int)index;

@end

J2OBJC_EMPTY_STATIC_INIT(ComDzhyunProtoDzhBlock_BlockObjOutputOrBuilder)

J2OBJC_TYPE_LITERAL_HEADER(ComDzhyunProtoDzhBlock_BlockObjOutputOrBuilder)

@interface ComDzhyunProtoDzhBlock_BlockObjOutput : ComGoogleProtobufGeneratedMessage<ComDzhyunProtoDzhBlock_BlockObjOutputOrBuilder>

+ (ComDzhyunProtoDzhBlock_BlockObjOutput *)getDefaultInstance;
- (ComDzhyunProtoDzhBlock_BlockObjOutput *)getDefaultInstanceForType;
+ (ComDzhyunProtoDzhBlock_BlockObjOutput_Builder *)newBuilder OBJC_METHOD_FAMILY_NONE;
- (ComDzhyunProtoDzhBlock_BlockObjOutput_Builder *)newBuilderForType OBJC_METHOD_FAMILY_NONE;
- (ComDzhyunProtoDzhBlock_BlockObjOutput_Builder *)toBuilder;
+ (ComDzhyunProtoDzhBlock_BlockObjOutput_Builder *)newBuilderWithComDzhyunProtoDzhBlock_BlockObjOutput:(ComDzhyunProtoDzhBlock_BlockObjOutput *)message OBJC_METHOD_FAMILY_NONE;
+ (ComGoogleProtobufDescriptors_Descriptor *)getDescriptor;
+ (ComDzhyunProtoDzhBlock_BlockObjOutput *)parseFromWithByteArray:(IOSByteArray *)bytes;
+ (ComDzhyunProtoDzhBlock_BlockObjOutput *)parseFromWithByteArray:(IOSByteArray *)bytes withComGoogleProtobufExtensionRegistryLite:(ComGoogleProtobufExtensionRegistryLite *)registry;
+ (ComDzhyunProtoDzhBlock_BlockObjOutput *)parseFromNSData:(NSData *)data;
+ (ComDzhyunProtoDzhBlock_BlockObjOutput *)parseFromNSData:(NSData *)data registry:(ComGoogleProtobufExtensionRegistryLite *)registry;
+ (ComDzhyunProtoDzhBlock_BlockObjOutput *)parseFromWithJavaIoInputStream:(JavaIoInputStream *)input;
+ (ComDzhyunProtoDzhBlock_BlockObjOutput *)parseFromWithJavaIoInputStream:(JavaIoInputStream *)bytes withComGoogleProtobufExtensionRegistryLite:(ComGoogleProtobufExtensionRegistryLite *)registry;
+ (ComDzhyunProtoDzhBlock_BlockObjOutput *)parseDelimitedFromWithJavaIoInputStream:(JavaIoInputStream *)input;
+ (ComDzhyunProtoDzhBlock_BlockObjOutput *)parseDelimitedFromWithJavaIoInputStream:(JavaIoInputStream *)bytes withComGoogleProtobufExtensionRegistryLite:(ComGoogleProtobufExtensionRegistryLite *)registry;

#define ComDzhyunProtoDzhBlock_BlockObjOutput_OBJ_FIELD_NUMBER 1

@end

FOUNDATION_EXPORT ComDzhyunProtoDzhBlock_BlockObjOutput *ComDzhyunProtoDzhBlock_BlockObjOutput_getDefaultInstance();
FOUNDATION_EXPORT ComDzhyunProtoDzhBlock_BlockObjOutput_Builder *ComDzhyunProtoDzhBlock_BlockObjOutput_newBuilder();
FOUNDATION_EXPORT ComDzhyunProtoDzhBlock_BlockObjOutput_Builder *ComDzhyunProtoDzhBlock_BlockObjOutput_newBuilderWithComDzhyunProtoDzhBlock_BlockObjOutput_(ComDzhyunProtoDzhBlock_BlockObjOutput *message);
FOUNDATION_EXPORT ComGoogleProtobufDescriptors_Descriptor *ComDzhyunProtoDzhBlock_BlockObjOutput_getDescriptor();
FOUNDATION_EXPORT ComDzhyunProtoDzhBlock_BlockObjOutput *ComDzhyunProtoDzhBlock_BlockObjOutput_parseFromWithByteArray_withComGoogleProtobufExtensionRegistryLite_(IOSByteArray *bytes, ComGoogleProtobufExtensionRegistryLite *registry);
CGP_ALWAYS_INLINE inline ComDzhyunProtoDzhBlock_BlockObjOutput *ComDzhyunProtoDzhBlock_BlockObjOutput_parseFromWithByteArray_(IOSByteArray *bytes) {
  return ComDzhyunProtoDzhBlock_BlockObjOutput_parseFromWithByteArray_withComGoogleProtobufExtensionRegistryLite_(bytes, nil);
}
FOUNDATION_EXPORT ComDzhyunProtoDzhBlock_BlockObjOutput *ComDzhyunProtoDzhBlock_BlockObjOutput_parseFromWithJavaIoInputStream_withComGoogleProtobufExtensionRegistryLite_(JavaIoInputStream *input, ComGoogleProtobufExtensionRegistryLite *registry);
CGP_ALWAYS_INLINE inline ComDzhyunProtoDzhBlock_BlockObjOutput *ComDzhyunProtoDzhBlock_BlockObjOutput_parseFromWithJavaIoInputStream_(JavaIoInputStream *input) {
  return ComDzhyunProtoDzhBlock_BlockObjOutput_parseFromWithJavaIoInputStream_withComGoogleProtobufExtensionRegistryLite_(input, nil);
}
FOUNDATION_EXPORT ComDzhyunProtoDzhBlock_BlockObjOutput *ComDzhyunProtoDzhBlock_BlockObjOutput_parseDelimitedFromWithJavaIoInputStream_withComGoogleProtobufExtensionRegistryLite_(JavaIoInputStream *input, ComGoogleProtobufExtensionRegistryLite *registry);
CGP_ALWAYS_INLINE inline ComDzhyunProtoDzhBlock_BlockObjOutput *ComDzhyunProtoDzhBlock_BlockObjOutput_parseDelimitedFromWithJavaIoInputStream_(JavaIoInputStream *input) {
  return ComDzhyunProtoDzhBlock_BlockObjOutput_parseDelimitedFromWithJavaIoInputStream_withComGoogleProtobufExtensionRegistryLite_(input, nil);
}

J2OBJC_STATIC_INIT(ComDzhyunProtoDzhBlock_BlockObjOutput)

J2OBJC_TYPE_LITERAL_HEADER(ComDzhyunProtoDzhBlock_BlockObjOutput)

FOUNDATION_EXPORT ComGoogleProtobufDescriptors_Descriptor *ComDzhyunProtoDzhBlock_BlockObjOutput_descriptor_;

@interface ComDzhyunProtoDzhBlock_BlockObjOutput_Builder : ComGoogleProtobufGeneratedMessage_Builder<ComDzhyunProtoDzhBlock_BlockObjOutputOrBuilder>

- (ComDzhyunProtoDzhBlock_BlockObjOutput *)getDefaultInstanceForType;
- (ComDzhyunProtoDzhBlock_BlockObjOutput_Builder *)mergeFromWithComDzhyunProtoDzhBlock_BlockObjOutput:(ComDzhyunProtoDzhBlock_BlockObjOutput *)message;
- (ComDzhyunProtoDzhBlock_BlockObjOutput_Builder *)mergeFromWithComGoogleProtobufMessage:(id<ComGoogleProtobufMessage>)message;
- (ComDzhyunProtoDzhBlock_BlockObjOutput *)build;
- (ComDzhyunProtoDzhBlock_BlockObjOutput *)buildPartial;
+ (ComGoogleProtobufDescriptors_Descriptor *)getDescriptor;
- (ComDzhyunProtoDzhBlock_BlockObjOutput_Builder*)setObjWithInt:(int)index
    withNSString:(NSString *)value;
- (ComDzhyunProtoDzhBlock_BlockObjOutput_Builder*)addObjWithNSString:
    (NSString *)value;
- (ComDzhyunProtoDzhBlock_BlockObjOutput_Builder*)addAllObjWithJavaLangIterable:
    (id<JavaLangIterable>)values;
- (ComDzhyunProtoDzhBlock_BlockObjOutput_Builder*)clearObj;

@end

FOUNDATION_EXPORT ComGoogleProtobufDescriptors_Descriptor *ComDzhyunProtoDzhBlock_BlockObjOutput_Builder_getDescriptor();

J2OBJC_EMPTY_STATIC_INIT(ComDzhyunProtoDzhBlock_BlockObjOutput_Builder)

J2OBJC_TYPE_LITERAL_HEADER(ComDzhyunProtoDzhBlock_BlockObjOutput_Builder)

@protocol ComDzhyunProtoDzhBlock_BlockPropOutputOrBuilder < ComGoogleProtobufMessageOrBuilder >

- (int)getNameCount;
- (id<ComGoogleProtobufProtocolStringList>)getNameList;
- (NSString *)getNameWithInt:(int)index;

@end

J2OBJC_EMPTY_STATIC_INIT(ComDzhyunProtoDzhBlock_BlockPropOutputOrBuilder)

J2OBJC_TYPE_LITERAL_HEADER(ComDzhyunProtoDzhBlock_BlockPropOutputOrBuilder)

@interface ComDzhyunProtoDzhBlock_BlockPropOutput : ComGoogleProtobufGeneratedMessage<ComDzhyunProtoDzhBlock_BlockPropOutputOrBuilder>

+ (ComDzhyunProtoDzhBlock_BlockPropOutput *)getDefaultInstance;
- (ComDzhyunProtoDzhBlock_BlockPropOutput *)getDefaultInstanceForType;
+ (ComDzhyunProtoDzhBlock_BlockPropOutput_Builder *)newBuilder OBJC_METHOD_FAMILY_NONE;
- (ComDzhyunProtoDzhBlock_BlockPropOutput_Builder *)newBuilderForType OBJC_METHOD_FAMILY_NONE;
- (ComDzhyunProtoDzhBlock_BlockPropOutput_Builder *)toBuilder;
+ (ComDzhyunProtoDzhBlock_BlockPropOutput_Builder *)newBuilderWithComDzhyunProtoDzhBlock_BlockPropOutput:(ComDzhyunProtoDzhBlock_BlockPropOutput *)message OBJC_METHOD_FAMILY_NONE;
+ (ComGoogleProtobufDescriptors_Descriptor *)getDescriptor;
+ (ComDzhyunProtoDzhBlock_BlockPropOutput *)parseFromWithByteArray:(IOSByteArray *)bytes;
+ (ComDzhyunProtoDzhBlock_BlockPropOutput *)parseFromWithByteArray:(IOSByteArray *)bytes withComGoogleProtobufExtensionRegistryLite:(ComGoogleProtobufExtensionRegistryLite *)registry;
+ (ComDzhyunProtoDzhBlock_BlockPropOutput *)parseFromNSData:(NSData *)data;
+ (ComDzhyunProtoDzhBlock_BlockPropOutput *)parseFromNSData:(NSData *)data registry:(ComGoogleProtobufExtensionRegistryLite *)registry;
+ (ComDzhyunProtoDzhBlock_BlockPropOutput *)parseFromWithJavaIoInputStream:(JavaIoInputStream *)input;
+ (ComDzhyunProtoDzhBlock_BlockPropOutput *)parseFromWithJavaIoInputStream:(JavaIoInputStream *)bytes withComGoogleProtobufExtensionRegistryLite:(ComGoogleProtobufExtensionRegistryLite *)registry;
+ (ComDzhyunProtoDzhBlock_BlockPropOutput *)parseDelimitedFromWithJavaIoInputStream:(JavaIoInputStream *)input;
+ (ComDzhyunProtoDzhBlock_BlockPropOutput *)parseDelimitedFromWithJavaIoInputStream:(JavaIoInputStream *)bytes withComGoogleProtobufExtensionRegistryLite:(ComGoogleProtobufExtensionRegistryLite *)registry;

#define ComDzhyunProtoDzhBlock_BlockPropOutput_NAME_FIELD_NUMBER 1

@end

FOUNDATION_EXPORT ComDzhyunProtoDzhBlock_BlockPropOutput *ComDzhyunProtoDzhBlock_BlockPropOutput_getDefaultInstance();
FOUNDATION_EXPORT ComDzhyunProtoDzhBlock_BlockPropOutput_Builder *ComDzhyunProtoDzhBlock_BlockPropOutput_newBuilder();
FOUNDATION_EXPORT ComDzhyunProtoDzhBlock_BlockPropOutput_Builder *ComDzhyunProtoDzhBlock_BlockPropOutput_newBuilderWithComDzhyunProtoDzhBlock_BlockPropOutput_(ComDzhyunProtoDzhBlock_BlockPropOutput *message);
FOUNDATION_EXPORT ComGoogleProtobufDescriptors_Descriptor *ComDzhyunProtoDzhBlock_BlockPropOutput_getDescriptor();
FOUNDATION_EXPORT ComDzhyunProtoDzhBlock_BlockPropOutput *ComDzhyunProtoDzhBlock_BlockPropOutput_parseFromWithByteArray_withComGoogleProtobufExtensionRegistryLite_(IOSByteArray *bytes, ComGoogleProtobufExtensionRegistryLite *registry);
CGP_ALWAYS_INLINE inline ComDzhyunProtoDzhBlock_BlockPropOutput *ComDzhyunProtoDzhBlock_BlockPropOutput_parseFromWithByteArray_(IOSByteArray *bytes) {
  return ComDzhyunProtoDzhBlock_BlockPropOutput_parseFromWithByteArray_withComGoogleProtobufExtensionRegistryLite_(bytes, nil);
}
FOUNDATION_EXPORT ComDzhyunProtoDzhBlock_BlockPropOutput *ComDzhyunProtoDzhBlock_BlockPropOutput_parseFromWithJavaIoInputStream_withComGoogleProtobufExtensionRegistryLite_(JavaIoInputStream *input, ComGoogleProtobufExtensionRegistryLite *registry);
CGP_ALWAYS_INLINE inline ComDzhyunProtoDzhBlock_BlockPropOutput *ComDzhyunProtoDzhBlock_BlockPropOutput_parseFromWithJavaIoInputStream_(JavaIoInputStream *input) {
  return ComDzhyunProtoDzhBlock_BlockPropOutput_parseFromWithJavaIoInputStream_withComGoogleProtobufExtensionRegistryLite_(input, nil);
}
FOUNDATION_EXPORT ComDzhyunProtoDzhBlock_BlockPropOutput *ComDzhyunProtoDzhBlock_BlockPropOutput_parseDelimitedFromWithJavaIoInputStream_withComGoogleProtobufExtensionRegistryLite_(JavaIoInputStream *input, ComGoogleProtobufExtensionRegistryLite *registry);
CGP_ALWAYS_INLINE inline ComDzhyunProtoDzhBlock_BlockPropOutput *ComDzhyunProtoDzhBlock_BlockPropOutput_parseDelimitedFromWithJavaIoInputStream_(JavaIoInputStream *input) {
  return ComDzhyunProtoDzhBlock_BlockPropOutput_parseDelimitedFromWithJavaIoInputStream_withComGoogleProtobufExtensionRegistryLite_(input, nil);
}

J2OBJC_STATIC_INIT(ComDzhyunProtoDzhBlock_BlockPropOutput)

J2OBJC_TYPE_LITERAL_HEADER(ComDzhyunProtoDzhBlock_BlockPropOutput)

FOUNDATION_EXPORT ComGoogleProtobufDescriptors_Descriptor *ComDzhyunProtoDzhBlock_BlockPropOutput_descriptor_;

@interface ComDzhyunProtoDzhBlock_BlockPropOutput_Builder : ComGoogleProtobufGeneratedMessage_Builder<ComDzhyunProtoDzhBlock_BlockPropOutputOrBuilder>

- (ComDzhyunProtoDzhBlock_BlockPropOutput *)getDefaultInstanceForType;
- (ComDzhyunProtoDzhBlock_BlockPropOutput_Builder *)mergeFromWithComDzhyunProtoDzhBlock_BlockPropOutput:(ComDzhyunProtoDzhBlock_BlockPropOutput *)message;
- (ComDzhyunProtoDzhBlock_BlockPropOutput_Builder *)mergeFromWithComGoogleProtobufMessage:(id<ComGoogleProtobufMessage>)message;
- (ComDzhyunProtoDzhBlock_BlockPropOutput *)build;
- (ComDzhyunProtoDzhBlock_BlockPropOutput *)buildPartial;
+ (ComGoogleProtobufDescriptors_Descriptor *)getDescriptor;
- (ComDzhyunProtoDzhBlock_BlockPropOutput_Builder*)setNameWithInt:(int)index
    withNSString:(NSString *)value;
- (ComDzhyunProtoDzhBlock_BlockPropOutput_Builder*)addNameWithNSString:
    (NSString *)value;
- (ComDzhyunProtoDzhBlock_BlockPropOutput_Builder*)addAllNameWithJavaLangIterable:
    (id<JavaLangIterable>)values;
- (ComDzhyunProtoDzhBlock_BlockPropOutput_Builder*)clearName;

@end

FOUNDATION_EXPORT ComGoogleProtobufDescriptors_Descriptor *ComDzhyunProtoDzhBlock_BlockPropOutput_Builder_getDescriptor();

J2OBJC_EMPTY_STATIC_INIT(ComDzhyunProtoDzhBlock_BlockPropOutput_Builder)

J2OBJC_TYPE_LITERAL_HEADER(ComDzhyunProtoDzhBlock_BlockPropOutput_Builder)
