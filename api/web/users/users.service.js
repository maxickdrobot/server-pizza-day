const { users } = require("./mocks/users_mock");

const getUserById = async (userId) => {
    const user = users.find((user) => user.id == userId);
    if (user) {
        return user;
    } else {
        throw new Error("User not found");
    }
};

const addUser = async (userData) => {
    const newUser = {
        id: users.length + 1,
        ...userData,
    };

    users.push(newUser);
    return newUser;
};

const getUsers = async () => {
    return users;
};

module.exports = {
    getUserById,
    addUser,
    getUsers,
};
