const redirectError = {
    path: '*',
    onEnter: (_, replace) => replace("/error")
}

export default redirectError;