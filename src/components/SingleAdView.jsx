import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import avatar from '../asset/avatar_1.png'

class AdDetailView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            currentImage: ''
        }
    }
    componentDidMount() {
        this.props.getAddDetailData(this.props.match.params.id)
    }
    componentDidUpdate(prevProps) {
        console.log(prevProps.isLoading)
        if (prevProps.isLoading !== this.props.isLoading) {
            this.props.getAddDetailData(this.props.match.params.id)
        }

    }
    onImageClick(src) {
        this.setState({ currentImage: src })
    }
    render() {
        console.log(this.props.detailAddViewData)
        return (
            <>
                {
                    this.props.detailAddViewData.length > 0 && this.props.detailAddImageData.length > 0 ?
                        <div className="detail-page flex">
                            <div className="detail-box">
                                <div className="detail-img">
                                    {this.state.currentImage.length > 0 ? <img src={this.state.currentImage} alt='sliderImage' />
                                        :
                                        this.props.detailAddImageData[0].folderImages.length > 0 ?
                                            <img src={Object.values(this.props.detailAddImageData[0].folderImages)[0].url} alt={Object.values(this.props.detailAddImageData[0].folderImages)[0].name} /> : null
                                    }
                                </div>
                                <div className="detail-img-list">
                                    {Object.values(this.props.detailAddImageData[0].folderImages).map(data => <img src={data.url} alt={data.name} onClick={() => this.onImageClick(data.url)} />)}
                                </div>
                                <div className="detail-description">
                                    <div className="detail">
                                        <h1>Detail</h1>
                                        <div className="flex">
                                            <h4>Make</h4> <h4>{this.props.detailAddViewData[0].Type}</h4> <h4>Condition</h4> <h4> {this.props.detailAddViewData[0].Condition}</h4>

                                        </div>
                                    </div>
                                    <hr />
                                    <div className="discription">
                                        <h1>Desricption</h1>
                                        <h4>
                                            {this.props.detailAddViewData[0].Description}

                                        </h4>
                                    </div>
                                </div>
                            </div>
                            <div className="other-detail">
                                <div className="detail-price">
                                    <h1>Rs {this.props.detailAddViewData[0].SetPrice}</h1>
                                    <h3>{this.props.detailAddViewData[0].Title}</h3>
                                    <h5>{this.props.detailAddViewData[0].City}, {this.props.detailAddViewData[0].State}, {this.props.detailAddViewData[0].Country} <span>Today</span></h5>
                                </div>
                                <div className="detail-seller">
                                    <h3>Seller description</h3>
                                    <div className="avatar-img flex">
                                        <img src={avatar} alt="avatar" style={{ height: '100 %' }} />
                                        <div className="text">
                                            <h2>{this.props.detailAddViewData[0].Name}</h2>
                                            <h5>member since Now</h5>
                                        </div>
                                    </div>
                                    <Link to={`/chat/${this.props.detailAddViewData[0].adUserUid}`}><button>Chat with saller</button></Link>
                                    <div className="showNumber">
                                        <h5> ******* <Link>Show number</Link></h5>
                                    </div>
                                </div>
                                <div className="detail-map">
                                    <h3>Posted in</h3>
                                    <h5>{this.props.detailAddViewData[0].City}, {this.props.detailAddViewData[0].State}, {this.props.detailAddViewData[0].Country}</h5>
                                    <iframe title="Pakistan" width="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=1%20Grafton%20Street,%20Dublin,%20Ireland+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
                                </div>

                            </div>
                        </div>
                        // null
                        : <h1>Loading .....</h1>
                }
            </>
        )
    }
}


const mapStateToProps = state => ({
    detailAddViewData: state.detailAddViewData,
    detailAddImageData: state.detailAddImageData,
    isLoading: state.isDataLoading
})

const mapDispatchToProps = dispatch => ({
    getAddDetailData: async (data) => await dispatch({ type: 'GETADDETAILVIEW', payload: data })
})

export default connect(mapStateToProps, mapDispatchToProps)(AdDetailView)
