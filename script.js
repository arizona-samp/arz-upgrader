/* =========================================================
   ARIZONA UPGRADER
   ========================================================= */


/* =========================================================
   ITEMS
   ========================================================= */

const ITEMS = {

    virtual: [
        {
            name: "Виртуальная валюта",
            price: 1000000,
            icon: "💵"
        }
    ],

    vehicle: [
        {
            name: "BMW M5",
            price: 2500000,
            icon: "🚗"
        },
        {
            name: "Mercedes-Benz E63",
            price: 3500000,
            icon: "🚘"
        },
        {
            name: "Toyota Supra",
            price: 4500000,
            icon: "🏎️"
        },
        {
            name: "Nissan GT-R",
            price: 5500000,
            icon: "🏎️"
        },
        {
            name: "BMW X6",
            price: 7000000,
            icon: "🚙"
        },
        {
            name: "Mercedes G63",
            price: 10000000,
            icon: "🚙"
        },
        {
            name: "Lamborghini",
            price: 18000000,
            icon: "🏎️"
        },
        {
            name: "Rolls-Royce",
            price: 30000000,
            icon: "🚘"
        }
    ],

    property: [
        {
            name: "Гараж",
            price: 1500000,
            icon: "🚗"
        },
        {
            name: "Дом",
            price: 3500000,
            icon: "🏠"
        },
        {
            name: "Большой дом",
            price: 7000000,
            icon: "🏡"
        },
        {
            name: "Бизнес",
            price: 20000000,
            icon: "🏢"
        },
        {
            name: "Ресторан",
            price: 35000000,
            icon: "🍽️"
        },
        {
            name: "Ночной клуб",
            price: 50000000,
            icon: "🌃"
        },
        {
            name: "Элитный особняк",
            price: 100000000,
            icon: "🏰"
        }
    ],

    item: [
        {
            name: "Телефон",
            price: 150000,
            icon: "📱"
        },
        {
            name: "Rolex",
            price: 500000,
            icon: "⌚"
        },
        {
            name: "Премиум кейс",
            price: 2500000,
            icon: "📦"
        },
        {
            name: "Золотой предмет",
            price: 5000000,
            icon: "🏆"
        },
        {
            name: "Очень редкий предмет",
            price: 10000000,
            icon: "💎"
        },
        {
            name: "Легендарный предмет",
            price: 25000000,
            icon: "👑"
        }
    ]

};


/* =========================================================
   ACCESSORIES
   ========================================================= */

const ACCESSORIES = [

    {
        name: "Кепка",
        price: 150000,
        icon: "🧢"
    },

    {
        name: "Шляпа",
        price: 300000,
        icon: "🎩"
    },

    {
        name: "Маска Хэллоуин",
        price: 500000,
        icon: "🎭"
    },

    {
        name: "Очки Luxury",
        price: 750000,
        icon: "🕶️"
    },

    {
        name: "Мишка на плече",
        price: 800000,
        icon: "🧸"
    },

    {
        name: "Тыквенный аксессуар",
        price: 900000,
        icon: "🎃"
    },

    {
        name: "Рога",
        price: 1000000,
        icon: "😈"
    },

    {
        name: "Золотая цепь",
        price: 1500000,
        icon: "📿"
    },

    {
        name: "Неоновая маска",
        price: 1800000,
        icon: "😎"
    },

    {
        name: "Золотой череп",
        price: 2000000,
        icon: "💀"
    },

    {
        name: "Корона",
        price: 2500000,
        icon: "👑"
    },

    {
        name: "Крылья",
        price: 3500000,
        icon: "🪽"
    },

    {
        name: "Аура",
        price: 5000000,
        icon: "✨"
    },

    {
        name: "VIP Корона",
        price: 10000000,
        icon: "👑"
    }

];


/* =========================================================
   STATE
   ========================================================= */

let currentType = "virtual";

