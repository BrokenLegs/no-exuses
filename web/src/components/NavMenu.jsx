import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function NavMenu() {
    const router = useRouter();
    return (
        <div className="absolute w-full bottom-0 flex gap-2 h-20 bg-black bg-opacity-70 text-#f5f4f1 justify-evenly items-center">
            <Link href="/activityLog">
                <div
                    className={`transition-all duration-150 ease-in-out ${
                        router.pathname === "/activityLog"
                            ? "w-14 h-14"
                            : "w-10 h-10"
                    }`}
                >
                    <svg
                        className="w-full h-full"
                        fill={
                            router.pathname === "/activityLog"
                                ? "#d4eaf7"
                                : "#f5f4f1"
                        }
                        viewBox="0 0 140 140"
                    >
                        <title>Träningskalender</title>
                        <path d="M81.61,4.73C81.61,2.12,84.19,0,87.38,0s5.77,2.12,5.77,4.73V25.45c0,2.61-2.58,4.73-5.77,4.73s-5.77-2.12-5.77-4.73V4.73ZM66.11,105.66c-.8,0-.8-10.1,0-10.1H81.9c.8,0,.8,10.1,0,10.1ZM15.85,68.94c-.8,0-.8-10.1,0-10.1H31.64c.8,0,.8,10.1,0,10.1Zm25.13,0c-.8,0-.8-10.1,0-10.1H56.77c.8,0,.8,10.1,0,10.1Zm25.13,0c-.8,0-.8-10.1,0-10.1H81.9c.8,0,.8,10.1,0,10.1Zm25.14-10.1H107c.8,0,.8,10.1,0,10.1H91.25c-.8,0-.8-10.1,0-10.1ZM15.85,87.3c-.8,0-.8-10.1,0-10.1H31.64c.8,0,.8,10.1,0,10.1ZM41,87.3c-.8,0-.8-10.1,0-10.1H56.77c.8,0,.8,10.1,0,10.1Zm25.13,0c-.8,0-.8-10.1,0-10.1H81.9c.8,0,.8,10.1,0,10.1Zm25.14,0c-.8,0-.8-10.1,0-10.1H107c.8,0,.8,10.1,0,10.1Zm-75.4,18.36c-.8,0-.8-10.1,0-10.1H31.64c.8,0,.8,10.1,0,10.1Zm25.13,0c-.8,0-.8-10.1,0-10.1H56.77c.8,0,.8,10.1,0,10.1ZM29.61,4.73C29.61,2.12,32.19,0,35.38,0s5.77,2.12,5.77,4.73V25.45c0,2.61-2.58,4.73-5.77,4.73s-5.77-2.12-5.77-4.73V4.73ZM6.4,43.47H116.47v-22a3,3,0,0,0-.86-2.07,2.92,2.92,0,0,0-2.07-.86H103a3.2,3.2,0,0,1,0-6.4h10.55a9.36,9.36,0,0,1,9.33,9.33v92.09a9.36,9.36,0,0,1-9.33,9.33H9.33A9.36,9.36,0,0,1,0,113.55V21.47a9.36,9.36,0,0,1,9.33-9.33H20.6a3.2,3.2,0,1,1,0,6.4H9.33a3,3,0,0,0-2.07.86,2.92,2.92,0,0,0-.86,2.07v22Zm110.08,6.41H6.4v63.67a3,3,0,0,0,.86,2.07,2.92,2.92,0,0,0,2.07.86H113.55a3,3,0,0,0,2.07-.86,2.92,2.92,0,0,0,.86-2.07V49.88ZM50.43,18.54a3.2,3.2,0,0,1,0-6.4H71.92a3.2,3.2,0,1,1,0,6.4Z" />
                    </svg>
                </div>
            </Link>
            <Link href="/library">
                <div
                    className={`transition-all duration-150 ease-in-out ${
                        router.pathname === "/library"
                            ? "w-14 h-14"
                            : "w-10 h-10"
                    }`}
                >
                    <svg
                        className="w-full h-full"
                        fill={
                            router.pathname === "/library"
                                ? "#d4eaf7"
                                : "#f5f4f1"
                        }
                        viewBox="0 0 500 500"
                    >
                        <g>
                            <path
                                d="M483,431.629h-80.975l28.668-8.963c4.753-1.48,8.643-4.723,10.953-9.129c2.31-4.405,2.764-9.448,1.279-14.198
		L336.088,57.447c-2.438-7.822-9.57-13.077-17.752-13.077c-1.885,0-3.758,0.288-5.56,0.853l-65.677,20.52
		c-0.63,0.196-1.24,0.426-1.833,0.682v-2.704c0-10.263-8.346-18.613-18.604-18.613h-69.24c-4.392,0-8.426,1.539-11.611,4.094
		c-3.191-2.555-7.233-4.094-11.633-4.094H64.855c-10.269,0-18.625,8.35-18.625,18.613v367.908H7c-3.866,0-7,3.134-7,7
		c0,3.866,3.134,7,7,7h476c3.866,0,7-3.134,7-7C490,434.763,486.866,431.629,483,431.629z M429.247,407.037
		c-0.572,1.092-1.537,1.896-2.725,2.265l-65.67,20.531c-0.448,0.141-0.908,0.211-1.368,0.211c-2.003,0-3.82-1.337-4.418-3.251
		l-78.76-252.064l74.492-23.267l78.764,252.053C429.932,404.695,429.819,405.946,429.247,407.037z M346.623,138.1l-74.492,23.267
		l-8.518-27.26l74.49-23.271L346.623,138.1z M251.271,79.108l65.687-20.523c0.452-0.142,0.916-0.214,1.378-0.214
		c2.02,0,3.781,1.302,4.387,3.247l11.205,35.856l-74.49,23.271l-11.195-35.83C247.484,82.47,248.842,79.866,251.271,79.108z
		 M341.939,431.629h-96.674v-309.3L341.939,431.629z M152.817,207.605h78.448v19.492h-78.448V207.605z M231.266,193.605h-78.448
		v-68.511h78.448V193.605z M138.817,143.682H60.23v-18.588h78.587V143.682z M60.23,157.682h78.587v18.599H60.23V157.682z
		 M152.817,241.097h78.448v190.533h-78.448V241.097z M157.422,59.108h69.24c2.538,0,4.604,2.069,4.604,4.613v47.372h-78.448V63.722
		C152.817,61.178,154.883,59.108,157.422,59.108z M64.855,59.108h69.322c2.559,0,4.64,2.069,4.64,4.613v47.372H60.23V63.722
		C60.23,61.178,62.306,59.108,64.855,59.108z M60.23,190.281h78.587v241.349H60.23V190.281z"
                            />
                        </g>
                    </svg>
                </div>
            </Link>
            <Link href="/user">
                <div
                    className={`transition-all duration-150 ease-in-out ${
                        router.pathname === "/user" ? "w-14 h-14" : "w-10 h-10"
                    }`}
                >
                    <svg
                        className="w-full h-full"
                        fill={
                            router.pathname === "/user" ? "#d4eaf7" : "#f5f4f1"
                        }
                        viewBox="0 0 30.586 30.586"
                    >
                        <g transform="translate(-546.269 -195.397)">
                            <path d="M572.138,221.245a15.738,15.738,0,0,0-21.065-.253l-1.322-1.5a17.738,17.738,0,0,1,23.741.28Z" />

                            <path d="M561.464,204.152a4.96,4.96,0,1,1-4.96,4.96,4.966,4.966,0,0,1,4.96-4.96m0-2a6.96,6.96,0,1,0,6.96,6.96,6.96,6.96,0,0,0-6.96-6.96Z" />

                            <path d="M561.562,197.4a13.293,13.293,0,1,1-13.293,13.293A13.308,13.308,0,0,1,561.562,197.4m0-2a15.293,15.293,0,1,0,15.293,15.293A15.293,15.293,0,0,0,561.562,195.4Z" />
                        </g>
                    </svg>
                </div>
            </Link>
        </div>
    );
}
