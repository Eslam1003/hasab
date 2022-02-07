const mongoose = require('mongoose');

const chimist = new mongoose.Schema(
  {
    sa: {
      type: String,
      required: true,
    },
    su: {
      type: String,
      required: true,
    },
    mo: {
      type: String,
      required: true,
    },
    tu: {
      type: String,
      required: true,
    },
    we: {
      type: String,
      required: true,
    },
    th: {
      type: String,
      required: true,
    },
    fr: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model('Chimist', chimist);
