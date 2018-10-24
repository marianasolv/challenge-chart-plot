//This function will initialize the area for writing Javascript code
function initializeCodeEditor() {
  window.editor = ace.edit("editor");
  editor.setTheme("ace/theme/monokai"); //ou cobalt?
  editor.session.setMode("ace/mode/javascript");

  editor.setOptions({
    fontFamily: "Source Code Pro",
    fontSize: "10pt",
    showLineNumbers: true
  });

  $("#editor").resizable({
    handleSelector: ".splitter",
    resizeWidth: false
  });
};


var chart = null; //Global variable to store the chart

//This function will initialize a line chart with empy data
function initializeChart() {
  Highcharts.setOptions({
    global: {
      useUTC: false
    }
  });

  var $container = $('#line-chart');

  var chartingOptions = {
    chart: {
      renderTo: $container[0],
      type: 'line'
    },
    title: {
      text: ''
    },
    xAxis: {
      type: 'datetime',
      labels: {
        format: "{value:%H:%M}"
      }
    },
    yAxis: {
      title: {
        text: ''
      }
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
      itemStyle: {
        fontFamily: 'Source Sans Pro'
      }
    },
    series: [],
    responsive: {
      rules: [{
        condition: {
          minWidth: 200
        },
        credits: {
          enabled: false
        }
      }]
    }
  }

  chart = new Highcharts.Chart(chartingOptions);
};

//When DOM is ready, call the function to initialize the code editor
$( document ).ready(function() {
  initializeCodeEditor();
  initializeChart();
});


//This function will update de extreme values of the Chart on the x axis
//min and max values.
function updateChartBoundaries(min, max) {
  chart.xAxis[0].setExtremes(min,max);
};
