// Get the modal
let modal = document.getElementById("myModal");
// Get the element that closes the modal
let span = document.getElementsByClassName("close")[0];
// get btn save
let btnSave = document.getElementById('btn-save');
// get btn annuler
let btnAnnuler = document.getElementById('btn-annuler');

// add event to all active days
const days = document.querySelectorAll(".day.active");


// When the user clicks on <span> (x) => close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal => close it
window.onclick = function (event) {
    // console.log(event.target);
  if (event.target == modal) {
    modal.style.display = "none";
    // console.log(event.target);
  }
};
// when the user clicks to annuler
btnAnnuler.addEventListener(('click'),() =>{
    modal.style.display = 'none';
})

// form inputs
const name = document.getElementById('name');
const startHour = document.getElementById('start-hour');
const endHour = document.getElementById('end-hour');
const type = document.getElementById('type');

// variable to stock selected day;
let selectedDay = null;

days.forEach((day) => {
  day.addEventListener("click", function () {
    // console.log(day);
    selectedDay = day;
    modal.style.display = "block"; // When the user clicks open the modal
  });
});
