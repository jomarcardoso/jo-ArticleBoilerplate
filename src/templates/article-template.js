import React from 'react'
import { graphql } from 'gatsby'
import '../css/print.css'
import '../css/screen.scss'
import Cover from '../components/cover'
export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  return (
    <div className="print">
      <Cover {...frontmatter} />
      <div className="page" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}
export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date
        name
        institution
        city
        path
        title
      }
    }
  }
`
