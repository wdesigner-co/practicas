let sortedNumbers = [];
let unsortedNumbers = [];
let lastDrawData = {};
let sortedNumbersCount = {};
let sortedNumbersRows = {}; // Nuevo: Para almacenar las filas de cada número

document.getElementById('fileInput').addEventListener('change', handleFile, false);

function handleFile(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        processWorkbook(workbook);
    };

    reader.readAsArrayBuffer(file);
}

function processWorkbook(workbook) {
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const numbers = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });

    sortedNumbers = [];
    sortedNumbersCount = {};
    sortedNumbersRows = {}; // Nuevo: Inicializar

    for (let i = 1; i < numbers.length; i++) {
        if (numbers[i][0]) {
            const number = numbers[i][0].toString().padStart(4, '0');
            sortedNumbers.push(number);
            sortedNumbersCount[number] = (sortedNumbersCount[number] || 0) + 1;
            if (!sortedNumbersRows[number]) {
                sortedNumbersRows[number] = [];
            }
            sortedNumbersRows[number].push(i); // Guardar la fila del sorteo
        }
    }

    const allNumbers = Array.from({ length: 10000 }, (_, i) => i.toString().padStart(4, '0'));
    unsortedNumbers = allNumbers.filter(num => !sortedNumbers.includes(num));

    if (numbers.length > 1) {
        lastDrawData = {
            numero: numbers[1][0].toString().padStart(4, '0'),
            descripcion: numbers[1][1],
            fecha: formatExcelDate(numbers[1][2])
        };

        document.getElementById('fechaUltimoNum').innerText = lastDrawData.fecha;
    }

    const selectedLottery = document.getElementById('lotterySelector').value;
    const message = `Archivo ${selectedLottery}.xls cargado con éxito.`;
    document.getElementById('mensajeArchivo').innerText = message;

    console.log('Números sorteados:', sortedNumbers);
    console.log('Números no sorteados:', unsortedNumbers);
    console.log('Último sorteo:', lastDrawData);
}

function formatExcelDate(excelDate) {
    const date = new Date((excelDate - (25567 + 1)) * 86400 * 1000);
    const day = String(date.getDate()).padStart(2, '0');
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function cargarArchivo() {
    document.getElementById('fileInput').click();
}

function obtenerUltimoNumero() {
    if (lastDrawData.numero) {
        document.getElementById('ultimoNumero').innerText = lastDrawData.numero;
    } else {
        document.getElementById('ultimoNumero').innerText = 'No hay números sorteados';
    }
}

function permutar() {
    if (!lastDrawData.numero) {
        alert('No hay número sorteado para permutar.');
        return;
    }

    const num = lastDrawData.numero;
    const permutations = Array.from(new Set(generatePermutations(num.split('')).map(p => p.join(''))));

    const permutadosSorteados = Array.from(new Set(permutations.filter(p => sortedNumbers.includes(p))));
    const permutadosNoSorteados = Array.from(new Set(permutations.filter(p => !sortedNumbers.includes(p))));

    document.getElementById('permutadosSorteados').innerText = `Sorteados: ${permutadosSorteados.join(', ')}`;
    document.getElementById('permutadosNoSorteados').innerText = `No Sorteados: ${permutadosNoSorteados.join(', ')}`;
}

function permutar2() {
    const num = document.getElementById('numeroInput').value.padStart(4, '0');
    if (!/^\d{4}$/.test(num)) {
        alert('Ingresa un número válido de 4 dígitos.');
        return;
    }

    const permutations = Array.from(new Set(generatePermutations(num.split('')).map(p => p.join(''))));

    const permutadosSorteados = Array.from(new Set(permutations.filter(p => sortedNumbers.includes(p))));
    const permutadosNoSorteados = Array.from(new Set(permutations.filter(p => !sortedNumbers.includes(p))));

    document.getElementById('permutadosSorteadosInput').innerText = `Sorteados: ${permutadosSorteados.join(', ')}`;
    document.getElementById('permutadosNoSorteadosInput').innerText = `No Sorteados: ${permutadosNoSorteados.join(', ')}`;
}

function buscarNumero() {
    const num = document.getElementById('numeroInput').value.padStart(4, '0');
    if (!/^\d{4}$/.test(num)) {
        alert('Ingresa un número válido de 4 dígitos.');
        return;
    }

    const count = sortedNumbersCount[num] || 0;
    const resultado = count > 0 
        ? `El número ya ha sido sorteado (${count} vez${count > 1 ? 'es' : ''}).`
        : 'El número buscado no ha sido sorteado para esta lotería, pruebe su suerte.';

    document.getElementById('resultadoBusqueda').innerText = resultado;
}

function imprimirNumerosRepetidos() {
    const repetidos = Object.keys(sortedNumbersCount).filter(num => sortedNumbersCount[num] > 1);
    const repetidosText = repetidos.map(num => `${num} (${sortedNumbersCount[num]} veces)`).join(', ');
    document.getElementById('numerosRepetidos').innerText = `Números sorteados más de una vez: ${repetidosText}`;
}

function calcularPromedioRepeticion() {
    const repetidos = Object.keys(sortedNumbersRows).filter(num => sortedNumbersRows[num].length > 1);
    let totalDiffs = 0;
    let countDiffs = 0;

    repetidos.forEach(num => {
        const rows = sortedNumbersRows[num];
        for (let i = 1; i < rows.length; i++) {
            totalDiffs += (rows[i] - rows[i - 1]);
            countDiffs++;
        }
    });

    const promedio = countDiffs > 0 ? (totalDiffs / countDiffs).toFixed(2) : 0;
    document.getElementById('promedioRepeticion').innerText = `Promedio de sorteos entre repeticiones: ${promedio}`;
}

function generatePermutations(arr) {
    if (arr.length === 1) return [arr];
    const perms = [];
    for (let i = 0; i < arr.length; i++) {
        const current = arr.slice();
        const next = current.splice(i, 1);
        const nextPerms = generatePermutations(current);
        nextPerms.forEach(perm => perms.push(next.concat(perm)));
    }
    return perms;
}

function buscarNumeroAleatorio() {
    if (unsortedNumbers.length === 0) {
        document.getElementById('numeroEstimado').innerText = 'No hay números disponibles.';
        return;
    }
    const randomIndex = Math.floor(Math.random() * unsortedNumbers.length);
    const randomNum = unsortedNumbers[randomIndex];
    document.getElementById('numeroEstimado').innerText = randomNum;

    // Permutar el número aleatorio
    permutarNumero(randomNum);
}

function permutarNumero(num) {
    const permutations = Array.from(new Set(generatePermutations(num.split('')).map(p => p.join(''))));

    const permutadosSorteados = Array.from(new Set(permutations.filter(p => sortedNumbers.includes(p))));
    const permutadosNoSorteados = Array.from(new Set(permutations.filter(p => !sortedNumbers.includes(p))));

    document.getElementById('permutadosSorteadosAleatorio').innerText = `Sorteados: ${permutadosSorteados.join(', ')}`;
    document.getElementById('permutadosNoSorteadosAleatorio').innerText = `No Sorteados: ${permutadosNoSorteados.join(', ')}`;
}



function cambiarImagen() {
    // Implementa esta función si necesitas cambiar una imagen u otro elemento visual según la lotería seleccionada.
}
