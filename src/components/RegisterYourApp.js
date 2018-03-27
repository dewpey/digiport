// Frameworks
import React, { Component } from 'react'
import styled from 'styled-components'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AppActions from '../actions/AppActions'

const RegisterYourAppWrap = styled.section``
const NextButton = styled.button`
  margin-top: 20px;
`
const Link = styled.a`
  display: block;
`

class RegisterYourApp extends Component {
  render () {
    return (
      <RegisterYourAppWrap>
        <h4>Register your Application</h4>
        <br/>
        <Link className='external' target='_blank' href='http://developer.uport.me'>
          Go to the full Documentation Site.
        </Link>
        <br/>
        <Link className='external' target='_blank' href='http://developer.uport.me/myapps.html'>
          Go directly to the App Manager in the Documentation Site
        </Link>
        <br/>
        <Link className='external' target='_blank' href='https://goo.gl/6mq9NW'>
          Click here to read the 'How To' Guide for App Manager
        </Link>
        <br/>
        <NextButton
          onClick={this.props.actions.registerAppAreaComplete}>
          Next
        </NextButton>
      </RegisterYourAppWrap>
    )
  }
}

const mapStateToProps = (state, props) => {
  return { }
}
const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(AppActions, dispatch) }
}
export default connect(mapStateToProps, mapDispatchToProps)(RegisterYourApp)
