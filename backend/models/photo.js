let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let photoSchema = new Schema({
    img:
    {
        data: Buffer,
        contentType: String
    }
});

module.exports = mongoose.model("Photo", photoSchema);