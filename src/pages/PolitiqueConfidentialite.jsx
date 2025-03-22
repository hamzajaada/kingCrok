import React from "react";

const PolitiqueConfidentialite = () => {
  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl font-bold text-center mb-8">Politique de Confidentialité</h1>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Introduction</h2>
          <p className="mb-4">
            Chez <strong>KINGCROC</strong>, nous prenons la protection de vos données personnelles très au sérieux. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations lorsque vous visitez notre site ou utilisez nos services.
          </p>

          <h2 className="text-xl font-semibold mb-4">Données collectées</h2>
          <p className="mb-4">
            Nous pouvons collecter les informations suivantes :<br />
            - Nom et prénom<br />
            - Adresse email<br />
            - Adresse postale<br />
            - Numéro de téléphone<br />
            - Informations de paiement (cryptées)<br />
            - Données de navigation (adresse IP, type de navigateur, etc.)
          </p>

          <h2 className="text-xl font-semibold mb-4">Utilisation des données</h2>
          <p className="mb-4">
            Vos données sont utilisées pour :<br />
            - Traiter vos commandes<br />
            - Vous envoyer des informations sur nos produits et services<br />
            - Améliorer votre expérience utilisateur<br />
            - Respecter nos obligations légales
          </p>

          <h2 className="text-xl font-semibold mb-4">Partage des données</h2>
          <p className="mb-4">
            Vos données ne seront jamais vendues à des tiers. Elles peuvent être partagées avec :<br />
            - Nos partenaires de livraison<br />
            - Nos prestataires de paiement<br />
            - Les autorités légales si requis par la loi
          </p>

          <h2 className="text-xl font-semibold mb-4">Sécurité des données</h2>
          <p className="mb-4">
            Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger vos données contre tout accès non autorisé, modification ou destruction.
          </p>

          <h2 className="text-xl font-semibold mb-4">Vos droits</h2>
          <p className="mb-4">
            Conformément au RGPD, vous avez le droit :<br />
            - D'accéder à vos données<br />
            - De les rectifier ou de les supprimer<br />
            - De vous opposer à leur utilisation<br />
            - De demander la portabilité de vos données<br />
            Pour exercer ces droits, contactez-nous à : contact@kingcroc.fr.
          </p>

          <h2 className="text-xl font-semibold mb-4">Cookies</h2>
          <p className="mb-4">
            Notre site utilise des cookies pour améliorer votre expérience. Vous pouvez les désactiver dans les paramètres de votre navigateur, mais cela peut affecter certaines fonctionnalités du site.
          </p>

          <h2 className="text-xl font-semibold mb-4">Modifications de la politique</h2>
          <p className="mb-4">
            Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Les modifications seront publiées sur cette page.
          </p>

          <h2 className="text-xl font-semibold mb-4">Contact</h2>
          <p className="mb-4">
            Pour toute question concernant cette politique, veuillez nous contacter à : contact@kingcroc.fr.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PolitiqueConfidentialite;