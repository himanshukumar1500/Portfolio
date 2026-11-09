import Navbar from './components/Navbar'
import Hero from './components/Hero'
import { About, Skills, Projects, Experience, Services } from './components/Sections'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { profile } from './data/site'
export default function App() {
  return (<><Navbar name={profile.name} /><main><Hero /><About /><Skills /><Projects /><Experience /><Services /><Contact /></main><Footer /></>)
}
