
// Lấy list danh sách trang index 
function layDanhSach() {
    axios({
        method: 'get',
        url: 'https://shop.cyberlearn.vn/api/Product',

    }).then(function (result) {
        // console.log(result.data.content)
        hienThiDanhSach(result.data.content);
    }).catch(function (error) {
        console.log(error);
    })

}
layDanhSach();
// console.log('ok')
function hienThiDanhSach(mang) {
    let list = "";
    mang.map(function (shoe, index) {
        let shoeInfo = `
        <div class="card-item col-4">
            <div class="card-item-inner">
                <div class="card-img">
                    <a href="#">
                        <img class="img-fluid" src= ${shoe.image} alt="">
                    </a>
                </div>
                <div class="card-content">
                    <h5 class="shoe-name">${shoe.name}</h5>
                    <p class="shoe-desc">${shoe.description}</p>
                </div>
                <div class="card-more d-flex">
                    <div class="card-price">
                        <div class="btn">${shoe.price}$</div>
                    </div>
                    <div class="card-buy">
                        <a href="#" class="btn btn-info">
                        <i class="fa-solid fa-cart-shopping"></i>
                        Buy now</a>
                        <i class="fa-regular fa-heart" id="icon-interest"></i>
                    </div>
                </div>
            </div>
        </div> `
        list += shoeInfo;
    })
    document.querySelector('.card-list').innerHTML = list;
}
