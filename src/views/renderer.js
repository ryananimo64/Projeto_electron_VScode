const linha = document.getElementById('linhas')

const area = document.getElementById('txtArea')
area.focus()

const nomeArquivo = document.getElementById('titulo')

api.setColor((event,color) => {
    area.style.color = color
})


function numerarLinhas() {
    let linhaNumerada = ""
    let arraylinhas = area.value.split('\n')
    for(let i = 0; i < arraylinhas.length; i++) {
        linhaNumerada += i + 1 + '<br>'
        linha.innerHTML = linhaNumerada
    }
}

numerarLinhas()

area.addEventListener('input', () => {
    numerarLinhas()
})

area.addEventListener('scroll', () => {
    linha.scrollTop = area.scrollTop
})

// novo arquivo //abrir arquivo
api.setFile((event, file) => {
    area.value = file.content
    nomeArquivo.innerHTML =`${file.name} - Mini Dev Editor`
    numerarLinhas()
})

//salvar | salvar como
document.addEventListener('DOMContentLoaded', () => {
    area.addEventListener('keyup', () => {
        api.updateContent(area.value)
    })
})