const express = require("express");
const app = express();

app.listen(3000, () => console.log("Express listens on the port 3000"));

const sports = [
  { id: 1, name: "Soccer" },
  { id: 2, name: "Hockey" },
  { id: 3, name: "Baseball" },
];

app.get("/api/sports", (req, res) => {
  return res.status(200).json(sports);
});

app.get("/api/sports/:id", (req, res) => {
  const oneSport = sports.find((sport) => sport.id == req.params.id);
  // add
  if (!oneSport)
    return res.status(404).json({ message: "No sport with this id" });
  return res.status(200).json(oneSport);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/sports", (req, res) => {
  const lastItem = sports[sports.length - 1];
  const lastId = lastItem.id;
  const sport = {
    id: lastId + 1,
    name: req.body.name,
  };
  sports.push(sport);
  res.send(sport);
});

app.put("/api/sports/:id", (req, res) => {
  // add
  if (!req.body.name) {
    return res.status(400).json({ message: "Name was not provided" });
  }

  let oneSport = sports.find((sport) => sport.id == req.params.id);
  const index = sports.indexOf(oneSport);
  oneSport = {
    ...oneSport,
    name: req.body.name,
  };

  sports[index] = oneSport;

  res.send(oneSport);
});

app.delete("/api/sports/:id", (req, res) => {
  const oneSport = sports.find((sport, index) => sport.id == req.params.id);
  const index = sports.indexOf(oneSport);
  sports.splice(index, 1);

  res.send(oneSport);
});
