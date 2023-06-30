import pool from "../configs/connectDB"
import { v4 as uuidv4 } from 'uuid'

let getHomepage = async (req, res) =>{
        const [rows, fields] = await pool.execute('SELECT * FROM employee')
        return res.render('employee.ejs', {dataUser: rows})
        
}

let getDetailEmployee = async (req, res) =>{
  
    let employeeCode = req.params.employeeCode
    let [employee] = await pool.execute('select * from employee where EmployeeCode = ?', [employeeCode])
    return res.render('formDetail.ejs', {dataUser: employee[0]})
}

let createNewEmployee = async (req, res) => {
    let EmployeeID = uuidv4()
    let { EmployeeCode, EmployeeName, EmployeeDeparmentName, EmployeePositionName, EmployeeDateOfBirth, EmployeeIDNumber, CreatedDate, EmployeeAddress, EmployeeMobilePhoneNumber, EmployeeEmail, EmployeeCreditCardNumber, EmployeeBankName, EmployeeBankBranch} = req.body
    await pool.execute('INSERT INTO employee (EmployeeId, EmployeeCode, EmployeeName, EmployeeDeparmentName, EmployeePositionName, EmployeeDateOfBirth, EmployeeIDNumber, CreatedDate, EmployeeAddress, EmployeeMobilePhoneNumber, EmployeeEmail, EmployeeCreditCardNumber, EmployeeBankName ,EmployeeBankBranch) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                                            [EmployeeID, EmployeeCode, EmployeeName, EmployeeDeparmentName, EmployeePositionName, EmployeeDateOfBirth, EmployeeIDNumber, CreatedDate, EmployeeAddress, EmployeeMobilePhoneNumber, EmployeeEmail, EmployeeCreditCardNumber, EmployeeBankName, EmployeeBankBranch])
    return res.redirect('/')
}

let deteleEmployee = async (req, res) =>{
    let employeeCode = req.body.employeeCode
    await pool.execute('DELETE FROM employee WHERE EmployeeCode = ?', [employeeCode])
    return res.redirect('/')
}

let getEditEmployee = async (req, res) =>{
    let code = req.params.code
    let [employee] = await pool.execute('SELECT * FROM employee WHERE EmployeeCode = ?', [code])
    return res.render('formUpdate.ejs', {dataUser: employee[0]})
}

let postUpdateEmployee = async (req, res) =>{
    let {EmployeeID, EmployeeCode, EmployeeName, EmployeeDeparmentName, EmployeePositionName, EmployeeDateOfBirth, EmployeeIDNumber, CreatedDate, EmployeeAddress, EmployeeMobilePhoneNumber, EmployeeEmail, EmployeeCreditCardNumber, EmployeeBankName, EmployeeBankBranch} = req.body
    await pool.execute('UPDATE employee SET  EmployeeCode = ?, EmployeeName = ?, EmployeeDeparmentName = ?, EmployeePositionName = ?, EmployeeDateOfBirth = ?, EmployeeIDNumber = ?, CreatedDate = ?, EmployeeAddress = ?, EmployeeMobilePhoneNumber = ?, EmployeeEmail = ?, EmployeeCreditCardNumber = ?, EmployeeBankName = ?,EmployeeBankBranch = ? WHERE EmployeeID = ?', 
    [EmployeeCode, EmployeeName, EmployeeDeparmentName, EmployeePositionName, EmployeeDateOfBirth, EmployeeIDNumber, CreatedDate, EmployeeAddress, EmployeeMobilePhoneNumber, EmployeeEmail, EmployeeCreditCardNumber, EmployeeBankName, EmployeeBankBranch, EmployeeID])
    return res.redirect('/')
}

module.exports = {
    getHomepage, getDetailEmployee, createNewEmployee, deteleEmployee, getEditEmployee, postUpdateEmployee
}