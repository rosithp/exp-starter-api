const jwt = require('jsonwebtoken');

const userSerializer = require('../serializers/user');
const User = require('../models/user');

exports.index = async (req, res, next) => {
  const users = await User.all();
  const serializedUsers = users.map(user => userSerializer(user));
  res.json({ users: serializedUsers });
}

exports.create = async (req, res, next) => {
  const user = await User.create(req.body);
  const serializedUser = await userSerializer(user);
  const token = jwt.sign({ user: serializedUser }, process.env.JWT_SECRET);
  res.json({ jwt: token, user: serializedUser });
}
