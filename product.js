
document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll('.add-to-cart');

    buttons.forEach((button) => {
        button.addEventListener('click', function () {
            const card = button.closest('.card');
            const title = card.querySelector('.card-title').textContent;
            const price = card.querySelector('.card-text').textContent;
            const image = card.querySelector('img').getAttribute('src');

            const newItem = { title, price, image, quantity: 1 };

            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            const existingItem = cart.find(item => item.title === newItem.title);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push(newItem);
            }

            localStorage.setItem('cart', JSON.stringify(cart));

           
            alert(`${title} added to cart!`);
        });
    });
});
