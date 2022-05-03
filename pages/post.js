import Layout from "../components/Layout";
import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router";
import * as Realm from "realm-web";
import { UserContext } from "../context/user";

const Page = () => {
    const [post, setPost] = useState([]);
    const [postComment, setPostComment] = useState([]);
    const [loading, setloading] = useState(true)
    const [comment, setComment] = useState("")
    const [set, setSet] = useState(false)



    const { userDetails, getUser, setToggle } = useContext(UserContext)

    console.log(userDetails.profileImage)

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

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const profileID = urlParams.get("id")

        // console.log(profileID)


        try {


            const user = await app.logIn(credentials);
            const allPost = await user.functions.xpaceOnePost(profileID);
            setPost(() => allPost);


            const allComment = await user.functions.getComment(profileID);
            setPostComment(() => allComment);

            setToggle(false)
            console.log(postComment)

        } catch (error) {
            console.error(error);
        }
    }, [post]);


    const sendComment = async (e) => {
        e.preventDefault();

        const REALM_APP_ID = "products-qexct";
        const app = new Realm.App({ id: REALM_APP_ID });
        const credentials = Realm.Credentials.anonymous();

        console.log("profile: " + userDetails.profileImage)

        const myComment = {
            uid: post._id,
            name: userDetails.name,
            comment: comment,
            address: userDetails.walletAddress,
            profileImage: userDetails.profileImage
        }

        const user = await app.logIn(credentials);

        if (user) {

            const insertO = await user.functions.saveComment(myComment);

            setComment("")

            console.log(insertO)



        }

    }

    return (
        <Layout>
            <div className="md:hidden sm:h-full sm:w-full max-w-sm mx-auto lg:px-40 px-3 py-2 lg:py-3">

                <div className="py-4 capitalize flex justify-center mb-4">
                    <p className="text-3xl font-semibold text-gray-100">Forum</p>

                </div>


                <div className="md:w-full m-4 max-w-sm mx-auto">
                    <ul >
                        {/* one start */}

                        <div className="border-2 mb-4 rounded-md p-4 bg-gray-200 border-gray-400 cursor-pointer">

                            <div className="flex flex-col border-gray-900 p-3 border-2 w-full rounded-lg justify-between ">
                                <div className="flex flex-row items-center">
                                    <img src="/assets/profile.png" className="w-10 h-10 rounded-full" />
                                    <span className="ml-2 text-2xl font-bold text-black">
                                        {post.username}
                                    </span>
                                </div>


                                <div className="truncate">
                                    {post.walletAddress}
                                    <span className="bg-blue-600 rounded-lg p-2 ml-4 text-white font-semibold">Read More</span>
                                </div>

                            </div>

                            <div className="my-4">
                                <p className="text-xl font-semibold mb-2">{post.name}</p>
                                <p className="text-lg text-gray-500 ">
                                    {post.msg}
                                </p>

                            </div>


                        </div>
                        {/* end one */}

                        <div className="flex mx-auto items-center justify-center shadow-lg mb-4 max-w-lg">
                            {set ? <h1 onClick={() => setSet(!set)}
                                className="bg-red-500 rounded 
                            font-semibold text-white p-2">
                                Close Comment Form
                            </h1> : <h1 onClick={() => setSet(!set)}
                                className="bg-blue-500 rounded 
                            font-semibold text-white p-2">
                                Make a comment
                            </h1>}
                        </div>

                        <div className="py-8 capitalize flex justify-center mb-2">
                            <p className="text-2xl font-semibold text-gray-100">Comments</p>

                        </div>

                        {set && (

                            <div className="flex mx-auto items-center justify-center shadow-lg  mb-4 max-w-lg">
                                <form className="w-full max-w-xl bg-white rounded-lg px-4 pt-2" onSubmit={sendComment} >
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg">Add a new comment</h2>
                                        <div className="w-full md:w-full px-3 mb-2 mt-2">
                                            <textarea onChange={(e) => setComment(e.target.value)} value={comment}
                                                className="bg-gray-100 rounded border border-gray-400 leading-normal 
                                             resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none 
                                            focus:bg-white" name="body" placeholder='Type Your Comment' required />
                                        </div>
                                        <div className="w-full md:w-full flex items-start md:w-full px-3">
                                            <div className="flex items-start w-1/2 text-gray-700 px-2 mr-auto">


                                            </div>
                                            <div className="-mr-1">
                                                <input type='submit' onClick={sendComment} className="hover:cursor-pointer hover:bg-white hover:text-blue-500 bg-blue-500 text-white font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1" value='Post Comment' />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>

                        )}


                    </ul>
                </div>

                <div className="flex mx-auto items-center justify-center shadow-lg  mb-4 max-w-lg">
                    <div className="w-full max-w-xl bg-white rounded-lg px-4 pt-2"  >
                        {postComment.map((cmm, index) => (
                            <li key={index} className="flex mb-4 p-3 border-2 w-full rounded-lg justify-between items-center">
                                <div className="flex flex-col items-center">
                                    <div className="flex">
                                        <img src="/assets/profile.png" className="w-10 h-10 rounded-full" />
                                        <span className="ml-2 text-xl font-semibold text-black">
                                            {cmm.name}
                                        </span>
                                    </div>
                                    <h1 className="ml-2">{cmm.comment}</h1>
                                </div>
                            </li>

                        ))}
                    </div>
                </div>


            </div>


            {/* old one */}

            <div className="hidden md:block h-full mx-40 lg:px-40 px-3 py-2 lg:py-3">

                <div className="py-4 capitalize flex justify-center mb-8">
                    <p className="text-3xl font-semibold text-gray-100">Forum</p>

                </div>




                <div className="w-full">
                    <ul>
                        {/* one start */}

                        <div className="border-2 mb-4 rounded-md p-4 bg-gray-200 border-gray-400 cursor-pointer">

                            <li className="flex border-gray-900 p-3 border-2 w-full rounded-lg justify-between items-center">
                                <div className="flex flex-row items-center">
                                    <img src="/assets/profile.png" className="w-10 h-10 rounded-full" />
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
                                <p className="text-xl text-gray-500">
                                    {post.msg}
                                </p>
                            </div>
                        </div>
                        {/* end one */}

                        <div className="flex mx-auto items-center justify-center shadow-lg mb-4 max-w-lg">
                            {set ? <h1 onClick={() => setSet(!set)}
                                className="bg-red-500 rounded 
                            font-semibold text-white p-2">
                                Close Comment Form
                            </h1> : <h1 onClick={() => setSet(!set)}
                                className="bg-blue-500 rounded 
                            font-semibold text-white p-2">
                                Make a comment
                            </h1>}
                        </div>

                        <div className="py-8 capitalize flex justify-center mb-2">
                            <p className="text-2xl font-semibold text-gray-100">Comments</p>

                        </div>

                        {set && (

                            <div className="flex mx-auto items-center justify-center shadow-lg  mb-4 max-w-lg">
                                <form className="w-full max-w-xl bg-white rounded-lg px-4 pt-2" onSubmit={sendComment} >
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg">Add a new comment</h2>
                                        <div className="w-full md:w-full px-3 mb-2 mt-2">
                                            <textarea onChange={(e) => setComment(e.target.value)} value={comment}
                                                className="bg-gray-100 rounded border border-gray-400 leading-normal 
                                             resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none 
                                            focus:bg-white" name="body" placeholder='Type Your Comment' required />
                                        </div>
                                        <div className="w-full md:w-full flex items-start md:w-full px-3">
                                            <div className="flex items-start w-1/2 text-gray-700 px-2 mr-auto">


                                            </div>
                                            <div className="-mr-1">
                                                <input type='submit' onClick={sendComment} className="hover:cursor-pointer hover:bg-white hover:text-blue-500 bg-blue-500 text-white font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1" value='Post Comment' />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>

                        )}



                    </ul>


                    <div className="flex mx-auto items-center justify-center shadow-lg  mb-4 max-w-lg">
                        <div className="w-full max-w-xl bg-white rounded-lg px-4 pt-2"  >
                            {postComment.map((cmm, index) => (
                                <li key={index} className="flex mb-4 p-3 border-2 w-full rounded-lg justify-between items-center">
                                    <div className="flex flex-row items-center">
                                        <img src="/assets/profile.png" className="w-10 h-10 rounded-full" />
                                        <span className="ml-2 text-xl font-semibold text-black">
                                            {cmm.name} :
                                        </span>
                                        <h1 className="ml-2">{cmm.comment}</h1>
                                    </div>
                                </li>

                            ))}
                        </div>
                    </div>


                </div>


            </div >
        </Layout >
    );
}

export default Page;