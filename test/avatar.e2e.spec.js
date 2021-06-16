const supertest = require('supertest');
const jwt = require('jsonwebtoken');
const fs = require('fs/promises');
const path = require('path');
const Users = require('../repositories/users');
require('dotenv').config();

require('dotenv').config();

const app = require('../app');
const db = require('../model/db');
const User = require('../model/user');

const { testUser } = require('./data/data');

describe('Test route user avatars', () => {
    let user, token, re;

    beforeAll(async () => {
        await db;
        await User.deleteOne({ email: testUser.email });
        user = await User.create(testUser);
        const SECRET_KEY = process.env.SECRET_KEY
        const issueToken = (payload, secret) => jwt.sign(payload, secret)
        token = issueToken({ id: user._id }, SECRET_KEY)
        await Users.updateToken(user._id, token)
        re = new RegExp(`^${user._id}\.+avatar.jpg$`);
    });

    afterAll(async () => {
        const avatar = await fs.readdir(path.join('public', process.env.AVATAR_OF_USERS, `${user._id}`));
        await fs.unlink(path.join('public', process.env.AVATAR_OF_USERS, `${user._id}`, avatar.toString()));
        await fs.rmdir(path.join('public', process.env.AVATAR_OF_USERS, `${user._id}`));
        const mongo = await db;
        await User.deleteOne({ email: testUser.email });
        await mongo.disconnect();
    });

    test('Upload user avatar success', async () => {

        const buf = await fs.readFile('./test/data/avatar.jpg');
        const response = await supertest(app)
            .patch('/api/users/avatars')
            .set('Authorization', `Bearer ${token}`)
            .attach('avatar', buf, 'avatar.jpg')
        expect(response.status).toEqual(200);
        expect(response.body).toBeDefined();
        expect(response.body.status).toEqual('success');
        expect(response.body.code).toEqual(200);
        expect(response.body.data.avatarURL).toBeDefined();
        expect(re.test(response.body.data.avatarURL)).toBeTruthy();
    });

    test('Upload user avatar fail token', async () => {
        const fakeToken = 'fgjhdgjfghkghlhjkkhdfsghfdgs.sdfgdfsgsfd.sfghfgh';
        const buf = await fs.readFile('./test/data/avatar.jpg');
        const response = await supertest(app)
            .patch('/api/users/avatars')
            .set('Authorization', `Bearer ${fakeToken}`)
            .attach('avatar', buf, 'avatar.jpg')
        expect(response.status).toEqual(401)
    });
});