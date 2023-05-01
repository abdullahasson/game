let caeds = document.querySelectorAll(`body .container .content-game .card`)
let arr = [];
let qwe = 0;
let zxc = 0;
let tee = 0;
let random = []

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

caeds.forEach((el) => {
    el.style.order = getRandomInt(19)

})

setTimeout(async () => {
    if (window.sessionStorage.hasOwnProperty("Player") === false) {
        const { value: Name } = await Swal.fire({
            title: 'Enter your Name',
            input: 'text',
            inputLabel: 'Name',
            inputPlaceholder: 'Enter your Name',
            })
            
            if (Name) {
            window.sessionStorage.setItem("Player" , Name)
            document.querySelector(`body .user-info .user-name h4 span`).innerHTML =  window.sessionStorage.getItem("Player")
            time()
            }
    } else {
        time()
        document.querySelector(`body .user-info .user-name h4 span`).innerHTML =  window.sessionStorage.getItem("Player")
    }
} , 100)


// Function to creat a timer
let sec = 60
function time() {  
    setInterval(() => {
        if (sec > 0) {
            sec -= 1
            document.querySelector(`body .container .user-info .time span:last-child`).innerHTML = sec
            if (sec == 0) {
                stopGame()
            }
        } else {
            clearInterval()
        }
    } , 1000)
}


// Function Help You To Stop The game
async function stopGame() {
    caeds.forEach((el) => {
        if (el.classList.contains("yes")) {
            zxc += 1
        }
    })
    if (zxc == 20) {
        document.getElementById("fainalsuccess").play()
        const { value: suc } = await Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'You Are Success',
            showConfirmButton: true,
            confirmButtonText:
            'Play Again',
          })
          
          if (suc) {
            location.reload();
          }
    } else {
        document.getElementById("fainalfail").play()
        const { value: er } = await Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You Are Fail ): ',
            timerProgressBar : true,
            confirmButtonText:
            'Play Again',
          })
          
          if (er) {
            location.reload();
          }
    }
}



caeds.forEach((el) => {
    el.addEventListener("click" , () => {
        arr.push(el.getAttribute("data-card"))
        el.classList.toggle("play")
        if (arr.length === 2) {
            arr = []
            check()
        }
    })
})
let asd = []


// Function use for test the the game
function check() {
    for (let i = 0 ; i < caeds.length ; i++) {
        if (caeds[i].classList.contains("play")) {
            asd.push(caeds[i])
        }
    }
    if (asd[0].getAttribute("data-card") === asd[1].getAttribute("data-card")) {
        asd[0].classList.remove("play")
        asd[1].classList.remove("play")
        asd[0].classList.add("yes")
        asd[1].classList.add("yes")
        asd = []
        caeds.forEach((el) => {
            if (el.classList.contains("yes")) {
                tee += 1
            }
        })
        if (tee == 20) {
            document.querySelector(`body .stopped h2`).innerHTML = "You Are Success"
            document.querySelector(`body .stopped i`).classList.add("bx-like")
        }
        document.getElementById('success').play()

    } else {
        setTimeout(() => {
            asd[0].classList.remove("play")
            asd[1].classList.remove("play")
            asd = []
        }, 500) 
        qwe += 1
        document.querySelector(`body .container .user-info .wrong span`).innerHTML = qwe
        document.getElementById("fail").play()
    }
}