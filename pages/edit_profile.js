import Layout from "../components/Layout";
import { useRouter } from "next/router";
import * as Realm from "realm-web";
import { useContext, useEffect, useState } from "react"
import Link from 'next/link'
import { UserContext } from "../context/user";

const EditProfile = () => {

    const router = useRouter();
    const [newName, setNewName] = useState("");
    const [bio, setBio] = useState("");
    const [loading, setloading] = useState(false)

    const { userDetails, getUser, setToggle } = useContext(UserContext)

    getUser()

    useEffect(() => {
        setToggle(false)
    }, [])





    // make a post
    const uploadProfile = async (e) => {
        e.preventDefault();

        setloading(true)

        const postdetail = {
            uid: userDetails.walletAddress,
            name: newName,
            bio: bio,
        };

        const REALM_APP_ID = "products-qexct";
        const app = new Realm.App({ id: REALM_APP_ID });
        const credentials = Realm.Credentials.anonymous();

        try {


            const user = await app.logIn(credentials);

            if (user) {

                const insertO = await user.functions.xpaceUploadProfile(postdetail);

                console.log(insertO)

                router.push({
                    pathname: `/profile`,
                });

            }

        } catch (error) {
            console.error(error);
        }
    }


    return (
        <Layout>
            <div className="mx-5 md:mx-20 h-full rounded-lg px-2">
                <div className="py-10  px-2">
                    <br /><br />
                    <div className="flex w-full justify-center items-center mb-4">
                        <h1 className="max-w-md mx-auto text-2xl font-bold text-[whitesmoke]">Edit your Profile</h1>
                    </div>
                    <div className="max-w-md mx-auto bg-gray-100 shadow-lg rounded-lg overflow-hidden md:max-w-lg">
                        <div className="md:flex">
                            <form className="mx-auto w-10/12 mt-8">
                                <div className="mb-6">
                                    <label htmlFor="email" className="pl-4 font-bold text-lg text-gray-600 block mb-2 ">Display Name</label>
                                    <input onChange={(e) => setNewName(e.target.value)} type="text" className="shadow-sm bg-gray-50 border
        border-gray-500 text-gray-900  rounded-lg block w-full p-2.5" placeholder="title" required />

                                    <br />

                                    <label htmlFor="email" className="pl-4 font-bold text-lg text-gray-600 block mb-2 ">Bio</label>

                                    <textarea onChange={(e) => setBio(e.target.value)} cols="30" type="text"
                                        className="shadow-sm bg-gray-50 border
                                    border-gray-500 
                                    text-gray-900  
                                    rounded-lg block 
                                    w-full p-2.5"
                                        placeholder="content"
                                        required >

                                    </textarea>
                                </div>

                                {loading ? <button disabled type="button" className="hover:cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2  inline-flex items-center">
                                    <svg role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                    </svg>
                                    saving...
                                </button>

                                    : <button onClick={uploadProfile} type="submit" className="hover:cursor-pointer text-white bg-blue-700 
                            hover:bg-blue-800 rounded-md px-5 py-2.5 font-bold text-center">
                                        Update your Profile
                                    </button>}


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

export default EditProfile;