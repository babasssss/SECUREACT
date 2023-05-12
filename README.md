# Projet SECUREACT

> Le Projet SECUREACT est une application web pédagogique conçue pour enseigner aux utilisateurs les meilleures pratiques en matière de sécurité informatique. Le projet est destiné à tous ceux qui souhaitent apprendre à se protéger en ligne et à mieux comprendre les risques de sécurité auxquels ils sont confrontés.

## Sommaire
- [Démarrage de l'application](#démarrage-de-lapplication)
  - [Étape 1 - Démarrer le back-end](#étape-1---démarrer-le-back-end)
  - [Étape 2 - Démarrer le front-end](#étape-2---démarrer-le-front-end)
- [Documentation](#documentation)
  - [Projet React.JS - Node.JS](#projet-reactjs---nodejs)
    - [Nom projet : SECUREACT](#nom-projet--secureact)
  - [Description](#description)
    - [Le client :](#le-client-)
    - [Les factures :](#les-factures-)
    - [Les produits :](#les-produits-)
    - [Les TVA](#les-tva)
    - [Les UNITES :](#les-unites-)

## Démarrage de l'application

Pour démarrer l'application, suivez les étapes ci-dessous :

### Étape 1 - Démarrer le back-end

Tout d'abord, ouvrez un terminal et naviguez jusqu'au répertoire back :`cd back`

Ensuite, installez les dépendances avec yarn : `yarn`

Enfin, démarrez le serveur de développement : `yarn dev`



### Étape 2 - Démarrer le front-end

Dans un nouveau terminal, naviguez jusqu'au répertoire frontend : `cd frontend`

Installez les dépendances avec yarn : `yarn `

Enfin, démarrez l'application : `yarn start`


## Documentation

La documentation évoluera au fur et à mesure que le projet avancera. Restez à l'écoute pour plus d'informations !

### Projet React.JS - Node.JS
#### Nom projet : SECUREACT

**Pour ce projet, je propose de réalisé une application en NodeJS pour l’API et une application en ReactJS pour le mobile First. Ce projet vise une personne ambda qui souhaite gérer ces factures, ces devis et ces clients**

- [ ] Il faut donc mettre à disposition de l’utilisateur la possibilité de gérer l’ensemble de c’est fonctionnalité 
- [ ]  Une interface / tableau de bord 

#### Description  :

##### Le client :
- [ ] Numéro client 
- [ ] Nom et prénom
- [ ] Email
- [ ] Type client( particulier ou pro) 
- [ ] Téléphone
- [ ] Adresse
- [ ] CodePostal
- [ ] Ville
- [ ] Pays 
- [ ] Ref user ( référence à l’users connecter)
`

##### Les factures : 
- [ ] Ref CLIENT
- [ ] Num facture
- [ ] Date facture
- [ ] Conditions de payements ( 0j, 7j, 14j, 30j, 60j, 90j)
- [ ] Echéance PAR DEFAULT 1 mois après la date de la facture
- [ ] Message
- [ ] Ref produits
- [ ] Quantité
- [ ] Unité de messure 
- [ ] Prix 
- [ ] TVA ( O%, 5%, …)
- [ ] Montant (Calculé automatiquement par rapport à la Qté , Prix et TVA)
- [ ] Total HT (Calculé automatiquement par rapport à la Qté , Prix)
- [ ] TVA total (Montant – TotalHT)


##### Les produits : 
- [ ] Nom
- [ ] Commentaire
- [ ] Unité 
- [ ] Prix basé sur ( Prix HT ou Prix TTC)
- [ ] TVA ( O%, 5%, …)
- [ ] Prix


##### Les TVA 
- [ ] Number


##### Les UNITES : 
- [ ] Nom unité : String(cm,km,…)



> Source d'inspiration : https://www.zervant.com/fr/