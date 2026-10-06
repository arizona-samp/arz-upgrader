/* =========================================================
   ARIZONA UPGRADER
========================================================= */


/* =========================================================
   ПРЕДМЕТЫ
========================================================= */

const ITEMS = {

    vehicle: [

        {
            id: "m5",
            name: "BMW M5",
            value: 2500000,
            icon: "🚗",
            type: "vehicle"
        },

        {
            id: "e63",
            name: "Mercedes-Benz E63",
            value: 3500000,
            icon: "🚘",
            type: "vehicle"
        },

        {
            id: "supra",
            name: "Toyota Supra",
            value: 4500000,
            icon: "🏎️",
            type: "vehicle"
        },

        {
            id: "gtr",
            name: "Nissan GT-R",
            value: 5500000,
            icon: "🏎️",
            type: "vehicle"
        },

        {
            id: "x6",
            name: "BMW X6",
            value: 7000000,
            icon: "🚙",
            type: "vehicle"
        },

        {
            id: "g63",
            name: "Mercedes G63",
            value: 10000000,
            icon: "🚙",
            type: "vehicle"
        },

        {
            id: "lamborghini",
            name: "Lamborghini",
            value: 18000000,
            icon: "🏎️",
            type: "vehicle"
        },

        {
            id: "rolls",
            name: "Rolls-Royce",
            value: 30000000,
            icon: "🚘",
            type: "vehicle"
        }

    ],


    property: [

        {
            id: "garage",
            name: "Гараж",
            value: 1500000,
            icon: "🚗",
            type: "property"
        },

        {
            id: "house",
            name: "Дом",
            value: 3500000,
            icon: "🏠",
            type: "property"
        },

        {
            id: "big-house",
            name: "Большой дом",
            value: 7000000,
            icon: "🏡",
            type: "property"
        },

        {
            id: "business",
            name: "Бизнес",
            value: 20000000,
            icon: "🏢",
            type: "property"
        },

        {
            id: "restaurant",
            name: "Ресторан",
            value: 35000000,
            icon: "🍽️",
            type: "property"
        },

        {
            id: "night-club",
            name: "Ночной клуб",
            value: 50000000,
            icon: "🌃",
            type: "property"
        },

        {
            id: "mansion",
            name: "Элитный особняк",
            value: 100000000,
            icon: "🏰",
            type: "property"
        }

    ],


    item: [

        {
            id: "phone",
            name: "Телефон",
            value: 150000,
            icon: "📱",
            type: "item"
        },

        {
            id: "rolex",
            name: "Rolex",
            value: 500000,
            icon: "⌚",
            type: "item"
        },

        {
            id: "premium-case",
            name: "Премиум кейс",
            value: 2500000,
            icon: "📦",
            type: "item"
        },

        {
            id: "gold-item",
            name: "Золотой предмет",
            value: 5000000,
            icon: "🏆",
            type: "item"
        },

        {
            id: "rare-item",
            name: "Очень редкий предмет",
            value: 10000000,
            icon: "💎",
            type: "item"
        },

        {
            id: "legendary-item",
            name: "Легендарный предмет",
            value: 25000000,
            icon: "👑",
            type: "item"
        }

    ]

};


/* =========================================================
   СОСТОЯНИЕ
========================================================= */

let currentType = "virtual";

let virtualAmount = 1000000;

let sourceItem = {
    id: "virtual-source",
    name: "Виртуальная валюта",
    value: 1000000,
    icon: "💎",
    type: "virtual"
};

let targetItem = {
    id: "virtual-target",
    name: "Виртуальная валюта",
    value: 1960000,
    icon: "💎",
    type: "virtual"
};

let attempts = 0;
let wins = 0;
let losses = 0;

let rolling = false;


/* =========================================================
   DOM
========================================================= */

const typeButtons =
    document.querySelectorAll(".type");

const chanceButtons =
    document.querySelectorAll(".chance-btn");


const sourceCard =
    document.getElementById("sourceCard");

const targetCard =
    document.getElementById("targetCard");


const sourceIcon =
    document.getElementById("sourceIcon");

const sourceName =
    document.getElementById("sourceName");

const sourcePrice =
    document.getElementById("sourcePrice");


const targetIcon =
    document.getElementById("targetIcon");

const targetName =
    document.getElementById("targetName");

const targetPrice =
    document.getElementById("targetPrice");


const changeSource =
    document.getElementById("changeSource");

const changeTarget =
    document.getElementById("changeTarget");


const virtualBox =
    document.getElementById("virtualBox");

const virtualAmountInput =
    document.getElementById("virtualAmount");


const multiplierElement =
    document.getElementById("multiplier");

const chanceElement =
    document.getElementById("chance");


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


const onlineCount =
    document.getElementById("onlineCount");


