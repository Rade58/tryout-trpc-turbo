import express from "express";
import type { Request, Response, NextFunction } from "express";
// import router from "./router";
import morgan from "morgan";

import { createNewUser, signIn } from "./handlers/user";

const app = express();

app.use(morgan("dev"));

// WE ADDED COUPLE OF MIDDLEWARES ON THIS LEVEL (BEFORE EVERYTHING ELSE)

// THIS WILL DO HARD LIFTING FOR YOU IN CASE OF
// BODY OF THE REQUEST AND STREAMS
// IT WILL READ THE CHUNK (STRING) AFTER CHUNK
// OF THE STREAM, AND IT WILL COMBINE THEM INTO ONE STRING
// IT WILL THEN PRSE THAT JSON TO BE VALID JAVASCRIPT (OBJECT, ARRAY STRING, WHATEVER)
// IT IS CALLED BODY PARSER
app.use(express.json());

// THIS WILL ENCODE URL PROPERLY
// IT WILL ALSO ENCODE QUERY PARAMETERS PROPERLY
// FOR EXAMPLE QUERYSTRING VALUES WILL BE AVAILABLE INSIDE OBJECT
// SO YOU CAN ACCESS THEM PRETTY EASYLY
app.use(express.urlencoded({ extended: true }));

app.get("/hello", async (req, res) => {
  res.status(200);
  res.json({ data: "Hello data" });
});

// EXAMPLE OF SOME MIDDLEWARE THAT AUGMENTS REQUEST OBJECT
// BUT WHEN DOING THIS DON'T FORGET TO ALSO MAKE AUGMENTATION INSIDE
// TYPE DEFINITIONS (I DID IN  types.d.ts FILE)
/* app.use((req, res, next) => {
  // THIS WILL NOW BE AVAILABLE IN ANY ROUTER DEFINED AFTER THIS
  req.shsh_secret = "shiba";
  next();
}); */

app.get("/", (req, res, next) => {
  res.json({ hello: "world" });
});

// app.use("/api", [protect], router);

app.post("/user", createNewUser);
app.post("/signin", signIn);

// THIS TIME ERROR IS BING PASSED TO next one
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
// A GOOD PLACE TO PUT ERROR HANDLER SINCE IT WILL
// CATCH ERRORS THAT COME FROM HANDLERS ABOVE

// REMMBER THAT THIS WILL NOT CATCH ERROR IF ERROR IS THROWN FROM async

// BUT REMEMBER THAT THIS HANDLER DOESN'T BELONG TO ANY
// SUB ROUTES
// FOR SUB ROUTER WE NEED TO DEFINE NEW HANDLER

/* app.use(
  (
    err: Error & { type: string },
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // WE WILL BE PSSING TYPE TOGETHER WITH ERROR WHEN
    // WE HANDLE ERRORS

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
