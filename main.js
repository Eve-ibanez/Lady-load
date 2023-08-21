"use strict";

const publications = document.querySelector(".publications");
let contador = 0;

const createPublicationCode = (name,content) =>{
    const container = document.createElement("DIV");
    const names = document.createElement("H3");
    const contents = document.createElement("P");
    const comments = document.createElement("DIV");
    const Btncomment = document.createElement("INPUT");
    const Btnsubmit = document.createElement("INPUT");

    container.classList.add("publication");
    names.classList.add("name");
    contents.classList.add("content");
    comments.classList.add("comments");
    Btncomment.classList.add("comment");
    Btnsubmit.classList.add("submit");

    Btncomment.setAttribute("placeholder","Haz un comentario");
    names.textContent = name;
    contents.textContent = content;

    Btnsubmit.type = "submit";

    container.appendChild(names);
    container.appendChild(contents);
    container.appendChild(comments);
    comments.appendChild(Btncomment);
    comments.appendChild(Btnsubmit);

    return container;
}
const cargarMasPublicaciones = entry =>{
    if (entry[0].isIntersecting) cargarPublicaciones(3);
}

const observer = new IntersectionObserver(cargarMasPublicaciones);



const cargarPublicaciones = async num => {
    const request = await fetch ("LadyLoad.txt");
    const content = await request.json();
    const arr = content.content;
    const documentFragment = document.createDocumentFragment();
    for (let i = 0; i < num; i++) {
        if (arr[contador] != undefined) {
            const newPublication = createPublicationCode(arr[contador].nombre,arr[contador].contenido);
            documentFragment.appendChild(newPublication);
            contador++
            if (i == num-1) observer.observe(newPublication);
        } else {
            if (publications.lastElementChild.id != "nomore") {
                let noMore = document.createElement("p")
                noMore.classList.add("noMore");
                noMore.textContent = "No hay más publicaciones";
                noMore.id = "nomore";
                documentFragment.appendChild(noMore);
                publications.appendChild(documentFragment);
                break;
            }
        }
    }
    publications.appendChild(documentFragment);
}

cargarPublicaciones(1)