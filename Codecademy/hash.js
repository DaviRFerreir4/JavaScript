import * as bcrypt from 'bcrypt';

export function hashPass(password) {
    return bcrypt.hash(password, 14).catch((err) => {
        return `Ocorreu o seguinte erro: ${err}`;
    });
}

export function chkPass(passUser, passDb) {
    return bcrypt.compare(passUser, passDb).then((res) => {
        return res;
    }).catch(err => {
        return err;
    });
}

hashPass("asd").then(res => {
    console.log(res);
});