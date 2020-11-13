import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import Firebase from '../Firebase'
class PopupComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
    }

    customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 99999
        }
    };
    onClickHandel = () => {
        this.setState({ isOpen: !this.state.isOpen })
        console.log(this.state.isOpen)
    }
    onFacebookClick = () => {
        let provider = new Firebase.auth.FacebookAuthProvider();
        let dispatch = this.props.getLoginDistpatch;
        let close = this.props.popUpClose;
        Firebase.auth().signInWithPopup(provider).then(function (result) {
            let user = result.user;
            let data = {
                uid: user.uid,
                name: user.displayName,
                email: user.email,
                photo: user.photoURL
            }
            localStorage.setItem("email", user.email)
            localStorage.setItem("uid", user.uid)
            localStorage.setItem('photo', user.photoURL)
            localStorage.setItem('name', user.displayName)
            Firebase.database().ref(`/user/${data.uid}/`).set(data)
            dispatch(data);
            close()
        }).catch(function (error) {
        });
    }
    onGoogleClick = () => {
        let provider = new Firebase.auth.GoogleAuthProvider();
        let dispatch = this.props.getLoginDistpatch;
        let close = this.props.popUpClose;
        Firebase.auth().signInWithPopup(provider).then(function (result) {
            var user = result.user;
            let data = {
                uid: user.uid,
                name: user.displayName,
                email: user.email,
                photo: user.photoURL
            }
            localStorage.setItem("email", user.email)
            localStorage.setItem("uid", user.uid)
            localStorage.setItem('photo', user.photoURL)
            localStorage.setItem('name', user.displayName)
            Firebase.database().ref(`/user/${data.uid}/`).set(data)
            dispatch(data);
            close()
        }).catch(function (error) {
            console.log(error)
        });

    }
    render() {
        console.log(this.props)
        return (
            <>

                <Modal isOpen={this.props.isOpen} style={this.customStyles} onAfterOpen={this.afterOpenModal}>
                    <button className="button-Login" onClick={this.onFacebookClick}>Continue with Facebook</button>
                    <button className="button-Login" onClick={this.onGoogleClick}>Continue With Google</button>
                    <button className="button-Login" onClick={this.props.popUpClose}>cencel</button>
                </Modal>
            </>
        )
    }
}
const mapStateToProps = state => {

}
const mapDispatchToProps = dispatch => {
    return {
        getLoginDistpatch: (data) => dispatch({ type: 'LOGIN', payload: data })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PopupComponent);
