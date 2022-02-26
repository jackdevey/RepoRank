// Generate the status of a repo, based on it's level
function StatusGenerator(level) {
    let status;
    switch(level) {
        // Beginner level
        case [0, 1, 2, 3].find(lvl => lvl === level): status = {
            title: "Beginner",
            color: "blue"
        }; break;
        // Intermediate level
        case [4, 5, 6].find(lvl => lvl === level): status = {
            title: "Intermediate",
            color: "green"
        }; break;
        // Excellent level
        case [7, 8, 9].find(lvl => lvl === level): status = {
            title: "Excellent",
            color: "yellow"
        }; break;
        // Everything else is legendary
        default: status = {
            title: "Legendary",
            color: "orange"
        }
    }
    return status;
}

export default StatusGenerator;