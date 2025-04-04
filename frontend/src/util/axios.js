import axios from "axios"

export const axiosIn=axios.create({
    baseURL:"http://localhost:4000/api",
    withCredentials:true
})