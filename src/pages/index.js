import React, { Component } from "react"
import { graphql , Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"


// This query is executed at build time by Gatsby.
export const GatsbyQuery = graphql`
  {
    rickAndMorty {
      character(id: 1) {
        name
        image
      }
    }
  }
`
class Index extends Component {
  render() {
      const {
          rickAndMorty: { character },
      } = this.props.data

    return (
      <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    
      <div style={{ textAlign: "center", width: "600px", margin: "50px auto" }}>
          <h1>{character.name} With his Pupper</h1>
          <p>Rick & Morty API data loads at build time.</p>
          <div>
            <img
              src={character.image}
              alt={character.name}
              style={{ width: 300 }}
            />
          </div>

          <h2>Image of Rick's pupper</h2>
          <p>This will come from a request on the client</p>
        </div>
      
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <Link to="/page-2/">Go to page 2</Link>
  </Layout>
     
    )
  }
}

export default Index