const modal =
    document.getElementById("modal");

const modalOverlay =
    document.getElementById("modalOverlay");

const modalItems =
    document.getElementById("modalItems");

const modalTitle =
    document.getElementById("modalTitle");

const closeModal =
    document.getElementById("closeModal");


const result =
    document.getElementById("result");

const resultIcon =
    document.getElementById("resultIcon");

const resultTitle =
    document.getElementById("resultTitle");

const resultText =
    document.getElementById("resultText");

const closeResult =
    document.getElementById("closeResult");


/* =========================================================
   ФОРМАТ ДЕНЕГ
========================================================= */

function formatMoney(value) {

    return "$" +
        new Intl.NumberFormat("ru-RU").format(
            Math.floor(value)
        );

}


/* =========================================================
   МНОЖИТЕЛЬ
========================================================= */

function getMultiplier() {

    if (
        !sourceItem ||
        !targetItem ||
        sourceItem.value <= 0
    ) {

        return 1;

    }

    return targetItem.value / sourceItem.value;

}


/* =========================================================
   ШАНС
========================================================= */

/*
    2% комиссия сайта.

    Формула:

    ШАНС = 98 / МНОЖИТЕЛЬ

    Поэтому:

    x1.96 = 50%
    x3.266 = 30%
    x6.533 = 15%
    x19.6 = 5%
*/

function getChance() {

    const multiplier =
        getMultiplier();

    if (multiplier <= 0) {
        return 0;
    }

    let resultChance =
        98 / multiplier;

    resultChance =
        Math.max(
            0,
            Math.min(
                98,
                resultChance
            )
        );

    return resultChance;

}


/* =========================================================
   ОБНОВЛЕНИЕ ИНФОРМАЦИИ
========================================================= */

function updateUpgradeInfo() {

    const multiplier =
        getMultiplier();

    const chance =
        getChance();


    multiplierElement.textContent =
        "x" + multiplier.toFixed(2);


    chanceElement.textContent =
        "Шанс " + chance.toFixed(1) + "%";

}


/* =========================================================
   ОБНОВЛЕНИЕ КАРТОЧЕК
========================================================= */

function updateCards() {

    sourceIcon.textContent =
        sourceItem.icon;

    sourceName.textContent =
        sourceItem.name;

    sourcePrice.textContent =
        formatMoney(sourceItem.value);


    targetIcon.textContent =
        targetItem.icon;

    targetName.textContent =
        targetItem.name;

    targetPrice.textContent =
        formatMoney(targetItem.value);


    updateUpgradeInfo();

}


/* =========================================================
   АКТИВНАЯ КАТЕГОРИЯ
========================================================= */

typeButtons.forEach(button => {

    button.addEventListener("click", () => {

        if (rolling) {
            return;
        }


        typeButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        button.classList.add("active");


        currentType =
            button.dataset.type;


        if (currentType === "virtual") {

            virtualBox.classList.remove("hidden");


            sourceItem = {

                id: "virtual-source",

                name: "Виртуальная валюта",

                value: virtualAmount,

                icon: "💎",

                type: "virtual"

            };


            virtualAmountInput.value =
                virtualAmount;


            updateCards();

            return;

        }


        virtualBox.classList.add("hidden");


        const items =
            ITEMS[currentType];


        if (items && items.length > 0) {

            sourceItem =
                items[0];

            updateCards();

        }

    });

});


/* =========================================================
   ИЗМЕНЕНИЕ СУММЫ ВИРТУАЛЬНОЙ ВАЛЮТЫ
========================================================= */

virtualAmountInput.addEventListener(
    "input",
    () => {

        if (currentType !== "virtual") {
            return;
        }


        const value =
            Number(
                virtualAmountInput.value
            );


        if (
            !Number.isFinite(value) ||
            value <= 0
        ) {
            return;
        }


        virtualAmount =
            Math.floor(value);


        sourceItem = {

            id: "virtual-source",

            name: "Виртуальная валюта",

            value: virtualAmount,

            icon: "💎",

            type: "virtual"

        };


        updateCards();

    }
);


/* =========================================================
   КНОПКИ ШАНСА
========================================================= */

chanceButtons.forEach(button => {

    button.addEventListener("click", () => {

        if (rolling) {
            return;
        }


        chanceButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        button.classList.add("active");


        const selectedChance =
            Number(
                button.dataset.chance
            );


        /*
            Автоматически вычисляем
            нужный множитель.

            multiplier = 98 / chance
        */

        const wantedMultiplier =
            98 / selectedChance;


        /*
            И автоматически ставим
            соответствующую цель.
        */

        const wantedValue =
            Math.floor(
                sourceItem.value *
                wantedMultiplier
            );


        targetItem = {

            id: "virtual-target",

            name: "Виртуальная валюта",

            value: wantedValue,

            icon: "💎",

            type: "virtual"

        };


        updateCards();

    });

});


