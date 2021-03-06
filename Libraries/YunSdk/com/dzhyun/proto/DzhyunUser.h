// Generated by the protocol buffer compiler.  DO NOT EDIT!
// source: dzhyun.user.proto

#import "J2ObjC_header.h"
#import "com/google/protobuf/GeneratedMessage.h"
#import "com/google/protobuf/MessageOrBuilder.h"
#import "com/google/protobuf/ProtocolMessageEnum.h"
#import "com/google/protobuf/ProtocolStringList.h"
#import "java/lang/Enum.h"

@class ComDzhyunProtoDzhyunUser_UserInfo_Builder;
@class ComGoogleProtobufDescriptors_Descriptor;
@class ComGoogleProtobufExtensionRegistry;
@protocol ComGoogleProtobufProtocolStringList;
@protocol JavaLangIterable;

@interface ComDzhyunProtoDzhyunUser : NSObject

+ (void)registerAllExtensionsWithComGoogleProtobufExtensionRegistry:(ComGoogleProtobufExtensionRegistry *)extensionRegistry;

@end

FOUNDATION_EXPORT void ComDzhyunProtoDzhyunUser_registerAllExtensionsWithComGoogleProtobufExtensionRegistry_(ComGoogleProtobufExtensionRegistry *extensionRegistry);

J2OBJC_EMPTY_STATIC_INIT(ComDzhyunProtoDzhyunUser)

J2OBJC_TYPE_LITERAL_HEADER(ComDzhyunProtoDzhyunUser)

@protocol ComDzhyunProtoDzhyunUser_UserInfoOrBuilder < ComGoogleProtobufMessageOrBuilder >

- (BOOL)hasObject;
- (NSString *)getObject;

- (BOOL)hasPropVersion;
- (NSString *)getPropVersion;

- (int)getGroupsCount;
- (id<ComGoogleProtobufProtocolStringList>)getGroupsList;
- (NSString *)getGroupsWithInt:(int)index;

@end

J2OBJC_EMPTY_STATIC_INIT(ComDzhyunProtoDzhyunUser_UserInfoOrBuilder)

J2OBJC_TYPE_LITERAL_HEADER(ComDzhyunProtoDzhyunUser_UserInfoOrBuilder)

@interface ComDzhyunProtoDzhyunUser_UserInfo : ComGoogleProtobufGeneratedMessage<ComDzhyunProtoDzhyunUser_UserInfoOrBuilder>

+ (ComDzhyunProtoDzhyunUser_UserInfo *)getDefaultInstance;
- (ComDzhyunProtoDzhyunUser_UserInfo *)getDefaultInstanceForType;
+ (ComDzhyunProtoDzhyunUser_UserInfo_Builder *)newBuilder OBJC_METHOD_FAMILY_NONE;
- (ComDzhyunProtoDzhyunUser_UserInfo_Builder *)newBuilderForType OBJC_METHOD_FAMILY_NONE;
- (ComDzhyunProtoDzhyunUser_UserInfo_Builder *)toBuilder;
+ (ComDzhyunProtoDzhyunUser_UserInfo_Builder *)newBuilderWithComDzhyunProtoDzhyunUser_UserInfo:(ComDzhyunProtoDzhyunUser_UserInfo *)message OBJC_METHOD_FAMILY_NONE;
+ (ComGoogleProtobufDescriptors_Descriptor *)getDescriptor;
+ (ComDzhyunProtoDzhyunUser_UserInfo *)parseFromWithByteArray:(IOSByteArray *)bytes;
+ (ComDzhyunProtoDzhyunUser_UserInfo *)parseFromWithByteArray:(IOSByteArray *)bytes withComGoogleProtobufExtensionRegistryLite:(ComGoogleProtobufExtensionRegistryLite *)registry;
+ (ComDzhyunProtoDzhyunUser_UserInfo *)parseFromNSData:(NSData *)data;
+ (ComDzhyunProtoDzhyunUser_UserInfo *)parseFromNSData:(NSData *)data registry:(ComGoogleProtobufExtensionRegistryLite *)registry;
+ (ComDzhyunProtoDzhyunUser_UserInfo *)parseFromWithJavaIoInputStream:(JavaIoInputStream *)input;
+ (ComDzhyunProtoDzhyunUser_UserInfo *)parseFromWithJavaIoInputStream:(JavaIoInputStream *)bytes withComGoogleProtobufExtensionRegistryLite:(ComGoogleProtobufExtensionRegistryLite *)registry;
+ (ComDzhyunProtoDzhyunUser_UserInfo *)parseDelimitedFromWithJavaIoInputStream:(JavaIoInputStream *)input;
+ (ComDzhyunProtoDzhyunUser_UserInfo *)parseDelimitedFromWithJavaIoInputStream:(JavaIoInputStream *)bytes withComGoogleProtobufExtensionRegistryLite:(ComGoogleProtobufExtensionRegistryLite *)registry;

#define ComDzhyunProtoDzhyunUser_UserInfo_OBJECT_FIELD_NUMBER 1
#define ComDzhyunProtoDzhyunUser_UserInfo_PROPVERSION_FIELD_NUMBER 2
#define ComDzhyunProtoDzhyunUser_UserInfo_GROUPS_FIELD_NUMBER 3

@end

