import axios from 'axios'
const apiClient = axios.create({
    baseURL:'https://my-json-server.typicode.com/Jasmxnej/48',
    withCredentials: false,
    headers: {
        Accept: 'application/json'
    }
})
export default{
    getEvents() {
        return apiClient.get('/events')
    },
    getEvent(id: number){
        return apiClient.get('/events'+id)
    }
}

