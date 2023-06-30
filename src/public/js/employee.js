// window.onload(function(){
//     createEvents();
// })




window.onload = (event) => {
    createEvents();
    new EmployePage();

};

class EmployePage{
    ListEmployee;
    constructor(){
        this.intEvents();
        this.loadData();
    }
      // Load dữ liệu cho table
    // author: Huy (25/2/2023)

    loadData(){
        try {
            
            // gọi API thực hiện lấy dữ liệu
            fetch("https://localhost:44370/api/Employees")
            .then(res => res.json())
            .then(data =>{
                this.ListEmployee = data;
                // Build Table:
                this.buildDataTable(data);
            })


        } catch (error) {
            console.log(error);
        }
    }
            // Load dữ liệu cho table
    // author: Huy (25/2/2023)
    buildDataTable(data){
        try {
            let table = document.getElementById("tbEmployeeList");
            let bodyTable = table.lastElementChild;

            //Duyệt các tiêu đề của Table, đọc các thông tin được khai báo
            let thList = table.getElementsByTagName("th");

            // Duyệt các đối tượng trong danh sách dữ liệu -> lấy ra các thông tin tương ứng và build tr...
            for (const item of data) {
                let trElement = document.createElement("tr");

                for (const col of thList) {
                    // lấy ra type
                    const type = col.getAttribute("type");
                    if(type == "checkbox"){
                        //checkbox
                    let tdcheckbox = document.createElement("td");
                    tdcheckbox.classList.add("text-align--left");
                    let checkboxElement = document.createElement("input");
                    checkboxElement.setAttribute("type", "checkbox");
                    tdcheckbox.append(checkboxElement);
                    trElement.append(tdcheckbox);
               
                        
                }else{
                        // Lấy ra modle-name
                   const modelName = col.getAttribute("model-name");
                   const value = item[modelName];
                   let tdElement = document.createElement("td");
                   tdElement.textContent = value;
                   trElement.append(tdElement);
                    }
                    
                }
                bodyTable.append(trElement);
            }

            // Tạo từng dòng dữ liệu tương ứng từng đối tượng trong ds nhân viên sau đó đẩy lên table
            // 1. Duyệt từng đối từng trong danh sách
            for (const item of this.ListEmployee) {

                // 2. Lấy ra thông tin cần thiết
                const EmployeeCode = item.employeeCode;
                const fullName = item.employeeName;
                const genderName = item.employeeGender;
                const dob = item.DateOfBirth;
                const positionName = item.PositionName; 
                const phoneNumber = item.PhoneNumber;
                // 3. Build html thể hiện các thông tin trên table
                let trElement = document.createElement("tr");

                //checkbox
                let tdcheckbox = document.createElement("td");
                tdcheckbox.classList.add("text-align--left");
                let checkboxElement = document.createElement("input");
                checkboxElement.setAttribute("type", "checkbox");
                tdcheckbox.append(checkboxElement);
                
                // checkbox

                trElement.append(tdcheckbox)

                // Mã nhân viên
                trElement.append(this.buildTdElement(EmployeeCode));
                

                // Họ và tên
                trElement.append(this.buildTdElement(fullName));

                //giới tính
                trElement.append(this.buildTdElement(genderName));
            
                //ngày sinh
                trElement.append(this.buildTdElement(dob));

                // chức vụ
                trElement.append(this.buildTdElement(positionName));

                
                
                // 4. đẩy vào table     
                // Xác định vị trí append vào
                bodyTable.append(trElement);
            }
           
        } catch (error) {
            console.log(error);
        }
    }

    // Tạo element tr HTML
    // author: Huy (25/2/2023)

   
    buildTdElement(textContent, formatType){
        let tdElement = document.createElement("td");
        try {
            tdElement.classList.add("text-align--left");
            //Định dạng dữ liệu:
            switch (formatType) {
                case 1:
                    //định dạng ngày tháng
                    textContent = this.formatDate(textContent);
                    break;
                case 2:
                    // định dạng tiền
                    this.formatMoney(textContent);
                    break;
            
                default:
                    break;
            }
            tdElement.textContent = textContent;
            return tdElement;

        } catch (error) {
            return tdElement
        }
    }

