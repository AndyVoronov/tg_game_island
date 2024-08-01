document.addEventListener("DOMContentLoaded", () => {
    const gameContainer = document.getElementById('game-container');
    const character = document.getElementById('character');
    const messageBox = document.getElementById('message-box');
    const inventoryBox = document.getElementById('inventory');

    const gameData = {
        currentLocation: 'island',
        inventory: [],
        clues: [],
        characterX: 0,
        characterY: 0,
        gridSize: 40 // Размер сетки в пикселях
    };

    function showMessage(message) {
        messageBox.textContent = message;
    }

    function updateBackground(image) {
        gameContainer.style.backgroundImage = `url('assets/images/${image}.png')`;
    }

    function updateInventory() {
        inventoryBox.innerHTML = '<strong>Инвентарь:</strong> ' + gameData.inventory.join(', ');
    }

    function moveTo(x, y) {
        character.style.left = `${x}px`;
        character.style.top = `${y}px`;
        gameData.characterX = x;
        gameData.characterY = y;
    }

    function checkLocation() {
        // Пример проверки локаций (переделайте координаты по вашему усмотрению)
        if (gameData.characterX > 200 && gameData.characterX < 300 && gameData.characterY > 200 && gameData.characterY < 300) {
            handleLocation('cave');
        } else if (gameData.characterX > 300 && gameData.characterX < 400 && gameData.characterY > 100 && gameData.characterY < 200) {
            handleLocation('forest');
        } else {
            handleLocation('island');
        }
    }

    function handleLocation(location) {
        gameData.currentLocation = location;
        switch (location) {
            case 'island':
                updateBackground('island');
                showMessage('Вы находитесь на острове. Исследуйте.');
                break;
            case 'cave':
                updateBackground('cave');
                showMessage('Вы вошли в пещеру.');
                break;
            case 'forest':
                updateBackground('forest');
                showMessage('Вы в лесу. Здесь много деревьев.');
                break;
        }
    }

    function moveCharacterTo(x, y) {
        // Переместить персонажа в координаты x, y
        moveTo(x, y);
        checkLocation();
    }

    gameContainer.addEventListener('click', (event) => {
        const rect = gameContainer.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        // Приведите координаты к ближайшему значению в сетке
        const gridX = Math.floor(x / gameData.gridSize) * gameData.gridSize;
        const gridY = Math.floor(y / gameData.gridSize) * gameData.gridSize;

        moveCharacterTo(gridX, gridY);
    });

    // Инициализация начального состояния
    moveTo(0, 0); // Начальная позиция персонажа
    handleLocation(gameData.currentLocation);
});
