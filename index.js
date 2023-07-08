const notes__container = document.getElementById("notes__container");
const add = document.getElementById("add");


let notes = JSON.parse(localStorage.getItem("notes"));

if (notes) {
    notes.forEach((note) => {
        addNewNote(note);
    })
}


function updateLS() {
    const notes = [];
    const note_items = document.querySelectorAll(".note__textarea");
    note_items.forEach((note_item) => {
        notes.push(note_item.value);
    })

    localStorage.setItem("notes", JSON.stringify(notes));
    console.log("notes", notes);
}

add.addEventListener("click", () => addNewNote())



function addNewNote(note) {

    const note__item = document.createElement("div");
    note__item.classList.add("note__item");
    note__item.innerHTML = ` <div class="note__tools">
        <button class="edit"><i class="fa-regular fa-pen-to-square"></i></button>
        <button class="delete"><i class="fa-solid fa-trash-can"></i></button>
    </div>
    <div class="note__main hidden"></div>
    <textarea class="note__textarea"></textarea>`;

    const editBtn = note__item.querySelector(".edit");
    const deleteBtn = note__item.querySelector(".delete");
    const note__main = note__item.querySelector(".note__main");
    const note__textarea = note__item.querySelector(".note__textarea");

    note__textarea.value = note?note:"";
    note__main.innerText = note?note:"";

    deleteBtn.addEventListener("click", (e) => {
        note__item.remove();
        updateLS();

    })

    editBtn.addEventListener("click", (e) => {
        note__main.classList.toggle("hidden");
        note__textarea.classList.toggle("hidden");
    })

    note__textarea.addEventListener("input", (e) => {
        note__main.innerText = e.target.value;
        updateLS();

    })

    notes__container.appendChild(note__item);

}