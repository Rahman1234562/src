import fs from 'fs';
import path from 'path';
import bcrypt from 'bcrypt'

const filePath = path.join(process.cwd(), 'src', 'db', 'user.json');


export const getAllUsers = () => {
    const users = fs.readFileSync(filePath);
    return JSON.parse(users)
}


export const getByEmail = (email) => {
    const users = getAllUsers(); 

    return users.find((user) => user.email === email);
}


export const verifyPassword = async (password, hashpassword) => {
    const isValid = await bcrypt.compare(password, hashpassword);
    return isValid;
}


export const registerUser = async (email, password) => {
    const users = getAllUsers();
    const found = getByEmail(email);
    if(found) {
        throw new Error("user exist")
    }
    const hashPassword = await (password, 12)
        users.push({id: users.lenght + 1, email, password: hashPassword });
        fs.writeFileSync(filePath, JSON.stringify(users));
        return {email}
    
}