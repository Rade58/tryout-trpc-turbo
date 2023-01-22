import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/hello", async (req, res) => {
  res.status(200);
  res.json({ data: "Hello data" });
});

app.get("/", (req, res, next) => {
  res.json({ hello: "world" });
});

export default app;
