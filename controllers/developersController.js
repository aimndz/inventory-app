const asyncHandler = require("express-async-handler");
const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

// const developersData = [
//   {
//     id: 1,
//     title: "Activision",
//     quantity: 12,
//   },
//   {
//     id: 2,
//     title: "Nintendo",
//     quantity: 10,
//   },
//   {
//     id: 3,
//     title: "EA",
//     quantity: 5,
//   }
// ]

exports.index = asyncHandler(async (req, res) => {
  const developersData = await db.getDeveloperGameCount();
  
  res.render("index", {
    title: "Developers",
    content: "developer/developers",
    developers: developersData,
   });
});

exports.developer_detail = asyncHandler(async (req, res) => {
  const [developer, allDeveloperGames] = await Promise.all([
    db.getDeveloperById(req.params.id),
    db.getDeveloperGames(req.params.id)
  ])

  res.render("index", {
    title: developer[0].name,
    id: req.params.id,
    content: "developer/developer_detail",
    games: allDeveloperGames,
    quantity: allDeveloperGames.length,
   });
});

exports.developer_create_get = asyncHandler(async (req, res) => {
  res.render("index", {
    title: "Add New Developer",
    content: "developer/developer_create",
   });
})

exports.developer_create_post = [
  body("developer_name", "Developer name should not be empty")
    .trim()
    .isLength({min: 1})
    .escape(),
  body("developer_name").custom(async (value) => {
    const existingDeveloper = await db.getDeveloperByName(value.toLowerCase());
    console.log(existingDeveloper)
    if (existingDeveloper.length) {
      throw new Error("Developer name already exists")
    }
  }), 
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      return res.status(400).render("index", {
        title: "Add New Developer",
        content: "developer/developer_create",
        errors: errors.array()
      })
    }

    const {developer_name} = req.body;
    await db.insertDeveloper(developer_name);
    res.redirect("/developers/create");
})];

exports.developer_update_get = asyncHandler(async (req, res) => {
  const developer = await db.getDeveloperById(req.params.id);
  
  res.render("index", {
    title: `Update ${developer[0].name}`,
    id: developer[0].id,
    name: developer[0].name,
    content: "developer/developer_update",
   });
})

exports.developer_update_post = [
  body("developer_name", "Developer name should not be empty")
    .trim()
    .isLength({min: 1})
    .escape(),
  body("developer_name").custom(async (value) => {
    const existingDeveloper = await db.getDeveloperByName(value.toLowerCase());
    console.log(existingDeveloper)
    if (existingDeveloper.length) {
      throw new Error("Developer name already exists")
    }
  }), 
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      return res.status(400).render("index", {
        title: "Add New Developer",
        content: "developer/developer_create",
        errors: errors.array()
      })
    }

     const developer_id = req.params.id;
    const {developer_name} = req.body;
  
    await db.updateDeveloper(developer_id, developer_name);
  
    res.redirect(`/developers/${req.params.id}/update`);
})];

exports.developer_delete_get = asyncHandler(async (req, res) => {
  const developer = await db.getDeveloperById(req.params.id);

  res.render("index", {
    title: `${developer[0].name}`,
    content: "developer/developer_delete",
    id: req.params.id,
    developer: developer[0],
   });
})

exports.developer_delete_post = asyncHandler(async (req, res) => {
  await db.deleteDeveloperById(req.params.id);

  res.redirect("/developers");
})
