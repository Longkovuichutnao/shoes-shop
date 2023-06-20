//Click buy now =======================================================
window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('product');
    // console.log(myParam)
    axios({
        method: 'get',
        url: 'https://shop.cyberlearn.vn/api/Product/getbyid?id=' + myParam,
    }).then(function (result) {
        hienThiSP(result.data.content)
        // console.log(result.data.content)
    }).catch(function (error) {
        console.log(error);
    })
}

let quantity = 1;
function hienThiSP(shoe) {
    let content = "";
    // mang.map(function (shoe, index) {
    var infoSP = `<tr class="table-list">
        <td class="check"><input type="checkbox"></td>
        <td class="shoeID">${shoe.id}</td>
        <td class="shoeIMG"><img class="img-fluid" src= ${shoe.image}></td>
        <td class="shoeName">${shoe.name}</td>
        <td class="shoePrice">${shoe.price}$</td>
        <td class="quantity">
            <button class="btn btn-dark" onclick="clickDown()" >
                <i class="fa-solid fa-minus"></i></button>
                <span id="quantityClick">${quantity}</span>
            <button class="btn btn-dark" onclick="clickUp()" >
                <i class="fa-solid fa-plus"></i></button>
        </td>
        <td class="total">${shoe.price * quantity}$</td>
        <td class="select">
       <!-- <button class="btn btn-info" onclick="editSP('${shoe.id}')">Edit</button> -->
            <button class="btn btn-danger" onclick="xoaSP('${shoe.id}')">Delete</button>
        </td>
        </tr>`
    content += infoSP
    // })
    document.getElementById("tableDanhSach").innerHTML = content;
}

console.log(quantity)

//Click + -  =======================================================
function clickUp() {
    quantity += 1
    document.getElementById("quantityClick").innerHTML = quantity;
}
function clickDown() {
    if (quantity > 0) {
        quantity -= 1
        document.getElementById("quantityClick").innerHTML = quantity;
    } else{
        alert("Tăng số lượng sản phẩm để mua nào!")
    }
}
