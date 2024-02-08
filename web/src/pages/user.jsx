import { signIn, signOut, useSession } from "next-auth/react";

export default function User() {
    const { data: session, status } = useSession();
    const loading = status === "loading";

    if (loading) return <div>Loading...</div>;
    return (
        <>
            {!session && (
                <div className="flex mx-auto items-center  ">
                    {!session && (
                        <a
                            className=" text-white text-3xl bg-background-5 p-10 rounded-full"
                            href="/api/auth/signin"
                        >
                            Sign In
                        </a>
                    )}
                </div>
            )}

            {session && (
                <div className="flex mx-auto items-center  ">
                    <div className="flex flex-col items-center">
                        <img
                            className="rounded-full w-32 h-32"
                            src={session.user.image}
                            alt="user image"
                        />
                        <p className="text-white text-3xl">
                            {session.user.name}
                        </p>
                        <p className=" text-3xl">{session.user.email}</p>
                    </div>
                </div>
            )}
        </>
    );
}
