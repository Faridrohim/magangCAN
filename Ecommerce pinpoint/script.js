document.addEventListener("DOMContentLoaded", function () {
    const galleryImages = document.querySelectorAll(".gallery-img");
    const carouselItems = document.querySelectorAll(".carousel-item");

    galleryImages.forEach((image, index) => {
      image.addEventListener("click", function () {
     
        carouselItems.forEach(item => {
          item.classList.remove("active");
        });

        carouselItems[index].classList.add("active");
      });
    });

    var myCarousel = document.getElementById('demo');
    var carousel = new bootstrap.Carousel(myCarousel, {
      interval: 5000,
      wrap: true
    });

  });

var btnWishList = document.getElementById('btnWishList');
var wishlist = document.getElementById('wishlistNavbar');
var clickCount = 0; 

btnWishList.addEventListener('click', function() {
    clickCount++; 

    if (clickCount === 1) { 
        var nilaiWishlist = parseInt(wishlist.innerText);
        nilaiWishlist += 1; 
        wishlist.innerText = nilaiWishlist;

        var icon = btnWishList.querySelector('image[name="Heart"]');
        icon.setAttribute('xlink:href', 'svg/HeartFill.svg');
    } else if (clickCount === 2) { 
        var nilaiWishlist = parseInt(wishlist.innerText);
        if (nilaiWishlist > 0) { 
            nilaiWishlist -= 1; 
            wishlist.innerText = nilaiWishlist;

            var icon = btnWishList.querySelector('image[name="Heart"]');
            icon.setAttribute('xlink:href', 'svg/Heart.svg');
        }
        clickCount = 0; 
    }

    btnWishList.classList.add('clicked');

    setTimeout(function() {
        btnWishList.classList.remove('clicked');
    }, 500);
});




var kurang = document.getElementById('kurang');
var tambah = document.getElementById('tambah');
var jumlahElemen = document.getElementById('jumlah');


tambah.addEventListener('click', function() {

  var jumlah = parseInt(jumlahElemen.textContent);
 
  jumlah++;

  jumlahElemen.textContent = jumlah;
});


kurang.addEventListener('click', function() {
 
  var jumlah = parseInt(jumlahElemen.textContent);
  
  if (jumlah > 1) {
 
    jumlah--;

    jumlahElemen.textContent = jumlah;
  }
});


var jumlahKlik = 0;
var keranjangBelanja = [];

function tambahKeranjang() {

    jumlahKlik++;

    tampilkanJumlahKlik();

    var namaBarang = "RED & BLACK SWEATER";
    var hargaSatuan = 400000;

    var barangSudahAda = keranjangBelanja.find(function(barang) {
        return barang.nama === namaBarang;
    });

    if (barangSudahAda) {
        barangSudahAda.jumlah += 1;
    } else {
        var barangBaru = {
            nama: namaBarang,
            harga: hargaSatuan,
            jumlah: 1
        };
        keranjangBelanja.push(barangBaru);
    }

    tampilkanDaftarBarang();
    tampilkanTotalHarga();
    perbaruiNotifikasiKeranjang();
}

function tampilkanJumlahKlik() {

    var spanJumlahBarang = document.getElementById('jumlahBarang');
    spanJumlahBarang.textContent = jumlahKlik;
}

function tampilkanTotalHarga() {

    var totalHarga = 0;

    keranjangBelanja.forEach(function(barang) {
        totalHarga += barang.harga * barang.jumlah;
    });

    var totalHargaElemen = document.getElementById('totalHarga');
    totalHargaElemen.textContent = 'Total Harga: Rp ' + totalHarga;
}

function hapusBarang(index) {

    keranjangBelanja.splice(index, 1);
    localStorage.setItem('keranjangBelanja', JSON.stringify(keranjangBelanja));
    tampilkanDaftarBarang();
    tampilkanTotalHarga();
    perbaruiNotifikasiKeranjang();
}

function tampilkanDaftarBarang() {

    var daftarBarangElemen = document.getElementById('daftarBarang');
    daftarBarangElemen.innerHTML = '';

    keranjangBelanja.forEach(function(barang, index) {
        var li = document.createElement('li');
        var totalHargaBarang = barang.harga * barang.jumlah;

        li.textContent = barang.nama + ' - Rp ' + barang.harga + ' (x' + barang.jumlah + ') - Total: Rp ' + totalHargaBarang;

        var btnHapus = document.createElement('button');
        btnHapus.textContent = 'Hapus';

        btnHapus.style.backgroundColor = 'red';
        btnHapus.style.color = 'white';
        btnHapus.style.border = 'red';
        btnHapus.style.margin = '5px';

        btnHapus.addEventListener('click', function() {
            hapusBarang(index);
        });

        li.appendChild(btnHapus);
        daftarBarangElemen.appendChild(li);
    });
}

function perbaruiNotifikasiKeranjang() {
    var jumlahBarang = keranjangBelanja.reduce(function(total, barang) {
        return total + barang.jumlah;
    }, 0);

    var notifikasiElemen = document.getElementById('jumlahBarang');
    notifikasiElemen.textContent = 'Jumlah Barang: ' + jumlahBarang;
}

tampilkanDaftarBarang();


document.addEventListener('DOMContentLoaded', function() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const sliderRow = document.querySelector('.slider-row');
    const sliderItems = document.querySelectorAll('.slider-row > .col-md-3');
    const itemWidth = sliderItems[0].offsetWidth;
    const lastIndex = sliderItems.length - 1;

    let currentIndex = 0;

    function slidePrev() {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = lastIndex;
            sliderRow.style.transition = 'none';
            sliderRow.style.transform = `translateX(-${itemWidth * (lastIndex + 1)}px)`;
            setTimeout(() => {
                sliderRow.style.transition = '';
                currentIndex = lastIndex - 1;
                updateSliderPosition();
            }, 50);
        } else {
            updateSliderPosition();
        }
    }

    function slideNext() {
        currentIndex++;
        if (currentIndex > lastIndex) {
            sliderRow.style.transition = 'none';
            sliderRow.style.transform = `translateX(0)`;
            setTimeout(() => {
                sliderRow.style.transition = '';
                currentIndex = 1;
                updateSliderPosition();
            }, 50);
        } else {
            updateSliderPosition();
        }
    }

    function updateSliderPosition() {
        const newPosition = -currentIndex * itemWidth;
        sliderRow.style.transform = `translateX(${newPosition}px)`;
    }

    prevBtn.addEventListener('click', slidePrev);
    nextBtn.addEventListener('click', slideNext);
});



  
document.addEventListener('DOMContentLoaded', function() {
    const zoomButton = document.querySelector('.zoom-button');
    const gambar = document.querySelector('.carousel-image');
    let isZoomed = false; 

    zoomButton.addEventListener('click', function() {
        if (!isZoomed) {
            gambar.style.transform = 'scale(2)'; 
            isZoomed = true; 
        } else {
            gambar.style.transform = 'scale(1)'; 
            isZoomed = false; 
        }
    });
});


function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }
function openNav() {
    document.getElementById("mySidepanel").style.width = "250px";
  }

  function closeNav() {
    document.getElementById("mySidepanel").style.width = "0";
  }

  document.addEventListener('DOMContentLoaded', function() {
    var carousel = new bootstrap.Carousel(document.getElementById('slide'), {
        interval: false 
    });

    var prevButton = document.querySelector('.carousel-control-prev');
    var nextButton = document.querySelector('.carousel-control-next');

    prevButton.addEventListener('click', function() {
        carousel.prev(); 
    });

    nextButton.addEventListener('click', function() {
        carousel.next(); 
    });
});
