// ===============================
// ARIZONA UPGRADER
// HALLOWEEN EDITION 2026
// ===============================

const betInput = document.getElementById("bet");
const chanceElement = document.getElementById("chance");
const upgradeButton = document.getElementById("upgrade");

const typeButtons = document.querySelectorAll(".type");


// ===============================
// НАСТРОЙКИ
// ===============================

let currentType = "currency";

let targetPrice = 15000000;


// ===============================
// ТИП СТАВКИ
// ===============================

typeButtons.forEach((button, index) => {

    button.addEventListener("click", () => {

        typeButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        if (index === 0) {
            currentType = "currency";
        }

        if (index === 1) {
            currentType = "cash";
        }

        if (index === 2) {
            currentType = "vehicle";
        }

        if (index === 3) {
            currentType = "item";
        }

        updateChance();

    });

});


// ===============================
// РАСЧЁТ ШАНСА
// ===============================

function updateChance() {

    let bet = Number(betInput.value);

    if (!bet || bet <= 0) {
        chanceElement.textContent = "0%";
        return;
    }

    let chance = (bet / targetPrice) * 100;

    // Ограничиваем максимальный шанс
    if (chance > 95) {
        chance = 95;
    }

    chanceElement.textContent = chance.toFixed(2) + "%";

}


// ===============================
// ИЗМЕНЕНИЕ СУММЫ
// ===============================

betInput.addEventListener("input", () => {

    updateChance();

});


// ===============================
// АПГРЕЙД
// ===============================

upgradeButton.addEventListener("click", () => {

    let bet = Number(betInput.value);

    if (!bet || bet <= 0) {

        alert("Введите сумму ставки!");

        return;
    }

    let chance = (bet / targetPrice) * 100;

    if (chance > 95) {
        chance = 95;
    }


    // Блокируем кнопку
    upgradeButton.disabled = true;

    upgradeButton.innerHTML = `
        <span>🎃</span>
        ROLL...
    `;


    // Анимация
    let originalTransform = upgradeButton.style.transform;

    upgradeButton.style.animation =
        "upgradeSpin 0.7s infinite";


    setTimeout(() => {

        upgradeButton.style.animation = "";

        let random = Math.random() * 100;

        if (random <= chance) {

            showWin();

        } else {

            showLose();

        }

        upgradeButton.disabled = false;

    }, 2200);

});


// ===============================
// ПОБЕДА
// ===============================

function showWin() {

    upgradeButton.innerHTML = `
        <span>🔥</span>
        WIN!
    `;

    upgradeButton.style.background =
        "radial-gradient(circle at 35% 25%, #ffd36a, #ff6a00 45%, #7a2700)";

    document.body.style.animation =
        "screenFlash 0.6s";


    setTimeout(() => {

        upgradeButton.innerHTML = `
            <span>🎃</span>
            АПГРЕЙД
        `;

        document.body.style.animation = "";

        upgradeButton.style.background = "";

    }, 2500);

}


// ===============================
// ПРОИГРЫШ
// ===============================

function showLose() {

    upgradeButton.innerHTML = `
        <span>💀</span>
        LOSE
    `;

    upgradeButton.style.background =
        "radial-gradient(circle at 35% 25%, #555, #211d24 45%, #0b0a0e)";


    setTimeout(() => {

        upgradeButton.innerHTML = `
            <span>🎃</span>
            АПГРЕЙД
        `;

        upgradeButton.style.background = "";

    }, 2500);

}


// ===============================
// CSS-АНИМАЦИИ
// ===============================

const animationStyle = document.createElement("style");

animationStyle.innerHTML = `

@keyframes upgradeSpin {

    0% {
        transform: rotate(0deg) scale(1);
    }

    25% {
        transform: rotate(-8deg) scale(1.04);
    }

    50% {
        transform: rotate(8deg) scale(1.08);
    }

    75% {
        transform: rotate(-5deg) scale(1.04);
    }

    100% {
        transform: rotate(0deg) scale(1);
    }

}

@keyframes screenFlash {

    0% {
        filter: brightness(1);
    }

    30% {
        filter: brightness(1.8);
    }

    100% {
        filter: brightness(1);
    }

}

`;

document.head.appendChild(animationStyle);


// ===============================
// ЗАПУСК
// ===============================

updateChance();
