import React, { useEffect } from 'react'
import geojson from './geojson.json'
import './mapbox.css'

export interface Props {}

declare const mapboxgl: any

export const Map: React.FC<Props> = () => {
  useEffect(() => {
    // TO MAKE THE MAP APPEAR YOU MUST
    // ADD YOUR ACCESS TOKEN FROM
    // https://account.mapbox.com
    mapboxgl.accessToken =
      'pk.eyJ1IjoiYXZkZXlldiIsImEiOiJjazBudHV4cjkwMWpnM2duNjV0eXdlMmlxIn0.RMnyyqi2b7KUBo6pA0Grig'
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v10',
      center: [-103.59179687498357, 40.66995747013945],
      zoom: 3,
    })

    map.on('load', function () {
      // Add a new source from our GeoJSON data and
      // set the 'cluster' option to true. GL-JS will
      // add the point_count property to your source data.
      map.addSource('earthquakes', {
        type: 'geojson',
        // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
        // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
        data: geojson,
        cluster: true,
        clusterMaxZoom: 14, // Max zoom to cluster points on
        clusterRadius: 40, // Radius of each cluster when clustering points (defaults to 50)
      })

      map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'earthquakes',
        filter: ['has', 'point_count'],
        paint: {
          // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
          // with three steps to implement three types of circles:
          //   * Blue, 20px circles when point count is less than 100
          //   * Yellow, 30px circles when point count is between 100 and 750
          //   * Pink, 40px circles when point count is greater than or equal to 750
          'circle-color': [
            'step',
            ['get', 'point_count'],
            '#51bbd6',
            100,
            '#f1f075',
            750,
            '#f28cb1',
          ],
          'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40],
        },
      })

      map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'earthquakes',
        filter: ['has', 'point_count'],
        layout: {
          'text-field': '{point_count_abbreviated}',
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 12,
        },
      })

      map.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'earthquakes',
        filter: ['!', ['has', 'point_count']],
        paint: {
          'circle-color': '#11b4da',
          'circle-radius': 4,
          'circle-stroke-width': 1,
          'circle-stroke-color': '#fff',
        },
      })

      // inspect a cluster on click
      map.on('click', 'clusters', function (e: any) {
        var features = map.queryRenderedFeatures(e.point, {
          layers: ['clusters'],
        })
        var clusterId = features[0].properties.cluster_id
        map
          .getSource('earthquakes')
          .getClusterExpansionZoom(clusterId, function (err: any, zoom: any) {
            if (err) return

            map.easeTo({
              center: features[0].geometry.coordinates,
              zoom: zoom,
            })
          })
      })

      map.on('mouseenter', 'clusters', function () {
        map.getCanvas().style.cursor = 'pointer'
      })
      map.on('mouseleave', 'clusters', function () {
        map.getCanvas().style.cursor = ''
      })

      map.on('idle', renderPeople)
    })

    const markers: any[] = []
    function renderPeople() {
      markers.forEach(marker => marker.remove())
      var features = map.queryRenderedFeatures({
        layers: ['unclustered-point'],
        filter: ['!', ['has', 'point_count']],
      })

      if (features) {
        // Add markers to the map.
        features.forEach(function (feature: any) {
          // Create a DOM element for each marker.
          var el = document.createElement('div')
          el.className = 'marker'
          //@ts-ignore
          el.style.backgroundImage = `url(https://placekitten.com/g/${
            Math.ceil(feature.properties.mag) * 100
          }/)` //@ts-ignore //@ts-ignore
          el.style.width = '50px' //@ts-ignore
          el.style.height = '50px'
          el.style.backgroundSize = '100%'

          // Add markers to the map.
          const marker = new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).addTo(map)

          markers.push(marker)
        })
      }
    }
  }, [])
  return <div id="map"></div>
}
