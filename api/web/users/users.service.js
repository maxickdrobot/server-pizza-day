const User = require("../../../models/users");

const getUserById = async (userId) => {
    const user = await User.findById(userId);
    if (user) {
        return user;
    } else {
        throw new Error("User not found");
    }
};

const addUser = async (userData) => {
    const newUser = new User(userData);
    await newUser.save();
    return newUser;
};

const getUserByEmail = async (email) => {
    const user = User.find({
        email,
    });
    return user;
};

const getUsers = async () => {
    const users = await User.find();
    return users;
};

module.exports = {
    getUserById,
    addUser,
    getUsers,
    getUserByEmail,
};
