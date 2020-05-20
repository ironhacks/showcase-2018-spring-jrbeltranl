//Datasets used
const N_NAMES_URL ="https://data.cityofnewyork.us/api/views/xyye-rtrs/rows.json?accessType=DOWNLOAD";
const D_GEOSHAPES_URL ="http://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/nycd/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=geojson";
const CRIMES_URL = "https://data.cityofnewyork.us/resource/9s4h-37hy.json";
const NY_HOUSING_URL ="https://data.cityofnewyork.us/api/views/hg8x-zxpr/rows.json?accessType=DOWNLOAD";

var nyuSternCoordenates = {lat: 40.7291, lng: -73.9965};              //Coordeantes of NYU Stern

var map;                                                              //Map variable
var infoRows = [];                                                    //Array containing the N_NAMES_URL dataset information
var geoInfoRows = [];                                                 //Array containing the geometric D_GEOSHAPES_URL dataset information
var housingInfoRows = [];                                             //Array containing the NY_HOUSING_URL dataset information
var crimeInfoRows = [];                                               //Array containing the CRIME_URL dataset information

var districtsInfo = [];

var distancesRank = [];                                               //Array containing distance from every neighborhood to the NYU Stern
var safetyRank = [];                                                  //Array containing the safety rank for each borough.
var affordabilityRank = [];                                           //Array containing the affordability rank for each borough.

var directionsService;                                                //To draw the routes on the map
var directionsRenderer;                                               //To draw the routes on the map

var datos = [];

const API_KEY = "AIzaSyCFalfoycG5PFQam2KTm9jpcUS9jkYbq0w";            //API key for Google Maps

//Function to init the Map
function initMap(){
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10 ,
    center: nyuSternCoordenates

  });

  university_marker = new google.maps.Marker({
    position: nyuSternCoordenates,
    map: map
  });

  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();

  map.data.loadGeoJson(D_GEOSHAPES_URL);
  map.data.setStyle({
  fillColor: 'green',
  fillOpacity: 0.2,
  strokeColor: 'blue',
  strokeWeight: 1
});}

