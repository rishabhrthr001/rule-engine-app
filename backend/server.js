const express = require("express");
const connectDB = require("./config/db"); 
const { Rule } = require("./models/Rule"); 
const rulesRoutes = require("./routes/rules");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000; 

app.use(cors());
app.use(express.json()); 

connectDB();


app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.use("/api/rules", rulesRoutes);
app.use(bodyParser.json());

app.get("/rules", async (req, res) => {
  try {
    const rules = await Rule.find();
    res.json(rules);
  } catch (err) {
    res.status(500).json({ message: "Error fetching rules", error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
