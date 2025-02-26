import * as bcrypt from 'bcrypt';

export async function hashPass(password) {
    let senhaCrypto;
    await bcrypt.hash(password, 10).then((hash) => {
        senhaCrypto = hash;
    }).catch((err) => {
        return `Ocorreu o seguinte erro: ${err}`;
    })
    return senhaCrypto;
}

export function chkPass(passUser, passDb) {
    return bcrypt.compare(passUser, passDb).then((res) => {
        return res;
    }).catch(err => {
        return err;
    })
}