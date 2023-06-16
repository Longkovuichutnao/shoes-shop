// Lấy list danh sách trang index 
function layDanhSach() {
    axios({
        method: 'get',
        url: 'https://shop.cyberlearn.vn/api/Product',

    }).then(function (result) {
        hienThiDanhSach(result.data.content);
    }).catch(function (error) {
        console.log(error);
    })

}
layDanhSach();
function hienThiDanhSach(mang) {
    let list = "";
    mang.map(function (shoe, index) {
        let arrDesc = shoe.description.split(" ");
        let shortDesc = ""
        for (let i = 0; i < 12; i++) {
            shortDesc += arrDesc[i] + " "
        }

        let shoeInfo = `
        <div class="card-item col-4">
            <div class="card-item-inner">
            <div class="card-img">
                <a href="#">
                    <img class="img-fluid" src= ${shoe.image} alt="">
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
                <div class="btn-buy">
                    <i class="fa-solid fa-cart-shopping"></i>
                    Buy now
                </div>
            </div>
            </div>
        </div> `
        list += shoeInfo;
    })
    document.querySelector('.card-list').innerHTML = list;
}