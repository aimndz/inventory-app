const {Client} = require("pg");
require("dotenv").config();

const SQL = `
    CREATE TABLE IF NOT EXISTS games (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name VARCHAR (255),
        image VARCHAR (255),
        developer INTEGER[],
        genre INTEGER[],
        release_date DATE,
        description VARCHAR (255)
    );

    CREATE TABLE developers (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name VARCHAR(255)
    );

    CREATE TABLE genres (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name VARCHAR(255) 
    );

    INSERT INTO games (name, image, developer, genre, release_date, description)
    VALUES
        (
            'Witcher 3: Wild Hunt', 
            '../public/images/witcher_3_cover_art.jpg',
            ARRAY[1, 2], -- Assuming developer IDs are 1 and 2
            ARRAY[1, 2], -- Assuming genre IDs are 1 and 2
            '2024-01-01',
            'Sample Description 1'
        ),
        (
            'GTA V', 
            '../public/images/witcher_3_cover_art.jpg',
            ARRAY[3], -- Assuming developer ID is 3
            ARRAY[1], -- Assuming genre ID is 1
            '2024-01-01',
            'Sample Description 1'
        );

    INSERT INTO genres(name)
    VALUES ('Action'), ('Adventure'), ('Horror');

    INSERT INTO developers(name)
    VALUES ('Activision'), ('EA'), ('Rockstar Games');
`;


async function main() {
    console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DB_URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();