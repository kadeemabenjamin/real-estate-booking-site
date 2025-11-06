// ---------- Request / Zelle modal ----------
const dialog = document.getElementById("requestDialog");
const serviceInput = document.getElementById("service");
const closeBtn = document.querySelector(".close-btn");
const cancelBtn = document.getElementById("cancelBtn");
const form = document.getElementById("requestForm");
const yearEl = document.getElementById("year");

document.querySelectorAll("[data-open-modal]").forEach((btn) => {
  btn.addEventListener("click", () => {
    serviceInput.value = btn.getAttribute("data-service") || "";
    dialog.showModal();
  });
});

closeBtn.addEventListener("click", () => dialog.close());
cancelBtn.addEventListener("click", () => dialog.close());

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  if (!data.name || !data.phone || !data.email) {
    alert("Please fill out all required fields before sending.");
    return;
  }
  const recipient = "ka.realestatephoto@gmail.com";
  const subject = encodeURIComponent(
    "Booking request: " + (data.service || "Real estate photography")
  );
  const body = encodeURIComponent(
    `Service: ${data.service}
Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email}

Address and preferred date:
${data.details}

Payment preference: Zelle or invoice via Square.`
  );
  window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  dialog.close();
  form.reset();
});

yearEl.textContent = new Date().getFullYear();

// ---------- Square calendar popup (lazy-load on open) ----------
const calendarDialog = document.getElementById("calendarDialog");
const openCalendarBtn = document.getElementById("openCalendar");
const closeCalendarBtn = document.querySelector(".calendar-close");
const calendarContainer = document.getElementById("calendarContainer");
const calendarFallback = document.getElementById("calendarFallback");

let calendarLoaded = false;

function loadSquareWidgetOnce() {
  if (calendarLoaded) return;

  // Create the script that embeds the widget (Square-supported way)
  const s = document.createElement("script");
  s.src =
    "https://square.site/appointments/buyer/widget/e504xsdocu8ral/LNS4EAK6R1NKM.js";
  s.async = true;

  s.onload = () => {
    calendarLoaded = true;
  };
  s.onerror = () => {
    // If something blocks the embed, show a direct link fallback
    calendarFallback.style.display = "block";
  };

  // Append the script right inside the container so the iframe renders there
  calendarContainer.appendChild(s);
}

openCalendarBtn.addEventListener("click", () => {
  calendarDialog.showModal();
  loadSquareWidgetOnce();
});

closeCalendarBtn.addEventListener("click", () => calendarDialog.close());

// just the footer year now
document.getElementById("year").textContent = new Date().getFullYear();
