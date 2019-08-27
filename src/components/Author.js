import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import firebase from '../firebase'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'


const Author = (props) => {
    const [recommendations, setrecommendations] = useState([])
    const [authors, setauthors] = useState({})
    const [followings, setfollowings] = useState([])
    const [loading, setloading] = useState(false)
    const [authorfollowings, setauthorfollowings] = useState(0)

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

        firebase.getFollowings().then(authors => {
            setfollowings(authors)
        })
        firebase.countFollowings(props.match.params.author).then(count => {
            setauthorfollowings(count)
        })

    }, [loading])

    if (!firebase.getCurrentUsername()) {
        alert("Please login first");
        props.history.replace("/login");
        return null;
    }

    function toggleFollow(e, newFollow){
        e.preventDefault();

        if(newFollow){
            firebase.addFollowing(props.match.params.author)
            alert("You are now following this author");
            setloading(!loading)
        } else {
            firebase.removeFollowing(props.match.params.author);
            alert("You are no longer following this author");
            setloading(!loading);
        }
    }

    return (
        <main>
            <Navbar {...props} />
            <div className="container">
                <h2>{authors[props.match.params.author]}'s Recommendations </h2>
                <p className="numberOfFollowers">{authorfollowings} follower(s)</p>

                <p className="follower-button">
                    {
                        followings.includes(props.match.params.author) ? (
                            <a href="/follow" 
                                className="button is-light" 
                                onClick={e => toggleFollow(e, false)}
                                >
                                Unfollow {authors[props.match.params.author]}
                            </a>
                        ) : (
                            <a href="/follow"
                                className="button is-primary"
                                onClick={e => toggleFollow(e, true)}
                            >
                                Follow {authors[props.match.params.author]}
                            </a>
                        )
                    }
                </p>

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
