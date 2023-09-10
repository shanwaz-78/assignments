const questions = JSON.parse(localStorage.getItem("questions"));
console.log(questions);
const question_field = document.getElementById("questionField");
const next_btn = document.getElementById("next");
const remaining_question = document.getElementById("remainQuestion");
const button_wrapper = document.getElementById("buttonWrapper");
const buttons = document.querySelectorAll("button");
const previous_btn = document.getElementById("previous");
const skip_button = document.getElementById("skip");

let current_question_index = 0;

// Show first question
question_field.innerText = questions[current_question_index].Q;

// Set remaining question count
remaining_question.innerText = `${current_question_index + 1} / ${
  questions.length
}`;

// Change question & remaining question count
next_btn.addEventListener("click", (event) => {
  event.preventDefault();
  current_question_index++;
  question_field.innerText = `${questions[current_question_index].Q}`;
  remaining_question.innerText = `${current_question_index + 1} / ${
    questions.length
  }`;

  switch (current_question_index) {
    case 3:
      generate_ratings();
      // remove dynamic initial color
      buttons.forEach((btn) => (btn.style.backgroundColor = ""));
      break;
    case 4:
      remove_stars();
      break;
    default:
      //remove color of ratings from next question
      buttons.forEach((btn) => (btn.style.backgroundColor = ""));
      break;
  }
  if (current_question_index >= 1) {
    skip_button.style.visibility = "visible";
  }
});

function handle_star_click(event, btn) {
  event.preventDefault();
  const index = Array.from(buttons).indexOf(btn);
  buttons.forEach((btn, i) => {
    if (i <= index) {
      btn.style.backgroundColor = "green";
      btn.removeEventListener("click", (event) =>
        handle_star_click(event, btn)
      );
    } else {
      btn.style.backgroundColor = "";
    }
  });
}

// Change the color of rating
buttons.forEach((btn) =>
  btn.addEventListener("click", (event) => handle_star_click(event, btn))
);

function generate_ratings() {
  for (let i = 1; i <= 5; i++) {
    const newBtn = document.createElement("button");
    newBtn.innerHTML = '<span class="fa fa-star"></span>';
    button_wrapper.appendChild(newBtn);
    newBtn.addEventListener("click", (event) =>
      handle_star_click(event, newBtn)
    );
  }
}

function add_textarea() {
  const textarea = document.createElement("textarea");
  textarea.setAttribute("placeholder", "Please share your thoughts...");
  textarea.classList.add("textarea");
  button_wrapper.appendChild(textarea);
}

function skip_ques() {
  current_question_index++;
  question_field.innerText = questions[current_question_index].Q;
  remaining_question.innerText = `${current_question_index + 1} / ${questions.length}`;
}

function remove_stars() {
  button_wrapper.innerHTML = "";
  add_textarea();
}

skip_button.onclick = () => skip_ques();

next_btn.addEventListener("click", (event) => {
  event.preventDefault();
  if (current_question_index >= 1) {
    previous_btn.style.visibility = "visible";
  }
});

previous_btn.addEventListener("click", (event) => {
  event.preventDefault();
  if (current_question_index >= 1) {
    current_question_index--;
    question_field.innerText = questions[current_question_index].Q;
    remaining_question.innerText = `${current_question_index + 1} / ${
      questions.length
    }`;
  } else if (remaining_question.innerText <= 1) {
    previous_btn.style.visibility = "hidden";
  }
});
