import os from 'node:os';

console.clear();
console.log(`Você está utilizando o seguinte sistema operacional: ${os.type()}\n`);

//---------------------------------------------------------------------

import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

const user = await rl.question('Usuário: ');
const password = await rl.question('Senha: ');

rl.close();

//----------------------------------------------------------------------

import { readFile } from 'node:fs/promises';
import * as bcrypt from 'bcrypt';
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

// A forma correta de fazer isso seria deixar colocar essa funcionalidade dentro da promise (pois o tempo de resposta não seria necessariamente seria 0,1 segundos), mas para exemplificar a assincronidade da promise ele foi colocado fora
setTimeout(() => {
    if (usuario != "") console.log(`Seja bem vindo, ${usuario[0].nome}\n`)
    else {
        console.log("Tente um usuário existente");
        process.exit(1)
    }
    bcrypt.compare(password, usuario[0].senha).then((res, err) => {
        if (res) {
            console.log("Senha correta");            
        } else {
            console.log("Senha incorreta");
            process.exit(1);
        }
    })
}, 100);

//--------------------------------------------------------------

//função para criptografar uma senha
import { hashSenha } from './hash.js'

console.log(await hashSenha("davi005"));