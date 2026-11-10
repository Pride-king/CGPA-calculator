const inputElements = document.querySelectorAll(".course-score");
const outputElements = document.querySelectorAll(".grade-output");
const unitElements = document.querySelectorAll(".course-units");
const warningIndicator = document.querySelector(".warning");
const warningOutput = document.querySelector(".warning-output");
const previousCGPAInput = document.querySelector("#previous-cgpa");
const previousUnitInput = document.querySelector("#previous-units");


function getGradePoint(score) {
  //
  if (score >= 70 && score <= 100) {
    return 5;
  } else if (score >= 60 && score <= 69) {
    return 4;
  } else if (score >= 50 && score <= 59) {
    return 3;
  } else if (score >= 45 && score <= 49) {
    return 2;
  } else if (score >= 40 && score <= 44) {
    return 1;
  } else if (score >= 0 && score <= 39) {
    return 0;
  }
}

function getGradeLetter(score) {
  // Determine the grade letter based on the score
  if (score >= 70 && score <= 100) {
    return "A";
  } else if (score >= 60 && score <= 69) {
    return "B";
  } else if (score >= 50 && score <= 59) {
    return "C";
  } else if (score >= 45 && score <= 49) {
    return "D";
  } else if (score >= 40 && score <= 44) {
    return "E";
  } else if (score >= 0 && score <= 39) {
    return "F";
  }
}

function calculateGPA(totalUnit, totalQualityPoint) {
  // Check if totalUnit is zero to avoid division by zero
  if (totalUnit === 0) {
    return null;
  } else {
    // Calculate GPA by dividing total quality points by total units
    const GPA = totalQualityPoint / totalUnit;
    return GPA;
  }
}
// Function to calculate CGPA based on previous CGPA, previous units, current quality points, and current units
function calculateCGPA(
  previousCGPA,
  previousUnit,
  currentQualityPoints,
  currentUnits,
) {
  if (previousCGPA === "" && previousUnit === "") {
    // Calculate CGPA using only current quality points and current units
    const CGPA = calculateGPA(currentUnits, currentQualityPoints);
    return CGPA;
  } else if (previousCGPA !== "" && previousUnit !== "") {
    let NumericPreviousCGPA = Number(previousCGPA);
    let NumericPreviousUnit = Number(previousUnit);
    const totalUnits = NumericPreviousUnit + currentUnits;
    const totalQualityPoints =
      NumericPreviousCGPA * NumericPreviousUnit + currentQualityPoints;
    const CGPA = calculateGPA(totalUnits, totalQualityPoints);
    return CGPA;
  }else {
    return null;
  }
}

function calculateGrade() {
  //Declare variables to track errors, total quality points, and total units

  let hasError = false;
  let totalQualityPoints = 0;
  let totalUnits = 0;

  // Loop through each input element to validate and calculate grades
  for (let i = 0; i < inputElements.length; i++) {
    if (inputElements[i].value === "") {
      outputElements[i].innerText = "_";
    } else {
      const score = Number(inputElements[i].value);
      const units = Number(unitElements[i].value);

      if (unitElements[i].value === "") {
        // Display warning message for empty units
        warningOutput.innerText = `Row ${i + 1}: Units cannot be empty`;
        hasError = true;
        //Range validation for score and units
      } else if (score < 0 || score > 100 || units < 1 || units > 6) {
        // Display warning message for invalid score or units
        warningOutput.innerText = `Row ${i + 1}: Score must be between 0 and 100, and units must be between 1 and 6`;
        hasError = true;
      } else {
        // Calculate grade point, grade letter, and quality points
        const gradePoint = getGradePoint(score);
        const gradeLetter = getGradeLetter(score);
        const qualityPoints = gradePoint * units;
        outputElements[i].innerText = `${gradeLetter} · ${gradePoint}`;
        totalQualityPoints += qualityPoints;
        totalUnits += units;
      }
    }
  }

    if(previousCGPAInput.value === "" && previousUnitInput.value !== "" || previousUnitInput.value === "" && previousCGPAInput.value !== ""){
        hasError = true;
      warningOutput.innerText = "Please fill in both Previous CGPA and Previous Units";
     }

 let semesterGPA = null ;
 let cumulativeCGPA = null ;
 let displayGPA = document.querySelectorAll('.stat-value')[0];
 let displayCGPA = document.querySelectorAll('.stat-value')[1];

 if(hasError === false){
   semesterGPA = calculateGPA(totalUnits, totalQualityPoints);
  cumulativeCGPA = calculateCGPA( previousCGPAInput.value,
previousUnitInput.value,
  totalQualityPoints,
  totalUnits);
 }
 

  warningIndicator.hidden = !hasError;
displayGPA.innerText = semesterGPA !== null ? semesterGPA.toFixed(2) : "N/A";
displayCGPA.innerText = cumulativeCGPA !== null ? cumulativeCGPA.toFixed(2) : "N/A";
}
