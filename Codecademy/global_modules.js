import os from 'node:os';

console.clear();
console.log(`Você está utilizando o seguinte sistema operacional: ${os.type()}\n`);

import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

import { hashPass } from './hash.js'
import { chkPass } from './hash.js';
import { rtrnUser } from './file_manipulation.js';
import { wrtUser } from './file_manipulation.js';

const rl = readline.createInterface({ input, output });
var answer;

do {
    answer = await rl.question("Você já possui um usuário? (S/N): ");
    switch(answer) {
        case "S":
        case "s":
        case "N":
        case "n":
            console.clear();
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
    /*rtrnUser(user).then((res) => console.log(res));
    console.log("teste");
    
    /*
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
*/
    console.log("Estamos buscando o usuário desejado no nosso banco de dados, por favor aguarde...");

    // A forma correta de fazer isso seria deixar colocar essa funcionalidade dentro da promise (pois o tempo de resposta não seria necessariamente seria 0,1 segundos), mas para exemplificar a assincronidade da promise ele foi colocado fora
/*
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
    
    const newUser = await rl.question("Criando um usuário novo...\n\nDigite seu usuário: ");
    const newPass = await rl.question("Crie uma senha para seu usuário: ");

    rl.close();
    // utilizando os dados digitados para criar um novo registro nos usuários do arquivo data.json
    readFile(filePath, "utf-8").then(async jsonRes => {
        let data = JSON.parse(jsonRes);
        let newData = {
            "nome": newUser,
            // função para criptografar uma senha
            "senha": await hashPass(newPass)
        };
        data.usuarios.push(newData)
        console.log(data.usuarios);
        writeFile(filePath, JSON.stringify(data, null, 2), err => {
            if (err) console.log(err);
            else console.log("foi?");
        })
    })*/
}

/* funcionalidades a serem implementadas

    funcionalidades urgentes
        - separar funções de leitura e escrita de arquivo
        - separar função de verificação de hash
        - conexão com banco de dados PostgreSql

    próximas funcionalidades
        - verificação de duas etapas
        - funcionalidade de recuperação de senha
        - bloquear a inserção de dados repetidos
*/