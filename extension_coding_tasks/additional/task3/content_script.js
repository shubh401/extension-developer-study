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
    The following code injects the necessary resources to enable the FaceBook Share button on the page visited by the user.
    The code is executed on page load.
    You can read through the function to understand the desired behavior.
    HOWEVER, PLEASE DO NOT MODIFY ANYTHING HERE DURING THE CODING TASK.
*/

window.addEventListener('load', async function () {
    /*
        This script snippet have been taken from the official Facebook page - https://developers.facebook.com/docs/plugins/share-button/
    */
    let root = document.createElement("div");
    root.id = "fb-root";
    let prodDiv = document.getElementById("product-list");
    prodDiv?.insertAdjacentElement('afterend', root)

    Array.from(document.getElementsByClassName('actions'))?.forEach(element => {
        let shareDiv = document.createElement("div");
        shareDiv.setAttribute('class', `fb-share-button`);
        shareDiv.setAttribute('data-href', `${window.location.href}?product_id=${element.id}`);
        element.appendChild(shareDiv);
    });

    /*
        The following web accessible resources, when injected, executes in the page context.
    */
    let script = document.createElement('script');
    script.src = chrome.runtime.getURL("inject.js");
    document.body.appendChild(script);

    let link = document.createElement('link');
    link.href = chrome.runtime.getURL("inject.css");
    link.type = "text/css";
    link.rel = "stylesheet";
    (document.head || document.documentElement).appendChild(link);
});