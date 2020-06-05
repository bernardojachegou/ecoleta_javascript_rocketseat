const express = require("express");
const server = express();

// Importar o banco de dados
const db = require("./database/db");

// Método ver os arquivos da pasta public
server.use(express.static("public"));

// Habilitar o uso do req.body na aplicação
server.use(express.urlencoded({ extended: true }));

// Utilizando template engine
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
    express: server,
    noCache: true
});

// Configuração de rotas
server.get("/", (req, res) => {
    return res.render("index.html");
});

server.get("/create-point", (req, res) => {

    // query strings
    // console.log(req.query);

    return res.render("create-point.html");
});

server.post("/savepoint", (req, res) => {

    // req.body: O corpo do formulário
    // console.log(req.body);

    // inserir dados no db
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?, ?, ?, ?, ?, ?, ?);
    `;
    // Variáveis com valores para testar o db
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ];

    //Função que verifica se há erros no inserção de valores
    function afterInsertData(err) {
        if (err) {
            console.log(err)
            return res.send("Erro no cadastro!");
        }

        console.log("Cadastrado com sucesso");
        console.log(this);

        return res.render("create-point.html", { saved: true });
    };

    db.run(query, values, afterInsertData);

});

server.get("/search", (req, res) => {

    const search = req.query.search;

    if(search == "") {
        //pesquisa vazia
        return res.render("search-results.html", {total: 0 });

    };

    // // Consultar dados na tabela
    db.all(` SELECT * FROM places WHERE city LIKE '%${search}%' `, function (err, rows) {
        if (err) {
            return console.log(err);
        }
        console.log(rows);

        const total = rows.length;

        //Mostrar a página com os dados do db
        return res.render("search-results.html", { places: rows, total: total });
    });
});

server.listen(3000);