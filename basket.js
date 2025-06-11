function updateCheckoutSummary(cart) {
        const subtotalElem = document.getElementById("subtotal-amount");
        const shippingElem = document.getElementById("shipping-amount");
        const totalElem = document.getElementById("total-amount");

        let subtotal = 0;
        cart.forEach(item => {
            const price = parseFloat(item.price.replace("$", ""));
            subtotal += price * item.quantity;
        });

        const estimatedShipping = subtotal > 0 ? 15.00 : 0.00;
        const total = subtotal + estimatedShipping;

        subtotalElem.textContent = `$${subtotal.toFixed(2)}`;
        shippingElem.textContent = `$${estimatedShipping.toFixed(2)}`;
        totalElem.textContent = `$${total.toFixed(2)}`;
    }

    document.addEventListener("DOMContentLoaded", function () {
        const tbody = document.querySelector("tbody");
        tbody.innerHTML = "";

        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        cart.forEach((item, index) => {
            const price = parseFloat(item.price.replace("$", ""));
            const itemTotal = price * item.quantity;

            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td><img src="${item.image}" alt="${item.title}" class="img-fluid" style="width: 100px;"></td>
                <td>${item.title}</td>
                <td>
                    <select class="form-select quantity-select" data-index="${index}" style="width: 100px;">
                        <option ${item.quantity == 1 ? "selected" : ""}>1</option>
                        <option ${item.quantity == 2 ? "selected" : ""}>2</option>
                        <option ${item.quantity == 3 ? "selected" : ""}>3</option>
                    </select>
                </td>
                <td>$${itemTotal.toFixed(2)}</td>
                <td><button class="btn btn-outline-danger btn-sm remove-item" data-index="${index}">Remove</button></td>
            `;
            tbody.appendChild(tr);
        });

        updateCheckoutSummary(cart);

        document.querySelectorAll('.quantity-select').forEach(select => {
            select.addEventListener('change', function () {
                const index = this.getAttribute('data-index');
                const cart = JSON.parse(localStorage.getItem('cart')) || [];
                cart[index].quantity = parseInt(this.value);
                localStorage.setItem('cart', JSON.stringify(cart));
                location.reload();
            });
        });

        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function () {
                const index = this.getAttribute('data-index');
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                location.reload();
            });
        });
    });