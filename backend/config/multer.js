import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: './upload/profileImages',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});

export const profileImageUpload = multer({ storage });