let sourceItem = {
    name: "Виртуальная валюта",
    price: 1000000,
    icon: "💵"
};

let targetItem = {
    name: "Виртуальная валюта",
    price: 1960000,
    icon: "💵"
};

let virtualAmount = 1000000;

let selectedChance = 50;

let balance = 0;

let selectedAccessory = null;

let stats = {
    attempts: 0,
    wins: 0,
    losses: 0
};


/* =========================================================
   DOM
   ========================================================= */

const sourceCard = document.getElementById("sourceCard");
const targetCard = document.getElementById("targetCard");

const sourceIcon = document.getElementById("sourceIcon");
const sourceName = document.getElementById("sourceName");
const sourcePrice = document.getElementById("sourcePrice");

const targetIcon = document.getElementById("targetIcon");
const targetName = document.getElementById("targetName");
const targetPrice = document.getElementById("targetPrice");

const sourceChange = document.getElementById("sourceChange");
const targetChange = document.getElementById("targetChange");

const virtualInputWrap =
    document.getElementById("virtualInputWrap");

const virtualAmountInput =
    document.getElementById("virtualAmount");

const multiplierValue =
    document.getElementById("multiplierValue");

const chanceValue =
    document.getElementById("chanceValue");

const upgradeButton =
    document.getElementById("upgradeButton");

const modal =
    document.getElementById("itemModal");

const modalItems =
    document.getElementById("modalItems");

const modalTitle =
    document.getElementById("modalTitle");

const modalClose =
    document.getElementById("modalClose");

const modalOverlay =
    document.getElementById("modalOverlay");

const rollScreen =
    document.getElementById("rollScreen");

const rollTrack =
    document.getElementById("rollTrack");

const resultOverlay =
    document.getElementById("resultOverlay");

const resultIcon =
    document.getElementById("resultIcon");

const resultTitle =
    document.getElementById("resultTitle");

const resultText =
    document.getElementById("resultText");

const resultClose =
    document.getElementById("resultClose");

const onlineCount =
    document.getElementById("onlineCount");

const totalAttempts =
    document.getElementById("totalAttempts");

const winsElement =
    document.getElementById("wins");

const lossesElement =
    document.getElementById("losses");

const winrateElement =
    document.getElementById("winrate");


/* DEPOSIT */

const depositButton =
    document.getElementById("depositButton");

const depositModal =
    document.getElementById("depositModal");

const depositOverlay =
    document.getElementById("depositOverlay");

const depositClose =
    document.getElementById("depositClose");

const depositContent =
    document.getElementById("depositContent");

const balanceValue =
    document.getElementById("balanceValue");

const depositMethods =
    document.querySelectorAll(".deposit-method");

const toast =
    document.getElementById("toast");


/* =========================================================
   FORMAT
   ========================================================= */

function formatMoney(value) {

    return "$" + Math.round(value).toLocaleString("en-US");

}


function formatNumber(value) {

    return Math.round(value).toLocaleString("en-US");

}


/* =========================================================
   MULTIPLIER / CHANCE
   ========================================================= */

function getMultiplier() {

    return 98 / selectedChance;

}


function getChance() {

    const multiplier =
        targetItem.price / sourceItem.price;

    if (multiplier <= 1) {
        return 98;
    }

    return Math.min(
        98,
        (98 / multiplier)
    );

}


/* =========================================================
   UPDATE BALANCE
   ========================================================= */

function updateBalance() {

    balanceValue.textContent =
        formatNumber(balance) + "$";

}


/* =========================================================
   UPDATE CARDS
   ========================================================= */

