mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 15, // starting zoom
    style: 'mapbox://styles/mapbox/streets-v11', // style URL or style object
});
// Create a new marker.
const marker = new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({offset:25})
        .setHTML(
            `<h3>${campground.title}</h3>`
        )
    )
    .addTo(map);

    map.addControl(new mapboxgl.NavigationControl());