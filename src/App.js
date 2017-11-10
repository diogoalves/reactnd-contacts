import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ListConstacts from './ListContacts';
import CreateContact from './CreateContact';
import * as ContactsAPI from './utils/ContactsAPI'

class App extends Component {

  state = {
    contacts: []
  }

  componentDidMount() {
    ContactsAPI.getAll().then((contacts) => {
      this.setState({ contacts });
    })
  }

  removeContact = (contact) => {
    ContactsAPI.remove(contact).then(() => {
      this.setState( (currentState) => ({
        contacts: currentState.contacts.filter((c) => c.id !== contact.id)
      }));
    })
  }

  createContact = (contact) => {
    ContactsAPI.create(contact).then( (contact) => {
      this.setState( (currentState) => ({
        contacts: currentState.contacts.concat([ contact ])
      }));
    });
  }

  render() {
    return (
      <div className='app'>
        <Route exact path='/' render={ () => (
          <ListConstacts
            onDeleteContact={this.removeContact}
            contacts={this.state.contacts}
          />
        )} />
        <Route path='/create' render={ ({ history }) => (
          <CreateContact
            onCreateContact={ (contact) => {
              this.createContact(contact);
              history.push('/');
            }}
          />
        )}/>
      </div>
    )
  }
}

export default App;
