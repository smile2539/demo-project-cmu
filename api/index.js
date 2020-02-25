import axios from 'axios'
import employee from './employee.js'

let instance = axios.create({
    baseURL: 'http://dummy.restapiexample.com/api/v1/'
})

export default {
    employee: employee(instance)
}