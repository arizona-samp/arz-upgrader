/* =========================================================
   ARIZONA UPGRADER — финальная версия
========================================================= */

const ITEMS = {
    vehicle: [
        {id:"m5",type:"vehicle",name:"BMW M5",value:2500000,icon:"🚗"},
        {id:"e63",type:"vehicle",name:"Mercedes-Benz E63",value:3500000,icon:"🚘"},
        {id:"supra",type:"vehicle",name:"Toyota Supra",value:4500000,icon:"🏎️"},
        {id:"gtr",type:"vehicle",name:"Nissan GT-R",value:5500000,icon:"🏎️"},
        {id:"x6",type:"vehicle",name:"BMW X6",value:7000000,icon:"🚙"},
        {id:"g63",type:"vehicle",name:"Mercedes G63",value:10000000,icon:"🚙"},
        {id:"lambo",type:"vehicle",name:"Lamborghini",value:18000000,icon:"🏎️"},
        {id:"rolls",type:"vehicle",name:"Rolls-Royce",value:30000000,icon:"🚘"}
    ],

    property: [
        {id:"garage",type:"property",name:"Гараж",value:1500000,icon:"🚗"},
        {id:"house",type:"property",name:"Дом",value:3500000,icon:"🏠"},
        {id:"bigHouse",type:"property",name:"Большой дом",value:7000000,icon:"🏡"},
        {id:"business",type:"property",name:"Бизнес",value:20000000,icon:"🏢"},
        {id:"restaurant",type:"property",name:"Ресторан",value:35000000,icon:"🍽️"},
        {id:"club",type:"property",name:"Ночной клуб",value:50000000,icon:"🌃"},
        {id:"mansion",type:"property",name:"Элитный особняк",value:100000000,icon:"🏰"}
    ],

    item: [
        {id:"phone",type:"item",name:"Телефон",value:150000,icon:"📱"},
        {id:"watch",type:"item",name:"Rolex",value:500000,icon:"⌚"},
        {id:"case",type:"item",name:"Премиум кейс",value:2500000,icon:"📦"},
        {id:"gold",type:"item",name:"Золотой предмет",value:5000000,icon:"🏆"},
        {id:"rare",type:"item",name:"Очень редкий предмет",value:10000000,icon:"💎"},
        {id:"legend",type:"item",name:"Легендарный предмет",value:25000000,icon:"👑"}
    ]
};

const ACCESSORIES = [
    {name:"Корона",value:2500000,icon:"👑"},
    {name:"Золотая цепь",value:1500000,icon:"📿"},
    {name:"Очки «Luxury»",value:750000,icon:"🕶️"},
    {name:"Маска Хэллоуин",value:500000,icon:"🎭"},
    {name:"Шляпа",value:300000,icon:"🎩"},
    {name:"Кепка",value:150000,icon:"🧢"},
    {name:"Рога",value:1000000,icon:"😈"},
    {name:"Крылья",value:3500000,icon:"🪽"},
    {name:"Аура",value:5000000,icon:"✨"},
    {name:"Мишка на плече",value:800000,icon:"🧸"},
    {name:"Золотой череп",value:2000000,icon:"💀"},
    {name:"Тыквенный аксессуар",value:900000,icon:"🎃"},
    {name:"Кот на плече",value:600000,icon:"🐱"},
    {name:"Неоновая маска",value:1800000,icon:"😎"},
    {name:"VIP корона",value:10000000,icon:"👑"}
];

/* Честный шанс: визуальный шанс = реальный шанс */
const REAL_CHANCE_FACTOR = 1.0;

/*
    Пул из 200 исходов.

    Например:
    50% = 100 побед + 100 проигрышей
    30% = 60 побед + 140 проигрышей
    75% = 150 побед + 50 проигрышей

    Пул перемешивается.
*/

const FAIR_POOL_SIZE = 200;
const fairPools = new Map();

let currentType = "virtual";
let virtualAmount = 1000000;

let sourceItem = {
    id:"virtualCustom",
    type:"virtual",
    name:"1 000 000",
    value:1000000,
    icon:"🎃"
};

let targetItem = {
    id:"virtualTarget",
    type:"virtual",
    name:"1 960 000",
    value:1960000,
    icon:"🎃"
};

let balance = 0;

let attempts = 0;
let wins = 0;
let losses = 0;

