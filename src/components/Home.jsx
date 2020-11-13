import React, { Component } from 'react';
import AdItem from './AddListItem';
import img from '../asset/phone-app.png';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            isLoading: false,
            loadMore: 12
        }
    }
    LoadMore = () => {
    }
    render() {
        return (
            <>
                <div className="hero">
                    <div className="hero_img" />
                </div>
                <div className="home-page">

                    <div className="ad-list flex">
                        {
                            !this.props.isDataLoading ? Object.keys(this.props.data).map((key, i) => <AdItem key={key} placeholder={this.props.isDataLoading} data={this.props.data[key]} />) : null
                        }
                    </div>
                    <button className="load-more fontr c333 anim" onClick={this.LoadMore}>
                        Load More
                </button>
                </div>
                <div className="app-ribon flex aic">
                    <img className="bl" src={img} alt="" />
                    <div className="meta">
                        <h2 className="title fontb s30 color"> Try the OLX App</h2>
                        <h2 className="slogan font s18 color">Buy, sell and find just about anything using the app on your mobile</h2>
                    </div>
                    <div className="links">
                        <h2 className="title fontb s20 color"> Get Your App Today</h2>
                        <div className="flex as">
                            <Link to="#" className="noul bl"><img src="//statics.olx.com.pk/external/base/img/appstore_2x.png" alt="ios-app-store" /></Link>
                            <Link to="#" className="noul bl"><img src="//statics.olx.com.pk/external/base/img/playstore_2x.png" alt="ios-app-store" /></Link>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isDataLoading: state.isDataLoading,
        data: state.data,
        images: state.images
    }
}
const mapDispatchToProps = dispatch => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
