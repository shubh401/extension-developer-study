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