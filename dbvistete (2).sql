-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-01-2021 a las 14:28:58
-- Versión del servidor: 10.4.17-MariaDB
-- Versión de PHP: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `dbvistete`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carts`
--

CREATE TABLE `carts` (
  `Id` int(11) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `status` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cart_product`
--

CREATE TABLE `cart_product` (
  `Id` int(11) UNSIGNED NOT NULL,
  `cart_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `safeprice` decimal(10,0) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `Id` int(100) UNSIGNED NOT NULL,
  `category` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`Id`, `category`, `created_at`, `updated_at`) VALUES
(1, 'Indumentaria\r\n', '2021-01-14 02:04:05', '2021-01-14 02:04:24'),
(2, 'Merchandising\r\n', '2021-01-14 02:04:05', '2021-01-14 02:04:24'),
(3, 'Accesorios\r\n', '2021-01-14 02:04:05', '2021-01-14 02:04:24');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `designs`
--

CREATE TABLE `designs` (
  `Id` int(11) UNSIGNED NOT NULL,
  `design` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `designs`
--

INSERT INTO `designs` (`Id`, `design`, `created_at`, `updated_at`) VALUES
(1, 'Alicia', '2021-01-14 13:22:21', '2021-01-14 13:22:21'),
(2, 'Cortazar', '2021-01-14 13:22:21', '2021-01-14 13:22:21'),
(3, 'Principito', '2021-01-14 13:22:41', '2021-01-14 13:22:41'),
(4, 'Poe', '2021-01-14 13:22:41', '2021-01-14 13:22:41');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `design_product`
--

CREATE TABLE `design_product` (
  `Id` int(10) UNSIGNED NOT NULL,
  `design_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `design_product`
--

INSERT INTO `design_product` (`Id`, `design_id`, `product_id`) VALUES
(1, 1, 1),
(2, 3, 2),
(3, 4, 3),
(4, 3, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `genres`
--

CREATE TABLE `genres` (
  `Id` int(111) UNSIGNED NOT NULL,
  `genre` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `genres`
--

INSERT INTO `genres` (`Id`, `genre`, `created_at`, `updated_at`) VALUES
(1, 'niño\r\n', '2021-01-14 02:05:45', '2021-01-14 02:06:01'),
(2, 'mujer\r\n', '2021-01-14 02:05:45', '2021-01-14 02:06:01'),
(3, 'hombre\r\n', '2021-01-14 02:05:45', '2021-01-14 02:06:01');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `genre_product`
--

CREATE TABLE `genre_product` (
  `Id` int(10) UNSIGNED NOT NULL,
  `genre_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `genre_product`
--

INSERT INTO `genre_product` (`Id`, `genre_id`, `product_id`) VALUES
(1, 1, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `Id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `description` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `subcategory_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`Id`, `name`, `price`, `description`, `image`, `subcategory_id`, `created_at`, `updated_at`) VALUES
(1, 'remera', '1222', 'ddd', NULL, 1, '2021-01-14 01:59:35', '2021-01-14 02:00:08'),
(2, 'remera', '13000', 'roja', NULL, 0, '2021-01-14 01:59:35', '2021-01-14 02:00:08'),
(3, 'Laura', '122', '222', NULL, 0, '2021-01-14 01:59:35', '2021-01-14 02:00:08'),
(4, 'Laura', '1555', '222', NULL, 0, '2021-01-14 01:59:35', '2021-01-14 02:00:08'),
(5, 'Laura', '1555', '222', NULL, 0, '2021-01-14 01:59:35', '2021-01-14 02:00:08'),
(6, 'Laura', '1500', '1223', NULL, 0, '2021-01-14 01:59:35', '2021-01-14 02:00:08'),
(7, 'taza', '12000', 'sa', NULL, 0, '2021-01-14 01:59:35', '2021-01-14 02:00:08'),
(8, 'barbijo', '100', 'rojo', NULL, 2, '2021-01-14 01:59:35', '2021-01-14 02:00:08'),
(9, 'barbijo', '100', 'verde', NULL, 2, '2021-01-14 02:01:09', '2021-01-14 02:01:09'),
(10, 'florencia ', '3500', 'dd', NULL, 0, '2021-01-14 02:36:03', '2021-01-14 02:36:03'),
(11, 'remera', '3500', 'ddd', NULL, 0, '2021-01-14 02:37:01', '2021-01-14 02:37:01');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product_size`
--

CREATE TABLE `product_size` (
  `Id` int(10) UNSIGNED NOT NULL,
  `size_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `product_size`
--

INSERT INTO `product_size` (`Id`, `size_id`, `product_id`) VALUES
(1, 3, 1),
(2, 2, 2),
(3, 1, 3),
(4, 4, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sizes`
--

CREATE TABLE `sizes` (
  `Id` int(100) UNSIGNED NOT NULL,
  `size` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `sizes`
--

INSERT INTO `sizes` (`Id`, `size`, `created_at`, `updated_at`) VALUES
(1, 'S', '2021-01-14 13:21:31', '2021-01-14 13:21:31'),
(2, 'X', '2021-01-14 13:21:31', '2021-01-14 13:21:31'),
(3, 'L', '2021-01-14 13:21:53', '2021-01-14 13:21:53'),
(4, 'XL', '2021-01-14 13:21:53', '2021-01-14 13:21:53');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `subcategories`
--

CREATE TABLE `subcategories` (
  `Id` int(10) UNSIGNED NOT NULL,
  `subcategory` varchar(255) NOT NULL,
  `category_id` int(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `subcategories`
--

INSERT INTO `subcategories` (`Id`, `subcategory`, `category_id`, `created_at`, `updated_at`) VALUES
(1, 'remera\r\n', 1, '2021-01-14 02:07:36', '2021-01-14 02:07:52'),
(2, 'barbijo\r\n', 1, '2021-01-14 02:07:36', '2021-01-14 02:07:52'),
(3, 'gorra\r\n', 1, '2021-01-14 02:07:36', '2021-01-14 02:07:52'),
(4, 'taza\r\n', 2, '2021-01-14 02:07:36', '2021-01-14 02:07:52'),
(5, 'termo\r\n', 2, '2021-01-14 02:07:36', '2021-01-14 02:07:52'),
(6, 'botella\r\n', 2, '2021-01-14 02:07:36', '2021-01-14 02:07:52'),
(7, 'bolso \r\n', 3, '2021-01-14 02:07:36', '2021-01-14 02:07:52'),
(8, 'cartuchera\r\n', 3, '2021-01-14 02:07:36', '2021-01-14 02:07:52'),
(9, 'mochila\r\n', 3, '2021-01-14 02:07:36', '2021-01-14 02:07:52');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `Id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `type` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `cart_product`
--
ALTER TABLE `cart_product`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `designs`
--
ALTER TABLE `designs`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `design_product`
--
ALTER TABLE `design_product`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `genres`
--
ALTER TABLE `genres`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `genre_product`
--
ALTER TABLE `genre_product`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `product_size`
--
ALTER TABLE `product_size`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `sizes`
--
ALTER TABLE `sizes`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `subcategories`
--
ALTER TABLE `subcategories`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carts`
--
ALTER TABLE `carts`
  MODIFY `Id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cart_product`
--
ALTER TABLE `cart_product`
  MODIFY `Id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `Id` int(100) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `designs`
--
ALTER TABLE `designs`
  MODIFY `Id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `design_product`
--
ALTER TABLE `design_product`
  MODIFY `Id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `genres`
--
ALTER TABLE `genres`
  MODIFY `Id` int(111) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `genre_product`
--
ALTER TABLE `genre_product`
  MODIFY `Id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `Id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `product_size`
--
ALTER TABLE `product_size`
  MODIFY `Id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `sizes`
--
ALTER TABLE `sizes`
  MODIFY `Id` int(100) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `subcategories`
--
ALTER TABLE `subcategories`
  MODIFY `Id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `Id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
