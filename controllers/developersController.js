const asyncHandler = require("express-async-handler");

const developersData = [
  {
    id: 1,
    title: "Activision",
    quantity: 12,
  },
  {
    id: 2,
    title: "Nintendo",
    quantity: 10,
  },
  {
    id: 3,
    title: "EA",
    quantity: 5,
  }
]

exports.index = asyncHandler(async (req, res) => {
  res.render("index", {
    title: "Developers",
    content: "developer/developers",
    developers: developersData,
   });
});

exports.developer_detail = asyncHandler(async (req, res) => {
  res.render("index", {
    title: req.params.id,
    content: "developer/developer_detail",
   });
});

exports.developer_create_get = asyncHandler(async (req, res) => {
  res.render("index", {
    title: "Add New Developer",
    content: "developer/developer_create",
   });
})

exports.developer_create_post = asyncHandler(async (req, res) => {
  
})

exports.developer_update_get = asyncHandler(async (req, res) => {
  // NOT YET IMPLEMENTED
})

exports.developer_update_post = asyncHandler(async (req, res) => {
  // NOT YET IMPLEMENTED
})

exports.developer_delete_get = asyncHandler(async (req, res) => {
  // NOT YET IMPLEMENTED
})

exports.developer_delete_post = asyncHandler(async (req, res) => {
  // NOT YET IMPLEMENTED
})
