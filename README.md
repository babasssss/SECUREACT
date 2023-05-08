# Projet SECUREACT

> Le Projet SECUREACT est une application web pédagogique conçue pour enseigner aux utilisateurs les meilleures pratiques en matière de sécurité informatique. Le projet est destiné à tous ceux qui souhaitent apprendre à se protéger en ligne et à mieux comprendre les risques de sécurité auxquels ils sont confrontés.

## Sommaire
- [Démarrage de l'application](#démarrage-de-lapplication)
  - [Étape 1 - Démarrer le back-end](#étape-1---démarrer-le-back-end)
  - [Étape 2 - Démarrer le front-end](#étape-2---démarrer-le-front-end)
- [Documentation](#documentation)

## Démarrage de l'application

Pour démarrer l'application, suivez les étapes ci-dessous :

### Étape 1 - Démarrer le back-end

Tout d'abord, ouvrez un terminal et naviguez jusqu'au répertoire back :

`cd back`

Ensuite, installez les dépendances avec yarn :

`yarn`


Enfin, démarrez le serveur de développement :

`yarn dev`



### Étape 2 - Démarrer le front-end

Dans un nouveau terminal, naviguez jusqu'au répertoire frontend :

`cd frontend`


Installez les dépendances avec yarn :

`yarn `


Enfin, démarrez l'application :

`yarn start`


## Documentation

La documentation évoluera au fur et à mesure que le projet avancera. Restez à l'écoute pour plus d'informations !

### Projet React.JS - Node.JS
#### Nom projet : SECUREACT

** Pour ce projet, je propose de réalisé une application en NodeJS pour l’API et une application en ReactJS pour le mobile First. Ce projet vise une personne ambda qui souhaite gérer ces factures, ces devis et ces clients **

- [ ] Il faut donc mettre à disposition de l’utilisateur la possibilité de gérer l’ensemble de c’est fonctionnalité 
- [ ]  Une interface / tableau de bord 

#### DESCRIPTION :
##### Le client :
<u>Information client</u>
`
- [x] Numéro client 
- [x] Nom et prénom
- [x] Email
- [x] Type client( particulier ou pro) 
- [x] Téléphone
- [x] Adresse
- [x] CodePostal
- [x] Ville
- [x] Pays 
- [x] Ref user ( référence à l’users connecter)
`

##### Les factures : 
<u>Infos factures :</u>
`
- [x] Ref CLIENT
- [x] Num facture
- [x] Date facture
- [x] Conditions de payements ( 0j, 7j, 14j, 30j, 60j, 90j)
- [x] Echéance PAR DEFAULT 1 mois après la date de la facture
- [x] Message
- [x] Ref produits
- [x] Quantité
- [x] Unité de messure 
- [x] Prix 
- [x] TVA ( O%, 5%, …)
- [x] Montant (Calculé automatiquement par rapport à la Qté , Prix et TVA)
- [x] Total HT (Calculé automatiquement par rapport à la Qté , Prix)
- [x] TVA total (Montant – TotalHT)


##### Les produits : 
<u>Infos Produits</u>
`
- [x] Nom
- [x] Commentaire
- [x] Unité 
- [x] Prix basé sur ( Prix HT ou Prix TTC)
- [x] TVA ( O%, 5%, …)
- [x] Prix
`

##### Les TVA 
<u>Info TVA</u>
`
- [x] Number
`

##### Les UNITES : 
<u>Info Unité</u>
`
- [x] Nom unité : String(cm,km,…)
`