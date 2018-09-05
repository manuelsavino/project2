$(function(){

    //Handles adding a new space 
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
            featureList.push({name: $(this).val(), icon: $(this).attr("data-icon") });
        });


        //requrest to get lon and lat based on zipcode entered
        $.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&key=AIzaSyBhc6RGgSeMqAsANroNNJ3R8YszdUWvBy4`).then(function(data){
        var lat = data.results[0].geometry.location.lat;
        var lon = data.results[0].geometry.location.lng;
        var city = data.results[0].address_components[1].long_name;
        var spaceInfo = {
                type: typeOfSpace,
                zipCode: zipCode,
                lat: lat,
                lon: lon,
                city: city,
                description: description,
                sqft: sqFootage,
                price: price,
                features: featureList
            };
            $.post("/api/space",spaceInfo).then(function(){
                $(location).attr("href", "/space");
            });
        });
    });


    $("#search").on("click", function(event){
        event. preventDefault();
        var city = $("#searchTextField").val().trim();
        
        $(location).attr("href", "/seachSpace/"+city);


    });


});