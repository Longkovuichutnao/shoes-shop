//Lưu local =======================================================
const dsShoes = new DanhSachShoes();

function setLocalStorage(mang) {
    localStorage.setItem("DSShoe", JSON.stringify(mang));
}

function getLocalStorage() {
    let dataLocal = JSON.parse(localStorage.getItem("DSShoe"));
    if (dataLocal !== null) {
        hienThiSP(dataLocal)
        dsShoes.arrShoe = dataLocal;
    }
}
getLocalStorage();

//Click buy now =======================================================
window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('product');
    axios({
        method: 'get',
        url: 'https://shop.cyberlearn.vn/api/Product/getbyid?id=' + myParam,
    }).then(function (result) {
        let shoe = {
            id: result.data.content.id,
            image: result.data.content.image,
            name: result.data.content.name,
            size: result.data.content.size,
            price: result.data.content.price,
            quantity: 1,
        }
        if (dsShoes.arrShoe.every(function (ktraID, index) {
            return ktraID.id !== shoe.id;
        })) {
            dsShoes.addShoe(shoe);
            setLocalStorage(dsShoes.arrShoe);
            hienThiSP(dsShoes.arrShoe)
        }
    }).catch(function (error) {
        console.log(error);
    })
}
//Hiển thị SP =======================================================
function hienThiSP(mangLocal) {
    let content = "";
    mangLocal.map(function (shoe, index) {
        let sizeList = "";
        shoe.size.map(function (shoeSize, index) {
            let infoSize = `
            <option>${shoeSize}</option>
            `
            sizeList += infoSize
        })
        let total = shoe.price * shoe.quantity;
        let infoSP = `<tr class="table-list">
        <td class="check"><input id="check${shoe.id}" onclick="check()" type="checkbox"></td>
        <td class="shoeID">${shoe.id}</td>
        <td class="shoeIMG"><img class="img-fluid" src= ${shoe.image}></td>
        <td class="shoeName">${shoe.name}</td>
        <td class="shoeSize"><select class="form-control-sm">${sizeList}
        </select></td>
        <td class="shoePrice">${shoe.price}$</td>
        <td class="quantity">
            <button class="btn btn-dark" onclick="clickDown(${shoe.id})" >
                <i class="fa-solid fa-minus"></i></button>
                <span id="quantityClick${shoe.id}">${shoe.quantity}</span>
            <button class="btn btn-dark" onclick="clickUp(${shoe.id})" >
                <i class="fa-solid fa-plus"></i></button>
        </td>
        <td class="total" id="total${shoe.id}"> ${total.toLocaleString('en-US')}$</td>
        <td class="select">
       <!-- <button class="btn btn-info" onclick="editSP(${shoe.id})">Edit</button> -->
            <button class="btn btn-danger" onclick="xoaSP(${shoe.id})">Delete</button>
        </td>
        </tr>`
        content += infoSP
    })
    document.getElementById("tableDanhSach").innerHTML = content;
    document.getElementById("total-price").innerHTML = 0 + '$';
}

//Click CheckBox  =======================================================
function check() {
    let tong = 0;
    dsShoes.arrShoe.map(function (shoe, index) {
        let timcheck = document.getElementById('check' + shoe.id)
        let total = 0;
        if (timcheck.checked == true) {
            total = dsShoes.arrShoe[index].quantity * dsShoes.arrShoe[index].price
        }
        tong += total;
    })
    document.getElementById("total-price").innerHTML = tong.toLocaleString('en-US') + '$';
}
function checkAll() {
    let checkAll = document.getElementById('checkAll');
    dsShoes.arrShoe.map(function (shoe, index) {
        let timcheck = document.getElementById('check' + shoe.id)
        if (checkAll.checked == true) {
            timcheck.checked = true;
            check();
        } else {
            timcheck.checked = false;
            check();
        }
    })
}

//Click Delete  =======================================================
function xoaSP(shoeID) {
    dsShoes.xoa(shoeID);
    hienThiSP(dsShoes.arrShoe);
    setLocalStorage(dsShoes.arrShoe);
}

//Click + -  =======================================================
function clickUp(shoeID) {
    document.getElementById('checkAll').checked = true
    document.getElementById('check' + shoeID).checked = true
    let i = dsShoes.timIndex(shoeID)
    dsShoes.arrShoe[i].quantity += 1
    let total = dsShoes.arrShoe[i].quantity * dsShoes.arrShoe[i].price
    document.getElementById("quantityClick" + shoeID).innerHTML = dsShoes.arrShoe[i].quantity;
    document.getElementById("total" + shoeID).innerHTML = total.toLocaleString('en-US') + '$';
    setLocalStorage(dsShoes.arrShoe);
    check();
}

function clickDown(shoeID) {
    document.getElementById('checkAll').checked = true
    document.getElementById('check' + shoeID).checked = true
    let i = dsShoes.timIndex(shoeID)
    if (dsShoes.arrShoe[i].quantity > 0) {
        dsShoes.arrShoe[i].quantity -= 1
        let total = dsShoes.arrShoe[i].quantity * dsShoes.arrShoe[i].price
        document.getElementById("quantityClick" + shoeID).innerHTML = dsShoes.arrShoe[i].quantity;
        document.getElementById("total" + shoeID).innerHTML = total.toLocaleString('en-US') + '$';
        setLocalStorage(dsShoes.arrShoe);
        check();
    } else {
        alert("Tăng số lượng sản phẩm để mua bạn ơi!")
    }
}

//Click oder  =======================================================
function order() {
    if (dsShoes.arrShoe.some(function (shoe, index) {
        let timcheck = document.getElementById('check' + shoe.id)
        return timcheck.checked == true
    })) {
        alert("Thanh toán thành công!")
        localStorage.clear();
        window.location = "../index.html"
    } else {
        alert("Vui lòng lựa chọn sản phẩm để thanh toán!")
    }
}