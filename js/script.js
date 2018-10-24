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


//This function will recover the data as string from the input area, line by line, and
//parse each to a JSON Object.
function recoverJSONData() {
  var editor = ace.edit("editor"); //Find an ace editor instance
  var rawData = editor.getValue(); //Return the text in the code editor
  var arrayOfEvents = rawData.split("\n"); //Split the content of textarea by line
  for (i = 0; i < arrayOfEvents.length; i++) { //Transform each line in a JSON Object
    arrayOfEvents[i] = JSON.parse(arrayOfEvents[i]);
  }
  return arrayOfEvents;
};


//This function will get all time series from a event object of the type data
function getTimeSeries(jsonEvent, group, select) {
  timestamp = jsonEvent.timestamp;
  eventGroup = '';
  arrayOfSeries = [];

  for (i = 0; i < group.length; i++) {
    currentGroup = group[i];
    eventGroup += ' ' + jsonEvent[currentGroup];
  }
  eventGroup = eventGroup.replace(/^\s+/,"");

  for (i = 0; i < select.length; i++) {
    currentSelect = select[i];
    series = []
    name = eventGroup + ' ' + select[i];
    point = {x: timestamp, y: jsonEvent[currentSelect]};
    series.push(name, point);
    arrayOfSeries.push(series);
  }
  return arrayOfSeries;
};


//This function will check if a serie already exists in the chart by it's name
function checkIfSeriesExist(seriesName) {
  exists = false;
  for (i in chart.series) {
    if (seriesName == chart.series[i].name) {
      exists = true;
    }
  }
  return exists;
}

//This function will return the index of a given named series
function getSeriesIndex(seriesName) {
  index = null;
  for (i in chart.series) {
    if (seriesName == chart.series[i].name) {
      index = i;
    }
  }
  return index;
}

//This function will add data to the chart
//by determinating whether to create a new series or whether to add a new point to an existing series.
function addDataToChart(arrayOfSeries) {
  currentSeries = null;

  for(j = 0; j < arrayOfSeries.length; j++){
    currentSeries = arrayOfSeries[j];
    nameSeries = currentSeries[0];
    dataSeries = currentSeries[1];

    //check if the series exists in chart
    seriesExists = checkIfSeriesExist(nameSeries);

    //if the series does not exists, then a new series will be created
    if (seriesExists == false) {
      chart.addSeries({
        name: nameSeries, //Returns the name of the series
        data: [dataSeries] //Returns the point object {x, y}
      });
    } else {
      //if the series already exists, then create a new data point in it
      seriesIndex = getSeriesIndex(nameSeries);
      chart.series[seriesIndex].addPoint(dataSeries, true);
    }
  }
};


//This function will read one JSON Event Object at a time and
//treat it according to its type
function readEvents() {
  var count = 0;
  var currentEvent = null;
  var group = [];
  var select = [];
  var arrayOfEvents = recoverJSONData();

  while(arrayOfEvents[count] != null) { //While there's data, still reading
  currentEvent = arrayOfEvents[count];
  if(currentEvent.type == "start") {
    group = currentEvent.group;
    select = currentEvent.select;

    while(currentEvent.type != "stop") { //If it's a start event, only stops if it's a stop event
    count++;
    currentEvent = arrayOfEvents[count];
    console.log('current event: ', currentEvent)
    if (currentEvent.type == "span") {
      updateChartBoundaries(currentEvent.begin, currentEvent.end);
    }
    if (currentEvent.type == "data") {
      series = getTimeSeries(currentEvent, group, select);
      addDataToChart(series);
    }
  }
}
count++;
}
}

//This function will be triggred when the button to generate the chart is clicked
//It will "clean" the chart for a new set of data
function newChart() {
  initializeChart();
  readEvents();
}
