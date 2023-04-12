import * as express from 'express'
import { readFileSync } from 'fs'
import * as http from 'http'
import * as httpProxy from 'http-proxy'
import { join } from 'path'

const app = express()
const apiPrefix = '/api'
const port = process.env.PORT || 30500
const proxyTarget = process.env.PROXY_API_TARGET || 'http://192.168.10.49:35000'
const proxyServer = httpProxy.createProxyServer({ target: proxyTarget })
let indexHtml = ''

app.use(express.static('dist'))

app.use(apiPrefix, (req, resp, next) => {
  req.url = apiPrefix + req.url
  console.log(`req.url`, req.url)
  proxyServer.web(req, resp, { timeout: 10000 }, next)
})

app.use('*', (_, resp) => {
  resp.send(indexHtml)
})

async function bootstrap() {
  const resp = await getRequest()
  const html = readFileSync(join(__dirname, 'dist/index.html'), 'utf-8')
  indexHtml = html
    .replace('<meta name="BUILD_VERSION" />', `<meta name="BUILD_VERSION" content="${resp.BUILD_VERSION}"/>`)
    .replace('<meta name="BUILD_TIME" />', `<meta name="BUILD_TIME" content="${resp.BUILD_TIME}"/>`)

  app.listen(port, () => {
    console.log(`App is running on http://localhost:${port}`)
    console.log(`releaseVersion`, resp)
  })
}

function getRequest() {
  return new Promise<{ BUILD_VERSION: string; BUILD_TIME: string }>((resolve) => {
    http.get(proxyTarget + '/api/user/release-version', (resp) => {
      let data = ''

      resp.on('data', (chunk) => {
        data += chunk
      })

      resp.on('end', () => resolve(JSON.parse(data)))
    })
  })
}

bootstrap()
