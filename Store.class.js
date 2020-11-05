const fs = require('fs')
const { v4: uuidv4 } = require('uuid')

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

class Store {
    constructor(name, options = {}) {
        this.name = name
        this.content = {}

        this.filePath = options.filePath
        this.interval = undefined
        this.persistTime = options.persistTime || 3000 // temps en ms

        // this.path = options.path || undefined
        // 

        this.autoLoad()
        this.autoSave()


    }

    getById(id) {
        return this.content[id]
    }

    getBy(keyName, value) {
        const contentArray = Object.values(this.content)
        const resource = contentArray.find((el) => el[keyName] === value)
        return resource
    }

    add(resource) {
        const id = uuidv4()
        resource.id = id
        this.content[id] = resource
        console.log("added")
        return resource
    }

    delete(id) {
        if (!this.content[id])
            return false
        delete this.content[id]
        return true
    }

    replace(id, resource) {
        if (!this.content[id])
            return false
        this.content[id] = resource
        return resource
    }

    patch(id, resource) {
        if (!this.content[id])
            return false
        this.content[id] = { ...this.content[id], ...resource }
        console.log("patched")

        return this.content[id]
    }

    autoSave() {
        if (!this.filePath) return ;
        this.interval = setInterval(() => {
            this.save()
        }, this.persistTime)
    }

    autoLoad() {
        if (!this.filePath) return ;
        const exist = fs.existsSync(this.filePath)
        if (!exist) {
            fs.writeFileSync(this.filePath, JSON.stringify(this.content))
        }
        const str_data = fs.readFileSync(this.filePath).toString('utf-8')
        this.content = JSON.parse(str_data)
    }

    save() {
        fs.writeFile(this.filePath, JSON.stringify(this.content), (err) => {
            if (!err)
                console.log(`File Store ${this.name} saved`)
            else
                console.error('Cannot save Store ' + this.name)
        })
    }


}

exports.Store = Store