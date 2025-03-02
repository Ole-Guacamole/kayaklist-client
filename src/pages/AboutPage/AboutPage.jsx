import React from "react";

const AboutPage = () => {
  return (
    <div className="about-page p-2 m-6 max-w-xl" >
      <h1 className="text-3xl font-bold mb-4">About The Kayak Catalogue Project</h1>
      <p className="mb-4">
        This website was built by Sven Ole Spindler during a fullstack web
        development course at Ironhack, Berlin, Germany in August 2024. The idea was to construct a usable, valuable web application using the MERN stack. The Goal was to create a webapp for a kayak club in which all members could browse through the available club kayaks, make reservations and leave ratings and comments. Furthermore via a Kayak-Recommendation utility they should be able to get recommendations on what kayak to use for a given purpose. As a little extra, the members shall also be able to create their own kayak in the app and make it available for other members to have a test drive.
        </p>
      <h2 className="text-2xl font-semibold mb-2">Main Features</h2>
      <p className="mb-4">
        This website allows users to:
        <ul className="list-disc list-inside ml-4">
          <li>Login / logout as user or admin securely via JWT Tokens</li>
          <li>View a list of kayaks</li>
          <li>View / edit / save / create a kayak item and its details</li>
          <li>Rate and comment on a kayak</li>
          <li>Make a reservation for a specific kayak on a given date</li>
          <li>Get a recommendation on which kayak to use for a specific purpose</li>
        </ul>
      </p>
      <h2 className="text-2xl font-semibold mb-2">Technologies</h2>
      <p>
        This project was built using the following technologies:
        <ul className="list-disc list-inside ml-4">
          <li>Node.js</li>
          <li>React.js Frontend (Styled via Tailwind CSS + Daisy UI)</li>
          <li>Express.js Backend (REST API Architecture, Mongoose)</li>
          <li>MongoDB Database</li>
          <li>JWT Authentication</li>
        </ul>
      </p>
    </div>
  );
};

export default AboutPage;