// Generated by the protocol buffer compiler.  DO NOT EDIT!
// source: dzhpriv.proto

#import "J2ObjC_source.h"
#import "com/dzhyun/proto/Dzhpriv.h"
#import "com/google/protobuf/Descriptors_PackagePrivate.h"
#import "com/google/protobuf/ExtensionRegistry.h"
#import "com/google/protobuf/GeneratedMessage_PackagePrivate.h"
#import "com/google/protobuf/RepeatedField.h"
#import "java/lang/IllegalArgumentException.h"

#pragma GCC diagnostic ignored "-Wprotocol"
#pragma clang diagnostic ignored "-Wprotocol"
#pragma GCC diagnostic ignored "-Wincomplete-implementation"
#pragma clang diagnostic ignored "-Wincomplete-implementation"

@implementation ComDzhyunProtoDzhpriv

+ (void)registerAllExtensionsWithComGoogleProtobufExtensionRegistry:(ComGoogleProtobufExtensionRegistry *)extensionRegistry {
  ComDzhyunProtoDzhpriv_registerAllExtensionsWithComGoogleProtobufExtensionRegistry_(extensionRegistry);
}

@end

J2OBJC_CLASS_TYPE_LITERAL_SOURCE(ComDzhyunProtoDzhpriv)

void ComDzhyunProtoDzhpriv_registerAllExtensionsWithComGoogleProtobufExtensionRegistry_(ComGoogleProtobufExtensionRegistry *extensionRegistry) {
}

J2OBJC_INITIALIZED_DEFN(ComDzhyunProtoDzhpriv_Privilege);

ComGoogleProtobufDescriptors_Descriptor *ComDzhyunProtoDzhpriv_Privilege_descriptor_;

@implementation ComDzhyunProtoDzhpriv_Privilege

typedef struct ComDzhyunProtoDzhpriv_Privilege_Storage {
  uint32_t hasBits[1];
  NSString *keyWord_;
  NSString *shortName_;
  int position_;
  NSString *attribute_;
  NSString *value_;
  NSString *description_;
} ComDzhyunProtoDzhpriv_Privilege_Storage;

+ (ComGoogleProtobufDescriptors_Descriptor *)getDescriptor {
  return ComDzhyunProtoDzhpriv_Privilege_descriptor_;
}

