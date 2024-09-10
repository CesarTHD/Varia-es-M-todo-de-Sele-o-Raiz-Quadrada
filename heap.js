const { performance } = require('perf_hooks');

function heapifyDown(arr, length, parentIndex) {
    let largest = parentIndex;
    let left = parentIndex * 2 + 1;
    let right = left + 1;
    if (left < length && arr[left] > arr[largest]) {
        largest = left;
    }
    if (right < length && arr[right] > arr[largest]) {
        largest = right;
    }

    if (largest !== parentIndex) {
        [arr[parentIndex], arr[largest]] = [arr[largest], arr[parentIndex]];
        heapifyDown(arr, length, largest);
    }

    return arr;
}

function makeHeap(arr) {
    let length = arr.length;
    let lastParentNode = Math.floor(length / 2 - 1);
    let lastChild = length - 1;
    let arrAux = [];

    while (lastParentNode >= 0) {
        heapifyDown(arr, length, lastParentNode);
        lastParentNode--;
    }

    while (lastChild >= 0) {
        arrAux.push(arr[0]);
        [arr[0], arr[lastChild]] = [arr[lastChild], arr[0]];
        heapifyDown(arr, lastChild, 0);
        lastChild--;
    }
    return arrAux;
}

function selectionHeap(arr) {
    let numSecondHeaps = Math.ceil(Math.sqrt(arr.length));
    const lengthSecondHeaps = Math.ceil(arr.length / numSecondHeaps);
    const secHeaps = [];
    // Heap dos maiores
    let greaterHeap = [];
    let greater = null;
    let currentElem;
    // armazena o index da Heap que contem o maior elemento atual (greater) dentro da matriz secHeaps[]
    let indexBiggerHeap = -1;
    let finalArray = [];

    // Preenchendo todas as heaps secundárias e extraindo o maior elemento de para a maior heap
    for (let i = 0; i < numSecondHeaps; i++) {
        let aux = [];
        const inicio = i * lengthSecondHeaps;
        const fim = Math.min((i + 1) * lengthSecondHeaps, arr.length);
        for (let j = inicio; j < fim; j++) {
            aux.push(arr[j]);
        }
        let secHeap = makeHeap(aux);
        currentElem = secHeap[0];
        if (greater === null || currentElem > greater) {
            greater = currentElem;
            indexBiggerHeap = i;
        }
        greaterHeap.push(currentElem);
        secHeaps.push(secHeap);
    }

    greaterHeap = makeHeap(greaterHeap);

    while (secHeaps[indexBiggerHeap]) {
        greater = null;
        finalArray.push(greaterHeap[0]);

        // swap
        secHeaps[indexBiggerHeap][0] = secHeaps[indexBiggerHeap][secHeaps[indexBiggerHeap].length - 1];

        secHeaps[indexBiggerHeap].pop();

        //alert
        secHeaps[indexBiggerHeap] = heapifyDown(secHeaps[indexBiggerHeap], secHeaps[indexBiggerHeap].length, 0);

        if (secHeaps[indexBiggerHeap][0]) {
            greaterHeap[0] = secHeaps[indexBiggerHeap][0];
            greaterHeap = heapifyDown(greaterHeap, greaterHeap.length, 0);
            
            // Verifico se o novo maior elemento mudou de heap
            if (secHeaps[indexBiggerHeap][0] != greaterHeap[0]) {
                indexBiggerHeap = -1;
                for (let i = 0; i < secHeaps.length; i++) {
                    if (secHeaps[i][0] === greaterHeap[0]) {
                        indexBiggerHeap = i;
                        i = secHeaps.length + 1;
                    }
                }
            }
        } else {
            //  swap
            [secHeaps[indexBiggerHeap], secHeaps[secHeaps.length - 1]] = [secHeaps[secHeaps.length - 1], secHeaps[indexBiggerHeap]];
            secHeaps.pop();

            greater == null;
            for (let i = 0; i < secHeaps.length; i++) {
                currentElem = secHeaps[i][0];
                if (greater === null || currentElem > greater) {
                    greater = currentElem;
                    indexBiggerHeap = i;
                }
            }
            
            greaterHeap[0] = greaterHeap[greaterHeap.length-1];
            greaterHeap.pop();
            greaterHeap = heapifyDown(greaterHeap, greaterHeap.length, 0)
        }
    }

    return finalArray;
}

function gerarNumerosAleatorios(n) {
    const numerosAleatorios = [];
    for (let i = 0; i < n; i++) {
        const randomNum = Math.floor(Math.random() * 1000); // Gerando números aleatórios entre 0 e 999
        numerosAleatorios.push(randomNum);
    }
    return numerosAleatorios;
}

function medirTempoExecucao(funcao) {
    const inicio = performance.now(); // Captura o tempo de início em milissegundos
    funcao(); // Executa a função passada como parâmetro
    const fim = performance.now(); // Captura o tempo de término em milissegundos
    return fim - inicio; // Retorna o tempo decorrido em milissegundos
}



for(let i=4; i<=7; i++){
    const numerosAleatorios = gerarNumerosAleatorios(10 ** i); // Gerando o vetor de números aleatórios
    let tempoDeExecucao = medirTempoExecucao(() => { // Medindo o tempo de execução do algoritmo
    // console.log(selectionHeap(numerosAleatorios));
    selectionHeap(numerosAleatorios);
    });
    console.log(`{n:10^${i}, time: ${tempoDeExecucao.toFixed(2)}},`);
}

// const tamanho = 10 ** 1; // Tamanho do vetor
// const numerosAleatorios = gerarNumerosAleatorios(tamanho); // Gerando o vetor de números aleatórios
// // console.log(numerosAleatorios)

// const tempoDeExecucao = medirTempoExecucao(() => { // Medindo o tempo de execução do algoritmo
//     // console.log(selectionHeap([635, 948, 818, 595, 631, 833, 63, 864, 843, 143]));
//     // console.log(makeHeap([635, 948, 818, 595, 631, 833, 63, 864, 843, 143]));
//     // console.log(makeHeap(numerosAleatorios));
//     // console.log(selectionHeap(numerosAleatorios));
//     console.log(selectionHeap(numerosAleatorios));
// });

// console.log(`Tempo de execução: ${tempoDeExecucao.toFixed(2)} milissegundos`);