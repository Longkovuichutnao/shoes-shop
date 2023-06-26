
// Lấy list danh sách trang index =================
function layDanhSach() {
    axios({
        method: 'get',
        url: 'https://shop.cyberlearn.vn/api/Product',
    }).then(function (result) {
        hienThiDanhSach(result.data.content);
    }).catch(function (error) {
        console.log(error);
    })
};
layDanhSach();

function hienThiDanhSach(mang) {
    let list = "";
    mang.map(function (shoes, index) {
        let arrDesc = shoes.description.split(" ");
        let shortDesc = ""
        for (let i = 0; i < 12; i++) {
            shortDesc += arrDesc[i] + " "
        }
        let shoeInfo = `
        <div class="card-item col-12 col-md-6 col-lg-4">
            <div class="card-item-inner">
            <div class="card-img">
                <a href="./view/detail.html?productId=${shoes.id}">
                    <img class="img-fluid" src= ${shoes.image} alt="">
                </a>
            </div>
            <div class="card-body">
                <a href="./view/detail.html?productId=${shoes.id}">
                <h5 class="shoe-name">${shoes.name}</h5>
                </a>
                <p class="shoe-desc">${shortDesc}.......</p>
            </div>
            <div class="card-more d-flex">
                <div class="btn-price">
                    <div class="price">${shoes.price}$</div>
                </div>
                <div onclick="checkLoginIndex(${shoes.id})" class="btn-buy">
                    <i class="fa-solid fa-cart-shopping"></i>
                    Buy now
                </div>
            </div>
            </div>
        </div> `
        list += shoeInfo;
    })
    document.querySelector('.card-list').innerHTML = list;
};


/**
 * ================== SEARCH FEATURE =======================
 * function based on onkeyup in input tags to work
 * when user input somthine in input tags, we can give a search information
 * after that we need use this information to check in list of shoes,
 *  we render the list which contains with search information
 */
let search = () => {
    const valueSearch = document.getElementById("ip-search").value.toUpperCase();
    axios({
        method: 'get',
        url: 'https://shop.cyberlearn.vn/api/Product',
    }).then(function (result) {
        let listFount = (result.data.content).filter(function (shoes) {
            return shoes.name.toUpperCase().includes(valueSearch);
        });
        hienThiDanhSach(listFount);
    })
}
