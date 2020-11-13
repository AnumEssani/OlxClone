import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

class ListItem extends Component {
    state = {
        imageSrc: {}
    }
    componentDidMount() {
        let data = ''
        setTimeout(() => {
            data = this.props.images.filter(find =>
                find.folderName === this.props.data.AddId)[0]
                .folderImages
                .map(data => data)
                .filter(obj => Object.keys(obj)
                    .some(key => obj[key].includes('title')));
            this.setState({ imageSrc: data[0] })
        },
            1000)
    }
    render() {

        return (
            <>
                {this.props.placeholder ?
                    <div className="ad">
                        <div className="pos placeholder anim"></div>
                        <div className="tit placeholder anim"></div>
                        <div className="tag placeholder anim"></div>
                        <div className="fot placeholder anim">
                            <div className="loc placeholder anim"></div>
                            <div className="stm placeholder anim"></div>
                        </div>
                    </div> :
                    <div className="ad color">
                        <Link to={`/AdView/${this.props.data.AddId}`} className="color">
                            <div className="pos">
                                {this.state.imageSrc ? <img src={this.state.imageSrc.url} alt={this.state.imageSrc.name} /> : <div className="pos placeholder anim"></div>}
                            </div>
                            <div className="tit color">
                                <h1> Rs. {this.props.data.SetPrice}</h1>
                            </div>
                            <div className="tag color">
                                <h5>{this.props.data.Title}</h5>
                            </div>
                            <div className="fot color">
                                <div className="loc">
                                    <p>{this.props.data.City},{this.props.data.Country}</p>
                                </div>
                                <div className="stm color">
                                    <p>Today</p>
                                </div>
                            </div>
                        </Link>
                    </div>


                }
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        images: state.images
    }
}
const mapDispatchToProps = dispatch => ({

})
export default connect(mapStateToProps, mapDispatchToProps)(ListItem)
