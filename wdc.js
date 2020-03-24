(function () {
var myConnector = tableau.makeConnector();
myConnector.getSchema = function (schemaCallback) {
var cols = [
{ id : "date", alias:"Date", dataType : tableau.dataTypeEnum.string },
{ id : "state", alias: "State",dataType : tableau.dataTypeEnum.string },
{ id : "Positive",alias: "Positive", dataType : tableau.dataTypeEnum.string },
{ id : "Negative",alias: "Negative", dataType : tableau.dataTypeEnum.string },
{ id : "Pending", alias: "Pending", dataType : tableau.dataTypeEnum.string},
{ id : "hospitalized", alias: "Hospitalized", dataType : tableau.dataTypeEnum.string },
{ id : "death", alias: "Death",  dataType : tableau.dataTypeEnum.string },
{ id : "total", alias: "Total",  dataType : tableau.dataTypeEnum.string},
{ id : "dateChecked", alias:"Date Checked",  dataType : tableau.dataTypeEnum.string},

];
var tableInfo = {
id : "taxi",
alias : "TLC Trip Data",
columns : cols
};
schemaCallback([tableInfo]);
};
myConnector.getData = function(table, doneCallback) {
$.getJSON("https://covidtracking.com/api/states/daily ", function(resp) {
var feat = resp;
tableData = [];
// Iterate over the JSON object
for (var i = 0, len = feat.length; i < len; i++) {
tableData.push({
"date": feat[i]["Month"]["Year"],
"state": feat[i]["Trips Per Day"],
"positive": feat[i] ["Farebox Per Day"],
"negative": feat[i] ["Unique Medallions"],
"pending": feat[i] ["Unique Drivers"],
"hospitalized": feat[i] ["Medallions Per Day"],
"death": feat[i] ["Avg Days Medallions on Road"],
"total": feat[i] ["Avg Hours Per Day Per Medallion"] ,
"dateChecked": feat[i] ["Avg Days Drivers on Road"],

});
}
table.appendRows(tableData);
doneCallback();
});
};
tableau.registerConnector(myConnector);
$(document).ready(function () {
$("#submitButton").click(function () {
tableau.connectionName = "taxi";
tableau.submit();
});
});})();