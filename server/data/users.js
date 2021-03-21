import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin User',
        email: 'admin@mh29shop.com',
        password: bcrypt.hashSync('admin', 10),
        isAdmin: true
    },
    {
        name: 'Jill Jones',
        email: 'jill@gmail.com',
        password: bcrypt.hashSync('user', 10),
    },
    {
        name: 'jack jones',
        email: 'jack@gmail.com',
        password: bcrypt.hashSync('user', 10),
    },
]

export default users;