import os from 'node:os';
console.clear();
console.log(`Você está utilizando o seguinte sistema operacional: ${os.type()}\n`);

//---------------------------------------------------------------------

import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

const user = await rl.question('Usuário: ');
//const password = await rl.question('Senha: ');

rl.close();

//----------------------------------------------------------------------

import { readFile } from 'node:fs/promises';
const filePath = "data.json";

// procurar um jeito de ler o arquivo e retornar somente os dados da pesquisa
let usuario;

readFile(filePath, "utf-8").then(jsonRes => {
    const dados = JSON.parse(jsonRes);
    usuario = dados.usuarios.filter((value => {
        return value.nome == user;
    }));
    if (usuario == "") {
        console.log("\nErro: usuário não encontrado");
    } else {
        console.log(`\nUsuário encontrado!\nNome: ${usuario[0].nome}\nSenha: ${usuario[0].senha}\n`);
    }
}).catch(err => {
    console.log(`Erro: ${err}`);
})

console.log("Estamos buscando o usuário desejado no nosso banco de dados, por favor aguarde...");

//ESTAVA TENTANDO DAR UMA MENSAGEM DE BEM VINDO SOMENTE QUANDO O USUÁRIO RECEBESSE UM VALOR 

//setTimeout(() => console.log(typeof(usuario)), 100);

if (usuario != "") setTimeout(() => console.log(`\nSeja bem vindo, ${usuario[0].nome}`), 500);