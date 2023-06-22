import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/img');
    },
    filename: (req, file, cb) => {
      cb(null,`${file.fieldname}-${Date.now()}.png`);
    }
  });

  const upload = multer({storage});


  export default upload;