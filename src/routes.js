const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const routes = express.Router();

const BoxController = require('./controllers/BoxController');
const FileController = require('./controllers/FileController')

//GET:buscar info/POST:criar algo/PUT:editar/DELETE:deletar
routes.post("/boxes", BoxController.store);
routes.post("/boxes/:id/files", multer(multerConfig).single('file'), FileController.store);
routes.get("/boxes/:id", BoxController.show);

module.exports = routes; // unico  module exports por arquivo