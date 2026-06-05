//import 'bulma/css/bulma.min.css';
import './style.css';
//-- сформировать пустую таблицу
let i=1
let j=1
// выбираем элементы
const es = (selector)=> document.querySelector(selector)
// получить елемент по ID
const el = (id)=> document.getElementById(id)

//извлечь значение первого элемента по имени
const enm = (name)=> document.getElementsByName(name)

//Исходные данные: строки параметров
    const rowsConfig = [
        { label: "Режим потока:", options: ["Запись", "Отображение"] },
        { label: "Кодек:", options: ["H.265", "H.264"] },
        { label: "Тип потока:", options: ["CBR", "VBR"] },
        { label: "Разрешение:", options: ["CIF(352x288)", "D1(720x576)", "1MP(1280x720)", "2Mp(1920x1080)", "3Mp(2048x1536)", "4Mp(2560x1440)", "5Mp(2592x1944)", "8MP(3840x2160)"] },
        { label: "Качество:", options: ["Наинизшее", "Низкое", "Среднее", "Высокое", "Самое высокое"] },
		{ label: "Частота кадров, к/с:", options: ["25", "15", "8", "5", "1"] },
		{ label: "Запись в сутки, ч:", options: ["24", "8", "4"] },
		{ label: "поток, Кб/с:", options: ["0"] },
    ];

// Колонки: каждая колонка — это массив выбранных значений (для каждой строки)
let columns = [];     // например, columns[0][2] — значение в первой колонке, третьей строке

 // Функция перерисовки всей таблицы
 function renderTable() {
	const container = document.getElementById('flow-form');
	console.log(container)
	container.innerHTML = '';

	// Определяем количество колонок: 1 (названия) + columns.length
	const colCount = 1 + columns.length;

	// Формируем CSS для grid-template-columns: первая фикс, остальные auto
	let gridTemplate = '200px';
	for (let i = 0; i < columns.length; i++) {
		gridTemplate += ' 150px';
	}

	// 1. Строка заголовков (над селекторами)
	const headerRow = document.createElement('div');
	headerRow.className = 'grid-row';
	headerRow.style.gridTemplateColumns = gridTemplate;

	// Первая ячейка заголовка (пустая)
	const emptyHeaderCell = document.createElement('div');
	emptyHeaderCell.className = 'cell';
	emptyHeaderCell.style.background = '#f1f5f9';
	emptyHeaderCell.style.fontWeight = 'normal';
	emptyHeaderCell.textContent = '';
	headerRow.appendChild(emptyHeaderCell);

	// Ячейки для каждой колонки с селекторами (шапка)
	for (let colIdx = 0; colIdx < columns.length; colIdx++) {
		const headerCell = document.createElement('div');
		headerCell.className = 'cell';
		headerCell.style.padding = '0';
		headerCell.style.background = '#f1f5f9';
		
		const headerDiv = document.createElement('div');
		headerDiv.className = 'column-header';
		headerDiv.innerHTML = `
			<span>Поток ${colIdx + 1}</span>
			<button class="btn-remove" data-col="${colIdx}">✕</button>
		`;
		headerCell.appendChild(headerDiv);
		headerRow.appendChild(headerCell);
	}
	container.appendChild(headerRow);

	// 2. Строки параметров (каждая строка — отдельный .grid-row)
	for (let rowIdx = 0; rowIdx < rowsConfig.length; rowIdx++) {
		const row = rowsConfig[rowIdx];
		const gridRow = document.createElement('div');
		gridRow.className = 'grid-row';
		gridRow.style.gridTemplateColumns = gridTemplate;

		// Первая ячейка (название параметра)
		const labelCell = document.createElement('div');
		labelCell.className = 'cell label-cell';
		labelCell.textContent = row.label;
		gridRow.appendChild(labelCell);

		// Ячейки селекторов для каждой колонки
		for (let colIdx = 0; colIdx < columns.length; colIdx++) {
			const selectCell = document.createElement('div');
			selectCell.className = 'cell select-cell';
			
			const select = document.createElement('select');
			select.className = 'param-select';
			// Заполняем опциями из конфига
			row.options.forEach(opt => {
				const option = document.createElement('option');
				option.value = opt;
				option.textContent = opt;
				select.appendChild(option);
			});
			// Восстанавливаем сохранённое значение (если есть)
			if (columns[colIdx] && columns[colIdx][rowIdx]) {
				select.value = columns[colIdx][rowIdx];
			} else {
				select.value = row.options[0];
			}
			// Сохраняем изменения
			select.addEventListener('change', (function(c, r) {
				return function() {
					if (!columns[c]) columns[c] = [];
					columns[c][r] = select.value;
				};
			})(colIdx, rowIdx));
			
			selectCell.appendChild(select);
			gridRow.appendChild(selectCell);
		}
		container.appendChild(gridRow);
	}

	// Вешаем обработчики на кнопки удаления
	document.querySelectorAll('.btn-remove').forEach(btn => {
		btn.addEventListener('click', (e) => {
			const colIndex = parseInt(btn.getAttribute('data-col'));
			removeColumn(colIndex);
		});
	});
}

