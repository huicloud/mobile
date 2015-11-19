#!/bin/sh
export J2OBJC_CLASSPATH=./android/build/intermediates/classes/release:./android/libs/protobuf_runtime.jar

~/Library/J2Objc/j2objc -classpath ${J2OBJC_CLASSPATH}  ./android/src/main/java/com/dzhyun/sdk/Pb2Json.java
~/Library/J2Objc/j2objc -classpath ${J2OBJC_CLASSPATH}  ./android/src/main/java/com/dzhyun/sdk/YFloat.java
~/Library/J2Objc/j2objc -use-arc -classpath ${J2OBJC_CLASSPATH}  ./android/src/main/java/com/dzhyun/sdk/ZLibUtils.java
