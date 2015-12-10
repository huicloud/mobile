// Generated by the protocol buffer compiler.  DO NOT EDIT!
// source: dzhflux.proto

#import "J2ObjC_source.h"
#import "com/dzhyun/proto/Dzhflux.h"
#import "com/google/protobuf/Descriptors_PackagePrivate.h"
#import "com/google/protobuf/ExtensionRegistry.h"
#import "com/google/protobuf/GeneratedMessage_PackagePrivate.h"
#import "com/google/protobuf/RepeatedField.h"
#import "java/lang/IllegalArgumentException.h"

#pragma GCC diagnostic ignored "-Wprotocol"
#pragma clang diagnostic ignored "-Wprotocol"
#pragma GCC diagnostic ignored "-Wincomplete-implementation"
#pragma clang diagnostic ignored "-Wincomplete-implementation"

@implementation ComDzhyunProtoDzhflux

+ (void)registerAllExtensionsWithComGoogleProtobufExtensionRegistry:(ComGoogleProtobufExtensionRegistry *)extensionRegistry {
  ComDzhyunProtoDzhflux_registerAllExtensionsWithComGoogleProtobufExtensionRegistry_(extensionRegistry);
}

@end

J2OBJC_CLASS_TYPE_LITERAL_SOURCE(ComDzhyunProtoDzhflux)

void ComDzhyunProtoDzhflux_registerAllExtensionsWithComGoogleProtobufExtensionRegistry_(ComGoogleProtobufExtensionRegistry *extensionRegistry) {
}

J2OBJC_INITIALIZED_DEFN(ComDzhyunProtoDzhflux_FluxValue);

ComGoogleProtobufDescriptors_Descriptor *ComDzhyunProtoDzhflux_FluxValue_descriptor_;

@implementation ComDzhyunProtoDzhflux_FluxValue

typedef struct ComDzhyunProtoDzhflux_FluxValue_Storage {
  uint32_t hasBits[1];
  NSString *appid_;
  NSString *flux_;
} ComDzhyunProtoDzhflux_FluxValue_Storage;

+ (ComGoogleProtobufDescriptors_Descriptor *)getDescriptor {
  return ComDzhyunProtoDzhflux_FluxValue_descriptor_;
}

+ (void)initialize {
  if (self == [ComDzhyunProtoDzhflux_FluxValue class]) {
    static CGPFieldData fields[] = {
      {
        .name = "Appid",
        .javaName = "Appid",
        .number = 1,
        .flags = CGPFieldFlagRequired,
        .type = ComGoogleProtobufDescriptors_FieldDescriptor_Type_STRING,
        .defaultValue.valueId = @"",
        .hasBitIndex = 0,
        .offset = offsetof(ComDzhyunProtoDzhflux_FluxValue_Storage, appid_),
        .className = NULL,
        .containingType = "ComDzhyunProtoDzhflux_FluxValue",
        .optionsData = NULL,
      },
      {
        .name = "Flux",
        .javaName = "Flux",
        .number = 2,
        .flags = CGPFieldFlagRequired,
        .type = ComGoogleProtobufDescriptors_FieldDescriptor_Type_STRING,
        .defaultValue.valueId = @"",
        .hasBitIndex = 1,
        .offset = offsetof(ComDzhyunProtoDzhflux_FluxValue_Storage, flux_),
        .className = NULL,
        .containingType = "ComDzhyunProtoDzhflux_FluxValue",
        .optionsData = NULL,
      },
    };
    CGPInitDescriptor(&ComDzhyunProtoDzhflux_FluxValue_descriptor_, self, [ComDzhyunProtoDzhflux_FluxValue_Builder class], 0, sizeof(ComDzhyunProtoDzhflux_FluxValue_Storage), 2, fields);
    J2OBJC_SET_INITIALIZED(ComDzhyunProtoDzhflux_FluxValue)
  }
}

@end

J2OBJC_CLASS_TYPE_LITERAL_SOURCE(ComDzhyunProtoDzhflux_FluxValue)

