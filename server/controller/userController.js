
exports.getUsers = async (req, res, next) => {
    try {

        return res.status(200).send('get users').end();

    } catch (error) {
        return res.status(500).send('server error').end();
    }
}

exports.getUser = async (req, res, next) => {
    try {

        return res.status(200).send('get user').end();

    } catch (error) {
        return res.status(500).send('server error').end();
    }
}

exports.addUser = async (req, res, next) => {
    try {

        return res.status(200).send('add user').end();

    } catch (error) {
        return res.status(500).send('server error').end();
    }
}

exports.deleteUser = async (req, res, next) => {
    try {

        return res.status(200).send('delete user').end();

    } catch (error) {
        return res.status(500).send('server error').end();
    }
}

exports.updateUser = async (req, res, next) => {
    try {

        return res.status(200).send('update user').end();

    } catch (error) {
        return res.status(500).send('server error').end();
    }
}