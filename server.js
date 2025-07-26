const express = require("express");
const app = express();
const pick = require("./api/pick");

app.use(express.static("public"));
app.use(express.json());
app.use("/api/pick", pick);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
