const inputElements = document.querySelectorAll('.course-score');
const outputElements = document.querySelectorAll('.grade-output');
const warningIndicator = document.querySelector('.warning');
const warningOutput = document.querySelector('.warning-output');


function getGradePoint(score){
    if(score >= 70 && score <= 100){
        return 5;
    }else if (score >= 60 && score <= 69){
        return  4;
    }else if(score >= 50 && score <= 59){
        return 3;
    }else if(score >= 45 && score <= 49){
        return 2;
    }else if (score >= 40 && score <= 44){
        return 1;
    }else if (score >= 0 && score <= 39){
        return 0;
    }
}

function getGradeLetter(score){
       if(score >= 70 && score <= 100){
        return "A";
    }else if (score >= 60 && score <= 69){
        return  "B";
    }else if(score >= 50 && score <= 59){
        return "C";
    }else if(score >= 45 && score <= 49){
        return "D";
    }else if (score >= 40 && score <= 44){
        return "E";
    }else if (score >= 0 && score <= 39){
        return "F";
    }
}

function calculateGrade(){
    let hasError = false;

 for (let i = 0; i < inputElements.length; i++){
    if (inputElements[i].value === ""){
        outputElements[i].innerText = "_";
    } else {
         const score = Number(inputElements[i].value);

        if (score < 0 || score > 100){
            warningOutput.innerText = `Row ${i + 1}: Score must be between 0 and 100`;
            hasError = true;
        }else{
            const gradePoint = getGradePoint(score);
            const gradeLetter = getGradeLetter(score);

            outputElements[i].innerText = `${gradeLetter} · ${gradePoint}`;
        }
    }
 }

    warningIndicator.hidden = !hasError;
}