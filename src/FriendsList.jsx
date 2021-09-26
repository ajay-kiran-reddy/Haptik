import React from 'react';
import PropTypes from 'prop-types';

FriendsList.propTypes = {
    friendsList:PropTypes.array,
    handleDeleteFriendsList:PropTypes.func
};

function FriendsList(props) {
    const toggleClass = (friend) => {
        let filteredArr = props.friendsList.filter(person=>friend.id !== person.id);
        let updatedObject = {
            name:friend.name,
            fav:!friend.fav,
            id:friend.id
        };
        let array =[...filteredArr,updatedObject];
        let favFriends = array.filter(fr => fr.fav === true);
        let unFavFriends =  array.filter(fr => fr.fav === false);
        props.handleFavUnFav([...favFriends,...unFavFriends]);
    };
    return (
        <div style={{width:"30%"}}>
            {props.searchKey ?  (props.searchedList.length>0 ? props.searchedList.map((friend,index)=>{
                return <div key={index} className="friendsList">
                    {friend && <><span style={{paddingRight:"10%"}}>{friend.name}</span>
                        <i className={friend.fav ? "fas fa-star fav" : "fas fa-star unfav"}></i>
                        <i className="fas fa-trash-alt icon trash-icon delete"></i>
                    </>}
                </div>
            }) : "No results found") : (props.friendsList && props.friendsList.map((friend,index)=>{
                    return <div key={index} className="friendsList">
                        {friend && <><span style={{paddingRight:"10%"}}>{friend.name}</span>
                            <i className={friend.fav ? "fas fa-star fav" : "fas fa-star unfav"}  onClick={()=>toggleClass(friend)}></i>
                            <i className="fas fa-trash-alt icon trash-icon delete" onClick={()=>props.handleDeleteFriendsList(friend.id)}></i>
                        </>}
                    </div>
                })) }
            
        </div>
    );
}

export default FriendsList;