//Function to get the N_NAMES_URL Dataset information and insert it into the arrays "infoRows"
function getNeighboorhoodData() {
  var tableReference = $("#tableBody")[0];
  var newRow, coordenates, neighborhood, borough, number, cd, commaPos, coordinatesLat, coordinatesLong, rowCoordenates, fullCoordenates;
  var data = $.get(N_NAMES_URL, function() {})
    .done(function() {
      $("#getData").prop("disabled", true);
      $("rankSafety").prop("disabled", false);

      var dataRow = data.responseJSON.data;
      var BronxCount = 0;
      var cd1count = 0;

      for(var k=0; k<6; k++){
        if(k=1){
          for (var i = 0; i < dataRow.length; i++) {
            rowCoordenates= dataRow[i][9];
            if(dataRow[i][16] == "Bronx"){

              ParenthesisPos = rowCoordenates.indexOf('(');
              newString = rowCoordenates.substring(ParenthesisPos+1, rowCoordenates.lenght);
              newStringSpace = newString.indexOf(' ');
              newStringEndParenthesis = newString.indexOf(')');

              coordinatesLong = newString.substring(0, newStringSpace);
              coordinatesLat = newString.substring(newStringSpace + 1, newStringEndParenthesis - 1);
              fullCoordenates = coordinatesLat + " , " +coordinatesLong;

              if((dataRow[i][10]=="Melrose")||(dataRow[i][10]=="Mott Haven")||(dataRow[i][10]=="Port Morris")){
                  infoRows.push([dataRow[i][16], dataRow[i][10], fullCoordenates, "Bronx CD1"]);
              }
              if((dataRow[i][10]=="Hunts Point")||(dataRow[i][10]=="Longwood")){
                  infoRows.push([dataRow[i][16], dataRow[i][10], fullCoordenates, "Bronx CD2"]);
              }
              if((dataRow[i][10]=="Claremont Village")||(dataRow[i][10]=="Concourse Village")||(dataRow[i][10]=="Crotona Park")||(dataRow[i][10]=="Morrisania")){
                  infoRows.push([dataRow[i][16], dataRow[i][10], fullCoordenates, "Bronx CD3"]);
              }
              if((dataRow[i][10]=="Concourse")||(dataRow[i][10]=="High  Bridge")||(dataRow[i][10]=="Mount Eden")){
                  infoRows.push([dataRow[i][16], dataRow[i][10], fullCoordenates, "Bronx CD4"]);
              }
              if((dataRow[i][10]=="Fordham")||(dataRow[i][10]=="Morris Heights")||(dataRow[i][10]=="Mount Hope")||(dataRow[i][10]=="University Heights")){
                  infoRows.push([dataRow[i][16], dataRow[i][10], fullCoordenates, "Bronx CD5"]);
              }
              if((dataRow[i][10]=="Bathgate")||(dataRow[i][10]=="Belmont")||(dataRow[i][10]=="East Tremont")||(dataRow[i][10]=="West Farms")){
                  infoRows.push([dataRow[i][16], dataRow[i][10], fullCoordenates, "Bronx CD6"]);
              }
              if((dataRow[i][10]=="Bedford Park")||(dataRow[i][10]=="Norwood")||(dataRow[i][10]=="University Heights")){
                  infoRows.push([dataRow[i][16], dataRow[i][10], fullCoordenates, "Bronx CD7"]);
              }
              if((dataRow[i][10]=="Fieldston")||(dataRow[i][10]=="Kingsbridge")||(dataRow[i][10]=="Kingsbridge Heights")||(dataRow[i][10]=="Riverdale")||(dataRow[i][10]=="Spuyten Duyvil")||(dataRow[i][10]=="Van Cortlandt Village")){
                  infoRows.push([dataRow[i][16], dataRow[i][10], fullCoordenates, "Bronx CD8"]);
              }
              if(dataRow[i][10]=="North Riverdale"){
                  infoRows.push([dataRow[i][16], dataRow[i][10], fullCoordenates, "Bronx CD8"]);
              }
              if((dataRow[i][10]=="Bronx River")||(dataRow[i][10]=="Bruckner")||(dataRow[i][10]=="Castle Hill")||(dataRow[i][10]=="Clason Point")||(dataRow[i][10]=="Harding Park")||(dataRow[i][10]=="Parkchester")||(dataRow[i][10]=="Soundview")){
                  infoRows.push([dataRow[i][16], dataRow[i][10], fullCoordenates, "Bronx CD9"]);
              }
              if((dataRow[i][10]=="Unionport")){
                  infoRows.push([dataRow[i][16], dataRow[i][10], fullCoordenates, "Bronx CD9"]);
              }

              if((dataRow[i][10]=="City Island")||(dataRow[i][10]=="Co-op City")||(dataRow[i][10]=="Locust Point")||(dataRow[i][10]=="Pelham Bay")||(dataRow[i][10]=="Silver Beach")||(dataRow[i][10]=="Throgs Neck")||(dataRow[i][10]=="Westchester Square")){
                  infoRows.push([dataRow[i][16], dataRow[i][10], fullCoordenates, "Bronx CD10"]);
              }
              if((dataRow[i][10]=="Country Club")||(dataRow[i][10]=="Edgewater Park")||(dataRow[i][10]=="Schuylerville")){
                  infoRows.push([dataRow[i][16], dataRow[i][10], fullCoordenates, "Bronx CD10"]);
              }
              if((dataRow[i][10]=="Allerton")||(dataRow[i][10]=="Bronxdale")||(dataRow[i][10]=="Indian Village")||(dataRow[i][10]=="Laconia")||(dataRow[i][10]=="Morris Park")||(dataRow[i][10]=="Pelham Gardens")||(dataRow[i][10]=="Pelham Parkway")){
                  infoRows.push([dataRow[i][16], dataRow[i][10], fullCoordenates, "Bronx CD11"]);
              }
              if(dataRow[i][10]=="Van Nest"){
                  infoRows.push([dataRow[i][16], dataRow[i][10], fullCoordenates, "Bronx CD11"]);
              }
              if((dataRow[i][10]=="Baychester")||(dataRow[i][10]=="Edenwald")||(dataRow[i][10]=="Eastchester")||(dataRow[i][10]=="Fish Bay")||(dataRow[i][10]=="Olinville")||(dataRow[i][10]=="Wakefield")||(dataRow[i][10]=="Williamsbridge")){
                  infoRows.push([dataRow[i][16], dataRow[i][10], fullCoordenates, "Bronx CD12"]);
              }
              if(dataRow[i][10]=="Woodlawn"){
                  infoRows.push([dataRow[i][16], dataRow[i][10], fullCoordenates, "Bronx CD12"]);
              }
            }
          }
        }
        if(k=2){
          for (var a = 0; a < dataRow.length; a++) {
            rowCoordenates = dataRow[a][9];
            if(dataRow[a][16] == "Brooklyn"){
              ParenthesisPos = rowCoordenates.indexOf('(');
              newString = rowCoordenates.substring(ParenthesisPos+1, rowCoordenates.lenght);
              newStringSpace = newString.indexOf(' ');
              newStringEndParenthesis = newString.indexOf(')');

              coordinatesLong = newString.substring(0, newStringSpace);
              coordinatesLat = newString.substring(newStringSpace + 1, newStringEndParenthesis - 1);
              fullCoordenates = coordinatesLat + " , " +coordinatesLong;

              if((dataRow[a][10]=="Greenpoint")||(dataRow[a][10]=="Williamsburg")){
                  infoRows.push([dataRow[a][16], dataRow[a][10], fullCoordenates, "Brooklyn CD1"]);
              }
              if((dataRow[a][10]=="Boerum Hill")||(dataRow[a][10]=="Brooklyn Heights")||(dataRow[a][10]=="Brooklyn Navy Yard")||(dataRow[a][10]=="Clinton Hill")||(dataRow[a][10]=="DUMBO")||(dataRow[a][10]=="Fort Greene")||(dataRow[a][10]=="Fulton Ferry")){
                  infoRows.push([dataRow[a][16], dataRow[a][10], fullCoordenates, "Brooklyn CD2"]);
              }
              if((dataRow[a][10]=="Fulton Mall")||(dataRow[a][10]=="Vinegar Hill")){
                  infoRows.push([dataRow[a][16], dataRow[a][10], fullCoordenates, "Brooklyn CD2"]);
              }
              if((dataRow[a][10]=="Bedford-Stuyvesant")||(dataRow[a][10]=="Ocean Hill")||(dataRow[a][10]=="Stuyvesant Heights")){
                  infoRows.push([dataRow[a][16], dataRow[a][10], fullCoordenates, "Brooklyn CD3"]);
              }
              if((dataRow[a][10]=="City Line")||(dataRow[a][10]=="Cypress Hills")||(dataRow[a][10]=="East New York")||(dataRow[a][10]=="Highland Park")||(dataRow[a][10]=="New Lots")||(dataRow[a][10]=="Starrett City")){
                  infoRows.push([dataRow[a][16], dataRow[a][10], fullCoordenates, "Brooklyn CD5"]);
              }
              if((dataRow[a][10]=="Carroll Gardens")||(dataRow[a][10]=="Cobble Hill")||(dataRow[a][10]=="Gowanus")||(dataRow[a][10]=="Park Slope")||(dataRow[a][10]=="Red Hook")){
                  infoRows.push([dataRow[a][16], dataRow[a][10], fullCoordenates, "Brooklyn CD6"]);
              }
              if((dataRow[a][10]=="Greenwood Heights")||(dataRow[a][10]=="Sunset Park")||(dataRow[a][10]=="Windsor Terrace")){
                  infoRows.push([dataRow[a][16], dataRow[a][10], fullCoordenates, "Brooklyn CD7"]);
              }
              if((dataRow[a][10]=="Crown Heights")||(dataRow[a][10]=="Prospect Heights")||(dataRow[a][10]=="Weeksville")){
                  infoRows.push([dataRow[a][16], dataRow[a][10], fullCoordenates, "Brooklyn CD8"]);
              }
              if((dataRow[a][10]=="Crown Heights")||(dataRow[a][10]=="Prospect Lefferts Gardens")||(dataRow[a][10]=="Wingate")){
                  infoRows.push([dataRow[a][16], dataRow[a][10], fullCoordenates, "Brooklyn CD9"]);
              }
              if((dataRow[a][10]=="Bay Ridge")||(dataRow[a][10]=="Dyker Heights")||(dataRow[a][10]=="Fort Hamilton")){
                  infoRows.push([dataRow[a][16], dataRow[a][10], fullCoordenates, "Brooklyn CD10"]);
              }
              if((dataRow[a][10]=="Bath Beach")||(dataRow[a][10]=="Bensonhurst")||(dataRow[a][10]=="Gravesend")||(dataRow[a][10]=="Mapleton")){
                  infoRows.push([dataRow[a][16], dataRow[a][10], fullCoordenates, "Brooklyn CD11"]);
              }
              if((dataRow[a][10]=="Borough Park")||(dataRow[a][10]=="Kensington")||(dataRow[a][10]=="Midwood")||(dataRow[a][10]=="Ocean Parkway")){
                  infoRows.push([dataRow[a][16], dataRow[a][10], fullCoordenates, "Brooklyn CD12"]);
              }
              if((dataRow[a][10]=="Bensonhurst")||(dataRow[a][10]=="Brighton Beach")||(dataRow[a][10]=="Coney Island")||(dataRow[a][10]=="Gravesend")||(dataRow[a][10]=="Sea Gate")){
                  infoRows.push([dataRow[a][16], dataRow[a][10], fullCoordenates, "Brooklyn CD13"]);
              }
              if((dataRow[a][10]=="Flatbush")||(dataRow[a][10]=="Kensington")||(dataRow[a][10]=="Midwood")||(dataRow[a][10]=="Ocean Parkway")){
                  infoRows.push([dataRow[a][16], dataRow[a][10], fullCoordenates, "Brooklyn CD14"]);
              }
              if(dataRow[a][10]==("East Gravesend")||(dataRow[a][10]=="Gerritsen Beach")||(dataRow[a][10]=="Homecrest")||(dataRow[a][10]=="Kings Bay")||(dataRow[a][10]=="Kings Highway")||(dataRow[a][10]=="Madison")||(dataRow[a][10]=="Manhattan Beach")){
                  infoRows.push([dataRow[a][16], dataRow[a][10], fullCoordenates, "Brooklyn CD15"]);
              }
              if((dataRow[a][10]=="Plum Beach")||(dataRow[a][10]=="Sheepshead Bay")){
                  infoRows.push([dataRow[a][16], dataRow[a][10], fullCoordenates, "Brooklyn CD15"]);
              }
              if((dataRow[a][10]=="Brownsville")||(dataRow[a][10]=="Ocean Hill")){
                  infoRows.push([dataRow[a][16], dataRow[a][10], fullCoordenates, "Brooklyn CD16"]);
              }
              if((dataRow[a][10]=="Ditmas Village")||(dataRow[a][10]=="East Flatbush")||(dataRow[a][10]=="Erasmus")||(dataRow[a][10]=="Farragut")||(dataRow[a][10]=="Remsen Village")||(dataRow[a][10]=="Rugby")){
                  infoRows.push([dataRow[a][16], dataRow[a][10], fullCoordenates, "Brooklyn CD17"]);
              }
              if((dataRow[a][10]=="Bergen Beach")||(dataRow[a][10]=="Canarsie")||(dataRow[a][10]=="Flatlands")||(dataRow[a][10]=="Georgetown")||(dataRow[a][10]=="Marine Park")||(dataRow[a][10]=="Mill Basin")||(dataRow[a][10]=="Mill Island")){
                  infoRows.push([dataRow[a][16], dataRow[a][10], fullCoordenates, "Brooklyn CD18"]);
              }
            }
          }
        }
        if(k=3){
          for (var b = 0; b < dataRow.length; b++) {
            rowCoordenates= dataRow[b][9];
            if(dataRow[b][16] == "Manhattan"){
              ParenthesisPos = rowCoordenates.indexOf('(');
              newString = rowCoordenates.substring(ParenthesisPos+1, rowCoordenates.lenght);
              newStringSpace = newString.indexOf(' ');
              newStringEndParenthesis = newString.indexOf(')');

              coordinatesLong = newString.substring(0, newStringSpace);
              coordinatesLat = newString.substring(newStringSpace + 1, newStringEndParenthesis - 1);
              fullCoordenates = coordinatesLat + " , " +coordinatesLong;

              if((dataRow[b][10]=="Battery Park City")||(dataRow[b][10]=="Financial District")||(dataRow[b][10]=="Tribeca")||(dataRow[b][10]=="Civic Center")){
                  infoRows.push([dataRow[b][16], dataRow[b][10],  fullCoordenates,"Manhattan CD1"]);
              }
              if((dataRow[b][10]=="Chinatown")||(dataRow[b][10]=="Greenwich Village")||(dataRow[b][10]=="Little Italy")||(dataRow[b][10]=="Lower East Side")||(dataRow[b][10]=="Noho")||(dataRow[b][10]=="Soho")||(dataRow[b][10]=="West Village")){
                  infoRows.push([dataRow[b][16], dataRow[b][10],  fullCoordenates,"Manhattan CD2"]);
              }
              if((dataRow[b][10]=="Alphabet City")||(dataRow[b][10]=="Chinatown")||(dataRow[b][10]=="East Village")||(dataRow[b][10]=="Lower East Side")||(dataRow[b][10]=="Two Bridges")){
                  infoRows.push([dataRow[b][16], dataRow[b][10],  fullCoordenates,"Manhattan CD3"]);
              }
              if((dataRow[b][10]=="Chelsea")||(dataRow[b][10]=="Flatiron")){
                  infoRows.push([dataRow[b][16], dataRow[b][10],  fullCoordenates,"Manhattan CD4"]);
              }
              if((dataRow[b][10]=="Midtown")||(dataRow[b][10]=="Clinton")){
                  infoRows.push([dataRow[b][16], dataRow[b][10],  fullCoordenates,"Manhattan CD5"]);
              }
              if((dataRow[b][10]=="Gramercy")||(dataRow[b][10]=="Kips Bay")||(dataRow[b][10]=="Murray Hill")||(dataRow[b][10]=="Peter Cooper Village")||(dataRow[b][10]=="Stuyvesant Town")||(dataRow[b][10]=="Sutton Place")||(dataRow[b][10]=="Tudor City")){
                  infoRows.push([dataRow[b][16], dataRow[b][10],  fullCoordenates,"Manhattan CD6"]);
              }
              if((dataRow[b][10]=="Turtle Bay")||(dataRow[b][10]=="Waterside Plaza")){
                  infoRows.push([dataRow[b][16], dataRow[b][10],  fullCoordenates,"Manhattan CD6"]);
              }
              if((dataRow[b][10]=="Lincoln Square")||(dataRow[b][10]=="Manhattan Valley")||(dataRow[b][10]=="Upper West Side")){
                  infoRows.push([dataRow[b][16], dataRow[b][10],  fullCoordenates,"Manhattan CD7"]);
              }
              if((dataRow[b][10]=="Lenox Hill")||(dataRow[b][10]=="Roosevelt Island")||(dataRow[b][10]=="Upper East Side")||(dataRow[b][10]=="Yorkville")||(dataRow[b][10]=="Carnegie Hill")){
                  infoRows.push([dataRow[b][16], dataRow[b][10],  fullCoordenates,"Manhattan CD8"]);
              }
              if((dataRow[b][10]=="Hamilton Heights")||(dataRow[b][10]=="Manhattanville")||(dataRow[b][10]=="Morningside Heights")||(dataRow[b][10]=="Central Harlem")){
                  infoRows.push([dataRow[b][16], dataRow[b][10],  fullCoordenates,"Manhattan CD9"]);
              }
              if(dataRow[b][10]=="Central Harlem"){
                  infoRows.push([dataRow[b][16], dataRow[b][10],  fullCoordenates,"Manhattan CD10"]);
              }
              if((dataRow[b][10]=="East Harlem")||(dataRow[b][10]=="Randall�s Island")||(dataRow[b][10]=="Spanish Harlem")||(dataRow[b][10]=="Wards Island")){
                  infoRows.push([dataRow[b][16], dataRow[b][10],  fullCoordenates,"Manhattan CD11"]);
              }
              if((dataRow[b][10]=="Inwood")||(dataRow[b][10]=="Washington Heights")){
                  infoRows.push([dataRow[b][16], dataRow[b][10],  fullCoordenates,"Manhattan CD12"]);
              }
            }
          }
        }
        if(k=4){
          for (var c = 0; c < dataRow.length; c++) {
            rowCoordenates = dataRow[c][9];
            if(dataRow[c][16] == "Queens"){
              ParenthesisPos = rowCoordenates.indexOf('(');
              newString = rowCoordenates.substring(ParenthesisPos+1, rowCoordenates.lenght);
              newStringSpace = newString.indexOf(' ');
              newStringEndParenthesis = newString.indexOf(')');

              coordinatesLong = newString.substring(0, newStringSpace);
              coordinatesLat = newString.substring(newStringSpace + 1, newStringEndParenthesis - 1);
              fullCoordenates = coordinatesLat + " , " +coordinatesLong;

              if((dataRow[c][10]=="Astoria Heights")||(dataRow[c][10]=="Ditmars")||(dataRow[c][10]=="Garden Bay")||(dataRow[c][10]=="Long Island City")||(dataRow[c][10]=="Old Astoria")||(dataRow[c][10]=="Queensbridge")||(dataRow[c][10]=="Ravenswood")){
                  infoRows.push([dataRow[c][16], dataRow[c][10], fullCoordenates,"Queens CD1"]);
              }
              if((dataRow[c][10]=="Steinway")||(dataRow[c][10]=="Woodside")){
                  infoRows.push([dataRow[c][16], dataRow[c][10], fullCoordenates,"Queens CD1"]);
              }
              if((dataRow[c][10]=="Hunters Point")||(dataRow[c][10]=="Long Island City")||(dataRow[c][10]=="Sunnyside Gardens")||(dataRow[c][10]=="Woodside")||(dataRow[c][10]=="Blissville")){
                  infoRows.push([dataRow[c][16], dataRow[c][10], fullCoordenates,"Queens CD2"]);
              }
              if((dataRow[c][10]=="East Elmhurst")||(dataRow[c][10]=="Jackson Heights")||(dataRow[c][10]=="North Corona")){
                  infoRows.push([dataRow[c][16], dataRow[c][10], fullCoordenates,"Queens CD3"]);
              }
              if((dataRow[c][10]=="South Corona")||(dataRow[c][10]=="Elmhurst")||(dataRow[c][10]=="Lefrak City  ")){
                  infoRows.push([dataRow[c][16], dataRow[c][10], fullCoordenates,"Queens CD4"]);
              }
              if((dataRow[c][10]=="Fresh Pond")||(dataRow[c][10]=="Glendale")||(dataRow[c][10]=="Maspeth")||(dataRow[c][10]=="Middle Village")||(dataRow[c][10]=="Liberty Park")||(dataRow[c][10]=="Ridgewood")){
                  infoRows.push([dataRow[c][16], dataRow[c][10], fullCoordenates,"Queens CD5"]);
              }
              if((dataRow[c][10]=="Forest Hills Gardens")||(dataRow[c][10]=="Rego Park")){
                  infoRows.push([dataRow[c][16], dataRow[c][10], fullCoordenates,"Queens CD6"]);
              }
              if((dataRow[c][10]=="Bay Terrace")||(dataRow[c][10]=="Beechhurst")||(dataRow[c][10]=="College Point")||(dataRow[c][10]=="Downtown Flushing")||(dataRow[c][10]=="Linden Hill")||(dataRow[c][10]=="Malba")||(dataRow[c][10]=="Queensboro Hill")){
                  infoRows.push([dataRow[c][16], dataRow[c][10], fullCoordenates,"Queens CD7"]);
              }
              if((dataRow[c][10]=="Whitestone")||(dataRow[c][10]=="Willets Point")){
                  infoRows.push([dataRow[c][16], dataRow[c][10], fullCoordenates,"Queens CD7"]);
              }
              if((dataRow[c][10]=="Briarwood")||(dataRow[c][10]=="Cunningham Heights")||(dataRow[c][10]=="Flushing South")||(dataRow[c][10]=="Fresh Meadows")||(dataRow[c][10]=="Hilltop Village")||(dataRow[c][10]=="Holliswood")||(dataRow[c][10]=="Jamaica Estates")){
                  infoRows.push([dataRow[c][16], dataRow[c][10], fullCoordenates,"Queens CD8"]);
              }
              if((dataRow[c][10]=="Kew Gardens Hills")||(dataRow[c][10]=="Pomonok Houses")||(dataRow[c][10]=="Utopia")){
                  infoRows.push([dataRow[c][16], dataRow[c][10], fullCoordenates,"Queens CD8"]);
              }
              if((dataRow[c][10]=="Kew Gardens")||(dataRow[c][10]=="Ozone Park")||(dataRow[c][10]=="Richmond Hill")||(dataRow[c][10]=="Woodhaven")||(dataRow[c][10]=="Jamaica Hills")){
                  infoRows.push([dataRow[c][16], dataRow[c][10], fullCoordenates,"Queens CD9"]);
              }
              if((dataRow[c][10]=="Howard Beach")||(dataRow[c][10]=="Lindenwood")||(dataRow[c][10]=="Richmond Hill")||(dataRow[c][10]=="South Ozone Park")||(dataRow[c][10]=="Tudor Village")){
                  infoRows.push([dataRow[c][16], dataRow[c][10], fullCoordenates,"Queens CD10"]);
              }
              if((dataRow[c][10]=="Auburndale")||(dataRow[c][10]=="Bayside")||(dataRow[c][10]=="Douglaston")||(dataRow[c][10]=="East Flushing")||(dataRow[c][10]=="Hollis Hills")||(dataRow[c][10]=="Little Neck")||(dataRow[c][10]=="Oakland Gardens")){
                  infoRows.push([dataRow[c][16], dataRow[c][10], fullCoordenates,"Queens CD11"]);
              }
              if((dataRow[c][10]=="Baisley Park")||(dataRow[c][10]=="Jamaica Center")||(dataRow[c][10]=="Hollis")||(dataRow[c][10]=="Rochdale")||(dataRow[c][10]=="St. Albans")||(dataRow[c][10]=="South Jamaica")||(dataRow[c][10]=="Springfield Gardens")){
                  infoRows.push([dataRow[c][16], dataRow[c][10], fullCoordenates,"Queens CD12"]);
              }
              if((dataRow[c][10]=="Bellerose")||(dataRow[c][10]=="Brookville")||(dataRow[c][10]=="Cambria Heights")||(dataRow[c][10]=="Floral Park")||(dataRow[c][10]=="Glen Oaks")||(dataRow[c][10]=="Laurelton")||(dataRow[c][10]=="Meadowmere")){
                  infoRows.push([dataRow[c][16], dataRow[c][10], fullCoordenates,"Queens CD13"]);
              }
              if((dataRow[c][10]=="New Hyde Park")||(dataRow[c][10]=="Queens Village")||(dataRow[c][10]=="Rosedale")){
                  infoRows.push([dataRow[c][16], dataRow[c][10], fullCoordenates,"Queens CD13"]);
              }
              if((dataRow[c][10]=="Arverne")||(dataRow[c][10]=="Bayswater")||(dataRow[c][10]=="Belle Harbor")||(dataRow[c][10]=="Breezy Point")||(dataRow[c][10]=="Edgemere")||(dataRow[c][10]=="Far Rockaway")||(dataRow[c][10]=="Neponsit")){
                  infoRows.push([dataRow[c][16], dataRow[c][10], fullCoordenates,"Queens CD14"]);
              }
              if((dataRow[c][10]=="Rockaway Park")||(dataRow[c][10]=="Broad Channel")||(dataRow[c][10]=="Somerville")){
                  infoRows.push([dataRow[c][16], dataRow[c][10], fullCoordenates,"Queens CD14"]);
              }
            }
          }
        }
        if(k=5){
          for (var d = 0; d < dataRow.length; d++) {
            rowCoordenates = dataRow[d][9];
            if(dataRow[d][16] == "Staten Island"){
              ParenthesisPos = rowCoordenates.indexOf('(');
              newString = rowCoordenates.substring(ParenthesisPos+1, rowCoordenates.lenght);
              newStringSpace = newString.indexOf(' ');
              newStringEndParenthesis = newString.indexOf(')');

              coordinatesLong = newString.substring(0, newStringSpace);
              coordinatesLat = newString.substring(newStringSpace + 1, newStringEndParenthesis - 1);
              fullCoordenates = coordinatesLat + " , " +coordinatesLong;

              if((dataRow[d][10]=="Arlington")||(dataRow[d][10]=="Castleton Corners")||(dataRow[d][10]=="Clifton")||(dataRow[d][10]=="Concord")||(dataRow[d][10]=="Elm Park")||(dataRow[d][10]=="Fort Wadsworth")||(dataRow[d][10]=="Graniteville")){
                infoRows.push([dataRow[d][16], dataRow[d][10], fullCoordenates, "Staten Island CD1"]);
              }
              if((dataRow[d][10]=="Grymes Hill")||(dataRow[d][10]=="Livingston")||(dataRow[d][10]=="Mariner's Harbor")||(dataRow[d][10]=="Meiers Corners")||(dataRow[d][10]=="New Brighton")||(dataRow[d][10]=="Port Ivory")||(dataRow[d][10]=="Port Richmond")){
                infoRows.push([dataRow[d][16], dataRow[d][10], fullCoordenates, "Staten Island CD1"]);
              }
              if((dataRow[d][10]=="Randall Manor")||(dataRow[d][10]=="Rosebank")||(dataRow[d][10]=="St. George")||(dataRow[d][10]=="Shore Acres")||(dataRow[d][10]=="Silver Lake")||(dataRow[d][10]=="Stapleton")||(dataRow[d][10]=="Tompkinsville")){
                infoRows.push([dataRow[d][16], dataRow[d][10], fullCoordenates, "Staten Island CD1"]);
              }
              if((dataRow[d][10]=="West Brighton")||(dataRow[d][10]=="Westerleigh")||(dataRow[d][10]=="Park Hill")||(dataRow[d][10]=="Howland Hook")){
                infoRows.push([dataRow[d][16], dataRow[d][10], fullCoordenates, "Staten Island CD1"]);
              }
              if((dataRow[d][10]=="Arrochar")||(dataRow[d][10]=="Bloomfield")||(dataRow[d][10]=="Bulls Head")||(dataRow[d][10]=="Chelsea")||(dataRow[d][10]=="Dongan Hills")||(dataRow[d][10]=="Egbertville")||(dataRow[d][10]=="Emerson Hill")){
                infoRows.push([dataRow[d][16], dataRow[d][10], fullCoordenates, "Staten Island CD2"]);
              }
              if((dataRow[d][10]=="Grant City")||(dataRow[d][10]=="Grasmere")||(dataRow[d][10]=="Midland Beach")||(dataRow[d][10]=="New Dorp Beach")||(dataRow[d][10]=="New Springville")||(dataRow[d][10]=="Oakwood")||(dataRow[d][10]=="Ocean Breeze")){
                infoRows.push([dataRow[d][16], dataRow[d][10], fullCoordenates, "Staten Island CD2"]);
              }
              if((dataRow[d][10]=="Old Town")||(dataRow[d][10]=="South Beach")||(dataRow[d][10]=="Todt Hill")||(dataRow[d][10]=="Travis")||(dataRow[d][10]=="Heartland Village")||(dataRow[d][10]=="Manor Heights")||(dataRow[d][10]=="Willowbrook")){
                infoRows.push([dataRow[d][16], dataRow[d][10], fullCoordenates, "Staten Island CD2"]);
              }
              if(dataRow[d][10]=="Lighthouse Hill"){
                infoRows.push([dataRow[d][16], dataRow[d][10], fullCoordenates, "Staten Island CD2"]);
              }
              if((dataRow[d][10]=="Annadale")||(dataRow[d][10]=="Arden Heights")||(dataRow[d][10]=="Bay Terrace")||(dataRow[d][10]=="Charleston")||(dataRow[d][10]=="Eltingville")||(dataRow[d][10]=="Great Kills")||(dataRow[d][10]=="Greenridge")){
                infoRows.push([dataRow[d][16], dataRow[d][10], fullCoordenates, "Staten Island CD3"]);
              }
              if((dataRow[d][10]=="Huguenot")||(dataRow[d][10]=="Pleasant Plains")||(dataRow[d][10]=="Prince's Bay")||(dataRow[d][10]=="Richmond Town")||(dataRow[d][10]=="Rossville")||(dataRow[d][10]=="Tottenville")||(dataRow[d][10]=="Woodrow")){
                infoRows.push([dataRow[d][16], dataRow[d][10], fullCoordenates, "Staten Island CD3"]);
              }
              if(dataRow[d][10]=="Butler Manor"){
                infoRows.push([dataRow[d][16], dataRow[d][10], fullCoordenates, "Staten Island CD3"]);
              }

            }
          }
        }
      }
      getDistricts();
      getGeoShapesData();
      getHousingData();
      getCrimes();
      console.log(infoRows);
      alert("The information has been loaded succesufully. Please proceed to rank the information.")
    })

    .fail(function (error) {
      alert(error);
    })
}

