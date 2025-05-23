/*Copyright (C) 2025 Shubham Agarwal

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

function validateForm() {
    let isValid = true;

    // Get form elements
    const cardNumber = document.getElementById('card_number');
    const cardHolderName = document.getElementById('card_holder_name');
    const expiryDate = document.getElementById('expiry_date');
    const cvv = document.getElementById('cvv');

    // Clear previous error messages
    const errors = document.querySelectorAll('.error');
    errors.forEach(error => error.remove());

    // Validate card number
    if (!/^\d{16}$/.test(cardNumber.value)) {
        const error = document.createElement('span');
        error.className = 'error';
        error.innerText = 'Card number must be 16 digits.';
        cardNumber.parentNode.appendChild(error);
        isValid = false;
    }

    // Validate card holder name
    if (!/^[a-zA-Z\s]+$/.test(cardHolderName.value)) {
        const error = document.createElement('span');
        error.className = 'error';
        error.innerText = 'Card holder name must contain only alphabets.';
        cardHolderName.parentNode.appendChild(error);
        isValid = false;
    }

    // Validate expiry date (MM/YY)
    if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(expiryDate.value)) {
        const error = document.createElement('span');
        error.className = 'error';
        error.innerText = 'Expiry date must be in MM/YY format.';
        expiryDate.parentNode.appendChild(error);
        isValid = false;
    }

    // Validate CVV
    if (!/^\d{3,4}$/.test(cvv.value)) {
        const error = document.createElement('span');
        error.className = 'error';
        error.innerText = 'CVV must be 3 or 4 digits.';
        cvv.parentNode.appendChild(error);
        isValid = false;
    }

    return isValid;
}
