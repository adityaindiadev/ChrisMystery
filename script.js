const buttonReload = document.getElementById("buttonReload")
buttonReload.addEventListener("click", reload);
var quiz = {
    data: [

        {
            // q: "What is the meaning of `Nile` ?",
            q: "zzzz",
            o: [
                "River",
                "Place",
                "Ocean",
                "Sea"],

            a: 0
        },

        {
            // q: "What is your Car No (Number Plate) ?",
            q: "xxxxxx",
            o: [
                "DL 5AF 5845",
                "DL 5AF5845",
                "DL 2DF 5845",
                "DL 5CF 5845"],

            a: 3
        },
        {
            // q: "How many employees are in Team ProH2R ?",
            q: "yyyyy",
            o: [
                "15",
                "12",
                "17",
                "16"],

            a: 3
        },

        

    ],

    hWrap: null, // HTML quiz container
    hQn: null, // HTML question wrapper
    hint: null, // HTML question wrapper
    hAns: null, // HTML answers wrapper

    now: 0, // current question
    score: 0, // current score

    init: () => {
        quiz.hWrap = document.getElementById("quizWrap");

        quiz.hQn = document.createElement("div");
        quiz.hQn.id = "quizQn";
        quiz.hWrap.appendChild(quiz.hQn);

        //SS hint
        quiz.hint = document.createElement("div");
        quiz.hint.id = "lastHint";
        quiz.hWrap.appendChild(quiz.hint);
        quiz.hint.className = "buttonReloadHide";

        quiz.hAns = document.createElement("div");
        quiz.hAns.id = "quizAns";
        quiz.hWrap.appendChild(quiz.hAns);

        quiz.draw();
    },

    draw: () => {
        buttonReload.classList.add("buttonReloadHide")
        quiz.hQn.innerHTML = quiz.data[quiz.now].q;

        quiz.hAns.innerHTML = "";
        for (let i in quiz.data[quiz.now].o) {
            let radio = document.createElement("input");
            radio.type = "radio";
            radio.name = "quiz";
            radio.id = "quizo" + i;
            quiz.hAns.appendChild(radio);
            let label = document.createElement("label");
            label.innerHTML = quiz.data[quiz.now].o[i];
            label.setAttribute("for", "quizo" + i);
            label.dataset.idx = i;
            label.addEventListener("click", () => { quiz.select(label); });
            quiz.hAns.appendChild(label);
        }
    },

    select: option => {
        let all = quiz.hAns.getElementsByTagName("label");
        for (let label of all) {
            label.removeEventListener("click", quiz.select);
        }

        let correct = option.dataset.idx == quiz.data[quiz.now].a;
        if (correct) {
            quiz.score++;
            option.classList.add("correct");
        } else {
            option.classList.add("wrong");
        }

        quiz.now++;
        setTimeout(() => {
            if (quiz.now < quiz.data.length) { quiz.draw(); }
            else {
                // buttonReload.classList.remove("buttonReloadHide")
                quiz.hint.classList.remove("buttonReloadHide")
                quiz.hQn.innerHTML = `You have answered ${quiz.score} of ${quiz.data.length} correctly.`; quiz.hAns.innerHTML = "";
                quiz.hint.innerHTML = `🔔 In Your Office Find "PLEASE SHUT THE DOOR AFTER ENTRY/EXIT"`;
            }
        }, 500);
    }, reset: () => {
        quiz.now = 0;
        quiz.score = 0;
        quiz.draw();
    }
};

function reload() {
    console.log("dd");
    location.reload();
}

window.addEventListener("load", quiz.init);

