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

function submitAsJson(event) {
    event.preventDefault();
    var data = {};
    var form = event.target || event.srcElement;
    for (var i = 0; i < form.length; i++) {
        if (form[i].name) {
            data[form[i].name] = form[i].value;
        }
    }
    var xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action, true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            window.location.reload();
        }
    };
    xhr.send(JSON.stringify(data));
}

window.onload = function () {
    var form = document.getElementById('loginRegistration');
    if (form) {
        form.addEventListener('submit', function (e) {
            submitAsJson(e);
        });
    }
}

function changeForm(newAction) {
    var form = document.getElementById('loginRegistration');
    form.action = newAction;
}