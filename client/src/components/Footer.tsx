import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import styles from "../styles/footer.module.css";


function Footer() {
  return (
    <>
      <footer className={`footer-main bg-dark ${styles.footer}`}>
        <div className="container">
          <div className="row address-main">
            <div className="col-lg-4 col-sm-12 col-xs-12">
              <div className="address-box clearfix">
                <div className="add-icon">
                  <img src="Img/footer-icon-01.png" alt="" />
                </div>
                <div className="add-content">
                  <h5 style = {{color: "white"}}>Address</h5>
                  <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut veniam </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-12 col-xs-12">
              <div className="address-box clearfix">
                <div className="add-icon">
                  <img src="Img/footer-icon-02.png" alt="" />
                </div>
                <div className="add-content">
                  <h5 style = {{color: "white"}}>Phone</h5>
                  <p>123456789</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-12 col-xs-12">
              <div className="address-box clearfix">
                <div className="add-icon">
                  <img src="Img/footer-icon-03.png" alt="" />
                </div>
                <div className="add-content">
                  <h5 style = {{color: "white"}}>Email</h5>
                  <p> <a href="mailto:" style={{textDecoration:"none"}}>tapeshvashisth789@gmail.com</a> </p>
                </div>
              </div>
            </div>
          </div>
      </div>


      <div className={styles.tagContainer}>
        <div style = {{display: "flex", flexDirection: "row", justifyContent: "center", padding: "5px"}}>
            <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
              <FacebookIcon />
            </a>

            <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
              <TwitterIcon />
            </a>

            <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
              <GitHubIcon />  
            </a>
        </div>

        <div className="text-center p-2" style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}>
          WildAid © 2023 All Rights Reserved.
        </div>
      </div>
      </footer>
    </>
  )
}

export default Footer