/* =========================================================
   ARIZONA UPGRADER
   Fan-made project
========================================================= */


// =========================================================
// ДАННЫЕ
// =========================================================

const DATA = {

    cash: {

        name: "Наличка",
        icon: "₽",

        items: [

            {
                id: "cash500k",
                name: "500.000$",
                value: 500000,
                icon: "💵"
            },

            {
                id: "cash1m",
                name: "1.000.000$",
                value: 1000000,
                icon: "💵"
            },

            {
                id: "cash2m",
                name: "2.000.000$",
                value: 2000000,
                icon: "💵"
            },

            {
                id: "cash3m",
                name: "3.000.000$",
                value: 3000000,
                icon: "💵"
            },

            {
                id: "cash5m",
                name: "5.000.000$",
                value: 5000000,
                icon: "💰"
            },

            {
                id: "cash10m",
                name: "10.000.000$",
                value: 10000000,
                icon: "💰"
            },

            {
                id: "cash25m",
                name: "25.000.000$",
                value: 25000000,
                icon: "💰"
            },

            {
                id: "cash50m",
                name: "50.000.000$",
                value: 50000000,
                icon: "💰"
            }

        ]
    },


    vehicle: {

        name: "Машина",
        icon: "🚗",

        items: [

            {
                id: "m5",
                name: "BMW M5",
                value: 2500000,
                icon: "🚗"
            },

            {
                id: "e63",
                name: "Mercedes-Benz E63",
                value: 3500000,
                icon: "🚘"
            },

            {
                id: "supra",
                name: "Toyota Supra",
                value: 4500000,
                icon: "🏎️"
            },

            {
                id: "gtr",
                name: "Nissan GT-R",
                value: 5500000,
                icon: "🏎️"
            },

            {
                id: "x6",
                name: "BMW X6",
                value: 7000000,
                icon: "🚙"
            },

            {
                id: "g63",
                name: "Mercedes G63",
                value: 10000000,
                icon: "🚙"
            },

            {
                id: "lambo",
                name: "Lamborghini",
                value: 18000000,
                icon: "🏎️"
            },

            {
                id: "rolls",
                name: "Rolls-Royce",
                value: 30000000,
                icon: "🚘"
            }

        ]
    },


    property: {

        name: "Имущество",
        icon: "🏠",

        items: [

            {
                id: "garage",
                name: "Гараж",
                value: 1500000,
                icon: "🚗"
            },

            {
                id: "smallhouse",
                name: "Небольшой дом",
                value: 3500000,
                icon: "🏠"
            },

            {
                id: "house",
                name: "Дом",
                value: 7000000,
                icon: "🏡"
            },

            {
                id: "bigHouse",
                name: "Большой дом",
                value: 12000000,
                icon: "🏡"
            },

            {
                id: "business",
                name: "Бизнес",
                value: 20000000,
                icon: "🏢"
            },

            {
                id: "restaurant",
                name: "Ресторан",
                value: 35000000,
                icon: "🍽️"
            },

            {
                id: "club",
                name: "Ночной клуб",
                value: 50000000,
                icon: "🌃"
            },

            {
                id: "mansion",
                name: "Элитный особняк",
                value: 100000000,
                icon: "🏰"
            }

        ]
    },


    item: {

        name: "Предмет",
        icon: "🎁",

        items: [

            {
                id: "phone",
                name: "Телефон",
                value: 150000,
                icon: "📱"
            },

            {
                id: "watch",
                name: "Rolex",
                value: 500000,
                icon: "⌚"
            },

            {
                id: "weapon",
                name: "Редкий предмет",
                value: 1000000,
                icon: "🎁"
            },

            {
                id: "case",
                name: "Премиум кейс",
                value: 2500000,
                icon: "📦"
            },

            {
                id: "gold",
                name: "Золотой предмет",
                value: 5000000,
                icon: "🏆"
            },

            {
                id: "rare",
                name: "Очень редкий предмет",
                value: 10000000,
                icon: "💎"
            },

            {
                id: "legend",
                name: "Легендарный предмет",
                value: 25000000,
                icon: "👑"
            }

        ]
    }

};


// =========================================================
// СОСТОЯНИЕ
// =========================================================

let currentType = "cash";

let sourceItem = DATA.cash.items[1];

let targetItem = DATA.cash.items[2];

let attempts = 0;
let wins = 0;
let losses = 0;

let rolling = false;


// =========================================================
// DOM
// =========================================================

const typeButtons =
    document.querySelectorAll(".type");

