// INSTEAD OF THIS
// import app from "./server";
// WE CAN USE SERVER FROM OUR PACKAGE ``

import app from "./server";

const PORT = 3061;

app.listen(PORT, () => {
  console.log(`Server listening on http://127.0.0.1:${PORT}`);
});