let rolling = false;
let selectedAccessory = null;
let toastTimer = null;


/* =========================================================
   DOM
========================================================= */

const $ = id =>
    document.getElementById(id);

const typeButtons =
    document.querySelectorAll(".type");

const chanceButtons =
    document.querySelectorAll(".chance-btn");

const virtualBox =
    $("virtualBox");

const virtualInput =
    $("virtualAmount");

const sourceButton =
    $("sourceButton");

const targetButton =
    $("targetButton");

const sourceName =
    $("sourceName");

const sourcePrice =
    $("sourcePrice");

const sourceIcon =
    $("sourceIcon");

const targetName =
    $("targetName");

const targetPrice =
    $("targetPrice");

const targetIcon =
    $("targetIcon");

const multiplierText =
    $("multiplier");

const chanceText =
    $("chance");

const upgradeButton =
    $("upgradeButton");

const attemptsElement =
    $("attempts");

const winsElement =
    $("wins");

const lossesElement =
    $("losses");

const winrateElement =
    $("winrate");

const balanceValue =
    $("balanceValue");

const onlineCount =
    $("online");

const selectionModal =
    $("selectionModal");

const modalOverlay =
    $("modalOverlay");

const modalClose =
    $("modalClose");

const modalTitle =
    $("modalTitle");

const modalList =
    $("modalList");

const depositModal =
    $("depositModal");

const depositContent =
    $("depositContent");

const depositButton =
    $("depositButton");

const depositClose =
    $("depositClose");

const depositOverlay =
    $("depositOverlay");

const withdrawModal =
    $("withdrawModal");

const withdrawButton =
    $("withdrawButton");

const withdrawClose =
    $("withdrawClose");

const withdrawOverlay =
    $("withdrawOverlay");

const withdrawBalance =
    $("withdrawBalance");

const result =
    $("result");

const resultIcon =
    $("resultIcon");

const resultTitle =
    $("resultTitle");

const resultText =
    $("resultText");

const closeResult =
    $("closeResult");

const rollScreen =
    $("rollScreen");

const rollTrack =
    $("rollTrack");

const toast =
    $("toast");


/* =========================================================
   HELPERS
========================================================= */

function formatNumber(value) {

    return Math.round(
        Number(value) || 0
    )
        .toLocaleString("ru-RU")
        .replace(/\u00A0/g, " ");
}

function formatMoney(value) {

    return formatNumber(value) + "$";
}

function clamp(value,min,max) {

    return Math.max(
        min,
        Math.min(max,value)
    );
}


/* =========================================================
   CALCULATIONS
========================================================= */

function calculateMultiplier() {

    return Number(sourceItem.value) > 0
        ? Number(targetItem.value) /
          Number(sourceItem.value)
        : 1;
}

function calculateDisplayedChance() {

    const multiplier =
        calculateMultiplier();

    if (multiplier <= 1) {
        return 98;
    }

    return clamp(
        98 / multiplier,
        1,
        98
    );
}

function calculateActualChance() {

    return calculateDisplayedChance() *
        REAL_CHANCE_FACTOR;
}


/* =========================================================
   ЧЕСТНЫЙ ПУЛ ИСХОДОВ
========================================================= */

function buildFairPool(chance) {

    const winsTarget =
        clamp(
            Math.round(chance * 2),
            0,
            FAIR_POOL_SIZE
        );

    let remainingWins =
        winsTarget;

    let remainingLosses =
        FAIR_POOL_SIZE -
        winsTarget;

    const pool = [];

    let last = null;
    let streak = 0;


    for (
        let i = 0;
        i < FAIR_POOL_SIZE;
        i++
    ) {

        const canWin =
            remainingWins > 0;

        const canLose =
            remainingLosses > 0;

        let chooseWin;


        if (!canWin) {

            chooseWin = false;

        } else if (!canLose) {

            chooseWin = true;

        } else if (streak >= 3) {

            /*
                Не позволяем случайно получить
                слишком длинную серию.
            */

            chooseWin =
                last === false;

        } else {

            const total =
                remainingWins +
                remainingLosses;

            chooseWin =
                Math.random() <
                (
                    remainingWins /
                    total
                );
        }


        if (chooseWin) {

            pool.push(true);
            remainingWins--;

        } else {

            pool.push(false);
            remainingLosses--;

        }


        if (last === chooseWin) {

            streak++;

        } else {

            streak = 1;
            last = chooseWin;
        }
    }


    /*
        Случайный старт внутри пула.
        Количество побед и поражений
        остаётся точным.
    */

    const offset =
        Math.floor(
            Math.random() *
            pool.length
        );

    return pool
        .slice(offset)
        .concat(
            pool.slice(0,offset)
        );
}


