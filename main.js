let btn = document.getElementById("btn");
let btnAgain = document.getElementById("btnAgain");
let areaQes = document.querySelector(".container .question");
let areaAns = document.querySelector(".container .answers");
let areaRes = document.querySelector("#res span");
let current = 0;
let score = 0;
let rightAns;

fetch("test.json")
  .then((response) => response.json())
  .then((data) => {
    createData(data[current], data.length);
    rightAns = data[current].correct_answer;
    btn.onclick = function () {
      current++;
      if (current < data.length) {
        areaAns.innerHTML = "";
        areaQes.innerHTML = "";
        createData(data[current], data.length);
        rightAns = data[current].correct_answer;
        check(rightAns);
      } else {
        btn.remove();
        areaQes.remove();
        areaAns.remove();
        btnAgain.style.display = "block";
        areaRes.textContent = `Your Score is ${score} From ${data.length}`;
      }
    };

    check(rightAns);
  });

function createData(data, num) {
  if (current < num) {
    let q = document.createElement("h3");
    q.textContent = `${data.question}`;
    areaQes.appendChild(q);
    let ul = document.createElement("ul");
    for (let i = 0; i < num; i++) {
      let ans = document.createElement("li");
      ans.id = `answer`;
      ans.textContent = `${data.options[i]}`;
      ans.dataset.answer = `${data.options[i]}`;
      areaAns.appendChild(ul);
      ul.appendChild(ans);
    }
  }
}

function check(rightAns) {
  let allLis = document.querySelectorAll("li");
  for (let i = 0; i < allLis.length; i++) {
    allLis[i].addEventListener("click", function () {
      if (rightAns == this.dataset.answer) {
        this.classList.add("true");
        score++;
      } else {
        this.classList.add("false");
        for (let j = 0; j < allLis.length; j++) {
          if (rightAns == allLis[j].dataset.answer) {
            allLis[j].classList.add("true");
          }
          allLis[j].style.cursor = "no-drop";
        }
      }
    });
  }
}

btnAgain.onclick = function () {
  window.location.reload();
};
