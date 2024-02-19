/* eslint-disable indent */
/* eslint-disable operator-linebreak */
import '@maptiler/sdk/dist/maptiler-sdk.css'

import * as maptilersdk from '@maptiler/sdk'
import { Component, createRef } from 'react'

import banks from '../../constants/banks'
import styles from './Map.module.scss'

const Minsk = { lng: 27.54949, lat: 53.891382 }
maptilersdk.config.apiKey = process.env.REACT_APP_MAPTILER_API_KEY

class Map extends Component {
  constructor(props) {
    super(props)
    this.state = { zoom: 10, centerLng: Minsk.lng, centerLat: Minsk.lat }
    this.mapContainer = createRef(null)
    this.card = createRef(null)
  }

  componentDidMount() {
    const { zoom, centerLng, centerLat } = this.state
    this.card.current = new maptilersdk.Map({
      container: this.mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [centerLng, centerLat],
      zoom,
    })

    banks.forEach(item =>
      new maptilersdk.Marker({ color: '#ff0000' })
        .setLngLat([item.lng, item.lat])
        .addTo(this.card.current),
    )
  }

  shouldComponentUpdate(nextProps) {
    const { searchValue } = this.props
    if (nextProps.searchValue === searchValue) {
      return false
    }
    return true
  }

  componentDidUpdate(prevState) {
    const { zoom, centerLng, centerLat } = this.state
    const { searchValue } = this.props
    if (
      zoom !== prevState.zoom ||
      centerLat !== prevState.centerLat ||
      centerLng !== prevState.centerLng
    ) {
      this.card.current = new maptilersdk.Map({
        container: this.mapContainer.current,
        style: maptilersdk.MapStyle.STREETS,
        center: [centerLng, centerLat],
        zoom,
      })

      banks.forEach(item => {
        Object.entries(item.currencies).some(currency =>
          currency[0].toLowerCase().includes(searchValue.toLowerCase()) ||
          currency[1].toLowerCase().includes(searchValue.toLowerCase())
            ? new maptilersdk.Marker({ color: '#ff0000' })
                .setLngLat([item.lng, item.lat])
                .addTo(this.card.current)
            : null,
        )
      })
    }
  }

  render() {
    return (
      <section className={styles.wrap}>
        <div ref={this.mapContainer} className={styles.map} />
      </section>
    )
  }
}

export default Map
