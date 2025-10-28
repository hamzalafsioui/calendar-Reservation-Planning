const calendarBody = document.getElementById("calendar-body");

export function generateCalendarDays(totalDays = 30) {
  calendarBody.innerHTML = "";

  for (let i = 1; i <= totalDays; i++) {
    const dayDiv = document.createElement("div");
    dayDiv.classList.add("day");

    // check for weekEnd
    const dayOfWeek = (i % 7) || 7;

    if (dayOfWeek === 6 || dayOfWeek === 7) {
      dayDiv.classList.add("inactive");
    } else {
      dayDiv.classList.add("active");
    }

    const span = document.createElement("span");
    span.textContent = i;
    dayDiv.appendChild(span);

    calendarBody.appendChild(dayDiv);
  }
}
