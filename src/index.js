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

function menuPress() {
    let menuId = this.id;
    displayPage(menuId.slice(-1));
}

const menuLinks = document.getElementsByClassName("menuLink");
for (var i = 0; i < menuLinks.length; i++) {
    menuLinks[i].addEventListener("click", menuPress, false);
}

// MAINCONTENT MACHINES FUNCTIONALITIES
const vaskePage = document.getElementById("vaskePage");
for (var i = 1; i <= machines.length; i++) {
    var html =  "<div class='machine' id='m"+i+"'>"+
                    "<h1 class='font-asap'>Pick a Vasketid</h1>"+
                    "<span>Open 10am - 5pm</span>"+
                    "<h3>Machine "+i+" is a "+machines[i-1]+"</h3>"+
                    "<div class='reservations'></div>"
                "</div>";
    vaskePage.innerHTML = vaskePage.innerHTML + html;
}

let date = new Date();
let times;
let timeLabel = "";
let curMachine = 0;
const machinePages = document.querySelectorAll(".machine");
[].forEach.call(machinePages, (elem) => {
    curMachine++;
    times = [];

    date.setHours(10);
    date.setMinutes(0);
    for (var i = 0; i <= 13; i++) {
        timeLabel = formatDatestamp(date);
        date.setTime(date.getTime()+1800*1000);
        timeLabel += " - "+formatDatestamp(date);
        times.push(timeLabel);
    }
    
    for (var i = 0; i < elem.children.length; i++) {
        if (elem.children[i].className == "reservations") {
            let curTime = 1;
            for (var c = 0; c < times.length; c++) {
                elem.children[i].innerHTML +=   "<label class='time' data-machine='"+curMachine+"' data-time='"+curTime+"'>"+
                                                    "<input type='checkbox' name='reserved' m='"+curMachine+"' t='"+curTime+"' />"+
                                                    "<span>&nbsp;"+times[c]+"</span>"+
                                                "</label>";
                curTime++;
            }
        }        
    }
});

function formatDatestamp(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    var strTime = ("0"+hours).slice(-2) + ':' + ("0"+minutes).slice(-2) + ' ' + ampm;
    return strTime;
}

var theMachine = 1;
function displayPage(pageId) {
    [].forEach.call(machinePages, (elem) => {
        elem.style.display = 'none';
    });
    document.querySelector(".machine#m"+pageId).style.display = "block";
}
displayPage(theMachine);

// Find a Vasketid --- Sample Data
const occupiedMachines = [[], [], [], [], []];
occupiedMachines[0].push(3);
occupiedMachines[0].push(4);
occupiedMachines[0].push(5);
occupiedMachines[1].push(1);
occupiedMachines[1].push(2);
occupiedMachines[1].push(3);
occupiedMachines[3].push(6);
occupiedMachines[3].push(7);
occupiedMachines[3].push(8);
occupiedMachines[4].push(9);
occupiedMachines[4].push(10);
occupiedMachines[4].push(11);

for (var i = 0; i < 5; i++) {
    for (var c = 0; c < occupiedMachines[i].length; c++) {
        let theLabel = document.querySelector(".time[data-machine=\""+(i+1)+"\"][data-time=\""+occupiedMachines[i][c]+"\"]");
        theLabel.children[0].setAttribute("checked", "checked");
        theLabel.children[0].classList.add("occupied");
    }
}

// Pick a Vasketid
let yourMachines = [[], [], [], [], []];
const localM = JSON.parse(localStorage.getItem("yourMachines"));
if (localM !== null) {
    yourMachines = localM;
}

for (var i = 0; i < 5; i++) {
    for (var c = 0; c < yourMachines[i].length; c++) {
        let theLabel = document.querySelector(".time[data-machine=\""+(i+1)+"\"][data-time=\""+yourMachines[i][c]+"\"]");
        theLabel.children[0].setAttribute("checked", "checked");
        theLabel.children[0].classList.add("yours");
    }
}

function PickaTid(e) {
    if (e.target.getAttribute("checked") == null) {
        let m = e.target.getAttribute("m");
        let t = e.target.getAttribute("t");
        yourMachines[m-1].push(t);
        localStorage.setItem("yourMachines", JSON.stringify(yourMachines));

        e.target.setAttribute("checked", "checked");
        e.target.classList.add("yours");
    } else {
        e.preventDefault();
    }
}

const checkbox = document.querySelectorAll("input[type=\"checkbox\"][name=\"reserved\"]");
for (var i = 0; i < checkbox.length; i++) {
    checkbox[i].addEventListener("click", PickaTid, false);
}