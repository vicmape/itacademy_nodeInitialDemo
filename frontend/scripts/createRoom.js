function createRoom(form) {
    const newRoomName = form.newRoom.value

    if (newRoomName) {
        console.log(`Creating ${newRoomName}`)

        form.newRoom.value = '';
    }

    return false;
}