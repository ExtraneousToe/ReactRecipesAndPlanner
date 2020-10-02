const recipeApi = require("./recipeApiController");

function connectAll(app, database) {
    let controllers = [recipeApi];

    controllers.forEach((controller) => {
        controller.connect(app, database);
    });
}

module.exports = connectAll;
