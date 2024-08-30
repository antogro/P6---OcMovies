const listMot = ["cachalot", "petunia", "serviette"]
const listPhrase = ["Pas de panique !", "La vie, l\’univers et le reste", "Merci pour le poisson"]
let score = 0

function jeuMotPhrase(list){
    let i = 0
    list.forEach((item, index) => {
        let motUtilisateur = prompt("écriver le mot: " + (index + 1) + ": " + item )
        if (motUtilisateur === item){
            console.log("bien joué")
            score +=1
        }else{
            console.log("incorrect")
            
        }
        i++
    })
    return i
}


function choixDuJeu(){
    let loop = true
    while (loop){
        let result = prompt("Ecriver phrase ou mot (pour choisir quelle liste vous souhaiter performer: ")
        if (result === "phrase"){
            quantiteQuestion = jeuMotPhrase(listPhrase)
            loop = false
        } else if (result === "mot"){
            quantiteQuestion = jeuMotPhrase(listMot)
            loop = false
        }else{
            console.log("faites un meilleur choix")
        }
    }
    console.log("Votre score est de " + score + " sur " + quantiteQuestion)
}




choixDuJeu()