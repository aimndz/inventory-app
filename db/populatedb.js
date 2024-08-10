const { Client } = require("pg");
const fs = require("fs");
require("dotenv").config();

const game_img_1 = fs.readFileSync("D:/TOP/inventory-app/public/images/witcher_3_poster.jpg");
const game_img_2 = fs.readFileSync("D:/TOP/inventory-app/public/images/gta_v_poster.jpg");

const SQL = `
    CREATE TABLE IF NOT EXISTS games (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name VARCHAR (255),
        image BYTEA,
        developer INTEGER[],
        genre INTEGER[],
        release_date DATE,
        description VARCHAR (255)
    );

    CREATE TABLE IF NOT EXISTS developers (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name VARCHAR(255)
    );

    CREATE TABLE IF NOT EXISTS genres (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name VARCHAR(255) 
    );

    INSERT INTO genres(name)
    VALUES ('Action'), ('Adventure'), ('Fighting'), ('First Person'), ('Horror')
    ON CONFLICT DO NOTHING;

    INSERT INTO developers(name)
    VALUES ('Activision'), ('CD Projekt'), ('Rockstar Games')
    ON CONFLICT DO NOTHING;
`;

const insertGamesSQL = `
    INSERT INTO games (name, image, developer, genre, release_date, description)
    VALUES
        ($1, $2, $3, $4, $5, $6),
        ($7, $8, $9, $10, $11, $12);
`;

async function main() {
    console.log("seeding...");
    const client = new Client({
        connectionString: process.env.DB_URL,
    });
    await client.connect();
    await client.query(SQL);

    const values = [
        'Witcher 3: Wild Hunt', game_img_1, [2], [1, 2, 3], '2024-01-01', 'Sample Description 1',
        'GTA V', game_img_2, [3], [3, 4], '2024-01-01', 'Sample Description 2'
    ];

    await client.query(insertGamesSQL, values);

    await client.end();
    console.log("done");
}

main();
