const videos = document.querySelector("ul.videos")

function criarVideo() {
    fetch("datas/dados.json")
        .then(res => res.json())
        .then(dados => {
            dados.forEach(dado => {
                let h3 = document.createElement("h3")
                let a = document.createElement("a")
                let thumb = document.createElement("div")
                let li = document.createElement("li")
                let img = document.createElement("img")
                h3.innerText = dado.nome
                img.src = dado.src
                img.alt = "Série do " + dado.nome
                a.setAttribute("href", dado.link)
                thumb.classList.add("thumb")
                
                videos.appendChild(li)
                li.appendChild(a)
                a.appendChild(thumb)
                a.appendChild(h3)
                thumb.appendChild(img)
            })
        })
}
criarVideo()