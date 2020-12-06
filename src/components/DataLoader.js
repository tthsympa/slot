import { Component } from 'react'

import PropTypes from 'prop-types'
import { sleepForegroundLoop } from 'helpers/promise'

let CACHE = {}
export const clearCache = () => {
  CACHE = {}
}

class DataLoader extends Component {
  mount = false

  static propTypes = {
    initialData: PropTypes.any,
    load: PropTypes.func.isRequired,
    autoLoad: PropTypes.bool,
    errorToast: PropTypes.bool,
    cacheKey: PropTypes.string,
    polling: PropTypes.bool,
    pollingOptions: PropTypes.shape({
      interval: PropTypes.number,
      shouldRefresh: PropTypes.func,
    }),
  }

  static defaultProps = {
    autoLoad: true,
    errorToast: true,
    polling: false,
    pollingOptions: {
      interval: 10000,
      shouldRefresh: () => true,
    },
  }

  state = {
    state: this.props.autoLoad ? 'loading' : 'pending',
    data: this.getCache() || this.props.initialData,
    fromCache: Boolean(this.getCache()),
    error: null,
  }

  request = async (...args) => {
    if (!this.props.polling || !this.state.data) {
      if (this.mount) {
        this.setState(currentState => ({
          state: 'loading',
          fromCache: !!currentState.data,
        }))
      }
    }
    try {
      const data = await this.props.load(...args)
      await new Promise(resolve => {
        if (this.mount) {
          this.setState(
            { data, fromCache: false, state: 'success', loading: false },
            resolve,
          )
        }
      })
      this.setCache(data)
      return data
    } catch (error) {
      await new Promise(resolve => {
        if (this.mount) {
          this.setState({ error, state: 'error', loading: false }, resolve)
        }
      })
      if (this.props.errorToast) {
        // eslint-disable-next-line no-console
        console.error(error)
      }
      throw error
    }
  }

  getCache() {
    if (!this.props.cacheKey) return null
    return CACHE[this.props.cacheKey]
  }

  setCache(data) {
    if (!this.props.cacheKey) return
    CACHE[this.props.cacheKey] = data
  }

  load = async (...args) => {
    try {
      await this.request(...args)
    } catch (error) {
      // Ignore error
    }
  }

  poll = () => {
    if (
      this.props.pollingOptions.shouldRefresh === undefined ||
      this.props.pollingOptions.shouldRefresh(this.state, this.getCache())
    ) {
      this.load({ cacheData: this.getCache() })
    }
  }

  componentDidMount() {
    this.mount = true
    if (this.props.autoLoad) {
      this.load({ cacheData: this.getCache() })
    }
    if (this.props.polling) {
      this.polling = sleepForegroundLoop(
        this.props.pollingOptions.interval,
        this.poll,
      )
    }
  }

  componentWillUnmount() {
    this.mount = false
    if (this.polling) {
      this.polling.stop()
    }
  }

  render() {
    return this.props.children({
      ...this.state,
      loading: this.state.state === 'loading',
      request: this.request,
      reload: this.load,
    })
  }
}

export default DataLoader
