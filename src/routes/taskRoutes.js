import express from "express";
import controller from "../controller/TaskController.js";
import { getData, getMAC, getID } from "../middlewares/validation.js";

const app = express();

app.post("/task", getData, controller.create);

app.get("/task/filter/all/:macaddress", controller.all);
app.get("/task/filter/late/:macaddress", controller.taskLate);
app.get("/task/filter/today/:macaddress", controller.today);
app.get("/task/filter/week/:macaddress", controller.week);
app.get("/task/filter/month/:macaddress", controller.month);
app.get("/task/filter/year/:macaddress", controller.year);
app.get("/task/:id", getID, controller.one);

app.put("/task/:id", getData, controller.update);
app.put("/task/:id/:done", controller.updateStatus);

app.delete("/task/:id", controller.remove);

export { app as taskRouter };
