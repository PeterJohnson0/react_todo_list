// react_todo_list
// Peter Johnson

import React, { Component } from 'react';
import './App.css';
import {
  HashRouter as Router,
  Route,
  Link,
  NavLink
} from 'react-router-dom';

// Buttons
class AddButton extends Component {
  render () {
    return ("Add"); 
  }
};

class EditButton extends Component {
  render () {
    return ("Confirm"); 
  }
};

// Home Page
class Home extends React.Component 
{  
  render () 
  {      
    return ( <div class = "mainbody">
		<p>This is a react test webpage made in a class project.</p>
		<p>To use the todo list, click on the TODO heading and add, remove, or edit the items.</p>
		<p>Note that the changes are not saved externally so any changes will be removed upon terminating the react webpage.</p>
		</div> );
  }    
};

// Todo List Webpage.
class TODO extends React.Component 
{  
	constructor(props) 
	{
		super(props);
		this.state = 
		{ 
		  TodoItems: 
			[
			  {id: "0", Item: "Tune a Piano"},
			  {id: "1", Item: "Tune a Fish"},
			  {id: "2", Item: "Find a better test pun."}
			],
			Mode: true,
			NextKey: 3,
			ActiveKey: 0,
			value: ""
		}
		
		this.handleChange = this.handleChange.bind(this);
	}
	
	// Adds or edits to list. 
	// Works by copying the JSON, making changes to the copy, then replacing the JSON with the edited copy.
	ModifyListItem (Mode) 
	{
		var NewTodo = this.state.TodoItems;
		var NKey = this.state.NextKey;
		
		if (this.state.Mode){
			NewTodo[NKey] = {id: NKey.toString(), Item: this.state.value};
			NKey = NKey + 1;
			this.setState({NextKey: NKey});
			
			alert("Item Added.");
		}
		else {
					
			NewTodo[this.state.ActiveKey].Item = this.state.value;
			
			alert("Change Confirmed.");
			this.setState({Mode: true});
		}
		this.setState({TodoItems: NewTodo});
		this.setState({value: ""});
	}
	
	// Switches to Edit mode.
	E_Func (key) 
	{
		var NewTodo = this.state.TodoItems;
		var keys = Object.keys(NewTodo);
		var newkey = key.id;
		var idloc = keys.lastIndexOf(newkey);
		
		this.setState({ActiveKey: idloc});
		this.setState({value: this.state.TodoItems[this.state.ActiveKey].Item});
		alert("Now Editing.");
		this.setState({Mode: false});
	}
	
	// Deletes item.
	D_Func (key) 
	{
		var NewTodo = this.state.TodoItems;
		var keys = Object.keys(NewTodo);
		var newkey = key.id;
		var idloc = keys.lastIndexOf(newkey);
		var RemKey = this.state.NextKey - 1;

		while (idloc < RemKey)
		{
			NewTodo[idloc].Item = NewTodo[idloc+1].Item;
			idloc = idloc + 1;
		}
		
		NewTodo.splice(RemKey,1);
		this.setState({TodoItems: NewTodo});
		this.setState({NextKey: RemKey});
		alert("Item Deleted."); 
	}
	
	renderRow({id, Item}) { 
		return <tr key={id}>
		<td><button onClick={this.D_Func.bind(this, {id})}>Del</button></td>
		<td><button onClick={this.E_Func.bind(this, {id})}>Edit</button></td>
		<td class = "TD_Item">{Item}</td>
		</tr>;
	}
	
	//Lets us change the textbox.
	handleChange(event) {
		this.setState({value: event.target.value});
	}
	
  render () 
  {      
    var formbutton;
	if (this.state.Mode) formbutton = <AddButton /> 
	else formbutton = <EditButton />
	
	return (
	<div class = "mainbody">
		{/* Form */}
		<form> 
			<button onClick = {this.ModifyListItem.bind(this)}>{formbutton}</button>
			<input type="text" class = "TD_Editor" name = "NewToDo" value = {this.state.value} onChange={this.handleChange}/>
		</form>
		
		{/* List */}
		<table>
			  {this.state.TodoItems.map(this.renderRow.bind(this))}
		</table>

	</div>
	);
  }    
};

// Contact Page
class Contact extends React.Component 
{  
  render () 
  {      
    return ( <div class = "mainbody">
		<p>Peter Johnson</p>
		</div> );
  }    
};

// About Page
class About extends React.Component 
{  
  render () 
  {      
    return ( <div class = "mainbody">
		<p>Uploaded to Github by Peter Johnson on Nov 17, 2019.</p>
		</div> );
  }    
};



class URLParmExample extends React.Component 
{
  render()
  {
    return ( <p>URL parm: {this.props.match.params.someid} </p> );
  }
}

// Main App
class App extends Component {
render() {
return (
	<Router>
		<div class = "TOC">
			<h1> 'Todo List' </h1>
			<span>
				<NavLink exact to="/" className="inactive" activeClassName="active">Home</NavLink>
				<NavLink exact to="/TODO" className="inactive" activeClassName="active">TODO</NavLink>
				<NavLink exact to="/Contact" className="inactive" activeClassName="active">Contact</NavLink>
				<NavLink exact to="/About" className="inactive" activeClassName="active">About</NavLink>
			</span>
		</div>
		<div>
			<Route exact path="/" component={Home}/>
			<Route path="/TODO" component={TODO}/>
			<Route path="/Contact" component={Contact}/>
			<Route path="/About" component={About}/>
			
			<Route path="/urlparm/:someid" component={URLParmExample}/>
			
			
		</div>
	</Router>
);
}
}

export default App;
