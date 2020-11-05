const axios = require('axios')

const BASE_URL = 'http://localhost:4021'

async function test_create(resource) {
    const result = await axios.post(`${BASE_URL}/api/resources`, resource)
    return result.data
}

async function test_get(id) {
    const result = await axios.get(`${BASE_URL}/api/resources/${id}`)
    return result.data
}

async function test_replace(id, resource) {
    const result = await axios.put(`${BASE_URL}/api/resources/${id}`, resource)
    return result.data
}

async function test_patch(id, partial_resource) {
    const result = await axios.patch(`${BASE_URL}/api/resources/${id}`, partial_resource)
    return result.data
}

async function test_delete(id) {
    const result = await axios.delete(`${BASE_URL}/api/resources/${id}`)
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

tests()