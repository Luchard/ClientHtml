/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var Category = function (categorie) {
    this.id = ko.observable(categorie.id);
    this.nom = ko.observable(categorie.nom);
    this.description = ko.observable(categorie.description);


};




var ViewModel = function (categories) {
    var self = this;

    self.categories = ko.observableArray(ko.utils.arrayMap(categories, function (categorie) {
        return new Category(categorie);
    }));

    self.remove = function (categorie) {
        self.categories.remove(categorie);
        $.ajax({
            url: "http://localhost:8080/bibliotheque_ntdp-master/webresources/fr.unice.miage.ntdp.bibliotheque.categorie/" + categorie.id(),
            type: "DELETE",
            contentType: "application/json",
            headers: {
                Accept: "application/json",
                success: (function (data, status, jq) {
                    // alert(status);  
                    self.categories.remove(categorie);
                })
            }
        });


    };
    self.update = function (categorie) {
        $.ajax({
            url: "http://localhost:8080/bibliotheque_ntdp-master/webresources/fr.unice.miage.ntdp.bibliotheque.categorie/" + categorie.id(),
            type: "PUT",
            data: ko.toJSON(categorie, null, 2),
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
        url: "http://localhost:8080/bibliotheque_ntdp-master/webresources/fr.unice.miage.ntdp.bibliotheque.categorie",
        type: "GET",
        headers: {
            Accept: "application/json"
        },
        success: (function (data, status, jq) {
//Cette fonction indique à knockout d'appliquer les données aux éléments de la page   
//Elle est toujours appelée quand les données sont pretes et est appelée qu'une fois   
            ko.applyBindings(new ViewModel(data));
        })
    });
};

