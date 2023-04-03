export const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
  };


  export const csvFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(csv)$/)) {
      return callback(new Error('Only csv files are allowed!'), false);
    }
    callback(null, true);
  };