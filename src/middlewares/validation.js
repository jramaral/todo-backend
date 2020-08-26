import { taskModel } from "../model/TaskModel.js";
import pkg from "date-fns";

const { isPast } = pkg;

export async function getData(req, res, next) {
  const { macaddress, type, title, description, when } = req.body;
  if (!macaddress) {
    return res.status(400).json({ error: "MAC do disposiivo é obrigatorio" });
  } else if (!type) {
    return res.status(400).json({ error: "Tipo é obrigatorio" });
  } else if (!title) {
    return res.status(400).json({ error: "Titulo é obrigatorio" });
  } else if (!description) {
    return res.status(400).json({ error: "Descrição é obrigatorio" });
  } else if (!when) {
    return res.status(400).json({ error: "Data e hora são obrigatorios" });
  } else {
    let exists;

    if (req.params.id) {
      exists = await taskModel.findOne({
        _id: { $ne: req.params.id },
        when: { $eq: new Date(when) },
        macaddress: { $in: macaddress },
      });
    } else {
      if (isPast(new Date(when))) {
        return res
          .status(400)
          .json({ error: "A Data informada está no passado!" });
      }

      exists = await taskModel.findOne({
        when: { $eq: new Date(when) },
        macaddress: { $in: macaddress },
      });
    }

    if (exists) {
      return res
        .status(400)
        .json({ error: "Já existe uma tarefa nesse dia e horario" });
    }

    next();
  }
}

export async function getMAC(req, res, next) {
  const { macaddress } = req.body;
  if (!macaddress) {
    return res.status(400).json({ error: "MAC do disposiivo é obrigatorio" });
  } else {
    next();
  }
}
export async function getID(req, res, next) {
  const id = req.params.id;
  // console.log(req.params.id);
  // console.log(Boolean(id.match(/^[0-9a-fA-F]{24}$/)));

  if (Boolean(id.match(/^[0-9a-fA-F]{24}$/))) {
    // Sim é um ObjectId válido prossiga com a chamada `findById`.
    next();
  } else {
    return res.status(400).json({ error: "O Id informado não é válido" });
  }
}
