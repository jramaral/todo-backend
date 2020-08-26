import mongoose from "mongoose";

const db = {};
const taskSchema = mongoose.Schema({
  macaddress: {
    type: String,
    required: true,
    validate(value) {
      if (value === "") throw new Error("Valor não foi informado");
    },
  },
  type: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  when: {
    type: Date,
    required: true,
  },
  done: {
    type: Boolean,
    default: false,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});

const taskModel = mongoose.model("task", taskSchema);

db.mongoose = mongoose;
db.url = "mongodb://localhost:27017/todo";
db.port = 3005;

export { db, taskModel };
