import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import firebase from '../firebase'

const Edit = (props) => {
    const [title, settitle] = useState("")
    const [category, setcategory] = useState("")
    const [recommendation, setrecommendation] = useState("")
    const [author, setauthor] = useState()

    useEffect(() => {
        firebase.getRecommendation(props.match.params.id).then(recommendation => {
            settitle(recommendation.data().recommendation.title)
            setcategory(recommendation.data().recommendation.category)
            setrecommendation(recommendation.data().recommendation.recommendation)
            setauthor(recommendation.data().recommendation.author)
        })    
    }, [])

    if (!firebase.getCurrentUsername() && firebase.auth.currentUser.uid !== recommendation.data.author) {
        alert("Please login first");
        props.history.replace("/login");
        return null;
    }

    async function updateRecommendation() {
        try {
            await firebase.updateRecommendation(props.match.params.id, {
                title,
                category,
                recommendation,
                author: firebase.auth.currentUser.uid
            })
            setcategory("");
            settitle("");
            setrecommendation("");
            props.history.push("/dashboard")
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <main>
            <Navbar {...props} />
            <div className="container">
                <h2>Hello {firebase.getCurrentUsername()}</h2>
                <h3>Edit Recommendations </h3>
                <hr />
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
                    <button 
                        type="submit" 
                        className="button" 
                        onClick={updateRecommendation}
                        >
                        Update Recommendation
                    </button>
                </form>
            </div>
        </main>
    );
}

export default Edit
