import React, { Component } from 'react'
import logo from '../asset/Logo.png'
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import Popup from './SignInBox';
import DropDown from './DropDownMenu';


class header extends Component {
    state = {
        isOpen: false,
        serchInput: '',
        isDropDownOpen: false
    }
    onHHandleChange = (e) => {
        this.setState({ serchInput: e.target.value })
    }
    onClickHandel = () => {
        this.setState({ isOpen: !this.state.isOpen })
        console.log(this.state.isOpen)
    }
    // sellButton = () => {
    //     if (!!localStorage.getItem('uid')) {
    //         window.location.href = "/select/category"
    //     } else {
    //         console.log('notLogin')
    //     }
    // }
    goToHome = () => {
        window.location.href = "/"
    }
    render() {
        return (
            <>
                <div className={`header fixed flex aic ${!!localStorage.getItem('uid') ? 'newHeader' : null}`}>
                    <div className="logo">
                        <img src={logo} alt="" onClick={this.goToHome} />
                    </div>
                    <div className="location rel flex aic">
                        <div className="fas fa-search ico s24" />
                        <input className="label s15 font" placeholder="Your Location" value="Pakistan" />
                        <button className="fas fa-chevron-down arrow s24" />
                    </div>
                    <div className="search flex aic">
                        <input className="query" placeholder="Find Cars, Mobile Phones and More...." value={this.state.serchInput} onChange={this.onHHandleChange} />
                        <button className="fas fa-search go s24" />
                    </div>
                    <div className="action flex aic">
                        {!!localStorage.getItem('uid') ? <div className="flex profile"><Link className="noulh noul icon-hover" to="/chat"><i class="far fa-comment color fontb s20 "></i></Link><Link className="noulh noul icon-hover"><i class="far fa-bell color fontb s20"></i></Link><img className="profile-avtr" src={localStorage.getItem('photo')} alt={localStorage.getItem('name')} /></div> : <><Link onClick={this.onClickHandel} className="color fontb s15 noulh noul">Login</Link>
                            <Popup isOpen={this.state.isOpen} popUpClose={this.onClickHandel} /></>}
                        <Link className="sell noul flex aic" to={!!localStorage.getItem('uid') ? "/select/category" : '/'}>
                            <div className="fas fa-plus ico s24" />
                            <h2 className="s18 font">sell</h2>
                        </Link>
                    </div>
                </div>
                <div className="hnav fixed flex aic">
                    <button className="view-cates flex aic color" onClick={() => this.setState({ isDropDownOpen: !this.state.isDropDownOpen })}>
                        <h2 className="s18 font">All Categories</h2>
                        <button className="fas fa-chevron-down arrow s18" />
                    </button>
                    {this.props.nav.map(item => <Link key={item.id} to={`/browser/${item.label}`} className="bl noul noulh font s15 color">{item.label}</Link>)}
                </div>
                <DropDown isOpen={this.state.isDropDownOpen} />
                <div className="hclr" />
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        nav: state.nav,
        isLogin: state.isLogin,
        user: state.user
    }
}
const mapDispatchToProps = dispatch => {

}
export default connect(mapStateToProps, mapDispatchToProps)(header)
