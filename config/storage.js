
import path from "path"

const multer = require('multer');

const storage = multer.diskStorage({
    //Configura o destino dos arquivos recebidos => /images
    destination: function (req, file, cb) {
        cb(null, 'images')
    },
    //Após o upload renomeia os arquivos
    filename: function (req, file, cb) {
        cb(null, file.filename + '_' + Date.now())
    }
});

//Export a instância configurada
export default multer({
    storage: storage, fileFilter: function (_req, file, callback) {
        const ext = path.extname(file.originalname);
        //Permitir apenas uploads de imagens
        if (ext != '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('Apenas imagens não permitidas'))
        }
        callback(null, true)
    },
    //Limita o tamanho das imagens
    limits: {
        fileSize: 1024 * 1024
    }
});