function getFairOutcome(chance) {

    const key =
        Number(chance).toFixed(1);

    let pool =
        fairPools.get(key);


    if (
        !pool ||
        pool.length === 0
    ) {

        pool =
            buildFairPool(
                Number(chance)
            );

        fairPools.set(
            key,
            pool
        );
    }


    return pool.pop();
}


/* =========================================================
   BALANCE
========================================================= */

function updateBalance() {

    balanceValue.textContent =
        formatMoney(balance);

    withdrawBalance.textContent =
        formatMoney(balance);
}


/* =========================================================
   CARDS
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


    const multiplier =
        calculateMultiplier();

    const chance =
        calculateDisplayedChance();


    multiplierText.textContent =
        "x" +
        multiplier.toFixed(2);

    chanceText.textContent =
        "Шанс " +
        chance.toFixed(1) +
        "%";
}


/* =========================================================
   STATS
========================================================= */

function updateStats() {

    attemptsElement.textContent =
        attempts;

    winsElement.textContent =
        wins;

    lossesElement.textContent =
        losses;


    winrateElement.textContent =
        (
            attempts
                ? wins / attempts * 100
                : 0
        ).toFixed(0) +
        "%";
}


/* =========================================================
   TOAST
========================================================= */

function showToast(
    message,
    error = false
) {

    clearTimeout(
        toastTimer
    );


    toast.textContent =
        message;


    toast.className =
        "toast show" +
        (
            error
                ? " error"
                : ""
        );


    toastTimer =
        setTimeout(
            () => {
                toast.className =
                    "toast hidden";
            },
            2800
        );
}


/* =========================================================
   VIRTUAL SOURCE
========================================================= */

function setVirtualSource(amount) {

    if (
        !Number.isFinite(amount) ||
        amount <= 0
    ) {
        return false;
    }


    virtualAmount =
        Math.floor(amount);

    currentType =
        "virtual";


    sourceItem = {
        id:"virtualCustom",
        type:"virtual",
        name:
            formatNumber(
                virtualAmount
            ),
        value:
            virtualAmount,
        icon:"🎃"
    };


    virtualBox
        .classList
        .remove("hidden");


    virtualInput.value =
        virtualAmount;


    typeButtons.forEach(
        button => {

            button.classList.toggle(
                "active",
                button.dataset.type ===
                "virtual"
            );

        }
    );


    updateCards();

    return true;
}


virtualInput.addEventListener(
    "input",
    () => {

        const number =
            Number(
                virtualInput.value
            );

        if (number > 0) {
            setVirtualSource(number);
        }

    }
);


virtualInput.addEventListener(
    "change",
    () => {

        const number =
            Number(
                virtualInput.value
            );

        if (number > 0) {

            setVirtualSource(
                number
            );

        } else {

            virtualInput.value =
                virtualAmount;

        }

    }
);


/* =========================================================
   TYPE SWITCH
========================================================= */

typeButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                if (rolling) {
                    return;
                }


                currentType =
                    button.dataset.type;


                typeButtons.forEach(
                    typeButton => {

                        typeButton.classList.toggle(
                            "active",
                            typeButton ===
                            button
                        );

                    }
                );


                if (
                    currentType ===
                    "virtual"
                ) {

                    virtualBox
                        .classList
                        .remove("hidden");

                    virtualInput.value =
                        virtualAmount;

                    updateCards();

                    return;
                }


                virtualBox
                    .classList
                    .add("hidden");


                const items =
                    ITEMS[currentType];


                if (items?.length) {

                    sourceItem =
                        {
                            ...items[0]
                        };
                }


                updateCards();

            }
        );

    }
);


/* =========================================================
   SELECTION MODAL
========================================================= */

function closeSelection() {

    selectionModal
        .classList
        .add("hidden");
}


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
                ${formatMoney(
                    item.value
                )}
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