+ (void)initialize {
  if (self == [ComDzhyunProtoDzhpriv_Privilege class]) {
    static CGPFieldData fields[] = {
      {
        .name = "key_word",
        .javaName = "KeyWord",
        .number = 1,
        .flags = CGPFieldFlagRequired,
        .type = ComGoogleProtobufDescriptors_FieldDescriptor_Type_STRING,
        .defaultValue.valueId = @"",
        .hasBitIndex = 0,
        .offset = offsetof(ComDzhyunProtoDzhpriv_Privilege_Storage, keyWord_),
        .className = NULL,
        .containingType = "ComDzhyunProtoDzhpriv_Privilege",
        .optionsData = NULL,
      },
      {
        .name = "short_name",
        .javaName = "ShortName",
        .number = 2,
        .flags = CGPFieldFlagRequired,
        .type = ComGoogleProtobufDescriptors_FieldDescriptor_Type_STRING,
        .defaultValue.valueId = @"",
        .hasBitIndex = 1,
        .offset = offsetof(ComDzhyunProtoDzhpriv_Privilege_Storage, shortName_),
        .className = NULL,
        .containingType = "ComDzhyunProtoDzhpriv_Privilege",
        .optionsData = NULL,
      },
      {
        .name = "position",
        .javaName = "Position",
        .number = 3,
        .flags = CGPFieldFlagRequired,
        .type = ComGoogleProtobufDescriptors_FieldDescriptor_Type_UINT32,
        .defaultValue.valueInt = 0,
        .hasBitIndex = 2,
        .offset = offsetof(ComDzhyunProtoDzhpriv_Privilege_Storage, position_),
        .className = NULL,
        .containingType = "ComDzhyunProtoDzhpriv_Privilege",
        .optionsData = NULL,
      },
      {
        .name = "attribute",
        .javaName = "Attribute",
        .number = 4,
        .flags = CGPFieldFlagRequired,
        .type = ComGoogleProtobufDescriptors_FieldDescriptor_Type_STRING,
        .defaultValue.valueId = @"",
        .hasBitIndex = 3,
        .offset = offsetof(ComDzhyunProtoDzhpriv_Privilege_Storage, attribute_),
        .className = NULL,
        .containingType = "ComDzhyunProtoDzhpriv_Privilege",
        .optionsData = NULL,
      },
      {
        .name = "value",
        .javaName = "Value",
        .number = 5,
        .flags = CGPFieldFlagRequired,
        .type = ComGoogleProtobufDescriptors_FieldDescriptor_Type_STRING,
        .defaultValue.valueId = @"",
        .hasBitIndex = 4,
        .offset = offsetof(ComDzhyunProtoDzhpriv_Privilege_Storage, value_),
        .className = NULL,
        .containingType = "ComDzhyunProtoDzhpriv_Privilege",
        .optionsData = NULL,
      },
      {
        .name = "description",
        .javaName = "Description",
        .number = 6,
        .flags = 0,
        .type = ComGoogleProtobufDescriptors_FieldDescriptor_Type_STRING,
        .defaultValue.valueId = @"",
        .hasBitIndex = 5,
        .offset = offsetof(ComDzhyunProtoDzhpriv_Privilege_Storage, description_),
        .className = NULL,
        .containingType = "ComDzhyunProtoDzhpriv_Privilege",
        .optionsData = NULL,
      },
    };
    CGPInitDescriptor(&ComDzhyunProtoDzhpriv_Privilege_descriptor_, self, [ComDzhyunProtoDzhpriv_Privilege_Builder class], 0, sizeof(ComDzhyunProtoDzhpriv_Privilege_Storage), 6, fields);
    J2OBJC_SET_INITIALIZED(ComDzhyunProtoDzhpriv_Privilege)
  }
}

@end

J2OBJC_CLASS_TYPE_LITERAL_SOURCE(ComDzhyunProtoDzhpriv_Privilege)

ComDzhyunProtoDzhpriv_Privilege *ComDzhyunProtoDzhpriv_Privilege_getDefaultInstance() {
  ComDzhyunProtoDzhpriv_Privilege_initialize();
  return (ComDzhyunProtoDzhpriv_Privilege *)[CGPNewMessage(ComDzhyunProtoDzhpriv_Privilege_descriptor_) autorelease];
}

ComDzhyunProtoDzhpriv_Privilege_Builder *ComDzhyunProtoDzhpriv_Privilege_newBuilder() {
  ComDzhyunProtoDzhpriv_Privilege_initialize();
  return (ComDzhyunProtoDzhpriv_Privilege_Builder *)[CGPNewBuilder(ComDzhyunProtoDzhpriv_Privilege_descriptor_) autorelease];
}

ComDzhyunProtoDzhpriv_Privilege_Builder *ComDzhyunProtoDzhpriv_Privilege_newBuilderWithComDzhyunProtoDzhpriv_Privilege_(ComDzhyunProtoDzhpriv_Privilege *message) {
  ComDzhyunProtoDzhpriv_Privilege_initialize();
  return (ComDzhyunProtoDzhpriv_Privilege_Builder *)CGPBuilderFromPrototype(ComDzhyunProtoDzhpriv_Privilege_descriptor_, message);
}

ComGoogleProtobufDescriptors_Descriptor *ComDzhyunProtoDzhpriv_Privilege_getDescriptor() {
  ComDzhyunProtoDzhpriv_Privilege_initialize();
  return ComDzhyunProtoDzhpriv_Privilege_descriptor_;
}

ComDzhyunProtoDzhpriv_Privilege *ComDzhyunProtoDzhpriv_Privilege_parseFromWithByteArray_withComGoogleProtobufExtensionRegistryLite_(IOSByteArray *bytes, ComGoogleProtobufExtensionRegistryLite *registry) {
  ComDzhyunProtoDzhpriv_Privilege_initialize();
  return (ComDzhyunProtoDzhpriv_Privilege *)CGPParseFromByteArray(ComDzhyunProtoDzhpriv_Privilege_descriptor_, bytes, registry);
}