function updateCards() {

    sourceIcon.textContent = sourceItem.icon;
    sourceName.textContent = sourceItem.name;
    sourcePrice.textContent = formatMoney(sourceItem.price);

    targetIcon.textContent = targetItem.icon;
    targetName.textContent = targetItem.name;
    targetPrice.textContent = formatMoney(targetItem.price);


    const multiplier =
        targetItem.price / sourceItem.price;

    const actualChance =
        Math.min(
            98,
            98 / multiplier
        );

    multiplierValue.textContent =
        "x" + multiplier.toFixed(2);

    chanceValue.textContent =
        Math.floor(actualChance) + "%";


    if (currentType === "virtual") {

        virtualInputWrap.classList.remove("hidden");

    } else {

        virtualInputWrap.classList.add("hidden");

    }

}


/* =========================================================
   CHANCE BUTTONS
   ========================================================= */

document.querySelectorAll(".chance-btn")
    .forEach(button => {

        button.addEventListener("click", () => {

            document
                .querySelectorAll(".chance-btn")
                .forEach(btn =>
                    btn.classList.remove("active")
                );

            button.classList.add("active");

            selectedChance =
                Number(button.dataset.chance);


            if (currentType === "virtual") {

                const multiplier =
                    getMultiplier();

                targetItem = {

                    name: "Виртуальная валюта",

                    price:
                        Math.round(
                            virtualAmount * multiplier
                        ),

                    icon: "💵"

                };

            } else {

                /*
                 * При выборе шанса автоматически
                 * подбираем ближайший подходящий приз.
                 */

                const desiredPrice =
                    sourceItem.price *
                    getMultiplier();

                let candidates = [
                    ...ITEMS.vehicle,
                    ...ITEMS.property,
                    ...ITEMS.item
                ];

                if (currentType !== "virtual") {
                    candidates = ITEMS[currentType];
                }

                let closest = candidates[0];

                let closestDifference =
                    Math.abs(
                        candidates[0].price -
                        desiredPrice
                    );

                candidates.forEach(item => {

                    const difference =
                        Math.abs(
                            item.price -
                            desiredPrice
                        );

                    if (difference < closestDifference) {

                        closest = item;
                        closestDifference = difference;

                    }

                });

                targetItem = {
                    ...closest
                };

            }

            updateCards();

        });

    });


/* =========================================================
   VIRTUAL AMOUNT
   ========================================================= */

virtualAmountInput.addEventListener(
    "input",
    () => {

        let value =
            Number(virtualAmountInput.value);

        if (!value || value < 1) {
            value = 1;
        }

        virtualAmount = value;

        sourceItem = {

            name: "Виртуальная валюта",
            price: virtualAmount,
            icon: "💵"

        };


        if (currentType === "virtual") {

            targetItem = {

                name: "Виртуальная валюта",

                price:
                    Math.round(
                        virtualAmount *
                        getMultiplier()
                    ),

                icon: "💵"

            };

        }

        updateCards();

    }
);


/* =========================================================
   TYPE SELECTOR
   ========================================================= */

document.querySelectorAll(".type-btn")
    .forEach(button => {

        button.addEventListener("click", () => {

            document
                .querySelectorAll(".type-btn")
                .forEach(btn =>
                    btn.classList.remove("active")
                );

            button.classList.add("active");

            currentType =
                button.dataset.type;


            if (currentType === "virtual") {

                sourceItem = {

                    name: "Виртуальная валюта",
                    price: virtualAmount,
                    icon: "💵"

                };

                targetItem = {

                    name: "Виртуальная валюта",

                    price:
                        Math.round(
                            virtualAmount *
                            getMultiplier()
                        ),

                    icon: "💵"

                };

            } else {

                sourceItem = {
                    ...ITEMS[currentType][0]
                };

                targetItem = {
                    ...ITEMS[currentType][1]
                };

            }

            updateCards();

        });

    });


/* =========================================================
   MODAL
   ========================================================= */

let modalMode = "source";


function openItemModal(mode) {

    modalMode = mode;

    modal.classList.remove("hidden");

    if (mode === "source") {

        modalTitle.textContent =
            "ВЫБЕРИТЕ ВАШ ПРЕДМЕТ";

        renderSourceItems();

    } else {

        modalTitle.textContent =
            "ВЫБЕРИТЕ ПРИЗ";

        renderTargetItems();

    }

}


