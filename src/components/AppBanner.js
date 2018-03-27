// Frameworks
import React, { Component } from 'react'

import styled from 'styled-components'

const AppBannerWrap = styled.div``

const WarningBanner = styled.div`
  background: #d04646;
  color: white;
  text-align: center;
  position: relative;
  z-index: 0;
  padding: .75rem;
  font-size: 1.2rem;
  animation-delay: 1s
`

class AppBanner extends Component {
  render () {
    return (
      <AppBannerWrap>
        <WarningBanner className='warning-banner slideInDown animated'>
          <b>This demo currently only works on the revived ROPSTEN network.</b>
        </WarningBanner>
      </AppBannerWrap>
    )
  }
}

export default AppBanner