//Funcion to get the D_GEOSHAPES_URL Dataset information and insert it into the arrays "geoInfoRows"
function getGeoShapesData() {
  $("#getGeoShapesData").prop("disabled", true);
  $("#toGoogleMapsCoordenates").prop("disabled", false);
  var GeoData = $.get(D_GEOSHAPES_URL, function() {})
    .done(function() {
      var GeoDataRow = JSON.parse(GeoData.responseText).features;
      for (var i = 0; i < GeoDataRow.length; i++) {
        geoInfoRows[i] = [GeoDataRow[i].properties.BoroCD, GeoDataRow[i].geometry.coordinates, GeoDataRow[i].properties.Shape__Area]
      }
      geoInfoRows = geoInfoRows.sort();
      geoInfoRows.splice(12, 1);
      geoInfoRows.splice(24, 3);
      geoInfoRows.splice(42, 2);
      geoInfoRows.splice(56, 5);
      geoInfoRows.splice(59, 1);

      console.log(geoInfoRows);
    })
    .fail(function (error) {
      console.log(error);
    })
    //console.log("Fin-GeoData");
}

//Function to get the NY_HOUSING_URL Dataset information and insert it into the array "housingInfoRows"
function getHousingData() {
  $("#getHousingData").prop("disabled", true);
  $("#rankAffordability").prop("disabled", false);
  var HousingData = $.get(NY_HOUSING_URL, function() {})
    .done(function() {
      //console.log("Done-HousingData");
      //console.log(HousingData.responseJSON.data[0]);
      var HousingDataRow = HousingData.responseJSON.data;
      for (var i = 0; i < HousingDataRow.length; i++) {
        var lat_lon = HousingDataRow[i][25] + " , "+ HousingDataRow[i][26];
        housingInfoRows[i]= [HousingDataRow[i][15], lat_lon , HousingDataRow[i][31]];
      }
      console.log(housingInfoRows);
    })
    .fail(function (error) {
      console.log(error);
    })
}

