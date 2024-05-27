const faker = require("faker");
const User = require("../Core_files/Models/user");
const Contact = require("../Core_files/Models/contact");
const sequelize = require("../config/database");

// Function to generate random contacts for a user
const generateContacts = async (userId, count) => {
  const contacts = [];
  for (let i = 0; i < count; i++) {
    contacts.push({
      userId: userId,
      name: faker.name.findName(),
      phoneNumber: faker.phone.phoneNumber(),
    });
  }
  await Contact.bulkCreate(contacts);
};

// Function to populate users and their contacts
const populateData = async () => {
  try {
    // Generate 50 users
    const users = await User.bulkCreate(
      Array.from({ length: 50 }, () => ({
        name: faker.name.findName(),
        phoneNumber: faker.phone.phoneNumber(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      }))
    );

    // For each user, generate random contacts
    for (const user of users) {
      await generateContacts(
        user.id,
        faker.datatype.number({ min: 0, max: 20 })
      );
    }

    console.log("Data populated successfully!");
  } catch (error) {
    console.error("Error populating data:", error);
  } finally {
    await sequelize.close();
  }
};

// Call the populateData function
populateData().then(() => {
  console.log("Sample data populated");
  process.exit();
});
