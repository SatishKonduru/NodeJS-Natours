const fs = require("fs");

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
);

exports.getAllUsers = (req, res) => {
  res.status(200).json({
    status: "successs",
    results: users.length,
    data: { users },
  });
};

exports.getUser = (req, res) => {
  const user = users.find((u) => u.id === parsseInt(req.params.id));
  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "User Not Found",
    });
  }
  res.status(200).json({
    status: "success",
    data: { user },
  });
};

exports.createUser = (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role || "user",
  };
  users.push(newUser);
  fs.write(
    `${__dirname}/../dev-data/data/users.json`,
    JSON.stringify(users, null, 2)
  );
  res.status(201).json({
    status: "success",
    data: { newUser },
  });
};

exports.updateUser = (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "User Not Found",
    });
  }
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.password = req.body.password || user.password;

  fs.writeFile(
    `${__dirname}/../dev-data/data/users.json`,
    JSON.stringify(users, null, 2)
  );
  res.status(200).json({
    status: "success",
    data: { user },
    message: "User Updated Successfully",
  });
};

exports.deleteUser = (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "User Not Found",
    });
  }
  const index = users.indexOf(user);
  users.splice(index, 1);
  fs.writeFile(
    `${__dirname}/../dev-data/data/users.json`,
    JSON.stringify(users, null, 2)
  );
  res.status(204).json({
    status: "success",
    data: null,
  });
};
