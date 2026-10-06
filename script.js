/* =========================================================
   ARIZONA UPGRADER
========================================================= */


/* =========================================================
   ДАННЫЕ
========================================================= */

const ITEMS = {

    cash: [
        {
            id: "cash500",
            type: "cash",
            name: "500.000$",
            value: 500000,
            icon: "💵"
        },

        {
            id: "cash1m",
            type: "cash",
            name: "1.000.000$",
            value: 1000000,
            icon: "💵"
        },

        {
            id: "cash2m",
            type: "cash",
            name: "2.000.000$",
            value: 2000000,
            icon: "💵"
        },

        {
            id: "cash5m",
            type: "cash",
            name: "5.000.000$",
            value: 5000000,
            icon: "💰"
        },

        {
            id: "cash10m",
            type: "cash",
            name: "10.000.000$",
            value: 10000000,
            icon: "💰"
        },

        {
            id: "cash25m",
            type: "cash",
            name: "25.000.000$",
            value: 25000000,
            icon: "💰"
        },

        {
            id: "cash50m",
            type: "cash",
            name: "50.000.000$",
            value: 50000000,
            icon: "💰"
        }
    ],


    vehicle: [

        {
            id: "m5",
            type: "vehicle",
            name: "BMW M5",
            value: 2500000,
            icon: "🚗"
        },

        {
            id: "e63",
            type: "vehicle",
            name: "Mercedes-Benz E63",
            value: 3500000,
            icon: "🚘"
        },

        {
            id: "supra",
            type: "vehicle",
            name: "Toyota Supra",
            value: 4500000,
            icon: "🏎️"
        },

        {
            id: "gtr",
            type: "vehicle",
            name: "Nissan GT-R",
            value: 5500000,
            icon: "🏎️"
        },

        {
            id: "x6",
            type: "vehicle",
            name: "BMW X6",
            value: 7000000,
            icon: "🚙"
        },

        {
            id: "g63",
            type: "vehicle",
            name: "Mercedes G63",
            value: 10000000,
            icon: "🚙"
        },

        {
            id: "lambo",
            type: "vehicle",
            name: "Lamborghini",
            value: 18000000,
            icon: "🏎️"
        },

        {
            id: "rolls",
            type: "vehicle",
            name: "Rolls-Royce",
            value: 30000000,
            icon: "🚘"
        }

    ],


    property: [

        {
            id: "garage",
            type: "property",
            name: "Гараж",
            value: 1500000,
            icon: "🚗"
        },

        {
            id: "house",
            type: "property",
            name: "Дом",
            value: 3500000,
            icon: "🏠"
        },

        {
            id: "bigHouse",
            type: "property",
            name: "Большой дом",
            value: 7000000,
            icon: "🏡"
        },

        {
            id: "business",
            type: "property",
            name: "Бизнес",
            value: 20000000,
            icon: "🏢"
        },

        {
            id: "restaurant",
            type: "property",
            name: "Ресторан",
            value: 35000000,
            icon: "🍽️"
        },

        {
            id: "club",
            type: "property",
            name: "Ночной клуб",
            value: 50000000,
            icon: "🌃"
        },

        {
            id: "mansion",
            type: "property",
            name: "Элитный особняк",
            value: 100000000,
            icon: "🏰"
        }

    ],


    item: [

        {
            id: "phone",
            type: "item",
            name: "Телефон",
            value: 150000,
            icon: "📱"
        },

        {
            id: "watch",
            type: "item",
            name: "Rolex",
            value: 500000,
            icon: "⌚"
        },

        {
            id: "case",
            type: "item",
            name: "Премиум кейс",
            value: 2500000,
            icon: "📦"
        },

        {
            id: "gold",
            type: "item",
            name: "Золотой предмет",
            value: 5000000,
            icon: "🏆"
        },

        {
            id: "rare",
            type: "item",
            name: "Очень редкий предмет",
            value: 10000000,
            icon: "💎"
        },

        {
            id: "legend",
            type: "item",
            name: "Легендарный предмет",
            value: 25000000,
            icon: "👑"
        }

    ]

};


/* =========================================================
   СОСТОЯНИЕ
========================================================= */

let currentType = "cash";

let sourceItem = {
    id: "cash1m",
    type: "cash",
    name: "1.000.000$",
    value: 1000000,
    icon: "💵"
};

let targetItem = {
    id: "cash196",
    type: "cash",
    name: "1.960.000$",
    value: 1960000,
    icon: "💰"
};

let virtualAmount = 1000000;

let attempts = 0;
let wins = 0;
let losses = 0;

let rolling = false;


/* =========================================================
   DOM
========================================================= */

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

