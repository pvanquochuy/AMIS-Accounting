import express from "express"
import APIController from '../controller/apiController'
let router = express.Router()

const initAPIRoute = (app) => {

    router.get('/employees', APIController.getAllUsers) // method Get
    router.post('/create-employee', APIController.createNewEmployee) // method post
    router.put('/update-employee', APIController.updateEmployee)
    router.delete('/delete-employee/:employeeCode', APIController.deleteEmployee)
 
    return app.use('/api/v1/', router)
}

export default initAPIRoute