import React, { Component } from "react"
import { graphql , Link } from "gatsby"
import axios from "axios"

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

  state = {
    loading: false,
    error: false,
    pupper:{
      img: "",
      breed: "",
    },
  }

  componentDidMount() {
    this.fetchRicksPupper()
  }

  fetchRicksPupper = () =>{
    this.setState({loading: true})
    axios
      .get(`https://dog.ceo/api/breeds/image/random`)
      .then(pupper =>{

        const {
          data: { message: img },
        } = pupper

        const breed = img.split("/")[4]

        this.setState({
          loading: false,
          pupper: {
            ...this.state.pupper,
            img,
            breed,
          },
        })
      })
      .catch(error => {
        this.setState({ loading: false, error })
      })
  }

  render() {
      const {
          rickAndMorty: { character },
      } = this.props.data

      const { img, breed } = this.state.pupper

    return (
      <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    
      <div style={{ textAlign: "center", width: "600px", margin: "50px auto" }}>
          <h1>{character.name} With his Pupper</h1>
          <p>Rick & Morty API data loads at build time.</p>
          <p>Dog API data loads at run time.</p>
          <div>
            <img
              src={character.image}
              alt={character.name}
              style={{ width: 300 }}
            />
          </div>
          <div>
             { this.state.loading ? (
               <p> Please hold, pupper is comming!</p>
             ) : img && breed ? (
              <>  
                <h2> { `${breed} pupper!` }</h2>
                <img src={img} alt={`cute random `} style={{ maxWidth: 300 }} />
              </>
             ) : (
              <p>Oh noes, error fetching pupper :(</p>
            )}
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