const multiplierText =
    document.getElementById("multiplierText");

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

const onlineCount =
    document.getElementById("onlineCount");


/* =========================================================
   ФОРМАТИРОВАНИЕ
========================================================= */

function formatMoney(value) {

    return new Intl.NumberFormat("ru-RU")
        .format(Math.round(value)) + "$";

}


/* =========================================================
   ПОЛУЧИТЬ ЦЕНУ
========================================================= */

function getItemValue(item) {

    if (!item) {
        return 0;
    }

    return Number(item.value) || 0;

}


/* =========================================================
   МНОЖИТЕЛЬ
========================================================= */

function calculateMultiplier() {

    const source =
        getItemValue(sourceItem);

    const target =
        getItemValue(targetItem);


    if (source <= 0) {
        return 1;
    }


    return target / source;

}


/* =========================================================
   ШАНС
=========================================================

   Главная логика:

   x1.00 = 98%
   x1.50 = 65.33%
   x1.96 = 50%
   x2.00 = 49%
   x3.00 = 32.67%
   x5.00 = 19.6%

   То есть используется house edge 2%.

========================================================= */

function calculateChance() {

    const multiplier =
        calculateMultiplier();


    if (multiplier <= 1) {

        return 98;

    }


    let chance =
        98 / multiplier;


    chance =
        Math.max(
            1,
            Math.min(
                98,
                chance
            )
        );


    return chance;

}


/* =========================================================
   ОБНОВЛЕНИЕ ШАНСА
========================================================= */

function updateChance() {

    const multiplier =
        calculateMultiplier();

    const chance =
        calculateChance();


    chanceValue.textContent =
        chance.toFixed(1) + "%";


    chanceFill.style.width =
        chance + "%";


    multiplierText.textContent =
        "МНОЖИТЕЛЬ x" +
        multiplier.toFixed(2);


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


/* =========================================================
   ОБНОВЛЕНИЕ КАРТОЧЕК
========================================================= */

function updateCards() {

    sourceName.textContent =
        sourceItem.name;

    sourcePrice.textContent =
        formatMoney(
            sourceItem.value
        );

    sourceIcon.textContent =
        sourceItem.icon;


    targetName.textContent =
        targetItem.name;

    targetPrice.textContent =
        formatMoney(
            targetItem.value
        );

    targetIcon.textContent =
        targetItem.icon;


    updateChance();

}


/* =========================================================
   ВИРТУАЛЬНАЯ ВАЛЮТА
========================================================= */

function openVirtualInput() {

    const value =
        prompt(
            "Введите сумму виртуальной валюты:",
            virtualAmount
        );


    if (value === null) {
        return;
    }


    const amount =
        Number(
            value
                .replace(/\s/g, "")
                .replace(/,/g, "")
        );


    if (
        !Number.isFinite(amount) ||
        amount <= 0
    ) {

        alert(
            "Введите корректную сумму."
        );

        return;

    }


    virtualAmount =
        Math.floor(amount);


    sourceItem = {

        id: "virtualCustom",

        type: "virtual",

        name:
            new Intl.NumberFormat(
                "ru-RU"
            ).format(virtualAmount),

        value:
            virtualAmount,

        icon: "✦"

    };


    updateCards();

}


/* =========================================================
   СМЕНА КАТЕГОРИИ
========================================================= */

typeButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            if (rolling) {
                return;
            }


            typeButtons.forEach(btn => {

                btn.classList.remove(
                    "active"
                );

            });


            button.classList.add(
                "active"
            );


            currentType =
                button.dataset.type;


            if (
                currentType ===
                "virtual"
            ) {

                openVirtualInput();

                return;

            }


            const items =
                ITEMS[currentType];


            sourceItem =
                items[0];


            /*
                После смены типа ставки
                приз НЕ ограничивается
                этой категорией.

                Например:

                Наличка → Бизнес
                Машина → Дом
                Предмет → Наличка

            */


            updateCards();

        }
    );

});


/* =========================================================
   ОТКРЫТЬ ВЫБОР СТАВКИ
========================================================= */

function openSourceSelection() {

    if (rolling) {
        return;
    }


    if (
        currentType ===
        "virtual"
    ) {

        openVirtualInput();

        return;

    }


    selectionModal.classList.remove(
        "hidden"
    );


    modalNumber.textContent =
        "02";

    modalTitle.textContent =
        "ВЫБЕРИТЕ СТАВКУ";

    modalSubtitle.textContent =
        "Выберите предмет, который готовы поставить";


    modalList.innerHTML = "";


    const items =
        ITEMS[currentType];


    items.forEach(item => {

        createModalItem(
            item,
            () => {

                sourceItem =
                    item;

                updateCards();

                closeSelection();

            }
        );

    });

}


