class A1 {
    @AOP('BEFORE', function() {})
    say() {}
}
function AOP(type:string, func:Function) {
    return (target, propetyKey, descripotor) => {
        l(descripotor)
        let oldMethod = descripotor.value
        if (type === 'BEFORE') {
            descripotor.value = function () {
                func(...arguments)
                return oldMethod.apply(this, arguments)
            }
        } else if (type === 'AFTER') {
            descripotor.value = function () {
                let result = oldMethod.apply(this, arguments)
                func(...arguments)
                return result
            }
        }
    }
}
