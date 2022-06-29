interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  createdAt: number;
  status: string;
}

export const seedData: SeedData = {
  entries: [
    {
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sollicitudin ut mauris sed ultrices. Aenean id lacinia velit. Morbi tincidunt",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      description:
        "Donec ac sagittis diam. Donec porttitor pharetra magna, in tincidunt nisl accumsan nec. Aenean eget felis at ligula cursus faucibus eget a",
      status: "in-progress",
      createdAt: Date.now() - 10000000,
    },
    {
      description:
        "Aenean gravida condimentum felis, lobortis accumsan purus aliquam id. Nullam volutpat nec ligula sed pharetra. Vestibulum orci nisi,",
      status: "finished",
      createdAt: Date.now() - 10000,
    },
  ],
};