function openSourceSelection() {

    if (rolling) {
        return;
    }


    if (
        currentType ===
        "virtual"
    ) {

        virtualBox
            .classList
            .remove("hidden");

        virtualInput.focus();

        virtualInput.select();

        return;
    }


    selectionModal
        .classList
        .remove("hidden");


    modalTitle.textContent =
        "ВЫБЕРИТЕ СТАВКУ";


    modalList.innerHTML =
        "";


    ITEMS[currentType].forEach(
        item => {

            createModalItem(
                item,
                () => {

                    sourceItem =
                        {
                            ...item
                        };

                    updateCards();

                    closeSelection();

                }
            );

        }
    );
}


function getAllTargetItems() {

    return [
        ...ITEMS.vehicle,
        ...ITEMS.property,
        ...ITEMS.item
    ];
}


function openTargetSelection() {

    if (rolling) {
        return;
    }


    selectionModal
        .classList
        .remove("hidden");


    modalTitle.textContent =
        "ВЫБЕРИТЕ ЦЕЛЬ";


    modalList.innerHTML =
        "";


    const box =
        document.createElement(
            "div"
        );


    box.className =
        "target-money-box";


    box.innerHTML = `
        <div class="target-money-title">
            ВИРТУАЛЬНАЯ ВАЛЮТА
        </div>

        <div class="target-money-row">

            <div class="target-money-input-wrap">

                <span>$</span>

                <input
                    id="targetVirtualAmount"
                    type="number"
                    min="1"
                    placeholder="Введите сумму"
                >

            </div>

            <button
                type="button"
                id="targetVirtualApply"
            >
                ВЫБРАТЬ
            </button>

        </div>
    `;


    modalList.appendChild(
        box
    );


    const input =
        $("targetVirtualAmount");

    const apply =
        $("targetVirtualApply");


    if (
        targetItem.type ===
        "virtual"
    ) {

        input.value =
            Math.round(
                targetItem.value
            );
    }


    const applyTarget = () => {

        const number =
            Number(
                input.value
            );


        if (
            !Number.isFinite(
                number
            ) ||
            number <= 0
        ) {

            showToast(
                "Введите корректную сумму",
                true
            );

            return;
        }


        targetItem = {
            id:"virtualTarget",
            type:"virtual",
            name:
                formatNumber(
                    number
                ),
            value:
                Math.floor(number),
            icon:"🎃"
        };


        updateCards();

        closeSelection();
    };


    apply.addEventListener(
        "click",
        applyTarget
    );


    input.addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                "Enter"
            ) {
                applyTarget();
            }

        }
    );


    const separator =
        document.createElement(
            "div"
        );


    separator.className =
        "modal-section-title";


    separator.textContent =
        "МАШИНЫ / ИМУЩЕСТВО / ПРЕДМЕТЫ";


    modalList.appendChild(
        separator
    );


    getAllTargetItems().forEach(
        item => {

            createModalItem(
                item,
                () => {

                    targetItem =
                        {
                            ...item
                        };

                    updateCards();

                    closeSelection();

                }
            );

        }
    );


    setTimeout(
        () => input.focus(),
        50
    );
}


sourceButton.addEventListener(
    "click",
    openSourceSelection
);

targetButton.addEventListener(
    "click",
    openTargetSelection
);

modalClose.addEventListener(
    "click",
    closeSelection
);

modalOverlay.addEventListener(
    "click",
    closeSelection
);


/* =========================================================
   CHANCE
========================================================= */

function setPresetChance(chance) {

    if (rolling) {
        return;
    }


    const sourceValue =
        Number(
            sourceItem.value
        );


    if (!sourceValue) {
        return;
    }


    const targetValue =
        sourceValue *
        (98 / chance);


    targetItem = {
        id:
            "presetTarget_" +
            chance,

        type:"virtual",

        name:
            formatNumber(
                targetValue
            ),

        value:
            targetValue,

        icon:"🎃"
    };


    chanceButtons.forEach(
        button => {

            button.classList.toggle(
                "active",
                Number(
                    button.dataset.chance
                ) === chance
            );

        }
    );


    updateCards();
}


chanceButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                setPresetChance(
                    Number(
                        button.dataset.chance
                    )
                );

            }
        );

    }
);


/* =========================================================
   ПОПОЛНЕНИЕ
========================================================= */

function openDeposit() {

    if (rolling) {
        return;
    }

    depositModal
        .classList
        .remove("hidden");

    renderDepositContent(
        "accessories"
    );
}


