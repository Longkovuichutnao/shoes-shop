const showDetail = (id) => {

    axios({
        method: 'get',
        url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${id}`
    }).then(function (result) {
        const shoeDetail = result.data.content;
        const arrayRelate = result.data.content.relatedProducts;
        getID('detailShoe').innerHTML =
            `<div class="col-6 detail-left">
            <div class="imgDetail" style="background-image:url(${shoeDetail.image})">
                <div class="saleOff">20% OFF</div>
            </div>
        </div>
         <div class="col-6 detail-right">
            <h2>${shoeDetail.name}</h2>
            <p>${shoeDetail.description}</p>
            <span class="title-size">Available size</span>
            <div class="sizeDetail">
                <button class="btn active">38</button>
                <button class="btn">39</button>
                <button class="btn">40</button>
                <button class="btn">41</button>
                <button class="btn">40</button>
            </div>
            <div class="priceDetail">
                <span class="discountDetail">-20%</span>
                <span class="costDetail">${shoeDetail.price / 0.8}$</span>
                <span class="saleDetail">${shoeDetail.price}$</span>
            </div>
            <div class="quantityDetail">
                <button class="btn minusDetail" id="minusDetail">-</button>
                <span id="quantity">1</span>
                <button class="btn plusDetail" id="plusDetail">+</button>
            </div>
            <div class="addCartDetail">
                <button onclick="addtoCart(${shoeDetail.id})">Add to cart</button>
            </div>
      </div>`
        quantityDetail();
        choosize();
        showRelateShoes(arrayRelate);
    }).catch(function (error) {
        console.log(error);
    })
}

const showRelateShoes = (array) => {
    let content = "";
    array.map((shoe, index) => {
        let arrDesc = shoe.description.split(" ");
        let shortDesc = "";
        for (let i = 0; i < 12; i++) {
            shortDesc += arrDesc[i] + " ";
        }
        let strShoe =
            ` <div class="card-item col-4">
            <div class="card-item-inner">
            <div class="card-img">
                <a href="./detail.html?productId=${shoe.id}" onclick="showDetail('${shoe.id}')">
                    <img class="img-fluid" src=${shoe.image} alt="">
                </a>
            </div>
            <div class="card-body">
                <h5 class="shoe-name">${shoe.name}</h5>
                <p class="shoe-desc">${shortDesc}.......</p>
            </div>
            <div class="card-more d-flex">
                <div class="btn-price">
                    <div class="price">${shoe.price}$</div>
                </div>
                <div onclick="checkLoginDetail(${shoe.id})" class="btn-buy">
                    <i class="fa-solid fa-cart-shopping"></i>
                    Buy now
                </div>
            </div>
            </div>
         </div>`
        content += strShoe;
    })
    document.querySelector('.card-related-list').innerHTML = content;
}
const dsShoes = new DanhSachShoes();

function getLocalStorage() {
    let dataLocal = JSON.parse(localStorage.getItem("DSShoe"));
    if (dataLocal !== null) {
        dsShoes.arrShoe = dataLocal;
    }
}
getLocalStorage();

const addtoCart = (id) => {
    axios({
        method: 'get',
        url: 'https://shop.cyberlearn.vn/api/Product/getbyid?id=' + id,
    }).then(function (result) {
        let quantityDetail = document.getElementById('quantity').textContent
        let shoe = {
            id: result.data.content.id,
            image: result.data.content.image,
            name: result.data.content.name,
            size: result.data.content.size,
            price: result.data.content.price,
            quantity: quantityDetail,
        }
        if (dsShoes.arrShoe.every(function (ktraID, index) {
            return ktraID.id !== shoe.id;
        })) {
            dsShoes.addShoe(shoe);
            localStorage.setItem("DSShoe", JSON.stringify(dsShoes.arrShoe));
            checkCart();
        }
    }).catch(function (error) {
        console.log(error);
    })
}