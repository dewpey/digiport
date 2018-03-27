// Frameworks
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AppActions from '../actions/AppActions'
import styled from 'styled-components'
import { uport } from '../utilities/uportSetup'

const WelcomeWrap = styled.section``
const ConnectUport = styled.button``
const SubText = styled.p`
  margin: 0 auto 3em auto;
  font-size: 18px;
`

class Welcome extends Component {

  constructor (props) {
    super(props)
    this.connectUport = this.connectUport.bind(this)
  }

  connectUport () {
    uport.requestCredentials(
      { requested: ['name', 'phone', 'country', 'avatar'],
        notifications: true }
    ).then((credentials) => {
        console.log({credentials})
        this.props.actions.connectUport(credentials)
    })
  }

  render () {
    return (
      <WelcomeWrap>
      <img src="https://i.imgur.com/kUVkxkZ.png"></img>

        <h4>Verify your identity with digiPort</h4>
        <SubText>Be KYC and AML compliant with ease.</SubText>
        <center>
        <table>
    <tr>
    <label>
    Name:
    </label>
    </tr>
    <tr>
    <input type="text" name="name" value="John Smith" />
    </tr>
    <tr>
    <label>
    DOB:
    </label>
    </tr>
    <tr>
    <input type="text" name="DOB" value="03/21/1988" />
    </tr>
    <tr>
    <label>
    City:
    </label>
    </tr>
    <tr>
    <input type="text" name="city" value="St. Louis, MO" />
    </tr>
    <br></br>


  </table>
  </center>
  
        <ConnectUport
          onClick={this.connectUport}>
          Verify
        </ConnectUport>
        
      </WelcomeWrap>
      
      
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    uport: state.App.uport
  }
}
const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(AppActions, dispatch) }
}
export default connect(mapStateToProps, mapDispatchToProps)(Welcome)
