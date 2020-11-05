const axios = require('axios')

const BASE_URL = 'http://localhost:4021'
const BASE_URL_API = BASE_URL + "/api/resources"
const BASE_URL_AUTH = BASE_URL + "/auth"

//region tests for resources
async function test_create(resource) {
    const result = await axios.post(`${BASE_URL_API}`, resource)
    return result.data
}

async function test_get(id) {
    const result = await axios.get(`${BASE_URL_API}/${id}`)
    return result.data
}

async function test_replace(id, resource) {
    const result = await axios.put(`${BASE_URL_API}/${id}`, resource)
    return result.data
}

async function test_patch(id, partial_resource) {
    const result = await axios.patch(`${BASE_URL_API}/${id}`, partial_resource)
    return result.data
}

async function test_delete(id) {
    const result = await axios.delete(`${BASE_URL_API}/${id}`)
    return result.data
}

async function tests() {
    const newResource = {
        name: 'Is it a real resource?',
        answer: 'May be'
    }

    const createResult = await test_create(newResource)
    console.log({ createResult })
    const getResult_1 = await test_get(createResult.id)
    console.log({ getResult_1 })

    const patchResult = await test_patch(createResult.id, { name: 'Oups', 'field1': 1 })
    console.log({ patchResult })

    // const deleteResult = await test_delete(createResult.id)
    // console.log({ deleteResult })

}
//endregion

//region test auth
async function test_create_user(user) {
    const result = await axios.post(`${BASE_URL_AUTH}/register`, user)
    return result.data
}
async function test_login(user) {
    const result = await axios.post(`${BASE_URL_AUTH}/login`, user)
    return result.data
}
async function test_Auth_me(user) {
    const result = await axios.get(`${BASE_URL_AUTH}/me`, user)
    return result.data
}

async function testsAuth() {
    const newUser = {
        pseudo: 'pseudoName' + (Date.now()%20),
        password: "dumbPass"
    }

    const createResult = await test_create_user(newUser)
    console.log({ createResult })
    const getResult_1 = await test_login(newUser)
    console.log({ getResult_1 })

    const patchResult = await test_Auth_me( {token: getResult_1.token})
    console.log({ patchResult })

    // const deleteResult = await test_delete(createResult.id)
    // console.log({ deleteResult })

}
//endregion

testsAuth()