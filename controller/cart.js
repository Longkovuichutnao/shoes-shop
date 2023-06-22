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
            price: result.data.content.price,
            quantity: 1,
        }

        dsShoes.arrShoe.map(function (ktraID, index) {
            if (ktraID.id === shoe.id) {
                dsShoes.arrShoe[index].quantity += 1
                setLocalStorage(dsShoes.arrShoe);
            }
        })

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
    let totalList = 0;
    mangLocal.map(function (shoe, index) {
        let total = shoe.price * shoe.quantity;
        let infoSP = `<tr class="table-list">
        <td class="check"><input type="checkbox"></td>
        <td class="shoeID">${shoe.id}</td>
        <td class="shoeIMG"><img class="img-fluid" src= ${shoe.image}></td>
        <td class="shoeName">${shoe.name}</td>
        <td class="shoePrice">${shoe.price}$</td>
        <td class="quantity">
            <button class="btn btn-dark" onclick="clickDown(${shoe.id})" >
                <i class="fa-solid fa-minus"></i></button>
                <span id="quantityClick">${shoe.quantity}</span>
            <button class="btn btn-dark" onclick="clickUp(${shoe.id})" >
                <i class="fa-solid fa-plus"></i></button>
        </td>
        <td class="total"> ${total.toLocaleString('en-US')}$</td>
        <td class="select">
       <!-- <button class="btn btn-info" onclick="editSP(${shoe.id})">Edit</button> -->
            <button class="btn btn-danger" onclick="xoaSP(${shoe.id})">Delete</button>
        </td>
        </tr>`
        content += infoSP
        totalList += total
    })
    document.getElementById("tableDanhSach").innerHTML = content;
    document.getElementById("total-price").innerHTML = totalList.toLocaleString('en-US') + '$';
}

//Click Delete  =======================================================
function xoaSP(shoeID) {
    dsShoes.xoa(shoeID);
    hienThiSP(dsShoes.arrShoe);
    setLocalStorage(dsShoes.arrShoe);
}

//Click + -  =======================================================
function clickUp(shoeID) {
    let i = dsShoes.timIndex(shoeID)
    dsShoes.arrShoe[i].quantity += 1
    hienThiSP(dsShoes.arrShoe);
    setLocalStorage(dsShoes.arrShoe);
}

function clickDown(shoeID) {
    let i = dsShoes.timIndex(shoeID)
    if (dsShoes.arrShoe[i].quantity > 0) {
        dsShoes.arrShoe[i].quantity -= 1
        hienThiSP(dsShoes.arrShoe);
        setLocalStorage(dsShoes.arrShoe);
    } else {
        alert("Tăng số lượng sản phẩm để mua bạn ơi!")
    }
}
