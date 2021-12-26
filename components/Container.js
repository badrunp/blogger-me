function Container({ children, className="container px-4" }) {
    return (
        <div className={`mx-auto w-full h-full ${className} `}>
            {children}
        </div>
    )
}

export default Container
