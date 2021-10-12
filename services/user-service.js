const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const tokenService = require('./token-service');
const UserDTO = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error');

class UserService {
    async registration (email, password) {

        const candidate = await userModel.findOne({ email });
        
        if(candidate){
            throw ApiError.badRequest(`Пользователь с почтой ${email} уже сущесвует`); 
        }

        const hashPassword = await bcrypt.hash(password, 3);

        const user = await userModel.create({ email, password: hashPassword });
        
        const userDto = new UserDTO(user);
        const tokens = await tokenService.generateToken({ ...userDto });

        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto }
    }

    async login (email, password) { 

        const user = await userModel.findOne({ email });
        
        if(!user){
            throw ApiError.badRequest(`Пользователя с почтой ${email} не сущесвует`); 
        }

        const passwordIsRight = await bcrypt.compare(password, user.password);

        if(!passwordIsRight){
            throw ApiError.badRequest(`Неверный пароль`); 
        }

        const userDto = new UserDTO(user);
        const tokens = await tokenService.generateToken({ ...userDto });

        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto }
    }

    async logout (refreshToken) {
        const removedToken = await tokenService.removeToken(refreshToken);
        return removedToken;
    }
}

module.exports = new UserService()