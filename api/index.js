import axios from 'axios'
import employee from './employee.js'

let instance = axios.create({
    baseURL: 'https://dummy-api.cm.edu/'
})

export default {
    employee: employee(instance)
}