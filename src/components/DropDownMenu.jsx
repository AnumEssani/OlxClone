import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class DropDown extends Component {
    render() {
        return (
            <div>
                {this.props.isOpen ? <div className="dropDown flex flex-col abs">
                    {this.props.catorgery.slice(0, 10).map((data, i) =>
                        <div key={data + i}><p className="fontb">{data}</p>{Object.values(this.props.subCat)[i].slice(0, 5).map((data, i) => <Link key={data + i} className="noul color  "> <p>{data}</p> </Link>)}</div>
                    )}
                </div> : null}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    catorgery: state.catorgery,
    catIcon: state.catIcon,
    subCat: state.subCat
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(DropDown)
