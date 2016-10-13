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
    this.setState({ideas: ideas}, () => this.lStore());
  }

  destroy(id) {
    let ideas = this.state.ideas.filter(idea => idea.id !== id);
    this.setState({ideas: ideas}, () => this.lStore());
  }

  selectActive(id) {
    let ideas = this.state.ideas.map(idea=> Object.assign(idea, {active: id === idea.id}));
    this.setState({ideas: ideas}, () => this.lStore());
  }

  lStore() {
    localStorage.setItem('ideas', JSON.stringify(this.state.ideas));
  }

  updateIdea(e, id) {
    const { name, value } = e.target;
    let ideas = this.state.ideas.map(idea=> {
      if(idea.id !== id) return idea;
      return Object.assign(idea,  {[name]: value});
    });

    this.setState({ideas: ideas}, () => this.lStore());
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
          <IdeasList ideas={this.state.ideas}
                     destroy={this.destroy.bind(this)}
                     selectActive={this.selectActive.bind(this)}
          />
        </section>
        <section className='main-content'>
          <ActiveIdea idea={activeIdea} updateIdea={this.updateIdea.bind(this)}/>
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

const IdeasList= ({ideas, destroy, selectActive}) => {
  return (
    <div className='IdeaList'>
      {ideas.map(idea => <Idea {...idea}
                          selectActive={selectActive}
                          destroy={destroy} key={idea.id} />)}
    </div>
  );
};

const Idea = ({id, title, body, active, selectActive, destroy}) => {
  return (
    <div className={active ? 'IdeasListItem is-active' : 'IdeasListItem'}>
      <h3 className='IdeasListItem-title'>{title}</h3>
      <div className='IdeasListItem-body'>{body}</div>
      <div className='IdeasListItem-buttons'>
        <button onClick={()=> destroy(id) }>Destroy</button>
        <button onClick={()=> selectActive(id) }>Active</button>
      </div>
    </div>
  );
};

const ActiveIdea = ({idea, updateIdea}) => {
  if (!idea) {
    return <p className='ActiveIdea'> Please select idea</p>;
  };

  return (
    <div className='ActiveIdea'>
      <input className='ActiveIdea-title'
             name='title'
             value={idea.title}
             onChange={(e) =>updateIdea(e, idea.id)}
      />
      <textarea className='ActiveIdea-body'
                name='body'
                value={idea.body}
                onChange={(e) =>updateIdea(e, idea.id)}
      />
    </div>
  );
};


ReactDOM.render(<ReactBox title='React to This'/>, document.querySelector('.application'));
