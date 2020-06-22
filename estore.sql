-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 21, 2020 at 06:05 PM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `estore`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(10) NOT NULL,
  `aemail` varchar(50) NOT NULL,
  `phoneno` varchar(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `photo` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `aemail`, `phoneno`, `name`, `password`, `photo`) VALUES
(1, 'ajha57775@gmail.com', '8420316525', 'aman jha', 'aman', 'amandp.png');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `rqid` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `pid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`rqid`, `uid`, `pid`) VALUES
(40, 25, 30),
(41, 25, 27),
(65, 35, 33),
(66, 35, 34);

-- --------------------------------------------------------

--
-- Table structure for table `myorder`
--

CREATE TABLE `myorder` (
  `oid` varchar(50) NOT NULL,
  `uid` int(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `mobileno` varchar(50) NOT NULL,
  `address` varchar(50) NOT NULL,
  `date` varchar(50) NOT NULL,
  `price` varchar(50) NOT NULL,
  `pid` int(50) NOT NULL,
  `pname` varchar(50) NOT NULL,
  `transaction` varchar(50) NOT NULL DEFAULT 'faliure',
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `myorder`
--

INSERT INTO `myorder` (`oid`, `uid`, `name`, `mobileno`, `address`, `date`, `price`, `pid`, `pname`, `transaction`, `id`) VALUES
('ORD25', 30, 'arat', '8420316525', '53/3/1 J.N MUKHERJEE ROAD', '2020/5/22 22:10:55', '890', 34, 'edited', 'sucess', 6),
('ORD515', 1, 'aman', '8420316525', '53/3/1 J.N MUKHERJEE ROAD', '2020/5/23 6:44:56', '898', 27, 'new89', 'faliure', 8),
('ORD559', 25, 'new', '9898898998', 'kuviuuiuiifffi', '2020/5/23 7:59:11', '898', 27, 'new89', 'faliure', 14),
('ORD118', 25, 'new', '9898898998', 'kuviuuiuiifffi', '2020/5/23 7:59:22', '789', 30, 'aman', 'sucess', 15),
('ORD276', 1, 'aman', '8420316525', '53/3/1 J.N MUKHERJEE ROAD', '2020/5/23 11:2:43', '789', 30, 'aman', 'faliure', 17),
('ORD406', 1, 'aman', '8420316525', '53/3/1 J.N MUKHERJEE ROAD', '2020/5/23 11:4:41', '678', 33, 'new8', 'sucess', 18),
('ORD406', 1, 'aman', '8420316525', '53/3/1 J.N MUKHERJEE ROAD', '2020/5/23 11:4:41', '457', 12, 'new2 product7', 'sucess', 19),
('ORD722', 1, 'aman jha 31', '8420316525', '53/3/1 J.N MUKHERJEE ROAD', '2020/5/24 7:59:53', '898', 27, 'new89', 'faliure', 38),
('ORD957', 1, 'aman jha 31', '8420316525', '53/3/1 J.N MUKHERJEE ROAD', '2020/5/24 8:11:56', '898', 27, 'new89', 'faliure', 39),
('ORD275', 1, 'aman jha 31', '8420316525', '53/3/1 J.N MUKHERJEE ROAD', '2020/5/24 8:17:8', '898', 27, 'new89', 'sucess', 40),
('ORD825', 30, 'arat', '8420316525', '53/3/1 J.N MUKHERJEE ROAD', '2020/5/24 8:31:37', '890', 34, 'edited', 'faliure', 41),
('ORD825', 30, 'arat', '8420316525', '53/3/1 J.N MUKHERJEE ROAD', '2020/5/24 8:31:37', '457', 12, 'new2 product7', 'faliure', 42),
('ORD414', 30, 'arat', '8420316525', '53/3/1 J.N MUKHERJEE ROAD', '2020/5/24 8:32:5', '890', 34, 'edited', 'sucess', 43),
('ORD414', 30, 'arat', '8420316525', '53/3/1 J.N MUKHERJEE ROAD', '2020/5/24 8:32:5', '457', 12, 'new2 product7', 'sucess', 44),
('ORD426', 35, 'aj31', '8420316525', '53/3/1 J.N MUKHERJEE ROAD', '2020/5/24 8:57:51', '898', 27, 'new89', 'faliure', 45),
('ORD620', 35, 'aj31', '8420316525', '53/3/1 J.N MUKHERJEE ROAD', '2020/5/24 8:58:19', '898', 27, 'new89', 'sucess', 46),
('ORD578', 35, 'aj31', '8420316525', '53/3/1 J.N MUKHERJEE ROAD', '2020/5/24 9:0:56', '678', 33, 'new8', 'faliure', 47),
('ORD578', 35, 'aj31', '8420316525', '53/3/1 J.N MUKHERJEE ROAD', '2020/5/24 9:0:56', '890', 34, 'edited', 'faliure', 48),
('ORD396', 36, 'anjani tiwari', '8420316525', '53/3/1 J.N MUKHERJEE ROAD', '2020/5/26 19:26:18', '789', 30, 'aman', 'faliure', 49),
('ORD396', 36, 'anjani tiwari', '8420316525', '53/3/1 J.N MUKHERJEE ROAD', '2020/5/26 19:26:18', '457', 12, 'new2 product7', 'faliure', 50),
('ORD561', 36, 'anjani tiwari', '8420316525', '53/3/1 J.N MUKHERJEE ROAD', '2020/5/26 19:26:59', '789', 30, 'aman', 'sucess', 51),
('ORD561', 36, 'anjani tiwari', '8420316525', '53/3/1 J.N MUKHERJEE ROAD', '2020/5/26 19:26:59', '457', 12, 'new2 product7', 'sucess', 52),
('ORD405', 37, 'komal', '8420316525', '53/3/1 J.N MUKHERJEE ROAD', '2020/6/3 21:44:10', '900', 37, 'latest', 'faliure', 53),
('ORD405', 37, 'komal', '8420316525', '53/3/1 J.N MUKHERJEE ROAD', '2020/6/3 21:44:10', '890', 34, 'edited', 'faliure', 54),
('ORD778', 37, 'komal', '8420316525', '53/3/1 J.N MUKHERJEE ROAD', '2020/6/3 21:44:41', '900', 37, 'latest', 'faliure', 55),
('ORD778', 37, 'komal', '8420316525', '53/3/1 J.N MUKHERJEE ROAD', '2020/6/3 21:44:41', '890', 34, 'edited', 'faliure', 56),
('ORD635', 37, 'komal', '8420316525', '53/3/1 J.N MUKHERJEE ROAD', '2020/6/3 21:49:17', '900', 37, 'latest', 'sucess', 57),
('ORD635', 37, 'komal', '8420316525', '53/3/1 J.N MUKHERJEE ROAD', '2020/6/3 21:49:17', '890', 34, 'edited', 'sucess', 58),
('ORD13', 1, 'aman jha 31', '8420316525', '53/3/1 J.N MUKHERJEE ROAD', '2020/6/4 9:46:22', '678', 33, 'new8', 'faliure', 59),
('ORD912', 1, 'aman jha 31', '8420316525', '53/3/1 J.N MUKHERJEE ROAD', '2020/6/21 7:48:38', '678', 33, 'new8', 'faliure', 60),
('ORD442', 1, 'aman jha 31', '8420316525', '53/3/1 J.N MUKHERJEE ROAD', '2020/6/21 7:53:40', '678', 33, 'new8', 'sucess', 61);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `pid` int(10) NOT NULL,
  `pname` varchar(50) NOT NULL,
  `category` varchar(50) NOT NULL,
  `pdetail` varchar(50) NOT NULL,
  `photo` varchar(50) NOT NULL,
  `price` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`pid`, `pname`, `category`, `pdetail`, `photo`, `price`) VALUES
(12, 'new2 product7', 'men', 'this is new2', '2018-05-25-12-26-36-076.jpg', 457),
(27, 'new89', 'men', 'new89', '2018-03-18-16-37-34-660.jpg', 898),
(30, 'aman', 'women', 'amanjha', '_20180824_221808.jpg', 789),
(32, 'new45', 'kids', 'duo', '2018-04-02-13-47-11-663.jpg', 876),
(33, 'new8', 'kids', 'new8', '2018-10-19-06-17-12-532.jpg', 678),
(34, 'edited', 'kids', 'ner45', '2017-11-22-20-49-50-265.jpg', 890),
(37, 'latest', 'women', 'latest model on internet', 'IMG_20180414_180756.jpg', 900),
(38, 'blue tshirt', 'kids', 'this is blue tshirt', 'IMG_20180320_082953.jpg', 890),
(40, 'bobby', 'women', 'dil ka saaf hai', '2018-02-09-14-18-52-092.jpg', 900),
(41, 'new product', 'men', 'blue shirt with details', '2018-02-09-15-11-24-356.jpg', 900);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `mobileno` varchar(50) NOT NULL,
  `address` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`, `mobileno`, `address`) VALUES
