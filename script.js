const data = document.querySelector("#inputData");
const contentItem = document.querySelector("#content");

const addItem = () => {
    if (data.value) {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            ${data.value}
            <i class="fa-solid fa-xmark"></i>
        `;
        data.value = "";
        listItem.addEventListener("click", () => {
            listItem.classList.toggle("done");
        });

        listItem.querySelector("i").addEventListener("click", (e) => {
            e.stopPropagation();  
            listItem.remove();
        });
        contentItem.prepend(listItem);
    }
};

// Loading screen  
window.addEventListener('load', function() {
    setTimeout(function() {
        const loadingScreen = document.getElementById('loadingScreen');
        const wrapper = document.querySelector('.wrapper');
        
        loadingScreen.style.opacity = '0';
        wrapper.classList.add('visible');
        
        setTimeout(function() {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1500);
});
