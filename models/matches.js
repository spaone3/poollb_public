const mongoose = require('mongoose');


const matchSchema = new mongoose.Schema({
  Winners: [String],
  WinnerElos: [Number],
  Losers: [String],
  LoserElos: [Number],
  ratingChange: Number,
  mode: String,
  timestamp: { type: Date, default: Date.now },
  season: {
    year: Number,
    semester: Number, // 1 for sprnig, 2 for fall
  },

  //timestamp: { type: Date, default: new Date().toLocaleString("en-US", { timeZone: "America/Chicago" }) }
});

const Match = mongoose.model('Match', matchSchema);

module.exports = Match;