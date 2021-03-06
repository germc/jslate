$.get('/proxy.php?url=http://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist-90d.xml', function(data) {
    //parse the xml
    var xml = $($.parseXML(data));
    //free the data variable
    var data = [];
    //loop over each 'Cube' element that has a time property
    $.each(xml.find('Cube[time]'),	function(){
            //extract the time and rate, parse them to highstock accepted values and add them to data as a point
            var point = [];
            point.push(Date.parse($(this).attr('time')));
            point.push(parseFloat($(this).find('Cube[currency="USD"]').attr('rate')));
            data.push(point);
    });
    //reverse data because highstock expects it in chronological order
    data.reverse();

    // create the chart
    chart = new Highcharts.StockChart({
        chart: {
            renderTo: viewid,
        },
        title: {
            text: 'USD to EUR exchange rate'
        },

        series: [{
            type: 'column',
            name: 'USD to EUR exchange rate',
            data: data,
        }]
    });
});