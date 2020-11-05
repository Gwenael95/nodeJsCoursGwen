const axios = require("axios")
const BASE_URL = 'http://localhost:4021';

async function test_create(resource){
    const result = await axios.post(`${BASE_URL}/api/resources`, resource)
    return result.data;
}

async function test_get(id){
    const result = await axios.get(`${BASE_URL}/api/resources/${id}`)
    return result.data;
}

async function test_replace(id, resource){
    const result = await axios.put(`${BASE_URL}/api/resources/${id}`, resource)
    return result.data;
}

async function test_patch(id, partial_resource){
    const result = await axios.patch(`${BASE_URL}/api/resources/${id}`, partial_resource)
    return result.data;
}

async function test_delete(id){
    const result = await axios.delete(`${BASE_URL}/api/resources/${id}`)
    return result.data;
}

async function test(){
    const newResource = {
        name: "hello",
        answer: "hi"
    }
    const createResult = await test_create(newResource);
    console.log({createResult});

    const getResult1 = await test_get(createResult.id);
    console.log({getResult1})
//good

    const replaceRes = await test_replace(createResult.id,  {id:createResult.id, name:"newName", answer: "new answer"});
    console.log({replaceRes})

    const patchRes = await test_patch(createResult.id, {name:"testest"});
    console.log({patchRes})


    //const deleteRes = await test_delete(createResult.id);
    //console.log({deleteRes})
}



test();








