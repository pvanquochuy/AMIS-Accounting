import express from "express"
import homeController from '../controller/homeController'
let router = express.Router()

const initWebRoute = (app) => {

    router.get('/', homeController.getHomepage)
    router.get('/detail/employee/:employeeCode', homeController.getDetailEmployee)
    router.post('/delete-employee', homeController.deteleEmployee)
    router.post('/create-new-employee', homeController.createNewEmployee)
    router.get('/edit-employee/:code', homeController.getEditEmployee) // lấy thông tin nv vào form update
    router.post('/update-employee', homeController.postUpdateEmployee)

    return app.use('/', router)
}

export default initWebRoute