import pool from "../configs/connectDB"


let getAllUsers = async (req, res) =>{
    const [rows, fields] = await pool.execute('SELECT * FROM employee')

    return res.status(200).json({
        message: 'ok',
        data: rows
    }) 
}

// loi
let createNewEmployee = async (req, res) =>{
    if(!EmployeeID || !EmployeeCode){
        return res.status(200).json({
            message: 'missing required params'
        })
    }
    let EmployeeID = uuidv4()
    let { EmployeeCode, EmployeeName, EmployeeDeparmentName, EmployeePositionName, EmployeeDateOfBirth, EmployeeIDNumber, CreatedDate, EmployeeAddress, EmployeeMobilePhoneNumber, EmployeeEmail, EmployeeCreditCardNumber, EmployeeBankName, EmployeeBankBranch} = req.body
    await pool.execute('INSERT INTO employee (EmployeeId, EmployeeCode, EmployeeName, EmployeeDeparmentName, EmployeePositionName, EmployeeDateOfBirth, EmployeeIDNumber, CreatedDate, EmployeeAddress, EmployeeMobilePhoneNumber, EmployeeEmail, EmployeeCreditCardNumber, EmployeeBankName ,EmployeeBankBranch) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                    [EmployeeID, EmployeeCode, EmployeeName, EmployeeDeparmentName, EmployeePositionName, EmployeeDateOfBirth, EmployeeIDNumber, CreatedDate, EmployeeAddress, EmployeeMobilePhoneNumber, EmployeeEmail, EmployeeCreditCardNumber, EmployeeBankName, EmployeeBankBranch])

    return res.status(200).json({
        message: 'ok'
    })

}

// loix
let updateEmployee = async (req, res) =>{
    let {EmployeeID, EmployeeCode, EmployeeName, EmployeeDeparmentName, EmployeePositionName, EmployeeDateOfBirth, EmployeeIDNumber, CreatedDate, EmployeeAddress, EmployeeMobilePhoneNumber, EmployeeEmail, EmployeeCreditCardNumber, EmployeeBankName, EmployeeBankBranch} = req.body
    await pool.execute('UPDATE employee SET  EmployeeCode = ?, EmployeeName = ?, EmployeeDeparmentName = ?, EmployeePositionName = ?, EmployeeDateOfBirth = ?, EmployeeIDNumber = ?, CreatedDate = ?, EmployeeAddress = ?, EmployeeMobilePhoneNumber = ?, EmployeeEmail = ?, EmployeeCreditCardNumber = ?, EmployeeBankName = ?,EmployeeBankBranch = ? WHERE EmployeeID = ?', 
    [EmployeeCode, EmployeeName, EmployeeDeparmentName, EmployeePositionName, EmployeeDateOfBirth, EmployeeIDNumber, CreatedDate, EmployeeAddress, EmployeeMobilePhoneNumber, EmployeeEmail, EmployeeCreditCardNumber, EmployeeBankName, EmployeeBankBranch, EmployeeID])
    return res.status(200).json({
        message: 'ok'
    })
}

let deleteEmployee = async (req, res) =>{
    let employeeCode = req.params.employeeCode
    if( !employeeCode){
        return res.status(200).json({
            message: 'missing required params'
        })
    }
    await pool.execute('DELETE FROM employee WHERE EmployeeCode = ?', [employeeCode])
    return res.status(200).json({
        message: 'ok'
    })
}

module.exports = {
    getAllUsers, createNewEmployee, updateEmployee, deleteEmployee
}