import React from "react";

const MentionsLegales = () => {
  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl font-bold text-center mb-8">Mentions Légales</h1>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Éditeur du site</h2>
          <p className="mb-4">
            <strong>KINGCROC</strong><br />
            15 Rue des Éleveurs<br />
            69001 Lyon, France<br />
            Téléphone : +33 4 78 56 89 12<br />
            Email : contact@kingcroc.fr<br />
            SIRET : 123 456 789 00012<br />
            RCS : Lyon B 123 456 789<br />
          </p>

          <h2 className="text-xl font-semibold mb-4">Directeur de la publication</h2>
          <p className="mb-4">
            Monsieur John Doe, Gérant de KINGCROC.
          </p>

          <h2 className="text-xl font-semibold mb-4">Hébergement du site</h2>
          <p className="mb-4">
            <strong>Nom de l'hébergeur</strong><br />
            Adresse de l'hébergeur<br />
            Téléphone : +33 1 23 45 67 89<br />
            Email : support@hebergeur.com<br />
          </p>

          <h2 className="text-xl font-semibold mb-4">Propriété intellectuelle</h2>
          <p className="mb-4">
            Le site <strong>KINGCROC</strong> et son contenu (textes, images, logos, vidéos, etc.) sont protégés par les lois françaises et internationales sur la propriété intellectuelle. Toute reproduction, distribution ou utilisation sans autorisation écrite préalable est strictement interdite.
          </p>

          <h2 className="text-xl font-semibold mb-4">Données personnelles</h2>
          <p className="mb-4">
            Conformément à la loi Informatique et Libertés du 6 janvier 1978 modifiée et au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité de vos données personnelles. Pour exercer ces droits, veuillez nous contacter à l'adresse email suivante : contact@kingcroc.fr.
          </p>

          <h2 className="text-xl font-semibold mb-4">Cookies</h2>
          <p className="mb-4">
            Ce site utilise des cookies pour améliorer l'expérience utilisateur. Vous pouvez configurer votre navigateur pour refuser les cookies, mais certaines fonctionnalités du site pourraient ne plus fonctionner correctement.
          </p>

          <h2 className="text-xl font-semibold mb-4">Responsabilité</h2>
          <p className="mb-4">
            KINGCROC ne peut être tenu responsable des dommages directs ou indirects résultant de l'utilisation de ce site ou des informations qu'il contient.
          </p>

          <h2 className="text-xl font-semibold mb-4">Contact</h2>
          <p className="mb-4">
            Pour toute question concernant les mentions légales, vous pouvez nous contacter à l'adresse suivante : contact@kingcroc.fr.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MentionsLegales;