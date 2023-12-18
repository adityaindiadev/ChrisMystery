var quiz = {
    data: [
        {
            // q: "What is your Car No ?",
            q: "xxxxxx",
            o: [
                "50 meters",
                "70 meters",
                "100 meters",
                "120 meters"],

            a: 1
        },
        {
            // q: "How many members are in Team ProH2R ?",
            q: "yyyyy",
            o: [
                "22",
                "24",
                "32",
                "36"],

            a: 2
        },

        {
            // q: "What is the meaning of nile ?",
            q: "zzzz",
            o: [
                "400 pounds",
                "550 pounds",
                "700 pounds",
                "750 pounds"],

            a: 3
        },

    ],

    hWrap: null, // HTML quiz container
    hQn: null, // HTML question wrapper
    hAns: null, // HTML answers wrapper

    now: 0, // current question
    score: 0, // current score

    init: () => {
        quiz.hWrap = document.getElementById("quizWrap");

        quiz.hQn = document.createElement("div");
        quiz.hQn.id = "quizQn";
        quiz.hWrap.appendChild(quiz.hQn);

        quiz.hAns = document.createElement("div");
        quiz.hAns.id = "quizAns";
        quiz.hWrap.appendChild(quiz.hAns);

        quiz.draw();
    },

    draw: () => {
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
                quiz.hQn.innerHTML = `You have answered ${quiz.score} of ${quiz.data.length} correctly.`; quiz.hAns.innerHTML = "";
            }
        }, 500);
    }, reset: () => {
        quiz.now = 0;
        quiz.score = 0;
        quiz.draw();
    }
};

window.addEventListener("load", quiz.init);