import React, { Component } from 'react'
import { connect } from 'react-redux'
import AdItem from './AddListItem';
export class AddFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filteredDAta: [],
            States: [],
            maxPrice: '',
            minPrice: '',
        }
    }
    componentDidMount() {
        setTimeout(() => this.filterOnLoad(), 2000)
        this.setState({ State: this.props.data })
    }
    filterByMake = (prams) => {
        let data = Object.values(this.state.filteredDAta).filter(data => data.Type === prams)
        this.setState({ filteredDAta: data })
    }
    filterByStates = (prams) => {
        let data = Object.values(this.state.filteredDAta).filter(data => data.State === prams)
        this.setState({ filteredDAta: data })
    }
    filterOnLoad = () => {
        this.setState({ filteredDAta: Object.values(this.props.data).filter(data => data.Category === this.props.match.params.id) })
    }
    onHandleChange = (e) => {
        console.log()
        this.setState({ [e.target.name]: e.target.value })
    }
    onEnter = () => {
        let data = Object.values(this.state.filteredDAta).filter(data => data.SetPrice >= Number(this.state.minPrice) && data.SetPrice <= Number(this.state.maxPrice))
        this.setState({ filteredDAta: data })
    }
    render() {
        console.log(this.props.match)
        return (
            <div className="AddFilter flex">
                <div className="filterOptions">
                    <h5>Home</h5>
                    <h2>{this.props.match.params.id}</h2>
                    <h3>Filters</h3>
                    <hr />
                    <h3>CATEGORIES</h3>
                    <p>All Categories</p>
                    <p>{this.props.match.params.id}</p>
                    <hr />
                    <h3>LOCATIONS</h3>
                    <p className="bold">Pakistan</p>
                    {this.state.States.map(data => <p onClick={() => this.filterByStates(data.State)}>{data}</p>)}
                    <hr />
                    <h3>Make</h3>
                    {Object.values(this.state.filteredDAta).filter(data => data.Category === this.props.match.params.id).map(data => <p onClick={() => this.filterByMake(data.Type)}>{data.Type}</p>)}
                    <hr />
                    <h3>Price</h3>
                    <div className="priceFilter flex">
                        <input type="number" name="minPrice" id="min" value={this.state.minPrice} onChange={(e) => this.onHandleChange(e)} />
                        <input type="number" name="maxPrice" id="max" value={this.state.maxPrice} onChange={(e) => this.onHandleChange(e)} />
                        <button onClick={this.onEnter}><i class="fas fa-chevron-right"></i></button>
                    </div>

                </div>
                <div className="filterData">
                    <div className="ad-list flex">
                        {
                            !this.props.isDataLoading ? Object.values(this.state.filteredDAta).map((key) => <AdItem key={key} placeholder={this.props.isDataLoading} data={key} />) : null
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isDataLoading: state.isDataLoading,
    data: state.data,
    images: state.images

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(AddFilter)
