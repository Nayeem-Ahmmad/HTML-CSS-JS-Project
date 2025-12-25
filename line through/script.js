

const list = document.querySelector(".list");

/* localStorage functions */
const getDoneItems = () => {
    return localStorage.getItem("doneItems")
        ? JSON.parse(localStorage.getItem("doneItems"))
        : [];
};

const saveDoneItems = (items) => {
    localStorage.setItem("doneItems", JSON.stringify(items));
};

/* restore on reload */
window.addEventListener("DOMContentLoaded", () => {
    const doneItems = getDoneItems();

    document.querySelectorAll(".list li").forEach(li => {
        if (doneItems.includes(li.dataset.id)) {
            li.classList.add("done");
        }
    });
});

/* click handling for all ul > li */
list.addEventListener("click", (event) => {
    if (event.target.tagName === "LI") {
        const li = event.target;
        const id = li.dataset.id;

        let doneItems = getDoneItems();

        li.classList.toggle("done");

        if (li.classList.contains("done")) {
            if (!doneItems.includes(id)) {
                doneItems.push(id);
            }
        } else {
            doneItems = doneItems.filter(item => item !== id);
        }

        saveDoneItems(doneItems);
    }
});
