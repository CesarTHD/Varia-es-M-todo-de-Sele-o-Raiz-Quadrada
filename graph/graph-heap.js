// milissegundos
// const data = {
//     "Heap": [
//         { "n": "10^4", "time": 15.31 },
//         { "n": "10^5", "time": 64.04 },
//         { "n": "10^6", "time": 990.49 },
//         { "n": "10^7", "time": 31802.53 },
//         { "n": "10^8", "time": 787271.73 },
//     ],
// };
function heapifyUp(array, index) {
    let parentIndex = Math.floor((index - 1) / 2);

    while (index > 0 && array[index] > array[parentIndex]) {
        [array[index], array[parentIndex]] = [array[parentIndex], array[index]];
        index = parentIndex;
        parentIndex = Math.floor((index - 1) / 2);
    }
}

// minutos
const data = {
    "Heap": [
        {n:"10^4", time: 0.015},
        {n:"10^5", time: 0.048},
        {n:"10^6", time: 0.994},
        {n:"10^7", time: 34.395},
    ],
};

const config = {
    type: 'line',
    data: {
        labels: data.Heap.map(item => item.n),
        datasets: [
            {
                label: 'Heap Sort',
                data: data.Heap.map(item => item.time),
                borderColor: 'rgb(150, 150, 200)',
                backgroundColor: 'rgba(150, 150, 200, 0.5)',
            }
        ]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Tempo (milissegundos)',
                    fontSize: 20, // Tamanho da fonte do título do eixo y
                },
                ticks: {
                    stepSize: 2,
                    callback: function(value, index, values) {
                        return value.toFixed(2); // Exibir apenas duas casas decimais
                    },
                    font: {
                        size:18, // Tamanho da fonte dos rótulos do eixo y
                    }
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Tamanho da entrada (n)',
                    fontSize: 20, // Tamanho da fonte do título do eixo x
                },
                ticks: {
                    font: {
                        size: 18, // Tamanho da fonte dos rótulos do eixo x
                    }
                }
            }
        },
        plugins: {
            title: {
                display: true,
                text: 'Gráfico Heap Sort',
                fontSize: 24, // Tamanho da fonte do título do gráfico
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';

                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += (context.parsed.y).toFixed(4) + ' milissegundos'; // Converter de milissegundos para minutos
                        }
                        return label;
                    }
                }
            }
        },
        interaction: {
            mode: 'nearest',
            intersect: false
        },
    }
};

const myChart = new Chart(
    document.getElementById('graph1'),
    config
);
