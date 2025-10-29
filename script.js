import { generateCalendarDays } from "./generateCalendar.js";
generateCalendarDays();
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
const startInput = document.getElementById("start-hour");
const endInput = document.getElementById("end-hour");
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
function addReservationColor(reservation, type) {
  if (type === "vip") reservation.style.backgroundColor = "red";
  else if (type === "group") reservation.style.backgroundColor = "green";
  else reservation.style.backgroundColor = "blue";
}
// close Modal
function closeModal() {
  modal.style.display = "none";
  nameInput.value = "";
  startInput.value = "";
  endInput.value = "";
}

// function create reservation
function createReservationElement(name, start, end, type) {
  const reservation = document.createElement("div");
  reservation.classList.add("reservation");
  addReservationColor(reservation, type);
  // add text
  reservation.textContent = `${name} (${start} - ${end})`;
  // append to day was clicked
  selectedDay.appendChild(reservation);
  // close modal
  closeModal();
}

// save reservation data to local storage
function saveReservation(reservation) {
  // get existing reservation
  const reservations = JSON.parse(localStorage.getItem("reservations")) || []; //if not exist fill with empty data
  // add new reservation
  reservations.push(reservation);
  // save
  localStorage.setItem("reservations", JSON.stringify(reservations));
}
// event when the user clicks on save
btnSave.addEventListener("click", (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const start = startInput.value;
  const end = endInput.value;
  const type = selectedType.value;

  if (!name || !start || !end || !type) {
    alert("please fill all fields -)");
    return;
  }

  // use local storage
  const dayNumber = selectedDay.querySelector("span").textContent; // get day number 1 ... 30
  // reservation data
  const reservationData = {
    day: dayNumber,
    name,
    start,
    end,
    type,
  };
  saveReservation(reservationData); // save reservation
  // create reservation element;
  createReservationElement(name, start, end, type);
});

function loadReservations() {
  const reservations = JSON.parse(localStorage.getItem("reservations")) || []; // get all reservations from local storage => not found return empty []
  console.log(reservations);
  reservations.forEach((reservation) => {
    console.log(reservation);

    const day = Array.from(document.querySelectorAll(".day.active")).find(
      (d) => d.querySelector("span").textContent === reservation.day
    );

    console.log(day);
    console.log(reservation);

      if (day) {
      selectedDay = day;
      createReservationElement(
        reservation.name,
        reservation.start,
        reservation.end,
        reservation.type
      );
    }

  
  });
}

loadReservations();
