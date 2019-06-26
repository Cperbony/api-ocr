import express from 'express'
import bodyParser from 'body-parser'
import upload from './config/storage'
import { extractText } from './lib/imageHandler'

const app = express();
//Adiciona o body-parser ao projeto
app.use(bodyParser.urlencoded({ extended: true }))

//Cria endpoint localhost:3000/upload
//Adiciona o multer ao endpoint
app.post('/upload', upload.single('image'), async (req, res, next) => {
    const file = req.file
    //retorna um erro caso nenhum arquivo seja enviado.
    if (!file) {
        const error = new Error('Envie um arquivo para ser tratado')
        error.httpStatusCode = 400;
        return res.json(error)
    }

    //Inicia extração de erro
    await extractText(file.path).then(text => {
        const result = { data: text, ...file }
        res.json(result)
    }).catch(error => {
        res.json(error)
    })
    //retorna as informações de envio caso sucesso
    res.send(file);
})

//Inicia o servidor na porta 3000
app.listen(3000, function () {
    console.log('Server listening on port 3000');
});