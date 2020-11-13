import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from "react-redux";
import FireBase from './Firebase';
import NavBar from './components/NavBar'
import Home from './components/Home';
import WebFotter from './components/WebFotter';
import SingleAdView from './components/SingleAdView';
import AddFilter from './components/AddFilter';
import AdForm from './components/AdForm'
import SelectCategoryForm from './components/SelectCategoryForm';
import ChatSignBox from './components/ChatSignBox'
class App extends Component {
  componentDidMount() {
    FireBase.database().ref('data').on('value', snapshot => {
      let data = snapshot.val()
      this.props.onDataLoad(data)
    })
    FireBase.database().ref('user').on('value', snapshot => {
      let data = snapshot.val();
      this.props.onUserDataLoad(data)
    })
    FireBase.storage().ref().child('/images/').listAll().then(res => {
      let imagData = [];
      res.prefixes.forEach(folderRef => {
        let folderName = folderRef.name;
        let images = []
        folderRef.listAll().then(url => {
          url.items.forEach(async imgRef => {
            await imgRef.getDownloadURL().then(url => {
              let imgUrl = {
                name: imgRef.name,
                url: url
              }
              images.push(imgUrl)
            })
          })
        }).catch(err => { console.log(err) })
        imagData.push({ folderName: folderName, folderImages: images });
      })
      this.props.onImageLoad(imagData)
    })
  }
  render() {
    console.log('app Params',this.props.history)
    return (
      <>
        <BrowserRouter>
          <NavBar />
          <Route exact path="/" component={Home} />
          <Route path="/AdView/:id" component={SingleAdView} />
          <Route path="/browser/:id" component={AddFilter} />
          <Route path="/:id/form" component={AdForm} />
          <Route path="/select/category" component={SelectCategoryForm} />
          <Route exact path="/chat/" component={ChatSignBox}/>
          <Route path="/chat/:id"component={ChatSignBox} />
          <WebFotter />
        </BrowserRouter>
      </>
    );
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
  return {
    onDataLoad: async (data) => await dispatch({ type: "GETDATAFROMFIREBASE", isLoading: false, payload: data }),
    onImageLoad: async (data) => await dispatch({ type: "GETIMAGESFROMFIREBASE", payload: data }),
    onUserDataLoad: async (data) => await dispatch({ type: 'GETALLUSERS', payload: data })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