//Funcion to get the CRIME_URL Dataset information.
function getCrimes(){
  $("#getCrimeData").prop("disabled", true);
  var crimes;
  var data = $.ajax({
    url: CRIMES_URL,
    type: 'GET',
    dataType: 'json',
    data: {"cmplnt_fr_dt":"2015-12-31T00:00:00"}
  })
  .done(function() {
    $("#rankSafety").prop("disabled", false);
    crimes = data.responseJSON;

    for (var i = 0; i < crimes.length; i++) {
      crimeInfoRows[i] = [crimes[i].boro_nm , crimes[i].lat_lon];
    }
    console.log(crimeInfoRows);
  })

}

//Function to get the distance from each neighborhood to the NYU Stern
function rankDistance(){

  var lat1 = 40.7291 ;
  var lon1 = -73.9965 ;
  var averageBronxCD = [0];
  var averageManhattanCD =[0];
  var averageBrooklynCD= [0];
  var averageQueensCD= [0];
  var averageStatenIslandCD= [0];
  var count;

  var StringCoordenate, commaPos, lat2, lon2, distance, top ;

  for (var c = 0; c < 18; c++){
    if (c<3) {
      averageStatenIslandCD[c]=[0,0];
    }
    if (c<12) {
      averageBronxCD[c] = [0,0];
      averageManhattanCD[c] =[0,0];
    }
    if (c<14) {
      averageQueensCD[c]=[0,0];
    }

    averageBrooklynCD[c]=[0,0];
  }


  for (var i = 0; i < infoRows.length; i++) {

    StringCoordenate = infoRows[i][2];
    StringNeighborhood = infoRows[i][1];
    commaPos = StringCoordenate.indexOf(',');
    lat2 = parseFloat(StringCoordenate.substring(0, commaPos));
    lon2 = parseFloat(StringCoordenate.substring(commaPos + 1, StringCoordenate.length));
    distance = rankDistanceFromLatLonInKm(lat1, lon1, lat2, lon2);

    //Bronx
    if (infoRows[i][3] == "Bronx CD1") {
      averageBronxCD[0][0] = averageBronxCD[0][0] + distance;
      averageBronxCD[0][1] = averageBronxCD[0][1] + 1;
    }
    if (infoRows[i][3] == "Bronx CD2") {
      averageBronxCD[1][0] = averageBronxCD[1][0] + distance;
      averageBronxCD[1][1] = averageBronxCD[1][1] + 1;
    }
    if (infoRows[i][3] == "Bronx CD3") {
      averageBronxCD[2][0] = averageBronxCD[2][0] + distance;
      averageBronxCD[2][1] = averageBronxCD[2][1] + 1;
    }
    if (infoRows[i][3] == "Bronx CD4") {
      averageBronxCD[3][0] = averageBronxCD[4][0] + distance;
      averageBronxCD[3][1] = averageBronxCD[4][1] + 1;
    }
    if (infoRows[i][3] == "Bronx CD5") {
      averageBronxCD[4][0] = averageBronxCD[4][0] + distance;
      averageBronxCD[4][1] = averageBronxCD[4][1] + 1;
    }
    if (infoRows[i][3] == "Bronx CD6") {
      averageBronxCD[5][0] = averageBronxCD[5][0] + distance;
      averageBronxCD[5][1] = averageBronxCD[5][1] + 1;
    }
    if (infoRows[i][3] == "Bronx CD7") {
      averageBronxCD[6][0] = averageBronxCD[6][0] + distance;
      averageBronxCD[6][1] = averageBronxCD[6][1] + 1;
    }
    if (infoRows[i][3] == "Bronx CD8") {
      averageBronxCD[7][0] = averageBronxCD[7][0] + distance;
      averageBronxCD[7][1] = averageBronxCD[7][1] + 1;
    }
    if (infoRows[i][3] == "Bronx CD9") {
      averageBronxCD[8][0] = averageBronxCD[8][0] + distance;
      averageBronxCD[8][1] = averageBronxCD[8][1] + 1;
    }
    if (infoRows[i][3] == "Bronx CD10") {
      averageBronxCD[9][0] = averageBronxCD[9][0] + distance;
      averageBronxCD[9][1] = averageBronxCD[9][1] + 1;
    }
    if (infoRows[i][3] == "Bronx CD11") {
      averageBronxCD[10][0] = averageBronxCD[10][0] + distance;
      averageBronxCD[10][1] = averageBronxCD[10][1] + 1;
    }
    if (infoRows[i][3] == "Bronx CD12") {
      averageBronxCD[11][0] = averageBronxCD[11][0] + distance;
      averageBronxCD[11][1] = averageBronxCD[11][1] + 1;
    }

    //Manhattan
    if (infoRows[i][3] == "Manhattan CD1") {
      averageManhattanCD[0][0] = averageManhattanCD[0][0] + distance;
      averageManhattanCD[0][1] = averageManhattanCD[0][1] + 1;
    }
    if (infoRows[i][3] == "Manhattan CD2") {
      averageManhattanCD[1][0] = averageManhattanCD[1][0] + distance;
      averageManhattanCD[1][1] = averageManhattanCD[1][1] + 1;
    }
    if (infoRows[i][3] == "Manhattan CD3") {
      averageManhattanCD[2][0] = averageManhattanCD[2][0] + distance;
      averageManhattanCD[2][1] = averageManhattanCD[2][1] + 1;
    }
    if (infoRows[i][3] == "Manhattan CD4") {
      averageManhattanCD[3][0] = averageManhattanCD[4][0] + distance;
      averageManhattanCD[3][1] = averageManhattanCD[4][1] + 1;
    }
    if (infoRows[i][3] == "Manhattan CD5") {
      averageManhattanCD[4][0] = averageManhattanCD[4][0] + distance;
      averageManhattanCD[4][1] = averageManhattanCD[4][1] + 1;
    }
    if (infoRows[i][3] == "Manhattan CD6") {
      averageManhattanCD[5][0] = averageManhattanCD[5][0] + distance;
      averageManhattanCD[5][1] = averageManhattanCD[5][1] + 1;
    }
    if (infoRows[i][3] == "Manhattan CD7") {
      averageManhattanCD[6][0] = averageManhattanCD[6][0] + distance;
      averageManhattanCD[6][1] = averageManhattanCD[6][1] + 1;
    }
    if (infoRows[i][3] == "Manhattan CD8") {
      averageManhattanCD[7][0] = averageManhattanCD[7][0] + distance;
      averageManhattanCD[7][1] = averageManhattanCD[7][1] + 1;
    }
    if (infoRows[i][3] == "Manhattan CD9") {
      averageManhattanCD[8][0] = averageManhattanCD[8][0] + distance;
      averageManhattanCD[8][1] = averageManhattanCD[8][1] + 1;
    }
    if (infoRows[i][3] == "Manhattan CD10") {
      averageManhattanCD[9][0] = averageManhattanCD[9][0] + distance;
      averageManhattanCD[9][1] = averageManhattanCD[9][1] + 1;
    }
    if (infoRows[i][3] == "Manhattan CD11") {
      averageManhattanCD[10][0] = averageManhattanCD[10][0] + distance;
      averageManhattanCD[10][1] = averageManhattanCD[10][1] + 1;
    }
    if (infoRows[i][3] == "Manhattan CD12") {
      averageManhattanCD[11][0] = averageManhattanCD[11][0] + distance;
      averageManhattanCD[11][1] = averageManhattanCD[11][1] + 1;
    }

    //Brooklyn
    if (infoRows[i][3] == "Brooklyn CD1") {
      averageBrooklynCD[0][0] = averageBrooklynCD[0][0] + distance;
      averageBrooklynCD[0][1] = averageBrooklynCD[0][1] + 1;
    }
    if (infoRows[i][3] == "Brooklyn CD2") {
      averageBrooklynCD[1][0] = averageBrooklynCD[1][0] + distance;
      averageBrooklynCD[1][1] = averageBrooklynCD[1][1] + 1;
    }
    if (infoRows[i][3] == "Brooklyn CD3") {
      averageBrooklynCD[2][0] = averageBrooklynCD[2][0] + distance;
      averageBrooklynCD[2][1] = averageBrooklynCD[2][1] + 1;
    }
    if (infoRows[i][3] == "Brooklyn CD4") {
      averageBrooklynCD[3][0] = averageBrooklynCD[4][0] + distance;
      averageBrooklynCD[3][1] = averageBrooklynCD[4][1] + 1;
    }
    if (infoRows[i][3] == "Brooklyn CD5") {
      averageBrooklynCD[4][0] = averageBrooklynCD[4][0] + distance;
      averageBrooklynCD[4][1] = averageBrooklynCD[4][1] + 1;
    }
    if (infoRows[i][3] == "Brooklyn CD6") {
      averageBrooklynCD[5][0] = averageBrooklynCD[5][0] + distance;
      averageBrooklynCD[5][1] = averageBrooklynCD[5][1] + 1;
    }
    if (infoRows[i][3] == "Brooklyn CD7") {
      averageBrooklynCD[6][0] = averageBrooklynCD[6][0] + distance;
      averageBrooklynCD[6][1] = averageBrooklynCD[6][1] + 1;
    }
    if (infoRows[i][3] == "Brooklyn CD8") {
      averageBrooklynCD[7][0] = averageBrooklynCD[7][0] + distance;
      averageBrooklynCD[7][1] = averageBrooklynCD[7][1] + 1;
    }
    if (infoRows[i][3] == "Brooklyn CD9") {
      averageBrooklynCD[8][0] = averageBrooklynCD[8][0] + distance;
      averageBrooklynCD[8][1] = averageBrooklynCD[8][1] + 1;
    }
    if (infoRows[i][3] == "Brooklyn CD10") {
      averageBrooklynCD[9][0] = averageBrooklynCD[9][0] + distance;
      averageBrooklynCD[9][1] = averageBrooklynCD[9][1] + 1;
    }
    if (infoRows[i][3] == "Brooklyn CD11") {
      averageBrooklynCD[10][0] = averageBrooklynCD[10][0] + distance;
      averageBrooklynCD[10][1] = averageBrooklynCD[10][1] + 1;
    }
    if (infoRows[i][3] == "Brooklyn CD12") {
      averageBrooklynCD[11][0] = averageBrooklynCD[11][0] + distance;
      averageBrooklynCD[11][1] = averageBrooklynCD[11][1] + 1;
    }
    if (infoRows[i][3] == "Brooklyn CD13") {
      averageBrooklynCD[12][0] = averageBrooklynCD[12][0] + distance;
      averageBrooklynCD[12][1] = averageBrooklynCD[12][1] + 1;
    }
    if (infoRows[i][3] == "Brooklyn CD14") {
      averageBrooklynCD[13][0] = averageBrooklynCD[13][0] + distance;
      averageBrooklynCD[13][1] = averageBrooklynCD[13][1] + 1;
    }
    if (infoRows[i][3] == "Brooklyn CD15") {
      averageBrooklynCD[14][0] = averageBrooklynCD[14][0] + distance;
      averageBrooklynCD[14][1] = averageBrooklynCD[14][1] + 1;
    }
    if (infoRows[i][3] == "Brooklyn CD16") {
      averageBrooklynCD[15][0] = averageBrooklynCD[15][0] + distance;
      averageBrooklynCD[15][1] = averageBrooklynCD[15][1] + 1;
    }
    if (infoRows[i][3] == "Brooklyn CD17") {
      averageBrooklynCD[16][0] = averageBrooklynCD[16][0] + distance;
      averageBrooklynCD[16][1] = averageBrooklynCD[16][1] + 1;
    }
    if (infoRows[i][3] == "Brooklyn CD18") {
      averageBrooklynCD[17][0] = averageBrooklynCD[17][0] + distance;
      averageBrooklynCD[17][1] = averageBrooklynCD[17][1] + 1;
    }

    //Queens
    if (infoRows[i][3] == "Queens CD1") {
      averageQueensCD[0][0] = averageQueensCD[0][0] + distance;
      averageQueensCD[0][1] = averageQueensCD[0][1] + 1;
    }
    if (infoRows[i][3] == "Queens CD2") {
      averageQueensCD[1][0] = averageQueensCD[1][0] + distance;
      averageQueensCD[1][1] = averageQueensCD[1][1] + 1;
    }
    if (infoRows[i][3] == "Queens CD3") {
      averageQueensCD[2][0] = averageQueensCD[2][0] + distance;
      averageQueensCD[2][1] = averageQueensCD[2][1] + 1;
    }
    if (infoRows[i][3] == "Queens CD4") {
      averageQueensCD[3][0] = averageQueensCD[4][0] + distance;
      averageQueensCD[3][1] = averageQueensCD[4][1] + 1;
    }
    if (infoRows[i][3] == "Queens CD5") {
      averageQueensCD[4][0] = averageQueensCD[4][0] + distance;
      averageQueensCD[4][1] = averageQueensCD[4][1] + 1;
    }
    if (infoRows[i][3] == "Queens CD6") {
      averageQueensCD[5][0] = averageQueensCD[5][0] + distance;
      averageQueensCD[5][1] = averageQueensCD[5][1] + 1;
    }
    if (infoRows[i][3] == "Queens CD7") {
      averageQueensCD[6][0] = averageQueensCD[6][0] + distance;
      averageQueensCD[6][1] = averageQueensCD[6][1] + 1;
    }
    if (infoRows[i][3] == "Queens CD8") {
      averageQueensCD[7][0] = averageQueensCD[7][0] + distance;
      averageQueensCD[7][1] = averageQueensCD[7][1] + 1;
    }
    if (infoRows[i][3] == "Queens CD9") {
      averageQueensCD[8][0] = averageQueensCD[8][0] + distance;
      averageQueensCD[8][1] = averageQueensCD[8][1] + 1;
    }
    if (infoRows[i][3] == "Queens CD10") {
      averageQueensCD[9][0] = averageQueensCD[9][0] + distance;
      averageQueensCD[9][1] = averageQueensCD[9][1] + 1;
    }
    if (infoRows[i][3] == "Queens CD11") {
      averageQueensCD[10][0] = averageQueensCD[10][0] + distance;
      averageQueensCD[10][1] = averageQueensCD[10][1] + 1;
    }
    if (infoRows[i][3] == "Queens CD12") {
      averageQueensCD[11][0] = averageQueensCD[11][0] + distance;
      averageQueensCD[11][1] = averageQueensCD[11][1] + 1;
    }
    if (infoRows[i][3] == "Queens CD13") {
      averageQueensCD[12][0] = averageQueensCD[12][0] + distance;
      averageQueensCD[12][1] = averageQueensCD[12][1] + 1;
    }
    if (infoRows[i][3] == "Queens CD14") {
      averageQueensCD[13][0] = averageQueensCD[13][0] + distance;
      averageQueensCD[13][1] = averageQueensCD[13][1] + 1;
    }

    //Staten Island
    if (infoRows[i][3] == "Staten Island CD1") {
      averageStatenIslandCD[0][0] = averageStatenIslandCD[0][0] + distance;
      averageStatenIslandCD[0][1] = averageStatenIslandCD[0][1] + 1;
    }
    if (infoRows[i][3] == "Staten Island CD2") {
      averageStatenIslandCD[1][0] = averageStatenIslandCD[1][0] + distance;
      averageStatenIslandCD[1][1] = averageStatenIslandCD[1][1] + 1;
    }
    if (infoRows[i][3] == "Staten Island CD3") {
      averageStatenIslandCD[2][0] = averageStatenIslandCD[2][0] + distance;
      averageStatenIslandCD[2][1] = averageStatenIslandCD[2][1] + 1;
    }
  }


  count =0;


  for (var j = 0; j < averageBronxCD.length; j++) {
    averageBronxCD[j][0] = averageBronxCD[j][0]/averageBronxCD[j][1];
    distancesRank[j] = ["Bronx CD"+(j+1), averageBronxCD[j][0] , 0];
  }

  count = averageBronxCD.length;
  for (var k = 0; k < averageManhattanCD.length; k++) {
    averageManhattanCD[k][0] = averageManhattanCD[k][0]/averageManhattanCD[k][1];
    distancesRank[count+k] = ["Manhattan CD"+(k+1), averageManhattanCD[k][0] , 0];
  }
  count = count+averageManhattanCD.length;
  for (var l = 0; l < averageBrooklynCD.length; l++) {
    if (l!=3) {
      averageBrooklynCD[l][0] = averageBrooklynCD[l][0]/averageBrooklynCD[l][1];
      distancesRank[count+l] = ["Brooklyn CD"+(l+1), averageBrooklynCD[l][0] , 0];
    }
  }
  count = count+averageBrooklynCD.length;
  for (var m = 0; m < averageQueensCD.length; m++) {
    averageQueensCD[m][0] = averageQueensCD[m][0]/averageQueensCD[m][1];
    distancesRank[count+m] = ["Queens CD"+(m+1), averageQueensCD[m][0] , 0];
  }
  count = count+averageQueensCD.length;
  for (var n = 0; n < averageStatenIslandCD.length; n++) {
    averageStatenIslandCD[n][0] = averageStatenIslandCD[n][0]/averageStatenIslandCD[n][1];
    distancesRank[count+n] = ["Staten Island CD"+(n+1), averageStatenIslandCD[n][0] , 0];
  }

  distancesRank.sort(compareSecondColumn);

  top = 100;
  for (var p = 0; p < (distancesRank.length-1); p++) {

    distancesRank[p][2] = top/(p+1);
  }
  console.log(distancesRank);
  var tableReference = $("#tableBody1")[0];
  var newRow, nyd, dis, rank, score;
  for (var s = 0; s < (distancesRank.length-1); s++) {
    newRow = tableReference.insertRow(tableReference.length);
    rank = newRow.insertCell();
    nyd  = newRow.insertCell();
    dis = newRow.insertCell();
    score = newRow.insertCell();

    rank.innerHTML = s+1;
    nyd.innerHTML = distancesRank[s][0];
    dis.innerHTML = distancesRank[s][1];
    score.innerHTML = distancesRank[s][2]+"%";
  }

}

