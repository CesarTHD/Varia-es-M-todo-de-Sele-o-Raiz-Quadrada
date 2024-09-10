const { performance } = require('perf_hooks');

function bubbleSort(arr) {
    const len = arr.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}

function selectionArray(arr) {
    let numSecondArrays = Math.ceil(Math.sqrt(arr.length));
    const lengthSecondArrays = Math.ceil(arr.length / numSecondArrays);
    const secArrays = [];
    let greaterArray = [];
    let finalArray = [];

    // Preenchendo todas as Arrays secundárias e extraindo o maior elemento para a maior Array
    for (let i = 0; i < numSecondArrays; i++) {
        let aux = [];
        const inicio = i * lengthSecondArrays;
        const fim = Math.min((i + 1) * lengthSecondArrays, arr.length);
        for (let j = inicio; j < fim; j++) {
            aux.push(arr[j]);
        }
        let secArray = bubbleSort(aux);
        secArrays.push(secArray);

        if (secArray.length > 0) {
            greaterArray.push(secArray[0]);
        }
    }

    greaterArray = bubbleSort(greaterArray); // Necessária apenas uma vez

    // Loop preenche array final
    while (secArrays.length > 0) {
        finalArray.push(greaterArray.shift());

        // Encontra o índice do array secundário que continha o elemento recém-adicionado
        let indexBiggerArray = -1;
        for (let i = 0; i < secArrays.length; i++) {
            if (secArrays[i][0] === finalArray[finalArray.length - 1]) {
                indexBiggerArray = i;
                break;
            }
        }

        if (indexBiggerArray !== -1) {
            secArrays[indexBiggerArray].shift();

            if (secArrays[indexBiggerArray].length === 0) {
                secArrays.splice(indexBiggerArray, 1);
            } else {
                // Insira o novo menor elemento na posição correta em `greaterArray` manualmente
                let newElement = secArrays[indexBiggerArray][0];
                let insertPos = 0;

                // Encontrar posição de inserção correta
                while (insertPos < greaterArray.length && greaterArray[insertPos] < newElement) {
                    insertPos++;
                }
                
                greaterArray.splice(insertPos, 0, newElement);
            }
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

// console.log(numerosAleatorios)


for(let i=4; i<=7; i++){
    const numerosAleatorios = gerarNumerosAleatorios(10 ** i); // Gerando o vetor de números aleatórios
    let tempoDeExecucao = medirTempoExecucao(() => { // Medindo o tempo de execução do algoritmo
    selectionArray(numerosAleatorios);
    // console.log(selectionArray(numerosAleatorios));
    });
    console.log(`{n:10^${i}, time: ${tempoDeExecucao.toFixed(2)}},`);
}

// const tempoDeExecucao = medirTempoExecucao(() => {
//     console.log(selectionArray(numerosAleatorios));
// });

// console.log(`Tempo de execução: ${tempoDeExecucao.toFixed(2)} milissegundos`);
