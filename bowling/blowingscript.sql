USE [master]
GO
/****** Object:  Database [Bowling]    Script Date: 02/19/2017 22:28:17 ******/
CREATE DATABASE [Bowling]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Bowling', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL11.MSSQLSERVER\MSSQL\DATA\Bowling.mdf' , SIZE = 5120KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'Bowling_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL11.MSSQLSERVER\MSSQL\DATA\Bowling_log.ldf' , SIZE = 2048KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [Bowling] SET COMPATIBILITY_LEVEL = 110
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Bowling].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Bowling] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Bowling] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Bowling] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Bowling] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Bowling] SET ARITHABORT OFF 
GO
ALTER DATABASE [Bowling] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [Bowling] SET AUTO_CREATE_STATISTICS ON 
GO
ALTER DATABASE [Bowling] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Bowling] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Bowling] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Bowling] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [Bowling] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Bowling] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Bowling] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Bowling] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Bowling] SET  DISABLE_BROKER 
GO
ALTER DATABASE [Bowling] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Bowling] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Bowling] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Bowling] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Bowling] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Bowling] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [Bowling] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Bowling] SET RECOVERY FULL 
GO
ALTER DATABASE [Bowling] SET  MULTI_USER 
GO
ALTER DATABASE [Bowling] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [Bowling] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Bowling] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Bowling] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
EXEC sys.sp_db_vardecimal_storage_format N'Bowling', N'ON'
GO
USE [Bowling]
GO
/****** Object:  Table [dbo].[Score]    Script Date: 02/19/2017 22:28:17 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Score](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](100) NULL,
	[Score] [int] NULL,
	[ScoreDetails] [varchar](max) NULL,
 CONSTRAINT [PK_Score] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
USE [master]
GO
ALTER DATABASE [Bowling] SET  READ_WRITE 
GO
