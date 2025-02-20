import os from 'node:os';

console.clear();
console.log(`Você está utilizando o seguinte sistema operacional: ${os.type()}\n`);

//---------------------------------------------------------------------

import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });
var answer;
do {
    answer = await rl.question("Você já possui um usuário? (S/N): ");
    switch(answer) {
        case "S":
        case "s":
            console.clear()
            break;
        case "N":
        case "n":
            console.clear()
            break;
        default:
            console.clear();
            console.log("Digite um dos valores pedidos!");
    }

} while (answer != "S" && answer != "s" && answer != "N" && answer != "n");
const user = await rl.question('Usuário: ');
const password = await rl.question('Senha: ');

rl.pause();

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
        console.log(`\nUsuário encontrado!\nNome: ${usuario[0].nome}\n`);
        //console.log(`Senha: ${usuario[0].senha}\n`);
    }
}).catch(err => {
    console.log(`Erro: ${err}`);
})

console.log("Estamos buscando o usuário desejado no nosso banco de dados, por favor aguarde...");

// A forma correta de fazer isso seria deixar colocar essa funcionalidade dentro da promise (pois o tempo de resposta não seria necessariamente seria 0,1 segundos), mas para exemplificar a assincronidade da promise ele foi colocado fora
import { hashSenha } from './hash.js'
import { clear } from 'node:console';

setTimeout(async () => {
    if (usuario == "") {
        console.log("Tente um usuário existente");
        process.exit(1)
    }
    await bcrypt.compare(password, usuario[0].senha).then((res, err) => {
        if (res) {
            console.log("Senha correta, seja bem vindo Davi!");
        } else {
            console.log("Senha incorreta");
            process.exit(1);
        }
    })

    //função para criptografar uma senha

    const novaSenha = await rl.question('\nTeste uma nova senha criptografada: ');
    rl.close();

    console.log(await hashSenha(novaSenha));
}, 100);