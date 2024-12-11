function validateForm() {
    let isValid = true;

    // Get form elements
    const pincode = document.getElementById('pincode');
    const city = document.getElementById('city');
    const state = document.getElementById('state');
    const addressLine1 = document.getElementById('address_line1');
    const quantity = document.getElementById('quantity');

    // Clear previous error messages
    const errors = document.querySelectorAll('.error');
    errors.forEach(error => error.remove());

    // Validate pincode
    if (!/^\d+$/.test(pincode.value)) {
        const error = document.createElement('span');
        error.className = 'error';
        error.innerText = 'Pincode must contain only digits.';
        pincode.parentNode.appendChild(error);
        isValid = false;
    }

    // Validate city
    if (!/^[a-zA-Z\s]+$/.test(city.value)) {
        const error = document.createElement('span');
        error.className = 'error';
        error.innerText = 'City must contain only alphabets.';
        city.parentNode.appendChild(error);
        isValid = false;
    }

    // Validate state
    if (!/^[a-zA-Z\s]+$/.test(state.value)) {
        const error = document.createElement('span');
        error.className = 'error';
        error.innerText = 'State must contain only alphabets.';
        state.parentNode.appendChild(error);
        isValid = false;
    }

    // Validate address line 1
    if (addressLine1.value.trim() === "") {
        const error = document.createElement('span');
        error.className = 'error';
        error.innerText = 'Address Line 1 is required.';
        addressLine1.parentNode.appendChild(error);
        isValid = false;
    }

    // Validate quantity
    if (quantity.value <= 0) {
        const error = document.createElement('span');
        error.className = 'error';
        error.innerText = 'Quantity must be greater than zero.';
        quantity.parentNode.appendChild(error);
        isValid = false;
    }

    return isValid;
}