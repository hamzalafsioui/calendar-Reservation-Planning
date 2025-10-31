# Calendar Reservation Planning
---

#  Le Gourmet – Reservation Planner

##  Description

**Le Gourmet** is a simple web application for managing restaurant reservations.
It allows users to **view, add, edit, and delete reservations** using a clean and modern calendar interface.
All data is saved in the **browser’s localStorage**, so reservations stay even after reloading the page.

---

##  Technologies Used

* **HTML5** – Page structure
* **CSS3** – Styling and responsive layout
* **JavaScript (ES6)** – Logic, DOM manipulation, and localStorage

---

##  Features

✅ Interactive weekly calendar (Monday → Friday)
✅ Add new reservations with name, number of people, and time
✅ Edit or delete existing reservations
✅ Data saved locally (no backend needed)
✅ Responsive design for all screen sizes

---


##  Project Structure

```
Le-Gourmet/
│
├── index.html          # Main HTML file
├── style.css           # CSS styling
├── script.js           # Main JavaScript logic
├── generateCalendar.js # Function to create calendar days
└── images/
    └── calendar.png    # App icon
```

---

##  Key Functions (Example)

```js
// Generate calendar days
export function generateCalendarDays(totalDays = 30) {
  calendarBody.innerHTML = "";
  for (let i = 1; i <= totalDays; i++) {
    const dayDiv = document.createElement("div");
    dayDiv.classList.add("day");
    dayDiv.classList.add(i % 7 === 6 || i % 7 === 0 ? "inactive" : "active");
    const span = document.createElement("span");
    span.textContent = i;
    dayDiv.appendChild(span);
    calendarBody.appendChild(dayDiv);
  }
}
```

---

##  Data Storage

All reservations are saved in the **browser’s localStorage** as JSON.
This means your data stays available even if you refresh or close the browser.

---

##  Future Improvements

* Add a real database (Firebase, MySQL)
* Add authentication for multiple users
* Improve design with Bootstrap or TailwindCSS
* Add monthly calendar view

---
