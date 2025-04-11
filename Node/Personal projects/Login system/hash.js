import * as bcrypt from 'bcrypt';

export function hashPass(password) {
    return bcrypt.hash(password, 14).catch(() => {
        return "";
    });
}

export function chkPass(passUser, passDb) {
    return bcrypt.compare(passUser, passDb).then((res) => {
        return res;
    }).catch(() => {
        return "";
    });
}