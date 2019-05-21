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

    async addRecommendation(recommendation) {
        if(!this.auth.currentUser){
            return alert("Not authorized")
        }

        return this.db.collection("recommendations").add({
            recommendation
        })
    }
}


export default new Firebase()