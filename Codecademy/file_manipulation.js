import { readFile } from 'node:fs/promises';
import { writeFile } from 'node:fs/promises';
import { hashPass } from './hash.js';

const filePath = "data.json";

export function rtrnUser(user) {
    return readFile(filePath, "utf-8").then(jsonRes => {
        let data = JSON.parse(jsonRes);
        return data.usuarios.filter((value => {
            return value.nome == user;
        }));
    }).catch(() => {
        return "";
    });
}

export function wrtUser(user, pass) {
    return readFile(filePath, "utf-8").then(async jsonRes => {
        let data = JSON.parse(jsonRes);
        if (data.usuarios.filter(value => {
            return value.nome === user;
        }) != "") {
            return "igual";
        } else {
            let newData = {
                "nome": user,
                "senha": await hashPass(pass)
            };
            data.usuarios.push(newData);
            return await writeFile(filePath, JSON.stringify(data, null, 2)).catch(() => { return ""; });
        }
    }).catch(() => {
        return "";
    });
}
/*
rtrnUser("Rogério").then(res => {
    console.log(res);
})

wrtUser("Nina", "asdasd.,8").then(res => {
    console.log(res);
})|*/

/*var x = await wrtUser("Mbape", "Siu321zé").then(res => {
    if (res == "igual") console.log("é de fato igual");
    else console.log("criou o registro");
}).catch(err => { console.log(err) });*/