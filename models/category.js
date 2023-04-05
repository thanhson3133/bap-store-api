const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, "Please add the category title!"],
    },
    code: {
      type: String,
      require: [true, "Please add the category code!"],
    },
    description: {
      type: String,
      require: [true, "Please add the category description!"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Categories", categorySchema);
