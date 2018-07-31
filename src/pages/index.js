import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import styled from 'styled-components';

import logo from "..//img/podcast.png";


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

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props;
     const { edges: posts } = data.blog
     const { edges: podcastPosts } = data.podcast;

    return (
      <section className="section" >
        <div className="container">
          {/* <div className="content">
            <h1 className="has-text-weight-bold is-size-2">Latest Stories</h1>
          </div> */}
          {posts
            .map(({ node: post }) => (
              <Card
                className="content"
                style={{backgroundSize: 'cover', background: 'url('+ post.frontmatter.thumbnail +') center/cover' }}
                key={post.id}
              >
                <Link className="button is-small no-background" to={post.fields.slug} style={{position:'absolute',height: '100%',width:'100%',display: 'block'}}>
                  <CardHeadline>
                    <span>{post.frontmatter.title}</span>
                    <small>{post.frontmatter.date}</small>
                  </CardHeadline>
                </Link>
              </Card>
            ))}
        </div>
        <div className="section section-podcast">
          <div className="container">
            <div className="headlineContainer">
              <img src={logo} />
              <h3>Our Podcasts</h3>
            </div>
            <div className="latestPodcast">
            {podcastPosts
            .map(({ node: post }) => (
              <div className="column" key={post.id}>
                <Link className="imgContainer" to={post.fields.slug}>
                  <img src={post.frontmatter.thumbnail} />
                </Link>
                <div>
                  <h4><Link to={post.fields.slug}>{post.frontmatter.title}</Link></h4>
                  <small>{post.frontmatter.date}</small>
                </div>
              </div>
            ))}
            </div>
            <h6><a href="#">All Podcasts</a></h6>
          </div>
        </div>
      </section>
    )
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    blog: PropTypes.shape({
      allMarkdownRemark: PropTypes.shape({
        edges: PropTypes.array,
      }),
    }),
  }),
}

export const pageQuery = graphql`
  query IndexQuery {
    blog:allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] },
      filter: { frontmatter: { templateKey: { regex: "/blog/" } }}
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            thumbnail
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
    podcast:allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] },
      filter: { frontmatter: { templateKey: { regex: "/podcast/" } }},
      limit: 3
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            thumbnail
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
