const btnMenu = document.querySelector(".btn-menu")
const navbar = document.querySelector(".navbar")
const inputBox = document.querySelectorAll(".box-input")
const formCad = document.querySelector("form.cadastro")
const formLog = document.querySelector("form.login")
const btnNext = document.querySelector(".btn-next")
const btnPrev = document.querySelector(".btn-prev")
const secaoForm = document.querySelector("section.form")
const secaoContent = document.querySelector("div.content")
const navlink = document.querySelectorAll("nav li")
const body = document.body

btnMenu.addEventListener("click", () => {
    if (navbar.classList.contains("navoff")) {
        navbar.classList.add("navon")
        navbar.classList.remove("navoff")
        btnMenu.classList.add("fa-xmark")
        btnMenu.classList.remove("fa-bars")
    }else {
        navbar.classList.remove("navon")
        navbar.classList.add("navoff")
        btnMenu.classList.add("fa-bars")
        btnMenu.classList.remove("fa-xmark")
    }
})
// manter e tirar o focus
inputBox.forEach(box => {
    let input = box.querySelector("input")
    input.addEventListener("focus", () => {
        box.classList.add("input-focus")
        box.classList.remove("input-normal")
    })
    input.addEventListener("blur", () => {
        box.classList.remove("input-focus")
        box.classList.add("input-normal")
        if (box.classList.contains('input-erro')) {
            box.classList.remove("input-normal")
            box.classList.add("input-erro")
        }
    })
})
//Salvar com localStorage
const saveLocal = localStorage.getItem("save")
const nomeSalvo = localStorage.getItem("nome")
const nameUser = document.querySelector(".your-name")
body.classList.add("visibly")
if (saveLocal === "ok") {
    entrarConta()
    nameUser.innerHTML = nomeSalvo
}
function formOn() {
    formLog.classList.add("on")
    formLog.classList.remove("off")
    formCad.classList.add("off")
    formCad.classList.remove("on")
    
    formLog.classList.add("anime")
    formCad.classList.remove("anime")
    
    formCad.reset()
}
function formOff() {
    formLog.classList.add("off")
    formLog.classList.remove("on")
    formCad.classList.add("on")
    formCad.classList.remove("off")
    
    formLog.classList.remove("anime")
    formCad.classList.add("anime")    
    formLog.reset()
}

// parte do cadastro
function entrarConta() {
    secaoForm.classList.add("form-off")
    secaoForm.classList.remove("form-on")
    secaoContent.classList.add("conteudo-on")
    secaoContent.classList.remove("conteudo-off")    
   
    navlink.forEach(nav => {
       nav.classList.add("config-on")
       nav.classList.remove("config-off")
    })
}
// botao ja tenho conta
btnNext.addEventListener("click", () => {
    formOn()
})
// botao não tenho conta
btnPrev.addEventListener("click", () => {
    formOff()
})
//parte do cadastro
const cadErr = formCad.querySelectorAll(".fa-circle-info")
const bordErr = formCad.querySelectorAll(".box-input")
const inpPla = formCad.querySelectorAll("input")

formCad.addEventListener("submit", (e) => {
    e.preventDefault()
    // QUANDO CRIAR OS DADOS
    let isValid = true
    const formData = new FormData(formCad)
    let index = 0

    for (const [key, value] of formData) {
    
        cadErr[index].classList.add("ok")
        cadErr[index].classList.remove("erro")
        bordErr[index].classList.add("input-normal")
        bordErr[index].classList.remove("input-erro")
        if (value.trim() === "") {
            console.log("caixa vazia")
            cadErr[index].classList.add("erro")
            cadErr[index].classList.remove("ok")
            bordErr[index].classList.remove("input-normal")
            bordErr[index].classList.add("input-erro")
            inpPla[2].placeholder = "Crie sua senha"
            isValid = false
        }else {
            if (key === "email") {
            const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

                if (!regex.test(value)) {
                    console.log("Email ivalido!")
                    cadErr[index].classList.add("erro")
                    cadErr[index].classList.remove("ok")
                    bordErr[index].classList.remove("input-normal")
                    bordErr[index].classList.add("input-erro")
                    inpPla[1].value = ""
                    inpPla[1].placeholder = "Email ivalido!"
                    isValid = false
                }else {
                    inpPla[1].placeholder = "Crie seu e-mail"
                }
            }
            if (key === "senha") {
                if (value.trim().length < 8) {
                    console.log("senha muito curta")
                    cadErr[index].classList.add("erro")
                    cadErr[index].classList.remove("ok")
                    bordErr[index].classList.remove("input-normal")
                    bordErr[index].classList.add("input-erro")
                    inpPla[2].value = ""
                    inpPla[2].placeholder = "Senha muito curta"
                    isValid = false
                }else {
                    inpPla[2].placeholder = "Crie sua senha"
                }
            }
            
        }
        index++
    }
    if (!isValid) return
    else {
        
        const dadosClient = Object.fromEntries(formData)
        fetch("https://meu-projeto-6eb8.onrender.com", {
            method : 'POST',
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify(dadosClient)
        })
            .then(res => res.text())
            .then(dados => {
                console.log(dados)
                if (dados == "Esse email já existe") {
                    cadErr[1].classList.add("erro")
                    cadErr[1].classList.remove("ok")
                    bordErr[1].classList.remove("input-normal")
                    bordErr[1].classList.add("input-erro")
                    inpPla[1].value = ""
                    inpPla[1].placeholder = "Este email ja existe!!"
                
                }else {
                    formCad.reset()
                    formOn()
                }
            })
    }
})
//parte do login
const logErr = formLog.querySelectorAll(".fa-circle-info")
const bordErr2 = formLog.querySelectorAll(".box-input")
const inpPla2 = formLog.querySelectorAll("input")
formLog.addEventListener("submit", (e) => {
    e.preventDefault()
    // QUANDO ENVIAR OS DADOS PARA ENTRAR
    let isValid = true
    const formData = new FormData(formLog)
    let index = 0
    for (const [key, value] of formData) {
        logErr[index].classList.add("ok")
        logErr[index].classList.remove("erro")
        bordErr2[index].classList.add("input-normal")
        bordErr2[index].classList.remove("input-erro")
        
        if (value.trim() === "") {
            console.log("caixa vazia")
            logErr[index].classList.add("erro")
            logErr[index].classList.remove("ok")
            bordErr2[index].classList.remove("input-normal")
            bordErr2[index].classList.add("input-erro")
            isValid = false
        }
        index++
    }
    if (!isValid) return
    const dadosLogin = Object.fromEntries(formData)

    fetch("https://meu-projeto-6eb8.onrender.com", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(dadosLogin)
})
.then(res => res.json())
.then(dados => {

    console.log(dados)

    if (dados.erro === "Email não encontrado") {

        logErr[0].classList.add("erro")
        bordErr2[0].classList.add("input-erro")

        inpPla2[0].value = ""
        inpPla2[0].placeholder = "Email não encontrado"

    } else if (dados.erro === "Senha incorreta") {

        logErr[1].classList.add("erro")
        bordErr2[1].classList.add("input-erro")

        inpPla2[1].value = ""
        inpPla2[1].placeholder = "Senha incorreta"

    } else {

        entrarConta()

        nameUser.innerHTML = dados.nome

        localStorage.setItem("save", "ok")
        localStorage.setItem("nome", dados.nome)
    }
})
})
