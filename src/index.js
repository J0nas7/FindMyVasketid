import { bro } from './bro';
import './styles/main.scss';

console.log(bro("Sup"));

const menuTrigger = document.getElementById("menuTrigger");
const navigation = document.getElementById("navigation");
menuTrigger.addEventListener("click", () => {
    navigation.classList.toggle("open");
    menuTrigger.classList.toggle("triggered");
});