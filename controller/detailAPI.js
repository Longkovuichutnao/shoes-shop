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
                <button onclick="checkLoginDetail()">Add to cart</button>
            </div>
      </div>`
        quantityDetail();
        choosize();
    }).catch(function (error) {
        console.log(error);
    })
}
