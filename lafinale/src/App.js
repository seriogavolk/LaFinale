import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Navigation/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank'
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecongnition';
import Singin from './components/SignIn/Signin';
import Register from './components/Register/Register';


const particlesOptions = {
  particles: {
    number: {
      value: 150,
      density: {
        enable: true,
        value_area: 1000
      }
    }
  }

}

const app = new Clarifai.App({apiKey: '9cfe9ed4890a488bbdea892d6814ce87'});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imgUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)

    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value })
  }
  onButtonSubmit = () => {
    this.setState({imgUrl: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response =>
    this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route:route});
  }

  render (){
   const { isSignedIn, imgUrl, route, box } = this.state;
    return (
      <div className="App">
      <Particles className='particles'
              params={particlesOptions}      
       />
      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
      { route === 'home'
      ? <div>
      <Logo/>
      <Rank/>
      <ImageLinkForm 
        onInputChange={this.onInputChange} 
        onButtonSubmit={this.onButtonSubmit}/>
      <FaceRecognition box={box} imgUrl={imgUrl}/>
      </div>
      : 
      ( route === 'signin'
      ?  <Singin onRouteChange={this.onRouteChange}/>
      :  <Register onRouteChange={this.onRouteChange}/>
      )

      
      }
      </div>
    );
  }
}
export default App;
//FACE_DETECT_MODEL
//9cfe9ed4890a488bbdea892d6814ce87
//const app = new Clarifai.App({apiKey: '9cfe9ed4890a488bbdea892d6814ce87'});