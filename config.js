// Main story map configuration used by the Mapbox storytelling template.
// Each property controls a piece of the map or narrative layout.
var config = {
    // Mapbox style defines how the basemap looks (satellite imagery in this case).
    style: 'mapbox://styles/mapbox/satellite-v9',
    accessToken: 'pk.eyJ1IjoiYW5naWUxMjM1MyIsImEiOiJjbWF2aHJnOHQwNGx1MmpwdnMyaXVnZHN0In0.odV43jezFdD0s7CW9uaJXQ',
    // Whether the story shows pin markers for each chapter location.
    showMarkers: false,
    // Visual theme for the story controls and UI panels.
    theme: 'light',
    use3dTerrain: false,
    // Footer text displayed at the bottom of the map story.
    footer: 'Data: SF Bay Trail GeoJSON. Built with Mapbox GL JS.',
    // Chapters define the sequence of narrative stops in the story map.
    chapters: [
        {
            id: 'intro',
            alignment: 'full',
            hidden: false,
            title: 'Trail-Oriented Development in the San Francisco Bay Area',
            description: `<p style="color: rgba(255,255,255,0.6); font-size: 0.85rem; font-style: italic; margin-top: -16px; margin-bottom: 24px;">By Angie Rendon</p> Trail-oriented development (TrOD) is a planning framework that uses off-street trails and greenways as anchors for compact, context-sensitive development. It connects people to key destinations through walkable, human-scaled design tailored to local conditions and priorities.
    <br><br>
    The San Francisco Bay Area has a growing network of paved pathways, greenways, and other off-street trails that make up the regional trail network. These trails pass through dense urban neighborhoods, transit hubs, suburban areas, small towns, parks, civic destinations, and rural landscapes. They represent a major infrastructure resource for the region, presenting significant opportunities to catalyze equitable development, increase mobility options, and improve resilience.
    <br><br>
    This map highlights a few examples of trail-oriented development in the Bay Area, showcasing how communities are leveraging trails as civic infrastructure that unlock a wide range of benefits.
    <br><br>
            <strong style="color: #12b7ed;">Keep scrolling to explore real examples of TrOD around the Bay Area ↓</strong>`,
            // Location settings determine where the map moves for this chapter.
            location: {
                center: [-122.4194, 37.7749],
                zoom: 10,
                pitch: 25,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'marina-bay',
            alignment: 'left',
            hidden: false,
            title: 'Marina Bay Trail',
            image: 'images/marina-bay-trail.jpeg',
            description: 'The Marina Bay neighborhood in Richmond sits directly along the SF Bay Trail, offering residents immediate access to one of the region\'s most scenic waterfront corridors. This community exemplifies trail-oriented development in action. Residential sidewalks feed directly onto the trail, connecting neighbors to the bay, to parks, and to each other without relying on a car.',
            location: {
                center: [-122.34512, 37.90822],
                zoom: 18,
                pitch: 50,
                bearing: -20,
                speed: 1.0,
                curve: 1.5,
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'ohlone-greenway',
            alignment: 'left',
            hidden: false,
            title: 'Ohlone Greenway',
            image: 'images/ohlone-greenway.jpeg',
            description: 'The Ohlone Greenway is a 4.5-mile pedestrian and bicycle path running through the heart of the East Bay, connecting Albany, El Cerrito, and Richmond. In El Cerrito, the greenway runs underneath the elevated BART tracks, transforming normally underutilized infrastructure space into a vibrant, shaded corridor for cyclists and pedestrians. <br><br> The greenway serves as a critical first-last mile connector, linking residents directly to El Cerrito del Norte and El Cerrito Plaza BART stations, and serving as a backbone of a transit-connected neighborhood. <br><br> Along its length, the Ohlone Greenway passes parks, schools, community gardens, and local businesses, making it a true civic amenity that strengthens the communities it passes through.',
            location: {
                center: [-122.29953, 37.90255],
                zoom: 18,
                pitch: 50,
                bearing: 0,
                speed: 1.0,
                curve: 1
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'emeryville-greenway',
            alignment: 'left',
            hidden: false,
            title: 'Emeryville Greenway',
            image: 'images/emeryville-greenway.JPG',
            description: 'The Emeryville Greenway is a 1.9-mile pedestrian and bicycle path running through Emeryville from Berkeley to Oakland, connecting people to employment, residences, shopping, regional transit, and the Bay Trail. <br><br> It passes through a dense mix of land uses, such as tech offices, maker spaces, residential buildings, and retail, demonstrating how even a short trail can serve as a powerful organizing spine for urban development. <br><br> The greenway connects directly to the Emeryville Amtrak station and regional bus lines, making it a true multimodal connector. Projects like Glashaus Lofts have built directly onto the trail, creating a new model for how greenways can anchor housing development in the Bay Area.',
            location: {
                center: [-122.28973, 37.84705],
                zoom: 18,
                pitch: 50,
                bearing: 0,
                speed: 1.0,
                curve: 1
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'ironhorse-trail',
            alignment: 'left',
            hidden: false,
            title: 'Iron Horse Trail',
            image: 'images/ironhorse-trail.jpeg',
            description: 'The Iron Horse Regional Trail is a 32-mile multi-use corridor running north to south through the East Bay, connecting nine cities and several BART stations across Alameda and Contra Costa counties. The trail follows the former Southern Pacific Railroad right-of-way, established in 1891 and abandoned in the late 1970s. <br><br> Today the trail functions as both a recreational amenity and a critical active transportation corridor, linking residents to schools, employment centers, parks, and regional transit. Key nodes along the trail include the Pleasant Hill and Dublin/Pleasanton BART stations, which anchor transit-oriented development that has brought housing, retail, and office space directly adjacent to the trail. <br><br> The long-term vision for the Iron Horse Trail extends its reach to approximately 55 miles, connecting 12 cities from Livermore to Suisun Bay, making it one of the most significant trail-oriented infrastructure investments in the Bay Area.',
            location: {
                center: [-122.00094, 37.82065],
                zoom: 18.25,
                pitch: 50,
                bearing: 0,
                speed: 1.0,
                curve: 1
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'back-to-top',
            alignment: 'center',
            hidden: false,
            title: 'These are just a few examples of how trails are shaping development across the Bay Area.',
            description: '<a href="#" style="display:inline-block; margin-top:12px; padding: 12px 24px; background: #c3ff00; color:#000; font-weight:700; border-radius:8px; text-decoration:none; font-family: system-ui;">↑ Back to Top</a>',
            location: {
                center: [-122.4194, 37.7749],
                zoom: 10,
                pitch: 25,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            onChapterEnter: [],
            onChapterExit: []
        }
    ]
};
