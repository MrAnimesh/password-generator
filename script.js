const passwordBox = document.getElementById("pwd-box")
const copy = document.getElementById("copy-password")

const tvPwdLength = document.getElementById("pwd-length")
const slider = document.getElementById("slider")

const chkLowercase = document.getElementById("lower-case")
const chkUppercase = document.getElementById("upper-case")
const chkNumber = document.getElementById("number")
const chkSpecialChar = document.getElementById("special-character")

const indicator = document.getElementById("indicator")
const btnGenerate = document.getElementById("btnGenerate")
const renderList = document.getElementById("renderList")

const lowercase = "abcdefghijklmnopqrstuvwxyz"
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const numbers = "1234567890"
const spclChar = "!@#$%&(){}[]><\/"



setupTabs()
let savedPasswords = []
let x = JSON.parse(localStorage.getItem("password"))

if (x != null){
    savedPasswords = x
    renderPasswords(savedPasswords)
}
console.log(savedPasswords)

slider.addEventListener("input",function(){
    let x = slider.value
    tvPwdLength.innerText = x
    generate(x)
    setIndicator(x)
})


btnGenerate.onclick = function(){
    let x = slider.value
    generate(x)
    // renderPasswords()
}
function generate(x){
    let txt = ""
    for(let i=0; i < x; i+=1){
        let temp = Math.floor((Math.random() * 4))+ 0
        switch(temp){
            case 0: if (chkLowercase.checked){
                        txt+=lowercase[Math.floor((Math.random() * 26))+ 0]
                        break
                    }
            case 1: if (chkUppercase.checked){
                        txt+=uppercase[Math.floor((Math.random() * 26))+ 0]
                        break
                    }
            case 2:  if (chkNumber.checked){
                        txt+=numbers[Math.floor((Math.random() * 10))+ 0]
                        break
                    }
            case 3: if (chkSpecialChar.checked){
                        txt+=spclChar[Math.floor((Math.random() * 15))+ 0]
                        break
                    }
            case 0: if (chkLowercase.checked){
                        txt+=lowercase[Math.floor((Math.random() * 26))+ 0]
                        break
                    }
            case 1: if (chkUppercase.checked){
                        txt+=uppercase[Math.floor((Math.random() * 26))+ 0]
                        break
                    }
            case 2:  if (chkNumber.checked){
                        txt+=numbers[Math.floor((Math.random() * 10))+ 0]
                        break
                    }
            case 3: if (chkSpecialChar.checked){
                        txt+=spclChar[Math.floor((Math.random() * 16))+ 0]
                        break
                    }
        }
    }
    passwordBox.value = txt
    
}
function renderPasswords(pwd){
    let passwordLists = ""
    for (let i=0; i<pwd.length;i+=1){
        passwordLists += `
        <div class="pwd-box">
            <li>
                <button class="saved" id="${i}">${pwd[i]}</button>
            </li>
        </div>`
    }
    renderList.innerHTML = passwordLists;
    deleteButtonWork()
}
function setIndicator(x){
    if (x >= 12){
        indicator.innerText = "Very Strong"
        indicator.style.background = '#0070f6'
    }else if(x > 9){
        indicator.innerText = "Strong"
        indicator.style.background = '#43ed9c'
    }else if(x > 6){
        indicator.innerText = "Good"
        indicator.style.background = '#f1c80b'
    }else if(x > 4){
        indicator.innerText = "Weak"
        indicator.style.background = '#f5203e'
    }else{
        indicator.innerText = "Very Weak"
        indicator.style.background = '#f5203e'
    }
}
copy.addEventListener("click", function(){
    copyPassword()
})
function copyPassword(){
    passwordBox.select()
    navigator.clipboard.writeText(passwordBox.value)
}

function setupTabs(){
    const tabButttons = document.querySelectorAll(".btn-tab")
    const tabs = document.querySelectorAll(".wrapper")
    
    tabButttons.forEach((tab, index)=>{
        tab.addEventListener('click', ()=>{
            console.log("clicked")
            tabButttons.forEach(tab =>{tab.classList.remove('active')})
            tab.classList.add('active')
            tabs.forEach(content=>{content.classList.remove('active')})
            tabs[index].classList.add('active')
        })
        
    })

}

document.getElementById("btnSave").addEventListener("click", function(){
    console.log("clicked")
    savedPasswords.unshift(passwordBox.value)
    localStorage.setItem("password",JSON.stringify(savedPasswords))
    renderPasswords(savedPasswords)
})

function deleteButtonWork(){
    for (let i=0; i<savedPasswords.length; i+=1){
        document.getElementById(i).addEventListener("dblclick", function(){
            console.log("click")
            deletePassword(i)
        })
    }
}
function deletePassword(index){
    savedPasswords.splice(index, 1)
    localStorage.setItem("password",JSON.stringify(savedPasswords))
    savedPasswords = JSON.parse(localStorage.getItem("password"))
    renderPasswords(savedPasswords)
}















// let x = JSON.parse(localStorage.getItem("password"))

// if (x != null){
//     savedPasswords = x
//     renderPasswords(savedPasswords)
// }
// console.log(savedPasswords)

// generate(8)
// renderPasswords()