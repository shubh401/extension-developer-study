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