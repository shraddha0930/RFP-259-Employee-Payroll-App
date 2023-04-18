const salary = document.querySelector("#salary");
const output = document.querySelector(".salary-output");
salary.oninput = function() {
    output.textContent = salary.value;
};
class EmployeePayrollData {

    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }

    get name() {
        return this._name;
    }
    set name(name) {
        const NAME_REGEX = RegExp("^[A-Z]{1}[A-Za-z]{2,}$");
        if (NAME_REGEX.test(name)) {
            this._name = name;
        } else throw "Name is Incorrect!";
    }
    get profilePic(){
        return this._profilePic;
    }
    set profilePic(profilePic){
        this._profilePic = profilePic;
    }

    get salary() {
        return this._salary;
    }
    set salary(salary) {
        this._salary = salary;
    }

    get gender() {
        return this._gender;
    }
    set gender(gender) {
        this._gender = gender;
    }
    get note(){
        return this._note;
    }
    set note(note){
        this._note = note;
    }

    get startDate() {
        return this._startDate;
    }
    set startDate(startDate) {
        this._startDate = startDate;
    }

    get departments() {
        return this._departments;
    }
    set departments(departments) {
        this._departments = departments;
    }

    toString() {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const employeeDate = !this.startDate ? "undefined" :
            this.startDate.toLocaleDateString("en-US", options);
        return "[ id: " + this.id + ", name: " + this.name + ", salary: " + this.salary +
            ", profilePic: " + this.profilePic + ", gender: " + this.gender + ", startDate: " + employeeDate + ", departments: " + this.departments + ", note: " + this.note +" ]";
    }
}

function save() {
    let employeePayrollData = new EmployeePayrollData();
    employeePayrollData.name = document.querySelector("#name").value;
    employeePayrollData.gender = document.querySelector("#male").checked ? "M" : "F";
    employeePayrollData.salary = document.querySelector("#salary").value;
    dateString = document.querySelector("#month").value + " " + document.querySelector("#day").value + ", " + document.querySelector("#year").value;
    employeePayrollData.startDate = new Date(dateString);
    let departmentsArray = [];
    document.querySelectorAll("[name=department]").forEach(input => {
        if (input.checked) departmentsArray.push(input.value);
    });
    employeePayrollData.departments = departmentsArray;
    alert("Employee Added Successfully!\n" + employeePayrollData.toString());
}