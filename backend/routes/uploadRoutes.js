import path from 'path';
import express from 'express';
import multer from 'multer';

const router = express.Router();

//Configure storage settings for uploaded files
const storage = multer.diskStorage({
  //Define files store destination
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  // Define how files should be named
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname); // Get file extension
    // Create unique filename: fieldname + timestamp + original extension
    cb(null, `${file.fieldname}-${Date.now()}${extname}`);
  },
});

// File filter for accepting certain image types
const fileFilter = (req, file, cb) => {
  // Allow jpg, jpeg, png, webp
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;

  // Check if the file matches allowed types
  if (filetypes.test(extname) && mimetypes.test(mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Images only'), false); // Reject the file
  }
};

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single('image');

// POST route for handling image uploads
router.post('/', (req, res) => {
  uploadSingleImage(req, res, (err) => {
    if (err) {
      // Handle any errors during upload
      res.status(400).send({ message: err.message });
    } else if (req.file) {
      // If upload successful, send back the file path
      res.status(200).send({
        message: 'Image uploaded successfully',
        image: `/${req.file.path}`,
      });
    } else {
      // If no file was provided in the request
      res.status(400).send({ message: 'No image file provided' });
    }
  });
});

export default router;
