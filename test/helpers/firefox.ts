import { resolve } from 'path'
import execa from 'execa'
import { Test } from 'blue-tape'
import waitForMarionette from './wait-for-marionette'

const localExtPath = resolve('test', 'extension')
export const containerExtPath = '/home/firefox/extension'

export const runFirefox = () => execa('docker',
  `run -id --rm --shm-size 2g -v ${localExtPath}:${containerExtPath} -p 2828:2828 --name foxr-firefox deepsweet/firefox-headless-remote:67`.split(' ')
)

export const stopFirefox = () => execa('docker',
  'stop --time 5 foxr-firefox'.split(' '),
  { reject: false }
)

export const testWithFirefox = (test: (t: Test) => Promise<void>) => async (t: Test) => {
  try {
    // await stopFirefox()
    await runFirefox()
    await waitForMarionette(2828)
    await test(t)
  } finally {
    await stopFirefox()
  }
}
