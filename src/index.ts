import express from "express";
import nunjucks from "nunjucks";
import apiCaller from "@fewlines-education/request";

const app = express();

app.set("view engine", "njk");

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.get("/", (request, response) => {
  apiCaller("http://videogame-api.fly.dev/platforms", (error, body) => {
    if (error) {
      throw error;
    }
    const result = JSON.parse(body);
    // console.log(result.platforms[0].id);
    response.render("home", { result });
  });
});

app.listen(3000, () => {
  console.log("Server start on http://localhost:3000");
});
