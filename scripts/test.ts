import sharp from 'sharp'
import axios from 'axios'

// https://source.unsplash.com/1600x900/?nature,water

let filename

axios.get('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604483977402&di=dea099995bb8251efca319e7344188ae&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201808%2F19%2F20180819002423_nkeig.jpg', { responseType: 'arraybuffer' })
  .then((res) => {
    console.log('Resizing Image!')
    return sharp(res.data)
      .resize(900, 383, {
        fit: 'cover'
      })
      .toFile('posts/abc.png')
  })
  .then(() => {
    console.log('Image downloaded and resized!')
  })
  .catch((err) => {
    console.log(`Couldn't process: ${err}`)
  })
