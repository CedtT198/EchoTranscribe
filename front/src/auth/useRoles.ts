import { useAuth0 } from "@auth0/auth0-react";

export function useRoles(): string[] {
    const { user } = useAuth0();
    return user?.["https://echotranscribe.com/roles"] || [];
}