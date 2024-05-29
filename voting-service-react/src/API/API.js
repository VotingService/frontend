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

export async function getAllBallotsByUser(headers, userId){
    return await baseRequest({
        urlPath: `api/v1/ballots/voter/${userId}`, method: "GET", headers: headers
    })}

export async function createElection(body, headers){
    return await baseRequest({
        urlPath: "api/v1/admin/createElection", method: "POST", headers: headers, body: body
    })
}

export async function getAllUsers(headers){
    return await baseRequest({
        urlPath: "api/v1/users", method: "GET", headers: headers
    })
}

export async function registerUserAsCandidate(headers, electionId, candidateId){
    return await baseRequest({
        urlPath: `api/v1/admin/registerAsCandidate/${electionId}/${candidateId}`, method: "POST", headers: headers
    })
}

export async function getUserCanParticipateInElections(id, headers) {
    return await baseRequest({urlPath: `api/v1/election/userCanParticipateIn/${id}`,
    method: "GET", headers: headers})
}

export async function getAllElections(headers){
    return await baseRequest({urlPath: "api/v1/election", method: "GET", headers: headers})
}