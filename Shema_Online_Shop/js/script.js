// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effect to category items
    const categoryItems = document.querySelectorAll('.category-item');
    
    categoryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
        });
    });

    // Animate items on scroll
    const animateOnScroll = () => {
        const items = document.querySelectorAll('.category-item');
        items.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (itemTop < windowHeight * 0.8) {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }
        });
    };

    // Initial styles for animation
    categoryItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Run animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    // Run once on load
    animateOnScroll();

    // Payment Modal Functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const paymentModal = document.getElementById('paymentModal');
    const closeModal = document.querySelector('.close-modal');
    const paymentOptions = document.querySelectorAll('.payment-option');
    const momoForm = document.getElementById('momoForm');
    const cardForm = document.getElementById('cardForm');

    // Open modal when Add to Cart is clicked
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            paymentModal.classList.add('active');
        });
    });

    // Close modal when X is clicked
    closeModal.addEventListener('click', function() {
        paymentModal.classList.remove('active');
        resetForms();
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === paymentModal) {
            paymentModal.classList.remove('active');
            resetForms();
        }
    });

    // Handle payment option selection
    paymentOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected class from all options
            paymentOptions.forEach(opt => opt.classList.remove('selected'));
            // Add selected class to clicked option
            this.classList.add('selected');

            const paymentType = this.dataset.payment;
            if (paymentType === 'momo') {
                momoForm.style.display = 'block';
                cardForm.style.display = 'none';
            } else {
                momoForm.style.display = 'none';
                cardForm.style.display = 'block';
            }
        });
    });

    // Reset forms when modal is closed
    function resetForms() {
        paymentOptions.forEach(opt => opt.classList.remove('selected'));
        momoForm.style.display = 'none';
        cardForm.style.display = 'none';
        momoForm.reset();
        cardForm.reset();
    }

    // Handle form submissions
    const forms = document.querySelectorAll('.payment-form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would typically handle the payment processing
            alert('Payment processing... This is a demo version.');
            paymentModal.classList.remove('active');
            resetForms();
        });
    });
}); 