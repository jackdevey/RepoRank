import { ShowErrorPopup } from "../ShowErrorPopup";
import { ShowPopup } from "./ShowPopup";
import { endpoint } from "../endpoint";

export function User(modals, theme, username, animations) {
    // If nothing was entered, show error now
    if (username === '') {
        ShowErrorPopup(modals, {
            code: 400,
            message: "You didn't even enter anything!"
        }, "user");
        return;
    }
    // Run before function
    animations(true);
    // Fetch the data from the api
    fetch(`${endpoint()}/${username}`)
        .then(res => res.json())
        .then((data) => {
            // Run after function
            animations(false);
            // Show the result
            ShowPopup(modals, theme, data);
        }).catch((e) => {
            // Log errors
            console.log(e);
        });
}