ComDzhyunProtoDzhflux_FluxValue *ComDzhyunProtoDzhflux_FluxValue_getDefaultInstance() {
  ComDzhyunProtoDzhflux_FluxValue_initialize();
  return (ComDzhyunProtoDzhflux_FluxValue *)[CGPNewMessage(ComDzhyunProtoDzhflux_FluxValue_descriptor_) autorelease];
}

ComDzhyunProtoDzhflux_FluxValue_Builder *ComDzhyunProtoDzhflux_FluxValue_newBuilder() {
  ComDzhyunProtoDzhflux_FluxValue_initialize();
  return (ComDzhyunProtoDzhflux_FluxValue_Builder *)[CGPNewBuilder(ComDzhyunProtoDzhflux_FluxValue_descriptor_) autorelease];
}

ComDzhyunProtoDzhflux_FluxValue_Builder *ComDzhyunProtoDzhflux_FluxValue_newBuilderWithComDzhyunProtoDzhflux_FluxValue_(ComDzhyunProtoDzhflux_FluxValue *message) {
  ComDzhyunProtoDzhflux_FluxValue_initialize();
  return (ComDzhyunProtoDzhflux_FluxValue_Builder *)CGPBuilderFromPrototype(ComDzhyunProtoDzhflux_FluxValue_descriptor_, message);
}

ComGoogleProtobufDescriptors_Descriptor *ComDzhyunProtoDzhflux_FluxValue_getDescriptor() {
  ComDzhyunProtoDzhflux_FluxValue_initialize();
  return ComDzhyunProtoDzhflux_FluxValue_descriptor_;
}

ComDzhyunProtoDzhflux_FluxValue *ComDzhyunProtoDzhflux_FluxValue_parseFromWithByteArray_withComGoogleProtobufExtensionRegistryLite_(IOSByteArray *bytes, ComGoogleProtobufExtensionRegistryLite *registry) {
  ComDzhyunProtoDzhflux_FluxValue_initialize();
  return (ComDzhyunProtoDzhflux_FluxValue *)CGPParseFromByteArray(ComDzhyunProtoDzhflux_FluxValue_descriptor_, bytes, registry);
}

ComDzhyunProtoDzhflux_FluxValue *ComDzhyunProtoDzhflux_FluxValue_parseFromWithJavaIoInputStream_withComGoogleProtobufExtensionRegistryLite_(JavaIoInputStream *input, ComGoogleProtobufExtensionRegistryLite *registry) {
  ComDzhyunProtoDzhflux_FluxValue_initialize();
  return (ComDzhyunProtoDzhflux_FluxValue *)CGPParseFromInputStream(ComDzhyunProtoDzhflux_FluxValue_descriptor_, input, registry);
}
ComDzhyunProtoDzhflux_FluxValue *ComDzhyunProtoDzhflux_FluxValue_parseDelimitedFromWithJavaIoInputStream_withComGoogleProtobufExtensionRegistryLite_(JavaIoInputStream *input, ComGoogleProtobufExtensionRegistryLite *registry) {
  ComDzhyunProtoDzhflux_FluxValue_initialize();
  return (ComDzhyunProtoDzhflux_FluxValue *)CGPParseDelimitedFromInputStream(ComDzhyunProtoDzhflux_FluxValue_descriptor_, input, registry);
}

@implementation ComDzhyunProtoDzhflux_FluxValue_Builder

+ (ComGoogleProtobufDescriptors_Descriptor *)getDescriptor {
  return [ComDzhyunProtoDzhflux_FluxValue getDescriptor];
}

@end

J2OBJC_CLASS_TYPE_LITERAL_SOURCE(ComDzhyunProtoDzhflux_FluxValue_Builder)
J2OBJC_INTERFACE_TYPE_LITERAL_SOURCE(ComDzhyunProtoDzhflux_FluxValueOrBuilder)

ComGoogleProtobufDescriptors_Descriptor *ComDzhyunProtoDzhflux_FluxValue_Builder_getDescriptor() {
  ComDzhyunProtoDzhflux_FluxValue_initialize();
  return ComDzhyunProtoDzhflux_FluxValue_descriptor_;
}