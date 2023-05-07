export const getInitialCharacter = (name) => {
    const nameArray = name.toUpperCase().split(" ");
    if (nameArray.length > 1) {
        return nameArray[0].charAt(0) + nameArray[1].charAt(0)
    } else {
        return nameArray[0].charAt(0) + nameArray[0].charAt(1)
    }
}