(1, 'aman jha 31', 'ajha57775@gmail.com', 'aman', '8420316525', '53/3/1 J.N MUKHERJEE ROAD'),
(25, 'new', 'new@51', 'aman', '9898898998', 'kuviuuiuiifffi'),
(30, 'arat', 'ajha3199@gmail.com', 'aman', '8420316525', '53/3/1 J.N MUKHERJEE ROAD'),
(35, 'aj31', 'new31@gmail.com', 'aman', '8420316525', '53/3/1 J.N MUKHERJEE ROAD'),
(36, 'anjani tiwari', 'anjani@gmail.com', 'aman', '8420316525', '53/3/1 J.N MUKHERJEE ROAD'),
(37, 'komal', 'komal@gmai.com', 'aman', '8420316525', '53/3/1 J.N MUKHERJEE ROAD');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`rqid`),
  ADD KEY `cart_ibfk_1` (`uid`),
  ADD KEY `pid` (`pid`);

--
-- Indexes for table `myorder`
--
ALTER TABLE `myorder`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pid` (`pid`),
  ADD KEY `uid` (`uid`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`pid`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `rqid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT for table `myorder`
--
ALTER TABLE `myorder`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `pid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`pid`) REFERENCES `product` (`pid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `myorder`
--
ALTER TABLE `myorder`
  ADD CONSTRAINT `myorder_ibfk_1` FOREIGN KEY (`pid`) REFERENCES `product` (`pid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `myorder_ibfk_2` FOREIGN KEY (`uid`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