function closeDeposit() {

    depositModal
        .classList
        .add("hidden");
}


function renderDepositContent(
    method
) {

    document
        .querySelectorAll(
            ".method-button"
        )
        .forEach(
            button => {

                button.classList.toggle(
                    "active",
                    button.dataset.method ===
                    method
                );

            }
        );


    if (
        method ===
        "virtual"
    ) {

        depositContent.innerHTML = `
            <div class="deposit-panel">

                <label class="deposit-label">
                    СУММА ВИРТУАЛЬНОЙ ВАЛЮТЫ
                </label>

                <input
                    class="deposit-input"
                    id="depositVirtualAmount"
                    type="number"
                    min="1"
                    placeholder="Например, 1 000 000"
                >

                <button
                    type="button"
                    class="modal-action-button"
                    id="depositVirtualSubmit"
                >
                    ПОПОЛНИТЬ
                </button>

            </div>
        `;


        $("depositVirtualSubmit")
            .addEventListener(
                "click",
                () => {

                    const number =
                        Number(
                            $("depositVirtualAmount")
                                .value
                        );


                    if (
                        !Number.isFinite(
                            number
                        ) ||
                        number <= 0
                    ) {

                        showToast(
                            "Введите сумму пополнения",
                            true
                        );

                        return;
                    }


                    balance +=
                        Math.floor(
                            number
                        );


                    updateBalance();

                    closeDeposit();


                    showToast(
                        "Баланс пополнен на " +
                        formatMoney(
                            number
                        )
                    );

                }
            );


        return;
    }


    selectedAccessory =
        null;


    depositContent.innerHTML = `
        <div class="deposit-panel">

            <input
                class="deposit-input accessory-search"
                id="accessorySearch"
                type="text"
                placeholder="Поиск аксессуара..."
            >

            <div
                class="accessory-list"
                id="accessoryList"
            ></div>

            <div
                class="selected-accessory"
                id="selectedAccessoryText"
            >
                Аксессуар не выбран
            </div>

            <button
                type="button"
                class="modal-action-button"
                id="depositAccessorySubmit"
            >
                ПОПОЛНИТЬ
            </button>

        </div>
    `;


    const list =
        $("accessoryList");

    const search =
        $("accessorySearch");

    const selected =
        $("selectedAccessoryText");


    const render = () => {

        const query =
            search.value
                .trim()
                .toLowerCase();


        list.innerHTML =
            "";


        ACCESSORIES
            .filter(
                accessory =>
                    accessory.name
                        .toLowerCase()
                        .includes(query)
            )
            .forEach(
                accessory => {

                    const element =
                        document.createElement(
                            "div"
                        );


                    element.className =
                        "accessory-item" +
                        (
                            selectedAccessory ===
                            accessory
                                ? " selected"
                                : ""
                        );


                    element.innerHTML = `
                        <div class="accessory-icon">
                            ${accessory.icon}
                        </div>

                        <div class="accessory-info">

                            <div class="accessory-name">
                                ${accessory.name}
                            </div>

                            <div class="accessory-price">
                                ${formatMoney(
                                    accessory.value
                                )}
                            </div>

                        </div>
                    `;


                    element.addEventListener(
                        "click",
                        () => {

                            selectedAccessory =
                                accessory;


                            selected.innerHTML = `
                                Выбран:
                                <strong>
                                    ${accessory.name}
                                    —
                                    ${formatMoney(
                                        accessory.value
                                    )}
                                </strong>
                            `;


                            render();

                        }
                    );


                    list.appendChild(
                        element
                    );

                }
            );
    };


    search.addEventListener(
        "input",
        render
    );


    $("depositAccessorySubmit")
        .addEventListener(
            "click",
            () => {

                if (!selectedAccessory) {

                    showToast(
                        "Выберите аксессуар",
                        true
                    );

                    return;
                }


                balance +=
                    selectedAccessory.value;


                const name =
                    selectedAccessory.name;

                const value =
                    selectedAccessory.value;


                updateBalance();

                closeDeposit();


                showToast(
                    name +
                    " зачислен на " +
                    formatMoney(
                        value
                    )
                );

            }
        );


    render();
}


document
    .querySelectorAll(
        ".method-button"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    renderDepositContent(
                        button.dataset.method
                    );

                }
            );

        }
    );


depositButton.addEventListener(
    "click",
    openDeposit
);

