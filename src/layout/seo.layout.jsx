import React from 'react'
import { Helmet } from 'react-helmet'

const SeoLayout = (props) => {
  const { title, description } = props

  return (
    <Helmet>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      {description && <meta name="description" content="" />}

      <link rel="icon" href="%PUBLIC_URL%/favicon.png" />
      <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />

      <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,600;0,700;1,400&display=swap" rel="stylesheet" />
      <title>{title}</title>
    </Helmet>
  )
}

export default SeoLayout
