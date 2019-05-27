import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import firebase from '../firebase'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'


const Author = (props) => {
    const [recommendations, setrecommendations] = useState([])
    const [authors, setauthors] = useState({})

    useEffect(() => {
        let tempAuthors = {}

        firebase.getAuthors().then(results => {
            results.forEach(doc => {
                tempAuthors[doc.data().uid] = doc.data().username
            })
            setauthors(tempAuthors)
            firebase.getRecommendationsByAuthor(props.match.params.author)
                .then(recommendations => {
                    let newReviews = []
                    recommendations.forEach(recommendation => {
                        newReviews.push({
                            id: recommendation.id,
                            data: recommendation.data().recommendation
                        })
                    })
                    setrecommendations(newReviews)
                })
        })
    }, [])

    if (!firebase.getCurrentUsername()) {
        alert("Please login first");
        props.history.replace("/login");
        return null;
    }

    return (
        <main>
            <Navbar {...props} />
            <div className="container">
                <h2>Hello {firebase.getCurrentUsername()}</h2>
                <h3>Author Recommendations - {authors[props.match.params.author]}: </h3>

                <div className="tile">
                    {recommendations.map((recommendation, index) => (
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
                                    href={`/author/${recommendation.data.author}`}
                                    className="card-footer-item"
                                >
                                    {authors[recommendation.data.author]}
                                </a>
                            </footer>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}

export default Author
