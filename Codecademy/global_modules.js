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

readFile(filePath, "utf-8").then(jsonRes => {
    const dados = JSON.parse(jsonRes);
    const usuarioLogado = dados.usuarios.filter((usuario => {
        return (usuario.nome == user) ? usuario : false;
    }));
    if (usuarioLogado == "") {
        console.log("\nErro: usuário não encontrado");
    } else {
        console.log(`\nUsuário encontrado!\nNome: ${usuarioLogado[0].nome}\nSenha: ${usuarioLogado[0].senha}\n`);
    }
}).catch(err => {
    console.log(`Erro: ${err}`);
})