class Table {
  constructor(width, height, field = []) {
    this.WIDTH = width;
    this.HEIGHT = height;
    this.baseField = field;
    // сценарии
    this.createRandomField();
    // this.drawTable();

    setInterval(() => {
      this.updateTable();
    }, 1000);
    this.drawTable();
  }
  WIDTH = 3;
  HEIGHT = 3;
  baseField = [];

  updateTable = () => {
    this.baseField = [...this.updateField()];
    // console.table(this.baseField);
  };
  //   настройка поля с случайными значениями
  createRandomField = () => {
    this.baseField = [];
    for (let i = 0; i < this.HEIGHT; i++) {
      this.baseField.push(this.createFildStroke());
    }
  };
  createFildStroke = () => {
    let arr = [];
    for (let i = 0; i < this.WIDTH; i++) {
      arr.push(this.getRandom());
    }
    return arr;
  };
  getRandom = () => {
    return Math.floor(Math.random() * 2);
  };

  // работа с облостью клетки
  getAreal = (x, y) => {
    let arial = [];
    for (let i = x - 1; i < x + 2; i++) {
      if (x - 1 < 0) {
      }
      for (let j = y - 1; j < y + 2; j++) {
        if (i !== x || j !== y) {
          arial.push(
            this.baseField[this.getCorrectIndex(i, this.WIDTH)][
              this.getCorrectIndex(j, this.HEIGHT)
            ]
          );
        }
      }
    }
    return arial;
  };
  // проверка размеров
  getCorrectIndex = (index, length) => {
    if (index < 0) return length - 1;
    if (index === length) return 0;
    return index;
  };

  updateCellState = (x, y) => {
    let arr = this.getAreal(x, y);
    let livingCellCounter = 0;

    for (let index = arr.length - 1; index >= 0; --index) {
      if (arr[index] === 1) livingCellCounter++;
    }
    if (this.baseField[x][y] === 0 && livingCellCounter === 3) return 1;
    if (
      this.baseField[x][y] === 1 &&
      (livingCellCounter < 2 || livingCellCounter > 3)
    )
      return 0;
    return this.baseField[x][y];
  };

  updateFieldStroke = stroke => {
    let newFieldStroke = [];
    for (let i = 0; i < this.WIDTH; i++) {
      newFieldStroke.push(this.updateCellState(stroke, i));
    }
    return newFieldStroke;
  };
  updateField = () => {
    let newField = [];
    for (let i = 0; i < this.HEIGHT; i++) {
      newField.push(this.updateFieldStroke(i));
    }
    return newField;
  };
  drawTable = () => {
    console.table(this.baseField);
  };
}

// Интерфейс
const command = {
  random: (m, n) => {
    if (m < 3 || n < 3) {
      console.log("Введите значения больше 3х");
      return "((";
    }
    WIDTH = m;
    HEIGHT = n;
    createBaseField();
    drawTable();
    return "true";
  },
  file: () => {
    console.log("Загрузите текстовый файл в окне браузера");
    document.getElementById("app").innerHTML = `
      <h1>Hello Vanilla!</h1>
      <input type="file" onchange="showFile(this)">
      `;
  },
  start: () => {
    setInterval(() => {
      baseField = [...updateField()];
      console.table(baseField);
    }, 10000);
  }
};
function getArrFromString(str) {
  newStr = str.replace(/ +/g, "").trim();
  let arr = [];
  let i = 1;
  let start = 0;
  let finish = 0;
  for (let x = 1; x < newStr.length - 2; x++) {
    if (newStr[x] == "[") {
      start = x + 1;
      console.log(start);
    }
    if (newStr[x] == "]") {
      finish = x - 1;
      console.log(finish);
      console.log(newStr.substr(start, finish - 1));
      arr.push(newStr.substr(start, finish - 1).split(","));
    }
  }
  console.log(arr);
}
function showFile(input) {
  let file = input.files[0];

  let reader = new FileReader();
  reader.onload = function(event) {
    var contents = event.target.result;
    getArrFromString(contents);
  };
  reader.onerror = function(event) {
    console.error(
      "Файл не может быть прочитан! код " + event.target.error.code
    );
  };
  reader.readAsText(file);
}
console.log(
  "задать слуайное поле - command('random') \nзадать поле из файла command('file') "
);
let a = new Table(20, 20);
