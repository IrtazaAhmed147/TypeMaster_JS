let input = document.getElementById('input')
let text = document.getElementById('text')
let btn = document.getElementById('tryagain')
let mistakeTag = document.getElementById('mistakes')
let timeTag = document.getElementById('time')
let accuracyTag = document.getElementById('acc')
let wpmTag = document.getElementById('wpm')
let timer,
maxTime = 60,
timeLeft = maxTime,
charIndex = mistakes = isTyping = 0

function randomParagraph() {
  let randomPara = Math.floor(Math.random() * paragraphs.length)
  text.innerHTML = ''; 
  paragraphs[randomPara].split('').forEach(span => {
    let spanTag = `<span>${span}</span>`
    text.innerHTML += spanTag
  })

}
function initType() {
    let character = text.querySelectorAll('span')
    let typedChar = input.value.split('')[charIndex]

    if(charIndex < character.length - 1 && timeLeft > 0) {
      if(!isTyping) {
        timer = setInterval(initTimer, 1000)
        isTyping = true
      }

      if(typedChar == null) {

        if (charIndex > 0) charIndex--
        if(character[charIndex]?.classList.contains('incorrect')) {
          mistakes--
        }
        character[charIndex].classList.remove('correct', 'incorrect')
      } else {
        if(character[charIndex].innerText === typedChar) {
          character[charIndex].classList.add('correct')
        } else {
          mistakes++
          character[charIndex].classList.add('incorrect')
        }
        charIndex++
        
      }
      let wpm = (charIndex - mistakes) / 5 / ((maxTime - timeLeft) / 60 )  
     
      let accuracy = charIndex === 0 ? 100 : ((charIndex - mistakes) / charIndex) * 100;

      wpm  = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm
      wpmTag.innerHTML = `wpm: ${wpm.toFixed(0)}`
      accuracyTag.innerHTML = `Accuracy: ${accuracy.toFixed(0)}%`
      mistakeTag.innerHTML = `mistakes: ${mistakes}`
    } else {
      input.value = ''
      clearInterval(timer)
    }
    
  

}
function initTimer () {
  if(timeLeft > 0) {
    timeLeft--
    timeTag.innerHTML = `Timeleft: ${timeLeft}s`
  } else {
    clearInterval(timer)
  }
}
input.addEventListener('input', initType)
randomParagraph()

btn.addEventListener('click', function () {
  input.value = ''
  clearInterval(timer)
  try {
    
    randomParagraph()
  } catch (error) {
      console.log(error)
  }
  wpmTag.innerHTML = `wpm: 0`
  accuracyTag.innerHTML = `Accuracy: 0%`
  mistakeTag.innerHTML = `mistakes: 0`
  timeTag.innerHTML = `Timeleft: 0s`
  
})