function closeItemModal() {

    modal.classList.add("hidden");

}


sourceChange.addEventListener(
    "click",
    () => openItemModal("source")
);

targetChange.addEventListener(
    "click",
    () => openItemModal("target")
);

modalClose.addEventListener(
    "click",
    closeItemModal
);

modalOverlay.addEventListener(
    "click",
    closeItemModal
);


/* =========================================================
   RENDER SOURCE ITEMS
   ========================================================= */

function renderSourceItems() {

    modalItems.innerHTML = "";

    const allItems = [
        ...ITEMS.vehicle,
        ...ITEMS.property,
        ...ITEMS.item
    ];

    /*
     * Виртуальная валюта отдельно,
     * чтобы можно было выбрать её всегда.
     */

    const virtualButton =
        document.createElement("button");

    virtualButton.className =
        "modal-item";

    virtualButton.innerHTML = `
        <div class="modal-item-icon">💵</div>

        <div>
            <div class="modal-item-name">
                Виртуальная валюта
            </div>

            <div class="modal-item-price">
                ${formatMoney(virtualAmount)}
            </div>
        </div>
    `;

    virtualButton.addEventListener(
        "click",
        () => {

            sourceItem = {

                name: "Виртуальная валюта",
                price: virtualAmount,
                icon: "💵"

            };

            currentType = "virtual";

            document
                .querySelectorAll(".type-btn")
                .forEach(btn => {

                    btn.classList.toggle(
                        "active",
                        btn.dataset.type === "virtual"
                    );

                });

            targetItem = {

                name: "Виртуальная валюта",

                price:
                    Math.round(
                        virtualAmount *
                        getMultiplier()
                    ),

                icon: "💵"

            };

            updateCards();
            closeItemModal();

        }
    );

    modalItems.appendChild(virtualButton);


    allItems.forEach(item => {

        const button =
            document.createElement("button");

        button.className =
            "modal-item";

        button.innerHTML = `

            <div class="modal-item-icon">
                ${item.icon}
            </div>

            <div>

                <div class="modal-item-name">
                    ${item.name}
                </div>

                <div class="modal-item-price">
                    ${formatMoney(item.price)}
                </div>

            </div>

        `;


        button.addEventListener(
            "click",
            () => {

                sourceItem = {
                    ...item
                };

                updateCards();
                closeItemModal();

            }
        );


        modalItems.appendChild(button);

    });

}


/* =========================================================
   TARGET ITEMS
   ========================================================= */

function renderTargetItems() {

    modalItems.innerHTML = "";

    const allItems = [
        ...ITEMS.virtual,
        ...ITEMS.vehicle,
        ...ITEMS.property,
        ...ITEMS.item
    ];


    allItems.forEach(item => {

        const button =
            document.createElement("button");

        button.className =
            "modal-item";

        button.innerHTML = `

            <div class="modal-item-icon">
                ${item.icon}
            </div>

            <div>

                <div class="modal-item-name">
                    ${item.name}
                </div>

                <div class="modal-item-price">
                    ${formatMoney(item.price)}
                </div>

            </div>

        `;


        button.addEventListener(
            "click",
            () => {

                targetItem = {
                    ...item
                };

                updateCards();
                closeItemModal();

            }
        );


        modalItems.appendChild(button);

    });

}


/* =========================================================
   STATS
   ========================================================= */

function updateStats() {

    totalAttempts.textContent =
        stats.attempts;

    winsElement.textContent =
        stats.wins;

    lossesElement.textContent =
        stats.losses;


    const winrate =
        stats.attempts === 0
            ? 0
            : Math.round(
                (stats.wins /
                stats.attempts) *
                100
            );

    winrateElement.textContent =
        winrate + "%";

}


/* =========================================================
   ONLINE
   ========================================================= */

