const express = require('express');
const app = express();
const port = 8080;
const { Client } = require('pg');

app.use(express.urlencoded({ extended: true }));