import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";

var config = {
    apiKey: "AIzaSyCajLd-SmyaI9bTXDFobLQ8VWhZzLLv8-Q",
    authDomain: "recommendit1-55d01.firebaseapp.com",
    databaseURL: "https://recommendit1-55d01.firebaseio.com",
    projectId: "recommendit1-55d01",
    storageBucket: "recommendit1-55d01.appspot.com",
    messagingSenderId: "918309800077",
    appId: "1:918309800077:web:093d243d7b78c4f2"
};

class Firebase {
    constructor (){
        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.firestore()
    }

    isInitialized(){
        return new Promise(resolve => {
            this.auth.onAuthStateChanged(resolve);
        })
    }

    login(email, password){
        return this.auth.signInWithEmailAndPassword(email, password)
    }

    logout(){
        return this.auth.signOut()
    }

    async register(name, email, password){
        await this.auth.createUserWithEmailAndPassword(email, password)
        return this.auth.currentUser.updateProfile({
            displayName: name
        })
    }

    getCurrentUsername(){
        return this.auth.currentUser && this.auth.currentUser.displayName;
    }

    async getRecommendations(){
        const recommendations = await this.db.collection('recommendations').get()
        return recommendations;
    }

    async getRecommendationsByCategory(category) {
        const recommendations = await this.db
        .collection('recommendations')
        .where("recommendation.category", "==", category)
        .get()
        return recommendations;
    }

    async getRecommendationsByAuthor(author) {
        const recommendations = await this.db
            .collection('recommendations')
            .where("recommendation.author", "==", author)
            .get()
        return recommendations;
    }

    async getRecommendation(id) {
        const recommendation = await this.db.collection('recommendations').doc(id).get()
        return recommendation;
    }

    addRecommendation(recommendation) {
        if(!this.auth.currentUser){
            return alert("Not authorized")
        }

        return this.db.collection("recommendations").add({
            recommendation
        })
    }

    updateRecommendation(id, recommendation) {
        if(!this.auth.currentUser) {
            return alert('Not authorized')
        }

        return this.db.collection("recommendations").doc(id).update({
            recommendation
        })
    }

    deleteRecommendation(id){
        return this.db.collection('recommendations')
        .doc(id)
        .delete()
    }

    async addAuthor() {
        const author = await this.db
            .collection("authors")
            .where("uid", "==", this.auth.currentUser.uid)
            .get()
        let count = 0;
        author.forEach(val => {
            count++;
        })
        if(!count) {
            return this.db.collection("authors").add({
                uid: this.auth.currentUser.uid,
                username: this.auth.currentUser.displayName
            })
        } else {
            return true;
        }
    }

    async getAuthors() {
        const authors = await this.db.collection("authors").get()
        return authors;
    }
}


export default new Firebase()