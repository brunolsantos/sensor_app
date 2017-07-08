document.addEventListener("DOMContentLoaded", function (event) {
  {
    phChart = new Chartist.Line('.ph-chart', {
      labels: [1],
      series: [
        [
          { meta: 'PH', value: 1 }
        ]
      ]
    }, {
        low: 0,
        high: 10,
        fullWidth: true,
        plugins: [
          Chartist.plugins.tooltip()
        ]
      });
    turbChart = new Chartist.Line('.turb-chart', {
      labels: [1, 2, 3],
      series: [
        [
          { meta: 'TURBI.', value: 1 },
          { meta: 'TURBI.', value: 2 },
          { meta: 'TURBI.', value: 0.6 }
        ]
      ]
    }, {
        low: 0,
        high: 10,
        fullWidth: true,
        plugins: [
          Chartist.plugins.tooltip()
        ]
      });
    tempChart = new Chartist.Line('.temp-chart', {
      labels: [1, 2, 3],
      series: [
        [
          { meta: 'TEMP.', value: 1 },
          { meta: 'TEMP.', value: 2 },
          { meta: 'TEMP.', value: 0.6 }
        ]
      ]
    }, {
        low: 0,
        high: 100,
        fullWidth: true,
        plugins: [
          Chartist.plugins.tooltip()
        ]
      });

    nivelChart = new Chartist.Line('.nivel-chart', {
      labels: [1, 2, 3],
      series: [
        [
          { meta: 'NIVEL', value: 1 },
          { meta: 'NIVEL', value: 2 },
          { meta: 'NIVEL', value: 0.6 }
        ]
      ]
    }, {
        low: 0,
        high: 2,
        fullWidth: true,
        plugins: [
          Chartist.plugins.tooltip()
        ]
      });
  }
});
