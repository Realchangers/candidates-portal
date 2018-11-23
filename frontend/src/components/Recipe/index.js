import React from 'react'
import './style.scss'

export default class Recipe extends React.Component {
  render() {
    return (
      <div className="RecipeItem">Recipe: {this.props.name}</div>
    )
  }
}