//Functions that use the information from the datasets to rank distance, safetyRank and rankAffordability
function rankSafety(){
  $("#rankSafety").prop("disabled", true);
  $("#getDistrictsInfo").prop("disabled", false);
  var bronxCount = queensCount = brooklynCount = statenIslandCount = manhattanCount = 0;
  var top;

  for (var i = 0; i < crimeInfoRows.length; i++) {
    var boro = crimeInfoRows[i][0];
    if (boro=="BRONX") {
      bronxCount++;
    }
    if (boro=="QUEENS") {
      queensCount++;
    }
    if (boro=="BROOKLYN") {
      brooklynCount++;
    }
    if (boro=="MANHATTAN") {
      manhattanCount++;
    }
    if (boro=="STATEN ISLAND") {
      statenIslandCount++;
    }
  }
  safetyRank[0] = ["Bronx", bronxCount, 0];
  safetyRank[1] = ["Queens", queensCount, 0];
  safetyRank[2] = ["Brooklyn", brooklynCount, 0];
  safetyRank[3] = ["Manhattan", manhattanCount, 0];
  safetyRank[4] = ["Staten Island", statenIslandCount, 0];

  safetyRank.sort(compareSecondColumn);
  top = 100;
  console.log("top = " + top);
  for (var k = 0; k < safetyRank.length; k++) {
    safetyRank[k][2] = top/(k+1);
  }

  console.log(safetyRank);
  rankDistance();
  rankAffordability();
  var tableReference = $("#tableBody2")[0];
  var newRow, nyd, rank, score;
  for (var s = 0; s < safetyRank.length; s++) {
    newRow = tableReference.insertRow(tableReference.length);
    rank = newRow.insertCell();
    nyd  = newRow.insertCell();
    score = newRow.insertCell();

    rank.innerHTML = s+1;
    nyd.innerHTML = safetyRank[s][0];
    score.innerHTML = safetyRank[s][2]+"%";
  }
  alert("The information has been ranked succesufully, now we're ready to fin your place!")


}

