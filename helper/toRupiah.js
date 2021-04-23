function toRupiah(money) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(money)
}

// console.log(toRupiah(1000))
module.exports = toRupiah;
