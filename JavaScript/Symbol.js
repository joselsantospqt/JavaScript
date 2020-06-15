let mapa = {}
let coleção = []
for(let i = 0; i < 20; i++){
    let obj = {}

    for(let j = 0; j < 3; j++){
        let num = Math.ceil(Math.random() * 1000)
        let ref = Symbol();
        mapa[ref] = num

        obj['a' + j] = ref
    }
    colecao.push(obj)
}
console.log(colecao)