const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please add the product name!"],
    },
    description: {
      type: String,
      require: [true, "Please add the description!"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories",
    },
    price: {
      type: Number,
      require: [true, "Please add the price"],
    },
    quantity: {
      type: Number,
      require: [true, "Please add the quantity"],
    },
    image: {
      type: String,
      require: [true, "Please add the image"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Products", productSchema);
