document.addEventListener("DOMContentLoaded", () => {

    /*
     * ============================
     * ДАННЫЕ
     * ============================
     */

    const ITEMS = {

        vehicle: [
            {
                name: "BMW M5",
                price: 4500000,
                icon: "🚗"
            },
            {
                name: "Mercedes-Benz G63",
                price: 8000000,
                icon: "🚙"
            },
            {
                name: "Lamborghini Urus",
                price: 12000000,
                icon: "🏎️"
            },
            {
                name: "Bugatti Chiron",
                price: 25000000,
                icon: "🏎️"
            }
        ],

        property: [
            {
                name: "Квартира",
                price: 3000000,
                icon: "🏠"
            },
            {
                name: "Дом",
                price: 7500000,
                icon: "🏡"
            },
            {
                name: "Особняк",
                price: 15000000,
                icon: "🏰"
            },
            {
                name: "Бизнес",
                price: 30000000,
                icon: "🏢"
            }
        ],

        item: [
            {
                name: "Редкий предмет",
                price: 500000,
                icon: "🎁"
            },
            {
                name: "Премиум предмет",
                price: 1500000,
                icon: "💎"
            },
            {
                name: "Эксклюзив",
                price: 5000000,
                icon: "👑"
            }
        ]

    };


    /*
     * ============================
     * СОСТОЯНИЕ
     * ============================
     */

    let currentType = "virtual";

    let sourceItem = {
        name: "Виртуальная валюта",
        price: 1000000,
        icon: "💰"
    };

    let targetItem = {
        name: "Виртуальная валюта",
        price: 1960000,
        icon: "💰"
    };

    let selectedChance = 50;

    let attempts = 0;
    let wins = 0;
    let losses = 0;


    /*
     * ============================
     * ЭЛЕМЕНТЫ
     * ============================
     */

    const onlineEl = document.getElementById("online");

    const typeButtons =
        document.querySelectorAll(".type-btn");

    const chanceButtons =
        document.querySelectorAll(".chance-btn");

    const virtualBox =
        document.getElementById("virtualBox");

    const virtualAmount =
        document.getElementById("virtualAmount");

    const sourceButton =
        document.getElementById("changeSource");

    const targetButton =
        document.getElementById("changeTarget");

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

    const multiplierEl =
        document.getElementById("multiplier");

    const chanceValueEl =
        document.getElementById("chanceValue");

    const upgradeButton =
        document.getElementById("upgradeButton");

    const attemptsEl =
        document.getElementById("attempts");

    const winsEl =
        document.getElementById("wins");

    const lossesEl =
        document.getElementById("losses");

    const winrateEl =
        document.getElementById("winrate");

    const modalOverlay =
        document.getElementById("modalOverlay");

    const modalTitle =
        document.getElementById("modalTitle");

    const modalList =
        document.getElementById("modalList");

    const modalClose =
        document.getElementById("modalClose");

    const resultOverlay =
        document.getElementById("result");

    const resultIcon =
        document.getElementById("resultIcon");

    const resultTitle =
        document.getElementById("resultTitle");

    const resultText =
        document.getElementById("resultText");

    const closeResult =
        document.getElementById("closeResult");


    /*
     * ============================
     * ФОРМАТИРОВАНИЕ
     * ============================
     */

    function formatMoney(value) {

        return Number(value || 0).toLocaleString("ru-RU");

    }


    /*
     * ============================
     * РАСЧЁТ
     * ============================
     *
     * 2% преимущество сайта.
     *
     * Шанс = 98 / множитель
     *
     * Например:
     *
     * x1.96 = 50%
     * x3.266 = 30%
     * x6.533 = 15%
     * x19.6 = 5%
     */

    function calculateMultiplier() {

        const sourceValue =
            Number(sourceItem.price) || 0;

        const targetValue =
            Number(targetItem.price) || 0;

        if (sourceValue <= 0 || targetValue <= 0) {
            return 0;
        }

        return targetValue / sourceValue;

    }


    function calculateChance() {

        const multiplier =
            calculateMultiplier();

        if (multiplier <= 0) {
            return 0;
        }

        return Math.min(
            98,
            98 / multiplier
        );

    }


    /*
     * ============================
     * ОБНОВЛЕНИЕ UI
     * ============================
     */

    function updateCards() {

        sourceIcon.textContent =
            sourceItem.icon;

        sourceName.textContent =
            sourceItem.name;

        sourcePrice.textContent =
            "$" + formatMoney(sourceItem.price);


        targetIcon.textContent =
            targetItem.icon;

        targetName.textContent =
            targetItem.name;

        targetPrice.textContent =
            "$" + formatMoney(targetItem.price);

    }


    function updateChance() {

        const multiplier =
            calculateMultiplier();

        const chance =
            calculateChance();


        multiplierEl.textContent =
            "x" + (
                multiplier > 0
                    ? multiplier.toFixed(2)
                    : "0.00"
            );


        chanceValueEl.textContent =
            Math.min(98, chance).toFixed(1) + "%";

    }


    function updateStats() {

        attemptsEl.textContent =
            attempts;

        winsEl.textContent =
            wins;

        lossesEl.textContent =
            losses;


        const winrate =
            attempts > 0
                ? (wins / attempts) * 100
                : 0;


        winrateEl.textContent =
            winrate.toFixed(1) + "%";

    }


    /*
     * ============================
     * ТИПЫ
     * ============================
     */

    typeButtons.forEach(button => {

        button.addEventListener("click", () => {

            typeButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");


            currentType =
                button.dataset.type;


            if (currentType === "virtual") {

                virtualBox.style.display =
                    "block";

                sourceItem = {
                    name: "Виртуальная валюта",
                    price:
                        Number(virtualAmount.value) || 1,
                    icon: "💰"
                };

                targetItem = {
                    name: "Виртуальная валюта",
                    price:
                        sourceItem.price * 1.96,
                    icon: "💰"
                };

            } else {

                virtualBox.style.display =
                    "none";


                const list =
                    ITEMS[currentType];


                if (list && list.length) {

                    sourceItem =
                        { ...list[0] };

                    targetItem =
                        {
                            ...list[1] || list[0]
                        };

                }

            }


            updateCards();
            updateChance();

        });

    });


    /*
     * ============================
     * ВИРТУАЛЬНАЯ ВАЛЮТА
     * ============================
     */

    virtualAmount.addEventListener(
        "input",
        () => {

            let value =
                Number(virtualAmount.value);


            if (!value || value < 1) {
                value = 1;
            }


            sourceItem = {

                name: "Виртуальная валюта",

                price: value,

                icon: "💰"

            };


            /*
             * Если пользователь меняет
             * сумму ставки, сохраняем
             * выбранный процент.
             */

            const multiplier =
                98 / selectedChance;


            targetItem = {

                name: "Виртуальная валюта",

                price:
                    Math.round(
                        value * multiplier
                    ),

                icon: "💰"

            };


            updateCards();
            updateChance();

        }
    );


    /*
     * ============================
     * КНОПКА ИСТОЧНИКА
     * ============================
     */

    sourceButton.addEventListener(
        "click",
        () => {

            if (currentType === "virtual") {

                virtualAmount.focus();

                return;

            }


            openModal(
                "Выберите ставку",
                currentType,
                item => {

                    sourceItem =
                        { ...item };

                    updateCards();
                    updateChance();

                }
            );

        }
    );


    /*
     * ============================
     * КНОПКА ЦЕЛИ
     * ============================
     */

    targetButton.addEventListener(
        "click",
        () => {

            openTargetModal();

        }
    );


    /*
     * ============================
     * МОДАЛКА ИСТОЧНИКА
     * ============================
     */

    function openModal(title, type, callback) {

        modalTitle.textContent =
            title;

        modalList.innerHTML =
            "";


        const list =
            ITEMS[type] || [];


        list.forEach(item => {

            const button =
                document.createElement("button");


            button.type =
                "button";

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
                        $${formatMoney(item.price)}
                    </div>
                </div>

            `;


            button.addEventListener(
                "click",
                () => {

                    callback(item);

                    closeModal();

                }
            );


            modalList.appendChild(button);

        });


        modalOverlay.classList.add(
            "active"
        );

    }


    /*
     * ============================
     * МОДАЛКА ЦЕЛИ
     * ============================
     */

    function openTargetModal() {

        modalTitle.textContent =
            "Выберите цель";

        modalList.innerHTML =
            "";


        /*
         * Виртуальная валюта
         */

        const virtualButton =
            document.createElement("button");


        virtualButton.type =
            "button";

        virtualButton.className =
            "modal-item";


        virtualButton.innerHTML = `

            <div class="modal-item-icon">
                💰
            </div>

            <div>
                <div class="modal-item-name">
                    Виртуальная валюта
                </div>

                <div class="modal-item-price">
                    Введите сумму самостоятельно
                </div>
            </div>

        `;


        virtualButton.addEventListener(
            "click",
            () => {

                const value =
                    prompt(
                        "Введите сумму виртуальной валюты:"
                    );


                if (value !== null) {

                    const number =
                        Number(
                            value.replace(/\s/g, "")
                        );


                    if (
                        Number.isFinite(number) &&
                        number > 0
                    ) {

                        targetItem = {

                            name:
                                "Виртуальная валюта",

                            price:
                                number,

                            icon:
                                "💰"

                        };


                        updateCards();
                        updateChance();

                    }

                }


                closeModal();

            }
        );


        modalList.appendChild(
            virtualButton
        );


        /*
         * Остальные категории
         */

        [
            "vehicle",
            "property",
            "item"
        ].forEach(type => {

            ITEMS[type].forEach(item => {

                const button =
                    document.createElement("button");


                button.type =
                    "button";

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
                            $${formatMoney(item.price)}
                        </div>
                    </div>

                `;


                button.addEventListener(
                    "click",
                    () => {

                        targetItem =
                            { ...item };

                        updateCards();
                        updateChance();

                        closeModal();

                    }
                );


                modalList.appendChild(
                    button
                );

            });

        });


        modalOverlay.classList.add(
            "active"
        );

    }


    /*
     * ============================
     * ЗАКРЫТИЕ МОДАЛКИ
     * ============================
     */

    function closeModal() {

        modalOverlay.classList.remove(
            "active"
        );

    }


    modalClose.addEventListener(
        "click",
        closeModal
    );


    modalOverlay.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                modalOverlay
            ) {

                closeModal();

            }

        }
    );


    /*
     * ============================
     * КНОПКИ ШАНСА
     * ============================
     */

    chanceButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                chanceButtons.forEach(btn => {
                    btn.classList.remove("active");
                });

                button.classList.add("active");


                selectedChance =
                    Number(
                        button.dataset.chance
                    );


                const sourceValue =
                    Number(sourceItem.price);


                /*
                 * Автоматический множитель
                 */

                const multiplier =
                    98 / selectedChance;


                /*
                 * Автоматически создаём
                 * виртуальную цель.
                 */

                targetItem = {

                    name:
                        "Виртуальная валюта",

                    price:
                        Math.round(
                            sourceValue *
                            multiplier
                        ),

                    icon:
                        "💰"

                };


                updateCards();
                updateChance();

            }
        );

    });


    /*
     * ============================
     * УЛУЧШЕНИЕ
     * ============================
     */

    upgradeButton.addEventListener(
        "click",
        () => {

            const sourceValue =
                Number(sourceItem.price);


            const targetValue =
                Number(targetItem.price);


            if (
                !sourceValue ||
                sourceValue <= 0 ||
                !targetValue ||
                targetValue <= 0
            ) {

                return;

            }


            const chance =
                calculateChance();


            if (
                chance <= 0 ||
                chance > 98
            ) {

                return;

            }


            upgradeButton.disabled =
                true;

            upgradeButton.style.opacity =
                "0.6";


            setTimeout(
                () => {

                    attempts++;


                    /*
                     * Случайное число
                     * от 0 до 100.
                     */

                    const roll =
                        Math.random() * 100;


                    const win =
                        roll <= chance;


                    if (win) {

                        wins++;


                        resultIcon.textContent =
                            "🎃";

                        resultTitle.textContent =
                            "ВЫИГРЫШ";

                        resultText.textContent =
                            `Вы получили ${targetItem.name} на сумму $${formatMoney(targetValue)}!`;

                    } else {

                        losses++;


                        resultIcon.textContent =
                            "💀";

                        resultTitle.textContent =
                            "ПРОИГРЫШ";

                        resultText.textContent =
                            `К сожалению, попытка не удалась. Шанс был ${chance.toFixed(1)}%.`;

                    }


                    updateStats();


                    resultOverlay.classList.add(
                        "active"
                    );


                    upgradeButton.disabled =
                        false;

                    upgradeButton.style.opacity =
                        "1";


                },
                650
            );

        }
    );


    /*
     * ============================
     * РЕЗУЛЬТАТ
     * ============================
     */

    closeResult.addEventListener(
        "click",
        () => {

            resultOverlay.classList.remove(
                "active"
            );

        }
    );


    resultOverlay.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                resultOverlay
            ) {

                resultOverlay.classList.remove(
                    "active"
                );

            }

        }
    );


    /*
     * ============================
     * ONLINE
     * ============================
     */

    function updateOnline() {

        const value =
            Math.floor(
                Math.random() * 431
            ) + 100;


        onlineEl.textContent =
            value;

    }


    function scheduleOnline() {

        const delay =
            Math.floor(
                Math.random() * 2000
            ) + 8000;


        setTimeout(
            () => {

                updateOnline();

                scheduleOnline();

            },
            delay
        );

    }


    /*
     * ============================
     * СТАРТ
     * ============================
     */

    virtualBox.style.display =
        "block";


    updateCards();
    updateChance();
    updateStats();
    updateOnline();
    scheduleOnline();

});
