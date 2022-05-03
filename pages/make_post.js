import Layout from "../components/Layout";
import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router";
import * as Realm from "realm-web";
import { UserContext } from "../context/user";

const Make_Post = () => {
    const router = useRouter()
    const [postName, setPostName] = useState("")
    const [postMsg, setPostMsg] = useState("")


    const { userDetails, getUser, setToggle } = useContext(UserContext)

    getUser()

    useEffect(() => {
        setToggle(false)
    }, [])





    // make a post
    const makePost = async (e) => {
        e.preventDefault();

        const postdetail = {
            uid: userDetails.walletAddress,
            name: postName,
            msg: postMsg,
            username: userDetails.name,
            profileImage: userDetails.profileImage
        };

        const REALM_APP_ID = "products-qexct";
        const app = new Realm.App({ id: REALM_APP_ID });
        const credentials = Realm.Credentials.anonymous();

        try {


            const user = await app.logIn(credentials);

            if (user) {

                const insertO = await user.functions.xpacePost(postdetail);

                console.log(insertO)

                router.push({
                    pathname: `/posts`,
                });

            }

        } catch (error) {
            console.error(error);
        }
    }


    return (
        <Layout>
            <div className="mx-5 md:mx-20 h-full rounded-lg  px-2">
                <div className="py-10  px-2">
                    <br /><br />
                    <div className="flex w-full justify-center items-center mb-4">
                        <h1 className="max-w-md mx-auto text-2xl font-bold text-gray-200">Forum Post</h1>
                    </div>
                    <div className="max-w-md mx-auto bg-gray-100 shadow-lg rounded-lg overflow-hidden md:max-w-lg">
                        <div className="md:flex">
                            <form className="mx-auto w-10/12 mt-8">
                                <div className="mb-6">
                                    <label htmlFor="email" className="pl-4 font-bold text-lg text-gray-600 block mb-2 ">Post Title</label>
                                    <input onChange={(e) => setPostName(e.target.value)} type="text" className="shadow-sm bg-gray-50 border
            border-gray-500 text-gray-900  rounded-lg block w-full p-2.5" placeholder="title" required />

                                    <br />

                                    <label htmlFor="email" className="pl-4 font-bold text-lg text-gray-600 block mb-2 ">Post Content</label>

                                    <textarea onChange={(e) => setPostMsg(e.target.value)} cols="30" type="text"
                                        className="shadow-sm bg-gray-50 border
                                        border-gray-500 
                                        text-gray-900  
                                        rounded-lg block 
                                        w-full p-2.5"
                                        placeholder="content"
                                        required >

                                    </textarea>
                                </div>


                                <button onClick={makePost} type="submit" className="text-white bg-blue-700 
                            hover:bg-blue-800 rounded-md px-5 py-2.5 font-bold text-center">
                                    Make a Post
                                </button>
                            </form>

                        </div>
                        <br />
                        <br />
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Make_Post;