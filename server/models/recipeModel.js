const mongoose = require('mongoose')

const Schema = mongoose.Schema

const reviewSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  comment: {
    type: String,
    required: false
  }
})

const ingredientSchema = new Schema({
  ingredient: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    required: true
  }
}, { timestamps: false })

const recipeSchema = new Schema({
  recipeName: {
    type: String,
    required: true
  },
  ingredients: [ingredientSchema],
  instructions: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    required: false
  },
  reviews: [reviewSchema],
  img: {
    data: Buffer,
    contentType: String,
    required: false
    },
  public: {
    boolean: Number,
    required: true
    },
}, { timestamps: true })

module.exports = mongoose.model('Recipe', recipeSchema)