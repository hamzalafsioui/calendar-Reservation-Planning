const days = document.querySelectorAll(".day.active");
days.forEach(day=>{
    day.addEventListener('click',function (){
        console.log(day);
    })
})
