import axios from "axios"

const instance =axios.create({
    baseURL:'http://localhost:5001/react-firebase-auth-6db2a/us-central1/api'
    //'https://us-central1-react-firebase-auth-6db2a.cloudfunctions.net/api'
   // 'https://us-central1-challenge-4b2b2.cloudfunctions.net/api'
})

export default instance