function randomOnline() {

    const value =
        Math.floor(
            Math.random() * 431
        ) + 100;

    onlineCount.textContent =
        value;

}


function startOnlineCounter() {

    randomOnline();

    const next =
        Math.floor(
            Math.random() * 2000
        ) + 8000;

    setTimeout(
        startOnlineCounter,
        next
    );

}

startOnlineCounter();


/* =========================================================
   FALLING LEAVES
   ========================================================= */

function createLeaves() {

    const container =
        document.getElementById(
            "fallingLeaves"
        );

    const symbols = [
        "🍂",
        "🍁"
    ];


    for (let i = 0; i < 24; i++) {

        const leaf =
            document.createElement("div");

        leaf.className = "leaf";

        leaf.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];

        leaf.style.left =
            Math.random() * 100 + "%";

        leaf.style.fontSize =
            (12 + Math.random() * 12) + "px";

        leaf.style.opacity =
            (0.25 + Math.random() * 0.4).toFixed(2);

        leaf.style.animationDuration =
            (8 + Math.random() * 8) + "s";

        leaf.style.animationDelay =
            (-Math.random() * 12) + "s";

        container.appendChild(leaf);

    }

}

createLeaves();


/* =========================================================
   ROLL ITEMS
   ========================================================= */

function createRollItem(isWin) {

    if (isWin) {

        return `
            <div class="roll-item">
                <div class="roll-item-icon">🎃</div>
                <div class="roll-item-name">
                    ВЫИГРЫШ
                </div>
            </div>
        `;

    }

    return `
        <div class="roll-item">
            <div class="roll-item-icon">💀</div>
            <div class="roll-item-name">
                НЕУДАЧА
            </div>
        </div>
    `;

}


/* =========================================================
   ROLL ANIMATION
   ========================================================= */

function runRollAnimation(isWin) {

    return new Promise(resolve => {

        rollScreen.classList.remove(
            "hidden"
        );

        rollTrack.innerHTML = "";

        const items = [];

        /*
         * Создаём длинную ленту.
         * Результат уже определён до анимации.
         */

        for (let i = 0; i < 28; i++) {

            const randomResult =
                Math.random() > 0.5;

            items.push(
                createRollItem(
                    randomResult
                )
            );

        }


        /*
         * Последний элемент —
         * уже настоящий результат.
         */

        items.push(
            createRollItem(isWin)
        );

        rollTrack.innerHTML =
            items.join("");


        requestAnimationFrame(() => {

            const itemWidth = 162;
            const gap = 8;

            const finalIndex =
                items.length - 1;

            const finalPosition =
                (
                    finalIndex *
                    (itemWidth + gap)
                ) +
                (itemWidth / 2);

            const windowWidth =
                document
                    .querySelector(".roll-window")
                    .clientWidth;

            const translate =
                (windowWidth / 2) -
                finalPosition;


            rollTrack.style.transition =
                "none";

            rollTrack.style.transform =
                "translateX(0)";


            requestAnimationFrame(() => {

                rollTrack.style.transition =
                    "transform 5.2s cubic-bezier(.12,.72,.15,1)";

                rollTrack.style.transform =
                    `translateX(${translate}px)`;

            });

        });


        setTimeout(() => {

            resolve();

        }, 5400);

    });

}


/* =========================================================
   UPGRADE
   ========================================================= */

upgradeButton.addEventListener(
    "click",
    async () => {

        if (
            !sourceItem ||
            !targetItem
        ) {
            return;
        }


        const multiplier =
            targetItem.price /
            sourceItem.price;


        /*
         * Нельзя улучшать предмет
         * на меньшую/равную стоимость.
         */

        if (
            multiplier <= 1
        ) {

            showToast(
                "Выберите приз дороже вашего предмета."
            );

            return;

        }


        const actualChance =
            Math.min(
                98,
                98 / multiplier
            );


        /*
         * Сначала определяем результат.
         * Анимация его НЕ определяет.
         */

        const isWin =
            Math.random() * 100 <
            actualChance;


        upgradeButton.disabled =
            true;

        stats.attempts++;

        if (isWin) {
            stats.wins++;
        } else {
            stats.losses++;
        }

        updateStats();


        await runRollAnimation(
            isWin
        );


        rollScreen.classList.add(
            "hidden"
        );


        showResult(
            isWin
        );


        upgradeButton.disabled =
            false;

    }
);


