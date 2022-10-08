import React, { Component } from 'react'
import FormStudent from './FormStudent'
import ListStudent from './ListStudent'

export default class Form extends Component {
  render() {
    return (
      <div>
        <FormStudent />
        <ListStudent />
      </div>
    )
  }
}
