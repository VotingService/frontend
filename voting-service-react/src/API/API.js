import axios from "axios"

async function baseRequest({ urlPath = '', method = 'GET' , body}){
    return axios.post('http://localhost:8080/' + urlPath, body);
}

export async function register(body){
        return await baseRequest({urlPath: 'api/v1/auth/register', body: body,
            })
}