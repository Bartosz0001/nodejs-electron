import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
  state = {
    status: 'off',
    time: 20, //rest 20s, work 20m
    timer: null,
  };

  startTimer() {
    this.setState({
      status: 'work',
      time: 1200,
      timer: setInterval(this.step, 1000),
    });
  }

  stopTimer() {
    this.setState({
      status: 'off',
      timer: null,
    });
    clearInterval(this.state.timer);
  }

  step = () => {
    const currentTime = this.state.time - 1;
    this.setState({
      time: currentTime,
    });
  }

  formatTime() {
    if(this.state.time > 59) {
      const minutes = Math.floor(this.state.time / 60);
      const secunds = this.state.time % 60;
      if(secunds < 10) return minutes + ':0' + secunds;
      return minutes + ':' + secunds;
    }
    else if(this.state.time > 0) {
      return this.state.time;
    }
    else {
      if(this.state.status === 'work') {
        this.setState({status: 'rest', time: 20,});
        this.playBell();
      }
      else if(this.state.status === 'rest') {
        this.setState({status: 'work', time: 1200,});
        this.playBell();
      }
    }
  }

  closeApp() {
    window.close();
  }

  playBell() {
    const audioElement = new Audio('./sounds/bell.wav');
    audioElement.play();
  }

  render() {
    return (
      <div>
        <h1>Protect your eyes</h1>
        <div className={this.state.status === 'off' ? 'showed' : 'hidden'}>
          <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
          <p>This app will help you track your time and inform you when it's time to rest.</p>
        </div>
        <img src="./images/work.png" className={this.state.status === 'work' ? 'showed' : 'hidden'}/>
        <img src="./images/rest.png" className={this.state.status === 'rest' ? 'showed' : 'hidden'}/>
        <div className={this.state.status != 'off' ? 'timer' : 'hidden'}>
          {this.formatTime()}
        </div>
        <button className={this.state.status === 'off' ? 'btn' : 'hidden'} onClick={() => this.startTimer()}>Start</button>
        <button className={this.state.status != 'off' ? 'btn' : 'hidden'} onClick={() => this.stopTimer()}>Stop</button>
        <button className="btn btn-close" onClick={() => this.closeApp()}>X</button>
      </div>
    )
  }
};

render(<App />, document.querySelector('#app'));
