document.addEventListener('DOMContentLoaded', function() {
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
});