depositClose.addEventListener(
    "click",
    closeDeposit
);

depositOverlay.addEventListener(
    "click",
    closeDeposit
);


/* =========================================================
   WITHDRAW
========================================================= */

function openWithdraw() {

    if (rolling) {
        return;
    }


    withdrawModal
        .classList
        .remove("hidden");


    updateBalance();


    $("withdrawNick")
        .focus();
}


function closeWithdraw() {

    withdrawModal
        .classList
        .add("hidden");
}


withdrawButton.addEventListener(
    "click",
    openWithdraw
);

withdrawClose.addEventListener(
    "click",
    closeWithdraw
);

withdrawOverlay.addEventListener(
    "click",
    closeWithdraw
);


$("withdrawSubmit")
    .addEventListener(
        "click",
        () => {

            const nick =
                $("withdrawNick")
                    .value
                    .trim();

            const amount =
                Number(
                    $("withdrawAmount")
                        .value
                );

            const server =
                $("withdrawServer")
                    .value;


            if (!nick) {

                showToast(
                    "Введите NickName",
                    true
                );

                return;
            }


            if (
                !Number.isFinite(
                    amount
                ) ||
                amount <= 0
            ) {

                showToast(
                    "Введите сумму вывода",
                    true
                );

                return;
            }


            if (!server) {

                showToast(
                    "Выберите сервер",
                    true
                );

                return;
            }


            if (amount > balance) {

                showToast(
                    "Недостаточно средств на балансе",
                    true
                );

                return;
            }


            balance -= amount;

            updateBalance();

            closeWithdraw();


            $("withdrawNick").value =
                "";

            $("withdrawAmount").value =
                "";

            $("withdrawServer").value =
                "";


            showToast(
                "Заявка на вывод создана: " +
                formatMoney(amount) +
                " | " +
                server
            );

        }
    );


/* =========================================================
   ROLL
========================================================= */

function createRollCard(won) {

    const element =
        document.createElement(
            "div"
        );


    element.className =
        "roll-card";


    element.innerHTML = `
        <div class="roll-card-icon">
            ${won ? "🎃" : "💀"}
        </div>

        <div class="roll-card-text">
            ${won ? "ВЫИГРЫШ" : "НЕУДАЧА"}
        </div>
    `;


    return element;
}


function runRollAnimation(won) {

    return new Promise(
        resolve => {

            rollScreen
                .classList
                .remove("hidden");


            rollTrack.style.transition =
                "none";


            rollTrack.style.transform =
                "translateX(0)";


            rollTrack.innerHTML =
                "";


            const total =
                44;

            const finalIndex =
                34;


            for (
                let i = 0;
                i < total;
                i++
            ) {

                let cardWon =
                    Math.random() <
                    0.5;


                if (
                    i === finalIndex
                ) {
                    cardWon =
                        won;
                }


                rollTrack.appendChild(
                    createRollCard(
                        cardWon
                    )
                );
            }


            requestAnimationFrame(
                () => {

                    requestAnimationFrame(
                        () => {

                            const card =
                                rollTrack
                                    .children[
                                        finalIndex
                                    ];


                            const windowRect =
                                document
                                    .querySelector(
                                        ".roll-window"
                                    )
                                    .getBoundingClientRect();


                            const cardCenter =
                                card.offsetLeft +
                                card.offsetWidth /
                                2;


                            const desired =
                                windowRect.width /
                                2;


                            const offset =
                                desired -
                                cardCenter;


                            rollTrack.style.transition =
                                "transform 3.7s cubic-bezier(.08,.72,.12,1)";

                            rollTrack.style.transform =
                                `translateX(${offset}px)`;


                            setTimeout(
                                () => {

                                    rollScreen
                                        .classList
                                        .add(
                                            "hidden"
                                        );


                                    rollTrack.style.transition =
                                        "none";


                                    resolve();

                                },
                                3900
                            );

                        }
                    );

                }
            );

        }
    );
}


/* =========================================================
   UPGRADE
========================================================= */

