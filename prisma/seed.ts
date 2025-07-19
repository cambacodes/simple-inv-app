import { Faker, en, es } from "@faker-js/faker";
import { createClient } from "~/server/api/procedures/client/create-client";
import { createInventoryItem } from "~/server/api/procedures/inventory/create-inventory-item";

const faker = new Faker({
  locale: [es, en],
});
const demoClients = 10;
const demoInventoryItems = 5;

export async function main() {
  const clients = [];
  const inventoryItems = [];

  for (let i = 0; i < demoClients; i++) {
    const fakeClient = {
      firstName: faker.person.firstName(),
      firstLastName: faker.person.lastName().split(" ").at(0) ?? "",
      secondLastName: faker.person.lastName().split(" ").at(0) ?? "",
      ci: faker.string.numeric(8),
      email: faker.internet.email(),
      phoneNumber: faker.phone.number({ style: "international" }),
      nit: faker.string.numeric(10),
      birthday: faker.date.birthdate({ min: 12, max: 65, mode: "age" }),
      countryOfBirth: faker.location.country(),
    };

    clients.push(createClient(fakeClient));
  }

  for (let i = 0; i < demoInventoryItems; i++) {
    const fakeInventoryItem = {
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      stock: faker.number.int({ min: 0, max: 100 }),
      price: faker.number.float({ min: 10, max: 1000 }),
    };

    inventoryItems.push(createInventoryItem(fakeInventoryItem));
  }

  await Promise.all([...clients, ...inventoryItems]);
}
main()
  .then(() => {
    console.log("Seed completed");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