const sourceName =
    document.getElementById("sourceName");

const sourcePrice =
    document.getElementById("sourcePrice");

const sourceIcon =
    document.getElementById("sourceIcon");

const targetName =
    document.getElementById("targetName");

const targetPrice =
    document.getElementById("targetPrice");

const targetIcon =
    document.getElementById("targetIcon");

const sourceButton =
    document.getElementById("sourceButton");

const targetButton =
    document.getElementById("targetButton");

const chanceValue =
    document.getElementById("chanceValue");

const chanceFill =
    document.getElementById("chanceFill");

const upgradeButton =
    document.getElementById("upgradeButton");

const attemptsElement =
    document.getElementById("attempts");

const winsElement =
    document.getElementById("wins");

const lossesElement =
    document.getElementById("losses");

const winrateElement =
    document.getElementById("winrate");


const selectionModal =
    document.getElementById("selectionModal");

const modalList =
    document.getElementById("modalList");

const modalTitle =
    document.getElementById("modalTitle");

const modalSubtitle =
    document.getElementById("modalSubtitle");

const modalNumber =
    document.getElementById("modalNumber");

const modalClose =
    document.getElementById("modalClose");


const rollScreen =
    document.getElementById("rollScreen");

const rollTrack =
    document.getElementById("rollTrack");

const loadingFill =
    document.getElementById("loadingFill");

const loadingText =
    document.getElementById("loadingText");


const resultScreen =
    document.getElementById("resultScreen");

const resultStatus =
    document.getElementById("resultStatus");

const resultIcon =
    document.getElementById("resultIcon");

const resultTitle =
    document.getElementById("resultTitle");

const resultName =
    document.getElementById("resultName");

const resultPrice =
    document.getElementById("resultPrice");

const resultButton =
    document.getElementById("resultButton");


// =========================================================
// ФОРМАТИРОВАНИЕ
// =========================================================

function formatMoney(value) {

    return new Intl.NumberFormat("ru-RU")
        .format(value) + "$";

}


// =========================================================
// ШАНС
// =========================================================

function calculateChance() {

    if (!sourceItem || !targetItem) {
        return 0;
    }


    const ratio =
        sourceItem.value /
        targetItem.value;


    let chance =
        ratio * 75;


    // Если приз дешевле ставки
    if (targetItem.value <= sourceItem.value) {

        chance = 95;

    }


    chance =
        Math.max(
            2,
            Math.min(
                95,
                chance
            )
        );


    return chance;

}


// =========================================================
// ОБНОВЛЕНИЕ ШАНСА
// =========================================================

function updateChance() {

    const chance =
        calculateChance();


    chanceValue.textContent =
        chance.toFixed(1) + "%";


    chanceFill.style.width =
        chance + "%";


    if (chance >= 70) {

        chanceFill.style.background =
            "linear-gradient(90deg,#2b8d52,#39d98a)";

        chanceValue.style.color =
            "#39d98a";

    }

    else if (chance >= 30) {

        chanceFill.style.background =
            "linear-gradient(90deg,#a83f00,#ff7a00)";

        chanceValue.style.color =
            "#ff9d32";

    }

    else {

        chanceFill.style.background =
            "linear-gradient(90deg,#9b1710,#e53b2e)";

        chanceValue.style.color =
            "#ff5a4d";

    }

}


// =========================================================
// ОБНОВЛЕНИЕ КАРТОЧЕК
// =========================================================

function updateCards() {

    sourceName.textContent =
        sourceItem.name;

    sourcePrice.textContent =
        formatMoney(sourceItem.value);

    sourceIcon.textContent =
        sourceItem.icon;


    targetName.textContent =
        targetItem.name;

    targetPrice.textContent =
        formatMoney(targetItem.value);

    targetIcon.textContent =
        targetItem.icon;


    updateChance();

}


// =========================================================
// СМЕНА КАТЕГОРИИ
// =========================================================

typeButtons.forEach(button => {

    button.addEventListener("click", () => {

        if (rolling) return;


        typeButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        button.classList.add("active");


        currentType =
            button.dataset.type;


        const items =
            DATA[currentType].items;


        sourceItem =
            items[0];


        targetItem =
            items[
                Math.min(
                    1,
                    items.length - 1
                )
            ];


        updateCards();

    });

});


// =========================================================
// ОТКРЫТЬ ВЫБОР
// =========================================================

