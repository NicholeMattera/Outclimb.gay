package model

type Category string

const (
	RegularMeetup   Category = "regular-meetup"
	OutdoorClimbing Category = "outdoor-climbing"
	SkillsShare     Category = "skills-share"
)

type Link struct {
	OpenTime int64
	Show     bool
	Text     string
	URL      string
}

type EventMap map[string]Event

type Event struct {
	Body      string
	Category  Category
	Date      string
	Image     string
	ImageAlt  string
	Links     []Link
	Name      string
	Route     string
	Time      string
	Timestamp int64
}

func GetEvents() EventMap {
	return EventMap{
		"bouldering-meetup-minneapolis-bouldering-project": {
			Body: `
<p>
	OutClimb is a climbing club that centers around creating a welcoming space for queer, non-binary, and trans people of all backgrounds and skill levels. Climbing is historically white, cisgender, heterosexual, and male dominated; OutClimb looks to change that by providing a queer organized and led space where folks can hangout, climb, and learn with each other.
</p>
<p>
	It would be fantastic for folks to come out, climb, be queer, and learn new stuff. Anyone and everyone is welcome, bring your friends!</p><p>Minneapolis Bouldering Project has single stall locking bathrooms with lockers nearby, and a no questions asked policy for using the gendered locker rooms you identify with.
</p>
<h2>Discounts</h2>
<p>
	If it's your first time attending OutClimb tell the front desk and receive a free day pass with shoe rentals! If you've climbed with us before tell the front desk to receive a discounted day pass with shoe rentals for $12 (+tax)!</p><h2>First time at Minneapolis Bouldering Project?</h2><p>Fill out a waiver in advance and show up 15 minutes early to complete the tour and orientation before the event!
</p>`,
			Category: RegularMeetup,
			Date:     "First and third Thursday of every month",
			Image:    "/static/images/mbp.webp",
			ImageAlt: "Photo from April 20th 2023 meetup at Minneapolis Bouldering Project",
			Links: []Link{
				{
					Text: "Waiver",
					URL:  "https://waiver.smartwaiver.com/w/5ef37be079be7/web/",
				},
			},
			Name:      "Bouldering Meetup - Minneapolis Bouldering Project",
			Route:     "bouldering-meetup-minneapolis-bouldering-project",
			Time:      "7:00pm - 9:00pm",
			Timestamp: 0,
		},
		"20230506-outdoor-climbing-taylor-falls": {
			Body: `
<p>
	This event is by registration only, weather permitting, and open for all queer climbers of any experience and skill levels. We will notify registered climbers as early as possible of any changes.
</p>
<h2>About Interstate State Park</h2>
<p>
	Interstate State Parks feature some of the best climbing in the state. It crosses over the river and exists in both Minnesota and our neighbor Wisconsin. We will be going to the Minnesota side of the park. Use the Visitors Center parking lot. We will have people to direct you to the climbing permits and lead you to where we are climbing from this parking lot.
</p>
<h2>Climbing Permits</h2>
<p>
	Climbing permits are free, location specific, and required for all climbers. There is a small shack near the Visitors Center where you can fill out a climbing permit. We will have someone waiting in the parking lot to assist and direct you until 9:30 am.
</p>
<h2>Gear</h2>
<p>
	No gear is required, however:
</p>
<ul>
	<li>Shoes are highly recommended to get full enjoyment from the trip. If you do not own shoes we suggest renting from the University of Minnesota or REI.</li>
	<li>Helmets will be required when belaying, and otherwise highly recommended at the base of the climb, including when tying in. If you do not own a helmet we will have two loaners for people to use, but they get sweaty so please bring a bandana to use on the inside of the helmet if you desire. Helmets can also be rented from the the University of Minnesota or REI.</li>
	<li>Belay devices will be used in the skills share and during climbing. If you own a tube style belay device please bring it. We will have enough for a few people to practice top roping at a time.</li>
</ul>
<h2>What to Bring</h2>
<p>
	Pack for a day hike, and bring all your climbing stuff (chalk, shoes, harness, helmet, etc.). Bring a large water bottle and lunch. There is a water spout near the parking lot, but we suggest bringing 2L for a single person. Other recommendations include Sunglasses that you can get dirty, a sweat towel/bandana, hand sanitizer, sunscreen, extra snacks, and sandles to lounge in.
</p>
<h2>Car Pool</h2>
<p>
	If you plan on participating in the car pool we will meet at 8am, as it is an 80 minute drive. The carpool meets at the Park & Ride at 1559 Eustis in St Paul. (appox Hwy 280 and Como Ave)
</p>
<h2>A final note</h2>
<p>
	This is a very popular climbing area and one of the first nice weekends of the year. We will not take up unused space and leave the ropes on the wall any longer than we have to, so do your best to get there at 9:30am if you want to climb all the routes we set up. Otherwise please inform us if you plan on arriving late so we can see if there is a route available at your level when you arrive.
</p>`,
			Category:  OutdoorClimbing,
			Date:      "Saturday May 6th",
			Image:     "/static/images/taylor_falls.webp",
			ImageAlt:  "Photo from Interstate Park along the Minnesota Strip looking out on to the St. Croix River",
			Name:      "Outdoor Climbing - Taylor Falls / Interstate State Park",
			Route:     "20230506-outdoor-climbing-taylor-falls",
			Time:      "9:30am",
			Timestamp: 1683349200,
		},
		"20230527-outdoor-climbing-saint-croix-falls": {
			Body: `
<p>
	This event is by registration only, weather permitting, and open for all queer climbers of any experience and skill levels. We will notify registered climbers as early as possible of any changes.
</p>
<h2>About Interstate State Park</h2>
<p>
	Interstate State Parks feature some of the best climbing in the state. It crosses over the river and exists in both Minnesota and our neighbor Wisconsin. We will be going to the Wisconsin side of the park. Park your vehicle as close to the boat launch as possible . We will have people to direct you to where we are climbing from this area. (45°23'44.0"N 92°39'26.4"W)
</p>
<h2>Gear</h2>
<p>
	No gear is required, however:
</p>
<ul>
	<li>Shoes are highly recommended to get full enjoyment from the trip. If you do not own shoes we suggest renting from the University of Minnesota or REI.</li>
	<li>Helmets will be required when belaying, and otherwise highly recommended at the base of the climb, including when tying in. If you do not own a helmet we will have two loaners for people to use, but they get sweaty so please bring a bandana to use on the inside of the helmet if you desire. Helmets can also be rented from the the University of Minnesota or REI.</li>
	<li>Belay devices will be used in the skills share and during climbing. If you own a tube style belay device please bring it. We will have enough for a few people to practice top roping at a time.</li>
</ul>
<h2>What to Bring</h2>
<p>
	Pack for a day hike, and bring all your climbing stuff (chalk, shoes, harness, helmet, etc.). Bring a large water bottle and lunch. There is a water spout near the parking lot, but we suggest bringing 2L for a single person. Other recommendations include Sunglasses that you can get dirty, a sweat towel/bandana, hand sanitizer, sunscreen, extra snacks, and sandles to lounge in.
</p>
<h2>Car Pool</h2>
<p>
	If you plan on participating in the car pool we will meet at 8am, as it is an 80 minute drive. The carpool meets at the Park & Ride at 1559 Eustis in St Paul. (appox Hwy 280 and Como Ave)
</p>
<h2>A final note</h2>
<p>
	This is a very popular climbing area and one of the first nice weekends of the year. We will not take up unused space and leave the ropes on the wall any longer than we have to, so do your best to get there at 9:30am if you want to climb all the routes we set up. Otherwise please inform us if you plan on arriving late so we can see if there is a route available at your level when you arrive.
</p>`,
			Category:  OutdoorClimbing,
			Date:      "Saturday May 27th",
			Image:     "/static/images/taylor_falls.webp",
			ImageAlt:  "Photo from Interstate Park along the Minnesota Strip looking out on to the St. Croix River",
			Name:      "Outdoor Climbing - Saint Croix Falls / Interstate State Park",
			Route:     "20230527-outdoor-climbing-saint-croix-falls",
			Time:      "9:30am",
			Timestamp: 1685163600,
		},
		"20230716-outdoor-skills-sharing-sugar-loaf-bluff": {
			Body: `
<p>
	This event is weather permitting, and open for queer climbers that have registered for the skills share only. We will notify registered climbers as early as possible of any changes.
</p>
<h2>About Sugar Loaf Bluff</h2>
<p>
	Sugar Loaf is an iconic place in Winona, MN. Sitting approx 600 ft above Winona, the Sugarloaf is a unique man-made tower; a result from quarrying in the 1800s. It offers routes on all aspects of the tower ranging from 5.3- 5.11 in difficulty. The majority of routes are in the 5.6-5.9 range. 
<p>
<h2>Getting there</h2>
<p>
	At the intersection of Mankato Ave and Highway 61 in Winona, head south on 43 to a quick right hand turn to E Lake Blvd to a parking area with signs for" Sugarloaf Trailhead parking". The trailhead is behind edina reality. Please DO NOT park in the Treasure Under Sugarloaf parking lot or Edina Reality's lot. All parking is on the side of the road.
</p>
<p>
	Once on the trail here is a steep approach that is 1/2 mile long. This can be strenuous so feel free to take breaks. At the fork turn left at the sign following the yellow arrow towards Sugarloaf, not the Ice Park. Then you'll pass some sandstone, this is not where we will be climbing so stop to look at the view and keep climbing.
</p>
<h2>Gear</h2>
<ul>
	<li>
		<strong>Required</strong>
		<ul>
			<li>Sturdy Hiking Shoes</li>
			<li>Climbing Shoes</li>
			<li>Harness</li>
			<li>Belay Device with Locking Crabiner</li>
			<li>Helmet </li>
			<li>Single Length (60cm 24") Nylon sling with Locking Crabiner</li>
			<li>Additional locking Carabiner</li>
		</ul>
	</li>
	<li>
		<strong>Optional</strong>
		<ul>
			<li>Petzel Grigri or Edelrid Jul or similar assited belay device with Carabiner</li>
			<li>Personal Anchor System such as Petzl Connect or Metolius Pas with Locking Carabiner</li>
			<li>Climbers with out shoes are recommended to rent from the University of Minnesota or REI.</li>
			<li>Helmets will be required when belaying, and otherwise highly recommended at the base of the climb, including when tying in. Helmets can also be rented from the the University of Minnesota or REI.</li>
			<li>Belay devices will be used in the skills share and during climbing. If you own a tube style belay device please bring it even if you have a GriGri or other belay device.</li>
		</ul>
	</li>
</ul>
<p>
	Any climbers that cannot get the required gear should reach out to leadership via <a href="mailto:help@outclimb.gay">help@outclimb.gay</a>
</p>
<h2>What to Bring</h2>
<p>
	Pack for a day hike, and bring all your climbing stuff (chalk, shoes, harness, helmet, etc.). Bring a large water bottle and lunch. We suggest bringing at least 2L for a single person, a 2L soda bottle works well for this. Other recommendations include sunglasses that you can get dirty, a sweat towel/bandana, hand sanitizer, sunscreen, extra snacks, and sandles to lounge in.
</p>
<h2>Carpool</h2>
<p>
	If you plan on participating in the car pool we will meet at 7am, as it is a 2 hour drive. The carpool meets at the Park & Ride at 1559 Eustis in St Paul. (appox Hwy 280 and Como Ave)
</p>`,
			Category:  SkillsShare,
			Date:      "Sunday July 16th",
			Image:     "/static/images/sugar_loaf.webp",
			ImageAlt:  "Photo from on top of Sugar Loaf Bluff with a transgender flag planted looking out towards Winona, Minnesota",
			Name:      "Outdoor Skills Sharing - Sugar Loaf Bluff / Winona, MN",
			Route:     "20230716-outdoor-skills-sharing-sugar-loaf-bluff",
			Time:      "9:00am",
			Timestamp: 1689483600,
		},
		"20230730-outdoor-climbing-he-mni-can-barn-bluff": {
			Body: `
<p>
	This event is by registration only, weather permitting, and open for all queer climbers of any experience and skill levels. We will notify registered climbers as early as possible of any changes.
</p>
<h2>About He Mni Can</h2>
<p>
	This bluff rises 350 above ground level and is home to over 150 sport routes sitting in an old quarry site. This site can feel sandbagged (harder than discribed) due to the rock being polished from hands and shoes on the wall. Generally the harder the climb, starting at about 5.10 or so, the less polished it will be.
</p>
<h2>Getting there</h2>
<p>
	Navigate to the <a href="https://goo.gl/maps/aZoFXmb3iWY9nYCz5" target="_blank">Barn Bluff Trailhead</a> and park for free in the lot a little further down the road. Then head up the stairs Switching back left and up before arriving at the <a href="https://www.google.com/maps/place/44%C2%B034'08.4%22N+92%C2%B031'15.8%22W/@44.56899,-92.5232487,643m/data=!3m2!1e3!4b1!4m4!3m3!8m2!3d44.56899!4d-92.52106?hl=en&entry=ttu" target="_blank">base of the cliff</a>.
</p>
<h2>Gear</h2>
<p>
	No gear is required and everyone will have a chance to climb no matter their gear, however:
</p>
<ul>
	<li>Shoes are highly recommended to get full enjoyment from the trip. If you do not own shoes we suggest renting from the University of Minnesota or REI.</li>
	<li>Helmets will be required at all times near the base of the climb, including when tying in. Redwing is known for rockfall. If you do not own a helmet we will have two loaners for people to use, but they get sweaty so please bring a bandana to use on the inside of the helmet if you desire. Helmets can also be rented from the the University of Minnesota or REI.</li>
</ul>
<h2>What to bring</h2>
<p>
	Pack for a day hike, and bring all your climbing stuff (chalk, shoes, harness, helmet, etc.). Bring a large water bottle and lunch. We suggest bringing at least 2L for a single person, a refilled 2L soda bottle could work well for this. Other recommendations include Sunglasses that you can get dirty, a sweat towel/bandana, hand sanitizer, sunscreen, extra snacks, and sandles to lounge in.
</p>
<h2>Carpool</h2>
<p>
	If you plan on participating in the car pool we will meet at 8am, as it is an 80 minute drive. The carpool meets at the Park & Ride at 1559 Eustis in St Paul. (appox Hwy 280 and Como Ave)
</p>
<h2>A final note</h2>
<p>
	This is a very popular climbing and large climbing area. We will ber moving wherever we can to find open routes and won't leave ropes on the wall any longer than we have to. Do your best to get there at 9:30am if you want to have an easy time finding us and climb all the routes we set up. Otherwise please inform us if you plan on arriving late so we can trt to keep our phones on.
</p>`,
			Category:  OutdoorClimbing,
			Date:      "Sunday July 30th",
			Image:     "/static/images/redwing.webp",
			ImageAlt:  "Photo from October 1st 2022 meetup at Redwing, Minnesota",
			Name:      "Outdoor Climbing - He Mni Can (Barn Bluff) / Redwing MN",
			Route:     "20230730-outdoor-climbing-he-mni-can-barn-bluff",
			Time:      "9:20am",
			Timestamp: 1690693200,
		},
		"20230813-outdoor-skills-sharing-interstate-state-park": {
			Body: `
<p>
	More Information to come.
</p>`,
			Category:  SkillsShare,
			Date:      "Sunday August 13th",
			Image:     "/static/images/taylor_falls.webp",
			ImageAlt:  "Photo from Interstate Park along the Minnesota Strip looking out on to the St. Croix River",
			Name:      "Outdoor Skills Sharing - Interstate State Park",
			Route:     "20230813-outdoor-skills-sharing-interstate-state-park",
			Time:      "",
			Timestamp: 1691884800,
		},
	}
}
