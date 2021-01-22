SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;


CREATE TABLE `carts` (
  `Id` int(11) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `status` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `cart_product` (
  `Id` int(11) UNSIGNED NOT NULL,
  `cart_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `safeprice` decimal(10,0) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `categories` (
  `Id` int(100) UNSIGNED NOT NULL,
  `category` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `categories` (`Id`, `category`, `created_at`, `updated_at`) VALUES
(1, 'Indumentaria\r\n', '2021-01-14 02:04:05', '2021-01-14 02:04:24'),
(2, 'Merchandising\r\n', '2021-01-14 02:04:05', '2021-01-14 02:04:24'),
(3, 'Accesorios\r\n', '2021-01-14 02:04:05', '2021-01-14 02:04:24');

CREATE TABLE `designs` (
  `Id` int(11) UNSIGNED NOT NULL,
  `design` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `designs` (`Id`, `design`, `created_at`, `updated_at`) VALUES
(1, 'Alicia', '2021-01-14 13:22:21', '2021-01-14 13:22:21'),
(2, 'Cortazar', '2021-01-14 13:22:21', '2021-01-14 13:22:21'),
(3, 'Principito', '2021-01-14 13:22:41', '2021-01-14 13:22:41'),
(4, 'Poe', '2021-01-14 13:22:41', '2021-01-14 13:22:41'),
(6, 'Marxs', '2021-01-22 21:15:05', '2021-01-22 21:15:05'),
(7, 'Sartre', '2021-01-22 21:15:05', '2021-01-22 21:15:05'),
(8, 'Marxs', '2021-01-22 21:15:10', '2021-01-22 21:15:10'),
(9, 'Sartre', '2021-01-22 21:15:10', '2021-01-22 21:15:10'),
(10, 'Freud', '2021-01-22 21:15:32', '2021-01-22 21:15:32'),
(11, 'Mujercitas', '2021-01-22 21:17:12', '2021-01-22 21:17:48'),
(12, 'Gato con botas', '2021-01-22 21:17:12', '2021-01-22 21:17:58'),
(16, 'Clarice', '2021-01-22 21:40:19', '2021-01-22 21:40:19');

CREATE TABLE `design_product` (
  `Id` int(10) UNSIGNED NOT NULL,
  `design_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `design_product` (`Id`, `design_id`, `product_id`) VALUES
(1, 1, 1),
(2, 3, 2),
(3, 4, 3),
(4, 3, 4),
(5, 1, 12),
(6, 1, 13),
(7, 1, 14),
(8, 1, 15),
(9, 1, 16),
(10, 3, 17),
(11, 1, 18),
(12, 3, 19),
(13, 1, 20),
(14, 1, 21),
(15, 1, 22),
(16, 1, 23),
(17, 1, 24),
(18, 1, 25),
(19, 1, 26),
(20, 1, 27),
(21, 1, 28),
(22, 1, 29),
(23, 1, 30),
(24, 10, 31),
(25, 3, 32),
(26, 16, 33),
(27, 6, 34),
(28, 12, 35),
(29, 3, 36),
(30, 11, 37),
(31, 10, 38),
(32, 10, 39),
(33, 9, 40),
(34, 4, 41),
(35, 16, 42),
(36, 2, 43);

CREATE TABLE `genres` (
  `Id` int(111) UNSIGNED NOT NULL,
  `genre` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `genres` (`Id`, `genre`, `created_at`, `updated_at`) VALUES
(1, 'niño\r\n', '2021-01-14 02:05:45', '2021-01-14 02:06:01'),
(2, 'mujer\r\n', '2021-01-14 02:05:45', '2021-01-14 02:06:01'),
(3, 'hombre\r\n', '2021-01-14 02:05:45', '2021-01-14 02:06:01');

CREATE TABLE `genre_product` (
  `Id` int(10) UNSIGNED NOT NULL,
  `genre_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `genre_product` (`Id`, `genre_id`, `product_id`) VALUES
(1, 1, 5);

CREATE TABLE `products` (
  `Id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `description` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `subcategory_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `products` (`Id`, `name`, `price`, `description`, `image`, `subcategory_id`, `created_at`, `updated_at`) VALUES
(32, 'Remera', '1200', 'Remera de algodón con impresión', 'avatar-1611351723414.jpg', 1, '2021-01-22 21:42:03', '2021-01-22 21:50:17'),
(33, 'Barbijo', '300', 'Barbijo de algodón con impresión', 'avatar-1611351785623.jpg', 2, '2021-01-22 21:43:05', '2021-01-22 21:43:05'),
(34, 'Gorra', '1500', 'Gorra con diseño a elección', 'avatar-1611351903712.jpg', 3, '2021-01-22 21:45:03', '2021-01-22 21:45:03'),
(35, 'Taza', '800', 'Taza de ceramica impresa', 'avatar-1611351958692.jpg', 4, '2021-01-22 21:45:58', '2021-01-22 21:45:58'),
(36, 'Termo', '1400', 'Termo conservador con impresión', 'avatar-1611352019210.jpg', 5, '2021-01-22 21:46:59', '2021-01-22 21:46:59'),
(37, 'Botella ', '1250', 'Botella con diseño a elección', 'avatar-1611352092913.jpg', 6, '2021-01-22 21:48:12', '2021-01-22 21:48:12'),
(38, 'Bolso', '1200', 'Bolso de mano con estampa', 'avatar-1611352149572.jpg', 7, '2021-01-22 21:49:09', '2021-01-22 21:49:09'),
(39, 'Remera', '1200', 'Remera de algodón con impresión', 'avatar-1611352258829.jpg', 1, '2021-01-22 21:50:58', '2021-01-22 21:50:58'),
(40, 'Gorra', '1500', 'Gorra con diseño a elección', 'avatar-1611352328967.jpg', 3, '2021-01-22 21:52:09', '2021-01-22 21:52:09'),
(41, 'Remera', '1200', 'Remera de algodón con impresion', 'avatar-1611352398207.jpg', 1, '2021-01-22 21:53:18', '2021-01-22 21:53:18'),
(42, 'Bolso', '1200', 'Bolso de mano con estampa', 'avatar-1611352492937.jpg', 7, '2021-01-22 21:54:52', '2021-01-22 21:54:52'),
(43, 'Taza', '800', 'Taza de cerámica impresa', 'avatar-1611352548148.jpg', 4, '2021-01-22 21:55:48', '2021-01-22 21:55:48');

CREATE TABLE `product_size` (
  `Id` int(10) UNSIGNED NOT NULL,
  `size_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `product_size` (`Id`, `size_id`, `product_id`) VALUES
(1, 3, 1),
(2, 2, 2),
(3, 1, 3),
(4, 4, 4),
(5, 1, 12),
(6, 1, 13),
(7, 1, 14),
(8, 1, 15),
(9, 1, 16),
(10, 3, 17),
(11, 1, 18),
(12, 3, 19),
(13, 1, 20),
(14, 4, 21),
(15, 1, 22),
(16, 1, 23),
(17, 1, 24),
(18, 1, 25),
(19, 1, 26),
(20, 1, 27),
(21, 1, 28),
(22, 1, 29),
(23, 1, 30);

CREATE TABLE `sizes` (
  `Id` int(100) UNSIGNED NOT NULL,
  `size` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `sizes` (`Id`, `size`, `created_at`, `updated_at`) VALUES
(1, 'S', '2021-01-14 13:21:31', '2021-01-14 13:21:31'),
(2, 'X', '2021-01-14 13:21:31', '2021-01-14 13:21:31'),
(3, 'L', '2021-01-14 13:21:53', '2021-01-14 13:21:53'),
(4, 'XL', '2021-01-14 13:21:53', '2021-01-14 13:21:53'),
(5, 'Sin talle', '2021-01-22 17:26:31', '2021-01-22 17:26:31');

CREATE TABLE `subcategories` (
  `Id` int(10) UNSIGNED NOT NULL,
  `subcategory` varchar(255) NOT NULL,
  `category_id` int(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `subcategories` (`Id`, `subcategory`, `category_id`, `created_at`, `updated_at`) VALUES
(1, 'Remera\r\n', 1, '2021-01-14 02:07:36', '2021-01-22 21:12:38'),
(2, 'Barbijo\r\n', 1, '2021-01-14 02:07:36', '2021-01-22 21:12:50'),
(3, 'Gorra\r\n', 1, '2021-01-14 02:07:36', '2021-01-22 21:12:57'),
(4, 'Taza\r\n', 2, '2021-01-14 02:07:36', '2021-01-22 21:13:05'),
(5, 'Termo\r\n', 2, '2021-01-14 02:07:36', '2021-01-22 21:13:14'),
(6, 'Botella\r\n', 2, '2021-01-14 02:07:36', '2021-01-22 21:13:21'),
(7, 'Bolso \r\n', 3, '2021-01-14 02:07:36', '2021-01-22 21:13:31'),
(8, 'Cartuchera\r\n', 3, '2021-01-14 02:07:36', '2021-01-22 21:13:39'),
(9, 'Mochila\r\n', 3, '2021-01-14 02:07:36', '2021-01-22 21:13:48');

CREATE TABLE `users` (
  `Id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `type` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


ALTER TABLE `carts`
  ADD PRIMARY KEY (`Id`);

ALTER TABLE `cart_product`
  ADD PRIMARY KEY (`Id`);

ALTER TABLE `categories`
  ADD PRIMARY KEY (`Id`);

ALTER TABLE `designs`
  ADD PRIMARY KEY (`Id`);

ALTER TABLE `design_product`
  ADD PRIMARY KEY (`Id`);

ALTER TABLE `genres`
  ADD PRIMARY KEY (`Id`);

ALTER TABLE `genre_product`
  ADD PRIMARY KEY (`Id`);

ALTER TABLE `products`
  ADD PRIMARY KEY (`Id`);

ALTER TABLE `product_size`
  ADD PRIMARY KEY (`Id`);

ALTER TABLE `sizes`
  ADD PRIMARY KEY (`Id`);

ALTER TABLE `subcategories`
  ADD PRIMARY KEY (`Id`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`Id`);


ALTER TABLE `carts`
  MODIFY `Id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

ALTER TABLE `cart_product`
  MODIFY `Id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

ALTER TABLE `categories`
  MODIFY `Id` int(100) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

ALTER TABLE `designs`
  MODIFY `Id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

ALTER TABLE `design_product`
  MODIFY `Id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

ALTER TABLE `genres`
  MODIFY `Id` int(111) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

ALTER TABLE `genre_product`
  MODIFY `Id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

ALTER TABLE `products`
  MODIFY `Id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

ALTER TABLE `product_size`
  MODIFY `Id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

ALTER TABLE `sizes`
  MODIFY `Id` int(100) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

ALTER TABLE `subcategories`
  MODIFY `Id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

ALTER TABLE `users`
  MODIFY `Id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
