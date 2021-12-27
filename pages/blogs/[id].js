import Image from "next/image"
import Link from "next/link"
import Container from "../../components/Container"
import Layout from "../../components/Layout"

function detailBlog() {
    return (
        <>
            <Layout title="Detail Blog" className="bg-white">
                <Container>
                    <div className="w-full py-8 md:py-14">
                        <div className="grid grid-cols-1 xl:grid-cols-6 md:px-8">
                            <div className="md:col-span-5 xl:pr-8 space-y-8">
                                <div className="relative w-full h-80 lg:h-[488px] overflow-hidden">
                                    <Image className="object-cover object-top" src={'/images/img-blog3.png'} alt="image" layout="fill" />
                                </div>

                                <div className="flex flex-row items-center space-x-2">
                                    <h5 className="block text-base tracing-tight text-blue-500 font-semibold">Category</h5>
                                    <span className="block">-</span>
                                    <h5 className="block text-base text-gray-600 tracing-tight">2020-06-12</h5>
                                </div>

                                <div className="flex flex-col items-start justify-start space-y-2">
                                    <h2 className="block text-3xl font-semibold text-gray-800">Ini adalah judul blog</h2>

                                    <div className="block relative overflow-hidden space-y-2">
                                        <p className="block text-base text-gray-600">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates dolorum cupiditate rerum ad nemo repudiandae mollitia aspernatur, ratione, officiis tenetur minus itaque dicta natus veniam, quia ducimus qui dolore in alias. Molestias, sit repellat. Ea culpa aut nobis sunt odio sint laborum dolor quam quidem, rem dolorum blanditiis earum iusto debitis commodi repellendus incidunt illo cupiditate, id obcaecati perferendis! Sed architecto voluptates autem veniam sapiente assumenda debitis deleniti, incidunt corporis mollitia repellendus delectus, officiis temporibus pariatur inventore earum, eveniet vitae quis odit aperiam rem. Mollitia cupiditate nemo ipsum harum aliquid vero, quasi at ipsam. Autem harum atque ea earum velit!</p>
                                        <p className="block text-base text-gray-600">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates dolorum cupiditate rerum ad nemo repudiandae mollitia aspernatur, ratione, officiis tenetur minus itaque dicta natus veniam, quia ducimus qui dolore in alias. Molestias, sit repellat. Ea culpa aut nobis sunt odio sint laborum dolor quam quidem, rem dolorum blanditiis earum iusto debitis commodi repellendus incidunt illo cupiditate, id obcaecati perferendis! Sed architecto voluptates autem veniam sapiente assumenda debitis deleniti, incidunt corporis mollitia repellendus delectus, officiis temporibus pariatur inventore earum, eveniet vitae quis odit aperiam rem. Mollitia cupiditate nemo ipsum harum aliquid vero, quasi at ipsam. Autem harum atque ea earum velit!</p>
                                        <p className="block text-base text-gray-600">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates dolorum cupiditate rerum ad nemo repudiandae mollitia aspernatur, ratione, officiis tenetur minus itaque dicta natus veniam, quia ducimus qui dolore in alias. Molestias, sit repellat. Ea culpa aut nobis sunt odio sint laborum dolor quam quidem, rem dolorum blanditiis earum iusto debitis commodi repellendus incidunt illo cupiditate, id obcaecati perferendis! Sed architecto voluptates autem veniam sapiente assumenda debitis deleniti, incidunt corporis mollitia repellendus delectus, officiis temporibus pariatur inventore earum, eveniet vitae quis odit aperiam rem. Mollitia cupiditate nemo ipsum harum aliquid vero, quasi at ipsam. Autem harum atque ea earum velit!</p>
                                        <p className="block text-base text-gray-600">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates dolorum cupiditate rerum ad nemo repudiandae mollitia aspernatur, ratione, officiis tenetur minus itaque dicta natus veniam, quia ducimus qui dolore in alias. Molestias, sit repellat. Ea culpa aut nobis sunt odio sint laborum dolor quam quidem, rem dolorum blanditiis earum iusto debitis commodi repellendus incidunt illo cupiditate, id obcaecati perferendis! Sed architecto voluptates autem veniam sapiente assumenda debitis deleniti, incidunt corporis mollitia repellendus delectus, officiis temporibus pariatur inventore earum, eveniet vitae quis odit aperiam rem. Mollitia cupiditate nemo ipsum harum aliquid vero, quasi at ipsam. Autem harum atque ea earum velit!</p>
                                        <p className="block text-base text-gray-600">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates dolorum cupiditate rerum ad nemo repudiandae mollitia aspernatur, ratione, officiis tenetur minus itaque dicta natus veniam, quia ducimus qui dolore in alias. Molestias, sit repellat. Ea culpa aut nobis sunt odio sint laborum dolor quam quidem, rem dolorum blanditiis earum iusto debitis commodi repellendus incidunt illo cupiditate, id obcaecati perferendis! Sed architecto voluptates autem veniam sapiente assumenda debitis deleniti, incidunt corporis mollitia repellendus delectus, officiis temporibus pariatur inventore earum, eveniet vitae quis odit aperiam rem. Mollitia cupiditate nemo ipsum harum aliquid vero, quasi at ipsam. Autem harum atque ea earum velit!</p>
                                        <p className="block text-base text-gray-600">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates dolorum cupiditate rerum ad nemo repudiandae mollitia aspernatur, ratione, officiis tenetur minus itaque dicta natus veniam, quia ducimus qui dolore in alias. Molestias, sit repellat. Ea culpa aut nobis sunt odio sint laborum dolor quam quidem, rem dolorum blanditiis earum iusto debitis commodi repellendus incidunt illo cupiditate, id obcaecati perferendis! Sed architecto voluptates autem veniam sapiente assumenda debitis deleniti, incidunt corporis mollitia repellendus delectus, officiis temporibus pariatur inventore earum, eveniet vitae quis odit aperiam rem. Mollitia cupiditate nemo ipsum harum aliquid vero, quasi at ipsam. Autem harum atque ea earum velit!</p>
                                        <p className="block text-base text-gray-600">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates dolorum cupiditate rerum ad nemo repudiandae mollitia aspernatur, ratione, officiis tenetur minus itaque dicta natus veniam, quia ducimus qui dolore in alias. Molestias, sit repellat. Ea culpa aut nobis sunt odio sint laborum dolor quam quidem, rem dolorum blanditiis earum iusto debitis commodi repellendus incidunt illo cupiditate, id obcaecati perferendis! Sed architecto voluptates autem veniam sapiente assumenda debitis deleniti, incidunt corporis mollitia repellendus delectus, officiis temporibus pariatur inventore earum, eveniet vitae quis odit aperiam rem. Mollitia cupiditate nemo ipsum harum aliquid vero, quasi at ipsam. Autem harum atque ea earum velit!</p>
                                        <p className="block text-base text-gray-600">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates dolorum cupiditate rerum ad nemo repudiandae mollitia aspernatur, ratione, officiis tenetur minus itaque dicta natus veniam, quia ducimus qui dolore in alias. Molestias, sit repellat. Ea culpa aut nobis sunt odio sint laborum dolor quam quidem, rem dolorum blanditiis earum iusto debitis commodi repellendus incidunt illo cupiditate, id obcaecati perferendis! Sed architecto voluptates autem veniam sapiente assumenda debitis deleniti, incidunt corporis mollitia repellendus delectus, officiis temporibus pariatur inventore earum, eveniet vitae quis odit aperiam rem. Mollitia cupiditate nemo ipsum harum aliquid vero, quasi at ipsam. Autem harum atque ea earum velit!</p>
                                        <p className="block text-base text-gray-600">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates dolorum cupiditate rerum ad nemo repudiandae mollitia aspernatur, ratione, officiis tenetur minus itaque dicta natus veniam, quia ducimus qui dolore in alias. Molestias, sit repellat. Ea culpa aut nobis sunt odio sint laborum dolor quam quidem, rem dolorum blanditiis earum iusto debitis commodi repellendus incidunt illo cupiditate, id obcaecati perferendis! Sed architecto voluptates autem veniam sapiente assumenda debitis deleniti, incidunt corporis mollitia repellendus delectus, officiis temporibus pariatur inventore earum, eveniet vitae quis odit aperiam rem. Mollitia cupiditate nemo ipsum harum aliquid vero, quasi at ipsam. Autem harum atque ea earum velit!</p>
                                        <p className="block text-base text-gray-600">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates dolorum cupiditate rerum ad nemo repudiandae mollitia aspernatur, ratione, officiis tenetur minus itaque dicta natus veniam, quia ducimus qui dolore in alias. Molestias, sit repellat. Ea culpa aut nobis sunt odio sint laborum dolor quam quidem, rem dolorum blanditiis earum iusto debitis commodi repellendus incidunt illo cupiditate, id obcaecati perferendis! Sed architecto voluptates autem veniam sapiente assumenda debitis deleniti, incidunt corporis mollitia repellendus delectus, officiis temporibus pariatur inventore earum, eveniet vitae quis odit aperiam rem. Mollitia cupiditate nemo ipsum harum aliquid vero, quasi at ipsam. Autem harum atque ea earum velit!</p>
                                        <p className="block text-base text-gray-600">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates dolorum cupiditate rerum ad nemo repudiandae mollitia aspernatur, ratione, officiis tenetur minus itaque dicta natus veniam, quia ducimus qui dolore in alias. Molestias, sit repellat. Ea culpa aut nobis sunt odio sint laborum dolor quam quidem, rem dolorum blanditiis earum iusto debitis commodi repellendus incidunt illo cupiditate, id obcaecati perferendis! Sed architecto voluptates autem veniam sapiente assumenda debitis deleniti, incidunt corporis mollitia repellendus delectus, officiis temporibus pariatur inventore earum, eveniet vitae quis odit aperiam rem. Mollitia cupiditate nemo ipsum harum aliquid vero, quasi at ipsam. Autem harum atque ea earum velit!</p>
                                        <p className="block text-base text-gray-600">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates dolorum cupiditate rerum ad nemo repudiandae mollitia aspernatur, ratione, officiis tenetur minus itaque dicta natus veniam, quia ducimus qui dolore in alias. Molestias, sit repellat. Ea culpa aut nobis sunt odio sint laborum dolor quam quidem, rem dolorum blanditiis earum iusto debitis commodi repellendus incidunt illo cupiditate, id obcaecati perferendis! Sed architecto voluptates autem veniam sapiente assumenda debitis deleniti, incidunt corporis mollitia repellendus delectus, officiis temporibus pariatur inventore earum, eveniet vitae quis odit aperiam rem. Mollitia cupiditate nemo ipsum harum aliquid vero, quasi at ipsam. Autem harum atque ea earum velit!</p>
                                        <p className="block text-base text-gray-600">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates dolorum cupiditate rerum ad nemo repudiandae mollitia aspernatur, ratione, officiis tenetur minus itaque dicta natus veniam, quia ducimus qui dolore in alias. Molestias, sit repellat. Ea culpa aut nobis sunt odio sint laborum dolor quam quidem, rem dolorum blanditiis earum iusto debitis commodi repellendus incidunt illo cupiditate, id obcaecati perferendis! Sed architecto voluptates autem veniam sapiente assumenda debitis deleniti, incidunt corporis mollitia repellendus delectus, officiis temporibus pariatur inventore earum, eveniet vitae quis odit aperiam rem. Mollitia cupiditate nemo ipsum harum aliquid vero, quasi at ipsam. Autem harum atque ea earum velit!</p>
                                        <p className="block text-base text-gray-600">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates dolorum cupiditate rerum ad nemo repudiandae mollitia aspernatur, ratione, officiis tenetur minus itaque dicta natus veniam, quia ducimus qui dolore in alias. Molestias, sit repellat. Ea culpa aut nobis sunt odio sint laborum dolor quam quidem, rem dolorum blanditiis earum iusto debitis commodi repellendus incidunt illo cupiditate, id obcaecati perferendis! Sed architecto voluptates autem veniam sapiente assumenda debitis deleniti, incidunt corporis mollitia repellendus delectus, officiis temporibus pariatur inventore earum, eveniet vitae quis odit aperiam rem. Mollitia cupiditate nemo ipsum harum aliquid vero, quasi at ipsam. Autem harum atque ea earum velit!</p>
                                    </div>

                                </div>

                                <div className="flex flex-row items-center justify-start space-x-4 border-t border-gray-300 py-6">
                                    <div className="md:w-14 md:h-14 h-12 w-12 bg-gray-100 rounded-full overflow-hidden relative">
                                        <Image src={'/images/img-blog3.png'} alt="image" layout="fill" />
                                    </div>

                                    <div className="flex flex-col">
                                        <h5 className="block text-gray-800 font-semibold text-base font-sans">Muhammad Badrun</h5>
                                        <h5 className="block text-gray-500 text-sm font-sans">Software Enginering</h5>
                                    </div>
                                </div>

                            </div>
                            <div className="md:col-span-1">
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-1 gap-6 lg:ga-8">
                                    {
                                        [3, 4, 5, 3, 4, 5].map((item, i) => (
                                            <div key={i} className="w-full h-auto relative flex flex-col items-start justify-start bg-white shadow rounded overflow-hidden">
                                                <div className="h-44 md:h-32 relative overflow-hidden w-full flex-shrink-0">
                                                    <Image className="object-cover object-top" src={`/images/img-blog${item}.png`} alt="image" layout="fill" />
                                                </div>
                                                <div className="py-2 px-3 flex flex-col space-y-1 overflow-hidden">
                                                    <div className="flex flex-row items-center space-x-1">
                                                        <h5 className="block text-xs tracing-tight text-blue-500 font-semibold">Category</h5>
                                                        <span className="block">-</span>
                                                        <h5 className="block text-xs text-gray-600 tracing-tight">2020-06-12</h5>
                                                    </div>
                                                    <Link href={'/blogs/1'}>
                                                        <a className="blocktext-base font-semibold text-gray-800 hover:underline">Ini adalah judul blog</a>
                                                    </Link>

                                                    <p className="block text-xs text-gray-600">Daan ini adalah conetla uang seperti ada di dalah text ini ada di dalah text ini ada di dalah text ini</p>

                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </Layout>
        </>
    )
}

export default detailBlog
