
# Hive

### Key Words
Housing, Mashup, NewYorkCity

### Datasets and function design
Using the format: [name] [link] [data type] [data columns used]
* [Neighborhood Names GIS] [https://catalog.data.gov/dataset/neighborhood-names-gis] [area] [the_geom, borough]
*  [NY Districts geoshapes] [[http://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/nycd/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=geojson](http://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/nycd/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=geojson)] [area] [BoroCD, geometry]
* [Crimes in NY] [[https://data.cityofnewyork.us/Public-Safety/NYPD-Complaint-Data-Historic/qgea-i56i/data](https://data.cityofnewyork.us/Public-Safety/NYPD-Complaint-Data-Historic/qgea-i56i/data)] [safety] [BORO_NM, OFNS_DESC, Lat_lon, CMPLNT_FR_DT]
* [Dataset contains information on New York City housing by building data] [[https://catalog.data.gov/dataset/housing-new-york-units-by-building](https://catalog.data.gov/dataset/housing-new-york-units-by-building)] [housing] [borough, lat, long, Extremely Low Income Units]

## Description


The "Hive" Project, is an application which will help to any student planning to attend to the NYU Stern who is trying to find the best district for a housing in NY . It is gonna take into account safety, distance and price, in order to get the perfect match for his/her housing.

Finding the best district for you to live has never been this easy!

## Map View
1.  [**Y**/N] Basic Map with specific location (your map is located in a meaningful place, city of west lafayette for example)
**Yes:** At the moment the webpage is loaded, the map is settle down at the NYU Stern.

2.  [**Y**/N] [describe] Any cover on the map (for example, cloud cover to show the weather effect)
**Yes:** In the map you can see a marker that indicates de NYU Stern, and the boundaries of each one of the 59 habitable districts.

## Data Visualization

1.  [**Y**/N]Use Graph? What is the type? (bar chart, pie chart, radar chart ...)
**Yes:** There're charts related to the treated information extracted from the datasets. This charts have the ranking done with the dataset information.
2.  [Y/**N**] Any interaction available on the graph? List them (enable click on numbers, drag on lines, change time/variables ...)
**No:** There're not any interaction available on the graph.


## Interaction Form


1.  [**Y**/N] [List] Any information output? list them. (text field, text area, label, plain HTML ...)
**Yes:** The information extracted from the datasets is showed in the charts, it is possible to export the main table to a CVS file.
2.  [**Y**/N] [List] Any operation option (filters)? List them. (search markets, search vegetables, filter based on price, sort based on convenience ...)
 **Yes:** The application gives information about the districts related to safety, distance and price. Both grouped and individually.
3.  [Y/**N**] [List] Any information input? List them. (comments, markers, user preference ...)
**No:** There're not any information inputs.
4.  [Y/**N**] [List] Interaction with Map? List them. (filter on price will affect map markers, sort on price will affect map markers, ...)
**No:** There're any interactions with Map.
5.  [Y/**N**] [List] Interaction with data visualization? List them. (filter, sort, set variables ...)
**No:** There're not any interactions with data visualization.

## Test Cases
The project has been tested on the next explorers:
* Google Chrome : Works as expected.
* IE : Internet Explorer: Google Map not working.
* Microsoft Edge: Works as expected.



## Additional information

Wish had more time to work on this project so I coul've developed as I wanted. The rest of my university obligations didn't allow me to get the result I wanted.
