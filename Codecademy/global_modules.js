import os from 'node:os';
// mostrando o sistema sendo utilizado
console.clear();
console.log(`Você está utilizando o seguinte sistema operacional: ${os.type()}\n`);

import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

import { hashPass } from './hash.js'
import { chkPass } from './hash.js';
import { rtrnUser } from './file_manipulation.js';
import { wrtUser } from './file_manipulation.js';

const rl = readline.createInterface({ input, output });
// loop para aceitar somente as respostas pedidas
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
    // buscando o registro do usuário no "banco" (arquivo JSON)
    rtrnUser(user).then(userRes => {
        if (userRes == "") {
            console.log("Erro: Usuário não encontrado. Confira seus dados e tente novamente ou cadastre-se");
        } else {
            // checando se a senha passada pelo usuário bate com o banco de dados
            chkPass(pass, userRes[0].senha).then(res => {
                if (res) {
                    console.log(`Usuário encontrado. Bem vindo ${userRes[0].nome}`);
                } else {
                    console.log("Erro: Senha incorreta. Confira seus dados e tente novamente");
                    process.exit(1);
                }
            }).catch(err => {
                console.log(err);
                process.exit(1);
            });
        }
    }).catch(err => {
        console.log(err);
        process.exit(1);
    })
    // linha de código fora da promise para exemplificar a assincronidade do programa
    console.log("Buscando usuário, por favor aguarde...\n");
} else if (answer == "N" || answer == "n") {
    const newUser = await rl.question("Criando um usuário novo...\n\nDigite seu usuário: ");
    const newPass = await rl.question("Crie uma senha para seu usuário: ");

    rl.close();
    // inserindo o novo registro no arquivo
    wrtUser(newUser, newPass).then(res => {
        if (res === undefined) {
            console.log("Novo usuário registrado com sucesso. Por favor, abra nova");
        } else {
            console.log("Ocorreu um erro ao registrar seu usuário. Por favor, tente novamente mais tarde");
        }
    }).catch(err => {
        console.log(err);
    });
    // linha de código fora da promise para exemplificar a assincronidade do programa
    console.log("Criando usuário, por favor aguarde...\n");
}

/* funcionalidades a serem implementadas

    funcionalidades urgentes
        - conexão com banco de dados PostgreSql

    próximas funcionalidades
        - verificação de duas etapas
        - funcionalidade de recuperação de senha
        - bloquear a inserção de dados repetidos
*/