import React from 'react'
import './NotFound.css'
import { Header } from '../../Utils/Header'
import Footer from '../../Utils/Footer';

export default class NotFound extends React.Component {

  render() {
    return (
      <div>
        <Header />
        < div class="not_found_container" >
          <p class="not_found_404">
            <span class="purple">4</span>
            <span class="blue">0</span>
            <span class="purple">4</span>
          </p>
          <p class="not_found_title">صفحه مورد نظر شما پیدا نشد!</p>
        </div >
        <Footer />
      </div>
    )
  }
}
