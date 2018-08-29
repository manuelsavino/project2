$(function(){

    //Handles adding a new space (need to figure out how to pass feature id's)
    $("#submitNewSpace").on("click", function(event){
        event.preventDefault();
        var zipCode = $("#zipCode").val().trim();
        var price = $("#price").val().trim();
        var sqFootage = $("#size").val().trim();
        var description = $("#description").val().trim();
        var typeOfSpace = $("#typeOfSpace").val();
        var featureList = [];
        $(".form-check-input:checked").each(function()
        {
            featureList.push($(this).val())
        })

        //requrest to get lon and lat based on zipcode entered
        $.get(`http://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}`).then(function(data){
        var lat = data.results[0].geometry.location.lat;
        var lon = data.results[0].geometry.location.lng;
        var city = data.results[0].address_components[1].long_name 
        var spaceInfo = {
                type: typeOfSpace,
                zipCode: zipCode,
                lat: lat,
                lon: lon,
                city: city,
                description: description,
                sqFootage: sqFootage,
                price: price,
                features: featureList
            };

            $.post("/api/space",spaceInfo).then(function(){
                $(location).attr("href", "/space");
            });
        })
    });


//Handles new feature add, redirect not working
$("#addNewFeature").on("click", function(event){
    event.preventDefault();
    var featureName = $("#featureName").val().trim()
    var newFeature = {name: featureName};

    $.post("/api/feature",newFeature).then(function(){
        console.log("test")
        $(location).attr("href", "/space");
    });
})



});