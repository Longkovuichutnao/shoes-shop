function DanhSachShoes() {
    this.arrShoe = [];

    this.addShoe = function (shoe) {
        this.arrShoe.push(shoe);
    }
    //Tìm index
    this.timIndex = function (shoeID) {
        var indexFind;
        this.arrShoe.map(function (shoe, index) {
            if (shoe.id === shoeID) {
                indexFind = index;
            }
        })
        return indexFind;
    }

    //Phương thức xóa
    this.xoa = function (shoeID) {
        var indexFind = this.timIndex(shoeID);
        this.arrShoe.splice(indexFind, 1);
    }


}