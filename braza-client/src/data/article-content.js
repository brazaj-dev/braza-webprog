const articles = [
  {
    name: "dogs",
    title: "Dogs",
    cardTitle: "Dogs",
    cardDescription:
      "Explore the diverse world of dogs, from loyal working breeds to gentle household companions.",
    image: new URL("../assets/dog.avif", import.meta.url).href,
    description:
      "Discover how dogs became humanity's faithful companions and learn what makes each breed unique.",
    types: ["Domestic animals", "Working dogs", "Companion pets"],
    content: [
      "Dogs are among the most beloved animals in the world, known for their loyalty, intelligence, and deep connection with humans. Often called “man’s best friend,” dogs have been companions to people for thousands of years, evolving from wild wolves into the diverse breeds we see today. They come in various sizes, shapes, and temperaments—from small lap dogs to large working breeds—making them suitable for different lifestyles and needs. One of the most remarkable traits of dogs is their loyalty.",
      "They form strong emotional bonds with their owners and are often protective, caring, and affectionate. This is why many dogs are not only pets but also serve important roles in society. Some are trained as service dogs to assist people with disabilities, while others work in law enforcement, search and rescue operations, or therapy programs to provide comfort and support. Dogs are also highly intelligent animals. They can be trained to follow commands, perform tricks, and even understand human emotions.",
      "Their ability to learn and adapt makes them excellent companions for families, individuals, and even children, as they help teach responsibility and empathy. Regular training and socialization are essential to ensure that dogs grow into well-behaved and happy pets. In terms of care, dogs require proper nutrition, regular exercise, and routine veterinary check-ups to stay healthy. Different breeds have different needs, so it is important for owners to understand what is best for their specific dog.",
      "Grooming, feeding, and providing a safe environment are all part of responsible pet ownership. Overall, dogs bring joy, companionship, and unconditional love to millions of households around the world. Their presence not only improves emotional well-being but also encourages a more active and caring lifestyle. Whether as a friend, protector, or helper, dogs continue to hold a special place in human lives.",
    ],
  },
  {
    name: "cats",
    title: "Cats",
    cardTitle: "Cats",
    cardDescription:
      "An insightful look into feline independence, grace, and the many ways cats charm their families.",
    image: new URL("../assets/cat.webp", import.meta.url).href,
    description:
      "Learn about the mysterious nature of cats and how they express affection, independence, and curiosity.",
    types: ["Domestic cats", "Indoor pets", "Nocturnal hunters"],
    content: [
      "Cats are graceful animals that often balance affection with independence. They have been companions to humans for thousands of years and are valued for their calm energy and playful curiosity.",
      "Many cats enjoy climbing, exploring, and interactive play. Providing toys and climbing spaces helps them stay active and mentally engaged.",
      "Cats communicate using purrs, meows, tail movements, and body language. A slow blink or head bump can show trust and affection.",
      "A healthy cat diet includes quality food, hydration, and preventive veterinary care. Grooming and a clean living area also contribute to their comfort.",
      "Different cat breeds display unique personalities. Some are cuddly and calm, while others are lively and adventurous, but all cats thrive with love and respect.",
    ],
  },
  {
    name: "birds",
    title: "Birds",
    cardTitle: "Birds",
    cardDescription:
      "Discover the fascinating mechanics of flight and the colorful variety of bird species around the world.",
    image: new URL("../assets/bird.webp", import.meta.url).href,
    description:
      "Explore how birds fly, migrate, sing, and survive in many different habitats.",
    types: ["Wild birds", "Migratory species", "Songbirds"],
    content: [
      "Birds are a diverse group of animals with feathers, wings, and beaks. Many species can fly, which helps them reach food, escape predators, and migrate over long distances.",
      "Migration is a remarkable bird behavior. Some birds travel thousands of miles each year between breeding and wintering grounds.",
      "Birds use their vision, beaks, and wings to search for food. Some eat insects, while others feed on seeds, nectar, or small fish.",
      "Many birds are known for their songs and bright colors. These traits can help attract mates, communicate with others, and blend into their environment.",
      "Birds also play important ecological roles by pollinating flowers, spreading seeds, and controlling insect populations.",
    ],
  },
  {
    name: "monkeys",
    title: "Monkeys",
    cardTitle: "Monkeys",
    cardDescription:
      "Dive into the complex social structures and playful behaviors of monkeys in the wild.",
    image: new URL("../assets/MONKEY.webp", import.meta.url).href,
    description:
      "Learn how monkeys live in groups, communicate, and use intelligence to solve problems.",
    types: ["Primate species", "Tropical animals", "Social mammals"],
    content: [
      "Monkeys are intelligent primates known for their playful behavior and social groups. Many species live in families or troops where they groom and support one another.",
      "They use sounds, facial expressions, and body language to communicate. Close social bonds help monkeys cooperate and care for their young.",
      "Monkeys often live in trees, using their hands and tails to move quickly. Their diet can include fruits, leaves, insects, and small animals.",
      "Young monkeys learn by imitating adults and exploring their environment. Play is an important part of their development.",
      "Protecting monkey habitats is critical, as many species are threatened by deforestation and habitat loss.",
    ],
  },
  {
    name: "fish",
    title: "Fish",
    cardTitle: "Fish",
    cardDescription:
      "Explore aquatic life and how fish adapt to water-based habitats across the planet.",
    image: new URL("../assets/fish.webp", import.meta.url).href,
    description:
      "Dive into the underwater world of fish and discover how they survive in freshwater and saltwater.",
    types: ["Freshwater fish", "Saltwater fish", "Aquatic animals"],
    content: [
      "Fish are aquatic animals that live in oceans, rivers, and lakes. They use gills to breathe and fins to swim, and they come in countless shapes and colors.",
      "Some fish travel in schools for protection, while others move alone through coral reefs and open water. Schooling helps many species stay safe from predators.",
      "Fish diets vary widely, from algae and plankton to insects and smaller fish. Their body shapes and mouths are adapted to the food they eat.",
      "Healthy water environments are essential for fish. Clean rivers, lakes, and seas support fish populations and the communities that depend on them.",
      "Fish play important roles in ecosystems, from pollinating aquatic plants to providing food for larger animals and humans.",
    ],
  },
];

export default articles;
