const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');

class UserService {
    async registration (email, password) {

        const candidate = await userModel.findOne({ email });
        
        if(candidate){
            throw new Error(`Пользователь с почтой ${email} уже сущесвует`); 
        }

        const hashPassword = await bcrypt.hash(password, 3);

        const user = await userModel.create({ email, password: hashPassword, activationLink });

        return user;
    }
}

module.exports = new UserService()