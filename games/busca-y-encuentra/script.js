  const grid = document.getElementById("grid");
        const scoreText = document.getElementById("score");
        const timeText = document.getElementById("time");
        const targetEmoji = document.getElementById("targetEmoji");
        const message = document.getElementById("message");

        let score = 0;
        let time = 60;
        let timer;
        let level = 1;

        const modes = [
            {
                target: "🍎",
                distractors: ["🍐", "🍓", "🍉", "🍊", "🍇"]
            },
            {
                target: "⭐",
                distractors: ["🌙", "☀️", "✨", "💫", "⚡"]
            },
            {
                target: "🐶",
                distractors: ["🐱", "🐭", "🐹", "🐰", "🦊"]
            },
            {
                target: "🔵",
                distractors: ["🔴", "🟢", "🟡", "🟣", "🟠"]
            }
        ];

        let currentMode = 0;
        let targetCount = 0;

        function randomItem(arr) {
            return arr[Math.floor(Math.random() * arr.length)];
        }

        function setLevel(lvl, el) {
            level = lvl;

            document.querySelectorAll(".level")
                .forEach(btn => btn.classList.remove("active"));

            el.classList.add("active");

            startGame();
        }

        function changeMode() {
            currentMode++;

            if (currentMode >= modes.length) {
                currentMode = 0;
            }

            startGame();
        }

        function startGame() {

            clearInterval(timer);

            score = 0;
            time = level === 1 ? 60 : level === 2 ? 45 : 30;

            updateUI();

            message.innerHTML = "";

            generateBoard();

            timer = setInterval(() => {

                time--;

                timeText.innerHTML = time;

                if (time <= 0) {
                    clearInterval(timer);

                    message.innerHTML = `
                🎉 Tiempo terminado. 
                Encontraste ${score} objetos.
            `;
                }

            }, 1000);
        }

        function generateBoard() {

            grid.innerHTML = "";

            const mode = modes[currentMode];

            targetEmoji.innerHTML = mode.target;

            let totalCells =
                level === 1 ? 40 :
                    level === 2 ? 56 :
                        72;

            targetCount =
                level === 1 ? 8 :
                    level === 2 ? 10 :
                        12;

            let cells = [];

            for (let i = 0; i < targetCount; i++) {
                cells.push(mode.target);
            }

            while (cells.length < totalCells) {
                cells.push(randomItem(mode.distractors));
            }

            cells.sort(() => Math.random() - 0.5);

            cells.forEach(item => {

                const div = document.createElement("div");

                div.className = "cell";

                div.innerHTML = item;

                div.onclick = () => selectCell(div, item);

                grid.appendChild(div);

            });
        }

        function selectCell(cell, item) {

            if (time <= 0) return;

            const mode = modes[currentMode];

            if (cell.classList.contains("found")) return;

            if (item === mode.target) {

                cell.classList.add("found");

                score++;

                updateUI();

                if (score >= targetCount) {

                    clearInterval(timer);

                    message.innerHTML = `
                🏆 ¡Excelente!
                Encontraste todos los objetos.
            `;
                }

            } else {

                cell.classList.add("wrong");

                setTimeout(() => {
                    cell.classList.remove("wrong");
                }, 300);
            }
        }

        function updateUI() {
            scoreText.innerHTML = score;
            timeText.innerHTML = time;
        }

        startGame();