const API_URL = '/api/user_places_reviews';

export function loadData() {
  return fetch(API_URL)
         .then(res => res.json())
         .then(data => {
           return data.records;
         })
}


