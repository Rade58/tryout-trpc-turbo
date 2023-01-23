// INSTEAD OF THIS
// import app from "./server";
// WE CAN USE SERVER FROM OUR PACKAGE ``
import { appRouter } from "router";
import express from "express";

const PORT = 3001;

/* app.listen(PORT, () => {
  console.log(`Server listening on http://127.0.0.1:${PORT}`);
});
 */
