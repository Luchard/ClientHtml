/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var Autheur = function (author) {
    this.id = ko.observable(author.id);
    this.nom = ko.observable(author.nom);
    this.prenom = ko.observable(author.prenom);
   
};



var ViewModel = function (livres) {
    var self = this;
    //représente la liste des catégories  
    //La fonction prend la réponse obtenue du serveur en paramètre  
    //Ici nous supposons que vous avez chargé la liste des catégories  
    //ko.utils.arrayMap itère sur la collection et pour chaque objet trouvé, elle crée une instance de categorie   
    self.auteurs = ko.observableArray(ko.utils.arrayMap(livres, function (author) {
        return new Autheur(author);
    }));
    
    self.remove = function(author){
        self.livres.remove(author);
        $.ajax({
            url: "http://localhost:8080/bibliotheque_ntdp-master/webresources/fr.unice.miage.ntdp.bibliotheque.auteur/" + author.id(),
            type: "DELETE",
            contentType: "application/json",
            headers: {
                Accept: "application/json",
                success: (function (data, status, jq) {
                    // alert(status);  
                   getData();
                })
            }
        });
        
    };
    
        self.update = function (author) {
        $.ajax({
            url: "http://localhost:8080/bibliotheque_ntdp-master/webresources/fr.unice.miage.ntdp.bibliotheque.auteur/" + author.id(),
            type: "PUT",
            data: ko.toJSON(author, null, 2),
            contentType: "application/json",
            headers: {
                Accept: "application/json"
            },
            success: (function (data, status, jq) {
                // alert(status);  
                getData();
            })
        });
    };
};


var getData = function () {
    $.ajax({
        url: "http://localhost:8080/bibliotheque_ntdp-master/webresources/fr.unice.miage.ntdp.bibliotheque.auteur",
        type: "GET",
        headers: {
            Accept: "application/json"
        },
        success: function (data, status, jq) {
//Cette fonction indique à knockout d'appliquer les données aux éléments de la page   
//Elle est toujours appelée quand les données sont pretes et est appelée qu'une fois   
            ko.applyBindings(new ViewModel(data));
        }

    });
};