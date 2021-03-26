import React from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputTextarea } from 'primereact/inputtextarea'
import { InputText } from 'primereact/inputtext'
import { Divider } from 'primereact/divider'

export default class Restaurants extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      restaurants: [],
      restaurant: null,
      inputTextAreaValue: '',
      inputTextValue: ''
    }
  }
  inputTextAreaValue = (e) => {
    this.setState({ inputTextAreaValue: e })
  }
  inputTextValue = (e) => {
    this.setState({ inputTextValue: e })
  }
  restaurant = (e) => {
    this.setState({ restaurant: e })
  }
  setRestaurantsState(e) {
    const restaurants = e
    this.setState({ restaurants })
  }
  setReviews(e) {
    const restaurant = this.state.restaurant
    const reviews = [...restaurant.reviews, e]
    this.setState({ restaurant: {...restaurant, reviews} })
  }
  async getRestaurants() {
    const baseUrl = 'http://localhost:3000'
    const url = `${baseUrl}/restaurants`
    const response = await axios.get(url)
    this.setRestaurantsState(response.data)
  }
  async postReview() {
    let randomRating = Math.floor((Math.random() * 5 ) + 1)
    const review = {
      name: this.state.inputTextValue,
      rating: randomRating,
      comments: this.state.inputTextAreaValue
    }
    const baseUrl = 'http://localhost:3000'
    const url = `${baseUrl}/restaurants/${this.state.restaurant.id}/review`
    await axios.post(url, { review }).then(res => {
      this.inputTextAreaValue(''),
      this.inputTextValue(''),
      this.setReviews(res.data)
    }).catch(error => {
      alert('Cannot post review for this reason: ', error)
    })
  }
  componentDidMount() {
    this.getRestaurants()
  }
  render() {
    const imgFolder = require.context('../images', false, /\.(png|jpe?g|svg)$/)
    const img_node = (r) => {
      return `${imgFolder}/rest-logo-${r.id}.png`
    }
    return (
      <div className="restIndex">
        <h1 className="p-text-center">Restaurants</h1>
        <div className="p-grid p-mx-3">
          {
            this.state.restaurants.map(
              restaurant => (
                <div className="p-col-12 p-md-4 p-lg-3" key={restaurant.id}>
                  <Card title={restaurant.name}>
                    <img src={img_node(restaurant)} />
                    <div className="p-d-flex p-jc-center">
                      <Button label="See more details" onClick={() => this.restaurant(restaurant)} />
                    </div>
                  </Card>
                </div>
              )
            )
          }
        </div>
        {
          this.state.restaurant &&
          <Dialog header={ this.state.restaurant.name } visible={true} modal={true} onHide={() => this.restaurant(null)} width='500px'>
            <div className="p-grid p-nogutter p-jc-center">
              <div className="p-col-8">
                <span className="text-muted text-12">
                  { this.state.restaurant.created_at }
                </span>
              </div>
              <div className="p-col-8 p-text-justify">
                <p>
                  {this.state.restaurant.description}
                </p>
              </div>
              <div className="p-col-8">
                <div className="p-grid p-nogutter p-jc-center">
                  <div className="p-col-8">
                    <div className="p-d-flex p-jc-center p-p-1">
                      <InputText value={this.state.inputTextValue} onChange={(e) => this.inputTextValue(e.target.value)} placeholder="Insert your username here..." />
                    </div>
                    <div className="p-d-flex p-jc-center p-p-1">
                      <InputTextarea rows={3} cols={25} value={this.state.inputTextAreaValue} onChange={(e) => this.inputTextAreaValue(e.target.value)} autoResize placeholder="Review here..." />
                    </div>
                    <div className="p-d-flex p-jc-center p-p-1">
                      <Button label="Review" onClick={() => this.postReview()} id="postReview" />
                    </div>
                  </div>
                  {
                    this.state.restaurant.reviews.map(
                      review => (
                        <div className="p-col-8" key={review.id}>
                          <Divider />
                          <div>
                            <span>
                              { review.name } <span className="text-muted text-12"> comments at { review.created_at }</span>
                            </span>
                          </div>
                          <span>
                            Rating: { review.rating }
                          </span>
                          <p>
                            { review.comments }
                          </p>
                        </div>
                      )
                    )
                  }
                </div>
              </div>
            </div>
          </Dialog>
        }
      </div>
    )
  }
}

Restaurants.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  neighborhood: PropTypes.string,
  address: PropTypes.string,
  cuisine_type: PropTypes.string,
  created_at: PropTypes.string
}