import React from 'react';
import ReactDOM from 'react-dom';

class ReactBox extends React.Component {
  constructor() {
    super();
    this.state = { ideas: [] };
  }

  componentDidMount() {
    const items = JSON.parse(localStorage.getItem('ideas'));
    this.setState({ ideas: items ? items : [] });
  }

  storeIdea(idea) {
    this.state.ideas.push(idea);
    let ideas = this.state.ideas;
    this.setState({ideas: ideas}, () => localStorage.setItem('ideas', JSON.stringify(ideas)));
  }

  render() {
    const activeIdea = this.state.ideas.find(idea => idea.active);

    return (
      <div className='IdeaBox'>
        <section className='sidebar'>
          <header>
            <h1>{this.props.title}</h1>
            <CreateIdea saveIdea={this.storeIdea.bind(this)}/>
          </header>
        </section>

      </div>
    );
  }
}

class CreateIdea extends React.Component {
  constructor() {
    super();
    this.state = { title: '', body: ''};
  }
  updateProperties(e) {
    const {name, value} = e.target;
    this.setState({ [name]: value });
  }

  createIdea(e) {
    e.preventDefault();
    const idea = {title: this.state.title, body: this.state.body, id: Date.now(), active: false};
    this.props.saveIdea(idea);
    this.setState({title:'', body:''});
  }

  render() {
    return (
      <div aria-role='region'>
        <input className='CreateIdea-title'
              name='title' placeholder= 'title'
              value={this.state.title}
              onChange={(e) => this.updateProperties(e)}
              aria-label='idea title' />
        <textarea className='CreateIdea-body'
              name='body' placeholder= 'body'
              value={this.state.body}
              onChange={(e) => this.updateProperties(e)}
              aria-label='idea body' />
        <input className='CreateIdea-submit'
               type='submit'
               onClick={(e) => this.createIdea(e)} />
      </div>
    );
  }
}




ReactDOM.render(<ReactBox title='React to This'/>, document.querySelector('.application'));
