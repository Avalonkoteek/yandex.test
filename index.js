class Table {
  constructor() {}
  WIDTH = 3;
  HEIGHT = 3;
  baseField = [];

  random = (width, height) => {
    this.WIDTH = width;
    this.HEIGHT = height;
    this.createRandomField();
  };
  file = (field = []) => {
    this.baseField = field;
    this.WIDTH = field[0].length;
    this.HEIGHT = field.length;
  };
  start = () => {
    console.log("start");
    this.drawTable();
    let timerId = setInterval(() => {
      this.updateTable();
      this.drawTable();
      clearInterval(timerId);
    }, 1000);
  };
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

// ======================================================================
// ========================   Интерфейс   ===============================
// ======================================================================
// Команды
const command = {
  random: (m, n) => {
    if (m < 3 || n < 3) {
      console.log("Введите значения больше 3х");
      return "((";
    }
    let a = new Table();
    a.random(m, n);
    a.start();
    return "true";
  },
  file: () => {
    console.log("Загрузите текстовый файл в окне браузера");
    document.getElementById("app").innerHTML = `
      <h1>Загрузить сюда</h1>
      <input type="file" onchange="showFile(this)">
      `;
  }
};

// Обработка файла
function getArrFromString(str) {
  newStr = str.replace(/ +/g, "").trim();
  let arr = newStr.split("]");
  arr.splice(arr.length - 2, arr.length - 1);
  let newArr = arr.map(element => {
    return element.substring(2, element.length).split(",");
  });
  console.log(newArr.map(element => element.map(athom => +athom)));
}

function showFile(input) {
  let file = input.files[0];

  let reader = new FileReader();
  reader.onload = function(event) {
    var contents = event.target.result;
    let a = new Table();
    a.file(getArrFromString(contents));
    a.start();
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