/* =========================================================
   МОДАЛЬНОЕ ОКНО
========================================================= */

function openModal(title) {

    modalTitle.textContent =
        title;

    modalItems.innerHTML = "";

    modal.classList.remove(
        "hidden"
    );

}


function closeModalWindow() {

    modal.classList.add(
        "hidden"
    );

}


/* =========================================================
   СОЗДАНИЕ КАРТОЧКИ В МОДАЛКЕ
========================================================= */

function createModalItem(item, callback) {

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
        callback
    );


    modalItems.appendChild(
        element
    );

}


/* =========================================================
   ВЫБОР СТАВКИ
========================================================= */

function openSourceSelection() {

    if (rolling) {
        return;
    }


    openModal("Выберите ставку");


    /*
        Если виртуальная валюта
    */

    if (currentType === "virtual") {

        const wrapper =
            document.createElement("div");


        wrapper.style.padding =
            "10px";


        wrapper.innerHTML = `

            <div style="
                color:#777c87;
                font-size:9px;
                font-weight:900;
                margin-bottom:8px;
            ">
                СУММА ВИРТУАЛЬНОЙ ВАЛЮТЫ
            </div>

            <input
                id="modalVirtualAmount"
                type="number"
                min="1"
                value="${virtualAmount}"
                style="
                    width:100%;
                    height:43px;
                    padding:0 12px;
                    box-sizing:border-box;
                    background:#0e1016;
                    color:#fff;
                    border:1px solid rgba(255,255,255,.08);
                    border-radius:9px;
                    outline:none;
                    font-size:13px;
                "
            >

            <button
                id="applyVirtualAmount"
                type="button"
                style="
                    width:100%;
                    height:40px;
                    margin-top:8px;
                    border:0;
                    border-radius:9px;
                    background:#e95118;
                    color:#fff;
                    font-size:10px;
                    font-weight:900;
                    cursor:pointer;
                "
            >
                ПРИМЕНИТЬ
            </button>

        `;


        modalItems.appendChild(
            wrapper
        );


        document
            .getElementById(
                "applyVirtualAmount"
            )
            .addEventListener(
                "click",
                () => {

                    const input =
                        document.getElementById(
                            "modalVirtualAmount"
                        );


                    const amount =
                        Number(input.value);


                    if (
                        !Number.isFinite(amount) ||
                        amount <= 0
                    ) {
                        return;
                    }


                    virtualAmount =
                        Math.floor(amount);


                    virtualAmountInput.value =
                        virtualAmount;


                    sourceItem = {

                        id: "virtual-source",

                        name: "Виртуальная валюта",

                        value: virtualAmount,

                        icon: "💎",

                        type: "virtual"

                    };


                    updateCards();

                    closeModalWindow();

                }
            );


        return;
    }


    /*
        Машина / имущество / предмет
    */

    const items =
        ITEMS[currentType] || [];


    items.forEach(item => {

        createModalItem(
            item,
            () => {

                sourceItem =
                    item;


                updateCards();

                closeModalWindow();

            }
        );

    });

}


/* =========================================================
   ВЫБОР ЦЕЛИ
========================================================= */

function openTargetSelection() {

    if (rolling) {
        return;
    }


    openModal("Выберите цель");


    /*
        Виртуальная валюта
    */

    const virtualWrapper =
        document.createElement("div");


    virtualWrapper.style.padding =
        "10px";


    virtualWrapper.innerHTML = `

        <div style="
            color:#777c87;
            font-size:9px;
            font-weight:900;
            margin-bottom:8px;
        ">
            ВИРТУАЛЬНАЯ ВАЛЮТА
        </div>

        <div style="
            display:flex;
            gap:8px;
        ">

            <input
                id="modalTargetAmount"
                type="number"
                min="1"
                value="${Math.floor(
                    sourceItem.value *
                    getMultiplier()
                )}"
                style="
                    flex:1;
                    min-width:0;
                    height:43px;
                    padding:0 12px;
                    box-sizing:border-box;
                    background:#0e1016;
                    color:#fff;
                    border:1px solid rgba(255,255,255,.08);
                    border-radius:9px;
                    outline:none;
                    font-size:13px;
                "
            >

            <button
                id="applyTargetAmount"
                type="button"
                style="
                    width:95px;
                    border:0;
                    border-radius:9px;
                    background:#e95118;
                    color:#fff;
                    font-size:9px;
                    font-weight:900;
                    cursor:pointer;
                "
            >
                ВЫБРАТЬ
            </button>

        </div>

    `;


    modalItems.appendChild(
        virtualWrapper
    );


    document
        .getElementById(
            "applyTargetAmount"
        )
        .addEventListener(
            "click",
            () => {

                const input =
                    document.getElementById(
                        "modalTargetAmount"
                    );


                const amount =
                    Number(input.value);


                if (
                    !Number.isFinite(amount) ||
                    amount <= 0
                ) {
                    return;
                }


                targetItem = {

                    id: "virtual-target",

                    name: "Виртуальная валюта",

                    value: Math.floor(amount),

                    icon: "💎",

                    type: "virtual"

                };


                /*
                    После ручного выбора
                    пересчитываем настоящий шанс.
                */

                updateCards();

                closeModalWindow();

            }
        );


    /*
        Добавляем все предметы,
        машины и имущество.

        Поэтому можно:

        машина → бизнес
        бизнес → Rolex
        Rolex → виртуальная валюта
        виртуальная валюта → машина

        и т.д.
    */

    const allItems = [

        ...ITEMS.vehicle,

        ...ITEMS.property,

        ...ITEMS.item

    ];


    allItems.forEach(item => {

        createModalItem(
            item,
            () => {

                targetItem =
                    item;


                /*
                    При ручном выборе
                    активная кнопка процента
                    больше не должна обманывать.

                    Считаем настоящий шанс
                    от стоимости цели.
                */

                chanceButtons.forEach(btn => {

                    btn.classList.remove(
                        "active"
                    );

                });


                updateCards();

                closeModalWindow();

            }
        );

    });

}


