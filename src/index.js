import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { taskRouter } from "./routes/taskRoutes.js";

import { db } from "./model/TaskModel.js";

(async () => {
  try {
    await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conectado ao banco de dados");
  } catch (error) {
    console.log(`Erro ao conectar no banco de dados! ${error}`);

    process.exit();
  }
})();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(taskRouter);

app.get("/", (req, res) => {
  res.send("API ToDO em execução");
});

app.listen(db.port || 3006, () => {
  console.log(`Servidor em execucao na porta ${db.port}`);
});
