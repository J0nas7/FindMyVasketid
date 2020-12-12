import { bro } from './bro';
import './styles/main.scss';

console.log(bro("Sup"));
const yourName = localStorage.getItem("yourName");
if (yourName == null) {
    document.getElementById("loginPage").style.display = "block";
} else {
    document.getElementById("navigation").style.display = "block";
    document.getElementById("vaskePage").style.display = "block";
}

// LOGIN FUNCTIONALITIES
const loginBtn = document.getElementById("loginBtn");
const loginTxt = document.getElementById("loginTxt");

loginBtn.addEventListener("click", () => {
    login();
});
loginTxt.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        login();
    }
});
function login() {
    if (loginTxt.value) {
        localStorage.setItem("yourName", loginTxt.value);
        location.reload();
    } else {
        alert("Cannot login witn an empty name!");
    }
}

// TOPMENU FUNCTIONALITES
const menuTrigger = document.getElementById("menuTrigger");
const navigation = document.getElementById("navigation");
const ulNav = document.getElementById("nav");

menuTrigger.addEventListener("click", () => {
    navigation.classList.toggle("open");
    menuTrigger.classList.toggle("triggered");
});

var theMachine = 1;
const machines = [
                    "Washing machine",
                    "Washing machine",
                    "Washing machine",
                    "Washing machine",
                    "Dryer"
                ];
for (var i = 1; i <= machines.length; i++) {
    var html = "<li class='menuItem'>"+
                    "<a class='menuLink' id='m"+i+"'>Machine "+i+"</a>"+
                "</li>";
    ulNav.innerHTML = ulNav.innerHTML + html;
}

// MAINCONTENT MACHINES FUNCTIONALITIES
const vaskePage = document.getElementById("vaskePage");
for (var i = 1; i <= machines.length; i++) {
    var html =  "<div class='machine' id='m"+i+"'>"+
                    "<h1 class='font-asap'>Pick a Vasketid</h1>"+
                    "<h3>Machine "+i+" is a "+machines[i-1]+"</h3>"+
                "</div>";
    vaskePage.innerHTML = vaskePage.innerHTML + html;
}

[].forEach.call(document.querySelectorAll(".machine"), (elem) => {
    elem.style.display = 'none';
});
document.querySelector(".machine#m"+theMachine).style.display = "block";