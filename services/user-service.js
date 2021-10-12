const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const tokenService = require('./token-service');
const UserDTO = require('../dtos/user-dto');

class UserService {
    async registration (email, password) {

        const candidate = await userModel.findOne({ email });
        
        if(candidate){
            throw new Error(`Пользователь с почтой ${email} уже сущесвует`); 
        }

        const hashPassword = await bcrypt.hash(password, 3);

        const user = await userModel.create({ email, password: hashPassword, activationLink });
        
        const userDto = new UserDTO(user);
        const tokens = await tokenService.generateToken({ ...userDto });

        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }
    }
}

module.exports = new UserService()