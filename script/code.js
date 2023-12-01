document.addEventListener('DOMContentLoaded', function () {
    displayFriends();
  });

  function addFriend() {
    const friendInput = document.getElementById('friendInput');
    const errorMessage = document.getElementById('errorMessage');
    const friendsList = getFriendsList();

    const newFriend = friendInput.value.trim();

    if (newFriend.length <= 3) {
      errorMessage.textContent = 'Name must be longer than 3 characters.';
      return;
    }

    if (friendsList.includes(newFriend)) {
      errorMessage.textContent = 'This name already exists in the list.';
      return;
    }

    errorMessage.textContent = '';

    friendsList.push(newFriend);
    saveFriendsList(friendsList);
    displayFriends();

    friendInput.value = ''; // Clear input field
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      addFriend();
    }
  }

  function getFriendsList() {
    const storedFriends = localStorage.getItem('friends');
    return storedFriends ? JSON.parse(storedFriends) : [];
  }

  function saveFriendsList(friendsList) {
    localStorage.setItem('friends', JSON.stringify(friendsList));
  }

  function displayFriends() {
    const friendsList = getFriendsList();
    const friendsListContainer = document.getElementById('friendsList');

    friendsListContainer.innerHTML = '<p>Friends:</p>';

    if (friendsList.length === 0) {
      friendsListContainer.innerHTML += '<p>No friends yet.</p>';
    } else {
      friendsList.forEach(friend => {
        friendsListContainer.innerHTML += `<p>${friend}</p>`;
      });
    }
  }