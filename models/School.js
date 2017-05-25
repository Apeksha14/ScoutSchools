// Require mongoose
var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;

// Create article schema
var SchoolSchema = new Schema({
  // title is a required string 
  userid:{
    type:String,
    require:true
  },
  schoolid:{
    type:Number,
    require:true
  },
  schoolname: {
    type: String,
    require:true
    },
  // link is a required string
  type: {
    type: String,
    require:true
  },
  // This only saves one note's ObjectId, ref refers to the Note model
  address: {
    type: String,
    required:true
  }
});

// Create the Article model with the ArticleSchema
var School = mongoose.model("School", SchoolSchema);

// Export the model
module.exports = School;
