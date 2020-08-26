import { db, taskModel } from "../model/TaskModel.js";
import dateFns from "date-fns";

const {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
} = dateFns;

const current = new Date();

const create = async (req, res) => {
  try {
    const task = new taskModel(req.body);
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Algum erro ocorreu ao salvar" });
  }
};

const update = async (req, res) => {
  const id = req.params.id;

  try {
    const task = await taskModel.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send({ message: "Erro ao atualizar o Tarafa" });
  }
};
const updateStatus = async (req, res) => {
  const { id, done } = req.params;

  try {
    const task = await taskModel.findByIdAndUpdate(
      { _id: id },
      { done: done },
      { new: true }
    );
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send({ message: "Erro ao atualizar o Tarafa" });
  }
};

const all = async (req, res) => {
  const task = await taskModel
    .find({ macaddress: { $in: req.params.macaddress } })
    .sort("when");
  res.send(task);
};

const taskLate = async (req, res) => {
  try {
    const task = await taskModel
      .find({
        when: { $lt: current },
        done: { $eq: false },
        macaddress: { $in: req.params.macaddress },
      })
      .sort("when");
    res.send(task);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Erro ao tentar encontrar uma tarefa",
    });
  }
};

const today = async (req, res) => {
  try {
    const task = await taskModel
      .find({
        when: { $gte: startOfDay(current), $lte: endOfDay(current) },
        macaddress: { $eq: req.params.macaddress },
      })
      .sort("when");
    res.send(task);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Erro ao tentar encontrar uma tarefa",
    });
  }
};

const month = async (req, res) => {
  try {
    const task = await taskModel
      .find({
        when: { $gte: startOfMonth(current), $lt: endOfMonth(current) },
        macaddress: { $in: req.params.macaddress },
      })
      .sort("when");
    res.send(task);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Erro ao tentar encontrar uma tarefa",
    });
  }
};

const year = async (req, res) => {
  try {
    const task = await taskModel
      .find({
        when: { $gte: startOfYear(current), $lt: endOfYear(current) },
        macaddress: { $in: req.params.macaddress },
      })
      .sort("when");
    res.send(task);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Erro ao tentar encontrar uma tarefa",
    });
  }
};

const one = async (req, res) => {
  const id = req.params.id;

  try {
    const task = await taskModel.findById(id);

    if (task) {
      res.status(200).send(task);
    } else {
      res.status(404).send({ error: "Não foi encontrado o item" });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Erro ao tentar encontrar uma tarefa",
    });
  }
};
const week = async (req, res) => {
  try {
    const task = await taskModel
      .find({
        when: { $gte: startOfWeek(current), $lt: endOfWeek(current) },
        macaddress: { $in: req.params.macaddress },
      })
      .sort("when");
    if (Boolean(task)) {
      res.send(task);
    } else {
      res.status(204);
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Erro ao tentar encontrar uma tarefa",
    });
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    const task = await taskModel.findByIdAndDelete({ _id: id });

    if (Boolean(task)) {
      console.log(task);
      res.status(204).send(task);
    } else {
      res
        .status(400)
        .send({ message: "Não foi possível processar a solicitação " });
    }
    //console.log(Boolean(task));
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Erro ao remover a tarefa" });
  }
};

export default {
  create,
  update,
  all,
  one,
  remove,
  updateStatus,
  taskLate,
  today,
  week,
  month,
  year,
};
