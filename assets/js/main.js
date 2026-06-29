/**
 * main.js - Konfigurasi Animasi Website
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Inisialisasi AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // 2. Logika Animasi Angka (Counter Up)
    const counters = document.querySelectorAll('.counter');

    const runCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const suffix = counter.getAttribute('data-suffix') || '';
        const count = +counter.innerText.replace(/[^0-9]/g, ''); // Ambil hanya angka saat ini
        const increment = target / 100; 
    
        if (count < target) {
            // Update angka dan tetap sertakan suffix-nya
            counter.innerText = Math.ceil(count + increment) + suffix;
            setTimeout(() => runCounter(counter), 20);
        } else {
            // Pastikan hasil akhir tetap menggunakan format ribuan dan suffix
            counter.innerText = target.toLocaleString('en-US') + suffix;
        }
    };

    // Observer untuk mendeteksi saat section muncul di layar
    const observerOptions = {
        threshold: 0.5 // Menjalankan animasi saat 50% section terlihat
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                runCounter(entry.target);
                observer.unobserve(entry.target); // Animasi hanya berjalan sekali
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        observer.observe(counter);
    });

    console.log("Website initialized successfully.");
});