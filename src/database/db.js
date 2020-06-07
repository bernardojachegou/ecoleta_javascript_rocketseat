//Importação do SQLite3
const sqlite3 = require("sqlite3").verbose();

//Criar objeto que irá fazer operações no DB
const db = new sqlite3.Database("./src/database/database.db");

module.exports = db;
//Utilizar o banco de dados para as operações 
db.serialize(() => {

    // //Criar tabela
    // db.run(`
    //     CREATE TABLE IF NOT EXISTS places (
    //         id INTEGER PRIMARY KEY AUTOINCREMENT,
    //         image TEXT,
    //         name TEXT,
    //         address TEXT,
    //         address2 TEXT,
    //         state TEXT,
    //         city TEXT,
    //         items TEXT
    //     );
    // `);

    // //Inserir dados na tebela
    // const query = `
    //     INSERT INTO places (
    //         image,
    //         name,
    //         address,
    //         address2,
    //         state,
    //         city,
    //         items
    //     ) VALUES (?, ?, ?, ?, ?, ?, ?);
    // `;
    // // Variáveis com valores para testar o db
    // const values = [
    //     "https://images.unsplash.com/photo-1503596476-1c12a8ba09a9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    //     "Coletamos",
    //     "Rua Dr Atayde, Cidade Verde",
    //     "360",
    //     "Mato Grosso",
    //     "Cuiabá",
    //     "Resíduos Eletrônicos"
    // ];

    //Função que verifica se há erros no inserção de valores
    // function afterInsertData(err) {
    //     if (err) {
    //         return console.log(err)
    //     }

    //     console.log("Cadastrado com sucesso");
    //     console.log(this);
    // };

    // // db.run(query, values, afterInsertData);

    // // Consultar dados na tabela
    // db.all(` SELECT * FROM places `, function(err, rows) {
    //     if (err) {
    //         return console.log(err)
    //     }

    //     console.log("Aqui estão os seus registros");
    //     console.log(rows);
    // });

    // Deletar dados da tabela
    // db.run(` DELETE FROM places WHERE id = ? `, [8], function(err) {
    //     if (err) {
    //         return console.log(err)
    //     }

    //     console.log("Registro deletado com sucesso");
    // });

});