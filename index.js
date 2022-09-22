const express = require("express");
const app = express();
const port = 3000;
const axios = require("axios");
const dotenv = require("dotenv");

var cron = require("node-cron");

dotenv.config();

const options = {
  method: "GET",
  url: "https://weatherapi-com.p.rapidapi.com/current.json",
  params: { q: "rio grande" },
  headers: {
    "X-RapidAPI-Key": `${process.env.API_KEY}`,
    "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
  },
};

cron.schedule(
  "0 31 * * * *",
  () => {
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  },
  {
    scheduled: true,
    timezone: "America/Sao_Paulo",
  }
);

app.listen(port, () => {
  console.log(`Api do clima ${port}`);
});
