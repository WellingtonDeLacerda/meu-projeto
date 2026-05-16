function jogar(){
    let dadosRadios = document.getElementsByName("dificuldade")
    let caixa = document.querySelector("output")
    caixa.innerText += dadosRadios
}
jogar()