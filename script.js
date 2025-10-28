// Get the modal
let modal = document.getElementById("myModal");
// Get the element that closes the modal
let span = document.getElementsByClassName("close")[0];
// get btn save
let btnSave = document.getElementById("btn-save");
// get btn annuler
let btnAnnuler = document.getElementById("btn-annuler");

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
btnAnnuler.addEventListener("click", () => {
  modal.style.display = "none";
});

// form inputs
const nameInput = document.getElementById("name");
const startHourInput = document.getElementById("start-hour");
const endHourInput = document.getElementById("end-hour");
const selectedType = document.getElementById("type");

// variable to stock selected day;
let selectedDay = null;

days.forEach((day) => {
  day.addEventListener("click", function () {
    // console.log(day);
    selectedDay = day;
    modal.style.display = "block"; // When the user clicks open the modal
  });
});

// function add color based on type
function addReservationColor(reservation,type){
    if(type==="vip")
        reservation.style.backgroundColor = "red";
    else if(type === "group")
        reservation.style.backgroundColor = "green";
    else
        reservation.style.backgroundColor = "blue";
}

// function create reservation 
function createReservationElement(name,start,end,type){
    const reservation = document.createElement("div");
    reservation.classList.add("reservation");
    addReservationColor(reservation,type);
    // add text 
    reservation.textContent = `${name} (${start} - ${end})`;
    // append to day was clicked
    selectedDay.appendChild(reservation);
    
}


// event when the user clicks on save
btnSave.addEventListener("click", (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const start = startHourInput.value;
  const end = endHourInput.value;
  const type = selectedType.value;

  if (!name || !start || !end || !type) {
    alert("please fill all fields -)");
    return;
  }

  // create reservation element;
  createReservationElement(name, start, end, type);
});
