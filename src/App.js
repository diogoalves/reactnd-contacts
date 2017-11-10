import React, { Component } from 'react';
import ListConstacts from './ListContacts';
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

  render() {
    return (
      <div>
        <ListConstacts 
          onDeleteContact={this.removeContact} 
          contacts={this.state.contacts} 
        />
      </div>
    )
  }
}

export default App;
