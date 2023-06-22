function DanhSachShoes() {
    this.arrShoe = [];

    //Add 
    this.addShoe = function (shoe) {
        this.arrShoe.push(shoe);
    }

    //Tìm index
    this.timIndex = function (shoeID) {
        let indexFind;
        this.arrShoe.map(function (shoe, index) {
            if (shoe.id === shoeID) {
                indexFind = index;
            }
        })
        return indexFind;
    }

    //Xóa
    this.xoa = function (shoeID) {
        let indexFind = this.timIndex(shoeID);
        this.arrShoe.splice(indexFind, 1);
    }


}