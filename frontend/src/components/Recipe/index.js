import React from 'react'
import './style.css'

export default class Recipe extends React.Component {
  render() {
    return (
      <div className="RecipeItem">Recipe: {this.props.name}</div>
    )
  }
}
