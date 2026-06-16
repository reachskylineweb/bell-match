document.addEventListener('DOMContentLoaded', () => {
    const headerEl = document.querySelector('header');
    const footerEl = document.querySelector('footer');
    
    if (headerEl) {
        headerEl.innerHTML = `
        <a href="index.html#hero" class="logo" aria-label="The Bell Match Company Home">
            <span class="logo-bell">BELL</span><span class="logo-match">MATCH</span>
        </a>
        <nav class="nav-links" id="nav-links">
            <a href="index.html#hero">Home</a>
            <div class="nav-dropdown-trigger">
                <a href="about-us.html" class="dropdown-toggle">About Us <span class="arrow-down"></span></a>
                <div class="nav-dropdown-menu">
                    <a href="about-us.html">Profile</a>
                    <a href="infrastructure.html">Infrastructure</a>
                    <a href="certificates.html">Certificates</a>
                    <a href="policies.html">Policies</a>
                </div>
            </div>
            <div class="nav-dropdown-trigger">
                <a href="products.html" class="dropdown-toggle">Products <span class="arrow-down"></span></a>
                <div class="nav-dropdown-menu">
                    <a href="pocket-box-match.html">Pocket Box Matches</a>
                    <a href="kitchen-box-match.html">Kitchen Box Matches</a>
                    <a href="barbeque-box-match.html">Barbeque Box Matches</a>
                    <a href="book-match.html">Match Books</a>
                    <a href="cigar-match.html">Cigar Match Boxes</a>
                    <a href="special-shape-match-boxes.html">Special Shape Match Boxes</a>
                </div>
            </div>
            <a href="gallery.html">Gallery</a>
            <a href="contact-us.html" class="nav-cta">Contact Us</a>
        </nav>
        <button class="burger-menu" id="burger-menu" aria-label="Toggle navigation menu">
            <span></span>
            <span></span>
            <span></span>
        </button>
        `;
        
        // Highlight active nav item
        const path = window.location.pathname;
        const pageName = path.split('/').pop() || 'index.html';
        
        const navLinks = headerEl.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (!href) return;
            const linkPage = href.split('#')[0].split('?')[0];
            
            if (linkPage === pageName) {
                link.classList.add('active');
                
                const parentDropdown = link.closest('.nav-dropdown-trigger');
                if (parentDropdown) {
                    const toggle = parentDropdown.querySelector('.dropdown-toggle');
                    if (toggle) toggle.classList.add('active');
                }
            }
        });

        // Setup burger menu events dynamically since header is injected
        const burgerMenu = document.getElementById('burger-menu');
        const navLinksEl = document.getElementById('nav-links');
        if (burgerMenu && navLinksEl) {
            burgerMenu.addEventListener('click', () => {
                burgerMenu.classList.toggle('active');
                navLinksEl.classList.toggle('active');
            });
            navLinksEl.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    burgerMenu.classList.remove('active');
                    navLinksEl.classList.remove('active');
                });
            });
        }
    }
    
    if (footerEl) {
        footerEl.innerHTML = `
        <div class="container">
            <div class="footer-grid">
                <div class="footer-info">
                    <h4>
                        <span class="logo-bell" style="color: var(--color-red);">BELL</span><span class="logo-match" style="color: #fff;">MATCH</span>
                    </h4>
                    <p>The Bell Match Company is an admired organization of professionals renowned for exceptional customer service and an impeccable safety and compliance record.</p>
                    <div class="social-links">
                        <a href="#" class="social-btn" aria-label="LinkedIn">
                            <svg viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
                        </a>
                        <a href="#" class="social-btn" aria-label="Twitter">
                            <svg viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.7 0-1.37-.2-1.95-.54v.05c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.52 8.52 0 0 1-5.31 1.83c-.35 0-.69-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.5 20.33 8.89c0-.18 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/></svg>
                        </a>
                        <a href="#" class="social-btn" aria-label="Facebook">
                            <svg viewBox="0 0 24 24"><path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7c4.78-.75 8.44-4.9 8.44-9.9 0-5.53-4.5-10.02-10-10.02z"/></svg>
                        </a>
                    </div>
                </div>
                <div class="footer-links">
                    <h5>Products</h5>
                    <ul>
                        <li><a href="pocket-box-match.html">Pocket Box Matches</a></li>
                        <li><a href="kitchen-box-match.html">Kitchen Box Matches</a></li>
                        <li><a href="barbeque-box-match.html">Barbeque Box Matches</a></li>
                        <li><a href="book-match.html">Match Books</a></li>
                        <li><a href="cigar-match.html">Cigar Match Boxes</a></li>
                        <li><a href="special-shape-match-boxes.html">Special Shape Match Boxes</a></li>
                    </ul>
                </div>
                <div class="footer-links">
                    <h5>Company</h5>
                    <ul>
                        <li><a href="about-us.html">About Our Profile</a></li>
                        <li><a href="infrastructure.html">Factory Infrastructure</a></li>
                        <li><a href="certificates.html">Certifications</a></li>
                        <li><a href="policies.html">Policies</a></li>
                        <li><a href="gallery.html">Industrial Gallery</a></li>
                        <li><a href="contact-us.html">Contact & Enquiry</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2026 bellmatch - All Rights Reserved. &nbsp;|&nbsp; Web Design: NIKITHA</p>
                <div class="footer-bottom-links">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                    <a href="#">Sitemap</a>
                </div>
            </div>
        </div>
        `;
    }
});
