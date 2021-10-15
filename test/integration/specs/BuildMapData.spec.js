import MapViewDataBuilder from '@/support/map-data-services/map-view-data-builder'
import OrsParamsParser from '@/support/map-data-services/ors-params-parser'
import buildMapData from '../mockups/build-map-data.js'
import OrsMapFilters from '@/config/ors-map-filters'
import MapViewData from '@/models/map-view-data'
import constants from '@/resources/constants'
import AppLoader from '@/app-loader'
import Place from '@/models/place'
import store from '@/store/store'

describe('Build map mapViewData', () => {
  it('should build directions mapViewData', (done) => {
    new AppLoader().fetchApiInitialData().then(() => {
      expect(store.getters.mapSettings.apiKey).toBeDefined()
      store.commit('mode', constants.modes.directions)
      let places = []

      for (let key in buildMapData.directionsMapData.content.metadata.query.coordinates) {
        let coordinates = buildMapData.directionsMapData.content.metadata.query.coordinates[key]
        places.push(new Place(coordinates[1], coordinates[0]))
      }      

      let filters = {}   
      OrsParamsParser.setFilters(filters, OrsMapFilters, constants.services.directions)
      
      MapViewDataBuilder.buildMapData(buildMapData.directionsMapData, places, filters).then((mapViewData) => {
        expect(mapViewData).toBeDefined()
        expect(mapViewData).toBeInstanceOf(MapViewData)
        done()
      }).catch(result => {
        done.fail(result)
      })      
    }).catch(result => {
      done.fail(result)
    }) 
  })  

  it('should build isochrones mapViewData', (done) => {
    new AppLoader().fetchApiInitialData().then(() => {
      expect(store.getters.mapSettings.apiKey).toBeDefined()
      store.commit('mode', constants.modes.directions)
      let places = []

      for (let key in buildMapData.directionsMapData.content.metadata.query.locations) {
        let coordinates = buildMapData.directionsMapData.content.metadata.query.locations[key]
        places.push(new Place(coordinates[1], coordinates[0]))
      }      

      let filters = {}   
      OrsParamsParser.setFilters(filters, OrsMapFilters, constants.services.isochrones)
      
      MapViewDataBuilder.buildMapData(buildMapData.isochronesMapData, places, filters).then((mapViewData) => {
        expect(mapViewData).toBeDefined()
        expect(mapViewData).toBeInstanceOf(MapViewData)
        done()
      }).catch(result => {
        console.log(result)
      })      
    }).catch(result => {
      console.log(result)
    }) 
  })
})
