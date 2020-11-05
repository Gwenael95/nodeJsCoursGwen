const path = require('path')
const { Store } = require('./Store.class')

const str_resources_filePath = path.resolve(__dirname, 'data', 'resources.json')
const str_users_filePath = path.resolve(__dirname, 'data', 'users.json')


const store = {
    'resources': new Store('resources', { filePath: str_resources_filePath, persistTime: 10000 }),
    'users': new Store('users', { filePath: str_users_filePath, persistTime: 10000 }),
}

module.exports = store