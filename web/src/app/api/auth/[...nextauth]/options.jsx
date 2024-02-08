import GoogleProvider from "next-auth/providers/google";
import axios from "axios";
import https from "https";

const USER_ID_BY_EMAIL_URL = process.env.USER_ID_BY_EMAIL_URL;
const ADD_USER_TO_DB = process.env.ADD_USER_TO_DB;

async function createUser(profile) {
    return await axios.post(
        ADD_USER_TO_DB,
        {
            userId: 0,
            name: profile.name,
            email: profile.email,
            phone: null,
            goal: null,
            weight: 0,
            goalWeight: 0,
            height: 0,
            age: 0,
            gender: 0,
            passwordHash: null,
        },
        {
            httpsAgent: new https.Agent({
                rejectUnauthorized: false,
            }),
        }
    );
}

function userIdByEmail(email) {
    return axios.get(`${USER_ID_BY_EMAIL_URL}${email}`, {
        httpsAgent: new https.Agent({
            rejectUnauthorized: false,
        }),
    });
}

export const options = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],

    callbacks: {
        async signIn({ account, profile }) {
            if (account.provider === "google") {
                const isAllowedToSignIn =
                    profile.email_verified &&
                    profile.email.endsWith("@gmail.com");
                if (isAllowedToSignIn) {
                    let response;
                    try {
                        response = await userIdByEmail(profile.email);
                    } catch (error) {
                        if (error.response && error.response.status === 404) {
                            // User not found, create a new user
                            response = await createUser(profile);
                        }
                    }
                    const user = response.data;

                    // Add userId to the account object
                    account.userId = user;
                }
                return isAllowedToSignIn;
            }

            return true;
        },
        async jwt({ token, account, profile }) {
            // Persist the OAuth access_token and or the user id to the token right after signin
            if (account) {
                token.accessToken = account.access_token;
                token.id = profile.id;
                token.profile = profile;
                token.userId = account.userId;
                token.expireDate = account.expireDate;
            }
            return token;
        },

        async session({ session, token, user }) {
            // Send properties to the client, like an access_token and user id from a provider.
            session.accessToken = token.accessToken;
            session.user.id = token.id;
            session.user.userId = token.userId;
            session.user.profile = token.profile; // Add the profile information to the session
            session.user.expireDate = token.expireDate;
            // console.log(session);
            return session;
        },
    },
};
