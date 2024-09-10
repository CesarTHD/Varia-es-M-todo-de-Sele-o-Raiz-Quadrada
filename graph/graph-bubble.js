const data = {
    "BubbleSort": [
        {n:"10^4", time: 0.010},
        {n:"10^5", time: 0.093},
        {n:"10^6", time: 2.196},
        {n:"10^7", time: 130.107},
    ],
};

const config = {
    type: 'line',
    data: {
        labels: data.BubbleSort.map(item => item.n),
        datasets: [
            {
                label: 'Bubble Sort',
                data: data.BubbleSort.map(item => item.time),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Tempo (minutos)',
                    fontSize: 20, // Tamanho da fonte do título do eixo y
                },
                ticks: {
                    stepSize: 20,
                    callback: function(value, index, values) {
                        return value.toFixed(2); // Exibir apenas duas casas decimais
                    },
                    font: {
                        size: 16, // Tamanho da fonte dos rótulos do eixo y
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
                        size: 16, // Tamanho da fonte dos rótulos do eixo x
                    }
                }
            }
        },
        plugins: {
            title: {
                display: true,
                text: 'Gráfico Bubble Sort',
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
                            label += (context.parsed.y).toFixed(4) + ' segundos'; // Converter de milissegundos para minutos
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
