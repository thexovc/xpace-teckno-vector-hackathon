import Layout from "../components/Layout";
import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router";
import * as Realm from "realm-web";
import { UserContext } from "../context/user";

const Create_Course = () => {
    const router = useRouter()
    const [courseName, setCourseName] = useState("")
    const [price, setPrice] = useState("")
    const [desc, setDesc] = useState("")

    const { userDetails, getUser, setToggle } = useContext(UserContext)

    getUser()

    useEffect(() => {
        setToggle(false)
    }, [])


    // upload course
    const uploadCourse = async (e) => {
        e.preventDefault();


        const coursedetail = {
            owner: userDetails.walletAddress,
            name: courseName,
            ownername: userDetails.name,
            price: price,
            desc: desc,
            pdf: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFuzXlbe2gwPOnc_oVk1wkYy071i9GYQrqM3jhjF_rwqRJzhXCrWS-v-tovl5CclzgCcI&usqp=CAU",
            file: "https://www.youtube.com/watch?v=UBJ-j6Mcbzw"
        };

        const REALM_APP_ID = "products-qexct";
        const app = new Realm.App({ id: REALM_APP_ID });
        const credentials = Realm.Credentials.anonymous();

        try {


            const user = await app.logIn(credentials);

            if (user) {

                const insertO = await user.functions.xpaceCourses(coursedetail);

                console.log(insertO)

                router.push({
                    pathname: `/course`,
                });


            }

        } catch (error) {
            console.error(error);
        }
    }


    return (
        <Layout>
            <div className="mx-5 md:mx-20  h-full rounded-lg  px-2">
                <div className="py-10  px-2">
                    <br /><br />
                    <div className="flex w-full justify-center items-center mb-4">
                        <h1 className="max-w-md mx-auto text-2xl font-bold text-gray-100">Make a Course</h1>
                    </div>
                    <div className="max-w-md mx-auto bg-gray-100 shadow-lg rounded-lg overflow-hidden md:max-w-lg">
                        <div className="md:flex">
                            <form className="mx-auto w-10/12 mt-8">
                                <div className="mb-6">
                                    <label htmlFor="email" className="pl-4 font-bold text-lg text-gray-600 block mb-2 ">Course Title</label>
                                    <input onChange={(e) => setCourseName(e.target.value)} type="text" className="shadow-sm bg-gray-50 border
            border-gray-500 text-gray-900  rounded-lg block w-full p-2.5" placeholder="title" required />

                                    <br />

                                    <label htmlFor="email" className="pl-4 font-bold text-lg text-gray-600 block mb-2 ">Amount in Xpace Token</label>
                                    <input onChange={(e) => setPrice(e.target.value)} type="number" className="shadow-sm bg-gray-50 border
            border-gray-500 text-gray-900  rounded-lg block w-full p-2.5" placeholder="amount" required />

                                    <br />

                                    <label htmlFor="email" className="pl-4 font-bold text-lg text-gray-600 block mb-2 ">Description</label>
                                    <textarea cols={30} onChange={(e) => setDesc(e.target.value)} type="text" className="shadow-sm bg-gray-50 border
            border-gray-500 text-gray-900  rounded-lg block w-full p-2.5" placeholder="amount" required > </textarea>

                                    <br />

                                    <label htmlFor="email" className="pl-4 font-bold text-lg text-gray-600 block mb-2 ">Pdf</label>

                                    <input type="file"
                                        id="fileElem"
                                        multiple accept="image/*"


                                        className="bg-gray-50 border
                                    border-gray-400 
                                    text-gray-900  rounded-lg 
                                    block w-full p-1"  required
                                    />
                                    <br />

                                    <label htmlFor="email" className="pl-4 font-bold text-lg text-gray-600 block mb-2 ">File</label>

                                    <input type="file"
                                        id="fileElem"
                                        multiple accept="image/*"


                                        className="bg-gray-50 border
                                    border-gray-400 
                                    text-gray-900  rounded-lg 
                                    block w-full p-1"  required
                                    />
                                    <br />

                                </div>


                                <button onClick={uploadCourse} type="submit" className="text-white bg-blue-700 
                            hover:bg-blue-800 rounded-md px-5 py-2.5 font-bold text-center">
                                    Create a Course
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

export default Create_Course;