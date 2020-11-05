const fs = require('fs');
//npm i --save uuid
const {v4 : uuidV4} = require('uuid') //rename V4 into uuidV4
/*
Exercice 01:
Completer les fonctions de cette Class (add, delete, get, patch, replace)
Et les utiliser dans les routes
*/

/*
Exercice 02:
- Persister la donnee dans un fichier JSON
- Choix du chemin de sauvegarde via les `options`
functions a terminer: save, autoSave, autoLoad
*/
class Store{
    constructor(name, options = {filePath:"./store/data.json", persist:true}) {
        this.name = name; //name = resources
        this.content = {}
        this.filePath = options.filePath;
        this.persist = options.persist;
        this.autoSave();
        this.autoLoad();
    }

    getContent(){
        return this.content
    }
    getByID(id) {
        return this.content[id];
    }

    add(resource){
        //const id= Object.keys(this.content).length
        const id= uuidV4();
        resource.id=id;
        this.content[id] = resource
        console.log(this.getContent())
        this.save();
    }

    remove(id){
        if (this.content[id]){
            delete this.content[id]
            this.save();
            return true;
        }
        return false;
    }
    replace(id, resource) {
        if (this.content[id]) {
            this.content[id] = resource
            this.save();
            return true;
        }
        return false;
    }

    patch(id, resource){
        this.content[id] = { ...this.content[id], ...resource }
        this.save();
        return this.content[id];
    }


    autoSave(){
        if (this.persist) {
             setInterval(()=>this.save(), 12000);
        }
    }
    async autoLoad(){
        if (this.persist) {
            let rawdata = fs.readFileSync(this.filePath);
            let data = JSON.parse(rawdata);
            console.log(data);
            this.content = data;
        }
    }
    async save(){
        if (this.persist) {
            let data = JSON.stringify(this.content);
            await fs.writeFileSync(this.filePath, data);
            console.log("save registered")
        }
    }
}

exports.Store = Store


