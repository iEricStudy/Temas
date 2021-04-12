var main;

window.addEventListener('load', inicio, false);
function inicio() {
    main = document.getElementById("ips-MainContent");
    replaceHeaderFooter();
    callTemplate();
}

var observerFunctions = [];

const mutationObserver = new MutationObserver(function (mutation_list) {
    mutation_list.forEach(function (mutation) {
        mutation.addedNodes.forEach(function (added_node) {
            observerFunctions.forEach(f => f(added_node));
        });
    });
});

function callTemplate() {
    getFile("../Templates/index.html", main, addElement)
}

function stringToHtml(s) {
    var wrapper = document.createElement('div');
    wrapper.innerHTML = s;
    var div = wrapper.firstChild;
    return div;
}

function replaceElement(content, element) {
    let id = element.id;
    let newDiv = stringToHtml(content);
    newDiv.id = id;
    element.replaceWith(newDiv);
    exectScripts(newDiv);
}

function addElement(content, container) {
    container.innerHTML = content;
    exectScripts(container);
}

function getFile(path, element, CallBack) {
    fetch(path)
        .then(response => response.text())
        .then(text => CallBack(text, element))
        .catch(error => alert("Error:" + error));
}

function replaceHeaderFooter() {
    let header = document.getElementById("ips-site-header");
    let footer = document.getElementById("ips-site-footer");

    getFile("../Sections/header.html", header, replaceElement);
    getFile("../Sections/footer.html", footer, replaceElement);
}

function exectScripts(container) {
    var scripts = Array.from(container.querySelectorAll("script"));
    scripts.forEach(oldScript => {
        let newScript = document.createElement("script");
        Array.from(oldScript.attributes)
            .forEach(attr => newScript.setAttribute(attr.name, attr.value));
        newScript.appendChild(document.createTextNode(oldScript.innerHTML));
        oldScript.parentNode.removeChild(oldScript);

        let childIds = [];
        document.body.childNodes.forEach(child => {
            if(child.id != "" && child.id != undefined){
                if(newScript.id == child.id){
                   document.body.removeChild(child);
                }
            }
        });

        document.body.appendChild(newScript);
    });
}