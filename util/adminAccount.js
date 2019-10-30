const bcrypt = require('bcryptjs');

const User = require('../models/user');
const config = require('./config');

exports.createAdminAccount = async () => {
    const email = config.adminEmail;
    const password = config.password;
    const mobilePhone = config.mobilePhone;
    const firstName = config.firstName;
    const lastName = config.lastName;
    const isAdmin = true;
    const hashedPw = await bcrypt.hashSync(password, 12);

    try {
        const existingAdmin = await User.findOne({ email: email, isAdmin: true });
        if (!existingAdmin) {

            const user = new User({
                email: email,
                password: hashedPw,
                mobilePhone: mobilePhone,
                firstName: firstName,
                lastName: lastName,
                isAdmin: isAdmin
            });

            await user.save();
            console.log('Admin created')
        } else {
            console.log('Admin already exist')
        }
    } catch (err) {
        console.log(err)
    }
}

