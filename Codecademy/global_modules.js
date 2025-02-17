import os from 'node:os';
console.log(os.type());
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

const user = await rl.question('Usuário: ');
const password = await rl.question('Senha: ');

rl.close();