ComDzhyunProtoDzhpriv_Privilege *ComDzhyunProtoDzhpriv_Privilege_parseFromWithJavaIoInputStream_withComGoogleProtobufExtensionRegistryLite_(JavaIoInputStream *input, ComGoogleProtobufExtensionRegistryLite *registry) {
  ComDzhyunProtoDzhpriv_Privilege_initialize();
  return (ComDzhyunProtoDzhpriv_Privilege *)CGPParseFromInputStream(ComDzhyunProtoDzhpriv_Privilege_descriptor_, input, registry);
}
ComDzhyunProtoDzhpriv_Privilege *ComDzhyunProtoDzhpriv_Privilege_parseDelimitedFromWithJavaIoInputStream_withComGoogleProtobufExtensionRegistryLite_(JavaIoInputStream *input, ComGoogleProtobufExtensionRegistryLite *registry) {
  ComDzhyunProtoDzhpriv_Privilege_initialize();
  return (ComDzhyunProtoDzhpriv_Privilege *)CGPParseDelimitedFromInputStream(ComDzhyunProtoDzhpriv_Privilege_descriptor_, input, registry);
}

@implementation ComDzhyunProtoDzhpriv_Privilege_Builder

+ (ComGoogleProtobufDescriptors_Descriptor *)getDescriptor {
  return [ComDzhyunProtoDzhpriv_Privilege getDescriptor];
}

@end

J2OBJC_CLASS_TYPE_LITERAL_SOURCE(ComDzhyunProtoDzhpriv_Privilege_Builder)
J2OBJC_INTERFACE_TYPE_LITERAL_SOURCE(ComDzhyunProtoDzhpriv_PrivilegeOrBuilder)

ComGoogleProtobufDescriptors_Descriptor *ComDzhyunProtoDzhpriv_Privilege_Builder_getDescriptor() {
  ComDzhyunProtoDzhpriv_Privilege_initialize();
  return ComDzhyunProtoDzhpriv_Privilege_descriptor_;
}

J2OBJC_INITIALIZED_DEFN(ComDzhyunProtoDzhpriv_Privileges);

ComGoogleProtobufDescriptors_Descriptor *ComDzhyunProtoDzhpriv_Privileges_descriptor_;

@implementation ComDzhyunProtoDzhpriv_Privileges

typedef struct ComDzhyunProtoDzhpriv_Privileges_Storage {
  uint32_t hasBits[0];
  CGPRepeatedField items_;
} ComDzhyunProtoDzhpriv_Privileges_Storage;

+ (ComGoogleProtobufDescriptors_Descriptor *)getDescriptor {
  return ComDzhyunProtoDzhpriv_Privileges_descriptor_;
}

+ (void)initialize {
  if (self == [ComDzhyunProtoDzhpriv_Privileges class]) {
    static CGPFieldData fields[] = {
      {
        .name = "items",
        .javaName = "Items",
        .number = 1,
        .flags = CGPFieldFlagRepeated,
        .type = ComGoogleProtobufDescriptors_FieldDescriptor_Type_MESSAGE,
        .defaultValue.valueId = nil,
        .hasBitIndex = 0,
        .offset = offsetof(ComDzhyunProtoDzhpriv_Privileges_Storage, items_),
        .className = "ComDzhyunProtoDzhpriv_Privilege",
        .containingType = "ComDzhyunProtoDzhpriv_Privileges",
        .optionsData = NULL,
      },
    };
    CGPInitDescriptor(&ComDzhyunProtoDzhpriv_Privileges_descriptor_, self, [ComDzhyunProtoDzhpriv_Privileges_Builder class], 0, sizeof(ComDzhyunProtoDzhpriv_Privileges_Storage), 1, fields);
    J2OBJC_SET_INITIALIZED(ComDzhyunProtoDzhpriv_Privileges)
  }
}

@end

J2OBJC_CLASS_TYPE_LITERAL_SOURCE(ComDzhyunProtoDzhpriv_Privileges)