    formatDate(date){
        try {
            date = new Date(date);
            // lấy ngày
            let dateValue = date.getDate();
            // Lấy ra tháng
            let month = date.getMonth() + 1;
            // lấy ra năm:
            let year = date.getFullYear();
            return `${dateValue}/${month}/${year}`;
        } catch (error) {
            return ""; 
        }
    }


    intEvents(){

    }
}

function loadData(){

}


function createEvents(){
    try {
        document.getElementById("btn-reload").addEventListener("click", reloadLocation)
        document.getElementById("btn-add").addEventListener("click",btnAddOnClick);
        document.getElementById("btn-close").addEventListener("click",btnClickHideFrom);        
        document.getElementById("btn-cancel").addEventListener("click", btnClickHideFrom);
    } catch (error) {
        
    }
}

function reloadLocation(){
    location.reload();
}

   

function btnAddOnClick(){
    document.getElementById("form-detail").style.display = "block";
}

function btnClickHideFrom(){
    document.getElementById("form-detail").style.display = "none";
}


// validate form

// var employeeCode = document.querySelector('#txtEmployeeCode')
// var employeeName = document.querySelector('#txtEmployeeName')
// var employeePoition = document.querySelector('#txtEmployeePosition')
// var employeeEmail = document.querySelector('#txtEmployeeEmail')
// var employeeDOB = document.querySelector('#txtEmployeeDOB')
// var form = document.querySelector('#form-employee')


// function showError(input, message){
//     let parent = input.parentElement
//     let small = parent.querySelector('small')
//     parent.classList.add('error')
//     small.innerText = message
// }

// function showSuccess(input){
//     let parent = input.parentElement
//     let small = parent.querySelector('small')
//     parent.classList.remove('error')
//     small.innerText = ''
// }

// function checkEmptyError(listinput){
//     let isEmptyError = false;
//     listinput.forEach(input => {
//         input.value = input.value.trim()
//         if(!input.value){
//             isEmptyError = true;
//             showError(input, 'Nội dung không được để trống')
//         }else{
//             showSuccess(input);
//         }
//     });
//     return isEmptyError
// }

// function checkEmailError(input){
//     const regexEmail =
//     /^\S+@\S+\.\S+$/
//     input.value = input.value.trim()

//     let isEmailError = !regexEmail.test(input.value)

//     if(regexEmail.test(input.value)){
//         showSuccess(input)
//     }else{
//         showError(input, 'Email không hợp lệ')
//     }
//     return isEmailError
// }

// function validateDate(input) {
//     // Check if dateString is a valid date
//     if (isNaN(Date.parse(input))) {
//         showError(input, 'Ngày sinh không hợp lệ')
//     }
  
//     // Check if the date is in the past
//     var inputDate = new Date(input);
//     var currentDate = new Date();
//     if (inputDate < currentDate) {
//         showError(input, 'Ngày sinh không hợp lệ')

//     }else{
//         showSuccess(input)

//     }
  
//     return true;
//   }  

// form.addEventListener('submit', function(e){
//     e.preventDefault()

//     let isEmptyError = checkEmptyError([employeeCode, employeeName, employeePoition])
//     let isEmailError = checkEmailError(employeeEmail)
//     // let isDateOfBirth = validateDate(employeeDOB)

// })

// // blur
// var listItem = []

// employeeCode.addEventListener("blur", function(){
//     checkEmptyError([employeeCode])
// })
// employeeName.addEventListener("blur", function(){
//     checkEmptyError([employeeName])
// })
// employeePoition.addEventListener("blur", function(){
//     checkEmptyError([employeePoition])

// })
// employeeEmail.addEventListener("blur", function(){
//     checkEmailError(employeeEmail)

// })


// var dropdownicon = document.getElementsByClassName('dowpdown-icon');

// // show dropdown
// function toggleDropdown() {
//     var dropdownList = document.querySelector('.dropdownList');
//     dropdownList.hidden = !dropdownList.hidden;
//   }