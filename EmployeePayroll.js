window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function () {
        if (name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            (new EmployeePayrollData().name) = name.value;
            textError.textContent = "";
        } catch (e) {
            textError.textContent = e;
        }
    });
    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function () {
        output.textContent = salary.value;
    });
});
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
    get profilePic() {
        return this._profilePic;
    }
    set profilePic(profilePic) {
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
    get note() {
        return this._note;
    }
    set note(note) {
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
            ", profilePic: " + this.profilePic + ", gender: " + this.gender + ", startDate: " + employeeDate + ", departments: " + this.departments + ", note: " + this.note + " ]";
    }
}
const save = () => {
    try {
        let employeePayrollData = createEmployeePayroll();
        createEmployeePayrollStorage(employeePayrollData);
    } catch (e) {
        return;
    }
};

const createEmployeePayrollObject = () => {
    let employeePayrollData = new EmployeePayrollData();
    try {
        employeePayrollData.name = getInputValue("name");
    } catch (e) {
        setTextValue('.text-error', e);
        throw e;
    }

    employeePayrollData.profilePic = getSelectedValues("[name = profile]").pop();
    employeePayrollData.gender = getSelectedValues("[name = gender]").pop();
    employeePayrollData.department = getSelectedValues("[name = department]");
    employeePayrollData.salary = getInputValue("salary");
    employeePayrollData.note = getInputValue("notes");
    let date = getInputValue("day") + " " + getInputValue("month") + " " +getInputValue("year");
    employeePayrollData.date = Date.parse(date);
    alert(employeePayrollData.toString());
    return employeePayrollData;
}

const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItems = [];
    allItems.forEach(input => {
        if (input.checked) selItems.push(input.value);
    });
    return selItems;
};

const getInputValueByID = (Id) => {
    let value = document.querySelector(Id).value;
    return value;
};
function createAndUpdateStorage (employeePayrollData) {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));

    if(employeePayrollList != undefined) {
        employeePayrollList.push(employeePayrollData);
    } else {
        employeePayrollList = [employeePayrollData]
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}