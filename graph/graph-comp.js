// Combine os dados dos dois algoritmos

const data = {
    "HeapSort": [
        {n:"10^4", time: 0.015},
        {n:"10^5", time: 0.048},
        {n:"10^6", time: 0.994},
        {n:"10^7", time: 34.395},
    ],
    "BubbleSort": [
        {n:"10^4", time: 0.010},
        {n:"10^5", time: 0.093},
        {n:"10^6", time: 2.196},
        {n:"10^7", time: 130.107},
    ],
};

const combinedData = {
    labels: data.HeapSort.map(item => item.n),
    datasets: [
        {
            label: 'Heap Sort',
            data: data.HeapSort.map(item => item.time),
            borderColor: 'rgb(150, 150, 200)',
            backgroundColor: 'rgba(150, 150, 200, 0.5)',
        },
        {
            label: 'Bubble Sort',
            data: data.BubbleSort.map(item => item.time),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }
    ]
};

// Atualize as configurações para o novo gráfico combinado
const combinedConfig = {
    type: 'line',
    data: combinedData,
    options: {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Tempo (segundos)',
                    fontSize: 20,
                },
                ticks: {
                    stepSize: 10,
                    callback: function(value, index, values) {
                        return value.toFixed(2);
                    },
                    font: {
                        size: 16,
                    }
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Tamanho da entrada (n)',
                    fontSize: 20,
                },
                ticks: {
                    font: {
                        size: 16,
                    }
                }
            }
        },
        plugins: {
            title: {
                display: true,
                text: 'Comparação de Algoritmos de Ordenação',
                fontSize: 24,
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
                            label += (context.parsed.y).toFixed(4) + ' segundos';
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

// Crie o novo gráfico combinado
const combinedChart = new Chart(
    document.getElementById('graph1'),
    combinedConfig
);
