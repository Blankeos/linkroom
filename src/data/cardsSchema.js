const cardsSchema = {
  type: "object",
  required: ["cards"],
  properties: {
    cards: {
      type: "array",
      nullable: true,
      uniqueItems: true,
      items: {
        type: "object",
        required: ["_id"],
        properties: {
          _id: { type: "string" },
          title: { type: "string" },
          subheading1: { type: "string" },
          subheading2: { type: "string" },
          links: {
            type: "array",
            nullable: true,
            uniqueItems: true,
            items: {
              type: "object",
              required: ["_id"],
              properties: {
                _id: { type: "string" },
                linkName: { type: "string" },
                icon: { type: "string" },
                url: { type: "string" },
              },
              additionalProperties: false,
            },
          },
          additionalProperties: false,
        },
      },
    },
  },
  additionalProperties: false,
};

export default cardsSchema;
