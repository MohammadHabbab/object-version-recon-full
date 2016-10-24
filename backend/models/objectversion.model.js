var mongoose = require('mongoose'),
    Schema = mongoose.Schema

var ObjectVersionSchema = new Schema({
  object_id:{
    type: Number
  },
  object_type:{
    type: String
  },
  timestamp: {
    type: Number
  },
  object_changes:{
    type: String
  }
})

var ObjectVersion = mongoose.model('ObjectVersion', ObjectVersionSchema);

module.export = ObjectVersion;
