-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : sam. 28 déc. 2024 à 14:52
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `school-as`
--

-- --------------------------------------------------------

--
-- Structure de la table `classes`
--

CREATE TABLE `classes` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `classes`
--

INSERT INTO `classes` (`id`, `nom`, `createdAt`, `updatedAt`) VALUES
(1, 'Mathématiques - 6e', '2024-12-28 11:31:49', '2024-12-28 11:31:49'),
(2, 'Physique - Terminale', '2024-12-28 11:31:49', '2024-12-28 11:31:49');

-- --------------------------------------------------------

--
-- Structure de la table `devoirs`
--

CREATE TABLE `devoirs` (
  `id` int(11) NOT NULL,
  `description` text NOT NULL,
  `matiere` varchar(255) NOT NULL,
  `dateLimite` datetime NOT NULL,
  `classeId` int(11) NOT NULL,
  `enseignantId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `devoirs`
--

INSERT INTO `devoirs` (`id`, `description`, `matiere`, `dateLimite`, `classeId`, `enseignantId`, `createdAt`, `updatedAt`) VALUES
(1, 'Réaliser les exercices 5 et 6 du chapitre 3', 'Mathématiques', '2024-12-10 00:00:00', 1, 1, '2024-12-28 11:31:49', '2024-12-28 11:31:49'),
(2, 'Étude des ondes', 'Physique', '2024-12-25 00:00:00', 2, 2, '2024-12-28 11:31:49', '2024-12-28 11:31:49');

-- --------------------------------------------------------

--
-- Structure de la table `eleves`
--

CREATE TABLE `eleves` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `classeId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `eleves`
--

INSERT INTO `eleves` (`id`, `nom`, `prenom`, `email`, `classeId`, `createdAt`, `updatedAt`) VALUES
(1, 'Dupont', 'Jean', 'jean.dupont.eleve@example.com', 1, '2024-12-28 11:31:49', '2024-12-28 11:31:49'),
(2, 'Curie', 'Marie', 'marie.curie.eleve@example.com', 1, '2024-12-28 11:31:49', '2024-12-28 11:31:49');

-- --------------------------------------------------------

--
-- Structure de la table `enseignants`
--

CREATE TABLE `enseignants` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `enseignants`
--

INSERT INTO `enseignants` (`id`, `nom`, `prenom`, `email`, `createdAt`, `updatedAt`) VALUES
(1, 'Smith', 'John', 'john.smith@example.com', '2024-12-28 11:31:49', '2024-12-28 11:31:49'),
(2, 'Taylor', 'Alice', 'alice.taylor@example.com', '2024-12-28 11:31:49', '2024-12-28 11:31:49');

-- --------------------------------------------------------

--
-- Structure de la table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20241227202014-create-classes-table.js'),
('20241227202050-create-enseignants-table.js'),
('20241227202110-create-eleves-table.js'),
('20241227202123-create-devoirs-table.js'),
('20241227202137-create-soumissions-table.js');

-- --------------------------------------------------------

--
-- Structure de la table `soumissions`
--

CREATE TABLE `soumissions` (
  `id` int(11) NOT NULL,
  `dateSoumission` datetime NOT NULL DEFAULT current_timestamp(),
  `reponse` text DEFAULT NULL,
  `note` int(11) DEFAULT NULL,
  `eleveId` int(11) NOT NULL,
  `devoirId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `soumissions`
--

INSERT INTO `soumissions` (`id`, `dateSoumission`, `reponse`, `note`, `eleveId`, `devoirId`, `createdAt`, `updatedAt`) VALUES
(1, '2024-12-09 00:00:00', 'Voici ma réponse aux exercices.', 15, 1, 1, '2024-12-28 11:31:49', '2024-12-28 11:31:49'),
(2, '2024-12-10 00:00:00', 'Non rendu', 0, 2, 1, '2024-12-28 11:42:03', '2024-12-28 11:42:03');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `devoirs`
--
ALTER TABLE `devoirs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `classeId` (`classeId`),
  ADD KEY `enseignantId` (`enseignantId`);

--
-- Index pour la table `eleves`
--
ALTER TABLE `eleves`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `classeId` (`classeId`);

--
-- Index pour la table `enseignants`
--
ALTER TABLE `enseignants`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Index pour la table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Index pour la table `soumissions`
--
ALTER TABLE `soumissions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `eleveId` (`eleveId`),
  ADD KEY `devoirId` (`devoirId`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `classes`
--
ALTER TABLE `classes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `devoirs`
--
ALTER TABLE `devoirs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `eleves`
--
ALTER TABLE `eleves`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `enseignants`
--
ALTER TABLE `enseignants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `soumissions`
--
ALTER TABLE `soumissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `devoirs`
--
ALTER TABLE `devoirs`
  ADD CONSTRAINT `devoirs_ibfk_1` FOREIGN KEY (`classeId`) REFERENCES `classes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `devoirs_ibfk_2` FOREIGN KEY (`enseignantId`) REFERENCES `enseignants` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `eleves`
--
ALTER TABLE `eleves`
  ADD CONSTRAINT `eleves_ibfk_1` FOREIGN KEY (`classeId`) REFERENCES `classes` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `soumissions`
--
ALTER TABLE `soumissions`
  ADD CONSTRAINT `soumissions_ibfk_1` FOREIGN KEY (`eleveId`) REFERENCES `eleves` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `soumissions_ibfk_2` FOREIGN KEY (`devoirId`) REFERENCES `devoirs` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
