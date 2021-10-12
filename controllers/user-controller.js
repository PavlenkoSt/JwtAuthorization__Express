const userService = require('../services/user-service');

class UserController {
    async registration (req, res, next) {
        try{
            const { email, password } = req.body;
            const userData = await userService.registration(email, password);

            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            res.json(userData);
        }catch(e){
            console.log(e);
        }
    }

    login (req, res, next) {
        try{

        }catch(e){
            
        }
    }
    
    logout (req, res, next) {}

    activate (req, res, next) {}

    refresh (req, res, next) {}

    getUsers (req, res, next) {}

}

module.exports = new UserController()