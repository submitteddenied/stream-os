import axios from 'axios'

const BASE_URL = 'https://api.todoist.com/rest/v1'

class Todoist {
  constructor(token) {
    this.token = token
    this.axios = axios.create({
      baseURL: BASE_URL,
      headers: {
        Authorization: `${this.token.type} ${this.token.token}`
      }
    })
  }

  getTasks() {
    return this.axios.get('tasks')
      .then((response) => response.data)
  }
}

export default Todoist