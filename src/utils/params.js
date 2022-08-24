const verifyParams = (params, props) => {
    let counter = 0
    props.forEach(key => {
        params[key] && params[key] !== " "  
            ? counter++
            : ""
    })
    return counter === props.length
}

module.exports = { verifyParams }