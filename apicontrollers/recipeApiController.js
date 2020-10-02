const mysql2 = require("mysql2");

async function sendAll(request, response, databaseConnection) {
    var linesObj = {};
    const TABLES = [
        "recipes",
        "ingredients",
        "stepsGroups",
        "stepsGroupsStep",
        "notesGroup",
        "notesGroupLine",
    ];

    var i = 0;
    for (i = 0; i < TABLES.length; ++i) {
        var [lines, fields] = await databaseConnection.query(
            `SELECT * from ${TABLES[i]}`
        );
        linesObj[TABLES[i]] = lines;
    }

    // Object.keys(linesObj).forEach((key) => console.log(key));

    let finalJson = [];
    let allRecipes = linesObj["recipes"];
    for (i = 0; i < allRecipes.length; ++i) {
        let dbRecipe = allRecipes[i];
        let thisRecipeIngredients = linesObj["ingredients"].filter(
            (item) => item.recipeId === dbRecipe.id
        );

        let stepsGroups = [];
        let thisRecipeSteps = linesObj["stepsGroups"].filter(
            (item) => item.recipeId === dbRecipe.id
        );
        thisRecipeSteps.forEach((sg) => {
            let sgsList = linesObj["stepsGroupsStep"].filter(
                (item) => item.stepsGroupsId === sg.id
            );

            stepsGroups.push({
                idx: sg.idx,
                heading: sg.header,
                steps: sgsList.map((sgs) => {
                    return {
                        idx: sgs.idx,
                        step: sgs.step,
                    };
                }),
            });
        });

        let notesGroups = [];
        let thisRecipeNotes = linesObj["notesGroup"].filter(
            (item) => item.recipeId === dbRecipe.id
        );
        thisRecipeNotes.forEach((ng) => {
            let ngsList = linesObj["notesGroupLine"].filter(
                (item) => item.notesGroupId === ng.id
            );

            notesGroups.push({
                idx: ng.idx,
                heading: ng.header,
                content: ngsList.map((ngl) => {
                    return {
                        idx: ngl.idx,
                        line: ngl.line,
                    };
                }),
            });
        });

        let outRecipe = {
            id: dbRecipe.id,
            title: dbRecipe.title,
            rating: dbRecipe.rating,
            serves: {
                min: dbRecipe.minServes,
                max: dbRecipe.maxServes,
            },
            timing: {
                prep: dbRecipe.prepTime,
                cook: dbRecipe.cookTime,
            },
            tags: dbRecipe.tags.split(","),
            ingredients: thisRecipeIngredients.map((ingr) => {
                return {
                    idx: ingr.idx,
                    name: ingr.item,
                    notes: ingr.note,
                };
            }),
            steps: stepsGroups,
            notes: notesGroups,
        };

        finalJson.push(outRecipe);
    }

    response.json(finalJson);
}

function connectDatabase(app, databaseConnection) {
    console.log(`Hooking up to Recipe API ... `);

    app.get("/api/recipes", async (request, response) => {
        console.log(`GET :: ${request.baseUrl}`);

        if (Object.keys(request.query).length === 0) {
            await sendAll(request, response, databaseConnection);
        } else {
            response.json([]);
        }
    });

    // add new data
    app.put("/api/recipes", async (request, response) => {
        console.log(`PUT :: ${request.baseUrl}`);
        console.log(`request.body: ${JSON.stringify(request.body)}`);

        // this will be an INSERT call

        // Object.keys(request).forEach((key) => console.log(key));
    });

    // update existing data
    app.post("/api/recipes", async (request, response) => {
        console.log(`POST :: ${request.baseUrl}`);
        console.log(`request.body: ${JSON.stringify(request.body)}`);

        // console.log(`request: ${JSON.stringify(request)}`);
        // console.log(`request.query: ${JSON.stringify(request.query)}`);
        // console.log(`request.params: ${JSON.stringify(request.params)}`);

        // Object.keys(request).forEach((key) => console.log(key));
    });

    // delete an entry
    app.delete("/api/recipes", async (request, response) => {
        console.log(`DELETE :: ${request.url}`);

        console.log(`request.body: ${JSON.stringify(request.body)}`);
        // console.log(`request.query: ${JSON.stringify(request.query)}`);
        // console.log(`request.params: ${JSON.stringify(request.params)}`);

        if (request.body.recipeId) {
            var delResult = await databaseConnection.query(
                `DELETE FROM recipes WHERE id=${request.body.recipeId}`
            );

            response.json({
                result: delResult,
            });
        } else {
            response.json([]);
        }
    });
}

module.exports = {
    connect: connectDatabase,
};
