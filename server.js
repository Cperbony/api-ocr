import express from 'express'
import bodyParser from 'body-parser'

const app = express();
//Adiciona o body-parser ao projeto
app.use(bodyParser.urlencoded({ extended: true }))

//Cria endpoint localhost:3000/upload
app.post('/upload', async (req, res, next) => {
    res.send('Escola de JS');
})

//Inicia o servidor na porta 3000
app.listen(3000, function () {
    console.log('Server listening on port 3000');
});