import axios from "axios"

async function baseRequest({ urlPath = '', body}){
    return axios.post('http://localhost:8080/' + urlPath, body);
}

export async function register(body){
        return await baseRequest({urlPath: 'api/v1/auth/register', body: body,
            })
}

export async function login(body){
    return await baseRequest({urlPath: 'api/v1/auth/authenticate', body: body,
    })
}