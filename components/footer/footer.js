async function loadFooter () {
    const template = await fetch("../components/footer/footer.html");
    const footer = await template.text();
    
    const placeholder = document.getElementById("placeholderFooter");
    
    const footReplace = document.createElement("footer");
    footReplace.classList.add("footer");
    footReplace.id = "footer";
    
    placeholder.replaceWith(footReplace);
    footReplace.innerHTML = footer;
}

window.onload = loadFooter();
