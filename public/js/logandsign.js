document.querySelector("#signup").addEventListener('click',signup)
document.querySelector("#login").addEventListener('click',login)
const loginGroupBorder = document.querySelectorAll(".login-border")
const loginGroupText = document.querySelectorAll(".login-text")
const signupGroup = document.querySelectorAll(".signupGroup")
const form = document.querySelector("form")
let tracker = 0

function signup(){
    if(tracker === 1){
        return
    }
    
    signupGroup.forEach(entry=>{
        entry.classList.toggle("destroy")
    })
    loginGroupBorder.forEach(entry =>{
        entry.classList.remove("login-border")
        entry.classList.add("signup-border")
    })
    loginGroupText.forEach(entry => {
        entry.classList.remove("login-text")
        entry.classList.add("signup-text")
    })
    document.querySelector("h1").innerHTML = "Sign Up"
    
    form.action = "/register"
    tracker++
}

function login(){
    if(tracker === 0){
        return
    }
    
    signupGroup.forEach(entry=>{
        entry.classList.toggle("destroy")
    })
    loginGroupBorder.forEach(entry =>{
        entry.classList.add("login-border")
        entry.classList.remove("signup-border")
    })
    loginGroupText.forEach(entry => {
        entry.classList.add("login-text")
        entry.classList.remove("signup-text")
    })
    document.querySelector("h1").innerHTML = "Log In"
    form.action = "/login"
    tracker--
}