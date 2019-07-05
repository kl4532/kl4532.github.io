let size = 560;

window.onload = ()=>{
    replace();
}
window.addEventListener('resize', ()=>{
    replace();
});

function replace(){
    if(window.innerWidth>size){
        document.querySelector("#top").href = "#home";
    }else{
        document.querySelector("#top").href = "#nav";
    }
}