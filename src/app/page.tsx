// app/page.tsx
import Header from './components/Header'
import About from './components/About'
import Services from './components/Services'
import Work from './components/Work'
import Contact from './components/Contact'
import Footer from './components/Footer'
import BlogPreview from './components/BlogPreview'  // preview 3 post

export default function HomePage() {
  return (
    <main className="portfolio-page min-h-screen">
      <section className="container-std pt-0">
        <Header />
        <About />
        <Services />
        <Work />
        <BlogPreview />
        <Contact />
        <Footer />
      </section>
    </main>
  )
}
