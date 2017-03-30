/*var multer = require('multer'),
    storage = multer.diskStorage({
        destination: function ( req, file, callback ) {

            callback(null, './uploads');
        },
        

        filename: function ( req, file, callback ) {
            callback(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('/')[1]);
        }
    }),


    upload = multer({
        storage: storage,
        limits: 1000000
    }).single('file');


function uploadFile( req, res ) {
    upload(req, res, function ( error ) {
        if ( error ) {
            console.error(JSON.stringify(error));
            return res.end('Error uploading file.');
        }
        console.log('Success!');
        res.end('File is uploaded');
    });
}

exports.uploadFile = uploadFile;*/