async function startUpgrade() {

    if (rolling) {
        return;
    }


    const sourceValue =
        Number(
            sourceItem.value
        );

    const targetValue =
        Number(
            targetItem.value
        );


    if (
        !sourceValue ||
        !targetValue
    ) {
        return;
    }


    if (
        sourceItem.id ===
        targetItem.id &&
        sourceItem.type !==
        "virtual"
    ) {

        showToast(
            "Выберите другую цель",
            true
        );

        return;
    }


    if (
        balance <
        sourceValue
    ) {

        showToast(
            "Недостаточно средств: нужно " +
            formatMoney(
                sourceValue
            ) +
            ", доступно " +
            formatMoney(
                balance
            ),
            true
        );

        return;
    }


    rolling = true;

    upgradeButton.disabled =
        true;

    attempts++;

    updateStats();


    /*
        Исход определяется
        до запуска анимации.
    */

    const displayedChance =
        calculateDisplayedChance();


    const actualChance =
        displayedChance *
        REAL_CHANCE_FACTOR;


    /*
        Честный результат из пула.
        actualChance здесь равен displayedChance,
        потому что REAL_CHANCE_FACTOR = 1.
    */

    const won =
        getFairOutcome(
            displayedChance
        );


    /* списываем ставку */

    balance -=
        sourceValue;

    updateBalance();


    if (won) {

        wins++;


        balance +=
            targetValue;


        resultIcon.textContent =
            "🎃";

        resultTitle.textContent =
            "ВЫИГРЫШ";


        resultText.innerHTML = `
            <span>
                Шанс:
                <strong>
                    ${displayedChance.toFixed(1)}%
                </strong>
            </span>

            <span class="result-win-amount">
                +${formatMoney(targetValue)}
            </span>

            <span>
                Баланс:
                <strong>
                    ${formatMoney(balance)}
                </strong>
            </span>
        `;

    } else {

        losses++;


        resultIcon.textContent =
            "💀";

        resultTitle.textContent =
            "ПРОИГРЫШ";


        resultText.innerHTML = `
            <span>
                Шанс:
                <strong>
                    ${displayedChance.toFixed(1)}%
                </strong>
            </span>

            <span class="result-loss-amount">
                −${formatMoney(sourceValue)}
            </span>

            <span>
                Баланс:
                <strong>
                    ${formatMoney(balance)}
                </strong>
            </span>
        `;
    }


    updateStats();


    await runRollAnimation(
        won
    );


    result
        .classList
        .remove("hidden");


    rolling = false;

    upgradeButton.disabled =
        false;
}


upgradeButton.addEventListener(
    "click",
    startUpgrade
);


closeResult.addEventListener(
    "click",
    () => {

        result
            .classList
            .add("hidden");

    }
);


/* =========================================================
   ONLINE
========================================================= */

function updateOnline() {

    onlineCount.textContent =
        Math.floor(
            100 +
            Math.random() *
            431
        );


    setTimeout(
        updateOnline,
        8000 +
        Math.random() *
        2000
    );
}


updateOnline();


/* =========================================================
   FALLING LEAVES
========================================================= */

function createLeaves() {

    const box =
        $("fallingLeaves");


    if (!box) {
        return;
    }


    for (
        let i = 0;
        i < 24;
        i++
    ) {

        const leaf =
            document.createElement(
                "span"
            );


        leaf.className =
            "leaf";


        leaf.textContent =
            Math.random() > 0.5
                ? "🍂"
                : "🍁";


        leaf.style.left =
            Math.random() * 100 +
            "%";


        leaf.style.animationDelay =
            -Math.random() * 12 +
            "s";


        leaf.style.animationDuration =
            7 +
            Math.random() * 8 +
            "s";


        leaf.style.fontSize =
            10 +
            Math.random() * 11 +
            "px";


        leaf.style.opacity =
            (
                .15 +
                Math.random() *
                .45
            ).toFixed(2);


        box.appendChild(
            leaf
        );
    }
}


createLeaves();


/* =========================================================
   ESC
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key !==
            "Escape"
        ) {
            return;
        }


        closeSelection();

        closeDeposit();

        closeWithdraw();


        if (!rolling) {

            result
                .classList
                .add("hidden");
        }
    }
);


/* =========================================================
   INITIALIZATION
========================================================= */

updateBalance();

updateStats();

currentType =
    "virtual";


typeButtons.forEach(
    button => {

        button.classList.toggle(
            "active",
            button.dataset.type ===
            "virtual"
        );

    }
);


virtualBox
    .classList
    .remove("hidden");


virtualInput.value =
    1000000;


setVirtualSource(
    1000000
);


setPresetChance(
    50
);
