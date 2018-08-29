

if(navigator.geolocation)
{
    navigator.geolocation.getCurrentPosition(positionReceived)
}

function positionReceived(position)
{
    console.log(position.coords.latitude)
}