/* =========================================================
   RESULT
   ========================================================= */

function showResult(isWin) {

    resultOverlay.classList.remove(
        "hidden"
    );


    if (isWin) {

        resultIcon.textContent =
            "🎃";

        resultTitle.textContent =
            "ВЫИГРЫШ";

        resultText.textContent =
            `Вы получили ${formatMoney(targetItem.price)}`;

    } else {

        resultIcon.textContent =
            "💀";

        resultTitle.textContent =
            "ПРОИГРЫШ";

        resultText.textContent =
            "В этот раз удача была не на вашей стороне.";

    }

}


resultClose.addEventListener(
    "click",
    () => {

        resultOverlay.classList.add(
            "hidden"
        );

    }
);


/* =========================================================
   DEPOSIT MODAL
   ========================================================= */

function openDepositModal() {

    depositModal.classList.remove(
        "hidden"
    );

    /*
     * При каждом новом открытии
     * начинаем с аксессуаров.
     */

    setDepositMethod(
        "accessories"
    );

}


function closeDepositModal() {

    depositModal.classList.add(
        "hidden"
    );

}


depositButton.addEventListener(
    "click",
    openDepositModal
);

depositClose.addEventListener(
    "click",
    closeDepositModal
);

depositOverlay.addEventListener(
    "click",
    closeDepositModal
);


/* =========================================================
   DEPOSIT METHODS
   ========================================================= */

depositMethods.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            setDepositMethod(
                button.dataset.method
            );

        }
    );

});


function setDepositMethod(method) {

    depositMethods.forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.method === method
        );

    });


    selectedAccessory = null;


    if (method === "virtual") {

        renderVirtualDeposit();

    } else {

        renderAccessoryDeposit();

    }

}


/* =========================================================
   VIRTUAL DEPOSIT
   ========================================================= */

function renderVirtualDeposit() {

    depositContent.innerHTML = `

        <div class="deposit-panel">

            <div class="deposit-label">
                СУММА ПОПОЛНЕНИЯ
            </div>

            <div class="deposit-money-input">

                <span>$</span>

                <input
                    type="number"
                    id="depositVirtualAmount"
                    min="1"
                    placeholder="Введите сумму"
                >

            </div>

            <button
                class="deposit-submit"
                id="depositVirtualButton"
            >
                ПОПОЛНИТЬ
            </button>

        </div>

    `;


    const input =
        document.getElementById(
            "depositVirtualAmount"
        );

    const button =
        document.getElementById(
            "depositVirtualButton"
        );


    button.addEventListener(
        "click",
        () => {

            const amount =
                Number(input.value);


            if (
                !amount ||
                amount <= 0
            ) {

                showToast(
                    "Введите сумму пополнения."
                );

                input.focus();

                return;

            }


            balance += amount;

            updateBalance();

            closeDepositModal();

            showToast(
                `Счёт пополнен на ${formatMoney(amount)}`
            );

        }
    );


    input.focus();

}


/* =========================================================
   ACCESSORY DEPOSIT
   ========================================================= */