function rankAffordability(){
  var affordability, boro, liu, top;
  var bronxCount = queensCount = brooklynCount = statenIslandCount = manhattanCount = 0;

  for (var i = 0; i < housingInfoRows.length; i++) {
    affordability = housingInfoRows[i];
    boro = affordability[0];
    liu = parseInt(affordability[2]);


    if (boro=="Bronx") {
      bronxCount = bronxCount + liu;
    }
    if (boro=="Queens") {
      queensCount = queensCount + liu;
    }
    if (boro=="Brooklyn") {
      brooklynCount = brooklynCount + liu;
    }
    if (boro=="Manhattan") {
      manhattanCount = manhattanCount + liu;
    }
    if (boro=="Staten Island") {
      statenIslandCount = statenIslandCount + liu;
    }
  }

  affordabilityRank[0] = ["Bronx", bronxCount];
  affordabilityRank[1] = ["Queens", queensCount];
  affordabilityRank[2] = ["Brooklyn", brooklynCount];
  affordabilityRank[3] = ["Manhattan", manhattanCount];
  affordabilityRank[4] = ["Staten Island", statenIslandCount];

  affordabilityRank.sort(compareSecondColumn1);

  top = 100;
  console.log("top = " + top);
  for (var k = 0; k < affordabilityRank.length; k++) {
    affordabilityRank[k][2] = top/(k+1);
  }
  console.log(affordabilityRank);
  var tableReference = $("#tableBody3")[0];
  var newRow, nyd, rank, score;
  for (var s = 0; s < affordabilityRank.length; s++) {
    newRow = tableReference.insertRow(tableReference.length);
    rank = newRow.insertCell();
    nyd  = newRow.insertCell();
    score = newRow.insertCell();

    rank.innerHTML = s+1;
    nyd.innerHTML = affordabilityRank[s][0];
    score.innerHTML = affordabilityRank[s][2]+"%";
  }

}

