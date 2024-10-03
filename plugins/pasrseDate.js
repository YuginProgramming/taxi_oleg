const parseDateString = (dateString) => {

    const regex = /^\d{4}-\d{2}-\d{2}$/;

    if (regex.test(dateString)) {
        const dateParts = dateString.split('-').map(Number);

        return [dateParts[0], dateParts[1], dateParts[2]];
    } 

    return null;
}

export default parseDateString;

