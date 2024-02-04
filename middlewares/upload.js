const multer = require('multer')
// dir name the images will save on it
const DIR = 'public/images';
// make destiniation user multer 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, DIR);
    },
    // name the file usering filename 
    filename: function (req, file, cb) {
      // mimtype see what type of file and u can made what do want on it 
      const filetype =  file.mimetype.split('/');
      // here i take fileType above and split it suer split() and take pnj or pjeg or jpg
      const currentFile = filetype[1]
      if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg'){
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.' + currentFile;
        cb(null, file.fieldname + '-' + uniqueName);
      }else
      {
        cb(new Error("Just Image You can add it"))
      }
    }
});

  
const upload = multer({ storage: storage })
module.exports = upload;
