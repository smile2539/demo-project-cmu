export default (api) => {
    return {
        // showEmployee
        async fetchEmployee () {
            const res = await api.get('employees')
            return res.data
        },
        // delete
        async deleteEmployee (id) {
            const res = await api.delete('employees/:id')
            return res.data
        },
        // create
        async createEmployee (param) {
            const res = await api.post('employees/:id', param)
            return res.data
        }
    }
}
