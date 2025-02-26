import { readFile } from 'node:fs/promises';
import { writeFile } from 'node:fs/promises';

const filePath = "data.json";

export function rtrnUser(user) {
    return readFile(filePath, "utf-8").then(jsonRes => {
        let data = JSON.parse(jsonRes);
        return data.usuarios.filter((value => {
            return value.nome == user;
        }));
    }).catch(err => {
        return err;
    })
}

export function wrtUser(user, pass) {
    return readFile(filePath, "utf-8").then(jsonRes => {
        let data = JSON.parse(jsonRes);
        let newData = {
            "nome": user,
            "senha": pass
        }
        data.usuarios.push(newData)
        console.log(data.usuarios);
        writeFile(filePath, JSON.stringify(data, null, 2), err => {
            if (err) console.log(err);
            else console.log("foi?");
        })
    })
}