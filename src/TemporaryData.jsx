
import React, { Component } from 'react';
import { storage, database } from './Firebase';

class TemporaryData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            AddId: 0,
            Condition: '',
            Category: '',
            Type: '',
            Title: '',
            Description: '',
            SetPrice: 0,
            pictures: [],
            State: "",
            City: '',
            Country: "",
            Name: '',
            Mobile: ''
        }
        this.hiddenFileInput = React.createRef();
    }
    handleChange = (e) => {
        console.log(e.target.type)
        if (e.target.type === 'file') {
            let pushPicture = this.state.pictures;
            pushPicture.push(e.target.files[0])
            this.setState({ [e.target.name]: pushPicture })
        } else {
            this.setState({ [e.target.name]: e.target.value })
        }
        console.log(this.state.pictures)
    }
    handleClick = event => {
        this.hiddenFileInput.current.click();
    };

    Submit = () => {
        this.state.pictures.map(data => {
            let uploadRef = storage.ref(`images/${this.state.AddId}/${data.name}`).put(data);
            uploadRef.on('state_changed', snapshot => { }, err => {
                console.log(err)
            }, () => {
                storage.ref('images').child(`${this.state.AddId}/${data.name}`).getDownloadURL().then(url => console.log(url))
            })
            return null
        })
        database.ref(`data/${this.state.AddId}/`).set(this.state);
        this.setState({
            AddId: '',
            Condition: '',
            Category: '',
            Type: '',
            Title: '',
            Description: '',
            SetPrice: '',
            pictures: [],
            State: "",
            City: '',
            Country: "",
            Name: '',
            Mobile: ''
        })
    }
    render() {
        return (
            <div className="temp-Form">
                <div>
                    <label for="AddId"> AddId
                        <input id="AddId" onChange={this.handleChange} name="AddId" type="Number" placeholder="Type New/Old" value={this.state.AddId} />
                    </label>
                </div>
                <div>
                    <label for="Condition"> Condition
                        <input id="Condition" onChange={this.handleChange} name="Condition" type="text" placeholder="Type New/Old" value={this.state.Condition} />
                    </label>
                </div>
                <div>
                    <label for="Category"> Category
                        <input id="Category" onChange={this.handleChange} name="Category" type="text" placeholder="Category Name" value={this.state.Category} />
                    </label>
                </div>
                <div>
                    <label for="Type"> Type
                         <input id="Type" onChange={this.handleChange} name="Type" type="text" placeholder="Brand Name" value={this.state.Type} />
                    </label>
                </div>
                <div>
                    <label for="Title"> Title
                        <input id="Title" onChange={this.handleChange} name="Title" type="text" placeholder="Type Title" value={this.state.Title} />
                    </label>
                </div>
                <div>
                    <label for="Description"> Description
                        <input id="Description" onChange={this.handleChange} name="Description" type="text" placeholder="Type Description" value={this.state.Description} />
                    </label>
                </div>
                <div>
                    <label for="SetPrice"> SET A PRICE
                        <input id="SetPrice" onChange={this.handleChange} name="SetPrice" type="Number" placeholder="Type Price" value={this.state.SetPrice} />
                    </label>
                </div>
                <div>
                    <div class="choose_file">
                        <button onClick={(e) => this.handleClick(e)}><i class="fas fa-camera"></i></button>
                        <input name="pictures" type="file" style={{ display: 'none' }} ref={this.hiddenFileInput} onChange={this.handleChange} />
                    </div>

                </div>
                <div>
                    <label for="State"> State
                        <input id="State" onChange={this.handleChange} name="State" type="text" placeholder="Type State" value={this.state.State} />
                    </label>
                </div>
                <div>
                    <label for="City"> City
                        <input id="City" onChange={this.handleChange} name="City" type="text" placeholder="Type City" value={this.state.City} />
                    </label>
                </div>
                <div>
                    <label for="Country"> Country
                        <input id="Country" onChange={this.handleChange} name="Country" type="text" placeholder="Type Country" value={this.state.Country} />
                    </label>
                </div>
                <div>
                    <label for="Name"> Name
                        <input id="Name" onChange={this.handleChange} name="Name" type="text" placeholder="Type Name" value={this.state.Name} />
                    </label>
                </div>
                <div>
                    <label for="Mobile"> Mobile
                        <input id="Mobile" onChange={this.handleChange} name="Mobile" type="text" placeholder="Type Mobile" value={this.state.Mobile} />
                    </label>
                </div>
                <button onClick={this.Submit}>submit</button>
            </div>
        )
    }
}

export default TemporaryData;