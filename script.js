// allows you to execute a function or a block of code after the page has fully loaded.
// This ensures that the code inside the function will run only after the entire page (including images, CSS, etc.) has fully loaded.

window.onload = function(){
  const day = document.getElementById("day");
  const month = document.getElementById("month");
  const year = document.getElementById("year");
  const labels = document.getElementsByTagName("label");
  const error = document.getElementsByClassName("error");
  const submitButton = document.getElementById("submit");
  const spans = document.getElementsByTagName("span");

//   The Date object in JavaScript is used to work with dates and times. When new Date() is called, it creates a new Date object that contains the current date and time based on the user's system settings.
  const date = new Date();

//   The getDate() method of the Date object returns the day of the month (from 1 to 31) for the specified date according to local time.
  let currentDay = date.getDate();

//   The getMonth() method of the Date object returns the month (from 0 to 11) for the specified date according to local time. Note that in JavaScript, months are zero-indexed: January is 0, February is 1, and so on, up to December, which is 11.
  let currentMonth = date.getMonth() + 1;

  //   The getFullYear() method of the Date object returns the currentyear in 4digits based on the users local time also 
  let currentYear = date.getFullYear();

// Log the current date to the console
// console.log(`Current Date: ${currentDay}/${currentMonth}/${currentYear}`);




  const typeOfError = [
      "",
      "This field is required",
      "Must be a valid day",
      "Must be a valid month",
      "Must be a valid year",
      "Must be a valid date"
  ];

  const errorState = (numberOfError, typeOfDate, typeOfError, color) => {
      error[numberOfError].innerHTML = typeOfError;
      labels[numberOfError].style.color = color;
      typeOfDate.style.borderColor = color;
  }

//   typeOfError is an array that holds different error messages. Each message corresponds to a specific type of validation error that might occur when the user inputs their date of birth.
//   The index of each message in the array is significant because it will be used to refer to specific error messages in the errorState function.

//   numberOfError (integer): The index of the error message in the typeOfError array. This determines which error message to display.
//   typeOfDate (HTMLElement): The input element that has the validation error (e.g., the day, month, or year input field).
//   typeOfError (string): The actual error message to be displayed. This should match one of the strings from the typeOfError array.
//   color (string): The color to be used for highlighting the error (typically a red color to indicate an error).




  const isLeapYear = (day, month, year) => {
      month = month - 1;
      // Create a new date with the provided day, month (adjusted for zero-indexing), and year
      fullDate = new Date(year,month,day);
      // Check if the date components match the provided values, indicating a valid date
      if (day == fullDate.getDate() && month == fullDate.getMonth() && year == fullDate.getFullYear())
        // alert("the Date you chose: isLeapYear")
        return  true;
      else
        return false
  }

  const substractAge = () => {
    //Math.abs() ensures that newYear is a positive number.
      let newYear = Math.abs(currentYear - year.value);

      let newMonth = 0;
      if(currentMonth >= month.value){
          newMonth = currentMonth - month.value;
      }
      else{
        // here we are subtracting the year because if your birhdat hasnt reached yet meaninf you havent completed a full year
          newYear--;
          newMonth = 12 + currentMonth - month.value;
      }

      let newDay = 0;
      if(currentDay >= day.value){
          newDay = currentDay - day.value;
      }
      else{
          newMonth--;
          if(isLeapYear(day.value, month.value, year.value)){
              newDay = 30 + currentDay - day.value;
          }
          else{
              newDay = currentDay - day.value;
          }

          if(newMonth < 0){
              newMonth = 11;
              newYear--;
          }
        //   here give example of 11th july 2005
          if(newMonth < currentMonth){
              newDay++;
          }
      }

      spans[0].innerHTML = newYear;
      spans[1].innerHTML = newMonth;
      spans[2].innerHTML = newDay;
  }



  const isDayCorrect = () => {
      if(day.value == ""){
          errorState(0, day, typeOfError[1], "#ff5757");
          return false;
      }
      else if(day.value <= 0 || day.value > 31){
          errorState(0, day, typeOfError[2], "#ff5757");
          return false;
      }
      else if(isLeapYear(day.value, month.value, year.value) == false){
          errorState(0, day, typeOfError[5] , "#ff5757");
          return false;
      }
      else{
          errorState(0, day, typeOfError[0], "");
          return true;
      }
  }

  const isMonthCorrect = () => {
      if(month.value == ""){
          errorState(1, month, typeOfError[1], "#ff5757");
          return false;
      }
      else if(month.value <= 0 || month.value > 12){
          errorState(1, month, typeOfError[3], "#ff5757");
          return false;
      }
      else if(isLeapYear(day.value, month.value, year.value) == false){
          errorState(1, month, typeOfError[0], "#ff5757");
          return false;
      }  
      else{
          errorState(1, month, typeOfError[0], "");
          return true;
      }
  }

  const isYearCorrect = () => {
      if(year.value == ""){
          errorState(2, year, typeOfError[1], "#ff5757");
          return false;
      }
      else if(year.value > currentYear){
          errorState(2, year, typeOfError[4], "#ff5757");
          return false;
      }
      else if(year.value == currentYear && month.value > currentMonth){
          errorState(1, month, typeOfError[3], "#ff5757");
          return false;
      }
      else if(year.value == currentYear && month.value == currentMonth && day.value > currentDay){
          errorState(0, day, typeOfError[2], "#ff5757");
          return false;
      }
      else if(isLeapYear(day.value, month.value, year.value) == false){
          errorState(2, year, typeOfError[0], "#ff5757");
          return false;
      }   
      else{
          errorState(2, year, typeOfError[0], "");
          return true;
      }
  }

  
  submitButton.addEventListener("click", () => {
      isDayCorrect();
      isMonthCorrect();
      isYearCorrect();
      if(isDayCorrect() && isMonthCorrect() && isYearCorrect()){
          substractAge();
      }
  })
}







// The Date object in JavaScript is a built-in object that enables you to work with dates and times.
//  When you call new Date(), it creates a new Date object containing the current date and time according to the system's clock.

//  This functionality is built into the JavaScript language and can be used in any environment that supports JavaScript, including web browsers, Node.js, and various code editors like VSCode.