ComDzhyunProtoDzhpriv_Privileges *ComDzhyunProtoDzhpriv_Privileges_getDefaultInstance() {
  ComDzhyunProtoDzhpriv_Privileges_initialize();
  return (ComDzhyunProtoDzhpriv_Privileges *)[CGPNewMessage(ComDzhyunProtoDzhpriv_Privileges_descriptor_) autorelease];
}

ComDzhyunProtoDzhpriv_Privileges_Builder *ComDzhyunProtoDzhpriv_Privileges_newBuilder() {
  ComDzhyunProtoDzhpriv_Privileges_initialize();
  return (ComDzhyunProtoDzhpriv_Privileges_Builder *)[CGPNewBuilder(ComDzhyunProtoDzhpriv_Privileges_descriptor_) autorelease];
}

ComDzhyunProtoDzhpriv_Privileges_Builder *ComDzhyunProtoDzhpriv_Privileges_newBuilderWithComDzhyunProtoDzhpriv_Privileges_(ComDzhyunProtoDzhpriv_Privileges *message) {
  ComDzhyunProtoDzhpriv_Privileges_initialize();
  return (ComDzhyunProtoDzhpriv_Privileges_Builder *)CGPBuilderFromPrototype(ComDzhyunProtoDzhpriv_Privileges_descriptor_, message);
}

ComGoogleProtobufDescriptors_Descriptor *ComDzhyunProtoDzhpriv_Privileges_getDescriptor() {
  ComDzhyunProtoDzhpriv_Privileges_initialize();
  return ComDzhyunProtoDzhpriv_Privileges_descriptor_;
}

ComDzhyunProtoDzhpriv_Privileges *ComDzhyunProtoDzhpriv_Privileges_parseFromWithByteArray_withComGoogleProtobufExtensionRegistryLite_(IOSByteArray *bytes, ComGoogleProtobufExtensionRegistryLite *registry) {
  ComDzhyunProtoDzhpriv_Privileges_initialize();
  return (ComDzhyunProtoDzhpriv_Privileges *)CGPParseFromByteArray(ComDzhyunProtoDzhpriv_Privileges_descriptor_, bytes, registry);
}

ComDzhyunProtoDzhpriv_Privileges *ComDzhyunProtoDzhpriv_Privileges_parseFromWithJavaIoInputStream_withComGoogleProtobufExtensionRegistryLite_(JavaIoInputStream *input, ComGoogleProtobufExtensionRegistryLite *registry) {
  ComDzhyunProtoDzhpriv_Privileges_initialize();
  return (ComDzhyunProtoDzhpriv_Privileges *)CGPParseFromInputStream(ComDzhyunProtoDzhpriv_Privileges_descriptor_, input, registry);
}
ComDzhyunProtoDzhpriv_Privileges *ComDzhyunProtoDzhpriv_Privileges_parseDelimitedFromWithJavaIoInputStream_withComGoogleProtobufExtensionRegistryLite_(JavaIoInputStream *input, ComGoogleProtobufExtensionRegistryLite *registry) {
  ComDzhyunProtoDzhpriv_Privileges_initialize();
  return (ComDzhyunProtoDzhpriv_Privileges *)CGPParseDelimitedFromInputStream(ComDzhyunProtoDzhpriv_Privileges_descriptor_, input, registry);
}

@implementation ComDzhyunProtoDzhpriv_Privileges_Builder

+ (ComGoogleProtobufDescriptors_Descriptor *)getDescriptor {
  return [ComDzhyunProtoDzhpriv_Privileges getDescriptor];
}

@end

J2OBJC_CLASS_TYPE_LITERAL_SOURCE(ComDzhyunProtoDzhpriv_Privileges_Builder)
J2OBJC_INTERFACE_TYPE_LITERAL_SOURCE(ComDzhyunProtoDzhpriv_PrivilegesOrBuilder)

ComGoogleProtobufDescriptors_Descriptor *ComDzhyunProtoDzhpriv_Privileges_Builder_getDescriptor() {
  ComDzhyunProtoDzhpriv_Privileges_initialize();
  return ComDzhyunProtoDzhpriv_Privileges_descriptor_;
}