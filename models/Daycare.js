// Require mongoose
var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;

// Create article schema
var DaycareSchema = new Schema({
  // title is a required string 
  userid:{
    type:String,
    require:true
  },
 
  name: {
    type: String,
    require:true
    },
  // link is a required string
  address: {
    type: String,
    require:true
  },
  // This only saves one note's ObjectId, ref refers to the Note model
  rating: {
    type: String,
    required:true
  }
});

// Create the Article model with the ArticleSchema
var Daycare = mongoose.model("Daycare", DaycareSchema);

// Export the model
module.exports = Daycare;
