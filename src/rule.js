{
    "rules": {
        "users": {
        "$user_id": {
            ".read": "auth != null && auth.uid === $user_id",
            ".write": "auth != null && auth.uid === $user_id"
        }  
        }
    }
}