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

// id to track each reservation
let reservationId = JSON.parse(localStorage.getItem("reservationId")) || 1;
console.log(`reservationId: ${reservationId}`);

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
const numbersInput = document.getElementById("number");

// function to remove reservation from localStorage
function removeReservationFromLocalStorage(reservation, id) {
  let reservations = JSON.parse(localStorage.getItem("reservations")) || [];
  console.log(reservations);
  console.log(id);
  // filter reservation
  let updatedReservations = reservations.filter(
    (r) =>
      // !(
      //   r.day === dayNumber &&
      //   reservation.textContent.includes(r.name) &&
      //   reservation.textContent.includes(r.start) &&
      //   reservation.textContent.includes(r.end)
      // )
      !(r.reservationId === Number(id))
  );
  // save changes
  console.log(JSON.stringify(updatedReservations));

  localStorage.setItem("reservations", JSON.stringify(updatedReservations));
  console.log(updatedReservations);
  alert("reservation deleted successfully -)");
}

// variable to stock selected day;
let selectedDay = null;
let editingReservation = null;
days.forEach((day) => {
  day.addEventListener("click", function (event) {
    if (event.target.classList.contains("reservation")) {
      const reservation = event.target;
      console.log(reservation);
      // delete reservation if the user click it
      const confirmation = confirm("Click OK to DELETE, or Cancel to EDIT");
      // if yes
      if (confirmation) {
        reservation.remove(); // remove from dom
        // remove from localStorage
        console.log(reservation);
        console.log(reservation.dataset.id);
        removeReservationFromLocalStorage(reservation, reservation.dataset.id);
        return;
      } else {
        // update
        const reservations =
          JSON.parse(localStorage.getItem("reservations")) || [];
        const reservationData = reservations.find(
          (res) => res.reservationId === Number(reservation.dataset.id)
        );
        console.log(reservationData);
        if (reservationData) {
          editingReservation = reservationData;
          selectedDay = day;

          // // fill form
          nameInput.value = editingReservation.name;
          startInput.value = editingReservation.start;
          endInput.value = editingReservation.end;
          type.value = editingReservation.type;
          numbersInput.value = editingReservation.number;
          modal.style.display = "block";
          
        }
      }
    }
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
  numbersInput.value = "";
}

// function create reservation
function createReservationElement(name, start, end, type, number, id = null) {
  const reservation = document.createElement("div");
  reservation.classList.add("reservation");
  addReservationColor(reservation, type);
  addReservationId(reservation, id || reservationId++);
  // add text
  reservation.textContent = `${name} (${start} - ${end})[${number}]`;
  // append to day was clicked
  selectedDay.appendChild(reservation);
  // close modal
  closeModal();
}

// Function to add reservation Id
function addReservationId(reservation, id) {
  reservation.dataset.id = id;
  console.log(reservation.dataset.id);
  console.log(id);
}

// save reservation data to local storage
function saveReservation(reservation) {
  // get existing reservation
  const reservations = JSON.parse(localStorage.getItem("reservations")) || []; //if not exist fill with empty data
  // add new reservation
  reservations.push(reservation);
  // save
  localStorage.setItem("reservations", JSON.stringify(reservations));
  localStorage.setItem("reservationId", JSON.stringify(reservationId));
}
// event when the user clicks on save
btnSave.addEventListener("click", (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const start = startInput.value;
  const end = endInput.value;
  const type = selectedType.value;
  const number = numbersInput.value;

  if (!name || !start || !end || !type || !number) {
    alert("please fill all fields -)");
    return;
  }

  // use local storage
  const dayNumber = selectedDay.querySelector("span").textContent; // get day number 1 ... 30
  console.log(dayNumber);
  // reservation data
  const reservationData = {
    reservationId,
    day: dayNumber,
    name,
    start,
    end,
    type,
    number,
  };
  console.log(reservationData);

  saveReservation(reservationData); // save reservation
  // create reservation element;
  createReservationElement(name, start, end, type, number);
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
        reservation.type,
        reservation.number,
        reservation.reservationId
      );
    }
  });
}

loadReservations();
