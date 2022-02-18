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

// app.get("/plateform-games/:id", (request, response) => {
//   apiCaller("http://videogame-api.fly.dev/games/platforms/" + request.params.id, (error, body) => {
//     if (error) {
//       throw error;
//     }
//     const plateformGame = JSON.parse(body);
//     console.log(plateformGame);
//     response.render("plateformGames", plateformGame);
//   });
// });

app.get("/:id", (request, response) => {
  // console.log("http://videogame-api.fly.dev/games/platforms/" + request.params.id);
  apiCaller("http://videogame-api.fly.dev/games/platforms/" + request.params.id, (error, body) => {
    if (error) {
      throw error;
    }
    const plateformGame = JSON.parse(body);
    // console.log(plateformGame);
    // console.log("cover", plateformGame.game[0].cover);
    const routeParameters = request.params;
    response.render("plateformGames", { id: routeParameters.id, plateformGame: plateformGame });
  });
});

app.get("/:id", (request, response) => {
  console.log("http://videogame-api.fly.dev/games/" + request.params.id);
  apiCaller("http://videogame-api.fly.dev/games/" + request.params.id, (error, body) => {
    if (error) {
      throw error;
    }
    const gameInfo = JSON.parse(body);
    console.log(gameInfo);
    const routeParameters = request.params;
    response.render("gamesInfo", { game: routeParameters.id, gameInfo: gameInfo });
  });
});

app.listen(3000, () => {
  console.log("Server start on http://localhost:3000");
});
