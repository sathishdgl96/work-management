const express = require('express')
const routes = express.Router()
const authUser = require("../models/authUser");
const teams = require("../models/team");
const notify = require("../models/notify");
const profile = require("../models/profilemodel");
const photo = require("../models/photo")
const apigen = require('uuid-apikey');
var bodyParser = require('body-parser')
var random = require('random')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
