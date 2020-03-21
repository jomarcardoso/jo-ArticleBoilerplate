import React, { useEffect, useState } from 'react';
import { graphql } from 'gatsby';
import '../css/print.scss';
import '../css/screen.scss';
import Cover from '../components/cover/cover';
import Summary from '../components/summary/summary';
export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data; // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark;
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="print">
      <Cover {...frontmatter} />
      <Summary loaded={loaded} />
      <div
        className="page development"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
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
`;
