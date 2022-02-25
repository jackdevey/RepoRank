function StatusGenerator(level) {

    let status;

    switch(level) {
        case [0, 1, 2, 3].find(lvl => lvl === level): status = {
            title: "Beginner",
            color: "blue"
        }; break;
        case [4, 5, 6].find(lvl => lvl === level): status = {
            title: "Intermediate",
            color: "green"
        }; break;
        case [7, 8, 9].find(lvl => lvl === level): status = {
            title: "Excellent",
            color: "yellow"
        }; break;
        default: status = {
            title: "Legendary",
            color: "orange"
        }
    }
    
    return status;
}

export default StatusGenerator;