/* =========================================================
   КНОПКИ ИЗМЕНИТЬ
========================================================= */

changeSource.addEventListener(
    "click",
    openSourceSelection
);


changeTarget.addEventListener(
    "click",
    openTargetSelection
);


/*
    Можно нажимать и прямо
    на карточку.
*/

sourceCard.addEventListener(
    "click",
    openSourceSelection
);


targetCard.addEventListener(
    "click",
    openTargetSelection
);


/* =========================================================
   ЗАКРЫТИЕ МОДАЛКИ
========================================================= */

closeModal.addEventListener(
    "click",
    closeModalWindow
);


modalOverlay.addEventListener(
    "click",
    closeModalWindow
);


/* =========================================================
   ONLINE
========================================================= */

function updateOnline() {

    const value =
        Math.floor(
            100 +
            Math.random() * 431
        );


    onlineCount.textContent =
        value;


    const nextTime =
        8000 +
        Math.random() * 2000;


    setTimeout(
        updateOnline,
        nextTime
    );

}


updateOnline();


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
            ? (wins / attempts) * 100
            : 0;


    winrateElement.textContent =
        winrate.toFixed(0) + "%";

}


/* =========================================================
   НАЖАТИЕ «УЛУЧШИТЬ»
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
        !targetItem ||
        sourceItem.value <= 0 ||
        targetItem.value <= 0
    ) {
        return;
    }


    /*
        Нельзя улучшать предмет
        на точно такой же предмет.
    */

    if (
        sourceItem.type !== "virtual" &&
        targetItem.type !== "virtual" &&
        sourceItem.id === targetItem.id
    ) {
        return;
    }


    rolling = true;


    upgradeButton.disabled =
        true;


    attempts++;


    updateStats();


    const currentChance =
        getChance();


    setTimeout(() => {

        const random =
            Math.random() * 100;


        const won =
            random < currentChance;


        if (won) {

            wins++;

        } else {

            losses++;

        }


        updateStats();


        showResult(
            won,
            currentChance
        );


        rolling = false;


        upgradeButton.disabled =
            false;

    }, 650);

}


/* =========================================================
   РЕЗУЛЬТАТ
========================================================= */

function showResult(
    won,
    currentChance
) {

    result.classList.remove(
        "hidden"
    );


    if (won) {

        resultIcon.textContent =
            "🎃";


        resultTitle.textContent =
            "ВЫИГРЫШ";


        resultText.textContent =
            "Вы получили " +
            targetItem.name +
            " — " +
            formatMoney(
                targetItem.value
            );

    } else {

        resultIcon.textContent =
            "💀";


        resultTitle.textContent =
            "ПРОИГРЫШ";


        resultText.textContent =
            "Ставка потеряна. Шанс был " +
            currentChance.toFixed(1) +
            "%";

    }

}


/* =========================================================
   ПРОДОЛЖИТЬ
========================================================= */

closeResult.addEventListener(
    "click",
    () => {

        result.classList.add(
            "hidden"
        );

    }
);


/* =========================================================
   ESC
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            if (!rolling) {

                closeModalWindow();

                result.classList.add(
                    "hidden"
                );

            }

        }

    }
);


/* =========================================================
   ПЕРВОНАЧАЛЬНЫЙ ЗАПУСК
========================================================= */

virtualAmountInput.value =
    virtualAmount;


updateCards();

updateStats();
