import express from "express";
import morgan from "morgan";
import cors from "cors";
// this is our trpc root router we made
import { appRouter, createContext, expressTrpc } from "router";

const app = express();

app.use(cors());
app.use(morgan("dev"));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  // request logger
  console.log("<-  ", req.method, req.path, req.body ?? req.query);
  next();
});

// ---------------------------------------
// ---------------------------------------
app.use(
  "trpc",
  expressTrpc.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);
// ---------------------------------------
// ---------------------------------------

app.get("/hello", async (req, res) => {
  res.status(200);
  res.json({ data: "Hello data" });
});

app.get("/", (req, res, next) => {
  res.json({ hello: "world" });
});

export default app;
