const sequelize = require('sequelize')
const mysqlDb = new sequelize(/*nome database, nome user, senha, */{
    host: "localhost",
    dialect: 'mysql'
})

mysqlDb.authenticate().then(function(){
    console.log('Conexão realizada com sucesso');
}).catch(function(err){
    console.log('Erro ao realizar a conexão com BD: ' + err);
})


const postdb = mysqlDb.define(/* nome da tabela ,*/{
    titulo: {
        type:sequelize.STRING
    },
    descricao: {
        type:sequelize.STRING
    },
    conteudo: {
        type:sequelize.TEXT
    }
}) 

module.exports = sequelize
module.exports = postdb

//postdb.sync({force: true})