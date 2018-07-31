import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import styled from 'styled-components';

const Card = styled.div`
  height: 200px;
  border: 1px solid #eaecee;
  position:relative;
  flex: 0 1 90%;
  margin-bottom: 40px;
  @media (min-width: 600px) {
    height: 250px;
  }
  @media (min-width: 800px) {
    flex: 0 1 380px;
  }
`;
const CardHeadline = styled.h2`
  font-weight: bold;
  text-transform: uppercase;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #ea3fdd80;
  margin:0;
  padding: 0;
  color: white;
  font-size: 1.5em;
  > span {
    padding: 10px 10px 0 10px;
    display: block;
  }
  > small{
    font-size: 12px;
    display: block;
    padding: 0 0 10px 10px;
  }
`;

class TagRoute extends React.Component {
  render() {
    const { data } = this.props;
    console.log(data.allMarkdownRemark);
    const { edges: posts } = data.allMarkdownRemark
    
    const tag = this.props.pathContext.tag
    const title = this.props.data.site.siteMetadata.title
    const totalCount = this.props.data.allMarkdownRemark.totalCount
    return (
      <section className="section">
        <div className="container content">
         
            {posts
      .map(({ node: post }) => (
        <Card className="content" style={{backgroundSize: 'cover', background: 'url('+ post.frontmatter.thumbnail +') center/cover' }} key={post.id}>
          <Link className="button is-small no-background" to={post.fields.slug} style={{position:'absolute',height: '100%',width:'100%',display: 'block'}}>
            <CardHeadline>
              <span>{post.frontmatter.title}</span>
              <small>{post.frontmatter.date}</small>
            </CardHeadline>
          </Link>
        </Card>
      ))}
            
        </div>
      </section>
    )
  }
}

export default TagRoute

export const tagPageQuery = graphql`
  query PodcastPage {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000,
      sort: { fields: [frontmatter___date], order: DESC },
      filter: { frontmatter: { templateKey: { regex: "/podcast/" } }},
    ) {
      totalCount
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            thumbnail
          }
        }
      }
    }
  }
`
