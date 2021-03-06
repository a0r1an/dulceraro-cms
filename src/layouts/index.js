import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Navbar from '../components/Navbar'
import Header from '../components/Header'
import Navigation from '../components/Navigation'
import './all.sass'
if (typeof window !== "undefined") {
  var WebFont = require('webfontloader');
  WebFont.load({
    google: {
      families: ['Montserrat:200,300,400,500,700,800,900']
    }
  });
}


const TemplateWrapper = ({ children }) => (
  <div style={{ fontFamily: `Montserrat` }}>
    <Helmet title="Home | dulce raro" />
    {/* <Navbar /> */}
    <Header />
    <Navigation />

    <div>{children()}</div>
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
