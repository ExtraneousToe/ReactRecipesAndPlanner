import { json } from "express";

export class Recipe {
    static fromJsonObject(jsonObject) {
        return new Recipe(
            jsonObject.title,
            jsonObject.rating,
            jsonObject.tags.slice(),
            TimingBlock.fromJsonObject(jsonObject.timing),
            ServesBlock.fromJsonObject(jsonObject.serves),
            jsonObject.ingredients.slice(),
            jsonObject.steps.slice(),
            jsonObject.notes.slice()
        );
    }

    constructor(
        title,
        rating,
        tags,
        timing,
        serves,
        ingredients,
        steps,
        notes
    ) {
        // TODO: Come up with a better way of dealing with defaults
        this.title = title;
        this.rating = rating;
        this.tags = tags || [];
        this.timing = timing || new TimingBlock(0, 0);
        this.serves = serves || new ServesBlock(0, 0);
        this.ingredients = ingredients || [];
        this.steps = steps || [];
        this.notes = notes || [];
    }
}

export class TimingBlock {
    static fromJsonObject(jsonObject) {
        return new TimingBlock(jsonObject.prep, jsonObject.cook);
    }

    constructor(prep, cook) {
        this.prep = prep;
        this.cook = cook;

        this.getTotalTime = this.getTotalTime.bind(this);
    }

    getTotalTime() {
        return this.prep + this.cook;
    }
}

export class ServesBlock {
    static fromJsonObject(jsonObject) {
        return new ServesBlock(jsonObject.min, jsonObject.max);
    }

    constructor(min, max) {
        this.min = min;
        this.max = max;
    }
}

export class IngredientLine {
    static fromJsonObject(jsonObject) {
        return new IngredientLine(jsonObject.name, jsonObject.amount);
    }

    constructor(name, amount) {
        this.name = name;
        this.amount = amount;
    }
}

export class StepGroup {
    static fromJsonObject(jsonObject) {
        return new IngredientLine(jsonObject.heading, jsonObject.steps);
    }

    constructor(heading, steps) {
        this.heading = heading;
        // copy in the lines array
        this.steps = steps.slice();
    }
}

export class NoteGroup {
    static fromJsonObject(jsonObject) {
        return new IngredientLine(jsonObject.heading, jsonObject.heading);
    }
    constructor(heading, content) {
        this.heading = heading;
        this.content = content.slice();
    }
}
