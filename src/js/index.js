const changeMainSectionSize = () =>{
    const header = document.querySelector('header');
    const mainSection = document.querySelector('section#main');
    const headerHeight = header.offsetHeight;
    mainSection.style.marginTop = headerHeight + 'px';
    mainSection.style.height = 'calc(100vh - ' + headerHeight + 'px)';
}
const startCounter = () =>{
    const count = document.querySelector('#counter');
    let interval = setInterval(()=>{
        if (count.innerHTML == 99){
            clearInterval(interval);
        }
        count.innerHTML = parseInt(count.innerHTML) + 1;
    }, 100)
}

document.addEventListener('DOMContentLoaded', ()=>{
    changeMainSectionSize();
    startCounter();
    AOS.init();
})