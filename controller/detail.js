window.onload = function () {
    const urlID = new URLSearchParams(window.location.search)
    const id = urlID.get('productId')
    showDetail(id)
}

const choosize = () => {
    const btnSize = document.querySelectorAll('.sizeDetail .btn');
    btnSize.forEach(btn => {
        btn.addEventListener('click', () => {
            btnSize.forEach(btn => {
                btn.classList.remove('active');
            });
            btn.classList.add('active');
        });
    });
}

const quantityDetail = () => {
    let i = 1;

    document.getElementById('plusDetail').addEventListener('click', () => {
        i += 1
        getID('quantity').innerHTML = i
    })
    document.getElementById('minusDetail').addEventListener('click', () => {
        i -= 1
        if (i < 1) {
            i = 1
            document.getElementById('quantity').innerHTML = i

        }
        document.getElementById('quantity').innerHTML = i
    })
}

