/* Copyright (C) 2025 Shubham Agarwal

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

/*
    PLEASE IMPLEMENT THE FOLLOWING METHODS TO ENABLE THE DESIRED FUNCTIONALITY.
*/

async function recordAddressData(addressData) {
    try {
        console.log("Address Data:", addressData);
        // do something here.
    } catch (e) {
        console.error(e);
    }
}

async function retrieveAddress() {
    try {
        // do something here.
    } catch (e) {
        console.error(e);
    }
}

/*
    The following code loads the "Save Address for Later" and "Autofill Address" related data within the address form.
    The code is executed on page load.
    You can read through the function to understand the desired behavior.
    HOWEVER, PLEASE DO NOT MODIFY ANYTHING HERE DURING THE CODING TASK.
*/
window.addEventListener('load', function () {
    function saveFormData() {
        try {
            const addressData = {};
            document.getElementById('address_line1').value ? addressData["address_line1"] = document.getElementById('address_line1').value : undefined;
            document.getElementById('address_line2').value ? addressData["address_line2"] = document.getElementById('address_line2').value : undefined;
            document.getElementById('city').value ? addressData["city"] = document.getElementById('city').value : undefined;
            document.getElementById('state').value ? addressData["state"] = document.getElementById('state').value: undefined;
            document.getElementById('country').value ? addressData["country"] = document.getElementById('country').value : undefined;
            document.getElementById('pincode').value ? addressData["pincode"] = document.getElementById('pincode').value : undefined;
            document.getElementById('quantity').value ? addressData["quantity"] = document.getElementById('quantity').value : undefined;
            document.getElementById('language').value ? addressData["language"] = document.getElementById('language').value : undefined;
            
            if (addressData && Object.keys(addressData).length > 1) {
                recordAddressData(addressData);
                showMessage("Address saved!", "success");
            } else {
                showMessage("Address fields are empty!", "error");
            }
        } catch (e) {
            console.error(e);
        }
    }

    async function autofillFormData() {
        try {
            const savedData = await retrieveAddress();

            if (savedData && Object.keys(savedData).length > 0) {
                document.getElementById('address_line1').value = savedData.address_line1;
                document.getElementById('address_line2').value = savedData.address_line2;
                document.getElementById('city').value = savedData.city;
                document.getElementById('state').value = savedData.state;
                document.getElementById('country').value = savedData.country;
                document.getElementById('pincode').value = savedData.pincode;
                document.getElementById('quantity').value = savedData.quantity;
                document.getElementById('language').value = savedData.language;
                showMessage("Address autofilled!", "success");

            } else {
                showMessage("No saved addresses found!", "error");
                return;
            }
            
            let autofillButton = document.getElementById('autofill-btn');
            if (autofillButton) {
                autofillButton.parentNode.removeChild(autofillButton);
            }
        } catch (e) {
            console.error(e);
        }
    }

    function showMessage(message, type) {
        try {
            const messageDiv = document.createElement('div');
            messageDiv.textContent = message;
            messageDiv.style.position = 'fixed';
            messageDiv.style.top = '10px';
            messageDiv.style.right = '10px';
            messageDiv.style.padding = '10px';
            if (type === "success") messageDiv.style.backgroundColor = '#4CAF50'; // Green background
            if (type === "error") messageDiv.style.backgroundColor = '#FF6347'; // Red background
            messageDiv.style.color = '#fff'; // White text
            messageDiv.style.borderRadius = '5px';
            messageDiv.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
            messageDiv.style.zIndex = '1000';
            messageDiv.style.opacity = '1';
            messageDiv.style.transition = 'opacity 0.5s ease-in-out';

            document.body.appendChild(messageDiv);

            setTimeout(() => {
                messageDiv.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(messageDiv);
                }, 500);
            }, 3000);
        } catch (e) {
            console.error(e);
        }
    }

    try {
        // Add save button to the form
        const saveButton = document.createElement('button');
        saveButton.type = 'button';
        saveButton.textContent = 'Save Address for Later';
        saveButton.classList.add('btn', 'btn-secondary', 'btn-sm');
        saveButton.addEventListener('click', saveFormData);

        // Add autofill button to the form
        const autofillButton = document.createElement('button');
        autofillButton.id = 'autofill-btn';
        autofillButton.type = 'button';
        autofillButton.textContent = 'Autofill Address Data';
        autofillButton.classList.add('btn', 'btn-secondary', 'btn-sm');
        autofillButton.addEventListener('click', autofillFormData);

        // Insert the save button before the submit button
        const form = document.getElementById('address-form');
        if (form) {
            const submitButton = form.querySelector('button[type="submit"]');
            form.insertBefore(saveButton, submitButton);
            form.insertBefore(autofillButton, submitButton);
        }
    } catch (e) {
        console.error(e);
    }
})