const {Store} = require('./Store_class.js');
const store = {
    resources: new Store('resources')
}
//store.resources.add();
module.exports = store;