//Lưu local =======================================================
// var shoeInfo = [];
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
// window.onload = function () {
//     const urlParams = new URLSearchParams(window.location.search);
//     const myParam = urlParams.get('product');

function buyNow(shoeID) {
    console.log("first")
    axios({
        method: 'get',
        url: 'https://shop.cyberlearn.vn/api/Product/getbyid?id=' + shoeID,
    }).then(function (result) {
        console.log(result)
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
            }
            setLocalStorage(dsShoes.arrShoe);
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
// }




//Hiển thị SP =======================================================
function hienThiSP(mangLocal) {
    let content = "";

    mangLocal.map(function (shoe, index) {
        var quantity = 1;
        var infoSP = `<tr class="table-list">
        <td class="check"><input type="checkbox"></td>
        <td class="shoeID">${shoe.id}</td>
        <td class="shoeIMG"><img class="img-fluid" src= ${shoe.image}></td>
        <td class="shoeName">${shoe.name}</td>
        <td class="shoePrice">${shoe.price}$</td>
        <td class="quantity">
            <button class="btn btn-dark" onclick="clickDown(${shoe.id})" >
                <i class="fa-solid fa-minus"></i></button>
                <span id="quantityClick">${quantity}</span>
            <button class="btn btn-dark" onclick="clickUp(${shoe.id})" >
                <i class="fa-solid fa-plus"></i></button>
        </td>
        <td class="total">${shoe.price * quantity}$</td>
        <td class="select">
       <!-- <button class="btn btn-info" onclick="editSP(${shoe.id})">Edit</button> -->
            <button class="btn btn-danger" onclick="xoaSP(${shoe.id})">Delete</button>
        </td>
        </tr>`
        content += infoSP
    })
    document.getElementById("tableDanhSach").innerHTML = content;
}
//Click Delete  =======================================================
function xoaSP(shoeID) {
    dsShoes.xoa(shoeID);

    console.log(dsShoes.arrShoe)
    hienThiSP(dsShoes.arrShoe);
    setLocalStorage(dsShoes.arrShoe);
}
//Click + -  =======================================================
function clickUp(id) {
    let indexFind

    quantity += 1
    localStorage.setItem("quantityShoe", JSON.stringify(quantity));
    document.getElementById("quantityClick").innerHTML = quantity;
}

function clickDown(id) {
    if (quantity > 0) {
        quantity -= 1
        document.getElementById("quantityClick").innerHTML = quantity;
    } else {
        alert("Tăng số lượng sản phẩm để mua nào!")
    }
}
