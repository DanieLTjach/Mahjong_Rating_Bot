import { MenuItem } from "telegram-button-menu";
/* Buttons: 
    Main Menu
        - Account
            - Register
            - Edit
            - View Profile
        - Admin
            - Users
                - Remove User
                - Activate User
            - Clubs
                - Create Club (Add to config chat id)
                - Edit Club
                - View Clubs
                - Delete Club
            - Games
                - View Games
                - Remove Game
            - Achievements
                - Add Achievement
                - Grant Achievement
*/ 
export const MENU_STRUCTURE: MenuItem = {
    key: "main_menu",
    icon: "🏠",
    command: "Main Menu",
    children: [
        {
            key: "Account",
            icon: "👤",
            command: "Account",
            children: [
                {
                    key: "Register",
                    icon: "📝",
                    command: "register_account"
                },
                {
                    key: "Edit",
                    icon: "✏️",
                    command: "edit_account"
                },
                {
                    key: "View Profile",
                    icon: "👁️",
                    command: "view_account"
                }
            ]
        },
        {
            key: "Admin",
            icon: "👨‍💼",
            command: "Admin",
            children: [
                {
                    key: "Users",
                    icon: "👥",
                    command: "Users",
                    children: [
                        {
                            key: "Remove User",
                            icon: "❌",
                            command: "remove_user"
                        },
                        {
                            key: "Activate User",
                            icon: "✅",
                            command: "activate_user"
                        }
                    ]
                },
                {
                    key: "Clubs",
                    icon: "🏢",
                    command: "Clubs",
                    children: [
                        {
                            key: "Create Club",
                            icon: "➕",
                            command: "create_club"
                        },
                        {
                            key: "Edit Club",
                            icon: "✏️",
                            command: "edit_club"
                        },
                        {
                            key: "View Clubs",
                            icon: "👁️",
                            command: "view_club"
                        },
                        {
                            key: "Delete Club",
                            icon: "🗑️",
                            command: "delete_club"
                        }
                    ]
                },
                {
                    key: "Events",
                    icon: "📅",
                    command: "Events",
                    children: [
                        {
                            key: "Create Event",
                            icon: "➕",
                            command: "create_event"
                        },
                        {
                            key: "Edit Event",
                            icon: "✏️",
                            command: "edit_event"
                        },
                        {
                            key: "View Events",
                            icon: "👁️",
                            command: "view_events"
                        },
                        {
                            key: "Delete Event",
                            icon: "🗑️",
                            command: "delete_event"
                        }
                    ]
                },
                {
                    key: "Games",
                    icon: "🎮",
                    command: "Games",
                    children: [
                        {
                            key: "View Games",
                            icon: "👁️",
                            command: "view_games"
                        },
                        {
                            key: "Remove Game",
                            icon: "❌",
                            command: "remove_game"
                        }
                    ]
                },
                {
                    key: "Achievements",
                    icon: "🏆",
                    command: "Achievements",
                    children: [
                        {
                            key: "Add Achievement",
                            icon: "➕",
                            command: "add_achievement"
                        },
                        {
                            key: "Grant Achievement",
                            icon: "🎖️",
                            command: "grant_achievement"
                        }
                    ]
                }
            ]
        }
    ]
}