const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models/db')
const cors = require('cors')

const app = express();

app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/', function(req, res){
    db.findAll().then(function(posts){
    res.status(200).json(posts);
    })
})

app.get('/:id', function(req, res){
    db.findByPk(req.params.id).then(function(posts){
    res.status(200).json(posts);
    })
})

app.post('/post', function(req, res){
    db.create({ titulo: req.body.titulo, descricao: req.body.descricao, conteudo: req.body.conteudo }).then(function(){
        res.status(200).json({ message: 'cadastrado com sucesso' });
    }).catch(function(erro){
        res.send("Houve um erro: " + erro)
    })
})

app.put('/update/:id', function(req, res){
    db.update({ titulo: req.body.titulo, descricao: req.body.descricao, conteudo: req.body.conteudo }, {where: {'id': req.params.id}}).then(function(){
        res.status(200).json({ message: 'atualizado com sucesso' });
    }).catch(function(erro){
        res.send("Houve um erro: " + erro)
    })
})

app.delete('/delete/:id', function(req, res){
    db.destroy({where: {'id': req.params.id}}).then(function(){
        res.status(200).json({ message: 'Postagem deletada com sucesso' });
    }).catch(function(erro){
        res.send("Houve um erro: " + erro)
    })
})

app.listen(8081, () => {
    console.log("Rodando na porta 8081")
})