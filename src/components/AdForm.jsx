import React, { Component } from 'react'
import { connect } from 'react-redux'
import avatar from '../asset/avatar_1.png'
import Firebase from '../Firebase';

class Form extends Component {
    state = {
        Condition: ['New', 'Used'],
        conditionAction: '',
        Type: ['Apple', 'Danny Tabs', 'Q Tabs', 'Samsung', 'Others'],
        typeAction: '',
        uploadImage: ['', '', '', '', '', '', '', '', '', '', '', ''],
        AddId: 0,
        Category: '',
        Title: '',
        Description: '',
        SetPrice: 0,
        pictures: [],
        State: "",
        City: '',
        Country: "",
        Name: localStorage.getItem('name'),
        Mobile: ''
    }
    conditionCheck = (name) => {
        this.setState({ conditionAction: name })
    }
    TypeCheck = (name) => {
        this.setState({ typeAction: name })
    }
    onHandelChange = (e) => {
        if (e.target) {
            this.setState({ [e.target.name]: e.target.value })
            console.log(e.target.name)
        } else {
            console.log(e.type)
            let pushPicture = this.state.pictures;
            pushPicture.push(e)
            this.setState({ pictures: pushPicture })
        }
    }
    onSubmitButton = () => {
        let AdId = Math.round(Math.random() * 1000000000);
        let data = {
            AddId: AdId.toString(),
            Category: this.props.match.params.id,
            City: this.state.City,
            Condition: this.state.conditionAction,
            Country: "Pakistan",
            Description: this.state.Description,
            Mobile: "",
            Name: this.state.Name,
            SetPrice: this.state.SetPrice,
            State: this.state.State,
            Title: this.state.Title,
            Type: this.state.typeAction,
            adUserUid: localStorage.getItem('uid')
        }
        console.log(data)
        this.state.pictures.map(data => {
            let uploadRef = Firebase.storage().ref(`images/${AdId}/${data.name}`).put(data);
            uploadRef.on('state_changed', snapshot => { }, err => {
                console.log(err)
            }, () => {
                Firebase.storage().ref('images').child(`${AdId}/${data.name}`).getDownloadURL().then(url => console.log(url))
            })
            return null
        })
        Firebase.database().ref(`data/${AdId}/`).set(data);
        this.setState({
            AddId: '',
            Category: '',
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
        console.log()
        return (
            <div className="form">
                <h1 class="center">POST YOUR AD</h1>
                <div className="setecltedCategory">
                    <h2>SELECTED CATEGORY</h2>
                    <h4> <span>Change</span></h4>
                </div>
                <div className="includeSomeDetail">
                    <div>
                        <h3>Condition</h3>
                        <div className="flex">
                            {this.state.Condition.map((name, index) => {
                                return (<input type="button" className={this.state.conditionAction === name ? 'radio-Button active' : 'radio-Button'} value={name}
                                    onClick={() => this.conditionCheck(name)}
                                    key={name} />)
                            })}
                        </div>
                    </div>
                    <div>
                        <h3>Type</h3>
                        <div className="flex">
                            {this.state.Type.map((name, index) => {
                                return (<input type="button" className={this.state.typeAction === name ? 'radio-Button active' : 'radio-Button'} value={name}
                                    onClick={() => this.TypeCheck(name)}
                                    key={name} />)
                            })}

                        </div>
                    </div>
                    <div>
                        <label htmlFor="Ad-Title">Ad Title</label>
                        <div className="titleInputDiv">
                            <input className="titleInputBox" type="text" name="Title" id="Ad-Title" onChange={(e) => this.onHandelChange(e)} value={this.state.Title} maxLength="70" />
                        </div>
                        <div className="InputTextBox"><p>Mention the key features of your item (e.g. brand, model, age, type)  {this.state.Title.length}/ 70</p></div>
                    </div>
                    <div>
                        <label htmlFor="Description">Description</label>
                        <div className="titleInputDiv">
                            <textarea name="Description" id="Description" cols="30" rows="10" onChange={(e) => this.onHandelChange(e)} value={this.state.Description} maxLength="4096"></textarea>
                        </div>
                        <div className="InputTextBox"><p>A minimum length of 20 characters is required. Please edit the field.  {this.state.Description.length} / 4096</p></div>
                    </div>
                </div>
                <div className="setAPrice">
                    <h2>SET A PRICE</h2>
                    <label htmlFor="Price">Price</label>
                    <div className="titleInputDiv flex"> <p className="rupee">Rs</p><input className="titleInputBox" type="SetPrice" name="SetPrice" id="SetPrice" onChange={(e) => this.onHandelChange(e)} value={this.state.SetPrice} /></div>
                </div>
                <div className="uploadPhotos ">
                    <h2>UPLOAD IMAGES</h2>
                    <div className="uploadImageButton flex">
                        {this.state.uploadImage.map((data, i) => <UploadButton key={data + i} handleFile={(e) => this.onHandelChange(e)} />)}
                    </div>
                </div>
                <div className="confirmLocation">
                    <h2>CONFIRM YOUR LOCATION</h2>
                    <h4><span className="underLine">LIST</span>CURRENT LOCATION</h4>
                    <label htmlFor="State">State</label>
                    <div className="titleInputDiv">
                        <select className="selectBox" name="State" id="state" onChange={(e) => this.onHandelChange(e)} value={this.state.State}>
                            <option value=""></option>
                            <option value="Azad Kashmir">Azad Kashmir</option>
                            <option value="Baloshistan">Baloshistan</option>
                            <option value="Islamabad Capital Territroy">Islamabad Capital Territroy</option>
                            <option value="Kyaber Pakhtonkhwa">Kyaber Pakhtonkhwa</option>
                            <option value="Northern Areas">Northern Areas</option>
                            <option value="Punjab">Punjab</option>
                            <option value="Sindh">Sindh</option>
                        </select>
                    </div>
                    {this.state.State.length > 0 ? <>
                        <label htmlFor="City">City</label>
                        <div className="titleInputDiv"><input className="titleInputBox" type="text" name="City" id="city" onChange={(e) => this.onHandelChange(e)} value={this.state.City} /></div></> : null}
                    {
                        this.state.City.length > 0 ? <> <label htmlFor="Neighbourhood">Neighbourhood</label>
                            <div className="titleInputDiv"><input className="titleInputBox" type="text" name="Neighbourhood" id="Neighbourhood" onChange={(e) => this.onHandelChange(e)} value={this.state.Neighbourhood} /></div>
                        </> : null
                    }
                </div>
                <div className="review">
                    <h2>REVIEW YOUR DETAILS</h2>
                    <div className="avatar flex">
                        <img src={avatar} alt="avatar" />
                        <div>
                            <label htmlFor="Name">Name</label>
                            <div className="titleInputDiv">
                                <input className="titleInputBox" type="text" name="Name" id="Name" onChange={(e) => this.onHandelChange(e)} value={this.state.Name} />
                            </div>
                            <p>{this.state.Name.length} / 30</p>
                        </div>
                    </div>
                    <p>Your phone number <span>Number</span></p>
                    <p>Show my phone number on my ads <input type="radio" value="true" name="Condition" /><input type="radio" value="false" name="Condition" checked /></p>
                </div>
                <div className="postNow">
                    <button onClick={this.onSubmitButton}>POST NOW</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Form)






const UploadButton = (props) => {
    const hiddenFileInput = React.useRef(null);
    const handleClick = event => {
        hiddenFileInput.current.click();
    };
    const imageUpload = event => {
        const fileUploaded = event.target.files[0];
        props.handleFile(fileUploaded);
    };
    return (
        <>
            <div class="choose_file flex">
                <button onClick={(e) => handleClick(e)}><i class="fas fa-camera"></i></button>
                <input name="pictures" type="file" style={{ display: 'none' }} ref={hiddenFileInput} onChange={imageUpload} />
            </div>

        </>
    )

}