const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const Schema = mongoose.Schema;

const trackSchema = new Schema({
  id: { type: String, required: true, default: () => uuidv4() },
  trackName: { type: String, required: true },
  artist: { type: String, required: true },
  features: [ String ],
  releases: { type: String, required: true, enum: [ 'Single', 'EP', 'Album' ] },
  uploader: { type: Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, required: true },
  comments: { type: Array, createdOn: Date.now },
  dataUploaded: { type: Date, default: Date.now },
});

const Track = mongoose.model('Track', trackSchema);

module.exports = Track;

