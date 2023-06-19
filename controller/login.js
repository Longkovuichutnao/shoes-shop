//Show Login - Register =======================================================
function login() {
    document.querySelector('.login').style.color = ('#2a73dd');
    document.querySelector('.login').style.fontWeight = ('bolder');
    document.querySelector('.login').style.fontSize = ('30px');
    document.querySelector('.regis').style.color = ('#212529');
    document.querySelector('.regis').style.fontSize = ('25px');
    document.querySelector('.regis').style.fontWeight = ('400');
    //button
    document.getElementById('submit').classList.add('d-none');
    document.getElementById('login').classList.remove('d-none');
    const timLogin = document.querySelectorAll('.d-register');
    timLogin.forEach((showLogin) => {
        showLogin.classList.add('d-none');
    })
};
document.querySelector('.login').addEventListener("click", () => {
    login();
});
document.querySelector('.popupLogin').addEventListener("click", () => {
    login();
});
document.querySelector('.popupLogin2').addEventListener("click", () => {
    login();
});
// click lest buy in carousel
document.getElementById('lest-buy').onclick = () => {
    login();
};
function register() {
    document.querySelector('.regis').style.color = ('#2a73dd');
    document.querySelector('.regis').style.fontWeight = ('bolder');
    document.querySelector('.regis').style.fontSize = ('30px');
    document.querySelector('.login').style.color = ('#212529');
    document.querySelector('.login').style.fontSize = ('25px');
    document.querySelector('.login').style.fontWeight = ('400');
    //button
    document.getElementById('submit').classList.remove('d-none');
    document.getElementById('login').classList.add('d-none');
    const timRegis = document.querySelectorAll('.d-register')
    timRegis.forEach((showRegis) => {
        showRegis.classList.remove('d-none');
    })
};
document.querySelector('.regis').addEventListener("click", () => {
    register();
});
document.querySelector('.popupRegis').addEventListener("click", () => {
    register();
});
document.querySelector('.popupRegis2').addEventListener("click", () => {
    register();
});

//Tạo User =======================================================
const validation = new Validation();

document.getElementById('submit').addEventListener("click",
    function taoUser() {
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        let password2 = document.getElementById('password2').value;
        let name = document.getElementById('name').value;
        let phone = document.getElementById('phone').value;
        let male = document.getElementById('male').checked;
        if (male === true) {
            gender = true;
        } else {
            gender = false;
        }
        let isValid = true;

        isValid = validation.checkEmpty(email, "tbEmail", "Email không được để trống !")
            && validation.checkEmail(email, "tbEmail", "Email không đúng định dạng !");

        isValid &= validation.checkEmpty(password, "tbPassword", "Password không được để trống !")
            && validation.checkPass(password, "tbPassword", "Password phải có chữ hoa (từ 6-10 kí tự) !");

        isValid &= validation.checkEmpty(password, "tbPassword2", "Password không được để trống !")
            && validation.checkPassTrung(password, password2, "tbPassword2", "Nhập lại password không đúng !");

        isValid &= validation.checkEmpty(name, "tbName", "Tên không được để trống !")
            && validation.checkName(name, "tbName", "Tên chỉ nhập chữ cái !");

        isValid &= validation.checkEmpty(phone, "tbPhone", "SĐT không được để trống !")
            && validation.checkPhone(phone, "tbPhone", "SĐT không đúng định dạng !");

        if (isValid) {
            let user = new User(email, password, name, phone, gender);
            console.log('tao user', user)
            // document.getElementById('formUser').reset();
            axios({
                method: 'post',
                url: 'https://shop.cyberlearn.vn/api/Users/signup',
                data: user
            }).then(function (result) {
                $('#modalLogin').modal('hide')
                alert("Tạo tài khoản thành công !")

                console.log(result)
            }).catch(function (error) {
                alert("Email đã đăng ký rồi!")
                console.log(error)
            })
        }
    }
)

//Login User =======================================================
document.getElementById('login').addEventListener("click",
    function layThongTin() {
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;

        let isValid = true;
        isValid = validation.checkEmpty(email, "tbEmail", "Email không được để trống !")
            && validation.checkEmail(email, "tbEmail", "Email không đúng định dạng !");
        isValid &= validation.checkEmpty(password, "tbPassword", "Password không được để trống !")

        if (isValid) {
            let userLogin = new User(email, password);
            axios({
                method: 'post',
                url: `https://shop.cyberlearn.vn/api/Users/signin`,
                data: userLogin
            }).then(function (result) {
                $('#modalLogin').modal('hide')
                alert("Đăng nhập thành công !")
                document.querySelector('.popupLogin').style.display = 'none';
                document.querySelector('.popupRegis').style.display = 'none';
                document.querySelector('.fa-user-secret').classList.add('d-block');
                document.querySelector('.nameLogin').classList.add('d-block');
                document.querySelector('.exit-acc').classList.add('d-block');
                let tenEmail = email.split("@");
                document.querySelector('.nameLogin').innerHTML = ' Hello! ' + tenEmail[0];
                document.querySelector('.exit-acc').innerHTML = 'Exit';
                console.log(result.data)
                localStorage.setItem("userLogin", email);
            }).catch(function (error) {
                alert("Sai Email hoặc Password !");
                console.log(error);
            });
        };
    }
)

window.addEventListener('load', () => {
    let checkLogin = localStorage.getItem("userLogin");
    if (checkLogin != null) {
        document.querySelector('.popupLogin').style.display = 'none';
        document.querySelector('.popupRegis').style.display = 'none';
        document.querySelector('.fa-user-secret').classList.add('d-block');
        document.querySelector('.nameLogin').classList.add('d-block');
        document.querySelector('.exit-acc').classList.add('d-block');
        let tenEmail = checkLogin.split("@");
        document.querySelector('.nameLogin').innerHTML = ' Hello! ' + tenEmail[0];
        document.querySelector('.exit-acc').innerHTML = 'Exit';
    }
});


