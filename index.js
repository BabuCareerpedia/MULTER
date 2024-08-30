const express = require("express");
const app = express();
const port = 3600;
require("dotenv").config();

const cloudinary = require("cloudinary");

app.use(express.json());
const multer = require("multer");
app.set("view engine", "ejs");

const Image = require("./model/image");

//db connection

require("./db/connectiion");

//t
app.get("/upload", (req, res) => {
  res.render("upload");
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    //   cb(null, file.fieldname + '-' + uniqueSuffix)
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

//  setup MemoryStorage -- to store the image of file into any s3 cloud anywhere
// The memory storage engine stores the files in memory as Buffer objects. It doesn't have any options.

app.get("/", (req, res) => {
  res.send("hello world");
});

app.post("/upload", upload.single("image"), (req, res) => {
  res.json(req.file);
});

app.post("/babu", upload.single("image"), async (req, res) => {
  try {
    const imagePath = req.file.path; // Assuming req.file.path contains the path to the uploaded image

    // Create a new instance of the Image model
    const image = new Image({
      image: imagePath,
    });

    // Save the image instance to the database
    await image.save();

    // Send a success response
    res.status(200).json({
      success: true,
      message: "Image uploaded and stored in database successfully",
      data: image,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

app.post("/abc", async (req, res) => {
  try {
    console.log("object")
    const { name } = req.body;
    const newImage = new Image({
      name: name, 
    });
    console.log(newImage)
    const result = await newImage.save();
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

app.listen(port, () => {
  console.log("server is connected");
});
