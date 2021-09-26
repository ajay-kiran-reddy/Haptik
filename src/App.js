import React from 'react';
import './App.css';
import FriendsList from "./FriendsList";

function App() {
    const [friendsList,setFriendsList] = React.useState([]);
    const [inputName,setInputName] = React.useState();
    const [updateList,setUpdateList] = React.useState();
    const [searchedList,setSearchedList] = React.useState([]);
    const [searchKey,setSearchKey] = React.useState();
    
    React.useEffect(()=>{
        let friends = JSON.parse(localStorage.getItem("friends"));
        if(friends){
            setFriendsList(friends);
        }
        
    },[updateList])
    
    const handleKeyDown = (e) => {
        console.log(friendsList,"friendsList");
        if (e.key === 'Enter') {
           localStorage.setItem('friends',JSON.stringify(friendsList ? [...friendsList,{name:e.target.value,
               fav:false,id:Math.random()}] : [{name:e.target.value,
               fav:false,id:Math.random()}]))
            setInputName("");
            setUpdateList(prevState => !prevState)
        }
    }
    
    const handleDeleteFriendsList = (friendId)=>{
        let filteredData= friendsList.filter(person=> person.id !== friendId);
        localStorage.setItem('friends',JSON.stringify(filteredData));
        setFriendsList(filteredData);
    }
    
    const handleFavUnFav = (list) =>{
        localStorage.setItem('friends',JSON.stringify(list));
        setFriendsList(list);
    }
    
    const handleSearchFriends=(e)=>{
        setSearchKey(e.target.value);
        let list = friendsList.filter(friend => friend.name.toLowerCase().includes(e.target.value.toLowerCase()));
        console.log(list,"list")
        if(e.target.value){
            console.log("inside if")
            setSearchedList(list);
        }
    }
    
    console.log("new changes")
    
  return (
    <div className="App">
      <header className="App-header">
              <div className="friendsHeader">
                  <span>Friends List</span>
              </div>
              <input type="text" placeholder="Enter Your Friends Name" className="friendsName"
                     value={inputName}
                     onChange={e=>setInputName(e.target.value)}
                     onKeyDown={handleKeyDown}
              />
          <input type="text" placeholder="Search your friends" className="friendsName" onChange={handleSearchFriends}/>
          <FriendsList friendsList={friendsList} handleDeleteFriendsList={handleDeleteFriendsList}
                       handleFavUnFav={handleFavUnFav}
                       searchedList={searchedList}
                       searchKey={searchKey}/>
      </header>
    </div>
  );
}

export default App;
