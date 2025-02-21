import os from 'node:os';

console.clear();
console.log(`Você está utilizando o seguinte sistema operacional: ${os.type()}\n`);



import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

import { hashPass } from './hash.js'

import { readFile } from 'node:fs/promises';
import { writeFile } from 'node:fs/promises';

import * as bcrypt from 'bcrypt';


const filePath = "data.json";
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
if (answer == "S" || answer == "s") {
    const user = await rl.question('Usuário: ');
    const pass = await rl.question('Senha: ');

    rl.pause();


    // procurar um jeito de ler o arquivo e retornar somente os dados da pesquisa
    let userDB;

    readFile(filePath, "utf-8").then(jsonRes => {
        let data = JSON.parse(jsonRes);
        userDB = data.usuarios.filter((value => {
            return value.nome == user;
        }));
        if (userDB == "") {
            console.log("\nErro: usuário não encontrado");
        } else {
            console.log(`\nUsuário encontrado!\nNome: ${userDB[0].nome}\n`);
            // CÓDIGO DE TESTE: console.log(`Senha: ${userDB[0].senha}\n`);
        }
    }).catch(err => {
        console.log(`Erro: ${err}`);
    })

    console.log("Estamos buscando o usuário desejado no nosso banco de dados, por favor aguarde...");

    // A forma correta de fazer isso seria deixar colocar essa funcionalidade dentro da promise (pois o tempo de resposta não seria necessariamente seria 0,1 segundos), mas para exemplificar a assincronidade da promise ele foi colocado fora

    setTimeout(async () => {
        if (userDB == "") {
            console.log("Tente um usuário existente");
            process.exit(1)
        }
        await bcrypt.compare(pass, userDB[0].senha).then((res, err) => {
            if (res) {
                console.log(`Senha correta. Seja bem vindo ${userDB[0].nome}!`);
            } else {
                console.log("Senha incorreta");
                process.exit(1);
            }
        })
    }, 100);
} else if (answer == "N" || answer == "n") {
    // função para criptografar uma senha
    const newUser = await rl.question("Criando um usuário novo...\n\nDigite seu usuário: ");
    const newPass = await rl.question("Crie uma senha para seu usuário: ");

    rl.close();

    readFile(filePath, "utf-8").then(jsonRes => {
        let data = JSON.parse(jsonRes);
        let newData = {
            "nome": newUser,
            "senha": hashPass(newPass)
        };
        data.push(newData);
        writeFile(filePath, JSON.stringify(data), err => {
            if (err) console.log(err);
            else console.log("foi?");
        })
    })
    // CÓDIGO DE TESTE: console.log(await );

    // utilizar os dados digitados para criar um novo registro nos usuários do arquivo data.json
}