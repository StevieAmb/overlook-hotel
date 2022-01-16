import { errorHandling } from "./scripts"

const fetchApiData = (type) => {
  return fetch(`http://localhost:3001/api/v1/${type}`)
    .then((response) => 
    response.json())
    .catch(error => console.log('fetch error', error))
}

const postBooking = (post) => {
  return fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post)
  })
  .then(response => errorHandling(response))
  .then(data => console.log(data))
  .catch(err => console.log(err))
}

export { fetchApiData, postBooking }