import React, {useEffect, useState} from 'react'
import Navbar from './Navbar'
import firebase from '../firebase'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'


const Dashboard = (props) => {
  const [recommendations, setrecommendations] = useState([])
  const [title, settitle] = useState("")
  const [category, setcategory] = useState("")
  const [recommendation, setrecommendation] = useState("")
  const [loading, setloading] = useState(false)
  const [authors, setauthors] = useState({})
  const [followings, setfollowings] = useState("")

  useEffect(() => {
    let tempAuthors = {}

    firebase.getAuthors().then(results => {

      results.forEach(doc => {
        tempAuthors[doc.data().uid] = doc.data().username
      })
      setauthors(tempAuthors)
      firebase.getRecommendations().then(recommendations => {
        let newReviews = []
        recommendations.forEach(recommendation => {
          newReviews.push({
            id: recommendation.id,
            data: recommendation.data().recommendation
          })
        })
        setrecommendations(newReviews)
        firebase.getFollowings().then(authors => {
          setfollowings(authors)
        })
        setloading(false)
      })
      firebase.addAuthor()
    })
  }, [loading])

if (!firebase.getCurrentUsername()){
  alert("Please login first");
  props.history.replace("/login");
  return null;
}


  async function addRecommendation() {
    try {
      await firebase.addRecommendation({title,
         category, 
         recommendation, 
         author: firebase.auth.currentUser.uid})
      setcategory("");
      settitle("");
      setrecommendation("");
      setloading(true);
    } catch (error) {
      alert(error.message)
    }
  }

  async function deleteRecommendation(e, id){
    e.preventDefault()
    await firebase.deleteRecommendation(id);
    setloading(true);
  }

  return (
    <main>
      <Navbar {...props} />
      <div className="container">
        <h2>Hello {firebase.getCurrentUsername()}'s Dashboard - Welcome</h2>

        <div className="tile">
          {recommendations.map((recommendation,index) => (
            <div key={index} className= {
              followings.includes(recommendation.data.category)
              ? `card following $(recommendation.data.category)`
              : `card ${recommendation.data.category}`
            }
          >
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
                  href={`/author/${recommendation.data.author}`}
                  className="card-footer-item"
                >
                  {authors[recommendation.data.author]}
                </a>
                {(firebase.auth.currentUser.uid == recommendation.data.author) ? (
                <Link
                  to={`/editRecommendation/${recommendation.id}`}
                  className="card-footer-item author-name"
                >
                  Edit
                </Link>
                ) : (
                   ''
                )}
                {(firebase.auth.currentUser.uid == recommendation.data.author) ? (
                  <a
                    href="/deleteRecommendation"
                    className="card-footer-item"
                    onClick={e => deleteRecommendation(e, recommendation.id)}
                  >
                    Delete
                </a>
                )  : ( ''
                )}
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

            <select
              value={category}
              aria-label="category"
              onChange={e => setcategory(e.target.value)}
            >
              <option value="">Please Select ...</option>
              <option value="Show">Show (TV/Netflix/Hulu/etc)</option>
              <option value="Book">Book</option>
              <option value="Movie">Movie</option>
              <option value="Podcast">Podcast</option>
              <option value="SubReddit">SubReddit</option>
              <option value="Youtube Channel">Youtube Channel</option>
              <option value="Website">Website (generic link)</option>
            </select>

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
