const Users = require('../repositories/users');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

const register = async (req, res, next) => { };