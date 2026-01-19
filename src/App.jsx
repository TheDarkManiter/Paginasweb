import React from 'react';
import Header from './components/Header';
import About from './sections/About';
import Schedule from './sections/Schedule';
import Classes from './sections/Classes';
import ContactForm from './sections/ContactForm';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';

function App() {
  return (
    <>
      <Header />
      <main>
        <About />
        <Schedule />
        <Classes />
        <ContactForm />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}

export default App;