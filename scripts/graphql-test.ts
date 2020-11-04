import axios from 'axios'

// 5dad5fbd0810ba986abed700f2322ce6d2af1781

axios.post('https://api.github.com/graphql', {
  query: 'query { viewer {login} }'
}, {
  headers: {
    Authorization: 'Bearer 5dad5fbd0810ba986abed700f2322ce6d2af1781'
  }
}).then((res) => {
  console.log(res.data)
})
