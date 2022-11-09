const { User } = require("../../models");

module.exports = class UserRepository {
    findOne=async(user_id)=>{
        const user = await User.findOne({
            where:{userId:user_id}
        });
    
        return user;
    }

  findUserLogin = async (user_id, password) => {
    const user = await User.findOne({
        where:{userId:user_id,password}
    });

    return user;
  };

  createUser = async (user_id, password) => {
    const user = await User.create({
        userId:user_id,
        password
    });

    return user;
  };
};