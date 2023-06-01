// data URL
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Display Plots
function init() {

    // Select the dropdown menu
    let dropdown = d3.select("#selDataset");

    // Select and log json
    d3.json(url).then((data) => {
        console.log(data);

        // Get names
        let names = data.names;

        // Add names to the dropdown
        names.forEach((name) => {
            dropdown.append("option").text(name).property("value", name);
        });

        // Assign name to a variable
        let name = names[0];

        // Initiate functions
        demo(name);
        bar(name);
        bubble(name);
        gauge(name);
    });
}

// Demographic Info
function demo(Curr_Value) {
    // Select and log json
    d3.json(url).then((data) => {
        console.log(data);

        // Get metadata
        let metadata = data.metadata;
        
        // Filter data by id
        let filteredData = metadata.filter((meta) => meta.id == Curr_Value);
      
        // Assign object to a variable
        let obj = filteredData[0]
        
        // Clear previous data
        d3.select("#sample-metadata").html("");
  
        // Object.entries() returns an array of properties [key, value]
        let sel_data = Object.entries(obj);
        
        // Add metadata to Demographic Info
        sel_data.forEach(([key,value]) => {
            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });
    });
  }
  

// Bar chart
function bar(Curr_Value) {
    // Select and log json
    d3.json(url).then((data) => {
        console.log(data);

        // Get sample objects
        let samples = data.samples;

        // Filter data by id 
        let filteredData = samples.filter((sample) => sample.id === Curr_Value);

        // Assign object to a variable
        let obj = filteredData[0];
        
        // Trace for horizontal bar chart
        let trace = [{
            // Show first 10 results in descending order
            x: obj.sample_values.slice(0,10).reverse(),
            y: obj.otu_ids.slice(0,10).map((otu_id) => `OTU ${otu_id}`).reverse(),
            text: obj.otu_labels.slice(0,10).reverse(),
            type: "bar",
            orientation: "h"
        }];
        
        // Plot the bar chart
        Plotly.newPlot("bar", trace);
    });
}
  
// Bubble chart
function bubble(Curr_Value) {
    // Select and log json
    d3.json(url).then((data) => {
        console.log(data);

        // Get sample objects
        let samples = data.samples;
    
        // Filter data by id 
        let filteredData = samples.filter((sample) => sample.id === Curr_Value);
    
        // Assign object to a variable
        let obj = filteredData[0];
        
        // Trace for the bubble chart
        let trace = [{
            x: obj.otu_ids,
            y: obj.sample_values,
            text: obj.otu_labels,
            mode: "markers",
            marker: {
                size: obj.sample_values,
                color: obj.otu_ids,
            }
        }];
    
        // x-axis lengend
        let layout = {
            xaxis: {title: "OTU ID"}
        };
    
        // Plot the bubble chart
        Plotly.newPlot("bubble", trace, layout);
    });
}

// Gauge chart 
function gauge(Curr_Value) {
    // Select and log json 
    d3.json(url).then((data) => {
        console.log(data);

        // Get metadata
        let metadata = data.metadata;
        
        // Filter data by id
        let filteredData = metadata.filter((meta) => meta.id == Curr_Value);
      
        // Assign object to a variable
        let obj = filteredData[0]

        // Trace for the gauge chart
        let trace = [{
            domain: { x: [0, 1], y: [0, 1] },
            value: obj.wfreq,
            title: { text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week"},
            type: "indicator", 
            mode: "gauge+number",
            gauge: {
                axis: {range: [null, 10]}, 
                bar: {color: "rgb(128, 0, 128)"},
                steps: [
                    { range: [0, 1], color: "rgb(0, 255, 0)" },
                    { range: [1, 2], color: "rgb(51, 204, 0)" },
                    { range: [2, 3], color: "rgb(102, 153, 0)" },
                    { range: [3, 4], color: "rgb(153, 102, 0)" },
                    { range: [4, 5], color: "rgb(204, 51, 0)" },
                    { range: [5, 6], color: "rgb(255, 0, 0)" },
                    { range: [6, 7], color: "rgb(204, 0, 0)" },
                    { range: [7, 8], color: "rgb(153, 0, 0)" },
                    { range: [8, 9], color: "rgb(102, 0, 0)" },
                    { range: [9, 10], color: "rgb(51, 0, 0)" }
                ]
            }
        }];

         // Plot the gauge chart
         Plotly.newPlot("gauge", trace);
    });
}

// Toggle to new plots when option is changed
function newOption(Curr_Value) {
    demo(Curr_Value);
    bar(Curr_Value);
    bubble(Curr_Value);
    gauge(Curr_Value)
}

// First call
init();