import { HeaderTabs } from "./header";

export default function Test() {
    return (
        <HeaderTabs 
           repo="jackdevey/lux"
           tabs={[
            "📖 Overview",
            "💞 Community",
            "🧑‍💻 Activity",
            "🌟 Stars",
            "🍴 Forks",
            "🚨 Open issues"
          ]} user={{"name": "Jane Spoonfighter",
          "image": "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"}} />
    )
}