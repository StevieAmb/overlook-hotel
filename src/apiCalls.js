import domUpdates from './domUpdates'
import { postErrorHandling } from './scripts'

const fetchApiData = (type) => {
  return fetch(`http://localhost:3001/api/v1/${type}`)
    .then((response) => 
    response.json())
    .catch(error => domUpdates.getErrorHandling(error))
}

const fetchSingleUser = (userID) => {
  return fetch(`http://localhost:3001/api/v1/customers/${userID}`)
    .then((response) => response.json())
    .catch(error => domUpdates.getErrorHandling(error))
}

const postBooking = (post) => {
  return fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post)
  })
  .then(response => postErrorHandling(response))
  .then(data => console.log(data))
  .catch(err => console.log(err))
}

export { fetchSingleUser, fetchApiData, postBooking }