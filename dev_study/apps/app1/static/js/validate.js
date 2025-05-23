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