function renderAccessoryDeposit(
    search = ""
) {

    const searchValue =
        search.toLowerCase().trim();


    const filtered =
        ACCESSORIES.filter(item =>
            item.name
                .toLowerCase()
                .includes(searchValue)
        );


    depositContent.innerHTML = `

        <div class="deposit-panel">

            <div class="deposit-label">
                ВЫБЕРИТЕ АКСЕССУАР
            </div>

            <div class="accessory-search">

                <input
                    type="text"
                    id="accessorySearch"
                    placeholder="Поиск аксессуара..."
                    value="${escapeHtml(search)}"
                >

            </div>


            <div
                class="accessory-list"
                id="accessoryList"
            >

                ${
                    filtered.length
                    ? filtered.map(
                        (item, index) => `
                            <button
                                class="accessory-card ${
                                    selectedAccessory &&
                                    selectedAccessory.name === item.name
                                        ? "selected"
                                        : ""
                                }"
                                data-index="${index}"
                            >

                                <div class="accessory-icon">
                                    ${item.icon}
                                </div>

                                <div>

                                    <div class="accessory-name">
                                        ${item.name}
                                    </div>

                                    <div class="accessory-price">
                                        ${formatMoney(item.price)}
                                    </div>

                                </div>

                            </button>
                        `
                    ).join("")
                    :
                    `
                        <div class="no-accessories">
                            Аксессуар не найден
                        </div>
                    `
                }

            </div>


            ${
                selectedAccessory
                ?
                `
                    <div class="selected-accessory">

                        <span>
                            Выбрано:
                        </span>

                        <strong>
                            ${selectedAccessory.icon}
                            ${selectedAccessory.name}
                            — ${formatMoney(selectedAccessory.price)}
                        </strong>

                    </div>
                `
                :
                ""
            }


            <button
                class="deposit-submit"
                id="depositAccessoryButton"
                ${selectedAccessory ? "" : "disabled"}
            >
                ПОПОЛНИТЬ
            </button>

        </div>

    `;


    /*
     * Поиск
     */

    const searchInput =
        document.getElementById(
            "accessorySearch"
        );


    searchInput.addEventListener(
        "input",
        () => {

            renderAccessoryDeposit(
                searchInput.value
            );

            const newSearch =
                document.getElementById(
                    "accessorySearch"
                );

            if (newSearch) {

                newSearch.focus();

                newSearch.setSelectionRange(
                    newSearch.value.length,
                    newSearch.value.length
                );

            }

        }
    );


    /*
     * Выбор аксессуара
     */

    document
        .querySelectorAll(".accessory-card")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const index =
                        Number(
                            button.dataset.index
                        );

                    selectedAccessory =
                        filtered[index];

                    renderAccessoryDeposit(
                        searchInput.value
                    );

                }
            );

        });


    /*
     * Пополнение
     */

    const depositAccessoryButton =
        document.getElementById(
            "depositAccessoryButton"
        );


    depositAccessoryButton.addEventListener(
        "click",
        () => {

            if (!selectedAccessory) {

                showToast(
                    "Сначала выберите аксессуар."
                );

                return;

            }


            balance +=
                selectedAccessory.price;


            updateBalance();


            const addedName =
                selectedAccessory.name;

            const addedPrice =
                selectedAccessory.price;


            selectedAccessory = null;


            closeDepositModal();


            showToast(
                `${addedName}: +${formatMoney(addedPrice)} на баланс`
            );

        }
    );

}


/* =========================================================
   HTML ESCAPE
   ========================================================= */

function escapeHtml(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


/* =========================================================
   TOAST
   ========================================================= */

let toastTimer = null;

function showToast(message) {

    toast.textContent =
        message;

    toast.classList.remove(
        "hidden"
    );


    clearTimeout(toastTimer);


    toastTimer =
        setTimeout(
            () => {

                toast.classList.add(
                    "hidden"
                );

            },
            2500
        );

}


/* =========================================================
   ESCAPE
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key !== "Escape") {
            return;
        }

        closeItemModal();
        closeDepositModal();

        resultOverlay.classList.add(
            "hidden"
        );

    }
);


/* =========================================================
   INITIAL
   ========================================================= */

balance = 0;

updateBalance();
updateCards();
updateStats();