FOUNDATION_EXPORT ComDzhyunProtoDzhyunUser_UserInfo *ComDzhyunProtoDzhyunUser_UserInfo_getDefaultInstance();
FOUNDATION_EXPORT ComDzhyunProtoDzhyunUser_UserInfo_Builder *ComDzhyunProtoDzhyunUser_UserInfo_newBuilder();
FOUNDATION_EXPORT ComDzhyunProtoDzhyunUser_UserInfo_Builder *ComDzhyunProtoDzhyunUser_UserInfo_newBuilderWithComDzhyunProtoDzhyunUser_UserInfo_(ComDzhyunProtoDzhyunUser_UserInfo *message);
FOUNDATION_EXPORT ComGoogleProtobufDescriptors_Descriptor *ComDzhyunProtoDzhyunUser_UserInfo_getDescriptor();
FOUNDATION_EXPORT ComDzhyunProtoDzhyunUser_UserInfo *ComDzhyunProtoDzhyunUser_UserInfo_parseFromWithByteArray_withComGoogleProtobufExtensionRegistryLite_(IOSByteArray *bytes, ComGoogleProtobufExtensionRegistryLite *registry);
CGP_ALWAYS_INLINE inline ComDzhyunProtoDzhyunUser_UserInfo *ComDzhyunProtoDzhyunUser_UserInfo_parseFromWithByteArray_(IOSByteArray *bytes) {
  return ComDzhyunProtoDzhyunUser_UserInfo_parseFromWithByteArray_withComGoogleProtobufExtensionRegistryLite_(bytes, nil);
}
FOUNDATION_EXPORT ComDzhyunProtoDzhyunUser_UserInfo *ComDzhyunProtoDzhyunUser_UserInfo_parseFromWithJavaIoInputStream_withComGoogleProtobufExtensionRegistryLite_(JavaIoInputStream *input, ComGoogleProtobufExtensionRegistryLite *registry);
CGP_ALWAYS_INLINE inline ComDzhyunProtoDzhyunUser_UserInfo *ComDzhyunProtoDzhyunUser_UserInfo_parseFromWithJavaIoInputStream_(JavaIoInputStream *input) {
  return ComDzhyunProtoDzhyunUser_UserInfo_parseFromWithJavaIoInputStream_withComGoogleProtobufExtensionRegistryLite_(input, nil);
}
FOUNDATION_EXPORT ComDzhyunProtoDzhyunUser_UserInfo *ComDzhyunProtoDzhyunUser_UserInfo_parseDelimitedFromWithJavaIoInputStream_withComGoogleProtobufExtensionRegistryLite_(JavaIoInputStream *input, ComGoogleProtobufExtensionRegistryLite *registry);
CGP_ALWAYS_INLINE inline ComDzhyunProtoDzhyunUser_UserInfo *ComDzhyunProtoDzhyunUser_UserInfo_parseDelimitedFromWithJavaIoInputStream_(JavaIoInputStream *input) {
  return ComDzhyunProtoDzhyunUser_UserInfo_parseDelimitedFromWithJavaIoInputStream_withComGoogleProtobufExtensionRegistryLite_(input, nil);
}

J2OBJC_STATIC_INIT(ComDzhyunProtoDzhyunUser_UserInfo)

J2OBJC_TYPE_LITERAL_HEADER(ComDzhyunProtoDzhyunUser_UserInfo)

FOUNDATION_EXPORT ComGoogleProtobufDescriptors_Descriptor *ComDzhyunProtoDzhyunUser_UserInfo_descriptor_;

@interface ComDzhyunProtoDzhyunUser_UserInfo_Builder : ComGoogleProtobufGeneratedMessage_Builder<ComDzhyunProtoDzhyunUser_UserInfoOrBuilder>

- (ComDzhyunProtoDzhyunUser_UserInfo *)getDefaultInstanceForType;
- (ComDzhyunProtoDzhyunUser_UserInfo_Builder *)mergeFromWithComDzhyunProtoDzhyunUser_UserInfo:(ComDzhyunProtoDzhyunUser_UserInfo *)message;
- (ComDzhyunProtoDzhyunUser_UserInfo_Builder *)mergeFromWithComGoogleProtobufMessage:(id<ComGoogleProtobufMessage>)message;
- (ComDzhyunProtoDzhyunUser_UserInfo *)build;
- (ComDzhyunProtoDzhyunUser_UserInfo *)buildPartial;
+ (ComGoogleProtobufDescriptors_Descriptor *)getDescriptor;

- (ComDzhyunProtoDzhyunUser_UserInfo_Builder *)setObjectWithNSString:
    (NSString *)value;
- (ComDzhyunProtoDzhyunUser_UserInfo_Builder *)clearObject;

- (ComDzhyunProtoDzhyunUser_UserInfo_Builder *)setPropVersionWithNSString:
    (NSString *)value;
- (ComDzhyunProtoDzhyunUser_UserInfo_Builder *)clearPropVersion;
- (ComDzhyunProtoDzhyunUser_UserInfo_Builder*)setGroupsWithInt:(int)index
    withNSString:(NSString *)value;
- (ComDzhyunProtoDzhyunUser_UserInfo_Builder*)addGroupsWithNSString:
    (NSString *)value;
- (ComDzhyunProtoDzhyunUser_UserInfo_Builder*)addAllGroupsWithJavaLangIterable:
    (id<JavaLangIterable>)values;
- (ComDzhyunProtoDzhyunUser_UserInfo_Builder*)clearGroups;

@end

FOUNDATION_EXPORT ComGoogleProtobufDescriptors_Descriptor *ComDzhyunProtoDzhyunUser_UserInfo_Builder_getDescriptor();

J2OBJC_EMPTY_STATIC_INIT(ComDzhyunProtoDzhyunUser_UserInfo_Builder)

J2OBJC_TYPE_LITERAL_HEADER(ComDzhyunProtoDzhyunUser_UserInfo_Builder)
