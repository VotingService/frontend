import axios from "axios"

async function baseRequest({urlPath = '', method, body, headers}) {
    let props = {
        method: method,
        url: 'http://localhost:8080/' + urlPath,
        headers: headers,
        data: body
    }
    return axios(props);
}

export async function register(body) {
    return await baseRequest({
        urlPath: 'api/v1/auth/register', body: body, method: "POST"
    })
}

export async function login(body) {
    return await baseRequest({
        urlPath: 'api/v1/auth/authenticate', body: body, method: "POST"
    })
}

export async function getUserData(id, headers){
    return await baseRequest({
        urlPath: `api/v1/users/${id}`, method: "GET", headers: headers
    })
}

export async function updateUserData(body, headers){
    return await baseRequest({
        urlPath: "api/v1/users", method: "PUT", headers: headers, body: body
    })
}

export async function changePassword(body, headers){
    return await baseRequest({
        urlPath: "api/v1/users/changePassword", method: "PATCH", headers: headers, body: body
    })
}

export async function getUserCanParticipateInElections(id, headers) {
    return await baseRequest({urlPath: `api/v1/election/userCanParticipateIn/${id}`,
    method: "GET", headers: headers})
}

export async function getElectionById(id, headers) {
    return await baseRequest({urlPath: `api/v1/election/${id}`,
        method: "GET", headers: headers})
}

export async function getAllCandidatesByElectionId(id, headers) {
    return await baseRequest({urlPath: `api/v1/election/candidates/${id}`,
        method: "GET", headers: headers})
}

export async function vote(headers, body) {
    return await baseRequest({urlPath: `api/v1/ballots/vote`,
        method: "POST", headers: headers, body: body})
}