/* =========================================================
   ОТКРЫТЬ ВЫБОР ПРИЗА
========================================================= */

function openTargetSelection() {

    if (rolling) {
        return;
    }


    selectionModal.classList.remove(
        "hidden"
    );


    modalNumber.textContent =
        "03";

    modalTitle.textContent =
        "ВЫБЕРИТЕ ПРИЗ";

    modalSubtitle.textContent =
        "Можно выбрать любой предмет или сумму";


    modalList.innerHTML = "";


    /*
        ВАЖНО:

        Здесь объединяем ВСЕ категории.

        Поэтому можно:

        Наличка → Бизнес
        Наличка → BMW
        BMW → Дом
        Дом → Предмет
        Предмет → Наличка
    */


    const allItems = [

        ...ITEMS.cash,

        ...ITEMS.vehicle,

        ...ITEMS.property,

        ...ITEMS.item

    ];


    /*
        Добавляем виртуальную валюту
        как отдельную возможность
    */

    createModalItem(
        {
            id: "virtual1m",
            type: "virtual",
            name: "1.000.000 виртуальной валюты",
            value: 1000000,
            icon: "✦"
        },

        () => {

            targetItem = {

                id: "virtualTarget",

                type: "virtual",

                name:
                    "1.000.000",

                value:
                    1000000,

                icon:
                    "✦"

            };


            updateCards();

            closeSelection();

        }
    );


    allItems.forEach(item => {

        createModalItem(
            item,
            () => {

                targetItem =
                    item;

                updateCards();

                closeSelection();

            }
        );

    });

}


/* =========================================================
   СОЗДАНИЕ ЭЛЕМЕНТА МОДАЛКИ
========================================================= */

function createModalItem(
    item,
    callback
) {

    const element =
        document.createElement(
            "div"
        );


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
        callback
    );


    modalList.appendChild(
        element
    );

}


/* =========================================================
   КНОПКИ ВЫБОРА
========================================================= */

sourceButton.addEventListener(
    "click",
    openSourceSelection
);


targetButton.addEventListener(
    "click",
    openTargetSelection
);


/* =========================================================
   МОДАЛКА
========================================================= */

function closeSelection() {

    selectionModal.classList.add(
        "hidden"
    );

}


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


/* =========================================================
   ONLINE
========================================================= */

function updateOnline() {

    const number =
        Math.floor(
            100 +
            Math.random() * 431
        );


    onlineCount.textContent =
        number;


    const nextUpdate =
        8000 +
        Math.random() * 2000;


    setTimeout(
        updateOnline,
        nextUpdate
    );

}


updateOnline();


/* =========================================================
   ЛИСТЬЯ
========================================================= */

function createLeaves() {

    const container =
        document.getElementById(
            "leaves"
        );


    for (
        let i = 0;
        i < 28;
        i++
    ) {

        const leaf =
            document.createElement(
                "div"
            );


        leaf.className =
            "leaf";


        leaf.style.left =
            Math.random() * 100 +
            "%";


        leaf.style.animationDuration =
            7 +
            Math.random() * 10 +
            "s";


        leaf.style.animationDelay =
            Math.random() * 10 +
            "s";


        leaf.style.opacity =
            0.2 +
            Math.random() * 0.5;


        const size =
            7 +
            Math.random() * 10;


        leaf.style.width =
            size + "px";


        leaf.style.height =
            size * 1.5 +
            "px";


        container.appendChild(
            leaf
        );

    }

}


createLeaves();


/* =========================================================
   ЗАПУСК
========================================================= */

upgradeButton.addEventListener(
    "click",
    startUpgrade
);


