const pool = require('./pool');

exports.getAllGames = async () => {
    const {rows} = await pool.query(
        `SELECT g.id, g.name, g.image, g.release_date, g.description,
        ARRAY_AGG(DISTINCT d.name) AS developers,
        ARRAY_AGG(gr.name) AS genres
        FROM games g
        LEFT JOIN developers d ON d.id = ANY(g.developer)
        LEFT JOIN genres gr ON gr.id = ANY(g.genre)
        GROUP BY g.id, g.name, g.image, g.release_date, g.description
        ORDER BY g.name;
        `);

    return rows;
}

exports.getAllGenres = async () => {
    const {rows} = await pool.query("SELECT * FROM genres ORDER BY name");
    return rows;

}

exports.getAllDevelopers = async () => {
    const {rows} = await pool.query("SELECT * FROM developers ORDER BY name");

    return rows;
}

exports.getGenreById = async (genre_id) => {
    const { rows } = await pool.query(`SELECT * FROM genres WHERE id = ${genre_id}`);

    return rows;
}

exports.getDeveloperById = async (developer_id) => {
    const { rows } = await pool.query(`SELECT * FROM developers WHERE id = ${developer_id}`);

    return rows;
}

exports.getGamesById = async (game_id) => {
    const { rows } = await pool.query(
        `SELECT g.id, g.name, g.image, g.release_date, g.description,
         ARRAY_AGG(DISTINCT d.name) AS developers,
         ARRAY_AGG(DISTINCT gr.name) AS genres
         FROM games g
         LEFT JOIN developers d ON d.id = ANY(g.developer)
         LEFT JOIN genres gr ON gr.id = ANY(g.genre)
         WHERE g.id = $1  -- Filter by game_id
         GROUP BY g.id, g.name, g.image, g.release_date, g.description`,
        [game_id]
    );

    return rows; 
};

exports.getDeveloperGameCount = async () => {
    const {rows} = await pool.query(
        "SELECT d.id, d.name, COUNT(g.id) AS game_count FROM developers d LEFT JOIN games g ON d.id = ANY(g.developer) GROUP BY d.id, d.name ORDER BY d.name"
    );

    return rows;
}

exports.getGenreGameCount = async () => {
    const {rows} = await pool.query(
        `SELECT gr.id, gr.name, COUNT(game.id) AS game_count
        FROM genres gr
        LEFT JOIN games game
        ON gr.id = ANY(game.genre)
        GROUP BY gr.id, gr.name
        ORDER BY gr.name`
    );

    return rows;
}

exports.getGenreGames = async (genre_id) => {
    const { rows } = await pool.query(
        `SELECT * FROM games WHERE $1 = ANY(genre);`, 
        [genre_id]
    );

    return rows;
}

exports.getDeveloperGames = async (developer_id) => {
    const { rows } = await pool.query(
        `SELECT * FROM games WHERE $1 = ANY(developer);`, 
        [developer_id]
    );

    return rows;
}

exports.insertGenre = async (genre_name) => {
    const values = [genre_name]
    await pool.query(`INSERT INTO genres (name) VALUES ($1)`, values);
}

exports.getGenreByName = async (genre_name) => {
    const { rows } = await pool.query('SELECT * FROM genres WHERE LOWER(name) = $1', [genre_name]);
    return rows;
}

exports.insertDeveloper = async (developer_name) => {
    const values = [developer_name];
    await pool.query('INSERT INTO developers (name) VALUES ($1)', values); 
}

exports.getDeveloperByName = async (developer_name) => {
    const { rows } = await pool.query('SELECT * FROM developers WHERE LOWER(name) = $1', [developer_name]);
    return rows;
}

exports.insertGame = async (game_name, image, release_date, developer, genre, description) => {
    const values = [game_name, image, release_date, developer, genre, description];

    await pool.query('INSERT INTO games (name, image, release_date, developer, genre, description) VALUES ($1, $2, $3, $4, $5, $6)', values); 
}