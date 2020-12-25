

export function NotImplemented(){
    const error = new Error("Not implemented")
    return error
}
NotImplemented.prototype = Object.create(Error.prototype)

export function InvalidClassInstance(pClass){
    const error = new Error("Invalid class instance '" + pClass + "' detected")
    return error
}
InvalidClassInstance.prototype = Object.create(Error.prototype)