function openSelection(mode) {

    if (rolling) return;


    selectionModal.classList.remove("hidden");


    if (mode === "source") {

        modalNumber.textContent =
            "02";

        modalTitle.textContent =
            "ВЫБЕРИТЕ СТАВКУ";

        modalSubtitle.textContent =
            "Выберите предмет, который готовы поставить";

    }

    else {

        modalNumber.textContent =
            "03";

        modalTitle.textContent =
            "ВЫБЕРИТЕ ПРИЗ";

        modalSubtitle.textContent =
            "Выберите желаемый предмет";

    }


    modalList.innerHTML = "";


    const items =
        DATA[currentType].items;


    items.forEach(item => {

        const element =
            document.createElement("div");


        element.className =
            "modal-item";


        element.innerHTML = `

            <div class="modal-item-icon">
                ${item.icon}
            </div>

            <div class="modal-item-info">

                <div class="modal-item-name">
                    ${item.name}
                </div>

                <div class="modal-item-price">
                    ${formatMoney(item.value)}
                </div>

            </div>

        `;


        element.addEventListener(
            "click",
            () => {

                if (mode === "source") {

                    sourceItem = item;

                }

                else {

                    targetItem = item;

                }


                updateCards();

                closeSelection();

            }
        );


        modalList.appendChild(element);

    });

}


// =========================================================
// ЗАКРЫТЬ МОДАЛКУ
// =========================================================

function closeSelection() {

    selectionModal.classList.add("hidden");

}


sourceButton.addEventListener(
    "click",
    () => openSelection("source")
);


targetButton.addEventListener(
    "click",
    () => openSelection("target")
);


modalClose.addEventListener(
    "click",
    closeSelection
);


document
    .querySelector(".modal-overlay")
    .addEventListener(
        "click",
        closeSelection
    );


// =========================================================
// СОЗДАНИЕ ЛИСТЬЕВ
// =========================================================

function createLeaves() {

    const container =
        document.getElementById("leaves");


    for (
        let i = 0;
        i < 28;
        i++
    ) {

        const leaf =
            document.createElement("div");


        leaf.className =
            "leaf";


        leaf.style.left =
            Math.random() * 100 + "%";


        leaf.style.animationDuration =
            7 + Math.random() * 10 + "s";


        leaf.style.animationDelay =
            Math.random() * 10 + "s";


        leaf.style.opacity =
            0.2 + Math.random() * 0.5;


        leaf.style.transform =
            `rotate(${Math.random() * 360}deg)`;


        const size =
            7 + Math.random() * 10;


        leaf.style.width =
            size + "px";


        leaf.style.height =
            size * 1.5 + "px";


        container.appendChild(leaf);

    }

}

createLeaves();


// =========================================================
// ЗАПУСК UPGRADE
// =========================================================

upgradeButton.addEventListener(
    "click",
    startUpgrade
);


function startUpgrade() {

    if (rolling) return;


    if (!sourceItem || !targetItem) {
        return;
    }


    rolling = true;


    attempts++;


    updateStats();


    rollScreen.classList.remove(
        "hidden"
    );


    resultScreen.classList.add(
        "hidden"
    );


    buildRoll();


    setTimeout(
        performRoll,
        300
    );

}


// =========================================================
// СОЗДАНИЕ ЛЕНТЫ
// =========================================================

function buildRoll() {

    rollTrack.innerHTML = "";


    const items =
        DATA[currentType].items;


    const allItems = [];


    // Делаем много карточек
    for (
        let i = 0;
        i < 45;
        i++
    ) {

        const random =
            items[
                Math.floor(
                    Math.random() *
                    items.length
                )
            ];


        allItems.push(random);

    }


    // Последняя часть будет содержать
    // потенциальный результат
    for (
        let i = 0;
        i < 12;
        i++
    ) {

        allItems.push(
            targetItem
        );

    }


    allItems.forEach(item => {

        const card =
            document.createElement("div");


        card.className =
            "roll-card";


        card.innerHTML = `

            <div class="roll-card-icon">
                ${item.icon}
            </div>

            <div class="roll-card-name">
                ${item.name}
            </div>

        `;


        rollTrack.appendChild(card);

    });


    rollTrack.style.transition =
        "none";

    rollTrack.style.transform =
        "translateX(0)";


    loadingFill.style.width =
        "0%";


    loadingText.textContent =
        "ПОДГОТОВКА...";

}


// =========================================================
// ПРОКРУТКА
// =========================================================

