// backend.js
import express, { response } from "express";
import cors from "cors"

const app = express();
const port = 8000;

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};

const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};

const genId = () => {
  const random_id = Math.trunc(Math.random()*1000);
  return random_id;
};

const findUserById = (id) =>
	users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
  user.id = genId().toString();
	users["users_list"].push(user);
	return user;
};

const deleteUserById = (id) => {
  const user = findUserById(id);
  if (user !== undefined) {
    let index = users["users_list"].indexOf(user);
    users["users_list"].splice(index, 1);
  }
  return user;
};

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Fart World!");
});

app.get("/users", (req, res) => {
  res.send(users);
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  if (name != undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

app.get("/users/:id", (req, res) => {
	const id = req.body["id"];
	let result = findUserById(id);
	if (result === undefined) {
		res.status(404).send("Resource not found.");
	} 
  else {
		res.send(result);
	}
});

app.post("/users", (req,res) => {
	const userToAdd = req.body;
	addUser(userToAdd);
  res.status(201).send(req.body);
});

app.delete("/users/:id", (req, res) => {
  const id = req.body["id"];
  console.log(id);
  let result = deleteUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found. idiot");
  }
  else {
    res.status(204).send(result);
  }
});

const server = app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

