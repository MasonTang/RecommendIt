import React, {useEffect, useState} from 'react'
import Navbar from './Navbar'
import firebase from '../firebase'

const Dashboard = (props) => {
  const [recommendations, setrecommendations] = useState([])
  const [title, settitle] = useState("")
  const [category, setcategory] = useState("")
  const [recommendation, setrecommendation] = useState("")
  const [loading, setloading] = useState(false)

  useEffect(() => {
    firebase.getRecommendations().then(recommendations => {
        let newReviews = []
        recommendations.forEach(recommendation => {
          newReviews.push({
            id: recommendation.id,
            data: recommendation.data().recommendation 
          })
        })
          setrecommendations(newReviews)
          setloading(false)
      })
  }, [loading])

if (!firebase.getCurrentUsername()){
  alert("Please login first");
  props.history.replace("/login");
  return null;
}


  async function addRecommendation() {
    try {
      await firebase.addRecommendation({title, category, recommendation})
      setcategory("");
      settitle("");
      setrecommendation("");
      setloading(true);
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <main>
      <Navbar {...props} />
      <div className="container">
        <h2>Hello {firebase.getCurrentUsername()}</h2>
        <h3>Current Recommendations ({recommendations.length}) </h3>

        <div className="tile">
          {recommendations.map((recommendation,index) => (
            <div key={index} className="card">
              <header className="card-header">
                <p className="card-header-title">{recommendation.data.title}</p>
              </header>
              <div className="card-content">
                <div className="content">
                  {recommendation.data.recommendation}
                </div>
              </div>
              <footer className="card-footer">
                <a 
                  href={`/category/${recommendation.data.category}`}
                  className="card-footer-item"
                >
                  {recommendation.data.category}
                </a>
                <a
                  href="/deleteRecommendation"
                  className="card-footer-item"
                  onClick={e => console.log(e, recommendation.id)}
                >
                  Delete
                </a>
              </footer>
            </div>            
          ))}
        </div>

        <hr />
        <h3>Add a Recommendation</h3>
        <form onSubmit={e => e.preventDefault() && false}>
          <div>
            <input
              placeholder="title"
              type="text"
              value={title}
              aria-label="title"
              onChange={e => settitle(e.target.value)}
            />

            <input
              placeholder="category"
              type="text"
              value={category}
              aria-label="category"
              onChange={e => setcategory(e.target.value)}
            />

            <input
              placeholder="recommendation"
              type="text"
              value={recommendation}
              aria-label="recommendation"
              onChange={e => setrecommendation(e.target.value)}
            />
          </div>
          <button type="submit" className="button" onClick={addRecommendation}>Add Recommendation</button>
        </form>
      </div>
    </main>
  );
}

export default Dashboard
