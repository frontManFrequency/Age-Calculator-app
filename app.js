
//-----------------------------
let yearInput = document.getElementById("inputYear");
let monthInput = document.getElementById("inputMonth");
let dayInput = document.getElementById("inputDay");
//------------------------------------------------
const isoString = new Date().toISOString();
const [datePart, timePart] = isoString.split("T");
const [year, month, day] = datePart.split("-");
const currentYear = parseInt(year);
const currentMonth = parseInt(month);
const currentDay = parseInt(day);
const monthsWith31Days = new Set([1, 3, 5, 7, 8, 10, 12]);
function getDaysInMonth(y, m) {
  return new Date(y, m, 0).getDate();
}
let result = document.getElementById("age-is");
yearInput.max = year;
yearInput.min = year - 125;

yearInput.addEventListener("change", () => {
  const selectedYear = parseInt(yearInput.value);
  if (selectedYear === currentYear) {
    monthInput.max = month;
  } else {
    monthInput.max = 12;
  }
  monthInput.addEventListener("change", () => {
    const selectedMonth = parseInt(monthInput.value);
    if (selectedYear === currentYear && selectedMonth === currentMonth) {
      dayInput.max = day;
    } else if (monthsWith31Days.has(selectedMonth)) {
      dayInput.max = 31;
    } else {
      dayInput.max = 30;
    }
  });
});
function calculateAge() {
  const selectedYear = parseInt(yearInput.value);
  const selectedMonth = parseInt(monthInput.value);
  const selectedDay = parseInt(dayInput.value);
  //------------------------------
  /*let birthDay = new Date(dayInput.value);
  let birthMonth = new Date(monthInput.value);
  let birthYear = new Date(yearInput.value);*/

  let yearOutput, monthOutput, dayOutput;

  yearOutput = currentYear - selectedYear;
  if (currentMonth >= selectedMonth) {
    monthOutput = currentMonth - selectedMonth;
  } else {
    yearOutput--;
    monthOutput = 12 + currentMonth - selectedMonth;
  }
  if (currentDay >= selectedDay) {
    dayOutput = currentDay - selectedDay;
  } else {
    monthOutput--;
    dayOutput =
      getDaysInMonth(selectedYear, selectedMonth) + currentDay - selectedDay;
  }
  if (monthOutput < 0) {
    monthOutput = 11;
    yearOutput--;
  }
  if (selectedYear > currentYear) {
    result.innerHTML = "Please enter an appropriate date";
  } else if (selectedMonth > 12) {
    result.innerHTML = "Please enter an appropriate date";
  } else if (selectedDay > getDaysInMonth(selectedYear, selectedMonth)) {
    result.innerHTML = "Please enter an appropriate date";
  } else if (selectedYear === currentYear && selectedMonth > currentMonth) {
    result.innerHTML = "Please enter an appropriate date";
  } else if (
    selectedYear === currentYear &&
    selectedMonth === currentMonth &&
    selectedDay > currentDay
  ) {
    result.innerHTML = "Please enter an appropriate date";
  } else if (
    selectedDay === currentDay &&
    selectedMonth === currentMonth &&
    selectedYear === currentYear
  ) {
    result.innerHTML = "Congrats! You just born Today :)";
  } else {
    result.innerHTML =
      "You are " +
      yearOutput +
      " years and, " +
      monthOutput +
      " months and, " +
      dayOutput +
      " days old";
  }
}
