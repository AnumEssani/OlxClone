import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Footer extends Component {
    render() {
        return (
            <>
            <div className="footer flex">
                <div className="block flex flex-col">
                    <h2 className="title s16 fontb color">Populor Categories</h2>
                    <Link className="noul noulh font s14 color" to="/">Cars</Link>
                    <Link className="noul noulh font s14 color" to="/">Flats for rent</Link>
                    <Link className="noul noulh font s14 color" to="/">Jobs</Link>
                    <Link className="noul noulh font s14 color" to="/">Mobile Phones</Link>
                </div>
                <div className="block flex flex-col">
                    <h2 className="title s16 fontb color">Treanding Searches</h2>
                    <Link className="noul noulh font s14 color" to="/">Bikes</Link>
                    <Link className="noul noulh font s14 color" to="/">Watches</Link>
                    <Link className="noul noulh font s14 color" to="/">Books</Link>
                    <Link className="noul noulh font s14 color" to="/">Dogs</Link>
                </div>
                <div className="block flex flex-col">
                    <h2 className="title s16 fontb color">About us</h2>
                    <Link className="noul noulh font s14 color" to="/">About OLX Group</Link>
                    <Link className="noul noulh font s14 color" to="/">OLX Blog</Link>
                    <Link className="noul noulh font s14 color" to="/">Contact Us</Link>
                    <Link className="noul noulh font s14 color" to="/">OLX for Business</Link>
                </div>
                <div className="block flex flex-col">
                    <h2 className="title s16 fontb color">OLX</h2>
                    <Link className="noul noulh font s14 color" to="/">Help</Link>
                    <Link className="noul noulh font s14 color" to="/">Sitemap</Link>
                    <Link className="noul noulh font s14 color" to="/">Legal Privacy Information</Link>
                </div>
            </div>
            <div className="footerb flex">
                <h2 className="cfff font s14">Other Countries India - South Africa - Indonesia</h2>
                <h2 className="r cfff font s14">Free Classifieds in Pakistan. © 2006-2020 OLX</h2>
            
            </div>
            </>
        )
    }
}

export default Footer
