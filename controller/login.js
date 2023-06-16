
//Show Login - Register =======================================================
document.querySelector('.login').addEventListener("click", () => {
    login();
});
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
    });
}

document.querySelector('.regis').addEventListener("click", () => {
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
});

//Tạo User =======================================================
document.getElementById('submit').addEventListener("click",
    function taoUser() {
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        let name = document.getElementById('name').value;
        let phone = document.getElementById('phone').value;
        let male = document.getElementById('male').checked;
        if (male === true) {
            gender = true;
        } else {
            gender = false;
        }
        let user = new User(email, password, name, phone, gender)
        console.log('tao user', user)
        document.getElementById('formUser').reset();
        $('#modalLogin').modal('hide')
        alert("Tạo tài khoản thành công !")

        // axios({
        //     method: 'post',
        //     url: 'https://shop.cyberlearn.vn/api/Users/signup',
        //     data: user
        // }).then(function (result) {

        //     alert("Tạo tài khoản thành công !")
        //     console.log(result)

        // }).catch(function (error) {
        //     console.log(error)

        // })
    })

//Lấy thông tin User =======================================================
document.getElementById('login').addEventListener("click",
    function layThongTin() {
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        let userLogin = new User(email, password);
        axios({
            method: 'post',
            url: `https://shop.cyberlearn.vn/api/Users/signin`,
            data: userLogin

        }).then(function (result) {
            $('#modalLogin').modal('hide')
            alert("Đăng nhập thành công !")
            document.querySelector('.userLogin').style.display = 'none';
            document.querySelector('.fa-user-secret').classList.add('d-block');
            document.querySelector('.nameLogin').classList.add('d-block');
            let tenEmail = email.split("@");
            document.querySelector('.nameLogin').innerHTML = tenEmail[0];


            console.log(result.data)
        }).catch(function (error) {
            // console.log(error);
        });
    })



