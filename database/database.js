const mysql = require("mysql2/promise");
const dataFile = require("./seedData/testingRecipes.json");

const DB_NAME = "recipe_db";
const CONN_OBJ = {
    host: "localhost",
    user: "binaricpox",
    password: "d3v_SQL_pwd",
    database: DB_NAME,
};

let con = null;

async function seedDatabase() {
    console.log("Will now seed the db ...");

    try {
        let idx = 0;
        for (idx = 0; idx < dataFile.length; ++idx) {
            var item = dataFile[idx];

            var result = await con.query(
                "INSERT INTO `recipes` (title, tags, rating, minServes, maxServes, prepTime, cookTime) VALUES (?,?,?,?,?,?,?)",
                [
                    item.title,
                    item.tags.join(","),
                    item.rating,
                    item.serves.min,
                    item.serves.max,
                    item.timing.prep,
                    item.timing.cook,
                ]
            );

            let insertedRecipeId = result[0].insertId;

            console.log(
                `Loaded recipe '${item.title}' with ID: ${insertedRecipeId}`
            );

            var ingResult = await con.query(
                "INSERT INTO `ingredients` (idx, recipeId, item, note) VALUES ?",
                [
                    item.ingredients.map((ingr, index) => {
                        let localIndex = index;
                        return [
                            localIndex,
                            insertedRecipeId,
                            ingr.name,
                            ingr.notes || null,
                        ];
                    }),
                ]
            );

            console.log(
                `Loaded ${ingResult[0].affectedRows} ingredients against recipeId: ${insertedRecipeId}`
            );

            let idy = 0;
            for (idy = 0; idy < item.steps.length; ++idy) {
                let stepsItem = item.steps[idy];
                let innerY = idy;
                // stepsGroups
                var sgResult = await con.query(
                    "INSERT INTO `stepsGroups` (idx, recipeId, header) VALUES (?,?,?)",
                    [innerY, insertedRecipeId, stepsItem.heading || ""]
                );

                let insertedSgId = sgResult[0].insertId;

                console.log(
                    `Loaded stepGroup with ID: ${insertedSgId} against recipedId: ${insertedRecipeId}`
                );

                // stepsGroupsStep
                //(stepsGroupsId,step)
                var sgsResult = await con.query(
                    "INSERT INTO `stepsGroupsStep` (idx, stepsGroupsId, step) VALUES ?",
                    [
                        stepsItem.steps.map((step, index) => {
                            let localIndex = index;
                            return [localIndex, insertedSgId, step];
                        }),
                    ]
                );

                console.log(
                    `Loaded ${sgsResult[0].affectedRows} steps against recipeId: ${insertedRecipeId} && stepGroupId: ${insertedSgId}`
                );
            }

            for (idy = 0; idy < item.notes.length; ++idy) {
                let notesItem = item.notes[idy];

                // notesGroup
                var ngResult = await con.query(
                    "INSERT INTO `notesGroup` (idx, recipeId, header) VALUES (?,?,?)",
                    [idy, insertedRecipeId, notesItem.heading || ""]
                );

                let insertedNgId = ngResult[0].insertId;

                console.log(
                    `Loaded notesGroup with ID: ${insertedNgId} against recipedId: ${insertedRecipeId}`
                );

                // notesGroupLine
                //(notesGroupId,line)
                var ngsResult = await con.query(
                    "INSERT INTO `notesGroupLine` (idx, notesGroupId, line) VALUES ?",
                    [
                        notesItem.content.map((line, index) => {
                            let localIndex = index;
                            return [localIndex, insertedNgId, line];
                        }),
                    ]
                );

                console.log(
                    `Loaded ${ngsResult[0].affectedRows} notes against recipeId: ${insertedRecipeId} && notesGroupId: ${insertedNgId}`
                );
            }
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
}

async function reconnectMissingDB() {
    try {
        let { database, ...remObj } = CONN_OBJ;
        con = await mysql.createConnection(remObj);

        console.log("Connected to the server.");
    } catch (error) {
        throw error;
    }
}

async function Initialise() {
    try {
        con = await mysql.createConnection(CONN_OBJ);
        console.log("Connected to the database.");

        var [rows, fields] = await con.query(
            "SELECT COUNT(*) as count FROM `recipes`"
        );
        if (rows[0].count === 0) {
            await seedDatabase();
        }
    } catch (err) {
        console.error(err);

        await reconnectMissingDB();
    }

    return con;
}

function closeConnection() {
    if (con) {
        con.end();
    }
}

module.exports = {
    initDB: Initialise,
    closeDB: closeConnection,
};
