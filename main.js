const express = require("express");
const app = express();
const PORT = 4000;
const data = require("./src/db/data");

const apiRouter = express.Router();

app.use(express.json());
app.use("/api/v1/data", apiRouter);

apiRouter.get("/", (req, res) => {
  if (!data || data.length <= 0) {
    return res.status(404).send("No data available!");
  }

  const mappedData = data.map((item) => item.name);
  return res.status(200).send(mappedData);
});
apiRouter.get("/filtered", (req, res) => {
  try {
    console.log("asdf");

    const groupedData = data.groupedBy((item) => item.age > 20);
    return res.status(200).send(groupedData);
  } catch (error) {
    console.log(error);
  }
});

apiRouter.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(404).send("This id is unavailable!");

    const filteredData = data.filter((item) => item.id === Number(id));
    return res.status(200).send(filteredData);
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/v1/query", (req, res) => {
  console.log(req.query);
  res.send("hi");
});

app.post("/api/v1/query/add", (req, res) => {
  const { id, name, age, email } = req.body;

  const dataToAdd = { id, name, age, email };

  data.push(dataToAdd);
  console.log(dataToAdd);
  return res.status(204).send(data);
});

app.get("/api/v1/search", (req, res) => {
  const { search, limit } = req.query;
  let sortedProducts = [...data];

  if (search) {
    sortedProducts = sortedProducts.filter((item) => {
      const name = item.name.toLowerCase();
      return name.startsWith(search.toLowerCase());
    });
  }
  if (limit) {
    sortedProducts = sortedProducts.slice(0, Number(limit));
  }
  if (sortedProducts.length < 1) {
    return res.status(200).json({ success: true, dat: [] });
  }
  return res.status(200).json(sortedProducts);
});

app.listen(PORT, () => {
  console.log(`Listening to port: ${PORT}...`);
});
