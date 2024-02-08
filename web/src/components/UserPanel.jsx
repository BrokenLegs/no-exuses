import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function UserPanel() {
    const { data: session, status } = useSession();
    return (
        <>
            {status === "authenticated" && (
                <div className="sticky top-0 flex p-4 align-middle justify-center items-center bg-background-5 text-white font-bold rounded-br-xl rounded-bl-xl shadow-lg z-40 ">
                    <h3 className="mr-auto ">{session.user.name}</h3>
                    <svg
                        onClick={() => signOut()}
                        fill="lightgreen"
                        className="w-10 h-10 ml-auto p-2 cursor-pointer z-50 "
                        alt="Sign out"
                        viewBox="0 0 384.971 384.971"
                    >
                        <title>Logga ut</title>
                        <g>
                            <g id="Sign_Out">
                                <path
                                    d="M180.455,360.91H24.061V24.061h156.394c6.641,0,12.03-5.39,12.03-12.03s-5.39-12.03-12.03-12.03H12.03
			C5.39,0.001,0,5.39,0,12.031V372.94c0,6.641,5.39,12.03,12.03,12.03h168.424c6.641,0,12.03-5.39,12.03-12.03
			C192.485,366.299,187.095,360.91,180.455,360.91z"
                                />
                                <path
                                    d="M381.481,184.088l-83.009-84.2c-4.704-4.752-12.319-4.74-17.011,0c-4.704,4.74-4.704,12.439,0,17.179l62.558,63.46H96.279
			c-6.641,0-12.03,5.438-12.03,12.151c0,6.713,5.39,12.151,12.03,12.151h247.74l-62.558,63.46c-4.704,4.752-4.704,12.439,0,17.179
			c4.704,4.752,12.319,4.752,17.011,0l82.997-84.2C386.113,196.588,386.161,188.756,381.481,184.088z"
                                />
                            </g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                        </g>
                    </svg>
                </div>
            )}

            {status === "unauthenticated" && (
                <div className="sticky top-0 flex p-4 align-middle justify-center items-center bg-background-5 text-white font-bold rounded-br-xl rounded-bl-xl shadow-lg z-40 ">
                    <button className="mr-auto" onClick={() => signIn()}>
                        Sign in
                    </button>
                </div>
            )}
        </>
    );
}
