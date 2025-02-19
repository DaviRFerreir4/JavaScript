import * as bcrypt from 'bcrypt';

function hash(password) {
    let hashPass;
    bcrypt.hash(password, 10).then((hash, err) => {
        
    })
}