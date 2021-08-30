// source: tendermint/libs/bits/types.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('proto.tendermint.libs.bits.BitArray', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.tendermint.libs.bits.BitArray = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.tendermint.libs.bits.BitArray.repeatedFields_, null);
};
goog.inherits(proto.tendermint.libs.bits.BitArray, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.tendermint.libs.bits.BitArray.displayName = 'proto.tendermint.libs.bits.BitArray';
}

/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.tendermint.libs.bits.BitArray.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.tendermint.libs.bits.BitArray.prototype.toObject = function(opt_includeInstance) {
  return proto.tendermint.libs.bits.BitArray.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.tendermint.libs.bits.BitArray} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.tendermint.libs.bits.BitArray.toObject = function(includeInstance, msg) {
  var f, obj = {
    bits: jspb.Message.getFieldWithDefault(msg, 1, 0),
    elemsList: (f = jspb.Message.getRepeatedField(msg, 2)) == null ? undefined : f
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.tendermint.libs.bits.BitArray}
 */
proto.tendermint.libs.bits.BitArray.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.tendermint.libs.bits.BitArray;
  return proto.tendermint.libs.bits.BitArray.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.tendermint.libs.bits.BitArray} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.tendermint.libs.bits.BitArray}
 */
proto.tendermint.libs.bits.BitArray.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setBits(value);
      break;
    case 2:
      var values = /** @type {!Array<number>} */ (reader.isDelimited() ? reader.readPackedUint64() : [reader.readUint64()]);
      for (var i = 0; i < values.length; i++) {
        msg.addElems(values[i]);
      }
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.tendermint.libs.bits.BitArray.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.tendermint.libs.bits.BitArray.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.tendermint.libs.bits.BitArray} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.tendermint.libs.bits.BitArray.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getBits();
  if (f !== 0) {
    writer.writeInt64(
      1,
      f
    );
  }
  f = message.getElemsList();
  if (f.length > 0) {
    writer.writePackedUint64(
      2,
      f
    );
  }
};


/**
 * optional int64 bits = 1;
 * @return {number}
 */
proto.tendermint.libs.bits.BitArray.prototype.getBits = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.tendermint.libs.bits.BitArray} returns this
 */
proto.tendermint.libs.bits.BitArray.prototype.setBits = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * repeated uint64 elems = 2;
 * @return {!Array<number>}
 */
proto.tendermint.libs.bits.BitArray.prototype.getElemsList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedField(this, 2));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.tendermint.libs.bits.BitArray} returns this
 */
proto.tendermint.libs.bits.BitArray.prototype.setElemsList = function(value) {
  return jspb.Message.setField(this, 2, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.tendermint.libs.bits.BitArray} returns this
 */
proto.tendermint.libs.bits.BitArray.prototype.addElems = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 2, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.tendermint.libs.bits.BitArray} returns this
 */
proto.tendermint.libs.bits.BitArray.prototype.clearElemsList = function() {
  return this.setElemsList([]);
};


goog.object.extend(exports, proto.tendermint.libs.bits);