//Function that gathers all the information respective to the 59 habitable districts.
function getDistrictsInfo() {
  $("#getDistrictsInfo").prop("disabled", true);
  $("#updateChart").prop("disabled", false);
  $("#export").prop("disabled", false);
  var spacePos,pos,pos1, row;
  row = distancesRank;

  for (var d = 0; d < 58; d++) {
    districtsInfo[d] = [0,0,0,0];
  }

  for (var i = 0; i < (row.length-1); i++) {

    //CD id and distance
    districtsInfo[i][0] = row[i][0];
    districtsInfo[i][1] = row[i][2];
    spacePos = row[i][0].indexOf(' ');
    dPos = row[i][0].indexOf('d');

    //Safety and affordability
    if ((row[i][0].substring(0,spacePos)) == "Bronx") {
      for (var k = 0; k < safetyRank.length; k++) {
        if ((safetyRank[k][0]) == "Bronx") {
          pos = k;
        }
      }
      for (var q = 0; q < affordabilityRank.length; q++) {
        if ((affordabilityRank[q][0]) == "Bronx") {
          pos1 = q;
        }
      }
      districtsInfo[i][2] = safetyRank[pos][2];
      districtsInfo[i][3] = affordabilityRank[pos1][2];
      districtsInfo[i][4] = ((safetyRank[pos][2]+affordabilityRank[pos1][2]+districtsInfo[i][1])/3);

    }
    if ((row[i][0].substring(0,spacePos)) == "Brooklyn") {
      for (var l = 0; l < safetyRank.length; l++) {
        if ((safetyRank[l][0]) == "Brooklyn") {
          pos = l;
        }
      }
      for (var w = 0; w < affordabilityRank.length; w++) {
        if ((affordabilityRank[w][0]) == "Brooklyn") {
          pos1 = w;
        }
      }
      districtsInfo[i][2] = safetyRank[pos][2];
      districtsInfo[i][3] = affordabilityRank[pos1][2];
      districtsInfo[i][4] = ((safetyRank[pos][2]+affordabilityRank[pos1][2]+districtsInfo[i][1])/3);
    }
    if ((row[i][0].substring(0,spacePos)) == "Manhattan") {
      for (var m = 0; m < safetyRank.length; m++) {
        if ((safetyRank[m][0]) == "Manhattan") {
          pos = m;
        }
      }
      for (var e = 0; e < affordabilityRank.length; e++) {
        if ((affordabilityRank[e][0]) == "Manhattan") {
          pos1 = e;
        }
      }
      districtsInfo[i][2] = safetyRank[pos][2];
      districtsInfo[i][3] = affordabilityRank[pos1][2];
      districtsInfo[i][4] = ((safetyRank[pos][2]+affordabilityRank[pos1][2]+districtsInfo[i][1])/3);
    }
    if ((row[i][0].substring(0,spacePos)) == "Queens") {
      for (var n = 0; n < safetyRank.length; n++) {
        if ((safetyRank[n][0]) == "Queens") {
          pos = n;
        }
      }
      for (var r = 0; r < affordabilityRank.length; r++) {
        if ((affordabilityRank[r][0]) == "Queens") {
          pos1 = r;
        }
      }
      districtsInfo[i][2] = safetyRank[pos][2];
      districtsInfo[i][3] = affordabilityRank[pos1][2];
      districtsInfo[i][4] = ((safetyRank[pos][2]+affordabilityRank[pos1][2]+districtsInfo[i][1])/3);
    }
    if ((row[i][0].substring(0,dPos+1)) == "Staten Island") {
      for (var h = 0; h < safetyRank.length; h++) {
        if ((safetyRank[h][0]) == "Staten Island") {
          pos = h;
        }
      }
      for (var t = 0; t < affordabilityRank.length; t++) {
        if ((affordabilityRank[t][0]) == "Staten Island") {
          pos1 = t;
        }
      }
      districtsInfo[i][2] = safetyRank[pos][2];
      districtsInfo[i][3] = affordabilityRank[pos1][2];
      districtsInfo[i][4] = ((safetyRank[pos][2]+affordabilityRank[pos1][2]+districtsInfo[i][1])/3);
    }
  }
  districtsInfo.sort(compareFifthColumn);
  console.log(districtsInfo);

  var tableReference = $("#tableBody")[0];
  var newRow, nyd, rank, score;
  for (var s = 0; s < districtsInfo.length; s++) {
    newRow = tableReference.insertRow(tableReference.length);
    rank = newRow.insertCell();
    nyd  = newRow.insertCell();
    score = newRow.insertCell();

    rank.innerHTML = s+1;
    nyd.innerHTML = districtsInfo[s][0];
    score.innerHTML = districtsInfo[s][4]+"%";
  }


}

