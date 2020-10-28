using Microsoft.EntityFrameworkCore.Migrations;

namespace VideoCourseAPI.Migrations
{
    public partial class SeedCourses : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Course",
                columns: new[] { "Title", "Duration", "Description", "TopRated", "CreationDate" },
                values: new object[]
                {
                    "E-Teaching Mentoring Program", 1300,
                    "Mentoring is delivered as one-on-one meetings between the Mentor and the Mentee, focused on achieving mentoring goals agreed at the kick- off meeting.",
                    false, "2019-02-28"
                });

            migrationBuilder.InsertData(
                table: "Course",
                columns: new[] { "Title", "Duration", "Description", "TopRated", "CreationDate" },
                values: new object[]
                {
                    "eKids Program - Registration for kids", 750,
                    "eKids program is a 12-weeks coding curriculum centered around the Scratch programming language. For advanced level groups (children 12+) we offer more complex languages: Python, JavaScript, Java, HTML, Unity. eKids help children to get practical knowledge of the programmer’s work, develop creative and engineer thinking.",
                    true, "2017-12-01"
                });

            migrationBuilder.InsertData(
                table: "Course",
                columns: new[] { "Title", "Duration", "Description", "TopRated", "CreationDate" },
                values: new object[]
                {
                    "Basics of Online & Offline Presentation Excellence", 960,
                    "This session satisfies all the basic needs of a presenter and a junior public speaker. The participants will study the core components of effective preparation and confident delivery in online and offline environment. Apart from studying different techniques, each participant will have the opportunity to practice and to receive a valuable feedback.",
                    false, "2020-06-18"
                });

            migrationBuilder.InsertData(
                table: "Course",
                columns: new[] { "Title", "Duration", "Description", "TopRated", "CreationDate" },
                values: new object[]
                {
                    "TypeScript In-Depth", 50,
                    "This training begins with TypeScript basics such as the new syntax for variable declarations and moves through all of the major features of the language including arrow functions, interfaces, classes, modules, namespaces, generics.",
                    false, "2025-04-01"
                });

            migrationBuilder.InsertData(
                table: "Course",
                columns: new[] { "Title", "Duration", "Description", "TopRated", "CreationDate" },
                values: new object[]
                {
                    "Switch JS", 1440,
                    "A Program is aimed to help everyone in learning Javascript. During a limited period of time, we will provide support in learning JS, HTML, CSS, Typescript, passing interviews, etc. Program topics and duration are individual for each participant depends on his goals and initial JS level, which makes the educational process more efficient.",
                    true, "2019-09-11"
                });

            migrationBuilder.InsertData(
                table: "Course",
                columns: new[] { "Title", "Duration", "Description", "TopRated", "CreationDate" },
                values: new object[]
                {
                    "Enterprise Architecture Overview", 1500,
                    "This course is aimed at all EA practitioners and anyone who wants to understand what Enterprise Architecture is, why it is necessary and how it can be used within client interaction providing Enterprise Architecture Consulting and Practice services to our clients.",
                    false, "2020-02-01"
                });

            migrationBuilder.InsertData(
                table: "Course",
                columns: new[] { "Title", "Duration", "Description", "TopRated", "CreationDate" },
                values: new object[]
                {
                    "GCP Certification: Professional Cloud DevOps Engineer", 2000,
                    "A Professional Cloud DevOps Engineer is responsible for efficient development operations that can balance service reliability and delivery speed. They are skilled at using Google Cloud Platform to build software delivery pipelines, deploy and monitor services, and manage and learn from incidents.",
                    false, "2019-08-20"
                });

            migrationBuilder.InsertData(
                table: "Course",
                columns: new[] { "Title", "Duration", "Description", "TopRated", "CreationDate" },
                values: new object[]
                {
                    "Solution Architecture University", 1000,
                    "CTOO Solution Architecture University (SAU) is 4-months continuous educational program for Solution Architects that helps to get certification / pass trainings of the worldwide leaders in architecture learning (external vendors).  SAU consists of 5 courses depending on SA level. Each course has recommended certifications/trainings.",
                    false, "2018-05-13"
                });

            migrationBuilder.InsertData(
                table: "Course",
                columns: new[] { "Title", "Duration", "Description", "TopRated", "CreationDate" },
                values: new object[]
                {
                    "Flutter Global Mentoring Program", 650,
                    "Welcome to The Flutter Global Mentoring Program. Flutter is the new Cross-platform mobile-development framework created by Google, which allows developers to build Android and iOS Apps (and not only). So, let us dive deep into it together!",
                    false, "2017-09-11"
                });

            migrationBuilder.InsertData(
                table: "Course",
                columns: new[] { "Title", "Duration", "Description", "TopRated", "CreationDate" },
                values: new object[]
                {
                    "DM Essentials", 800,
                    "The program is for Lead Specialists and Managers who want to boost their skills and obtain practical knowledge in Delivery Management as a whole or in particular areas.",
                    false, "2020-04-01"
                });

            migrationBuilder.InsertData(
                table: "Course",
                columns: new[] { "Title", "Duration", "Description", "TopRated", "CreationDate" },
                values: new object[]
                {
                    "Sitecore Global Mentoring Program", 2500,
                    "This program is a combination of eLearning courses from Sitecore partner Learning platform verified by Competency Center and fulfilled with practical tasks, developed by program managers.",
                    false, "2015-11-12"
                });

            migrationBuilder.InsertData(
                table: "Course",
                columns: new[] { "Title", "Duration", "Description", "TopRated", "CreationDate" },
                values: new object[]
                {
                    "Negotiation Practice", 500,
                    "This is series of practice-oriented events, designed to provide additional practice opportunities to those involved in communication with clients, team members, colleagues and stakeholders on a daily basis (Delivery Managers, Project Managers, Team Leaders, Business Analysts, and Solution Architects).",
                    false, "2020-02-15"
                });

            migrationBuilder.InsertData(
                table: "Course",
                columns: new[] { "Title", "Duration", "Description", "TopRated", "CreationDate" },
                values: new object[]
                {
                    "iOS Upper Intermediate", 5000,
                    "The program covers possible whitespaces and goes deeper into details of iOS development related negotiations (architecture, UX, security, etc). The goal is to develop iOS Engineers knowledge to fit the A3 level.",
                    false, "2018-12-05"
                });

            migrationBuilder.InsertData(
                table: "Course",
                columns: new[] { "Title", "Duration", "Description", "TopRated", "CreationDate" },
                values: new object[]
                {
                    "Emotional Intelligence", 1200,
                    "This course is important for understanding of the basic things about emotional intelligence and ways for increasing it. The workshop is based on practical approach and participants should be ready to work with their self-awareness, personal life resources, beliefs and limitations.",
                    false, "2020-05-16"
                });

            migrationBuilder.InsertData(
                table: "Course",
                columns: new[] { "Title", "Duration", "Description", "TopRated", "CreationDate" },
                values: new object[]
                {
                    "Business Correspondence", 1500,
                    "Our training describes: how to write a well-structured emails; how to start/to finish emails;  where to put the most important info; how to write the correct subject; how fast to reply to emails; CC/BCC functionality; how to choose the appropriate style for emails writing.",
                    false, "2020-07-07"
                });

            migrationBuilder.InsertData(
                table: "Course",
                columns: new[] { "Title", "Duration", "Description", "TopRated", "CreationDate" },
                values: new object[]
                {
                    "Efficient Meetings", 1000,
                    "The face to face course shows how to control and participate  effectively in a meeting by the use of the appropriate language and using the voice. During the four hours, participants will practice techniques of persuasion in order to feel more confident at meetings.",
                    false, "2020-01-05"
                });

            migrationBuilder.InsertData(
                table: "Course",
                columns: new[] { "Title", "Duration", "Description", "TopRated", "CreationDate" },
                values: new object[]
                {
                    "Work as a Team", 660,
                    "This training will help to work more constructively with team members. Participants will get to know how to allocate tasks efficiently within the team. And we`ll also learn how to give constructive feedback to colleagues.",
                    false, "2018-05-09"
                });

            migrationBuilder.InsertData(
                table: "Course",
                columns: new[] { "Title", "Duration", "Description", "TopRated", "CreationDate" },
                values: new object[]
                {
                    "Head to Head: Successful Negotiations with Customers", 900,
                    "The program is designed to help managers improve communication process with the customers.",
                    false, "2020-12-01"
                });

            migrationBuilder.InsertData(
                table: "Course",
                columns: new[] { "Title", "Duration", "Description", "TopRated", "CreationDate" },
                values: new object[]
                {
                    "Angular 2 Forms: Data Binding and Validation", 77,
                    "Building HTML forms for the web world is never as straightforward as expected. Collecting user input, and implementing dynamic form validation that automatically reacts to input, can be difficult without the right solution. When building client-side apps using Angular, you get a good amount of framework code out-of-the-box that makes working with forms a breeze. Angular allows you to easily handle dynamic form validation by taking advantage of two-way data-binding functionality.",
                    true, "2016-07-12"
                });

            migrationBuilder.InsertData(
                table: "Course",
                columns: new[] { "Title", "Duration", "Description", "TopRated", "CreationDate" },
                values: new object[]
                {
                    "Angular Essential Training", 210,
                    "Angular was designed by Google to address challenges programmers face building complex, single-page applications. This JavaScript platform provides a solid core of web functionality, letting you take care of the design and implementation details. In this course, Justin Schwartzenberger introduces you to the essentials of this \"superheroic\" platform, including powerful features such as two-way data binding, comprehensive routing, and dependency injection. Justin steps through the platform one feature at a time, focusing on the component-based architecture of Angular. Learn what Angular is and what it can do, as Justin builds a full-featured web app from start to finish. After mastering the essentials, you can tackle the other project-based courses in our library and create your own Angular app.",
                    true, "2019-06-13"
                });

            migrationBuilder.InsertData(
                table: "Course",
                columns: new[] { "Title", "Duration", "Description", "TopRated", "CreationDate" },
                values: new object[]
                {
                    "ASP.NET Core Identity: Authentication Management", 82,
                    "Authenticating users and authorizing their level of access are key components in any application. In this course, learn how to use ASP.NET Core Identity, as well as third-party providers, to authenticate your users. Instructor Ervis Trupja shows how to create a web application with Identity; configure lockout, password, and sign-in settings; and customize the Identity model and use Entity Framework to reflect these changes in your database. He also shows how to enable your users to sign in with their Facebook and GitHub accounts, as well as how to configure a cookie-based authentication system.",
                    false, "2019-04-23"
                });

            migrationBuilder.InsertData(
                table: "Course",
                columns: new[] { "Title", "Duration", "Description", "TopRated", "CreationDate" },
                values: new object[]
                {
                    "Angular Testing and Debugging", 76,
                    "Errors caused by missing dependencies, undefined variables, or poorly formatted data can cause your web application to stop working. In this course, Derek Peruo guides you through the process of analyzing Angular 2 error messages to help track down and eliminate errors. He also shares some tips and tricks for avoiding pitfalls during development and goes into writing custom error handlers to make it easier to work with errors as your application grows.",
                    false, "2018-10-30"
                });

            migrationBuilder.InsertData(
                table: "Course",
                columns: new[] { "Title", "Duration", "Description", "TopRated", "CreationDate" },
                values: new object[]
                {
                    "SQL Server Integration Services", 147,
                    "SQL Server Integration Services (SSIS) is one of the core add-on components to SQL Server. With SSIS, professionals can create automated workflows that streamline the process of consolidating data from a wide variety of sources. Through a process called ETL—extract, transform, and load—you can ingest and move data between systems such as other databases, flat data files, and even online repositories. In this course, Adam Wilbert helps you get up and running with SSIS. Adam shows how to work with different control flow tasks, data sources, connections, and transformations. Plus, see how to add variables to control package execution, run packages with T-SQL, and more.",
                    false, "2019-08-22"
                });

            migrationBuilder.InsertData(
                table: "Course",
                columns: new[] { "Title", "Duration", "Description", "TopRated", "CreationDate" },
                values: new object[]
                {
                    "Building Angular and Node Apps with Authentication", 250,
                    "Are you already familiar with Angular 2 and Node.js? If so, this course can help you leverage these two popular frameworks to build a full-stack web application—which you can later use as a template for your own web app. Join Alexander Zanfir as he shows how to create and configure an Angular 2 project, display data in Angular 2, get your data from Node.js, and save your data to Node.js. He also covers how to create a form in Angular, set up routes, validate with reactive forms, register users, and more.",
                    false, "2019-04-04"
                });

            migrationBuilder.InsertData(
                table: "Course",
                columns: new[] { "Title", "Duration", "Description", "TopRated", "CreationDate" },
                values: new object[]
                {
                    "Introduction to CSS", 118,
                    "Once you have learned the basics of HTML, it's time to start exploring Cascading Style Sheets (CSS), the language that makes HTML look great in the browser. This course gives you a tour of the possibilities, showing what CSS is capable of doing and the basics you need to make it work for you. Join Carrie Dils as she explains what CSS is and how it works with HTML, discusses authoring options, and covers common CSS concepts such as the CSS box model and how to work with fonts and color. Plus, she demonstrates how to structure a page with CSS, maintain CSS with version control, work with media queries, and more.",
                    false, "2017-06-08"
                });

            migrationBuilder.InsertData(
                table: "Course",
                columns: new[] { "Title", "Duration", "Description", "TopRated", "CreationDate" },
                values: new object[]
                {
                    "TypeScript for Node.js Developers", 62,
                    "As your development needs grow with your enterprise, you need better tools and syntax when working with Node.js. This is where using TypeScript with Node.js can be a perfect next step. TypeScript is a superset of JavaScript that offers optional static type checking, as well as support for the latest JavaScript features. In this course, Emmanuel Henri helps Node.js developers quickly get up to speed with TypeScript as he steps through how to best leverage this popular language in Node.js applications. To begin, he shows how to set up TypeScript and familiarizes you with its file conventions. He then discusses how to use types in Node.js, leverage TypeScript tools to organize your application, and use iterators and decorators. To wrap up, he shares resources that can help you further explore all that TypeScript has to offer.",
                    false, "2018-05-12"
                });

            migrationBuilder.InsertData(
                table: "Course",
                columns: new[] { "Title", "Duration", "Description", "TopRated", "CreationDate" },
                values: new object[]
                {
                    "Advanced ASP.NET Web API 2.2", 129,
                    "ASP.NET Web API 2.2—a framework for building web APIs on top of the .NET Framework—can be a great choice for developers looking to expose their data and services. In this advanced course, Ervis Trupja helps you take your knowledge of this popular framework to the next level. Ervis dives into the topic of dependency injection in Web API, explaining how to resolve dependencies with Unity. He also digs into cross-origin requests and demonstrates how to create a custom cross-origin resource sharing (CORS) policy. Plus, learn how to version APIs without breaking existing features, create custom message handlers, host a Web API app in an IIS server, tackle self-hosting and more.",
                    false, "2019-05-25"
                });

            migrationBuilder.InsertData(
                table: "Course",
                columns: new[] { "Title", "Duration", "Description", "TopRated", "CreationDate" },
                values: new object[]
                {
                    "Avoiding Burnout", 24,
                    "Prolonged periods of stress—related to your work, your home life, or your health—can lead to burnout. Burnout reduces our productivity and saps our energy, leaving us overwhelmed by everyday tasks and feeling increasingly cynical and resentful. In this course, Todd Dewett helps you recognize some of the most common causes of burnout, such as long hours, too much travel, tight deadlines, and no vacation, so that you can figure out how to prevent stress from building up. Plus, get tips for jump-starting your recovery and publicly owning your burnout experience.",
                    true, "2019-08-01"
                });

            migrationBuilder.InsertData(
                table: "Course",
                columns: new[] { "Title", "Duration", "Description", "TopRated", "CreationDate" },
                values: new object[]
                {
                    "Building and Securing RESTful APIs in ASP.NET Core", 265,
                    "Most people have heard of RESTful APIs, but the underlying concept—representational state transfer (REST)—still causes confusion. REST is all about modeling resources that change. RESTful APIs use REST architecture along with HTTP requests to transfer data and changes in application state between clients and servers. This course breaks down the principles of RESTful design and show how to build secure RESTful APIs on top of ASP.NET Core. Nate Barbettini answers questions such as: What is RESTful design? How do you perform RESTful routing? How can you build reusable classes to represent resources? What role does caching play? And how do you secure RESTful APIs? He also covers topics such as data modeling, hypermedia relationships, and authentication and authorization. By the end of the course, you should know the basics—how to properly request and return data in ASP.NET Core—and the best practices for building secure and scalable APIs to serve web clients, mobile clients, and beyond.",
                    false, "2018-09-21"
                });

            migrationBuilder.InsertData(
                table: "Course",
                columns: new[] { "Title", "Duration", "Description", "TopRated", "CreationDate" },
                values: new object[]
                {
                    "ASP.NET Core: Razor Pages", 128,
                    "Razor Pages is an exciting new product released with ASP.NET Core 2, which makes building webpages without an MVC framework quick and easy. You can use it alone or in combination with ASP.NET MVC. In this course with Microsoft MVP Jess Chadwick, learn how to create a Razor Pages application, use the page model, manage dependencies, and secure your app. Jess helps you get your first dynamically rendered page up and running with Razor Pages. He demonstrates the use of layouts and classes to optimize pages for maintainability, and shows how to create simple HTML forms, validate and process user input, and lock down sections of your app for maximum security.",
                    false, "2017-11-17"
                });

            migrationBuilder.InsertData(
                table: "Course",
                columns: new[] { "Title", "Duration", "Description", "TopRated", "CreationDate" },
                values: new object[]
                {
                    "ASP.NET Core Identity: Authorization Management", 97,
                    "Authenticating users and authorizing their level of access is a key component to any application. In this course, learn how to authorize varying levels of access and add layers of security to your ASP.NET Core applications. Instructor Ervis Trupja shows how to authorize users in .NET Core using a simple, role-based model, as well as a rich, policy-based model. Throughout the course, he covers how to add requirements to an authorization policy, use handlers for one or multiple requirements, and create custom authorized attributes. To wrap up, he demonstrates how to use imperative authorization and write a resource-based handler.",
                    false, "2019-04-25"
                });

            migrationBuilder.InsertData(
                table: "Course",
                columns: new[] { "Title", "Duration", "Description", "TopRated", "CreationDate" },
                values: new object[]
                {
                    "Web Security: User Authentication and Access Control", 75,
                    "User authentication plays a central role in almost everything we do online. From apps to hardware and websites, user accounts and logins are everywhere. Authentication is critical for verifying a user's identity online and for confirming permissions so individuals can perform privileged actions. In this course, instructor Kevin Skoglund teaches you how authentication works, how to implement it correctly when building web applications, walks you through some of the most common attacks, and shows you how to protect your site. He also demonstrates how to secure your own passwords and digital identity so you can work securely. This course is ideal for all developers, particularly those who are interested in authentication and security.",
                    false, "2019-08-18"
                });

            migrationBuilder.InsertData(
                table: "Course",
                columns: new[] { "Title", "Duration", "Description", "TopRated", "CreationDate" },
                values: new object[]
                {
                    "ASP.NET Core: Middleware", 33,
                    "In ASP.NET Core, the HTTP pipeline is built from middleware—components that see every request and response and decide how to act upon them, and whether to forward each one to the next component in the pipeline. Learn what middleware is and how to write middleware components of your own to enhance ASP.NET Core web applications. Instructor Jeff Fritz covers inline and external implementation, along with conditional mapping and techniques for adjusting the order in which middleware is called.",
                    false, "2021-01-01"
                });

            migrationBuilder.InsertData(
                table: "Course",
                columns: new[] { "Title", "Duration", "Description", "TopRated", "CreationDate" },
                values: new object[]
                {
                    "Decoding Body Language", 29,
                    "Learn how to decode body language and use it to build better relationships at home and work. In this course, adapted from the podcast How to Be Awesome at Your Job, host Pete Mockaitis interviews professor and former FBI special agent Joe Navarro. Joe explains how to get to the bottom of body language, starting with why it’s so hard to tell if someone’s lying. Some people may be displaying ‘dishonest’ behavior such as not giving direct eye contact or shuffling away, but it could be that they are naturally anxious. However, Joe reveals six significant tells, and then recommends three that you can use to indicate interest and engagement, such as tilting your head and leaning forward. With these tips, you can decode the hidden motivations of others and maximize the effectiveness of your own communication.",
                    false, "2020-01-16"
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM Course");
        }
    }
}