import Layout from "../components/Layout";
import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router";
import * as Realm from "realm-web";
import { UserContext } from "../context/user";


const Course = () => {
    const router = useRouter();
    const [posts, setPosts] = useState([]);
    const [loading, setloading] = useState(true)

    const { userDetails, getUser, setToggle } = useContext(UserContext)

    getUser()

    useEffect(() => {
        setToggle(false)
    }, [])


    // Load all Posts
    useEffect(async () => {
        // add your Realm App Id to the .env.local file
        const REALM_APP_ID = "products-qexct";
        const app = new Realm.App({ id: REALM_APP_ID });
        const credentials = Realm.Credentials.anonymous();


        try {

            const user = await app.logIn(credentials);
            const allPost = await user.functions.xpaceViewAllPost();
            setPosts(() => allPost);
            setloading(false)

        } catch (error) {
            console.error(error);
        }
    }, [posts]);




    return (
        <Layout>
            <div className="md:hidden sm:h-full sm:w-full max-w-sm mx-auto lg:px-40 px-3 py-2 lg:py-3">

                <div className="py-4 capitalize flex justify-center">
                    <p className="text-3xl font-semibold text-gray-100">Forum</p>

                </div>

                {loading && (
                    <div
                        id="popup-modal" tabIndex="-1"
                        className="relative overflow-y-auto overflow-x-hidden 
                    top-20 mx-auto p-5 border w-40 shadow-lg rounded-md bg-gray-200 md:inset-0 h-modal -mb-40 "
                    >
                        <div className="text-center">

                            <div className="text-center">
                                <svg role="status" className="inline mr-2 w-20 h-20 text-white animate-spin dark:text-white fill-purple-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                            </div>

                        </div>
                    </div>
                )}


                <div className="md:w-full m-4 max-w-sm mx-auto">
                    <ul >
                        {/* one start */}
                        {posts.map((post, index) => (
                            <div key={index} className="border-2 mb-4 rounded-md p-4 bg-gray-200 border-gray-400 cursor-pointer">
                                <a href={`/post?id=${post._id}`}>

                                    <div className="flex flex-col border-gray-900 p-3 border-2 w-full rounded-lg justify-between ">
                                        <div className="flex flex-row items-center">
                                            <img src={userDetails.profileImage} className="w-10 h-10 rounded-full" />
                                            <span className="ml-2 text-2xl font-bold text-black">
                                                {post.username}
                                            </span>
                                        </div>


                                        <div className="truncate">
                                            {post.uid}
                                            <span className="bg-blue-600 rounded-lg p-2 ml-4 text-white font-semibold">Read More</span>
                                        </div>

                                    </div>

                                    <div className="my-4">
                                        <p className="text-xl font-semibold mb-2">{post.name}</p>
                                        <p className="text-lg text-gray-500 truncate w-2/3">
                                            {post.msg}
                                        </p>

                                    </div>
                                </a>

                            </div>
                        ))}
                        {/* end one */}


                    </ul>
                </div>


            </div>


            {/* old one */}

            <div className="hidden md:block h-full w-full lg:px-40 px-3 py-2 lg:py-3">

                <div className="py-4 capitalize flex justify-center">
                    <p className="text-3xl font-semibold text-gray-100">Forum</p>

                </div>

                {loading && (
                    <div
                        id="popup-modal" tabIndex="-1"
                        className="relative overflow-y-auto overflow-x-hidden 
                    top-20 mx-auto p-5 border w-40 shadow-lg rounded-md bg-gray-200 md:inset-0 h-modal -mb-40 "
                    >
                        <div className="text-center">

                            <div className="text-center">
                                <svg role="status" className="inline mr-2 w-20 h-20 text-white animate-spin dark:text-white fill-purple-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                            </div>

                        </div>
                    </div>
                )}



                <div className="w-full">
                    <ul>
                        {/* one start */}
                        {posts.map((post, index) => (
                            <div key={index} className="border-2 mb-4 rounded-md p-4 bg-gray-200 border-gray-400 cursor-pointer">
                                <a href={`/post?id=${post._id}`}>

                                    <li className="flex border-gray-900 p-3 border-2 w-full rounded-lg justify-between items-center">
                                        <div className="flex flex-row items-center">
                                            <img src={post.profileImage} className="w-10 h-10 rounded-full" />
                                            <span className="ml-2 text-2xl font-bold text-black">
                                                {post.username}
                                            </span>
                                        </div>

                                        <div>
                                            {post.walletAddress}
                                        </div>

                                    </li>


                                    <div className="my-4">
                                        <p className="text-3xl font-semibold mb-2">{post.name}</p>
                                        <p className="text-xl text-gray-500 truncate w-2/3">
                                            {post.msg}
                                        </p>
                                    </div>
                                </a>

                            </div>
                        ))}
                        {/* end one */}


                    </ul>
                </div>


            </div>
        </Layout >
    );
}

export default Course;