Dota2资料库智能管理平台
====
## 1.引入
随着社会的高速发展，互联网行业不断发展，尤其是游戏产业的快速发展，
越来越多的人开始接触游戏，游戏产业进入了高并发、大数据和数据共享
时代。当今时代，游戏运营是游戏厂商所要应对的问题，并且玩家对游戏
信息获取的需求日渐提高。因此一个科学的游戏管理平台可以改善开发者
Dota2资料库管理平台操作简单，玩家根据自己的需求一些获取关于Dota2的信息。
和运营者对数据的管理，本系统是基于SpringBoot的SSM开发，该框架是目前风
其中Spring是一个轻量级的Java开发框架。前端使用jQuery、ExtJs等框架，
靡的一种Web应用程序开源框架，数据访问层使用MyBatis，采用MVC设计模式。

本地部署需要sencha环境和Java环境
application-dev.properties和application-prod.properties涉及配置信息需要自己提供
sql文件可以在该容器中找到
[部署到服务器的方法](https://www.cnblogs.com/Java-Starter/p/7607215.html)  

## 2.开发工具及相关技术介绍
### 2.1 开发技术
#### 2.1.1 SpringBoot
多年以来，SpringIO平台饱受争议的一点就是大量的XML配置以及复杂的依赖管理。SpringBoot的目标之一就是实现免XML的开发体验。
Boot所实现的功能超出了这个任务的描述，开发人员不仅不再需要编写XML，而且在一些 场景中甚至不需要再编写繁琐的import语句。
#### 2.1.2 SpringMVC
MVC是一个以设计界面应用程序为基础的设计模式。它主要利用分离模型、视图及控制器在应用程序中所扮演的角色将业务逻辑从界面中分离。
通常，模型负责封装应用程序，数据在视图层展示。视图仅仅展示这些数据，不包含任何业务逻辑。控制器担任接收用户的各种请求的责任，
并调用后台服务（service和dao）来处理业务逻辑。经过处理，后台业务逻辑层返回数据在视图层展现，控制器搜集这些数据及模型在视图层展示。
MVC模式的核心思想是将业务逻辑从界面中分离出来，允许它们单独改变而不会相互影响
#### 2.1.3 ExtJS
ExtJs源于YUI，最先由Jack Slocun开发，采用OOP设计思想建立类库与后台语言无关的JavaScript框架，它将OOP思想发挥得淋漓尽致，
然而ExtJs不仅仅是个JavaScript框架，它可以独立于其他JavaScript框架通过Adapter（适配器）。对于后台程序员来说，
不用深知前端网页开发技术，就可以快速开发出类似桌面应用的用户体验很高的界面。一方面减少了与美工的交流，自己来开发客户端界面，
另一方面，页面交互能力强，能够很好地实现后台功能。
Ajax作为Web2.0的核心技术之一，带来了Web用户体验革命性的转变。ExtJs作为Ajax的客户端UI框架，很大程度上减少了系统开发成本
，同时又保证了系统的美化以及页面响应速度。 利用 Ajax+ExtJS 组合，有效地避开了传统 B/S 结构用户体验差的特点， 
又具有了 C/S 结构的强交互能力，同时还具有很好的可移植性和可维护性
### 2.2 开发工具
#### 2.2.1 IntelliJ IDEA
本系统使用Intellij IDEA开发工具，数据库使用可视化编辑工具Navicat for MySQL，组合完成了一套完整的资料库管理系统，
IDEA是Java语言开发的集成环境，IntelliJ在业界被公认为最好的Java开发工具之一
#### 2.2.2 Visual Studio Code
本系统前端使用Visual Studio Code开发工具，用来编写Html，CSS，jQuery。Visual Studio Code是一个运行于 Mac OS X、Windows和 Linux 之上的，
针对于编写现代 Web 和云应用的跨平台源代码编辑器

## 3.概要设计
### 3.1 系统总体结构设计
#### 3.1.1 总体结构设计功能
Dota2资料库管理平台设计包含了玩家模块和运营人模块，可以对游戏信息进行检索处理，极大提高了游戏的版本迭代效率和游戏可玩性，
Dota2资料库管理平台总体结构设计功能图如图所示。<br>
![Image text](https://github.com/cjy513203427/Dota2_Databank/blob/master/resource/%E5%9B%BE4-4%20Dota2%E8%B5%84%E6%96%99%E5%BA%93%E7%AE%A1%E7%90%86%E5%B9%B3%E5%8F%B0%E6%80%BB%E4%BD%93%E7%BB%93%E6%9E%84%E8%AE%BE%E8%AE%A1%E5%8A%9F%E8%83%BD%E5%9B%BE.jpg)
#### 3.1.2 系统E-R图
E-R图也称实体-联系图，提供了表示属性、实体类型和联系的方法，用来描述真实世界的概念模型。
Dota2资料库管理平台的E-R图如图所示。
### 3.2数据库表设计
用户表CT_USER如下表所示，CT_USER表是存储了用户信息的数据字典，用户进行注册时，用户信息会加入到此表中。
![Image text](https://github.com/cjy513203427/Dota2_Databank/blob/master/resource/%E5%9B%BE4-5%20Dota2%E8%B5%84%E6%96%99%E5%BA%93%E7%AE%A1%E7%90%86%E5%B9%B3%E5%8F%B0%E7%9A%84E-R%E5%9B%BE.jpg)
#### 用户表
| 字段名 | 数据类型 | 允许非空 |默认值|备注|
| ------------- |:-------------:| -----:|  -----:| -----:| 
| ID |INT | NO | |用户id|
| USERNAME |VARCHAR | NO | |用户名|
| REALNAME |VARCHAR | YES |NULL |真实姓名|
| PASSWORD |VARCHAR | NO | |密码|
| SEX |TINYINT | YES | |性别|
| PHONE |VARCHAR | NO | |手机号|
| STATUS |TINYINT | NO | |状态，0禁用1正常|
| UPDATE_TIME |TIMESTAMP | NO | CURRENT_TIMESTAMP|修改时间|
| CREATE_TIME |DATETIME | NO | '0000-00-00 00:00:00'|创建时间|
#### 角色表
| 字段名 | 数据类型 | 允许非空 |默认值|备注|
|:-------------:|:-------------:|:-----:|:-----:|:-----:| 
| ID |INT | NO | |角色id|
| NAME |VARCHAR | NO | |角色名|
| DESCRIPTION |VARCHAR | YES |NULL |描述|
| STATUS |TINYINT | NO | |状态|
| UPDATE_TIME |TIMESTAMP | NO | CURRENT_TIMESTAMP|修改时间|
| CREATE_TIME |DATETIME | NO | '0000-00-00 00:00:00'|创建时间|
#### 权限表
| 字段名 | 数据类型 | 允许非空 |默认值|备注|
|:-------------:|:-------------:|:-----:|:-----:|:-----:| 
| ID |INT | NO | |权限id|
| NAME |VARCHAR | NO | |权限名称|
| TYPE |VARCHAR | YES |NULL |权限类型|
| ICON |VARCHAR | NO | |权限图标|
| PARENT_ID |INT | NO | |父类id|
| PERMISSION |VARCHAR | NO | |权限地址|
| URL |VARCHAR | NO | |图片路径|
| STATUS |TINYINT | NO | |状态0禁用1启用|
| UPDATE_TIME |TIMESTAMP | NO | CURRENT_TIMESTAMP|修改时间|
| CREATE_TIME |DATETIME | NO | '0000-00-00 00:00:00'|创建时间|
#### 英雄表
| 字段名 | 数据类型 | 允许非空 |默认值|备注|
|:-------------:|:-------------:|:-----:|:-----:|:-----:| 
| ID |INT | NO | |英雄id|
| NAME |VARCHAR | NO | |英雄名称|
| LOCALIZED_NAME |VARCHAR | YES |NULL |英雄英文名|
| HEADPORTRAIT_PATH |VARCHAR | NO | |英雄头像路径|
| HERO_PATH |VARCHAR | NO | |英雄图片路径|
#### 物品表
| 字段名 | 数据类型 | 允许非空 |默认值|备注|
|:-------------:|:-------------:|:-----:|:-----:|:-----:| 
| ID |INT | NO | |物品id|
| NAME |VARCHAR | NO | |物品名称|
| COST |INT | YES |NULL |物品花费|
| SECRET_SHOP |TINYINT | NO | |是否神秘商店购买0否1是|
| SIDE_SHOP |TINYINT | NO | |是否路边商店购买0否1是|
| RECEIPE |TINYINT | NO | |是否卷轴0否1是|
| UPGRATED_ITEM |TINYINT | NO | |是否更新物品|
| ITEM_PATH |VARCHAR | YES |NULL |物品图片路径|
| LOCALIZED_NAME |VARCHAR | YES | |英文名|
| CHINESE_NAME |VARCHAR | YES | |中文名|
#### 天赋表
| 字段名 | 数据类型 | 允许非空 |默认值|备注|
|:-------------:|:-------------:|:-----:|:-----:|:-----:| 
| ID |INT | NO | |天赋id|
| TEXT |VARCHAR | NO | |天赋名称|
| HERO_ID |INT | NO |NULL |英雄id|
| GRADE |TINYINT | NO | |天赋所需等级|
| TYPE |TINYINT | NO | |天赋类型，左分支类型1，右分支类型2|
| IS_DELETE |TINYINT | NO | |删除0否1是|
## 4 系统详细设计
### 4.1 系统登录模块
系统登录模块实现了登录注册功能，注册需要用户名和密码，真实姓名、性别等其他信息选填，一个用户名只能注册一次。用户登录需要用户名和密码，连续输入用户名密码错误五次十分钟内不允许登录系统。登录界面如图所示。<Br/>
![Image text](https://github.com/cjy513203427/Dota2_Databank/blob/master/resource/%E5%9B%BE%205-1%20Dota2%E8%B5%84%E6%96%99%E5%BA%93%E7%AE%A1%E7%90%86%E5%B9%B3%E5%8F%B0%E5%B9%B3%E5%8F%B0%E7%99%BB%E9%99%86%E9%A6%96%E9%A1%B5%E5%9B%BE.png)
<Br/>Dota2资料库管理平台界面如图所示<Br/>
![Image text](https://github.com/cjy513203427/Dota2_Databank/blob/master/resource/%E5%9B%BE5-2%20Doat2%E8%B5%84%E6%96%99%E5%BA%93%E7%99%BB%E5%BD%95%E7%95%8C%E9%9D%A2%E5%9B%BE.png)
![Image text](https://github.com/cjy513203427/Dota2_Databank/blob/master/resource/%E5%9B%BE5-3%20Dota2%E8%B5%84%E6%96%99%E5%BA%93%E7%99%BB%E5%BD%95%E7%95%8C%E9%9D%A2%E5%9B%BE.png)
### 4.2 用户操作模块
玩家登录平台后，玩家可以查询英雄、物品、天赋信息，还可以对物品合成模拟和对天赋加点模拟。查看英雄信息如图所示<Br/>
![Image text](https://github.com/cjy513203427/Dota2_Databank/blob/master/resource/%E5%9B%BE5-4%E6%9F%A5%E7%9C%8B%E8%8B%B1%E9%9B%84%E4%BF%A1%E6%81%AF.png)
<Br/>查看物品信息如图所示 <Br/>
![Image text](https://github.com/cjy513203427/Dota2_Databank/blob/master/resource/%E5%9B%BE5-5%E6%9F%A5%E7%9C%8B%E7%89%A9%E5%93%81%E4%BF%A1%E6%81%AF.png)
<Br/>查看天赋信息如图所示<Br/>
![Image text](https://github.com/cjy513203427/Dota2_Databank/blob/master/resource/%E5%9B%BE5-6%20%E6%9F%A5%E7%9C%8B%E5%A4%A9%E8%B5%8B%E4%BF%A1%E6%81%AF.png)
<Br/>物品模拟如图所示<Br/>
![Image text](https://github.com/cjy513203427/Dota2_Databank/blob/master/resource/%E5%9B%BE5-7%20%E6%9F%A5%E7%9C%8B%E8%A3%85%E5%A4%87%E5%90%88%E6%88%90%E4%BF%A1%E6%81%AF.png)
<Br/>天赋模拟如图所示，点击左侧的英雄图像，在右侧会显示出天赋模拟的信息。<Br/>
![Image text](https://github.com/cjy513203427/Dota2_Databank/blob/master/resource/%E5%9B%BE5-8%E5%A4%A9%E8%B5%8B%E6%A8%A1%E6%8B%9F%E7%95%8C%E9%9D%A2.png)
<Br/>战绩信息如图所示，输入SteamId，就可以查询该SteamId的比赛信息，双击比赛信息，会弹出一个记载着比赛详细信息的窗口。<Br/>
![Image text](https://github.com/cjy513203427/Dota2_Databank/blob/master/resource/%E5%9B%BE5-9%E6%88%98%E7%BB%A9%E4%BF%A1%E6%81%AF%E6%A8%A1%E5%9D%97.png)
### 4.3 管理员操作模块
游戏运营人登录平台之后，可以对用户、角色、权限、英雄、天赋、物品进行增加、删除、修改、查询操作。用户的修改如图5-10所示，进入用户管理，点击该行右侧的修改图标，会弹出来用户修改表单，输入信息即可修改。<Br/>
![Image text](https://github.com/cjy513203427/Dota2_Databank/blob/master/resource/%E5%9B%BE5-10%E7%94%A8%E6%88%B7%E4%BF%AE%E6%94%B9%E8%A1%A8%E5%8D%95.png)
<Br/>角色的分配如图5-11所示，进入用户管理，点击该行右侧的编辑图标，弹出来权限分配表单，下拉选择要分配的权限即可分配。<Br/>
![Image text](https://github.com/cjy513203427/Dota2_Databank/blob/master/resource/%E5%9B%BE5-12%E6%9D%83%E9%99%90%E5%88%86%E9%85%8D.png)
