const { Schema, model } = require('mongoose');

const { handleMongooseError } = require('../helpers');

const newsSchema = new Schema(
  {
    imgUrl: {
      type: String,
      required: true
    },
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
        
    },
    date: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
        },
        id: {
            type: String,
            required: true
    }
  },
  { versionKey: false, timestamps: false }
);

newsSchema.post("save", handleMongooseError);

const News = model("contacts", newsSchema);

module.exports = News;