// Pronalazi canvas element u HTML dokumentu
let canvas = document.getElementById('canvas');

// Dobija 2D kontekst za crtanje na canvasu
let ctx = canvas.getContext('2d');

// Definiše broj redova i kolona u igri
let rows = 20;
let cols = 20;

// Inicijalizuje zmiju sa početnom pozicijom
let snake = [{
    x: 19,
    y: 3
}];

// Deklariše promenljivu za hranu
let food;

// Izračunava širinu i visinu svake ćelije na osnovu dimenzija canvasa
let cellWidth = canvas.width / cols;
let cellHeight = canvas.height / rows;

// Postavlja početni pravac kretanja zmije
let direction = 'LEFT';

// Promenljiva koja prati da li je hrana sakupljena
let foodCollected = false;

// Postavlja hranu na slučajnu poziciju
placeFood();

// Postavlja interval za izvršavanje gameLoop funkcije svakih 200 milisekundi
setInterval(gameLoop, 200);

// Dodaje event listener za detekciju pritiska tastera na tastaturi
document.addEventListener('keydown', keyDown);

// Crta početno stanje igre
draw();

// Funkcija za crtanje igre
function draw() {
    // Boji pozadinu canvasa u crno
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Boji zmiju u belo
    ctx.fillStyle = 'white';
    snake.forEach(part => add(part.x, part.y));

    // Boji hranu u žuto
    ctx.fillStyle = 'yellow';
    add(food.x, food.y); // Hrana

    // Poziva draw funkciju ponovo za sledeći frame
    requestAnimationFrame(draw);
}

// Funkcija za proveru da li je igra gotova
function testGameOver() {
    let firstPart = snake[0];
    let otherParts = snake.slice(1);
    let duplicatePart = otherParts.find(part => part.x == firstPart.x && part.y == firstPart.y);

    // Proverava da li je zmija udarila u zid ili samu sebe
    if (snake[0].x < 0 ||
        snake[0].x > cols - 1 ||
        snake[0].y < 0 ||
        snake[0].y > rows - 1 ||
        duplicatePart
    ) {
        // Postavlja novu hranu i resetuje zmiju na početnu poziciju
        placeFood();
        snake = [{
            x: 19,
            y: 3
        }];
        direction = 'LEFT';
    }
}

// Funkcija za postavljanje hrane na slučajnu poziciju
function placeFood() {
    let randomX = Math.floor(Math.random() * cols);
    let randomY = Math.floor(Math.random() * rows);
    food = {
        x: randomX,
        y: randomY
    };
}

// Funkcija za crtanje jedne ćelije
function add(x, y) {
    ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth - 1, cellHeight - 1);
}

// Funkcija za pomeranje zmije
function shiftSnake() {
    for (let i = snake.length - 1; i > 0; i--) {
        const part = snake[i];
        const lastPart = snake[i - 1];
        part.x = lastPart.x;
        part.y = lastPart.y;
    }
}

// Glavna funkcija igre koja se izvršava u intervalu
function gameLoop() {
    // Proverava da li je igra gotova
    testGameOver();

    // Ako je hrana sakupljena, dodaje novi deo zmiji
    if (foodCollected) {
        snake = [{
            x: snake[0].x,
            y: snake[0].y
        }, ...snake];
        foodCollected = false;
    }

    // Pomeranje zmije
    shiftSnake();

    // Menja pravac kretanja zmije na osnovu trenutnog pravca
    if (direction == 'LEFT') {
        snake[0].x--;
    }
    if (direction == 'RIGHT') {
        snake[0].x++;
    }
    if (direction == 'UP') {
        snake[0].y--;
    }
    if (direction == 'DOWN') {
        snake[0].y++;
    }

    // Proverava da li je zmija pojela hranu
    if (snake[0].x == food.x &&
        snake[0].y == food.y) {
        foodCollected = true;
        placeFood();
    }
}

// Funkcija za detekciju pritiska tastera na tastaturi
function keyDown(e) {
    if (e.keyCode == 37) {
        direction = 'LEFT';
    }
    if (e.keyCode == 38) {
        direction = 'UP';
    }
    if (e.keyCode == 39) {
        direction = 'RIGHT';
    }
    if (e.keyCode == 40) {
        direction = 'DOWN';
    }
}
