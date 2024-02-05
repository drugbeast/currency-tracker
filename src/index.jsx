import './index.scss'

import { createRoot } from 'react-dom/client'

import App from './components/App'

document.body.innerHTML = '<div id="root"></div>'

const root = createRoot(document.getElementById('root'))
root.render(<App />)
