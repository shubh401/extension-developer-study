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

/*
    The following code loads the "Check on Amazon" related resources on the page visited by the user.
    The code is executed on page load.
    You can read through the function to understand the desired behavior.
    HOWEVER, PLEASE DO NOT MODIFY ANYTHING HERE DURING THE CODING TASK.
*/
function appendIframe() {
    let iframe = document.createElement("iframe");
    iframe.id = "amazon-iframe";
    iframe.setAttribute("frameborder", 1);
    iframe.setAttribute("referrerpolicy", "no-referrer");
    iframe.style.height = '800px';
    iframe.style.width = '1200px';

    let iframebtn = document.createElement("button");
    iframebtn.setAttribute("class", "close-btn");
    iframebtn.innerText = 'Close';
    iframebtn.addEventListener('click', function () {
        let iframeContainer = document.getElementById('iframe-overlay');
        let iframe = document.getElementById('amazon-iframe');
        iframeContainer.style.display = 'none';
        iframe.src = '';
    })

    let iframeDiv = document.createElement("div");
    iframeDiv.id = "iframe-container";
    iframeDiv.appendChild(iframebtn);
    iframeDiv.appendChild(iframe);
    document.getElementById("product-list")?.appendChild(iframeDiv);

    let parentDiv = document.createElement("div");
    parentDiv.id = "iframe-overlay";
    parentDiv.appendChild(iframeDiv);

    let masterDiv = document.getElementsByClassName("container mt-5")[0];
    masterDiv?.insertAdjacentElement('afterend', parentDiv);
}

function appendButton() {
    Array.from(document.getElementsByClassName('actions'))?.forEach((element, idx) => {
        let amazonBtn = document.createElement("button");
        amazonBtn.innerText = "Check on Amazon";
        amazonBtn.setAttribute("class", "btn btn-secondary btn-sm amazon-btn");
        amazonBtn.id = `amazon-btn-${idx + 1}`;
        amazonBtn.addEventListener('click', function () {
            let iframeContainer = document.getElementById('iframe-overlay');
            iframeContainer.style.display = 'flex';
            let iframe = document.getElementById('amazon-iframe');
            let title = element.parentElement?.childNodes[1]?.innerText;
            let amazonURL = 'https://www.amazon.com/s?k=' + encodeURIComponent(title);
            iframe.src = amazonURL;
        });
        element.appendChild(amazonBtn);
    });
}

window.addEventListener('load', async function() {
    appendIframe();
    appendButton();

    let link = document.createElement('link');
    link.href = chrome.runtime.getURL("inject.css");
    link.type = "text/css";
    link.rel = "stylesheet";
    document.head.appendChild(link);
});