function getID(id) {
    return document.getElementById(id);
}
function getValue(id) {
    return document.getElementById(id).value;
}
function Validation() {

    this.checkEmpty = function (value, spanID, message) {
        if (value === "") {
            getID(spanID).innerHTML = message;
            getID(spanID).style.display = "block";
            return false;
        }
        getID(spanID).innerHTML = "";
        getID(spanID).style.display = "none";
        return true;
    }

    this.checkEmail = function (value, spanID, message) {
        let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (value.match(pattern)) {
            getID(spanID).innerHTML = "";
            getID(spanID).style.display = "none";
            return true;
        }
        getID(spanID).innerHTML = message;
        getID(spanID).style.display = "block";
        return false;
    }

    this.checkPass = function (value, spanID, message) {
        let pattern = /^(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,10}$/;
        if (value.match(pattern)) {
            getID(spanID).innerHTML = "";
            getID(spanID).style.display = "none";
            return true;
        }
        getID(spanID).innerHTML = message;
        getID(spanID).style.display = "block";
        return false;
    }

    this.checkPassTrung = function (value1, value2, spanID, message) {
        if (value1 === value2) {
            getID(spanID).innerHTML = "";
            getID(spanID).style.display = "none";
            return true;
        }
        getID(spanID).innerHTML = message;
        getID(spanID).style.display = "block";
        return false;
    }

    this.checkName = function (value, spanID, message) {
        let pattern = /^[a-z A-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$/;
        if (value.match(pattern)) {
            getID(spanID).innerHTML = "";
            getID(spanID).style.display = "none";
            return true;
        }
        getID(spanID).innerHTML = message;
        getID(spanID).style.display = "block";
        return false;
    }

    this.checkPhone = function (value, spanID, message) {
        let pattern = /^[0-9]+$/;
        if (value.match(pattern) && value.length >= 9 && value.length <= 10) {
            getID(spanID).innerHTML = "";
            getID(spanID).style.display = "none";
            return true;
        }
        getID(spanID).innerHTML = message;
        getID(spanID).style.display = "block";
        return false;
    }
}