function performRoll() {

    const chance =
        calculateChance();


    const won =
        Math.random() * 100 <
        chance;


    const cards =
        rollTrack.querySelectorAll(
            ".roll-card"
        );


    if (!cards.length) {
        finishRoll(won);
        return;
    }


    /*
        Центрируем примерно 43-ю карточку.
        При победе она будет targetItem.
    */

    const targetIndex =
        42;


    const card =
        cards[targetIndex];


    const cardWidth =
        145 + 12;


    const machineWidth =
        document.querySelector(
            ".roll-machine"
        ).offsetWidth;


    let finalIndex =
        targetIndex;


    if (!won) {

        // При проигрыше выбираем
        // другую карточку
        finalIndex =
            Math.max(
                10,
                targetIndex - 2
            );

    }


    const selectedCard =
        cards[finalIndex];


    if (!won) {

        const randomItem =
            DATA[currentType].items
                .filter(
                    item =>
                        item.id !==
                        targetItem.id
                );


        if (randomItem.length) {

            const random =
                randomItem[
                    Math.floor(
                        Math.random() *
                        randomItem.length
                    )
                ];


            selectedCard
                .querySelector(
                    ".roll-card-icon"
                )
                .textContent =
                random.icon;


            selectedCard
                .querySelector(
                    ".roll-card-name"
                )
                .textContent =
                random.name;

        }

    }


    const cardCenter =
        finalIndex *
        cardWidth +
        72.5;


    const move =
        (machineWidth / 2) -
        cardCenter;


    rollTrack.style.transition =
        "transform 4.2s cubic-bezier(0.08, 0.72, 0.08, 1)";


    rollTrack.style.transform =
        `translateX(${move}px)`;


    animateLoading();


    setTimeout(
        () => finishRoll(won),
        4500
    );

}


// =========================================================
// LOADING
// =========================================================

function animateLoading() {

    let progress = 0;


    const interval =
        setInterval(() => {

            progress += 2.5;


            if (progress > 100) {
                progress = 100;
            }


            loadingFill.style.width =
                progress + "%";


            loadingText.textContent =
                progress < 100
                    ? "ПРОКРУТКА..."
                    : "РЕЗУЛЬТАТ ГОТОВ";


            if (progress >= 100) {

                clearInterval(interval);

            }

        }, 100);

}


// =========================================================
// ЗАВЕРШЕНИЕ
// =========================================================

function finishRoll(won) {

    rolling = false;


    if (won) {

        wins++;

    }

    else {

        losses++;

    }


    updateStats();


    setTimeout(() => {

        rollScreen.classList.add(
            "hidden"
        );


        showResult(won);

    }, 400);

}


// =========================================================
// РЕЗУЛЬТАТ
// =========================================================

function showResult(won) {

    resultScreen.classList.remove(
        "hidden"
    );


    if (won) {

        resultStatus.textContent =
            "ПОБЕДА";


        resultStatus.style.color =
            "#39d98a";


        resultIcon.textContent =
            "🏆";


        resultTitle.textContent =
            "ВЫ ВЫИГРАЛИ!";


        resultName.textContent =
            targetItem.name;


        resultPrice.textContent =
            formatMoney(
                targetItem.value
            );

    }

    else {

        resultStatus.textContent =
            "ПОРАЖЕНИЕ";


        resultStatus.style.color =
            "#ff5548";


        resultIcon.textContent =
            "💀";


        resultTitle.textContent =
            "НЕ ПОВЕЗЛО";


        resultName.textContent =
            "Ставка потеряна";


        resultPrice.textContent =
            formatMoney(
                sourceItem.value
            );

    }

}


// =========================================================
// КНОПКА РЕЗУЛЬТАТА
// =========================================================

resultButton.addEventListener(
    "click",
    () => {

        resultScreen.classList.add(
            "hidden"
        );

    }
);


// =========================================================
// СТАТИСТИКА
// =========================================================

function updateStats() {

    attemptsElement.textContent =
        attempts;


    winsElement.textContent =
        wins;


    lossesElement.textContent =
        losses;


    const winrate =
        attempts > 0
            ? (wins / attempts) * 100
            : 0;


    winrateElement.textContent =
        winrate.toFixed(0) + "%";

}


// =========================================================
// ESC — ЗАКРЫТЬ
// =========================================================

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            !rolling
        ) {

            closeSelection();

            resultScreen.classList.add(
                "hidden"
            );

        }

    }
);


// =========================================================
// ПЕРВЫЙ ЗАПУСК
// =========================================================

updateCards();
updateStats();