// Удаление колонки
function removeColumn(index) {
	if (index >= 0 && index < columns.length) {
		columns.splice(index, 1);
		renderTable();
	}
}

// Добавление новой колонки
function addColumn() {
	// Новая колонка — пустой массив (значения будут инициализированы первыми опциями при рендере)
	columns.push([]);
	renderTable();
}

// Инициализация: создаём одну колонку для примера
/*document.addEventListener('DOMContentLoaded', () => {
	columns.push([]);  // одна колонка
	renderTable();
	document.getElementById('addColumnBtn').addEventListener('click', addColumn);
});*/
// формируем группы и потоки
function formAdd(){
	console.log(el('group'+i))
	//формируем элементы для добавления
	let clone = el('group'+i).cloneNode(true);
	console.log(clone)
	i++
	clone.id = "group" + i;
	console.log(es('#archive'))
	es('#group1').insertAdjacentElement('afterend', clone)
}
//удаляем форму
function formDel(event){
	//получить ID элемента по которому прошло событие
	let tdId = event.target.id
	//получить номер этого элемента
	//получить номер этого элемента
	let count = tdId.slice(6, tdId.length)
	if (tdId.slice(0, 6) === "delbut"){
		el('d'+ count).remove()
	}
}
//добавить потоки
function flowAdd(){
	//получить ID элемента по которому прошло событие
	console.log(el('flow'+j))
	//формируем элементы для добавления
	let clone = el('flow'+j).cloneNode(true);
	console.log(clone)
	j++
	clone.id = "flow" + j;
	console.log(es('#flow1'))
	es('#flow1').insertAdjacentElement('afterend', clone)
}	
// изменение элемента select
function changeVal(event){
	//получить ID элемента от события
	let selId = event.target.id
	//получает номер строки
	let num = selId.slice(4, selId.length)
	//изменяем видимость запись в сутки при отображении
	if (selId.slice(0, 4) === "mode"){
		if(el(selId).value === "disp"){
			el('inp'+num).style.display = "none"
			
		}
		else{
			el('inp'+num).style.display = ""
		}
	}
	
	//изменяем отображение элемента
	if (selId.slice(0, 7) === "typeBit"){
		num = selId.slice(7, selId.length)
		if(el(selId).value === "cbr"){
			el('btr'+ num).innerHTML = '<input name="btrIN" size="5" value="0" style = "text-align: center;">'
		}
	}
	
	//устанавливаем лимиты значений
	for(let a = 0; a < enm('btr').length; a++){
		let rD = LimNum(+enm('rc')[a].value, 1, 24)
		enm('rc')[a].value = rD
		let ks = LimNum(+enm('fr')[a].value, 1, 25)
		enm('fr')[a].value = ks
		if(enm('typeBit')[a].value === 'cbr'){
			let bitr = LimNum(+enm('btr')[a].children.btrIN.value, 64, 16000)
			enm('btr')[a].children.btrIN.value = bitr
		}
	}
	//считаем потоки
	flowcalc()
}
//ограничить значение
function LimNum(num, minNum, maxNum){
	if(num < minNum){
		num = minNum
	}
	if(num > maxNum){
		num = maxNum
	}
	return num
}
// рассчитаем потоки
function flowcalc(){
	// создаем массив коэффициентов
    let r
    let z
    let t
	let kZp = [369.21, 518.54, 755.19, 1167.14, 1488.09]
	let kZp2 = [186.21, 345.34, 465.12, 778.10, 992.06]
	let kRz = [0.26, 0.50, 0.85, 1.3, 1.60, 1.76, 2.1, 2.76]
	let kKs = [0.93, 0.94, 0.95, 0.96, 0.97, 0.98, 0.99, 1.00, 1.01, 1.02, 1.03, 1.04, 1.05, 1.06, 1.07, 1.08, 1.09, 1.1, 1.11, 1.12, 1.13, 1.14, 1.15, 1.16, 1.17]
	let kInt = [0.51, 0.99, 1.88, 3.44]
	for(let k=0; k<enm('razr').length; k++){
		if(enm('typeBit')[k].value === 'cbr'){
			continue
		}
		
		switch (enm('razr')[k].value){
			case "CIF":
				r = 0
				break
			case "D1":
				r = 1
				break
			case "1MP":
				r = 2
				break
			case "2MP":
				r = 3
				break
			case "3MP":
				r = 4
				break
			case "4MP":
				r = 5
				break
			case "5MP":
				r = 6
				break
			case "8MP":
				r = 7
				break
		}
		switch (enm('quality')[k].value){
			case "md1":
				z = 0
				break
			case "md2":
				z = 1
				break
			case "md3":
				z = 2
				break
			case "md4":
				z = 3
				break
			case "md5":
				z = 4
				break
		}
		let ks = +enm('fr')[k].value
		let rD = +enm('rc')[k].value
		switch (el('iT'+ enm('fr')[k].parentElement.parentElement.id.slice(2,3)).value){
			case "set1":
				t = 0
				break
			case "set2":
				t = 1
				break
			case "set3":
				t = 2
				break
			case "set4":
				t = 3
				break
		}
		if(enm('codec')[k].value === 'h264'){
			enm('btr')[k].innerText = (kRz[r]*kZp[z]*kKs[ks-1]*kInt[t]).toFixed(0)
		}
		else{
			enm('btr')[k].innerText = (kRz[r]*kZp2[z]*kKs[ks-1]*kInt[t]).toFixed(0)
		}
	}
}
// функция подсчета битрейта
function sumBtr(){
	//сформируем архив
	let sumBtr = [0,0,0]
	let allRec = 0
	//заполним архив битрейтом
	for(let m = 0; m < enm('btr').length; m++){
		if(enm('rc')[m].style.display === ''){
			if(enm('typeBit')[m].value === 'vbr'){
				sumBtr[0] += +(enm('btr')[m].innerText)*el('cV'+enm('btr')[m].parentElement.parentElement.parentElement.id.slice(2,3)).value
				let rD = +enm('rc')[m].value
				allRec += +(enm('btr')[m].innerText)*(el('cV'+enm('btr')[m].parentElement.parentElement.parentElement.id.slice(2,3)).value)*rD
			}else{
				sumBtr[0] += +(enm('btr')[m].children.btrIN.value)*el('cV'+enm('btr')[m].parentElement.parentElement.parentElement.id.slice(2,3)).value
				let rD = +enm('rc')[m].value
				allRec += +(enm('btr')[m].children.btrIN.value)*(el('cV'+enm('btr')[m].parentElement.parentElement.parentElement.id.slice(2,3)).value)*rD
			}	
			}
			else{
				if(enm('typeBit')[m].value === 'vbr'){
					sumBtr[1] += +(enm('btr')[m].innerText)*el('cV'+enm('btr')[m].parentElement.parentElement.parentElement.id.slice(2,3)).value
				} else{
					sumBtr[1] += +(enm('btr')[m].children.btrIN.value)*el('cV'+enm('btr')[m].parentElement.parentElement.parentElement.id.slice(2,3)).value
				}
			}
		sumBtr[2] = sumBtr[0] + sumBtr[1]
	}
	// посчитаем суммарный архив
	allRec = ((60*60*allRec*el('days').value)/(8*1024*1024*1024)).toFixed(1)
	// выведем результат
	el("bitRec").innerText = "Битрет на запись: " + sumBtr[0] + " Кбит/с"
	el("bitMon").innerText = "Битрейт на отображение: " + sumBtr[1] + " Кбит/с"
	el("bitSum").innerText = "Суммарный битрейт: " + sumBtr[2] + " Кбит/с"
	el("arhRec").innerText = "Объем архива: " + allRec + " Тбайт"
	el('sum').style.display = ''
}

function flowDel(event){
	//получить ID элемента по которому прошло событие
	let tdId = event.target.id
	//получить номер этого элемента
	let stcount = tdId.slice(tdId.indexOf('.')+1, tdId.length)
	let devcount = tdId.slice(5, tdId.indexOf('.'))
	//удаляем элемент
	if(tdId.slice(0, 5) === "delst"){
		el('tr'+ devcount + '.' + stcount).remove()
	}
}

document.addEventListener('DOMContentLoaded', () => {
	columns.push([]);  // одна колонка
	renderTable();
	document.getElementById('addColumnBtn').addEventListener('click', addColumn);
});

function onLoadHandler() {
	//-- подключаем обработчик щелчка по Div или по body
	//el('devices').addEventListener("click", formDel)
	//el('devices').addEventListener("click", flowAdd)
	//el('devices').addEventListener("click", flowDel)
	
    //el("btn").addEventListener("click", formAdd)
	//el("btn4").addEventListener("click", flowAdd)
    //el("btn2").addEventListener("click", sumBtr)
	//el('doc').addEventListener("click", changeVal)
	//document.addEventListener("click", changeVal)
}

window.onload = onLoadHandler;