import Axios from 'axios';

async function submitForm(req: { comment: string, dob: Date, rating: Number }) {
    await Axios.post(process.env.BACKEND_URL, req)
}