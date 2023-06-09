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
            document.getElementById('formUser').reset();
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
    })

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
                document.querySelector('.exit-acc').innerHTML = 'Exit';

                document.querySelector('.popupLogin2').classList.add('d-none');
                document.querySelector('.info').innerHTML = "<a>Infomation</a>";
                document.querySelector('.popupRegis2').classList.add('d-none');
                document.querySelector('.setting').innerHTML = "<a>Setting</a> ";

                let tenEmail = email.split("@");
                document.querySelector('.nameLogin').innerHTML = ' Hello! ' + tenEmail[0];

                localStorage.setItem("userLogin", JSON.stringify(tenEmail[0]));

                console.log(result.data)
            }).catch(function (error) {
                alert("Sai Email hoặc Password !");

                console.log(error);
            });
        };
    })
//Check login
const checkLoginDetail = (id) => {
    let checkLogin = JSON.parse(localStorage.getItem("userLogin"));
    if (checkLogin == null) {
        alert("Đăng nhập để mua sản phẩm!");
    } else {
        window.location = "../view/cart.html?product=" + id
    }
}
const checkLoginIndex = (id) => {
    let checkLogin = JSON.parse(localStorage.getItem("userLogin"));
    if (checkLogin == null) {
        alert("Đăng nhập để mua sản phẩm!");
    } else {
        window.location = "./view/cart.html?product=" + id
    }
}
//Check cart
const checkCart = () => {
    let checkCart = JSON.parse(localStorage.getItem("DSShoe"));
    if (checkCart !== null) {
        document.getElementById('countCart').innerHTML = checkCart.length
        document.getElementById('countCart').classList.add('d-block');
    }
}
checkCart();

document.querySelector('.fa-cart-shopping').addEventListener('click', function () {
    let checkLogin = JSON.parse(localStorage.getItem("userLogin"));
    if (checkLogin == null) {
        alert("Đăng nhập để mua sản phẩm!");
    } else {
        if (window.location.href.includes('view')) {
            window.location = "../view/cart.html"
        } else {
            window.location = "./view/cart.html"
        }
    }
})

/**
 * xử lý trường hợp load mà mất acc
 * Load User
 */
window.addEventListener('load', () => {
    let checkLogin = JSON.parse(localStorage.getItem("userLogin"));
    if (checkLogin != null) {
        document.querySelector('.popupLogin').style.display = 'none';
        document.querySelector('.popupRegis').style.display = 'none';
        document.querySelector('.fa-user-secret').classList.add('d-block');
        document.querySelector('.nameLogin').classList.add('d-block');
        document.querySelector('.exit-acc').classList.add('d-block');
        document.querySelector('.nameLogin').innerHTML = ' Hello! ' + checkLogin;
        document.querySelector('.exit-acc').innerHTML = 'Exit';

        document.querySelector('.popupLogin2').classList.add('d-none');
        document.querySelector('.info').innerHTML = "<a>Infomation</a>";
        document.querySelector('.popupRegis2').classList.add('d-none');
        document.querySelector('.setting').innerHTML = "<a>Setting</a> ";
    }
});

/**
 * hàm này dùng để click exit thì nó xóa local cái email
 * remove luôn mấy cái d-block để nó còn là d-none thôi
 */
document.getElementById('accept-exit').addEventListener('click', () => {
    $('#modalExit').modal('hide');
    localStorage.clear();
    if (window.location.href.includes('view')) {
        window.location = "../index.html"
    } else {
        window.location = "./index.html"
    }
});





