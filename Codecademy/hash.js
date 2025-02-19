import * as bcrypt from 'bcrypt';

function hash(password) {
    bcrypt.hash(password, 10).then((hash, err) => {
        if (!err) return hash;
        else return console.log(`Ocorreu o seguinte erro ao tentarmos registrar sua senha: ${err}`);
    })
}