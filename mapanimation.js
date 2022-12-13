

	async function route(){	
		const geojson = await getBusLocation();

		map.addSource('route', {
		type: 'geojson',
		data: geojson
		});

		const updateSource = setInterval(async () => {
			const geojson = await getBusLocation(updateSource);
			map.getSource('route').setData(geojson);
			}, 2000);

		
			async function getBusLocation(){
			try{
				const { lat, lng } = await response.json();
				const options = {
					method: 'GET',
					headers: {
						'X-RapidAPI-Key': '5fc3ecd7dbmsh54b556790b5eceap129025jsna22e859ea67d',
						'X-RapidAPI-Host': 'transloc-api-1-2.p.rapidapi.com'
					}
				};
				
				await fetch('https://transloc-api-1-2.p.rapidapi.com/vehicles.json?agencies=12%2C16&routes=4000421%2C4000592%2C4005122&geo_area=35.80176%2C-78.64347%7C35.78061%2C-78.68218&callback=call', options)
						
					.then(response => response.json())
					.then(response => console.log(response))
					.catch(err => console.error(err));

				
				
				
				

				return {
					'type': 'FeatureCollection',
					'features': [
					{
					'type': 'Feature',
					'geometry': {
					'type': 'Point',
					'coordinates': [lng, lat]
					}
					}]
				}
					
			
			}	catch (err) {
				// If the updateSource interval is defined, clear the interval to stop updating the source.
				if (updateSource) clearInterval(updateSource);
				throw new Error(err);
				}
		
	}
	};




//async function markCoor(){
//	var locations= await getBusLocation();
//
//		console.log(locations);
	

//	setTimeout(markCoor,15000);

//}

//markCoor();

//async function moveMarker() {
  // await markCoor();
//}





//moveMarker();