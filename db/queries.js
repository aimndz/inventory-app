const pool = require('./pool');

exports.getAllGames = async () => {
    const {rows} = await pool.query("SELECT * FROM games");
    return rows;
}

exports.getAllGenres = async () => {
    const {rows} = await pool.query("SELECT * FROM genres");
    return rows;
}

exports.getAllDevelopers = async () => {
    const {rows} = await pool.query("SELECT * FROM developers");
    return rows;
}

exports.getAllDevelopers = async () => {
    const {rows} = await pool.query("SELECT * FROM developers");
    return rows;
}

exports.getDeveloperGameCount = async () => {
    const {rows} = await pool.query(
        "SELECT d.id, d.name, COUNT(g.id) AS game_count FROM developers d LEFT JOIN games g ON d.id = ANY(g.developer) GROUP BY d.id, d.name"
    );
    return rows;
}