function startUpgrade() {

    if (rolling) {
        return;
    }


    if (
        !sourceItem ||
        !targetItem
    ) {

        return;

    }


    if (
        sourceItem.value <= 0 ||
        targetItem.value <= 0
    ) {

        return;

    }


    /*
        Нельзя улучшить предмет
        до того же самого предмета
    */

    if (
        sourceItem.id ===
        targetItem.id &&
        sourceItem.type !==
        "virtual"
    ) {

        alert(
            "Выберите другой приз."
        );

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


/* =========================================================
   СОЗДАНИЕ ЛЕНТЫ
========================================================= */

function buildRoll() {

    rollTrack.innerHTML = "";


    const allItems = [

        ...ITEMS.cash,

        ...ITEMS.vehicle,

        ...ITEMS.property,

        ...ITEMS.item

    ];


    for (
        let i = 0;
        i < 65;
        i++
    ) {

        const random =
            allItems[
                Math.floor(
                    Math.random() *
                    allItems.length
                )
            ];


        const card =
            document.createElement(
                "div"
            );


        card.className =
            "roll-card";


        card.innerHTML = `

            <div class="roll-card-icon">
                ${random.icon}
            </div>

            <div class="roll-card-name">
                ${random.name}
            </div>

        `;


        rollTrack.appendChild(
            card
        );

    }


    rollTrack.style.transition =
        "none";


    rollTrack.style.transform =
        "translateX(0)";


    loadingFill.style.width =
        "0%";


    loadingText.textContent =
        "ПОДГОТОВКА...";

}


/* =========================================================
   ПРОКРУТКА
========================================================= */

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

        finishRoll(
            won
        );

        return;

    }


    /*
        Ставим результат ближе
        к концу прокрутки.
    */

    const targetIndex =
        50;


    const selectedCard =
        cards[targetIndex];


    /*
        Если выигрыш — показываем
        именно выбранный приз.

        Если проигрыш — случайный
        другой предмет.
    */

    if (won) {

        selectedCard
            .querySelector(
                ".roll-card-icon"
            )
            .textContent =
            "🎃";


        selectedCard
            .querySelector(
                ".roll-card-name"
            )
            .textContent =
            "ВЫИГРЫШ";

    }

    else {

        selectedCard
            .querySelector(
                ".roll-card-icon"
            )
            .textContent =
            "💀";


        selectedCard
            .querySelector(
                ".roll-card-name"
            )
            .textContent =
            "ПРОИГРЫШ";

    }


    const cardWidth =
        145 + 12;


    const machine =
        document.querySelector(
            ".roll-machine"
        );


    const machineWidth =
        machine.offsetWidth;


    const cardCenter =
        targetIndex *
        cardWidth +
        72.5;


    const move =
        machineWidth / 2 -
        cardCenter;


    rollTrack.style.transition =
        "transform 4.2s cubic-bezier(0.08,0.72,0.08,1)";


    rollTrack.style.transform =
        `translateX(${move}px)`;


    animateLoading();


    setTimeout(
        () => {

            finishRoll(
                won
            );

        },
        4500
    );

}


/* =========================================================
   ЗАГРУЗКА
========================================================= */

function animateLoading() {

    let progress = 0;


    const interval =
        setInterval(
            () => {

                progress += 2.5;


                if (
                    progress >
                    100
                ) {

                    progress = 100;

                }


                loadingFill.style.width =
                    progress + "%";


                loadingText.textContent =
                    progress < 100
                        ? "ПРОКРУТКА..."
                        : "РЕЗУЛЬТАТ ГОТОВ";


                if (
                    progress >=
                    100
                ) {

                    clearInterval(
                        interval
                    );

                }

            },
            100
        );

}


/* =========================================================
   ЗАВЕРШЕНИЕ
========================================================= */

function finishRoll(
    won
) {

    rolling = false;


    if (won) {

        wins++;

    }

    else {

        losses++;

    }


    updateStats();


    setTimeout(
        () => {

            rollScreen.classList.add(
                "hidden"
            );


            showResult(
                won
            );

        },
        400
    );

}


/* =========================================================
   РЕЗУЛЬТАТ
========================================================= */

function showResult(
    won
) {

    resultScreen.classList.remove(
        "hidden"
    );


    if (won) {

        /*
            🎃
            ВЫИГРЫШ
        */

        resultStatus.textContent =
            "ВЫИГРЫШ";


        resultStatus.style.color =
            "#ff9d32";


        resultIcon.textContent =
            "🎃";


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

        /*
            💀
            ПРОИГРЫШ
        */

        resultStatus.textContent =
            "ПРОИГРЫШ";


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


/* =========================================================
   КНОПКА РЕЗУЛЬТАТА
========================================================= */

resultButton.addEventListener(
    "click",
    () => {

        resultScreen.classList.add(
            "hidden"
        );

    }
);


/* =========================================================
   СТАТИСТИКА
========================================================= */

function updateStats() {

    attemptsElement.textContent =
        attempts;


    winsElement.textContent =
        wins;


    lossesElement.textContent =
        losses;


    const winrate =
        attempts > 0
            ? wins /
              attempts *
              100
            : 0;


    winrateElement.textContent =
        winrate.toFixed(0) +
        "%";

}


/* =========================================================
   ESC
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key ===
            "Escape"
        ) {

            if (!rolling) {

                closeSelection();

                resultScreen.classList.add(
                    "hidden"
                );

            }

        }

    }
);


/* =========================================================
   ПЕРВЫЙ ЗАПУСК
========================================================= */

updateCards();

updateStats();
