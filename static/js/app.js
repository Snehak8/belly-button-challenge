// Read in the data from the JSON file
function fetchData() {
    d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then(function(data) {
      // Call function to create dropdown options
      createDropdown(data.names);
  
      // Call function to initialize dashboard with default sample
      updateDashboard(data.names[0], data);
    });
  }
  
  // Function to create dropdown options
  function createDropdown(names) {
    var dropdown = d3.select("#selDataset");
  
    dropdown.selectAll("option")
      .data(names)
      .enter()
      .append("option")
      .attr("value", function(d) { return d; })
      .text(function(d) { return d; });
  }
  
  // Function to update dashboard elements based on selected sample
  function updateDashboard(sample, data) {
    // Fetch data for selected sample
    var sampleData = data.samples.filter(item => item.id === sample);
    var metadata = data.metadata.filter(item => item.id === parseInt(sample));
  
    // Update demographic info
    updateDemographicInfo(metadata);
  
    // Update bar chart
    updateBarChart(sampleData);
  
    // Update bubble chart
    updateBubbleChart(sampleData);
  }
  
  // Function to update demographic info display
  function updateDemographicInfo(metadata) {
    var metadataPanel = d3.select("#sample-metadata");
    metadataPanel.html("");
  
    Object.entries(metadata[0]).forEach(([key, value]) => {
      metadataPanel.append("p").text(`${key}: ${value}`);
    });
  }
  
  // Function to update bar chart
  function updateBarChart(sampleData) {
    var otuIds = sampleData[0].otu_ids.slice(0, 10).reverse();
    var sampleValues = sampleData[0].sample_values.slice(0, 10).reverse();
    var otuLabels = sampleData[0].otu_labels.slice(0, 10).reverse();
  
    var trace = {
      x: sampleValues,
      y: otuIds.map(id => `OTU ${id}`),
      text: otuLabels,
      type: "bar",
      orientation: "h"
    };
  
    var layout = {
      title: "Top 10 OTUs",
      yaxis: {
        automargin: true
      }
    };
  
    var data = [trace];
  
    Plotly.newPlot("bar", data, layout);
  }
  
  // Function to update bubble chart
  function updateBubbleChart(sampleData) {
    // Define color scale
    var color = d3.scaleOrdinal(d3.schemeCategory10);
    
    var trace = {
      x: sampleData[0].otu_ids,
      y: sampleData[0].sample_values,
      text: sampleData[0].otu_labels,
      mode: "markers",
      marker: {
        size: sampleData[0].sample_values,
        color: sampleData[0].otu_ids.map(id => color(id)) // Assign color based on otu_ids
      }
    };
  
    var layout = {
      title: "OTU Bubble Chart",
      xaxis: { title: "OTU ID" },
      yaxis: { title: "Sample Value" }
    };
  
    var data = [trace];
  
    Plotly.newPlot("bubble", data, layout);
  }
  
  // Function to handle dropdown change
  function optionChanged(sample) {
    d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then(function(data) {
      updateDashboard(sample, data);
    });
  }
  
  // Call the fetchData function to initialize the dashboard
  fetchData();
// Function to update gauge chart
function updateGaugeChart(wfreq) {
    // Define data for gauge chart
    var data = [
      {
        type: "indicator",
        mode: "gauge+number",
        value: wfreq,
        title: { text: "Belly Button Washing Frequency (Scrubs per week)", font: { size: 18 } },
        gauge: {
          axis: { range: [null, 9], tickvals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], ticktext: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] },
          bar: { color: "darkblue" },
          bgcolor: "white",
          borderwidth: 2,
          bordercolor: "gray",
          steps: [
            { range: [0, 1], color: "rgba(0, 255, 0, 0.1)" },
            { range: [1, 2], color: "rgba(0, 255, 0, 0.2)" },
            { range: [2, 3], color: "rgba(0, 255, 0, 0.3)" },
            { range: [3, 4], color: "rgba(0, 255, 0, 0.4)" },
            { range: [4, 5], color: "rgba(0, 255, 0, 0.5)" },
            { range: [5, 6], color: "rgba(0, 255, 0, 0.6)" },
            { range: [6, 7], color: "rgba(0, 255, 0, 0.7)" },
            { range: [7, 8], color: "rgba(0, 255, 0, 0.8)" },
            { range: [8, 9], color: "rgba(0, 255, 0, 0.9)" }
          ]
        }
      }
    ];
  
    // Define layout for gauge chart
    var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
  
    // Plot gauge chart
    Plotly.newPlot('gauge', data, layout);
  }
  
  // Function to update dashboard elements based on selected sample
  function updateDashboard(sample, data) {
    // Fetch data for selected sample
    var sampleData = data.samples.filter(item => item.id === sample);
    var metadata = data.metadata.filter(item => item.id === parseInt(sample));
  
    // Update demographic info
    updateDemographicInfo(metadata);
  
    // Update bar chart
    updateBarChart(sampleData);
  
    // Update bubble chart
    updateBubbleChart(sampleData);
  
    // Update gauge chart
    updateGaugeChart(metadata[0].wfreq);
  }
    
