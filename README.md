# belly-button-challenge

Data Loading
The project uses the D3.js library to load the sample data from the provided JSON file. The data includes information about the top 10 Operational Taxonomic Units (OTUs) found in each sample, as well as demographic information for each individual.

Dashboard Components
Dropdown Menu
A dropdown menu is created using D3.js to allow users to select different samples from the loaded data. This dropdown serves as the primary user interface element for selecting samples.

Demographic Information Panel
The demographic information panel dynamically updates based on the selected sample. D3.js is used to display metadata corresponding to the selected sample, including demographic information such as age, gender, ethnicity, etc.

Bar Chart
A horizontal bar chart is created using Plotly.js to visualize the top 10 OTUs found in the selected sample. The sample values are used as the values for the bar chart, while the OTU IDs are used as labels.

Bubble Chart
A bubble chart is created using Plotly.js to display each sample's OTUs. The OTU IDs are used for the x values, sample values for the y values, and marker size for the marker size. Additionally, the OTU labels are used for the text values.

Gauge Chart
A gauge chart is created using Plotly.js to visualize the weekly washing frequency of the individual. The gauge chart accepts values ranging from 0 through 9 and updates dynamically based on the selected sample.

Dashboard Update
A function is implemented to update all visualizations on the dashboard whenever a new sample is selected from the dropdown menu. This function triggers the update of demographic information, bar chart, bubble chart, and gauge chart.
