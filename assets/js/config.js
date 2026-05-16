const btnSair = document.querySelector(".sair")
const btnApagar = document.querySelector(".apagar")
const areas = document.querySelectorAll(".areas")

if (btnSair) {
    btnSair.addEventListener("click", () => {
        localStorage.removeItem("save")
        window.location.href = "../index.html"
    })
}
if (btnApagar) {
    btnApagar.addEventListener("click", () => {
        areas[0].classList.toggle('msg')
        areas[1].classList.toggle('fundo')
        setTimeout(() => {
            areas[0].classList.toggle('msg')
            areas[1].classList.toggle('fundo')
        },3000)
    })
}