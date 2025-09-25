document.addEventListener('DOMContentLoaded', function() {
    // --- FUNGSI TABEL IDENTITAS SEKOLAH ---
    const header = document.getElementById('navbar-top');
    const hamburger = document.getElementById('hamburger-menu');
    const nav = document.getElementById('main-nav');
    const submenuLinks = document.querySelectorAll('.has-submenu > a');

    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTabId = button.getAttribute('data-tab');

            // 1. Hapus kelas 'active' dari semua tombol
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // 2. Tambahkan kelas 'active' ke tombol yang baru diklik
            button.classList.add('active');

            // 3. Sembunyikan semua konten tab
            tabContents.forEach(content => content.classList.remove('active'));

            // 4. Tampilkan konten tab yang sesuai dengan tombol yang diklik
            const targetContent = document.getElementById(targetTabId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
    function handleScroll() {
        if (window.scrollY > 50) { // Angka 50px adalah jarak scroll sebelum berubah
            header.classList.remove('transparent');
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
            // Hanya kembali ke transparan jika menu mobile tidak terbuka
            if (!nav.classList.contains('menu-open')) {
                 header.classList.add('transparent');
            }
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Panggil saat DOM dimuat untuk mengatur status awal


    // --- FUNGSI HAMBURGER MENU TOGGLE ---
    hamburger.addEventListener('click', () => {
        nav.classList.toggle('menu-open');
        hamburger.classList.toggle('is-active'); // Tambahkan kelas aktif untuk animasi hamburger

        // Mengunci body agar tidak bisa discroll saat menu full-screen terbuka
        if (nav.classList.contains('menu-open')) {
            document.body.style.overflow = 'hidden';
            // Pastikan header tetap putih saat menu terbuka, meski di top of page
            header.classList.remove('transparent');
            header.classList.add('scrolled');
        } else {
            document.body.style.overflow = 'auto';
            handleScroll(); // Atur ulang status header berdasarkan posisi scroll
        }
    });


    // --- FUNGSI TOGGLE SUBMENU DI MOBILE ---
    submenuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Mencegah link pindah halaman pada klik pertama
            const parentLi = this.closest('.has-submenu');

            // Tutup submenu lain yang mungkin terbuka
            document.querySelectorAll('.has-submenu.submenu-open').forEach(openSubmenu => {
                if (openSubmenu !== parentLi) {
                    openSubmenu.classList.remove('submenu-open');
                }
            });

            // Buka atau tutup submenu yang diklik
            parentLi.classList.toggle('submenu-open');
        });
    });

    // Menutup submenu jika pengguna mengklik di luar area menu
    window.addEventListener('click', function(e) {
        // Cek apakah klik terjadi di luar header
        if (!header.contains(e.target)) {
            document.querySelectorAll('.has-submenu.submenu-open').forEach(openSubmenu => {
                openSubmenu.classList.remove('submenu-open');
            });
        }
    });

    // Menutup submenu saat menekan tombol Escape
    window.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.has-submenu.submenu-open').forEach(openSubmenu => {
                openSubmenu.classList.remove('submenu-open');
            });
        }
    });

    // Menyesuaikan logika mobile agar menggunakan class yang sama
    // (Kode lama untuk mobile sudah tidak diperlukan karena logika baru mencakup keduanya)
    submenuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 900) {
                // Logika klik sudah ditangani oleh event listener di atas
                // Kita hanya perlu memastikan preventDefault tetap berjalan
                e.preventDefault();
            }
        });
    });
});