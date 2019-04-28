$(document).ready(function() {
    
    typeWriter("Software Engineering Student","f1", 0);    
    typeWriter("Full Stack Developer","f2", 0);    
    typeWriter("Jack of All Tounges","f3", 0);    

});

function typeWriter(txt, id, num) {
    // console.log(txt);
    if (num < txt.length) {
        document.getElementById(id).innerHTML += txt.charAt(num);
        num++;
        setTimeout(typeWriter, 50, txt, id, num);
    }
}

function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    // document.getElementById("main").style.marginLeft = "250px";
}
  
/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}