//Functions to get the distance between 2 lat, long coordenates (extracted from StackOverFlow at "https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula")
function rankDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1);
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km
  return d;
}
function deg2rad(deg) {
  return deg * (Math.PI/180)
}

//Functions used to sort (extracted from StackOverFlow at "https://stackoverflow.com/questions/16096872/how-to-sort-2-dimensional-array-by-column-value")
function compareSecondColumn(a, b) {
    if (a[1] === b[1]) {
        return 0;
    }
    else {
        return (a[1] < b[1]) ? -1 : 1;
    }
}
function compareSecondColumn1(a, b) {
    if (a[1] === b[1]) {
        return 0;
    }
    else {
        return (a[1] > b[1]) ? -1 : 1;
    }
}
function compareFifthColumn(a, b) {
    if (a[4] === b[4]) {
        return 0;
    }
    else {
        return (a[4] > b[4]) ? -1 : 1;
    }
}

//D3js
function updateChart(){


  for (var k = 0; k < 10; k++) {
    datos[k] = districtsInfo[k][4];
    console.log(datos[k]);
  }

     var config = { columnWidth: 45, columnGap: 5, margin: 10, height: 100 };
     d3.select("svg")
         .selectAll("rect")
         .data(datos)
       .enter().append("rect")
         .attr("width", config.columnWidth)
         .attr("x", function(d,i) { return config.margin + i * (config.columnWidth + config.columnGap) })
         .attr("y", function(d,i) { return config.height - d })
         .attr("height", function(d,i) { return d })


}

//Download CSV tables (Extracted from https://programacion.net/articulo/como_exportar_una_tabla_html_a_csv_mediante_javascript_1742)
function downloadCSV(csv, filename) {
    var csvFile;
    var downloadLink;

    // CSV file
    csvFile = new Blob([csv], {type: "text/csv"});

    // Download link
    downloadLink = document.createElement("a");

    // File name
    downloadLink.download = filename;

    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Hide download link
    downloadLink.style.display = "none";

    // Add the link to DOM
    document.body.appendChild(downloadLink);

    // Click download link
    downloadLink.click();
}

function exportTableToCSV(filename) {
    var csv = [];
    var rows = document.querySelectorAll("table tr");

    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll("td, th");

        for (var j = 0; j < cols.length; j++)
            row.push(cols[j].innerText);

        csv.push(row.join(","));
    }

    // Download CSV file
    downloadCSV(csv.join("n"), filename);
}

//Function to make table with the agroupated districtsInfofunction getDistricts() {
function getDistricts() {
  var tableReference = $("#DistrictsTable")[0];
  var newRow, Manhattan, Bronx, Brooklyn, Queens, StatenIsland;
  for (var j = 1; j < 18; j++) {
    newRow = tableReference.insertRow(tableReference.length);
    Manhattan  = newRow.insertCell();
    Bronx = newRow.insertCell();
    Brooklyn = newRow.insertCell();
    Queens = newRow.insertCell();
    StatenIsland = newRow.insertCell();
    if (j<13) {
      Manhattan.innerHTML = "Manhattan CD "+j;
    }
    if (j<13) {
      Bronx.innerHTML = "Bronx CD " + j ;
    }
    if (j<15) {
      Brooklyn.innerHTML = "Brooklyn CD " + j ;
    }
    if (j<19) {
      Queens.innerHTML = "Queens CD " + j ;
    }
    if (true) {
      StatenIsland.innerHTML = "StatenIsland CD " + j ;
    }
  }
}

//Linking buttons to their respective functions
$("document").ready(function () {
  $("#getData").on("click", getNeighboorhoodData)
  $("#getHousingData").on("click", getHousingData)
  $("#getCrimeData").on("click", getCrimes)
  $("#getGeoData").on("click", getGeoShapesData)



});
