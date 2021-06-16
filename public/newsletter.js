import React, { Component } from 'react';
import PlusSlides from './slideshow.js'
// import ReactDOM from "react-dom";
// var react = require('React')
// var Newsletter = require('./../react-app/Newsletter');

// define(function (require) {
//      var react = require('React');
      // var Newsletter = require('./../react-app/Newsletter');
//      import Newsletter from '';
  
// const app = (
//       class Hello extends React.Component {
//             render() {
//               return <h1>Hello World!</h1>
//             }
//           }
// );

// ReactDOM.render(app, document.getElementById("root"));
// });
// define(function (require) {
//       var Newsletter = require('./../react-app/Newsletter');
class Hello extends Component {
render() {
return <h1>Hello World!</h1>
 }
 }
// class PlusSlides extends React.Component {
//     render(){
//     return <div>greeting</div>;
//     }
//   }
class Hello2 extends React.Component {
      componentDidMount () {
           console.log('hello is', PlusSlides)
      }
      render() {
        return <div><Hello/></div>
      }
    }
    const app = (
         <Hello2/>
    );
   ReactDOM.render(app, document.getElementById("root"));
    // ReactDOM.render(Hello, document.getElementById('root'))
// });
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.register();
