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
    response.render("home", { Plateforms: result.platforms });
  });
});

app.get("/plateform-games/:id", (request, response) => {
  apiCaller("http://videogame-api.fly.dev/games/platforms/" + request.params.id, (error, body) => {
    if (error) {
      throw error;
    }
    const plateformGame = JSON.parse(body);
    console.log(plateformGame);
    response.render("plateformGames", plateformGame);
  });
});

app.get("/:id", (request, response) => {
  apiCaller(`http://videogame-api.fly.dev/games/platforms/:id` + request.params.id, (error, body) => {
    if (error) {
      throw error;
    }
    const plateformGame = JSON.parse(body);
    console.log(plateformGame);
    const routeParameters = request.params;
    response.render("plateformGames", { id: routeParameters.id });
  });
});

app.listen(3000, () => {
  console.log("Server start on http://localhost:3000");
});
