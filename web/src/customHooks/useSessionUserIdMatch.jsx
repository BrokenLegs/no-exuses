import { useSession } from "next-auth/react";

export default function useSessionUserIdMatch(userIdInApiRequest) {
    const { data: session } = useSession();
    //check if session.userId is the same as in the api request
    return !session ? 0 : session.user.userId === userIdInApiRequest;
}
