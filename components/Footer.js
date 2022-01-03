import { contacts, footerPageAuthLinks, footerPageMenuLinks } from "../constant/footer"
import Container from "./Container"
import FooterPageMenu from "./FooterPageMenu"
import Logo from "./Logo"

function Footer() {
    return (
        <>
            <div className="w-full h-auto relative overflow-hidden bg-zinc-800">
                <Container>
                    <div className="flex flex-col justify-start items-start divide-y divide-gray-500 w-full">
                        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 w-full pb-8 pt-14 gap-6">
                            <li className="flex flex-col justify-start items-start space-y-4 col-span-1 md:col-span-2 pr-8">
                                <Logo/>

                                <h4 className="block text-gray-100 font-sans tracking-wide text-sm">Blogger Me adalah suatu website dimana web ini menyajikan kontent atau informasi yang dapat kalian baca atau pelajari.</h4>
                            </li>
                            <li className="flex flex-col items-start justify-start space-y-4">
                                <h3 className="block text-gray-100 font-medium text-xl">Auth</h3>

                                <ul className="flex flex-col justify-start items-start space-y-4">
                                    {
                                        footerPageAuthLinks &&
                                        footerPageAuthLinks.map((footerLink) => (
                                            <FooterPageMenu key={footerLink.id} footerLink={footerLink} />
                                        ))
                                    }
                                </ul>
                            </li>
                            <li className="flex flex-col items-start justify-start space-y-4">
                                <h3 className="block text-gray-100 font-medium text-xl">Menu</h3>

                                <ul className="flex flex-col justify-start items-start space-y-4">
                                    {
                                        footerPageMenuLinks &&
                                        footerPageMenuLinks.map((footerLink) => (
                                            <FooterPageMenu key={footerLink.id} footerLink={footerLink} />
                                        ))
                                    }
                                </ul>
                            </li>
                            
                            <li className="flex flex-col items-start justify-start space-y-4">
                                <h3 className="block text-gray-100 font-medium text-xl">Contact Me</h3>

                                <ul className="flex flex-col justify-start items-start space-y-4">
                                    {
                                        contacts &&
                                        contacts.map((contact) => (
                                            <li key={contact.id} className="relative">
                                                <p className="block text-gray-400 font-medium text-sm hover:text-white">{contact.label}</p>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </li>
                        </ul>
                        <div className="text-center w-full py-8">
                            <p className="block text-gray-100 text-sm">Copyright &copy; {new Date().getFullYear()} Muhammad Badrun</p>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}

export default Footer
