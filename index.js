const main = document.querySelector('main')
const root = document.querySelector(':root')
const input = document.getElementById('input')
const resultInput = document.getElementById('result')

//teclas permitidas para digitar no input
const allowedKeyes = ["(", ")", "/", "*", "-", "+", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "%", " "]

//aplicando evento de click aos botões da calc
document.querySelectorAll('.charKey').forEach(function(charKeyBtn){
  charKeyBtn.addEventListener('click', function(){
    const value = charKeyBtn.dataset.value
    input.value += value
  })
})

//evento botão clear (C)
document.getElementById('clear').addEventListener('click', function(){
  input.value = ''
  input.focus()  
})


//eventos de apertar tecla da calc
input.addEventListener('keydown', function(ev){
  ev.preventDefault()
  //verificando se a tecla existe no array de tecladas permitidas e adicionando ao valor do input
  if(allowedKeyes.includes(ev.key)){
    input.value += ev.key
    return
  }
  //adicionando funcionalidade de apagar ao backspace utilizando slice para remover 1 caractere
  if(ev.key === 'Backspace'){
    input.value = input.value.slice(0, -1)
  }
  //adicionando funcionalidade ao enter para executar o calculo do valor do input
  if(ev.key === 'Enter'){
    calculate()
  }
})

//evento no botão (=) para calcular a operação
document.getElementById('equal').addEventListener('click', calculate)

//função para calcular o valor do input utilizando eval()
function calculate(){
  resultInput.value = 'ERROR'
  resultInput.classList.add('error')

  const result = eval(input.value)

  resultInput.value = result
  resultInput.classList.remove('error')
}

//adicionando evento para o botão copy
document.getElementById('copyToClipboard').addEventListener('click',function (ev){
  const button = ev.currentTarget
  if(button.innerText === 'Copy'){
    button.innerText = 'Copied!'
    button.classList.add('success')
    //window navigator
    navigator.clipboard.writeText(resultInput.value)
  }else{
    button.innerText = 'Copy'
    button.classList.remove('success')
  }
})

//trocar o tema de dark para light e vice-versa
document.getElementById('themeSwitcher').addEventListener('click', function(){
  if(main.dataset.theme === 'dark'){
    root.style.setProperty('--bg-color', '#f1f5f9')
    root.style.setProperty('--border-color', '#aaa')
    root.style.setProperty('--font-color', '#212529')
    root.style.setProperty('--primary-color', '#26834a')
    main.dataset.theme = 'light'
  }else{
      root.style.setProperty('--bg-color', '#212529')
    root.style.setProperty('--border-color', '#00f800')
    root.style.setProperty('--font-color', '#f1f5f9')
    root.style.setProperty('--primary-color', '#3f0a44')
    main.dataset.theme = 'dark'
  }
})