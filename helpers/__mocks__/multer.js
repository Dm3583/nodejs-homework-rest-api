jest.mock('multer');



const multer = function (options) {

    console.log(options);
    return {
        single: (file) => {
            return (req, res, next) => {
                req = req.file
                console.log(file)
                next();
            }
        },
        storage: {},
    }
};

multer.diskStorage = () => { };

module.exports = multer;


