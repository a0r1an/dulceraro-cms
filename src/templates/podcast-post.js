import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import Content, { HTMLContent } from '../components/Content'

export const BlogPostTemplate = ({
  content,
  contentComponent,
  tags,
  title,
  helmet,
  featuredContent,
  featuredContentComponent,
  videoPlayer,
  videoPlayerComponent,
  podcastPlayer,
  podcastPlayerComponent
}) => {
  const PostContent = contentComponent || Content
  const PodcastPlayer = podcastPlayerComponent || Content
  const VideoPlayer = videoPlayerComponent || Content

  return (
    <section className="section">
      {helmet || ''}
        <div className="container container-content">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            {/* {featuredContent} */}
            <div className="videoContainer">
              <VideoPlayer content={videoPlayer} />
            </div>
            <PostContent content={content} />
            <div className="podcastContainer">
              <PodcastPlayer content={podcastPlayer} />
            </div>
            {tags && tags.length ? (
              <div className="tags">
              <h4>Tags</h4>
                <ul className="taglist">
                  {tags.map(tag => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
    </section>
  )
}

BlogPostTemplate.propTypes = {
  content: PropTypes.string.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  featuredContent: PropTypes.string,
  featuredContentComponent: PropTypes.func,
  podcastPlayer: PropTypes.string,
  podcastPlayerComponent: PropTypes.func,
  videoPlayer: PropTypes.string,
  videoPlayerComponent: PropTypes.func,
  helmet: PropTypes.instanceOf(Helmet),
}

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <BlogPostTemplate
      content={post.html}
      contentComponent={HTMLContent}
      helmet={<Helmet title={`${post.frontmatter.title} | Blog`} />}
      tags={post.frontmatter.tags}
      title={post.frontmatter.title}
      featuredContent={post.frontmatter.featuredContent}
      featuredContentComponent={HTMLContent}
      podcastPlayer={post.frontmatter.podcastPlayer}
      podcastPlayerComponent={HTMLContent}
      videoPlayer={post.frontmatter.videoPlayer}
      videoPlayerComponent={HTMLContent}
    />
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
  query PodcastPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        tags
        featuredContent
        podcastPlayer
        videoPlayer
      }
    }
  }
`
