const fs = jest.genMockFromModule('fs/promises');
const path = require('path');

async function rename(oldPath, newPath) {
    console.log("FROM PATH", oldPath);
    const file = { filename: newPath };
    return await file;
};

async function mkdir(folder) {
    console.log(folder);
    return await folder;
};

async function access(path) {
    return await false;
};

async function unlink(path) {
    return await false
};

fs.rename = rename;
fs.mkdir = mkdir;
fs.access = access;
fs.unlink = unlink

module.exports = fs;