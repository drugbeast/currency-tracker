import '@maptiler/sdk/dist/maptiler-sdk.css'

import * as maptilersdk from '@maptiler/sdk'
import { BANKS, ENVS, MARKER_COLOR, MINSK_COORDINATES } from 'Constants/constants'
import { Component, createRef } from 'react'

import styles from './Map.module.scss'

maptilersdk.config.apiKey = ENVS.maptiler_api_key

class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      zoom: 10,
      centerLng: MINSK_COORDINATES.lng,
      centerLat: MINSK_COORDINATES.lat,
    }
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

    BANKS.forEach((item) =>
      new maptilersdk.Marker({ color: MARKER_COLOR })
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

      BANKS.forEach((item) => {
        Object.entries(item.currencies).some((currency) =>
          currency[0].toLowerCase().includes(searchValue.toLowerCase()) ||
          currency[1].toLowerCase().includes(searchValue.toLowerCase())
            ? new maptilersdk.Marker({ color: MARKER_COLOR })
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
