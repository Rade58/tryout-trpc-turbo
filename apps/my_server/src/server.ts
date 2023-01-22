import express from "express";
import type { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import cors from "cors";
// import router from "./router";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/hello", async (req, res) => {
  res.status(200);
  res.json({ data: "Hello data" });
});

/* app.use((req, res, next) => {
  req.shsh_secret = "shiba";
  next();
}); */

app.get("/", (req, res, next) => {
  res.json({ hello: "world" });
});

/* app.post("/user", createNewUser);
app.post("/signin", signIn);
 */
/* app.get("/hello-world", async (req, res, next) => {
  next(new Error("Hello World Error!"));
});
// ALSO IN THIS ROUTE I ALSO PASSED ERROR TO THE next
app.get("/foo-bar", (req, res, next) => {
  setTimeout(() => {
    next(new Error("Foo Bar!"));
  }, 200);
});
 */
/* app.use(
  (
    err: Error & { type: string },
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
   
    if (err.type === "auth") {
      res.status(401).json({ errors: [{ message: "Unauthorized!" }] });
      return;
    } else if (err.type === "input") {
      res.status(401).json({ errors: [{ message: "Invalid input!" }] });
      return;
    } else {
      res.status(500).json({ errors: [{ message: "Oooooops, our bad!" }] });
      return;
    }
  }
); */

export default app;
