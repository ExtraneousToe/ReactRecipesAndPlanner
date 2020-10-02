# clean and setup
DROP DATABASE `recipe_db`;
CREATE DATABASE `recipe_db`;
USE `recipe_db`;
CREATE TABLE recipes (
	id INT NOT NULL AUTO_INCREMENT, 
    title VARCHAR(255), 
    tags VARCHAR(255), 
    rating INT NOT NULL,
    minServes INT,
    maxServes INT,
    prepTime INT,
    cookTime INT,
    PRIMARY KEY(id)
);
CREATE TABLE ingredients (
	id INT NOT NULL AUTO_INCREMENT, 
	recipeId INT, 
    idx INT NOT NULL,
	item VARCHAR(255) NOT NULL, 
	note VARCHAR(255),
    
    primary key(id),
    
    foreign key(recipeId)
		REFERENCES recipes(id)
        ON DELETE CASCADE
);

CREATE TABLE stepsGroups (
	id INT NOT NULL AUTO_INCREMENT, 
    idx INT NOT NULL,
    recipeId INT NOT NULL, 
    header VARCHAR(255),
    
    PRIMARY KEY(id),
    foreign key(recipeId)
		references recipes(id)
        ON DELETE CASCADE
);
CREATE TABLE stepsGroupsStep (
	id INT NOT NULL AUTO_INCREMENT, 
    idx INT NOT NULL,
    stepsGroupsId INT NOT NULL, 
    step VARCHAR(255),
    
    PRIMARY KEY(id),
    foreign key(stepsGroupsId)
		references stepsGroups(id)
        ON DELETE CASCADE
);

CREATE TABLE notesGroup (
	id INT NOT NULL AUTO_INCREMENT, 
    idx INT NOT NULL,
	recipeId INT, 
	header VARCHAR(255) NOT NULL, 
	PRIMARY KEY(id),
    foreign key(recipeId)
		references recipes(id)
        ON DELETE CASCADE
);
CREATE TABLE notesGroupLine (
	id INT NOT NULL AUTO_INCREMENT, 
    idx INT NOT NULL,
	notesGroupId INT, 
	line VARCHAR(1024) NOT NULL, 
	PRIMARY KEY(id),
    foreign key(notesGroupId)
		references notesGroup(id)
        ON DELETE CASCADE
);

#insert into recipes (title, tags, rating) values ('French Onion Soup', 'onion,french,soup,beef,long',5);

#describe recipes;

#select count(*) as numRows from recipes;

#delete from recipes where id=2

#select * from recipes;
#select * from ingredients;
#select * from notesGroup;
#select * from notesGroupLine;
#select * from stepsGroups;
#select * from stepsGroupsStep;

# LOAD DATA LOCAL INFILE 'C:\Users\Matthew-LVR\Documents\GitHub\ReactRecipesAndPlanner\database\seedData\recipeTable.json' INTO TABLE recipes;













