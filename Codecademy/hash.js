import * as bcrypt from 'bcrypt';

export async function hashSenha(password) {
    let senhaCrypto;
    await bcrypt.hash(password, 10).then((hash) => {
        senhaCrypto = hash;
    }).catch((err) => {
        return `Ocorreu o seguinte erro: ${err}`;
    })
    return senhaCrypto;
}